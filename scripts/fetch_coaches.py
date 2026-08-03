"""Fetch Ace Factor coach profiles from Instagram via instaloader + fallbacks.

Output: public/media/coaches/{username}/ + manifest.json per coach.
"""
from __future__ import annotations

import json
import re
import sys
import time
import urllib.error
import urllib.request
from pathlib import Path

USER_AGENT = (
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
    "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
)

ROOT = Path(__file__).resolve().parent.parent
COACHES_DIR = ROOT / "public" / "media" / "coaches"
MAX_POSTS = 12
RATE_LIMIT_DELAY = 2.0

COACHES = [
    {
        "username": "shivam__sharma.07",
        "slug": "shivam-sharma",
        "id": "shivam-sharma",
        "fallback_name": "Shivam Sharma",
        "fallback_specialty": "Strength & Conditioning",
        "fallback_bio": "Certified strength coach at Ace Factor Fitness. Building power, discipline, and lasting habits.",
    },
    {
        "username": "thakur_kapil_singh85",
        "slug": "kapil-singh",
        "id": "kapil-singh",
        "fallback_name": "Kapil Singh",
        "fallback_specialty": "Bodybuilding & Hypertrophy",
        "fallback_bio": "Bodybuilding specialist helping members sculpt muscle and dial in training splits.",
    },
    {
        "username": "_mr_shrivastava_2.0_",
        "slug": "mr-shrivastava",
        "id": "mr-shrivastava",
        "fallback_name": "Mr. Shrivastava",
        "fallback_specialty": "Functional & CrossFit",
        "fallback_bio": "Functional fitness coach focused on athletic movement, mobility, and high-intensity training.",
    },
]

FITNESS_KEYWORDS = (
    "gym", "fitness", "workout", "train", "lift", "muscle", "body", "cardio",
    "strength", "squat", "deadlift", "bench", "ace factor", "coach", "fit",
    "exercise", "health", "protein", "transformation",
)


def fetch_html(url: str) -> str | None:
    req = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
    try:
        with urllib.request.urlopen(req, timeout=20) as resp:
            return resp.read().decode("utf-8", errors="ignore")
    except Exception:
        return None


def extract_meta(html: str) -> dict[str, str]:
    meta: dict[str, str] = {}
    for match in re.finditer(
        r'<meta\s+(?:property|name)="([^"]+)"\s+content="([^"]*)"',
        html,
        re.IGNORECASE,
    ):
        meta[match.group(1)] = match.group(2)
    for match in re.finditer(
        r'<meta\s+content="([^"]*)"\s+(?:property|name)="([^"]+)"',
        html,
        re.IGNORECASE,
    ):
        meta[match.group(2)] = match.group(1)
    return meta


def try_page_scrape(username: str) -> dict:
    url = f"https://www.instagram.com/{username}/?hl=en"
    result: dict = {"approach": "page_scrape", "success": False, "profile_url": url}
    html = fetch_html(url)
    if not html:
        result["error"] = "Failed to fetch profile page"
        return result

    meta = extract_meta(html)
    if meta.get("og:image"):
        result["success"] = True
        result["profile_pic_url"] = meta["og:image"]
        result["og_title"] = meta.get("og:title", "")
        result["og_description"] = meta.get("og:description", "")
    else:
        result["error"] = "No og:image (login wall likely)"
    return result


def try_oembed(username: str) -> dict:
    url = f"https://www.instagram.com/{username}/"
    oembed_url = f"https://www.instagram.com/api/v1/oembed/?url={url}"
    result: dict = {"approach": "oembed", "success": False}
    req = urllib.request.Request(oembed_url, headers={"User-Agent": USER_AGENT})
    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            data = json.loads(resp.read().decode())
            result["success"] = True
            result["data"] = {
                "title": data.get("title", ""),
                "author_name": data.get("author_name", ""),
                "thumbnail_url": data.get("thumbnail_url", ""),
            }
    except urllib.error.HTTPError as exc:
        result["error"] = f"HTTP {exc.code}"
    except Exception as exc:
        result["error"] = str(exc)
    return result


def download_url(url: str, dest: Path) -> bool:
    req = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            dest.write_bytes(resp.read())
        return True
    except Exception:
        return False


def is_fitness_post(caption: str) -> bool:
    lower = caption.lower()
    return any(kw in lower for kw in FITNESS_KEYWORDS)


def fetch_coach(coach: dict) -> dict:
    username = coach["username"]
    out_dir = COACHES_DIR / username
    out_dir.mkdir(parents=True, exist_ok=True)

    report: dict = {
        "username": username,
        "slug": coach["slug"],
        "approaches": [],
        "gallery": [],
        "profile_pic": None,
        "full_name": coach["fallback_name"],
        "bio": coach["fallback_bio"],
        "specialty": coach["fallback_specialty"],
        "success": False,
    }

    print(f"\n=== Coach: @{username} ===")

    scrape = try_page_scrape(username)
    report["approaches"].append(scrape)
    print(f"  page_scrape: {'OK' if scrape.get('success') else scrape.get('error', 'FAIL')}")

    oembed = try_oembed(username)
    report["approaches"].append(oembed)
    print(f"  oembed: {'OK' if oembed.get('success') else oembed.get('error', 'FAIL')}")

    profile_pic_path = out_dir / "profile.jpg"
    pic_url = None
    if scrape.get("profile_pic_url"):
        pic_url = scrape["profile_pic_url"]
    elif oembed.get("success") and oembed.get("data", {}).get("thumbnail_url"):
        pic_url = oembed["data"]["thumbnail_url"]

    if pic_url and download_url(pic_url, profile_pic_path):
        report["profile_pic"] = f"/media/coaches/{username}/profile.jpg"
        print(f"  profile pic: saved")
    else:
        print(f"  profile pic: using placeholder")

    il_result: dict = {"approach": "instaloader", "success": False}
    try:
        import instaloader
    except ImportError:
        il_result["error"] = "instaloader not installed"
        report["approaches"].append(il_result)
        print(f"  instaloader: not installed")
    else:
        loader = instaloader.Instaloader(
            download_videos=False,
            download_video_thumbnails=False,
            download_geotags=False,
            download_comments=False,
            save_metadata=False,
            compress_json=False,
            dirname_pattern=str(out_dir),
            filename_pattern="{shortcode}",
        )

        try:
            profile = instaloader.Profile.from_username(loader.context, username)
            report["full_name"] = profile.full_name or coach["fallback_name"]
            report["bio"] = profile.biography or coach["fallback_bio"]
            report["success"] = True
            il_result["success"] = True
            il_result["profile"] = {
                "username": profile.username,
                "full_name": profile.full_name,
                "posts": profile.mediacount,
                "followers": profile.followers,
                "bio": profile.biography or "",
            }

            if not report["profile_pic"] and profile.profile_pic_url:
                if download_url(profile.profile_pic_url, profile_pic_path):
                    report["profile_pic"] = f"/media/coaches/{username}/profile.jpg"

            count = 0
            gallery_idx = 0
            for post in profile.get_posts():
                if count >= MAX_POSTS:
                    break
                caption = post.caption or ""
                is_fitness = is_fitness_post(caption) or not caption
                if not is_fitness and gallery_idx >= 3:
                    count += 1
                    continue

                try:
                    if post.typename == "GraphSidecar":
                        for i, node in enumerate(post.get_sidecar_nodes()):
                            if not node.is_video:
                                fname = f"gallery-{gallery_idx}.jpg"
                                dest = out_dir / fname
                                loader.download_pic(filename=str(dest.with_suffix("")), url=node.display_url, mtime=post.date_local)
                                report["gallery"].append({
                                    "file": fname,
                                    "path": f"/media/coaches/{username}/{fname}",
                                    "caption": caption[:120],
                                })
                                gallery_idx += 1
                    elif not post.is_video:
                        loader.download_post(post, target=str(out_dir))
                        for fpath in sorted(out_dir.glob(f"{post.shortcode}*.jpg")):
                            fname = f"gallery-{gallery_idx}.jpg"
                            dest = out_dir / fname
                            if fpath != dest:
                                fpath.rename(dest)
                            report["gallery"].append({
                                "file": fname,
                                "path": f"/media/coaches/{username}/{fname}",
                                "caption": caption[:120],
                            })
                            gallery_idx += 1
                    time.sleep(RATE_LIMIT_DELAY)
                except Exception as exc:
                    il_result.setdefault("failed", []).append(str(exc))
                count += 1

            print(f"  instaloader: OK — {len(report['gallery'])} gallery images")
        except Exception as exc:
            il_result["error"] = str(exc)
            print(f"  instaloader: FAIL — {exc}")

        report["approaches"].append(il_result)

    for txt in out_dir.glob("*.txt"):
        txt.unlink()

    manifest = {
        "id": coach["id"],
        "slug": coach["slug"],
        "username": username,
        "instagram": f"https://www.instagram.com/{username}/",
        "handle": f"@{username}",
        "name": report["full_name"],
        "bio": report["bio"],
        "specialty": coach["fallback_specialty"],
        "image": report["profile_pic"] or "/media/stock/hero-athlete.png",
        "gallery": [g["path"] for g in report["gallery"]],
        "extracted_at": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
    }
    (out_dir / "manifest.json").write_text(
        json.dumps(manifest, indent=2, ensure_ascii=False), encoding="utf-8"
    )
    report["manifest"] = manifest
    return report


def main() -> int:
    COACHES_DIR.mkdir(parents=True, exist_ok=True)
    all_reports = []
    any_success = False

    for coach in COACHES:
        report = fetch_coach(coach)
        all_reports.append(report)
        if report.get("success") or report.get("profile_pic"):
            any_success = True

    summary_path = COACHES_DIR / "extraction-report.json"
    summary_path.write_text(
        json.dumps(all_reports, indent=2, ensure_ascii=False), encoding="utf-8"
    )

    print("\n=== Summary ===")
    for r in all_reports:
        g = len(r.get("gallery", []))
        pic = "yes" if r.get("profile_pic") else "placeholder"
        print(f"  @{r['username']}: pic={pic}, gallery={g}, name={r.get('full_name')}")

    return 0 if any_success else 1


if __name__ == "__main__":
    sys.exit(main())

"""Multi-approach Instagram media extractor for ace_factor_fitness.

Approaches tried (in order):
  1. instaloader — profile metadata + post downloads (works without login)
  2. Page source scrape — og:meta, ld+json, _sharedData
  3. oEmbed endpoint — public embed API
  4. Profile pic via instaloader metadata

Output: public/media/instagram/ + manifest.json + extraction report.
"""
from __future__ import annotations

import json
import re
import sys
import time
import urllib.error
import urllib.request
from pathlib import Path

PROFILE = "ace_factor_fitness"
PROFILE_URL = f"https://www.instagram.com/{PROFILE}/?hl=en"
OEMBED_URL = f"https://www.instagram.com/api/v1/oembed/?url={PROFILE_URL}"
USER_AGENT = (
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
    "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
)

ROOT = Path(__file__).resolve().parent.parent
OUT_DIR = ROOT / "public" / "media" / "instagram"
MANIFEST_PATH = OUT_DIR / "manifest.json"
REPORT_PATH = OUT_DIR / "extraction-report.json"
MAX_POSTS = 20
RATE_LIMIT_DELAY = 2.0


def fetch_html(url: str) -> str | None:
    req = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
    try:
        with urllib.request.urlopen(req, timeout=20) as resp:
            return resp.read().decode("utf-8", errors="ignore")
    except Exception as exc:
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


def try_oembed() -> dict:
    result: dict = {"approach": "oembed", "success": False}
    req = urllib.request.Request(OEMBED_URL, headers={"User-Agent": USER_AGENT})
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


def try_page_scrape() -> dict:
    result: dict = {"approach": "page_scrape", "success": False}
    html = fetch_html(PROFILE_URL)
    if not html:
        result["error"] = "Failed to fetch profile page"
        return result

    meta = extract_meta(html)
    result["meta"] = {k: v for k, v in meta.items() if k.startswith("og:") or k == "description"}

    if meta.get("og:image"):
        result["success"] = True
        result["og_image"] = meta["og:image"]
        result["og_title"] = meta.get("og:title", "")
        result["og_description"] = meta.get("og:description", "")

    ld_match = re.search(r'<script type="application/ld\+json">(.+?)</script>', html, re.DOTALL)
    if ld_match:
        try:
            result["ld_json"] = json.loads(ld_match.group(1))
        except json.JSONDecodeError:
            pass

    for pattern in (
        r'window\._sharedData\s*=\s*(\{.+?\});</script>',
        r'"xdt_api__v1__users__web_profile_info__query"\s*:\s*(\{.+?\})\s*,\s*"',
    ):
        match = re.search(pattern, html, re.DOTALL)
        if match:
            try:
                shared = json.loads(match.group(1))
                result["shared_data_keys"] = list(shared.keys())[:20]
                result["success"] = True
            except json.JSONDecodeError:
                continue

    if not result.get("success"):
        result["error"] = "No og:image or sharedData found (login wall likely)"
    return result


def try_instaloader(max_posts: int = MAX_POSTS) -> dict:
    result: dict = {"approach": "instaloader", "success": False, "images": [], "videos": [], "failed": []}
    try:
        import instaloader
    except ImportError:
        result["error"] = "instaloader not installed — run: pip install instaloader"
        return result

    OUT_DIR.mkdir(parents=True, exist_ok=True)

    loader = instaloader.Instaloader(
        download_videos=True,
        download_video_thumbnails=False,
        download_geotags=False,
        download_comments=False,
        save_metadata=False,
        compress_json=False,
        dirname_pattern=str(OUT_DIR),
        filename_pattern="{shortcode}",
    )

    try:
        profile = instaloader.Profile.from_username(loader.context, PROFILE)
    except Exception as exc:
        result["error"] = f"Profile fetch failed: {exc}"
        return result

    result["profile"] = {
        "username": profile.username,
        "full_name": profile.full_name,
        "posts": profile.mediacount,
        "followers": profile.followers,
        "bio": profile.biography or "",
    }
    result["success"] = True

    count = 0
    for post in profile.get_posts():
        if count >= max_posts:
            break
        try:
            is_video = post.is_video
            loader.download_post(post, target=str(OUT_DIR))
            time.sleep(RATE_LIMIT_DELAY)

            for fpath in sorted(OUT_DIR.glob(f"{post.shortcode}*")):
                suffix = fpath.suffix.lower()
                if suffix in (".jpg", ".jpeg", ".png", ".webp"):
                    entry = {
                        "file": fpath.name,
                        "path": f"/media/instagram/{fpath.name}",
                        "shortcode": post.shortcode,
                        "type": "image",
                        "caption": (post.caption or "")[:120],
                    }
                    result["images"].append(entry)
                elif suffix == ".mp4":
                    entry = {
                        "file": fpath.name,
                        "path": f"/media/instagram/{fpath.name}",
                        "shortcode": post.shortcode,
                        "type": "video",
                        "caption": (post.caption or "")[:120],
                    }
                    result["videos"].append(entry)
            count += 1
        except Exception as exc:
            result["failed"].append({"shortcode": post.shortcode, "error": str(exc)})
            count += 1
            time.sleep(RATE_LIMIT_DELAY * 2)

    return result


def cleanup_txt_files() -> int:
    removed = 0
    for txt in OUT_DIR.glob("*.txt"):
        txt.unlink()
        removed += 1
    return removed


def write_manifest(instaloader_result: dict) -> None:
    images = instaloader_result.get("images", [])
    videos = instaloader_result.get("videos", [])
    manifest = {
        "username": PROFILE,
        "profile_url": PROFILE_URL,
        "extracted_at": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
        "image_count": len(images),
        "video_count": len(videos),
        "images": images,
        "videos": videos,
    }
    MANIFEST_PATH.write_text(json.dumps(manifest, indent=2, ensure_ascii=False), encoding="utf-8")


def main() -> int:
    report: dict = {
        "profile": PROFILE,
        "profile_url": PROFILE_URL,
        "approaches": [],
        "summary": {},
    }

    print("=== Instagram Extraction: ace_factor_fitness ===\n")

    print("[1/3] Page scrape (og:meta, sharedData)...")
    scrape = try_page_scrape()
    report["approaches"].append(scrape)
    status = "OK" if scrape.get("success") else scrape.get("error", "FAILED")
    print(f"      → {status}\n")

    print("[2/3] oEmbed endpoint...")
    oembed = try_oembed()
    report["approaches"].append(oembed)
    status = "OK" if oembed.get("success") else oembed.get("error", "FAILED")
    print(f"      → {status}\n")

    print(f"[3/3] instaloader (max {MAX_POSTS} posts)...")
    il_result = try_instaloader(MAX_POSTS)
    report["approaches"].append(il_result)

    if il_result.get("success"):
        img_count = len(il_result.get("images", []))
        vid_count = len(il_result.get("videos", []))
        fail_count = len(il_result.get("failed", []))
        print(f"      → {img_count} images, {vid_count} videos ({fail_count} failed)\n")
        write_manifest(il_result)
        removed = cleanup_txt_files()
        print(f"      Cleaned {removed} .txt metadata files\n")
    else:
        print(f"      → FAILED: {il_result.get('error', 'unknown')}\n")

    report["summary"] = {
        "page_scrape": scrape.get("success", False),
        "oembed": oembed.get("success", False),
        "instaloader": il_result.get("success", False),
        "images_downloaded": len(il_result.get("images", [])),
        "videos_downloaded": len(il_result.get("videos", [])),
        "download_failures": len(il_result.get("failed", [])),
        "login_required": not il_result.get("success") and not scrape.get("success"),
        "notes": [
            "instaloader works WITHOUT login for public profiles",
            "Rate limiting (429) may occur on rapid video downloads — increase RATE_LIMIT_DELAY",
            "Page scrape often blocked by Instagram login wall in 2025+",
            "oEmbed returns profile thumbnail only, not post media",
        ],
    }

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    REPORT_PATH.write_text(json.dumps(report, indent=2, ensure_ascii=False), encoding="utf-8")

    print("=== Summary ===")
    print(json.dumps(report["summary"], indent=2))
    print(f"\nManifest: {MANIFEST_PATH}")
    print(f"Report:   {REPORT_PATH}")
    return 0 if il_result.get("success") else 1


if __name__ == "__main__":
    sys.exit(main())

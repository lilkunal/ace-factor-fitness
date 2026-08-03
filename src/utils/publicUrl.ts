/** Prefix public folder paths with Vite base (works on GitHub Pages + local dev). */
export function publicUrl(path: string): string {
  const base = import.meta.env.BASE_URL;
  const clean = path.startsWith("/") ? path.slice(1) : path;
  return `${base}${clean}`;
}

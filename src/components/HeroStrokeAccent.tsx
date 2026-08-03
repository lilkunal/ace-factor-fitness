/** Self-drawing hexagon accent — SVGator-style stroke-path animation target */
export function HeroStrokeAccent() {
  return (
    <svg
      className="hero-stroke-svg pointer-events-none absolute -right-8 top-24 hidden h-48 w-48 opacity-60 md:block lg:h-64 lg:w-64"
      viewBox="0 0 200 200"
      aria-hidden="true"
    >
      <path
        className="hero-stroke-path"
        d="M100 8 L188 54 L188 146 L100 192 L12 146 L12 54 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ color: "var(--color-volt)" }}
      />
      <path
        className="hero-stroke-path-inner"
        d="M100 32 L164 68 L164 132 L100 168 L36 132 L36 68 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.5"
        style={{ color: "var(--color-volt)" }}
      />
    </svg>
  );
}

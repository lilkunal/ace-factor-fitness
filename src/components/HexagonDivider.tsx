type HexagonDividerProps = {
  className?: string;
};

/** Ambient floating hexagon divider between sections */
export function HexagonDivider({ className = "" }: HexagonDividerProps) {
  return (
    <div
      className={`hex-divider relative flex h-16 items-center justify-center overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-volt/25 to-transparent" />
      <svg
        className="hex-divider-shape relative h-10 w-10 text-volt/40"
        viewBox="0 0 48 48"
        fill="none"
      >
        <path
          className="hex-divider-path"
          d="M24 4 L42 14 L42 34 L24 44 L6 34 L6 14 Z"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </svg>
    </div>
  );
}

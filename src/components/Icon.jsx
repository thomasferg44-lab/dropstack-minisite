// Small inline icon set keyed by name, so content.js can reference icons by
// string with no icon library dependency. Unknown names fall back to "spark".
const paths = {
  leaf: "M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z M2 21c0-3 1.85-5.36 5.08-6",
  shovel: "M2 22v-5l5-5 5 5-5 5Z M9.5 14.5 16 8 M17 2l5 5-.5.5a3.53 3.53 0 0 1-5 0s0 0 0 0a3.53 3.53 0 0 1 0-5L17 2Z",
  droplet: "M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7Z",
  grid: "M3 3h7v7H3Z M14 3h7v7h-7Z M14 14h7v7h-7Z M3 14h7v7H3Z",
  tree: "M12 22v-7 M9 9h6l-3-5Z M7 15h10l-5-6Z",
  sun: "M12 2v2 M12 20v2 m4.93-15.07 1.41-1.41 M4.93 19.07l1.41-1.41 M2 12h2 M20 12h2 m-2.93 6.07 1.41 1.41 M4.93 4.93l1.41 1.41 M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z",
  wrench: "M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76Z",
  scissors: "M6 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z M6 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z M20 4 8.12 15.88 M14.47 14.48 20 20 M8.12 8.12 12 12",
  spark: "M12 3v18 M3 12h18 M5.6 5.6l12.8 12.8 M18.4 5.6 5.6 18.4",
};

export default function Icon({ name, className = "size-6" }) {
  const d = paths[name] ?? paths.spark;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d={d} />
    </svg>
  );
}

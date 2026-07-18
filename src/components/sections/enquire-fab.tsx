// Floating "Enquire Now" CTA (Figma node 4888:609): a half-dome anchored to the
// bottom edge of the viewport with a sunburst of squares radiating out of it.
//
// The sunburst is a 6 x 19 polar grid — 19 spokes from 0deg to 180deg, six rings
// deep — with each square rotated to its own spoke angle. Radii and sizes below
// are measured off the Figma vector; the innermost ring (r=49.6) is omitted
// because the dome covers it exactly. Generating it beats the exported SVG,
// which ships the same shape as 114 hand-placed paths.
//
// Note this is NOT public/images/sunburst.svg — that one is an irregular spray
// used behind the hero, and does not tile onto this grid.

import Link from "next/link";

const ARC_CENTER = { x: 91.5, y: 91.5 };

const ARC_RINGS = [
  { radius: 58.25, size: 4.29 },
  { radius: 66.33, size: 4.81 },
  { radius: 74.64, size: 5.09 },
  { radius: 82.59, size: 3.06 },
  { radius: 90.29, size: 2.45 },
];

const ARC_SPOKES = Array.from({ length: 19 }, (_, i) => i * 10);

function Sunburst() {
  return (
    <svg
      viewBox="0 0 183 95"
      aria-hidden
      className="absolute inset-0 size-full origin-bottom fill-primary-400 transition-transform duration-500 ease-out group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
    >
      {ARC_RINGS.map(({ radius, size }) =>
        ARC_SPOKES.map((deg) => {
          const rad = (deg * Math.PI) / 180;
          const x = ARC_CENTER.x + radius * Math.cos(rad);
          const y = ARC_CENTER.y - radius * Math.sin(rad);
          return (
            <rect
              key={`${radius}-${deg}`}
              x={x - size / 2}
              y={y - size / 2}
              width={size}
              height={size}
              transform={`rotate(${-deg} ${x} ${y})`}
            />
          );
        }),
      )}
    </svg>
  );
}

export function EnquireFab() {
  return (
    // The wrapper spans the whole artwork, so it takes no pointer events — only
    // the dome is clickable. Hovering the dome still puts :hover on the wrapper,
    // which is what drives the sunburst's group-hover.
    <div className="group pointer-events-none fixed bottom-0 right-4 z-40 h-[95px] w-[183px] lg:right-16">
      <Sunburst />
      <Link
        href="/#contact"
        aria-label="Enquire now"
        className="pointer-events-auto absolute bottom-0 left-1/2 block h-[55px] w-[105px] -translate-x-1/2 rounded-t-full bg-primary-700 pt-4 text-center text-xs font-black uppercase leading-[14px] text-primary-400 transition-colors hover:bg-primary-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-400"
      >
        Enquire
        <br />
        Now
      </Link>
    </div>
  );
}

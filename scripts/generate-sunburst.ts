// Generates the dotted radial "sunburst" decoration seen across the design
// as a crisp, transparent SVG (the Figma original is not exportable as a unit).
// Run: bun scripts/generate-sunburst.ts

// Deterministic PRNG so regeneration is stable in git.
let seed = 42;
const rand = () => {
  seed = (seed * 1103515245 + 12345) % 2 ** 31;
  return seed / 2 ** 31;
};

const COLOR = "#8DC63F";
const CX = 330;
const CY = 0;
const rings = 8;
const r0 = 95;
const ringGap = 30;

let squares = "";
for (let ring = 0; ring < rings; ring++) {
  const r = r0 + ring * ringGap;
  const count = Math.round((Math.PI * r) / 26);
  for (let i = 0; i <= count; i++) {
    const angle = 15 + (150 * i) / count + (rand() - 0.5) * 4;
    const rad = (angle * Math.PI) / 180;
    const x = CX + r * Math.cos(rad);
    const y = CY + r * Math.sin(rad);
    // Middle rings carry the largest squares, edges taper off.
    const ringT = 1 - Math.abs(ring - rings / 2) / (rings / 2);
    const edgeT = 1 - Math.abs(angle - 90) / 90;
    const size = 3 + 11 * Math.min(1, 0.35 + 0.65 * ringT * (0.5 + 0.5 * edgeT)) * (0.7 + 0.6 * rand());
    if (rand() < 0.12) continue;
    const opacity = (0.75 + 0.25 * rand()).toFixed(2);
    squares += `<rect x="${(x - size / 2).toFixed(1)}" y="${(y - size / 2).toFixed(1)}" width="${size.toFixed(1)}" height="${size.toFixed(1)}" rx="1.5" transform="rotate(${(angle - 90).toFixed(1)} ${x.toFixed(1)} ${y.toFixed(1)})" opacity="${opacity}"/>`;
  }
}

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 660 340" fill="${COLOR}">${squares}</svg>`;
await Bun.write("public/images/sunburst.svg", svg);
console.log("wrote public/images/sunburst.svg");

// Dark variant for the primary-950 Manufacturing section
const dark = svg.replace(`fill="${COLOR}"`, 'fill="#2a5313"');
await Bun.write("public/images/sunburst-dark.svg", dark);
console.log("wrote public/images/sunburst-dark.svg");

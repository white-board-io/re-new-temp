# ReNew Solar Marketing Site

The public marketing homepage for ReNew Solar (solar panel manufacturing arm of ReNew), implemented from the Figma design "Renew - Solar - Website".

## Language

**Canonical Page**:
The 12 sections of the Figma frame "Home - ReNew - Home - v2" from the Header through the Footer (y 0–11,200). Everything below the Footer in that frame is design scratch and is ignored.
_Avoid_: full page, whole design

**Section**:
One horizontal band of the Canonical Page with its own background and content rhythm; the unit of implementation and delivery.
_Avoid_: block, module (Module means a solar panel product here)

**Batch**:
A group of 3 Sections implemented and reviewed together, delivered top-down in page order.

## Sections (in page order)

1. **Header/Nav + Hero** — a 3-slide carousel: "Choose India's most reliable solar panels" (video), "The company behind India's clean energy transition" (world map), "Net zero does not wait. Neither do we." (plants)
2. **Stats Bar** — headline manufacturing figures (6.4 GW, 3 Plants, 23,000 modules/day…)
3. **Who We Serve** — "Solar for every roof": home / business / large-scale
4. **Products** — Solar Module and Solar Cell cards
5. **Ticker** — scrolling marquee of manufacturing claims
6. **Manufacturing** — "Built at scale. Built to last." with India plant map
7. **Savings Calculator** — interactive bill → savings estimator
8. **Our Projects** — deployed project cards
9. **Channel Partners** — partner trust section
10. **Why ReNew Solar Panels** — "Backed for 30 years"
11. **Contact Form** — "Power your next project" enquiry form
12. **Footer**

## Relationships

- The **Canonical Page** is composed of exactly twelve **Sections**
- A **Batch** contains three consecutive **Sections**; Batch 1 = Header/Nav + Hero, Stats Bar, Who We Serve

## Example dialogue

> **Dev:** "Is the **Stats Bar** part of the **Hero**?"
> **Domain expert:** "No — it is its own **Section**: distinct background, distinct content rhythm, delivered as part of **Batch** 1."

## Flagged ambiguities

- The Figma frame contains content below the Footer — resolved (revised 2026-07-11): the world-map and "Net zero does not wait" blocks are **Hero** carousel slides 2 and 3 (matching notch shape, per-slide pagination dots, and CTA); only the duplicate Products variants are scratch.
- "Module" is ambiguous (solar panel vs. code module) — resolved: **Module** always means the solar panel product; use "component" for code.

"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

/*
 * Scroll reveal. The motion itself lives in globals.css (.reveal /
 * .reveal-children) — all this does is add .reveal-in the first time the
 * element comes into view.
 *
 * One observer serves every Reveal on the page. The callback is identical for
 * all of them, and the home page mounts ~40, so a shared observer keeps the
 * browser to one intersection bookkeeping list instead of forty.
 */
let sharedObserver: IntersectionObserver | null = null;
const revealCallbacks = new WeakMap<Element, () => void>();

function getObserver() {
  sharedObserver ??= new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        revealCallbacks.get(entry.target)?.();
        // Reveal once. Re-hiding on scroll-back is the thing that makes these
        // read as an effect rather than as the page arriving.
        sharedObserver?.unobserve(entry.target);
      }
    },
    // Hold off until the element is a little way past the bottom edge, so the
    // rise finishes under the reader's eye instead of in the last few pixels
    // of the viewport. Threshold stays 0 because several targets (whole card
    // grids, the contact block) are taller than the viewport and would never
    // reach a percentage threshold.
    { rootMargin: "0px 0px -10% 0px", threshold: 0 },
  );

  return sharedObserver;
}

/*
 * Extends HTMLAttributes so a Reveal can stand in for the element it replaces
 * without dropping its handlers — several of the card grids own the hover
 * state for their cards and have to keep their onMouseLeave/onBlur.
 */
type RevealProps = React.HTMLAttributes<HTMLElement> & {
  children: ReactNode;
  /**
   * Stagger the element's direct children instead of the element itself —
   * for card grids and lists. See --reveal-step in globals.css.
   */
  stagger?: boolean;
  /** Lead-in before this element (or its first child) starts, in ms. */
  delay?: number;
  /** Element to render. Sections and lists keep their own semantics. */
  as?: "div" | "section" | "header" | "article" | "ul" | "ol" | "dl" | "figure";
};

export function Reveal({
  children,
  className = "",
  stagger = false,
  delay,
  as: Tag = "div",
  style,
  ...rest
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Nothing to observe when the CSS is not going to hide anything anyway:
    // the reduced-motion and no-scripting cases both leave content visible.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = getObserver();
    revealCallbacks.set(el, () => setRevealed(true));
    observer.observe(el);

    return () => {
      revealCallbacks.delete(el);
      observer.unobserve(el);
    };
  }, []);

  return (
    <Tag
      ref={ref as React.Ref<never>}
      className={`${stagger ? "reveal-children" : "reveal"} ${
        revealed ? "reveal-in" : ""
      } ${className}`.trim()}
      style={
        delay === undefined
          ? style
          : ({ ...style, "--reveal-lead": `${delay}ms` } as CSSProperties)
      }
      {...rest}
    >
      {children}
    </Tag>
  );
}

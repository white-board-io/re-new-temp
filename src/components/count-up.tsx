"use client";

import { useEffect, useRef, useState } from "react";

// Animates numeric parts of `value` from 0 when scrolled into view.
// Non-numeric prefixes/suffixes ("$", " GW", "No. 1") render as-is.
export function CountUp({ value, duration = 1400 }: { value: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!/\d/.test(value)) return;

    let frame: number;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 3);
          setDisplay(
            value.replace(/[\d,]*\d/g, (num) => {
              const target = Number(num.replace(/,/g, ""));
              const current = Math.round(target * eased);
              return num.includes(",") ? current.toLocaleString("en-IN") : String(current);
            }),
          );
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.5 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value, duration]);

  return <span ref={ref}>{display}</span>;
}

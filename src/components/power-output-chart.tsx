"use client";

import { useEffect, useRef, useState } from "react";
import {
  Area,
  AreaChart,
  ReferenceDot,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const FINAL_YEAR = 30;

function getChartData(firstYearOutput: number, annualAttenuation: number) {
  return [
    { year: 0, output: 100 },
    ...Array.from({ length: FINAL_YEAR }, (_, index) => ({
      year: index + 1,
      output: Number((firstYearOutput - index * annualAttenuation).toFixed(2)),
    })),
  ];
}

// The area sweeps left to right; the two callouts land once it has arrived.
const DRAW_MS = 1600;

const AXIS_LINE = "#d7dcd8";
const AXIS_TEXT = "#6b7280";
const CURVE = "#006b38";
const FILL = "#77bb44";

const tickStyle = { fill: AXIS_TEXT, fontSize: 13, fontWeight: 500 } as const;
const axisTitleStyle = { fill: AXIS_TEXT, fontSize: 14, fontWeight: 700 } as const;

// The design writes endpoint callouts as percentages: whole numbers bare,
// fractions to the two decimals the warranty is quoted at.
const format = (value: number) =>
  Number.isInteger(value) ? `${value}` : value.toFixed(2);

const annotation = (value: number) => ({
  value: `(${format(value)}%)`,
  position: "top" as const,
  offset: 14,
  fill: CURVE,
  fontSize: 15,
  fontWeight: 700,
  className: "product-chart-annotation",
});

/* "waiting" until the chart scrolls into view, then either the sweep
   ("drawing" → "drawn") or, under reduced motion, straight to "instant". */
type Phase = "waiting" | "drawing" | "drawn" | "instant";

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function ChartTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: { payload: { year: number; output: number } }[];
}) {
  if (!active || !payload?.length) return null;
  const { year, output } = payload[0].payload;

  return (
    <div className="rounded-md bg-white px-3 py-2 text-sm shadow-[0_2px_12px_rgba(0,0,0,0.14)]">
      <p className="font-bold text-primary-950">{format(output)}%</p>
      <p className="text-neutral-500">Year {year}</p>
    </div>
  );
}

export function PowerOutputChart({
  className = "",
  firstYearOutput = 99,
  annualAttenuation = 0.4,
  replayKey,
}: {
  className?: string;
  firstYearOutput?: number;
  annualAttenuation?: number;
  /* Change this to sweep the curve again — the module tabs pass their id, so
     each tab redraws the warranty line rather than inheriting a drawn one. */
  replayKey?: string;
}) {
  const data = getChartData(firstYearOutput, annualAttenuation);
  const finalYearOutput = data[data.length - 1].output;
  const containerRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<Phase>("waiting");
  // Bumped per sweep, and used as the Area's key: remounting it is what makes
  // Recharts run its reveal animation from the start again.
  const [run, setRun] = useState(0);
  const [lastKey, setLastKey] = useState(replayKey);

  if (replayKey !== lastKey) {
    setLastKey(replayKey);
    // Only replay a chart the visitor has already seen draw; one still waiting
    // for its scroll cue should keep waiting.
    if (phase !== "waiting") {
      setRun((previous) => previous + 1);
      setPhase(prefersReducedMotion() ? "instant" : "drawing");
    }
  }

  const started = phase !== "waiting";
  const animate = phase === "drawing";
  const drawn = phase === "drawn" || phase === "instant";

  // Draw once, when the chart is a third of the way into view.
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reveal = () => setPhase(prefersReducedMotion() ? "instant" : "drawing");

    if (typeof IntersectionObserver === "undefined") {
      const timer = window.setTimeout(reveal, 0);
      return () => window.clearTimeout(timer);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        reveal();
      },
      { threshold: 0.35 },
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (phase !== "drawing") return;
    const timer = window.setTimeout(() => setPhase("drawn"), DRAW_MS);
    return () => window.clearTimeout(timer);
  }, [phase, run]);

  return (
    <div
      ref={containerRef}
      role="img"
      aria-label={`Power output chart showing ${firstYearOutput} percent in year one and ${finalYearOutput} percent in year ${FINAL_YEAR}`}
      className={`aspect-[433/257] w-full ${className}`}
    >
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 28, right: 52, bottom: 28, left: 0 }}
        >
          <XAxis
            dataKey="year"
            type="number"
            domain={[0, FINAL_YEAR]}
            ticks={[0, 1, 5, 10, 15, 20, 25, 30]}
            tick={tickStyle}
            tickMargin={10}
            tickLine={false}
            axisLine={{ stroke: AXIS_LINE }}
            label={{
              value: "Years",
              position: "insideBottom",
              offset: -22,
              style: axisTitleStyle,
            }}
          />
          <YAxis
            dataKey="output"
            type="number"
            domain={[70, 102]}
            ticks={[70, 80, 90, 100]}
            tickFormatter={(value: number) => `${value}%`}
            tick={tickStyle}
            tickMargin={8}
            tickLine={false}
            axisLine={{ stroke: AXIS_LINE }}
            width={78}
            label={{
              value: "Power Output",
              angle: -90,
              position: "insideLeft",
              offset: 16,
              style: { ...axisTitleStyle, textAnchor: "middle" },
            }}
          />
          <Tooltip
            content={<ChartTooltip />}
            cursor={{ stroke: CURVE, strokeWidth: 1, strokeDasharray: "4 4" }}
          />
          {/* Mounted only once in view, so the sweep plays on reveal — the axes
              above are already drawn by then. */}
          {started && (
            <Area
              key={run}
              type="linear"
              dataKey="output"
              baseValue={70}
              stroke={CURVE}
              strokeWidth={2}
              fill={FILL}
              fillOpacity={1}
              dot={false}
              activeDot={{ r: 5, fill: CURVE, stroke: "#ffffff", strokeWidth: 2 }}
              isAnimationActive={animate}
              animationDuration={DRAW_MS}
              animationEasing="ease-out"
            />
          )}
          {drawn && (
            <>
              <ReferenceDot
                x={1}
                y={firstYearOutput}
                r={5}
                fill={CURVE}
                stroke="#ffffff"
                strokeWidth={2}
                className="product-chart-annotation"
                label={annotation(firstYearOutput)}
              />
              <ReferenceDot
                x={FINAL_YEAR}
                y={finalYearOutput}
                r={5}
                fill={CURVE}
                stroke="#ffffff"
                strokeWidth={2}
                className="product-chart-annotation"
                label={annotation(finalYearOutput)}
              />
            </>
          )}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

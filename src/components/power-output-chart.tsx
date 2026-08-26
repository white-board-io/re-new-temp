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

/* Recharts lays the plot out from these, and the axis arrows are placed against
   the same numbers so they line up with the axes exactly. */
const MARGIN = { top: 28, right: 52, bottom: 28, left: 0 } as const;
const Y_AXIS_WIDTH = 78;
const X_AXIS_HEIGHT = 30;

/* The arrows run outside the "Power Output" and "Years" titles, in padding
   around the chart box rather than in the chart's own margins — the plot keeps
   its full height that way, which matters most at mobile widths. */
const LANE = 10; // track thickness; the arrowhead is as wide as its lane
const PAD_LEFT = 18;
const PAD_BOTTOM = 20;

// Plot area, as insets from the padded box the arrows are positioned against.
const PLOT_LEFT = PAD_LEFT + MARGIN.left + Y_AXIS_WIDTH;
const PLOT_RIGHT = MARGIN.right;
const PLOT_TOP = MARGIN.top;
const PLOT_BOTTOM = PAD_BOTTOM + MARGIN.bottom + X_AXIS_HEIGHT;

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

/* Lucide's "zap" — the bolt this site already uses for electricity — inlined
   because it has to be drawn inside the chart's own SVG. */
const ZAP_PATH =
  "M15.914 4a1.5 1.5 0 00-2.474-1.561l-9 9A1.5 1.5 0 005.5 14h4.002a.5.5 0 01.471.666L8.086 20a1.5 1.5 0 002.475 1.56l9-9A1.5 1.5 0 0018.5 10h-3.997a.5.5 0 01-.472-.667z";
const ZAP_VIEWBOX = 24;
const SPARK_SIZE = 16;
/* Lifts the bolt clear of the endpoint callout, which sits ~27px above the dot
   (its 14px offset plus the 15px type). */
const SPARK_RISE = 46;

/* Sits on the year-30 gridline, above the closing percentage, so the end of the
   warranty reads as still generating. Recharts hands the shape the endpoint's
   pixel position, which is why it can ride the curve as the data changes. */
function EndpointSpark({ cx = 0, cy = 0 }: { cx?: number; cy?: number }) {
  return (
    <g transform={`translate(${cx} ${cy - SPARK_RISE})`}>
      <g className="product-chart-spark">
        <circle
          className="product-chart-spark-halo"
          r={SPARK_SIZE * 0.72}
          fill={CURVE}
        />
        <g
          transform={`scale(${SPARK_SIZE / ZAP_VIEWBOX}) translate(${-ZAP_VIEWBOX / 2} ${-ZAP_VIEWBOX / 2})`}
        >
          <path className="product-chart-spark-bolt" d={ZAP_PATH} fill={CURVE} />
        </g>
      </g>
    </g>
  );
}

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

/* The arrows are two layers over the same track: a bar that scales out of the
   origin, and a full-length layer holding the arrowhead at its far end that
   slides in behind it, so the point stays on the growing tip. */
function AxisArrows({ run }: { run: number }) {
  const duration = { animationDuration: `${DRAW_MS}ms` };

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <div
        key={`x-${run}`}
        className="absolute bottom-0"
        style={{
          left: PLOT_LEFT,
          right: PLOT_RIGHT,
          height: LANE,
        }}
      >
        <span
          className="product-chart-axis-line-x absolute left-0 h-[2px] w-full rounded-full"
          style={{ ...duration, top: LANE / 2 - 1, background: CURVE }}
        />
        <span
          className="product-chart-axis-tip-x absolute inset-y-0 left-0 flex w-full items-center justify-end"
          style={duration}
        >
          <svg width="9" height={LANE} viewBox="0 0 9 10" fill="none">
            <path d="M0 0.6 8.6 5 0 9.4Z" fill={CURVE} />
          </svg>
        </span>
      </div>

      <div
        key={`y-${run}`}
        className="absolute left-0"
        style={{
          top: PLOT_TOP,
          bottom: PLOT_BOTTOM,
          width: LANE,
        }}
      >
        <span
          className="product-chart-axis-line-y absolute top-0 h-full w-[2px] rounded-full"
          style={{ ...duration, left: LANE / 2 - 1, background: CURVE }}
        />
        <span
          className="product-chart-axis-tip-y absolute inset-x-0 top-0 flex h-full flex-col items-center justify-start"
          style={duration}
        >
          <svg width={LANE} height="9" viewBox="0 0 10 9" fill="none">
            <path d="M5 0.4 9.4 9 0.6 9Z" fill={CURVE} />
          </svg>
        </span>
      </div>
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
      className={`relative w-full ${className}`}
      style={{ paddingLeft: PAD_LEFT, paddingBottom: PAD_BOTTOM }}
    >
      <div className="aspect-[433/257] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ ...MARGIN }}>
            <XAxis
              dataKey="year"
              type="number"
              domain={[0, FINAL_YEAR]}
              // Year 1 is left off: it crowds the 0 tick, and the curve's
              // first-year callout already marks it.
              ticks={[0, 5, 10, 15, 20, 25, 30]}
              tick={tickStyle}
              tickMargin={10}
              tickLine={false}
              axisLine={{ stroke: AXIS_LINE }}
              height={X_AXIS_HEIGHT}
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
              width={Y_AXIS_WIDTH}
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
            {/* Mounted only once in view, so the sweep plays on reveal — the
                axes above are already drawn by then. */}
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
                activeDot={{
                  r: 5,
                  fill: CURVE,
                  stroke: "#ffffff",
                  strokeWidth: 2,
                }}
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
                <ReferenceDot
                  x={FINAL_YEAR}
                  y={finalYearOutput}
                  shape={(props) => (
                    <EndpointSpark cx={props.cx} cy={props.cy} />
                  )}
                />
              </>
            )}
          </AreaChart>
        </ResponsiveContainer>
      </div>
      {/* Mounted with the sweep so the arrows grow alongside the curve. */}
      {started && <AxisArrows run={run} />}
    </div>
  );
}

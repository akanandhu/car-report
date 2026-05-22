"use client";

import type { ReactNode } from "react";

type MetricCard = {
  title: string;
  value: string;
  subtitle: string;
  change: string;
  changeTone: "positive" | "negative";
  icon: ReactNode;
};

const chartGridLines = [36, 27, 18, 9];
const weeklyBars = [
  { label: "Mon", total: 12, dark: 4 },
  { label: "Tue", total: 21, dark: 10 },
  { label: "Wed", total: 18, dark: 7 },
  { label: "Thu", total: 26, dark: 16 },
  { label: "Fri", total: 36, dark: 28 },
  { label: "Sat", total: 24, dark: 12 },
  { label: "Sun", total: 15, dark: 5 },
];

const metrics: MetricCard[] = [
  {
    title: "No. of Vehicles",
    value: "124",
    subtitle: "Active evaluators this month",
    change: "+12%",
    changeTone: "positive",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
        aria-hidden="true"
      >
        <circle cx="9" cy="8" r="3.25" />
        <path d="M4.5 18a4.5 4.5 0 0 1 9 0" />
        <path d="M16.5 8.5A2.5 2.5 0 0 1 19 11" />
        <path d="M15.5 18a3.7 3.7 0 0 1 4-3.5" />
      </svg>
    ),
  },
  {
    title: "Total Sales",
    value: "1,429",
    subtitle: "Completed deals",
    change: "+8.2%",
    changeTone: "positive",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
        aria-hidden="true"
      >
        <path d="m4 16 5-5 3.2 3.2L20 6.5" />
        <path d="M14 6.5h6v6" />
      </svg>
    ),
  },
  {
    title: "Link Clicks",
    value: "48,293",
    subtitle: "Traffic from shared reports",
    change: "+24.5%",
    changeTone: "positive",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
        aria-hidden="true"
      >
        <path d="m12 3 1.5 4.2L18 8.5l-3.7 2.7 1.3 4.3L12 13l-3.6 2.5 1.3-4.3L6 8.5l4.5-1.3Z" />
        <path d="M5 5h.01" />
        <path d="M19 19h.01" />
      </svg>
    ),
  },
  {
    title: "Evaluations",
    value: "3,842",
    subtitle: "Forms completed",
    change: "-2.1%",
    changeTone: "negative",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
        aria-hidden="true"
      >
        <path d="m4 12 3-7 4 14 4-10 3 3 2-8" />
      </svg>
    ),
  },
];

const TrendChart = () => (
  <div className="relative h-[300px] pt-6">
    <div className="absolute inset-0 left-12">
      {["10000", "7500", "5000", "2500"].map((label, index) => (
        <div
          key={label}
          className="absolute left-0 right-0 border-t border-dashed border-[#d7dfef]"
          style={{ top: `${index * 27}%` }}
        />
      ))}
    </div>

    <div className="absolute left-0 top-0 flex h-full flex-col justify-between pb-9 text-[12px] font-medium text-[#64748b]">
      <span>10000</span>
      <span>7500</span>
      <span>5000</span>
      <span>2500</span>
      <span>0</span>
    </div>

    <svg
      viewBox="0 0 760 320"
      className="absolute bottom-0 left-12 right-0 h-[290px] w-[calc(100%-3rem)]"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="trafficArea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#16c79a" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#16c79a" stopOpacity="0.03" />
        </linearGradient>
      </defs>
      <path
        d="M0 255 C40 252, 82 258, 118 260 C155 262, 190 272, 228 120 C250 32, 300 36, 352 176 C386 258, 430 232, 476 218 C520 206, 560 246, 602 256 C644 266, 694 255, 760 236 L760 320 L0 320 Z"
        fill="url(#trafficArea)"
      />
      <path
        d="M0 255 C40 252, 82 258, 118 260 C155 262, 190 272, 228 120 C250 32, 300 36, 352 176 C386 258, 430 232, 476 218 C520 206, 560 246, 602 256 C644 266, 694 255, 760 236"
        fill="none"
        stroke="#10b981"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  </div>
);

const WeeklyActivity = () => (
  <div className="relative h-[300px] pt-6">
    <div className="absolute inset-0 left-12">
      {chartGridLines.map((value, index) => (
        <div
          key={value}
          className="absolute left-0 right-0 border-t border-dashed border-[#d7dfef]"
          style={{ top: `${index * 27}%` }}
        />
      ))}
    </div>

    <div className="absolute left-0 top-0 flex h-full flex-col justify-between pb-9 text-[12px] font-medium text-[#64748b]">
      <span>36</span>
      <span>27</span>
      <span>18</span>
      <span>9</span>
      <span>0</span>
    </div>

    <div className="absolute bottom-0 left-12 right-0">
      <div className="flex h-[230px] items-end justify-between gap-3">
        {weeklyBars.map((bar) => (
          <div key={bar.label} className="flex flex-1 items-end justify-center">
            <div
              className="relative w-full max-w-7 overflow-hidden rounded-t-[6px] bg-[#cbd5e1]"
              style={{ height: `${(bar.total / 36) * 100}%` }}
            >
              {bar.dark > 0 ? (
                <div
                  className="absolute bottom-0 left-0 right-0 bg-[#18233d]"
                  style={{ height: `${(bar.dark / bar.total) * 100}%` }}
                />
              ) : null}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center justify-between gap-3 text-[11px] font-medium text-[#8b9abb]">
        {weeklyBars.map((bar) => (
          <span key={bar.label} className="flex-1 text-center">
            {bar.label}
          </span>
        ))}
      </div>
    </div>
  </div>
);

const Evaluations = () => {
  return (
    <div className="mx-auto max-w-7xl space-y-10 px-4 py-10 sm:px-8">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <article
            key={metric.title}
            className="rounded-[22px] border border-[#dbe4f0] bg-white px-7 py-8 shadow-[0_8px_24px_rgba(15,23,42,0.03)]"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#f7f9fc] text-[#475569]">
                {metric.icon}
              </div>
              <div
                className={`flex items-center gap-2 text-[13px] font-semibold ${
                  metric.changeTone === "positive"
                    ? "text-[#00a76f]"
                    : "text-[#ff2f2f]"
                }`}
              >
                <svg
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                  aria-hidden="true"
                >
                  {metric.changeTone === "positive" ? (
                    <path d="m3 11 10-6M7 5h6v6" />
                  ) : (
                    <path d="m3 5 10 6M13 11H7V5" />
                  )}
                </svg>
                <span>{metric.change}</span>
              </div>
            </div>

            <div className="mt-7">
              <h3 className="text-[22px] font-bold tracking-[-0.03em] text-[#081a43] sm:text-[28px]">
                {metric.value}
              </h3>
              <p className="mt-1 text-[15px] font-semibold text-[#21355b]">
                {metric.title}
              </p>
              <p className="mt-2 max-w-[180px] text-[13px] leading-6 text-[#8b9abb]">
                {metric.subtitle}
              </p>
            </div>
          </article>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-7 xl:grid-cols-[minmax(0,1.85fr)_minmax(310px,0.85fr)]">
        <section className="rounded-[24px] border border-[#dbe4f0] bg-white px-8 py-8 shadow-[0_8px_24px_rgba(15,23,42,0.03)]">
          <h3 className="text-[22px] font-bold tracking-[-0.03em] text-[#081a43]">
            Traffic &amp; Sales Trends
          </h3>
          <p className="mt-2 text-[15px] text-[#5973a9]">
            Monthly link clicks vs completed sales
          </p>
          <TrendChart />
        </section>

        <section className="rounded-[24px] border border-[#dbe4f0] bg-white px-8 py-8 shadow-[0_8px_24px_rgba(15,23,42,0.03)]">
          <h3 className="text-[22px] font-bold tracking-[-0.03em] text-[#081a43]">
            Weekly Activity
          </h3>
          <p className="mt-2 text-[15px] text-[#5973a9]">
            Evaluations by status
          </p>
          <WeeklyActivity />
        </section>
      </div>
    </div>
  );
};

export default Evaluations;

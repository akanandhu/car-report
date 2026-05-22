"use client";

import type { ReactNode } from "react";
import { Car, ArrowUpRight, ArrowDownRight, TrendingUp, MousePointerClick, Mouse, Activity } from "lucide-react";

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
    icon: <Car width={20} />,
  },
  {
    title: "Total Sales",
    value: "1,429",
    subtitle: "Completed deals",
    change: "+8.2%",
    changeTone: "positive",
    icon: <TrendingUp width={20} />,
  },
  {
    title: "Link Clicks",
    value: "48,293",
    subtitle: "Traffic from shared reports",
    change: "+24.5%",
    changeTone: "positive",
    icon: <MousePointerClick width={20} />,
  },
  {
    title: "Evaluations",
    value: "3,842",
    subtitle: "Forms completed",
    change: "-2.1%",
    changeTone: "negative",
    icon: <Activity width={20} />,
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
    <div className="w-full space-y-10 px-4 py-10 sm:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => (
          <article
            key={metric.title}
            className="bg-white p-6 rounded-xl border border-slate-200 flex flex-col gap-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f7f9fc] text-[#475569]">
                {metric.icon}
              </div>
              <div className="font-semibold text-sm">
                {metric.changeTone === "negative" ? (
                  <div className="flex gap-1 items-center ">
                    <ArrowDownRight color="#ef4444" size={16} />
                    <span className="text-[#ef4444]">{metric.change}</span>
                  </div>
                ) : (
                  <div className="flex gap-1 items-center text-emerald-600">
                    <ArrowUpRight size={16} />
                    <span>{metric.change}</span>
                  </div>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-slate-900">
                {metric.value}
              </h3>
              <p className="text-sm font-semibold text-slate-600">
                {metric.title}
              </p>
              <p className="text-xs font-medium text-slate-400 mt-1">{metric.subtitle}</p>
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

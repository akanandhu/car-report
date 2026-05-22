"use client";

import type { ReactNode } from "react";
import {
  Car,
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  MousePointerClick,
  Activity,
} from "lucide-react";
import TrafficChart from "../TrafficChart";
import WeeklyChart from "../WeeklyChart";

type MetricCard = {
  title: string;
  value: string;
  subtitle: string;
  change: string;
  changeTone: "positive" | "negative";
  icon: ReactNode;
};

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
              <p className="text-xs font-medium text-slate-400 mt-1">
                {metric.subtitle}
              </p>
            </div>
          </article>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <section className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-slate-900">
              Traffic &amp; Sales Trends
            </h3>
            <p className="text-sm text-slate-500">
              Monthly link clicks vs completed sales
            </p>
          </div>

          <TrafficChart />
        </section>

        <section className="bg-white p-6 rounded-xl border border-slate-200">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-slate-900">
              Weekly Activity
            </h3>
            <p className="text-sm text-slate-500">Evaluations by status</p>
          </div>
          <WeeklyChart />
        </section>
      </div>
    </div>
  );
};

export default Evaluations;

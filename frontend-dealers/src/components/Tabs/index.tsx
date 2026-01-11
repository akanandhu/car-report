import React from "react";
import { TabsPropsI } from "./types";

const Tabs = <T extends string = string>({
  tabs,
  activeTab,
  onTabChange,
  className = "",
}: TabsPropsI<T>) => {
  return (
    <div className={`flex gap-2 bg-slate-100 p-1.5 rounded-xl ${className}`}>
      {tabs.map((tab) => {
        return (
          <button
            className={
              activeTab === tab.id
                ? "bg-white rounded-lg px-3 py-1.5"
                : "px-3 py-1.5"
            }
            onClick={() => onTabChange(tab.id)}
            key={tab.id}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
};

export default Tabs;

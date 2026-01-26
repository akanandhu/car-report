import { TabsPropsI } from "./types";

const Tabs = <T extends string = string>({
  tabs,
  activeTab,
  onTabChange,
  className = "",
}: TabsPropsI<T>) => {
  return (
    <div className={`flex gap-1 bg-white rounded-2xl shadow-md p-1.5 border border-gray-200 ${className}`}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            className={`flex-1 py-3 px-4 rounded-2xl font-semibold transition-all duration-200 text-base ${
              isActive
                ? "bg-slate-700 text-white shadow-lg"
                : "bg-transparent text-gray-700 hover:text-gray-900"
            }`}
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
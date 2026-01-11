export type TabsPropsI<T extends string = string> = {
  tabs: Array<{id: T; label: string}>
  activeTab: T;
  onTabChange: (tab: T) => void;
  className?: string;
};

export type TabsI = {
    id: string;
    label: string;
}

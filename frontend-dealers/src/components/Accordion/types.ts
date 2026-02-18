export type AccordionItemProps = {
  title: string;
  children: React.ReactNode;
  badge?: React.ReactNode;
};

export type AccordionProps = {
  items: AccordionItemProps[];
  allowMultipleOpen?: boolean;
};
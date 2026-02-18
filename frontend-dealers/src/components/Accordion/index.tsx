"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AccordionProps } from "./types";
import ChevronDown from "@/public/assets/svg/ChevronDown";

export default function Accordion({
  items,
  allowMultipleOpen = false,
}: AccordionProps) {
  const [openIndexes, setOpenIndexes] = useState<number[]>([0]);

  const toggleItem = (index: number) => {
    setOpenIndexes((prev) => {
      if (allowMultipleOpen) {
        return prev.includes(index)
          ? prev.filter((i) => i !== index)
          : [...prev, index];
      }
      return prev.includes(index) ? [] : [index];
    });
  };

  return (
    <div className="border border-slate-200">
      {items.map((item, index) => {
        const isOpen = openIndexes.includes(index);
        return (
          <div key={index} className="overflow-hidden bg-white">

            <button
              onClick={() => toggleItem(index)}
              className="w-full flex justify-between items-center px-5 py-4 hover:bg-gray-100 transition"
            >
              <div className="flex items-center gap-3">
                <span className="font-semibold text-gray-800 text-base">
                  {item.title}
                </span>
                {item.badge && <div>{item.badge}</div>}
              </div>
              <motion.span
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.25 }}
                className="text-xl font-bold text-gray-600"
              >
                <ChevronDown />
              </motion.span>
            </button>
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{
                    duration: 0.35,
                    ease: "easeInOut",
                  }}
                  className="overflow-hidden mx-2"
                >
                  <div className="p-5 bg-slate-50 rounded-xl mb-2">
                    {item.children}  
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <hr className="h-0.75 bg-slate-100 mx-2" />
          </div>
        );
      })}
    </div>
  );
}

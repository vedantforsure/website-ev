"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const words = ["finding", "designing", "proposing"];

export default function CyclingWord() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = window.setInterval(() => {
      setIdx((i) => (i + 1) % words.length);
    }, 3000);
    return () => window.clearInterval(t);
  }, []);

  return (
    <span
      style={{
        display: "inline-flex",
        overflow: "hidden",
        verticalAlign: "bottom",
      }}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={words[idx]}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ type: "spring", duration: 0.5, bounce: 0 }}
          style={{ display: "inline-block" }}
        >
          {words[idx]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

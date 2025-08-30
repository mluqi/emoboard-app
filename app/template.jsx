"use client";

import { motion } from "framer-motion";

const variants = {
  hidden: { opacity: 0, y: 15 },
  enter: { opacity: 1, y: 0 },
};

export default function Template({ children }) {
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="enter"
      transition={{ type: "ease-in-out", duration: 0.4 }}
      className="flex flex-col flex-grow"
    >
      {children}
    </motion.div>
  );
}

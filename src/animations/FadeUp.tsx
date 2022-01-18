import React from "react";
import { motion } from "framer-motion";

const FadeUp: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{
        opacity: 1,
        y: 0,
        transition: { duration: 0.3, ease: "easeOut" },
      }}
    >
      {children}
    </motion.div>
  );
};

export default FadeUp;

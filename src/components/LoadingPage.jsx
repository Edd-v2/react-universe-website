import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";

export default function LoadingPage({ onLoaded }) {
  const [isVisible, setIsVisible] = useState(true);

  // Simulate a fake loading delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false); // This hides the loading screen
      onLoaded(); // Notify the parent that loading is complete
    }, 3000); // 3 seconds

    return () => clearTimeout(timer);
  }, [onLoaded]);

  return (
    <motion.div
      className="flex items-center justify-center min-h-screen"
      initial={{ opacity: 1 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      exit={{ opacity: 0 }} // Fades out when leaving
      transition={{ duration: 1.5 }}
    >
      <motion.div
        className="flex flex-row items-center justify-between w-full max-w-4xl"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5 }}
      >
        {/* Cerchio rotante */}
        <motion.div
          className="loading-circle glow"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        ></motion.div>

        {/* Testo di caricamento */}
        <motion.h1
          className="text-white text-2xl font-semibold"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Loading Universe...
        </motion.h1>
      </motion.div>
    </motion.div>
  );
}

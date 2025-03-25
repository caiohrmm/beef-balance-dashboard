import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AnimatedNumberProps {
  value: number;
  duration?: number;
  formatOptions?: Intl.NumberFormatOptions;
}

export const AnimatedNumber: React.FC<AnimatedNumberProps> = ({
  value,
  duration = 1.5,
  formatOptions = { minimumFractionDigits: 0, maximumFractionDigits: 0 }
}) => {
  const [displayValue, setDisplayValue] = useState(0);
  const [key, setKey] = useState(0); // For re-triggering animation

  useEffect(() => {
    let startTime: number;
    let startValue = displayValue;
    
    // Reset animation when value changes significantly
    if (Math.abs(value - displayValue) > Math.abs(value * 0.1)) {
      startValue = 0;
      setKey(prevKey => prevKey + 1);
    }
    
    const animateValue = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const currentValue = startValue + progress * (value - startValue);
      
      setDisplayValue(currentValue);
      
      if (progress < 1) {
        window.requestAnimationFrame(animateValue);
      }
    };
    
    const animationFrame = window.requestAnimationFrame(animateValue);
    
    return () => {
      window.cancelAnimationFrame(animationFrame);
    };
  }, [value, duration]);

  const formatter = new Intl.NumberFormat(undefined, formatOptions);
  const formattedValue = formatter.format(displayValue);
  const digits = formattedValue.split('');

  return (
    <span className="inline-flex">
      {digits.map((digit, i) => {
        // If the digit is a number, animate it
        if (/\d/.test(digit)) {
          return (
            <AnimatePresence key={`${key}-${i}`} mode="wait">
              <motion.span
                key={`${key}-${digit}-${i}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {digit}
              </motion.span>
            </AnimatePresence>
          );
        }
        // Otherwise just render it (commas, decimal points, etc.)
        return <span key={`${key}-${i}`}>{digit}</span>;
      })}
    </span>
  );
};

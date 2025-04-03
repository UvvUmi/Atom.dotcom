"use client";

import type { Transition, Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";
import { useState } from "react";

interface GlobeProps extends React.SVGAttributes<SVGSVGElement> {
  width?: number;
  height?: number;
  strokeWidth?: number;
  stroke?: string;
}

const transition: Transition = {
  duration: 0.3,
  opacity: { delay: 0.15 },
};

const pathVariants: Variants = {
  normal: {
    pathLength: 1,
    opacity: 1,
  },
  animate: (custom: number) => ({
    pathLength: [0, 1],
    opacity: [0, 1],
    transition: {
      ...transition,
      delay: 0.1 * custom,
    },
  }),
};

const LanguageMenu = ({
  width = 28,
  height = 28,
  strokeWidth = 2,
  stroke = "#ffffff",
  ...props
}: GlobeProps) => {
  const controls = useAnimation();
  const [isLangOpen, setIsLangOpen] = useState(false); /*current state, function to set it's state = init cur state*/
  function toggleLangMenu() {
    if (!isLangOpen) {setIsLangOpen(true);}
    else {setIsLangOpen(false);}
  }
  return (
    <div
      style={{
        cursor: "pointer",
        userSelect: "none",
        padding: "8px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox="0 0 24 24"
        fill="none"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        onMouseDown={() => toggleLangMenu()}
        {...props}
      >
        <motion.circle
          cx="12"
          cy="12"
          r="10"
          variants={pathVariants}
          animate={controls}
          custom={0}
        />
        <motion.path
          d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"
          variants={pathVariants}
          animate={controls}
          custom={1}
        />
        <motion.path
          d="M2 12h20"
          variants={pathVariants}
          animate={controls}
          custom={2}
        />
      </svg>

      <div className="relative text-white">
        <span onMouseDown={() => toggleLangMenu()}>English</span>
        {isLangOpen && (<div className="absolute">Lietuvių</div>)}
      </div>
      
    </div>
  );
};

export { LanguageMenu };

"use client";

import { motion, useAnimation } from "motion/react";
import type { Variants } from "motion/react";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

interface AtomProps extends React.SVGAttributes<SVGSVGElement> {
  width?: number;
  height?: number;
  strokeWidth?: number;
  stroke?: string;
}

const centerDotVariants: Variants = {
  normal: { scale: 1 },
  animate: {
    scale: [1, 1.5, 1],
    transition: {
      duration: 1,
      repeat: Infinity,
      repeatDelay: 0.5,
    },
  },
};

const orbitVariants: Variants = {
  normal: { rotate: 0 },
  animate: {
    rotate: 360,
    transition: {
      duration: 3,
      ease: "linear",
      repeat: Infinity,
    },
  },
};

const Atom = ({
  width = 28,
  height = 28,
  strokeWidth = 2,
  stroke = "#ffffff",
  ...props
}: AtomProps) => {
  const controls = useAnimation();

  const [flag, setFlag] = useState<boolean>(() => {
    const cValue = Cookies.get("atom-spin");
    return cValue === "0";
  })

  useEffect(() => {
    if (flag) {
      controls.start("normal");
    } else {
      controls.start("animate");
    }
  }, [flag, controls]);

 /* run effect every render or if included with array of dependencies, depending on as many times as the item renders, if array empty, render once */
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
      onClick={() => {
        if (flag) {
          controls.start("animate");
          setFlag(false);
          Cookies.set("atom-spin", "1", {expires: 14});
        } else {
          controls.start("normal");
          setFlag(true);
          Cookies.set("atom-spin", "0", {expires: 14});
        }
      }
    }
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox="-3 -3 32 32"
        fill="none"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        <motion.circle
          cx="12"
          cy="12"
          r="1"
          variants={centerDotVariants}
          animate={controls}
          initial="normal"
        />
        <motion.g variants={orbitVariants} animate={controls} initial="normal">
          <path d="M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5Z" />
          <path d="M15.7 15.7c4.52-4.54 6.54-9.87 4.5-11.9-2.03-2.04-7.36-.02-11.9 4.5-4.52 4.54-6.54 9.87-4.5 11.9 2.03 2.04 7.36.02 11.9-4.5Z" />
        </motion.g>
      </svg>
      <span className="text-white font-bold text-2xl">ATOM.<span className="italic">dotcom</span></span>
    </div>
  );
};

export { Atom };

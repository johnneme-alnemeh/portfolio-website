"use client"
import { motion } from "framer-motion";

const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i: number) => {
        const delay = i * 0.5
        return {
            pathLength: 1,
            opacity: 1,
            transition: {
                pathLength: { delay, type: "spring", duration: 1.5, bounce: 0 },
                opacity: { delay, duration: 0.01 },
            },
        }
    },
}

export default function PathDrawing() {
    return (
        <motion.svg
            width="600"
            height="600"
            viewBox="0 0 600 600"
            initial="hidden"
            animate="visible"
            style={image}
        >
            {/* Letter "J" */}
            <motion.path
                d="M100 100 C 100 300, 200 400, 50 500"
                stroke="url(#gradientJ)"
                strokeWidth="12"
                fill="transparent"
                strokeLinecap="round"
                variants={draw}
                custom={1}
                style={shape}
              />

            <motion.circle
              cx="100"
              cy="100"
              r="12"
              fill="url(#gradientJ)"
              variants={draw}
              custom={1.5}
            />


            {/* Letter "N" */}
            <motion.path
                d="M400 500 L 400 100 L 600 500 L 600 100"
                stroke="url(#gradientN)"
                strokeWidth="10"
                fill="transparent"
                strokeLinecap="round"
                variants={draw}
                custom={2}
                style={shape}
            />

            <defs>
                <linearGradient id="gradientJ" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#56CCF2" />  
                    <stop offset="100%" stopColor="#2D9CDB" /> 
                </linearGradient>
                <linearGradient id="gradientN" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#A8E063" />
                    <stop offset="100%" stopColor="#5DCD52" />
                </linearGradient>
            </defs>
        </motion.svg>
    )
}

const image: React.CSSProperties = {
    maxWidth: "80vw",
    display: "block",
    margin: "0 auto",
}

const shape: React.CSSProperties = {
    strokeWidth: 12, 
    strokeLinecap: "round",
    fill: "transparent",
}

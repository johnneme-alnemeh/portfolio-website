"use client"
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// Animation variants for drawing the letters
const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i: number) => {
        const delay = i * 0.2;
        return {
            pathLength: 1,
            opacity: 1,
            transition: {
                pathLength: { delay, type: "spring", duration: 0.7, bounce: 0.3 },
                opacity: { delay, duration: 0.1 },
            },
        }
    },
}

// Animation for the background elements
const fadeIn = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
        opacity: 1,
        scale: 1,
        transition: { duration: 0.5, ease: "easeOut" }
    }
}

// Pulse animation for highlights
const pulse = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
        opacity: [0, 0.7, 0],
        scale: [0.8, 1.2, 0.8],
        transition: { 
            duration: 1.5, 
            repeat: 1,
            repeatType: "reverse" as const,
            ease: "easeInOut" 
        }
    }
}

// Styles
const image: React.CSSProperties = {
    maxWidth: "80vw",
    display: "block",
    margin: "0 auto",
    filter: "drop-shadow(0 0 10px rgba(0,0,0,0.3))"
}

// Fixed particle positions to avoid hydration mismatch
const particlePositions = [
    { cx: 300 + Math.cos(0 * Math.PI / 4) * 150, cy: 300 + Math.sin(0 * Math.PI / 4) * 150, r: 4 },
    { cx: 300 + Math.cos(1 * Math.PI / 4) * 150, cy: 300 + Math.sin(1 * Math.PI / 4) * 150, r: 5 },
    { cx: 300 + Math.cos(2 * Math.PI / 4) * 150, cy: 300 + Math.sin(2 * Math.PI / 4) * 150, r: 3 },
    { cx: 300 + Math.cos(3 * Math.PI / 4) * 150, cy: 300 + Math.sin(3 * Math.PI / 4) * 150, r: 4 },
    { cx: 300 + Math.cos(4 * Math.PI / 4) * 150, cy: 300 + Math.sin(4 * Math.PI / 4) * 150, r: 5 },
    { cx: 300 + Math.cos(5 * Math.PI / 4) * 150, cy: 300 + Math.sin(5 * Math.PI / 4) * 150, r: 3 },
    { cx: 300 + Math.cos(6 * Math.PI / 4) * 150, cy: 300 + Math.sin(6 * Math.PI / 4) * 150, r: 4 },
    { cx: 300 + Math.cos(7 * Math.PI / 4) * 150, cy: 300 + Math.sin(7 * Math.PI / 4) * 150, r: 5 }
];

export default function PathDrawing() {
    // Use state to ensure animations only run on client side
    const [isClient, setIsClient] = useState(false);
    
    useEffect(() => {
        setIsClient(true);
    }, []);
    
    return (
        <motion.svg
            width="600"
            height="600"
            viewBox="0 0 600 600"
            initial="hidden"
            animate={isClient ? "visible" : "hidden"}
            style={image}
        >
            {/* Background elements */}
            <motion.rect
                x="0"
                y="0"
                width="600"
                height="600"
                fill="url(#bgGradient)"
                initial={{ opacity: 0 }}
                animate={isClient ? { opacity: 0.15 } : { opacity: 0 }}
                transition={{ duration: 0.5 }}
                rx="30"
                ry="30"
            />
            
            {/* Animated rings */}
            <motion.circle
                cx="300"
                cy="300"
                r="220"
                stroke="url(#ringGradient)"
                strokeWidth="2"
                fill="transparent"
                initial={{ opacity: 0, rotate: 0, scale: 0.8 }}
                animate={isClient ? { opacity: 0.6, rotate: 180, scale: 1 } : { opacity: 0, rotate: 0, scale: 0.8 }}
                transition={{ duration: 2, ease: "easeOut" }}
                style={{ transformOrigin: "center" }}
            />
            
            <motion.circle
                cx="300"
                cy="300"
                r="260"
                stroke="url(#ringGradient2)"
                strokeWidth="1"
                strokeDasharray="10,5"
                fill="transparent"
                initial={{ opacity: 0, rotate: 180 }}
                animate={isClient ? { opacity: 0.4, rotate: 0 } : { opacity: 0, rotate: 180 }}
                transition={{ duration: 2.5, ease: "easeInOut" }}
                style={{ transformOrigin: "center" }}
            />
            
            {/* Particle effects with fixed positions */}
            {particlePositions.map((particle, i) => (
                <motion.circle
                    key={`particle-${i}`}
                    cx={particle.cx}
                    cy={particle.cy}
                    r={particle.r}
                    fill={i % 2 === 0 ? "url(#gradientJ)" : "url(#gradientN)"}
                    variants={pulse}
                    custom={i * 0.1}
                    style={{ filter: "blur(1px)" }}
                />
            ))}
            
            {/* Letter "J" with enhanced styling */}
            <motion.path
                d="M150 150 C 150 280, 150 350, 150 400 C 150 450, 120 470, 90 460"
                stroke="url(#gradientJ)"
                strokeWidth="18"
                fill="transparent"
                strokeLinecap="round"
                variants={draw}
                custom={0.2}
            />

            {/* J dot with pulse effect */}
            <motion.circle
                cx="150"
                cy="150"
                r="18"
                fill="url(#gradientJ)"
                variants={draw}
                custom={0.6}
            />
            
            {/* J highlight effect */}
            <motion.circle
                cx="150"
                cy="150"
                r="24"
                fill="url(#highlightJ)"
                initial={{ opacity: 0 }}
                animate={isClient ? { opacity: [0, 0.7, 0] } : { opacity: 0 }}
                transition={{ delay: 1, duration: 1, times: [0, 0.5, 1] }}
                style={{ filter: "blur(5px)" }}
            />
            
            {/* J glow effect */}
            <motion.path
                d="M150 150 C 150 280, 150 350, 150 400 C 150 450, 120 470, 90 460"
                stroke="url(#gradientJ)"
                strokeWidth="30"
                fill="transparent"
                strokeLinecap="round"
                initial={{ opacity: 0 }}
                animate={isClient ? { opacity: 0.4 } : { opacity: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                style={{ filter: "blur(10px)" }}
            />

            {/* Letter "N" with enhanced styling */}
            <motion.path
                d="M400 450 L 400 150 L 550 450 L 550 150"
                stroke="url(#gradientN)"
                strokeWidth="18"
                fill="transparent"
                strokeLinecap="round"
                variants={draw}
                custom={0.8}
            />
            
            {/* N glow effect */}
            <motion.path
                d="M400 450 L 400 150 L 550 450 L 550 150"
                stroke="url(#gradientN)"
                strokeWidth="30"
                fill="transparent"
                strokeLinecap="round"
                initial={{ opacity: 0 }}
                animate={isClient ? { opacity: 0.4 } : { opacity: 0 }}
                transition={{ delay: 1.3, duration: 0.5 }}
                style={{ filter: "blur(10px)" }}
            />
            
            {/* N highlight points */}
            <motion.circle
                cx="400"
                cy="150"
                r="8"
                fill="url(#highlightN)"
                initial={{ opacity: 0, scale: 0 }}
                animate={isClient ? { opacity: [0, 1, 0], scale: [0, 1.5, 0] } : { opacity: 0, scale: 0 }}
                transition={{ delay: 1.5, duration: 0.8 }}
            />
            
            <motion.circle
                cx="550"
                cy="150"
                r="8"
                fill="url(#highlightN)"
                initial={{ opacity: 0, scale: 0 }}
                animate={isClient ? { opacity: [0, 1, 0], scale: [0, 1.5, 0] } : { opacity: 0, scale: 0 }}
                transition={{ delay: 1.7, duration: 0.8 }}
            />
            
            {/* Connecting line between J and N */}
            <motion.path
                d="M170 300 L 380 300"
                stroke="url(#connectGradient)"
                strokeWidth="2"
                strokeDasharray="5,5"
                initial={{ opacity: 0, pathLength: 0 }}
                animate={isClient ? { opacity: 0.5, pathLength: 1 } : { opacity: 0, pathLength: 0 }}
                transition={{ delay: 1.8, duration: 0.5 }}
            />
            
            {/* Final decorative burst */}
            <motion.circle
                cx="300"
                cy="300"
                r="0"
                fill="url(#burstGradient)"
                initial={{ opacity: 0, r: 0 }}
                animate={isClient ? { opacity: [0, 0.3, 0], r: [0, 150, 300] } : { opacity: 0, r: 0 }}
                transition={{ delay: 2.5, duration: 0.5 }}
                style={{ filter: "blur(20px)" }}
            />

            <defs>
                <radialGradient id="bgGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                    <stop offset="0%" stopColor="#2F80ED" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#000000" stopOpacity="0" />
                </radialGradient>
                
                <linearGradient id="gradientJ" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#56CCF2" />  
                    <stop offset="50%" stopColor="#2F80ED" />
                    <stop offset="100%" stopColor="#2D9CDB" /> 
                </linearGradient>
                
                <radialGradient id="highlightJ" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                    <stop offset="0%" stopColor="#56CCF2" stopOpacity="1" />
                    <stop offset="100%" stopColor="#56CCF2" stopOpacity="0" />
                </radialGradient>
                
                <linearGradient id="gradientN" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#A8E063" />
                    <stop offset="50%" stopColor="#56C596" />
                    <stop offset="100%" stopColor="#5DCD52" />
                </linearGradient>
                
                <radialGradient id="highlightN" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                    <stop offset="0%" stopColor="#A8E063" stopOpacity="1" />
                    <stop offset="100%" stopColor="#A8E063" stopOpacity="0" />
                </radialGradient>
                
                <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#56CCF2" />
                    <stop offset="50%" stopColor="#A8E063" />
                    <stop offset="100%" stopColor="#2D9CDB" />
                </linearGradient>
                
                <linearGradient id="ringGradient2" x1="100%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#A8E063" />
                    <stop offset="50%" stopColor="#2F80ED" />
                    <stop offset="100%" stopColor="#5DCD52" />
                </linearGradient>
                
                <linearGradient id="connectGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#56CCF2" />
                    <stop offset="100%" stopColor="#A8E063" />
                </linearGradient>
                
                <radialGradient id="burstGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                    <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
                </radialGradient>
            </defs>
        </motion.svg>
    )
}

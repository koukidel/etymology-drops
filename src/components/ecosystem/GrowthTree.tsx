"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// Generate random star positions for background
const generateStars = (count: number) => {
    return Array.from({ length: count }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 1,
        delay: Math.random() * 5
    }));
};

export function GrowthTree() {
    const [stars, setStars] = useState<{ id: number; x: number; y: number; size: number; delay: number }[]>([]);

    useEffect(() => {
        setStars(generateStars(50));
    }, []);

    return (
        <div className="absolute inset-0 z-0 bg-slate-900 overflow-hidden">
            {/* 1. Ambient Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-indigo-950 via-slate-900 to-slate-950 opacity-100" />

            {/* 2. Starfield / Synapses */}
            {stars.map((star) => (
                <motion.div
                    key={star.id}
                    className="absolute bg-white rounded-full opacity-20"
                    style={{
                        left: `${star.x}%`,
                        top: `${star.y}%`,
                        width: star.size,
                        height: star.size,
                    }}
                    animate={{
                        opacity: [0.1, 0.5, 0.1],
                        scale: [1, 1.5, 1],
                    }}
                    transition={{
                        duration: 3 + star.delay,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: star.delay
                    }}
                />
            ))}

            {/* 3. The Central Neural Tree */}
            <div className="absolute inset-0 flex items-center justify-center">
                <svg viewBox="0 0 800 800" className="w-full h-full max-w-4xl opacity-80 overflow-visible">
                    <defs>
                        <linearGradient id="neuralGradient" x1="0%" y1="100%" x2="0%" y2="0%">
                            <stop offset="0%" stopColor="#6366f1" stopOpacity="0" />
                            <stop offset="100%" stopColor="#818cf8" stopOpacity="1" />
                        </linearGradient>
                    </defs>

                    {/* Main Trunk - Energy column */}
                    <motion.path
                        d="M400,800 C400,600 350,500 400,400 C450,300 400,200 400,100"
                        fill="none"
                        stroke="url(#neuralGradient)"
                        strokeWidth="4"
                        strokeLinecap="round"
                        filter="drop-shadow(0 0 8px rgba(99,102,241,0.5))"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 3, ease: "easeOut" }}
                    />

                    {/* Branching Synapses */}
                    {[
                        "M400,500 C300,450 200,500 150,400", // Left low
                        "M400,400 C500,350 600,400 650,300", // Right mid
                        "M400,300 C300,250 200,200 150,150", // Left high
                        "M400,200 C450,150 500,100 550,50",  // Right high
                        "M400,600 C500,550 550,650 600,550", // Right low
                    ].map((path, i) => (
                        <motion.path
                            key={i}
                            d={path}
                            fill="none"
                            stroke="#4f46e5"
                            strokeWidth="2"
                            strokeOpacity="0.5"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 2, delay: 1 + i * 0.5, ease: "easeOut" }}
                        />
                    ))}

                    {/* Pulse Nodes at endpoints */}
                    {[
                        { cx: 400, cy: 100 }, { cx: 150, cy: 400 }, { cx: 650, cy: 300 },
                        { cx: 150, cy: 150 }, { cx: 550, cy: 50 }, { cx: 600, cy: 550 }
                    ].map((node, i) => (
                        <motion.circle
                            key={i}
                            cx={node.cx}
                            cy={node.cy}
                            r="6"
                            fill="#a5b4fc"
                            initial={{ scale: 0 }}
                            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 3, delay: 2 + i * 0.2, repeat: Infinity }}
                        />
                    ))}
                </svg>
            </div>
        </div>
    );
}

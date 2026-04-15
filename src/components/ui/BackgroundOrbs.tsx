"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function BackgroundOrbs() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none -z-20">
            {/* Primary Blue Orb (Technology) */}
            <motion.div
                animate={{
                    x: [0, 100, -50, 0],
                    y: [0, -50, 100, 0],
                    scale: [1, 1.2, 0.9, 1],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-[120px]"
            />

            {/* Emerald Green Orb (Environment/IoT) */}
            <motion.div
                animate={{
                    x: [0, -150, 100, 0],
                    y: [0, 150, -150, 0],
                    scale: [1, 1.1, 0.8, 1],
                }}
                transition={{
                    duration: 28,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute top-1/3 right-1/4 w-[550px] h-[550px] bg-emerald-500/10 rounded-full blur-[130px]"
            />

            {/* Cyan/Teal Orb (Connectivity) */}
            <motion.div
                animate={{
                    x: [0, 150, 150, 0],
                    y: [0, 100, -150, 0],
                    scale: [1.2, 1, 1.1, 1.2],
                }}
                transition={{
                    duration: 32,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute bottom-1/4 left-1/3 w-[450px] h-[450px] bg-cyan-400/10 rounded-full blur-[110px]"
            />

            {/* Deep Indigo Orb (Depth) */}
            <motion.div
                animate={{
                    x: [0, -100, 50, 0],
                    y: [0, 100, 50, 0],
                    scale: [1, 0.9, 1.2, 1],
                }}
                transition={{
                    duration: 35,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute bottom-1/3 right-1/3 w-[600px] h-[600px] bg-indigo-900/10 rounded-full blur-[150px]"
            />
        </div>
    );
}

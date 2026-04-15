"use client";

import { motion } from "framer-motion";

export function GridPattern() {
    return (
        <div className="fixed inset-0 pointer-events-none -z-20 overflow-hidden">
            <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <pattern
                        id="grid-pattern"
                        width="60"
                        height="60"
                        patternUnits="userSpaceOnUse"
                    >
                        <path
                            d="M 60 0 L 0 0 0 60"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1"
                            className="text-white"
                        />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid-pattern)" />
            </svg>

            {/* Subtle Animated Scanning Line */}
            <motion.div 
                animate={{
                    top: ["-10%", "110%"]
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "linear"
                }}
                className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/10 to-transparent z-10"
            />
        </div>
    );
}

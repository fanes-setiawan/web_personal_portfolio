'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface ScrollRevealProps {
    children: ReactNode;
    width?: "fit-content" | "100%";
    className?: string;
    delay?: number;
    direction?: "up" | "down" | "left" | "right";
    duration?: number;
    distance?: number;
}

export const ScrollReveal = ({
    children,
    width = "100%",
    className = "",
    delay = 0,
    direction = "up",
    duration = 0.5,
    distance = 40
}: ScrollRevealProps) => {

    // Define animation variants based on direction
    const directions = {
        up: { y: distance },
        down: { y: -distance },
        left: { x: distance },
        right: { x: -distance },
    };

    return (
        <div className={className} style={{ position: "relative", width, overflow: "visible" }}>

            <motion.div
                variants={{
                    hidden: {
                        opacity: 0,
                        ...directions[direction]
                    },
                    visible: {
                        opacity: 1,
                        x: 0,
                        y: 0
                    },
                }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                    duration,
                    delay,
                    ease: [0.22, 1, 0.36, 1] // Custom quintic ease-out for premium feel
                }}
            >
                {children}
            </motion.div>
        </div>
    );
};

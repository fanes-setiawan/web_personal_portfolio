"use client";

import { useEffect, useState } from 'react';

export function InteractiveBackground() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const updateMousePosition = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', updateMousePosition);
        return () => window.removeEventListener('mousemove', updateMousePosition);
    }, []);

    return (
        <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
            {/* Subtle base gradient */}
            <div className="absolute inset-0 bg-slate-50"></div>
            
            {/* Glowing cursor follower */}
            <div 
                className="absolute w-[800px] h-[800px] rounded-full blur-[100px] bg-blue-100/40 transition-opacity duration-300"
                style={{
                    left: `${mousePosition.x - 400}px`,
                    top: `${mousePosition.y - 400}px`,
                    transition: 'left 0.1s ease-out, top 0.1s ease-out',
                }}
            />
            
            {/* Some decorative static blobs for depth */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-50/50 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-50/50 rounded-full blur-[120px] -translate-x-1/3 translate-y-1/3"></div>
        </div>
    );
}

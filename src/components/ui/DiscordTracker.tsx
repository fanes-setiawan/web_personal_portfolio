"use client";
import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export function DiscordTracker() {
    const pathname = usePathname();
    const hasTracked = useRef<{ [key: string]: boolean }>({});

    useEffect(() => {
        // Only track specific paths as requested by user
        if (pathname === '/' || pathname === '/jasa-upload-play-store') {
            // Cegah duplicate hit pada development (React Strict Mode)
            if (hasTracked.current[pathname]) return;
            hasTracked.current[pathname] = true;

            const trackVisit = async () => {
                try {
                    await fetch('/api/track', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            url: window.location.href,
                            screen: `${window.innerWidth}x${window.innerHeight}`,
                            language: navigator.language,
                            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
                        })
                    });
                } catch (e) {
                    // Ignore client side errors silently
                }
            };
            
            // Allow page to load visually first before tracking logic fires
            setTimeout(() => {
                trackVisit();
            }, 1000);
        }
    }, [pathname]);

    return null;
}

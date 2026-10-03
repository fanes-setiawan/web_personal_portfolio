import Image from 'next/image';

interface DeviceMockupProps {
    src: string;
    alt: string;
    type?: 'mobile' | 'tablet';
    className?: string;
}

export function DeviceMockup({ src, alt, type = 'mobile', className = '' }: DeviceMockupProps) {
    if (type === 'mobile') {
        return (
            <div className={`relative bg-slate-900 border-[4px] border-slate-900 rounded-[1.25rem] shadow-2xl overflow-hidden ring-1 ring-slate-800 ${className}`} style={{ aspectRatio: '9/19.5' }}>
                {/* Dynamic Island / Notch */}
                <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-[35%] h-3.5 bg-black rounded-full z-20 shadow-[0_0_2px_rgba(0,0,0,0.5)]"></div>
                
                {/* Inner Screen */}
                <div className="relative w-full h-full bg-white rounded-[1rem] overflow-hidden z-10 flex items-center justify-center">
                    {src ? (
                        <Image
                            src={src}
                            alt={alt}
                            fill
                            className="object-cover object-top"
                        />
                    ) : (
                        <span className="text-slate-300 text-xs font-medium">No image</span>
                    )}
                </div>
                
                {/* Side Buttons (Metal Frame Illusion) */}
                <div className="absolute top-[20%] -left-[5px] w-[2px] h-6 bg-slate-700 rounded-l-sm"></div>
                <div className="absolute top-[30%] -left-[5px] w-[2px] h-10 bg-slate-700 rounded-l-sm"></div>
                <div className="absolute top-[25%] -right-[5px] w-[2px] h-12 bg-slate-700 rounded-r-sm"></div>
            </div>
        );
    }

    // Tablet
    return (
        <div className={`relative bg-slate-900 border-[6px] border-slate-900 rounded-[1.25rem] shadow-2xl overflow-hidden ring-1 ring-slate-800 ${className}`} style={{ aspectRatio: '4/3' }}>
            {/* Tablet Camera */}
            <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 bg-black rounded-full z-20"></div>
            
            {/* Inner Screen */}
            <div className="relative w-full h-full bg-white rounded-[0.9rem] overflow-hidden z-10 flex items-center justify-center">
                {src ? (
                    <Image
                        src={src}
                        alt={alt}
                        fill
                        className="object-cover object-top"
                    />
                ) : (
                    <span className="text-slate-300 text-xs font-medium">No image</span>
                )}
            </div>
        </div>
    );
}

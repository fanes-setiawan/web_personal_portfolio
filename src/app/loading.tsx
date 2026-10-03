export default function Loading() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 relative overflow-hidden">
            {/* Soft Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-blue-200/30 rounded-full blur-[80px]"></div>
            
            <div className="flex flex-col items-center gap-8 relative z-10">
                {/* Smooth Glowing Spinner */}
                <div className="relative w-16 h-16">
                    {/* Track */}
                    <div className="absolute inset-0 rounded-full border-[3px] border-slate-200"></div>
                    {/* Spinner */}
                    <div className="absolute inset-0 rounded-full border-[3px] border-blue-600 border-t-transparent animate-spin duration-1000"></div>
                    {/* Glow effect */}
                    <div className="absolute inset-0 rounded-full border-[3px] border-blue-400/50 blur-[6px] border-t-transparent animate-spin duration-1000"></div>
                </div>
                
                {/* Text */}
                <div className="flex flex-col items-center gap-1.5">
                    <h2 className="text-lg font-black text-slate-800 tracking-tight">Fanes Setiawan</h2>
                    <p className="text-slate-500 text-[11px] font-bold uppercase tracking-[0.2em] animate-pulse">Loading Workspace</p>
                </div>
            </div>
        </div>
    );
}

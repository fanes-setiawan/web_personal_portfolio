export default function Loading() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#0B1121] text-blue-500">
            <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
                <p className="text-slate-400 font-mono animate-pulse">Initializing System...</p>
            </div>
        </div>
    );
}

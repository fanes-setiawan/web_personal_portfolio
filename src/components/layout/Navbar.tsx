import Link from 'next/link';

export function Navbar() {
    return (
        <nav className="w-full py-6 px-4 md:px-12 flex items-center justify-between">
            <div className="flex items-center gap-2">
                <div className="bg-blue-600 p-1.5 rounded-md">
                    <span className="text-white font-bold text-lg">A</span>
                </div>
                <span className="text-xl font-bold tracking-tight text-white">ALEX RIVERA</span>
            </div>

            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
                <Link href="#about" className="hover:text-white transition-colors">About</Link>
                <Link href="#portfolio" className="hover:text-white transition-colors">Portfolio</Link>
                <Link href="#contact" className="hover:text-white transition-colors">Contact</Link>
                <Link href="/cv-generator" className="hover:text-white transition-colors flex items-center gap-1.5">
                    <span className="p-0.5 bg-blue-600 rounded text-[10px] font-bold text-white">NEW</span>
                    CV Generator
                </Link>
                <span className="text-slate-700">|</span>
                <Link href="/login" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">Login</Link>
                <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-md transition-colors text-xs font-semibold tracking-wider">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    HIRE ME
                </button>
            </div>
        </nav>
    );
}

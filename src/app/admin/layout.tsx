"use client";

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { LayoutDashboard, FolderKanban, Building2, BarChart3, Settings, Rocket } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    const navItems = [
        { name: 'Overview', href: '/admin', icon: LayoutDashboard },
        { name: 'Projects', href: '/admin/projects', icon: FolderKanban },
        { name: 'Companies', href: '/admin/companies', icon: Building2 },
        { name: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
    ];

    return (
        <div className="flex min-h-screen bg-[#0B1121]">
            {/* Sidebar */}
            <aside className="w-64 border-r border-slate-800 bg-[#0F1629] flex flex-col fixed h-full z-10">
                <div className="p-6 flex items-center gap-3">
                    <Rocket className="text-blue-500" size={24} />
                    <span className="text-lg font-bold text-white tracking-tight">DevPort Admin</span>
                </div>

                <nav className="flex-1 px-4 space-y-2 mt-4">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
                        return (
                            <Link
                                key={item.name}
                                href="#" // simplified for demo since only projects/[id] exists
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${isActive || item.name === 'Projects' ? 'bg-blue-600/10 text-blue-400 border border-blue-600/20' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
                            >
                                <item.icon size={18} />
                                {item.name}
                            </Link>
                        )
                    })}
                </nav>

                <div className="p-4 border-t border-slate-800">
                    <Link href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
                        <Settings size={18} />
                        Settings
                    </Link>
                </div>

                <div className="p-4 border-t border-slate-800">
                    <div className="flex items-center gap-3 p-2 rounded-lg bg-slate-900 border border-slate-800">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-xs border border-white">
                            👨‍💻
                        </div>
                        <div>
                            <p className="text-xs font-bold text-white">Alex Rivera</p>
                            <p className="text-[10px] text-slate-500">Senior Lead Dev</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-64 p-8 overflow-y-auto">
                {children}
            </main>
        </div>
    );
}

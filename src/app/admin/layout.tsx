"use client";

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { LayoutDashboard, FolderKanban, Building2, BarChart3, Settings, Rocket, Code2, Award, UserCircle } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    const navItems = [
        { name: 'Overview', href: '/admin', icon: LayoutDashboard },
        { name: 'Profile', href: '/admin/profile', icon: UserCircle },
        { name: 'Projects', href: '/admin/projects', icon: FolderKanban },
        { name: 'Companies', href: '/admin/companies', icon: Building2 },
        { name: 'Skills', href: '/admin/skills', icon: Award },
        { name: 'Technologies', href: '/admin/technologies', icon: Code2 },
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
                                href={item.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${isActive ? 'bg-blue-600/10 text-blue-400 border border-blue-600/20' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
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

            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-64 p-8 overflow-y-auto">
                {children}
            </main>
        </div>
    );
}

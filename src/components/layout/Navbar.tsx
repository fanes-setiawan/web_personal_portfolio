"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { LogoutButton } from '@/components/auth/LogoutButton';
import { Menu, X, Rocket, BadgeCheck } from 'lucide-react';

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState<any>(null);
    const [role, setRole] = useState<string | null>(null);
    const [profile, setProfile] = useState<any>(null);
    const supabase = createClient();

    useEffect(() => {
        async function getData() {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);

            if (user) {
                const { data: userRole } = await supabase
                    .from('user_roles')
                    .select('role')
                    .eq('email', user.email)
                    .single();
                setRole(userRole?.role);
            }

            const { data: profile } = await supabase
                .from('profile')
                .select('name')
                .single();
            setProfile(profile);
        }
        getData();
    }, []);

    const brandName = profile?.name ? profile.name.toUpperCase() : 'PORTOFOLIO';

    const publicNav = [
        { name: 'Home', href: '/' },
        { name: 'About', href: '/#about' },
        { name: 'Experience', href: '/#experience' },
        { name: 'Portfolio', href: '/#portfolio' },
        { name: 'CV', href: '/docs' },
    ];

    const adminNav = [
        { name: 'Manage Projects', href: '/admin/projects' },
        { name: 'CV Generator', href: '/cv-generator' },
    ];

    return (
        <nav className="w-full relative z-[100]">
            <div className="py-6 px-4 md:px-12 flex items-center justify-between bg-[#0B1121]/80 backdrop-blur-lg border-b border-white/5 md:border-none">
                <div className="flex items-center gap-2">
                    <Link href="/" className="group flex items-center gap-1.5">
                        <span className="text-xl font-bold tracking-tight text-white">{brandName}</span>
                        <BadgeCheck size={18} className="text-blue-500 fill-blue-500/10 group-hover:scale-110 transition-transform" />
                    </Link>
                </div>

                {/* DESKTOP NAV */}
                <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
                    {!user && (
                        <>
                            {publicNav.map(link => (
                                <Link key={link.name} href={link.href} className="hover:text-white transition-colors">
                                    {link.name}
                                </Link>
                            ))}
                        </>
                    )}

                    {user && role === 'SUPER_ADMIN' && (
                        <>
                            {adminNav.map(link => (
                                <Link key={link.name} href={link.href} className="hover:text-white transition-colors">
                                    {link.name}
                                </Link>
                            ))}
                            <span className="text-slate-700">|</span>
                            <LogoutButton />
                        </>
                    )}

                    {!user && (
                        <a href={`mailto:${profile?.email || ''}`} className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-md transition-colors text-xs font-semibold tracking-wider">
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                            HIRE ME
                        </a>
                    )}
                </div>

                {/* MOBILE TOGGLE */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden p-2 text-slate-400 hover:text-white transition-colors"
                >
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* MOBILE MENU DRAWER */}
            {isOpen && (
                <div className="absolute top-full left-0 w-full bg-[#111827] border-b border-white/10 md:hidden animate-in slide-in-from-top-4 duration-300">
                    <div className="flex flex-col p-6 gap-6">
                        {!user && (
                            <>
                                {publicNav.map(link => (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        onClick={() => setIsOpen(false)}
                                        className="text-lg font-bold text-white hover:text-blue-400 transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                                <div className="h-px bg-white/5 my-2" />
                                <a href={`mailto:${profile?.email || ''}`} className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20">
                                    <Rocket size={20} />
                                    HIRE ME
                                </a>
                            </>
                        )}

                        {user && role === 'SUPER_ADMIN' && (
                            <>
                                {adminNav.map(link => (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        onClick={() => setIsOpen(false)}
                                        className="text-lg font-bold text-white hover:text-blue-400 transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                                <div className="h-px bg-white/5 my-2" />
                                <LogoutButton />
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}

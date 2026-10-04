"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { LogoutButton } from '@/components/auth/LogoutButton';
import { Menu, X, Rocket, BadgeCheck, Languages } from 'lucide-react';

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
                .select('name, email')
                .single();
            setProfile(profile);
        }
        getData();
    }, []);

    const brandName = profile?.name ? profile.name.toUpperCase() : 'FANES SETIAWAN';

    const publicNav = [
        { name: 'Home', href: '/' },
        { name: 'Services', href: '/jasa-upload-play-store' },
        { name: 'Portfolio', href: '/#portfolio' },
        { name: 'Experience', href: '/#experience' },
        { name: 'Contact', href: '/#contact' },
    ];

    const adminNav = [
        { name: 'Manage Projects', href: '/admin/projects' },
        { name: 'CV Generator', href: '/cv-generator' },
    ];

    return (
        <nav className="w-full z-[100] bg-white/95 backdrop-blur-sm sticky top-0 border-b border-slate-100 shadow-sm">
            <div className="py-4 px-4 md:px-12 flex items-center justify-between max-w-7xl mx-auto">
                <div className="flex items-center gap-2">
                    <Link href="/" className="group flex items-center gap-3">
                        <Image 
                            src="/images/Modern Teal Profile Portrait.png" 
                            alt="Fanes Setiawan" 
                            width={32} 
                            height={32} 
                            className="w-8 h-8 rounded-full object-cover border border-slate-200" 
                        />
                        <span className="text-sm font-bold tracking-tight text-slate-800">{brandName}</span>
                    </Link>
                </div>

                {/* DESKTOP NAV */}
                <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-500">
                    {!user && (
                        <div className="flex items-center gap-8 bg-white border border-slate-100 shadow-sm px-6 py-2 rounded-full">
                            {publicNav.map(link => (
                                <Link key={link.name} href={link.href} className="hover:text-blue-600 transition-colors">
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    )}

                    {user && role === 'SUPER_ADMIN' && (
                        <div className="flex items-center gap-6 bg-white border border-slate-100 shadow-sm px-6 py-2 rounded-full">
                            <span className="text-xs font-bold text-red-500 uppercase tracking-widest border-r pr-4 border-slate-200">Admin</span>
                            {adminNav.map(link => (
                                <Link key={link.name} href={link.href} className="hover:text-blue-600 transition-colors">
                                    {link.name}
                                </Link>
                            ))}
                            <LogoutButton />
                        </div>
                    )}

                    {!user && (
                        <a href={`mailto:${profile?.email || ''}`} className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-all text-sm font-bold shadow-sm hover:shadow-md">
                            Let's Talk
                        </a>
                    )}
                </div>

                {/* MOBILE TOGGLE */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden p-2 text-slate-600 hover:text-slate-900 transition-colors"
                >
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* MOBILE MENU DRAWER */}
            {isOpen && (
                <div className="absolute top-full left-0 w-full bg-white border-b border-slate-100 md:hidden animate-in slide-in-from-top-4 duration-300 shadow-xl">
                    <div className="flex flex-col p-6 gap-6">
                        {!user && (
                            <>
                                {publicNav.map(link => (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        onClick={() => setIsOpen(false)}
                                        className="text-lg font-bold text-slate-800 hover:text-blue-600 transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                                <div className="h-px bg-slate-100 my-2" />
                                <a href={`mailto:${profile?.email || ''}`} className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold flex items-center justify-center gap-2 shadow-sm">
                                    Let's Talk
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
                                        className="text-lg font-bold text-slate-800 hover:text-blue-600 transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                                <div className="h-px bg-slate-100 my-2" />
                                <LogoutButton />
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}

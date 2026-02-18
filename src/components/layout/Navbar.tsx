import Link from 'next/link';
import { createClient } from '@/utils/supabase/server';
import { LogoutButton } from '@/components/auth/LogoutButton';

export async function Navbar() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    let role = null;
    if (user) {
        const { data: userRole } = await supabase
            .from('user_roles')
            .select('role')
            .eq('email', user.email)
            .single();
        role = userRole?.role;
    }

    // Navigation Menus
    const publicNav = [
        { name: 'Home', href: '/' },
        { name: 'About', href: '/#about' },
        { name: 'Portfolio', href: '/#portfolio' },
        { name: 'Blog', href: '/blog' },
    ];

    const hrNav = [
        { name: 'Work Experience', href: '/#skills' },
        { name: 'Project Details', href: '/#portfolio' },
        { name: 'Technical Docs', href: '/docs' },
    ];

    const adminNav = [
        { name: 'Analytics', href: '/admin' },
        { name: 'Manage Company', href: '/admin/company' },
        { name: 'Manage Projects', href: '/admin/projects' },
        { name: 'CV Generator', href: '/cv-generator' },
        { name: 'Access Requests', href: '/admin/requests' },
    ];

    return (
        <nav className="w-full py-6 px-4 md:px-12 flex items-center justify-between">
            <div className="flex items-center gap-2">
                <div className="bg-blue-600 p-1.5 rounded-md">
                    <span className="text-white font-bold text-lg">A</span>
                </div>
                <Link href="/" className="text-xl font-bold tracking-tight text-white">PORTOFOLIO</Link>
            </div>

            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">

                {/* PUBLIC NAV */}
                {!user && (
                    <>
                        {publicNav.map(link => (
                            <Link key={link.name} href={link.href} className="hover:text-white transition-colors">
                                {link.name}
                            </Link>
                        ))}
                        <span className="text-slate-700">|</span>
                        <Link href="/login" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">
                            HR Login
                        </Link>
                    </>
                )}

                {/* HR NAV */}
                {user && role === 'HR' && (
                    <>
                        {hrNav.map(link => (
                            <Link key={link.name} href={link.href} className="hover:text-white transition-colors">
                                {link.name}
                            </Link>
                        ))}
                        <span className="text-slate-700">|</span>
                        <LogoutButton />
                    </>
                )}

                {/* SUPER ADMIN NAV */}
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
                    <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-md transition-colors text-xs font-semibold tracking-wider">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                        HIRE ME
                    </button>
                )}
            </div>
        </nav>
    );
}

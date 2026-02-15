"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Briefcase, ShieldCheck, ArrowRight, Lock, User, Mail } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
    const router = useRouter();
    const [role, setRole] = useState<'hr' | 'admin'>('hr');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Mock Authentication Logic
        setTimeout(() => {
            setIsLoading(false);
            if (role === 'hr') {
                // Redirect HR to home/projects (Candidate Portal concept)
                router.push('/');
            } else {
                // Redirect Admin to Admin Dashboard
                router.push('/admin/projects/1'); // Mock ID for demo
            }
        }, 1500);
    };

    return (
        <div className="min-h-screen flex bg-[#0B1121] text-white">
            {/* Left Side - Brand / Marketing */}
            <div className="hidden lg:flex flex-1 bg-blue-900/10 relative overflow-hidden items-center justify-center p-12">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 to-[#0B1121] z-0"></div>
                <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid-pattern.svg')] opacity-10 z-0"></div>

                <div className="relative z-10 max-w-lg">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="bg-blue-600 p-2 rounded-lg">
                            <Briefcase className="text-white" size={24} />
                        </div>
                        <span className="text-2xl font-bold tracking-tight">Ecosystem.io</span>
                    </div>

                    <h1 className="text-5xl font-bold leading-tight mb-6">
                        Access your <br />
                        <span className="text-blue-500">dedicated candidate portal.</span>
                    </h1>

                    <p className="text-slate-400 text-lg leading-relaxed mb-12">
                        Explore project architecture, technical deep-dives, and administrative tools designed for high-performance recruitment.
                    </p>

                    <div className="flex items-center gap-4">
                        <div className="flex -space-x-3">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="w-10 h-10 rounded-full bg-slate-700 border-2 border-[#0B1121] flex items-center justify-center text-xs">
                                    👤
                                </div>
                            ))}
                        </div>
                        <p className="text-sm text-slate-500 italic">Trusted by top-tier tech recruiters.</p>
                    </div>
                </div>

                <div className="absolute bottom-12 left-12 text-xs text-slate-600 flex items-center gap-2">
                    <MapPinIcon size={12} />
                    Operating globally from San Francisco, CA
                </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="flex-1 flex items-center justify-center p-8">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center lg:text-left">
                        <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>
                        <p className="text-slate-400">Secure entry to your professional dashboard.</p>
                    </div>

                    {/* Role Switcher */}
                    <div className="bg-[#111827] p-1 rounded-lg flex border border-slate-800">
                        <button
                            onClick={() => setRole('hr')}
                            className={`flex-1 py-2.5 rounded-md text-sm font-medium flex items-center justify-center gap-2 transition-all ${role === 'hr' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
                        >
                            <Briefcase size={16} />
                            HR Access
                        </button>
                        <button
                            onClick={() => setRole('admin')}
                            className={`flex-1 py-2.5 rounded-md text-sm font-medium flex items-center justify-center gap-2 transition-all ${role === 'admin' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
                        >
                            <ShieldCheck size={16} />
                            Personal Admin
                        </button>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label className="block text-sm font-bold text-slate-300 mb-2">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3.5 text-slate-500" size={18} />
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="name@company.com"
                                    className="w-full bg-[#111827] border border-slate-800 rounded-lg py-3 pl-10 pr-4 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label className="block text-sm font-bold text-slate-300">
                                    {role === 'hr' ? 'Access Key / Password' : 'Password'}
                                </label>
                                <a href="#" className="text-xs text-blue-500 hover:text-blue-400">Forgot key?</a>
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3.5 text-slate-500" size={18} />
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••••••"
                                    className="w-full bg-[#111827] border border-slate-800 rounded-lg py-3 pl-10 pr-4 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <input type="checkbox" id="remember" className="rounded border-slate-700 bg-slate-800 text-blue-600 focus:ring-blue-500" />
                            <label htmlFor="remember" className="text-sm text-slate-400 select-none cursor-pointer">Stay authenticated for 24 hours</label>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg transition-all shadow-lg shadow-blue-900/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {isLoading ? (
                                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                            ) : (
                                <>
                                    Authorize Access <ArrowRight size={18} />
                                </>
                            )}
                        </button>
                    </form>

                    <p className="text-center text-sm text-slate-500">
                        New recruiter? <Link href="#" className="text-blue-500 hover:underline">Request Access</Link>
                    </p>

                    <footer className="pt-12 flex justify-center gap-8 text-[10px] text-slate-600 uppercase tracking-widest font-semibold text-center">
                        <span>© 2024 Ecosystem</span>
                        <span>Privacy Policy</span>
                        <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span> All Systems Operational</span>
                    </footer>
                </div>
            </div>
        </div>
    );
}

function MapPinIcon({ size }: { size: number }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
            <circle cx="12" cy="10" r="3" />
        </svg>
    )
}

import { Profile } from '@/types';
import { Mail, ArrowRight, CheckCircle2 } from 'lucide-react';

interface HeroProps {
    profile: Profile;
}

export function Hero({ profile }: HeroProps) {
    return (
        <section className="py-20 flex flex-col-reverse md:flex-row items-center justify-between gap-12">
            <div className="flex-1 space-y-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                    </span>
                    <span className="text-xs font-medium text-blue-400 tracking-wide">AVAILABLE FOR NEW PROJECTS</span>
                </div>

                <div className="space-y-4">
                    <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
                        Nothing <br />
                        <span className="text-slate-400">Impossible.</span>
                    </h1>
                    <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent italic">
                        {profile.roleSubtitle}
                    </h2>
                </div>

                <p className="text-lg text-slate-400 max-w-lg leading-relaxed">
                    {profile.bio}
                </p>

                <div className="flex items-center gap-4 pt-4">
                    <a href="#portfolio" className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium flex items-center gap-2 transition-all">
                        View Portfolio <ArrowRight size={18} />
                    </a>

                    {profile.email.includes("Login") ? (
                        <a href="/login" className="px-6 py-3 border border-slate-700 hover:border-slate-600 text-white rounded-lg font-medium transition-all">
                            Login to Contact
                        </a>
                    ) : (
                        <a href={`mailto:${profile.email}`} className="px-6 py-3 border border-slate-700 hover:border-slate-600 text-white rounded-lg font-medium transition-all">
                            Contact Me
                        </a>
                    )}
                </div>
            </div>

            <div className="relative">
                <div className="absolute -inset-4 bg-blue-500/20 rounded-3xl blur-3xl opacity-30"></div>
                <div className="relative w-80 h-96 md:w-96 md:h-[500px] bg-slate-800 rounded-3xl overflow-hidden border border-slate-700/50">
                    {/* Placeholder for Profile Image - In real app use Next.js Image */}
                    <div className="w-full h-full bg-gradient-to-b from-slate-700 to-slate-900 flex items-end justify-center">
                        <span className="text-9xl opacity-10 pb-10">👨‍💻</span>
                    </div>

                    <div className="absolute bottom-6 left-6 right-6 bg-slate-900/90 backdrop-blur-md p-4 rounded-xl border border-white/10 flex items-center gap-4">
                        <div className="p-2 bg-green-500/20 rounded-lg">
                            <CheckCircle2 className="text-green-500" size={24} />
                        </div>
                        <div>
                            <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Experience</p>
                            <p className="text-white font-bold">{profile.experienceYears}+ Years</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

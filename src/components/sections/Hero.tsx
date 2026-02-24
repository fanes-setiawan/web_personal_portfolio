import { Profile } from '@/types';
import { Mail, ArrowRight, CheckCircle2, Github, Linkedin, Twitter } from 'lucide-react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

interface HeroProps {
    profile: Profile;
}

export function Hero({ profile }: HeroProps) {
    return (
        <section className="py-12 md:py-20 flex flex-col-reverse md:flex-row items-center justify-between gap-12 md:gap-20 overflow-hidden">
            <div className="flex-1 space-y-6 md:space-y-8 max-w-2xl text-center md:text-left">
                <ScrollReveal delay={0.1} width="fit-content" className="mx-auto md:mx-0">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                        </span>
                        <span className="text-[10px] md:text-xs font-medium text-blue-400 tracking-wide uppercase">Available for new projects</span>
                    </div>
                </ScrollReveal>

                <div className="space-y-4">
                    <ScrollReveal delay={0.2} width="fit-content" className="mx-auto md:mx-0">
                        <p className="text-blue-400 font-bold tracking-widest uppercase text-sm">HI, I&apos;M {profile.name.split(' ')[0]}</p>
                    </ScrollReveal>

                    <ScrollReveal delay={0.3}>
                        <h1 className="text-4xl md:text-7xl font-bold text-white leading-tight">
                            Nothing <br />
                            <span className="text-slate-400">Impossible.</span>
                        </h1>
                    </ScrollReveal>

                    <ScrollReveal delay={0.4}>
                        <h2 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent italic">
                            {profile.roleSubtitle}
                        </h2>
                    </ScrollReveal>
                </div>

                <ScrollReveal delay={0.5}>
                    <p className="text-base md:text-lg text-slate-400 max-w-lg leading-relaxed mx-auto md:mx-0">
                        {profile.bio}
                    </p>
                </ScrollReveal>

                <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 justify-center md:justify-start">
                    <ScrollReveal delay={0.6} width="100%" className="sm:w-auto">
                        <a href="#portfolio" className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-900/20">
                            View Portfolio <ArrowRight size={18} />
                        </a>
                    </ScrollReveal>

                    <ScrollReveal delay={0.7} width="100%" className="sm:w-auto">
                        {profile.email.includes("Login") ? (
                            <a href="/login" className="w-full sm:w-auto px-6 py-3 border border-slate-700 hover:border-slate-600 text-white rounded-lg font-medium transition-all flex justify-center">
                                Login to Contact
                            </a>
                        ) : (
                            <a href={`mailto:${profile.email}`} className="w-full sm:w-auto px-6 py-3 border border-slate-700 hover:border-slate-600 text-white rounded-lg font-medium transition-all flex justify-center">
                                Contact Me
                            </a>
                        )}
                    </ScrollReveal>
                </div>

                {/* Social Media Links */}
                <div className="flex items-center justify-center md:justify-start gap-6 pt-2">
                    {profile.socials?.github && (
                        <ScrollReveal delay={0.8} width="fit-content">
                            <a
                                href={profile.socials.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-slate-400 hover:text-white transition-colors"
                                title="GitHub"
                            >
                                <Github size={24} />
                            </a>
                        </ScrollReveal>
                    )}
                    {profile.socials?.linkedin && (
                        <ScrollReveal delay={0.9} width="fit-content">
                            <a
                                href={profile.socials.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-slate-400 hover:text-blue-400 transition-colors"
                                title="LinkedIn"
                            >
                                <Linkedin size={24} />
                            </a>
                        </ScrollReveal>
                    )}
                    {profile.socials?.twitter && (
                        <ScrollReveal delay={1.0} width="fit-content">
                            <a
                                href={profile.socials.twitter}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-slate-400 hover:text-sky-400 transition-colors"
                                title="Twitter"
                            >
                                <Twitter size={24} />
                            </a>
                        </ScrollReveal>
                    )}
                </div>
            </div>

            <ScrollReveal direction="right" delay={0.4} duration={0.8} distance={40} width="fit-content">
                <div className="relative">
                    <div className="absolute -inset-4 bg-blue-500/20 rounded-3xl blur-3xl opacity-30"></div>
                    <div className="relative w-64 h-80 sm:w-80 sm:h-96 md:w-96 md:h-[500px] bg-slate-800 rounded-3xl overflow-hidden border border-slate-700/50">
                        {profile.avatarUrl ? (
                            <img
                                src={profile.avatarUrl}
                                alt={profile.name}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full bg-gradient-to-b from-slate-700 to-slate-900 flex items-end justify-center">
                                <span className="text-9xl opacity-10 pb-10">👨‍💻</span>
                            </div>
                        )}

                        <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 bg-slate-900/90 backdrop-blur-md p-3 sm:p-4 rounded-xl border border-white/10 flex items-center gap-3 sm:gap-4">
                            <div className="p-1.5 sm:p-2 bg-green-500/20 rounded-lg">
                                <CheckCircle2 className="text-green-500" size={20} />
                            </div>
                            <div>
                                <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Experience</p>
                                <p className="text-sm sm:text-base text-white font-bold">{profile.experienceYears}+ Years</p>
                            </div>
                        </div>
                    </div>
                </div>
            </ScrollReveal>

        </section>
    );
}

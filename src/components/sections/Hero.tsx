import { Profile } from '@/types';
import { Mail, ArrowRight, CheckCircle2, Github, Linkedin, Twitter } from 'lucide-react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

interface HeroProps {
    profile: Profile;
}

export function Hero({ profile }: HeroProps) {
    return (
        <section className="py-20 flex flex-col-reverse md:flex-row items-center justify-between gap-12 md:gap-20">
            <div className="flex-1 space-y-8 max-w-2xl">
                <ScrollReveal delay={0.1} width="fit-content">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                        </span>
                        <span className="text-xs font-medium text-blue-400 tracking-wide">AVAILABLE FOR NEW PROJECTS</span>
                    </div>
                </ScrollReveal>

                <div className="space-y-4">
                    <ScrollReveal delay={0.2} width="fit-content">
                        <p className="text-blue-400 font-bold tracking-widest uppercase text-sm">HI, I&apos;M {profile.name.split(' ')[0]}</p>
                    </ScrollReveal>

                    <ScrollReveal delay={0.3}>
                        <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
                            Nothing <br />
                            <span className="text-slate-400">Impossible.</span>
                        </h1>
                    </ScrollReveal>

                    <ScrollReveal delay={0.4}>
                        <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent italic">
                            {profile.roleSubtitle}
                        </h2>
                    </ScrollReveal>
                </div>

                <ScrollReveal delay={0.5}>
                    <p className="text-lg text-slate-400 max-w-lg leading-relaxed">
                        {profile.bio}
                    </p>
                </ScrollReveal>

                <div className="flex items-center gap-4 pt-4">
                    <ScrollReveal delay={0.6} width="fit-content">
                        <a href="#portfolio" className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium flex items-center gap-2 transition-all">
                            View Portfolio <ArrowRight size={18} />
                        </a>
                    </ScrollReveal>

                    <ScrollReveal delay={0.7} width="fit-content">
                        {profile.email.includes("Login") ? (
                            <a href="/login" className="px-6 py-3 border border-slate-700 hover:border-slate-600 text-white rounded-lg font-medium transition-all">
                                Login to Contact
                            </a>
                        ) : (
                            <a href={`mailto:${profile.email}`} className="px-6 py-3 border border-slate-700 hover:border-slate-600 text-white rounded-lg font-medium transition-all">
                                Contact Me
                            </a>
                        )}
                    </ScrollReveal>
                </div>

                {/* Social Media Links */}
                <div className="flex items-center gap-6 pt-2">
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
                    <div className="relative w-80 h-96 md:w-96 md:h-[500px] bg-slate-800 rounded-3xl overflow-hidden border border-slate-700/50">
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
            </ScrollReveal>
        </section>
    );
}

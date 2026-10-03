import { Profile } from '@/types';
import { Mail, ArrowRight, CheckCircle2, Github, Linkedin, Twitter, FileDown, MessageCircle, Calendar, Smartphone, Code2, Rocket } from 'lucide-react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

interface HeroProps {
    profile: Profile;
}

export function Hero({ profile }: HeroProps) {
    return (
        <section className="pt-8 pb-10 md:pt-16 md:pb-16 flex flex-col gap-12 md:gap-16 max-w-7xl mx-auto px-4 md:px-12">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8 overflow-hidden">
                <div className="flex-1 space-y-6 md:space-y-8 max-w-2xl text-center lg:text-left z-10 w-full">
                    <ScrollReveal delay={0.1} width="fit-content" className="mx-auto lg:mx-0">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 border border-blue-100 rounded-full">
                            <span className="text-blue-600 font-semibold text-sm flex items-center gap-2">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                                </span>
                                Mobile Engineer
                            </span>
                        </div>
                    </ScrollReveal>

                    <div className="space-y-4">
                        <ScrollReveal delay={0.3}>
                            <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-slate-900 leading-[1.1] tracking-tight">
                                I Build Mobile Apps <br className="hidden md:block" />
                                <span className="text-blue-600">That Actually Ship.</span>
                            </h1>
                        </ScrollReveal>

                        <ScrollReveal delay={0.5}>
                            <p className="text-base md:text-lg text-slate-500 max-w-lg leading-relaxed mx-auto lg:mx-0 font-medium">
                                {profile.bio || "I'm a Mobile Engineer with 3+ years of experience building production-ready applications for iOS and Android using Flutter, native technologies, and modern backend services."}
                            </p>
                        </ScrollReveal>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 justify-center lg:justify-start">
                        <ScrollReveal delay={0.6} width="100%" className="sm:w-auto">
                            <a href="#portfolio" className="w-full sm:w-auto px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold flex items-center justify-center gap-2 transition-all shadow-md shadow-blue-500/20 hover:shadow-lg hover:-translate-y-0.5 whitespace-nowrap">
                                View My Work <ArrowRight size={18} />
                            </a>
                        </ScrollReveal>

                        {profile.cvUrl && (
                            <ScrollReveal delay={0.7} width="100%" className="sm:w-auto">
                                <a
                                    href="/api/tracking/cv"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full sm:w-auto px-8 py-3.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 hover:border-slate-300 rounded-full font-bold flex items-center justify-center gap-2 transition-all shadow-sm hover:shadow hover:-translate-y-0.5 whitespace-nowrap"
                                >
                                    Download CV <FileDown size={18} />
                                </a>
                            </ScrollReveal>
                        )}
                        
                        <ScrollReveal delay={0.75} width="100%" className="sm:w-auto">
                            <a
                                href="https://play.google.com/store/apps/dev?id=6540217402260692469"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full sm:w-auto px-8 py-3.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 hover:border-emerald-200 rounded-full font-bold flex items-center justify-center gap-2 transition-all shadow-sm hover:shadow hover:-translate-y-0.5 whitespace-nowrap group"
                            >
                                <img src="https://www.vectorlogo.zone/logos/google_play/google_play-icon.svg" className="w-5 h-5 group-hover:scale-110 transition-transform" alt="Play Store" />
                                Play Store
                            </a>
                        </ScrollReveal>
                    </div>
                    
                    {/* Tech Stack badges like the image */}
                    <ScrollReveal delay={0.8}>
                        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mt-8">
                            <span className="flex items-center gap-1.5 text-sm font-semibold text-slate-600 bg-white px-4 py-2 rounded-full border border-slate-200 shadow-sm"><img src="https://www.vectorlogo.zone/logos/flutterio/flutterio-icon.svg" className="w-4 h-4"/> Flutter</span>
                            <span className="flex items-center gap-1.5 text-sm font-semibold text-slate-600 bg-white px-4 py-2 rounded-full border border-slate-200 shadow-sm"><img src="https://www.vectorlogo.zone/logos/apple/apple-ar21.svg" className="w-4 h-4 object-contain mb-0.5"/> iOS</span>
                            <span className="flex items-center gap-1.5 text-sm font-semibold text-slate-600 bg-white px-4 py-2 rounded-full border border-slate-200 shadow-sm"><img src="https://www.vectorlogo.zone/logos/android/android-icon.svg" className="w-4 h-4"/> Android</span>
                            <span className="flex items-center gap-1.5 text-sm font-semibold text-slate-600 bg-white px-4 py-2 rounded-full border border-slate-200 shadow-sm"><img src="https://www.vectorlogo.zone/logos/firebase/firebase-icon.svg" className="w-4 h-4"/> Firebase</span>
                            <span className="flex items-center gap-1.5 text-sm font-semibold text-slate-600 bg-white px-4 py-2 rounded-full border border-slate-200 shadow-sm"><div className="w-4 h-4 bg-blue-100 rounded-full flex items-center justify-center"><span className="text-[10px] text-blue-600 font-bold">API</span></div> REST API</span>
                            <span className="flex items-center gap-1.5 text-sm font-semibold text-slate-600 bg-white px-4 py-2 rounded-full border border-slate-200 shadow-sm"><div className="w-4 h-4 bg-purple-100 rounded-full flex items-center justify-center"><span className="text-[10px] text-purple-600 font-bold">CI</span></div> CI/CD</span>
                        </div>
                    </ScrollReveal>
                </div>

                <ScrollReveal width="auto" direction="right" delay={0.4} duration={0.8} distance={40} className="relative w-full lg:w-5/12 flex justify-center lg:justify-end shrink-0">
                    <div className="relative w-64 h-80 sm:w-[280px] sm:h-[350px] md:w-[350px] md:h-[450px] mt-10 lg:mt-0">
                        <div className="relative z-10 w-full h-full rounded-3xl overflow-hidden border border-slate-100 shadow-2xl shadow-blue-900/5 bg-white">
                            <img
                                src="/images/foto-profil.jpeg?v=1"
                                alt={profile.name}
                                className="w-full h-full object-cover object-top"
                            />
                        </div>
                    </div>
                </ScrollReveal>
            </div>

            {/* Stats Bar */}
            <ScrollReveal delay={0.9}>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 bg-white border border-slate-100 p-6 md:p-8 rounded-3xl shadow-sm mt-0">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-50 text-blue-600 rounded-xl shrink-0">
                            <Calendar size={24} />
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-900">{profile.experienceYears}+</h3>
                            <p className="text-xs text-slate-500 font-medium">Years Experience</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-50 text-blue-600 rounded-xl shrink-0">
                            <Smartphone size={24} />
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-900">20+</h3>
                            <p className="text-xs text-slate-500 font-medium">Apps & Projects</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-50 text-blue-600 rounded-xl shrink-0">
                            <Code2 size={24} />
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-900 text-sm">Cross Platform</h3>
                            <p className="text-xs text-slate-500 font-medium">Flutter & Native</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-50 text-blue-600 rounded-xl shrink-0">
                            <Rocket size={24} />
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-900 text-sm">Production Ready</h3>
                            <p className="text-xs text-slate-500 font-medium">Deploy to Play Store & App Store</p>
                        </div>
                    </div>
                </div>
            </ScrollReveal>
        </section>
    );
}

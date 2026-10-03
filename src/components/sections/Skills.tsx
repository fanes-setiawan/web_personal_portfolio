import { Skill } from '@/types';
import * as LucideIcons from 'lucide-react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Smartphone, Rocket, Database, Wrench } from 'lucide-react';

interface SkillsProps {
    skills: Skill[];
}

export function Skills({ skills }: SkillsProps) {
    const services = [
        {
            title: "Mobile App Development",
            desc: "Cross-platform apps for iOS & Android using Flutter and native technologies.",
            icon: LucideIcons.FileCode2,
            images: [
                "https://www.vectorlogo.zone/logos/flutterio/flutterio-icon.svg",
                "https://www.vectorlogo.zone/logos/apple/apple-icon.svg",
                "https://www.vectorlogo.zone/logos/android/android-icon.svg"
            ]
        },
        {
            title: "App Release & Deployment",
            desc: "Publish your app to Google Play Store and Apple App Store with complete setup and support.",
            icon: LucideIcons.Play,
            images: [
                "https://www.vectorlogo.zone/logos/google_play/google_play-icon.svg",
                "https://www.vectorlogo.zone/logos/apple/apple-icon.svg"
            ]
        },
        {
            title: "API & Backend Integration",
            desc: "REST API, Firebase, authentication, payment and third-party services integration.",
            icon: LucideIcons.CloudUpload,
            images: [
                "https://www.vectorlogo.zone/logos/firebase/firebase-icon.svg",
                "https://www.vectorlogo.zone/logos/nodejs/nodejs-icon.svg"
            ]
        },
        {
            title: "Maintenance & Support",
            desc: "Bug fixing, performance optimization, updates and store maintenance.",
            icon: LucideIcons.Settings,
            images: [
                "https://www.vectorlogo.zone/logos/github/github-icon.svg"
            ]
        }
    ];

    return (
        <section id="services" className="py-12 md:py-16 max-w-7xl mx-auto px-4 md:px-12">
            {/* Main Wrapper */}
            <div className="bg-[#f8fbff] rounded-[2rem] p-8 md:p-12 mb-12 md:mb-16 border border-blue-50">
                <ScrollReveal>
                    <div className="mb-10">
                        <h2 className="text-2xl md:text-3xl font-bold text-[#0f172a] mb-2 tracking-tight">What I Can Help With</h2>
                        <p className="text-slate-500 max-w-2xl text-sm leading-relaxed">
                            From development to deployment, I provide end-to-end mobile solutions for your business or personal project.
                        </p>
                    </div>
                </ScrollReveal>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {services.map((service, index) => {
                        const Icon = service.icon;
                        return (
                            <ScrollReveal key={index} delay={index * 0.1} distance={20}>
                                <div className="group p-6 md:p-8 bg-white border border-slate-100/80 rounded-[2rem] transition-all duration-500 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:border-blue-100 hover:-translate-y-1 flex flex-col h-full cursor-pointer relative overflow-hidden">
                                    <div className="absolute -right-4 -top-4 w-24 h-24 bg-blue-50/50 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                    
                                    <div className="flex gap-2 mb-8 relative z-10">
                                        {service.images && service.images.length > 0 ? (
                                            service.images.map((img, i) => (
                                                <div key={i} className="w-12 h-12 p-2.5 bg-gradient-to-br from-slate-50 to-slate-100/50 rounded-2xl border border-slate-200/50 flex items-center justify-center shadow-sm group-hover:border-blue-200/50 group-hover:bg-blue-50/50 transition-all duration-500">
                                                    <img src={img} alt="technology logo" className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" />
                                                </div>
                                            ))
                                        ) : (
                                            <div className="w-12 h-12 bg-gradient-to-br from-blue-50 to-indigo-50/50 text-blue-600 rounded-2xl border border-blue-100/50 flex items-center justify-center shadow-sm group-hover:bg-blue-500 group-hover:text-white transition-all duration-500">
                                                <Icon size={22} strokeWidth={2} />
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex items-center justify-between mb-3 relative z-10">
                                        <h3 className="text-[17px] font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">{service.title}</h3>
                                        {service.title === "App Release & Deployment" && (
                                            <span className="px-2.5 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-black uppercase tracking-wider rounded-full border border-emerald-200 shadow-sm animate-pulse">
                                                Available
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-slate-500 text-xs leading-relaxed mb-6 flex-grow">{service.desc}</p>
                                    <span className="inline-flex items-center gap-1 text-[13px] font-bold text-blue-600 group-hover:text-blue-700 transition-colors mt-auto">
                                        Learn More <LucideIcons.ArrowRight size={14} />
                                    </span>
                                </div>
                            </ScrollReveal>
                        );
                    })}
                </div>
            </div>

            {/* Technologies I Use */}
            <ScrollReveal>
                <div className="mb-8">
                    <h3 className="text-blue-600 font-bold uppercase tracking-widest text-xs mb-2">Tech Stack</h3>
                    <h2 className="text-2xl font-bold text-slate-900">Technologies I Use</h2>
                    <p className="text-slate-500 text-sm mt-1">Tools and frameworks that I use to build and ship mobile applications.</p>
                </div>
            </ScrollReveal>
            
            <div className="flex flex-wrap gap-4 mt-6">
                {skills.map((skill, index) => {
                    // Match specific skills to provide richer UI
                    const getEnrichedDetails = (name: string) => {
                        const lookup: Record<string, { sub: string, img?: string }> = {
                            'flutter': { sub: 'Dart', img: 'https://www.vectorlogo.zone/logos/flutterio/flutterio-icon.svg' },
                            'swift': { sub: 'iOS', img: 'https://www.vectorlogo.zone/logos/swift/swift-icon.svg' },
                            'kotlin': { sub: 'Android', img: 'https://www.vectorlogo.zone/logos/kotlinlang/kotlinlang-icon.svg' },
                            'firebase': { sub: 'Backend & Auth', img: 'https://www.vectorlogo.zone/logos/firebase/firebase-icon.svg' },
                            'git': { sub: 'Version Control', img: 'https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg' },
                            'rest api': { sub: 'Integration' }, // will fallback to lucide icon
                            'api': { sub: 'Integration' },
                            'ci/cd': { sub: 'Fastlane' },
                        };
                        const key = name.toLowerCase();
                        for (const k in lookup) {
                            if (key.includes(k)) return lookup[k];
                        }
                        return { sub: 'Technology' };
                    };

                    const details = getEnrichedDetails(skill.name);
                    const IconComponent = (LucideIcons as any)[skill.iconName] || LucideIcons.Code2;

                    return (
                        <ScrollReveal key={skill.id} delay={index * 0.05} distance={10} width="fit-content">
                            <div className="group px-5 py-3.5 bg-white border border-slate-100 rounded-[1rem] flex items-center gap-4 transition-all duration-500 hover:shadow-[0_8px_20px_rgb(0,0,0,0.04)] hover:border-blue-100 hover:-translate-y-1 cursor-default">
                                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-slate-50 border border-slate-100/50 group-hover:bg-blue-50/50 group-hover:border-blue-100/50 transition-colors duration-500">
                                    {details.img ? (
                                        <img src={details.img} alt={skill.name} className="w-6 h-6 object-contain group-hover:scale-110 transition-transform duration-500" />
                                    ) : (
                                        <div className="text-blue-500 group-hover:scale-110 transition-transform duration-500">
                                            <IconComponent size={22} strokeWidth={2} />
                                        </div>
                                    )}
                                </div>
                                <div className="flex flex-col pr-2">
                                    <span className="text-slate-800 font-bold text-[14px] leading-tight group-hover:text-blue-700 transition-colors">{skill.name}</span>
                                    <span className="text-slate-500 text-[11px] font-medium mt-0.5">{details.sub}</span>
                                </div>
                            </div>
                        </ScrollReveal>
                    );
                })}
            </div>
        </section>
    );
}

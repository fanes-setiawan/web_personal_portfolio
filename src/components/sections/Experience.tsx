"use client";

import { Company, Education } from '@/types';
import { Building2, ArrowRight, CheckCircle2, ChevronRight, PenTool, Blocks, Code2, Link, ShieldCheck, Rocket } from 'lucide-react';
import Image from 'next/image';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

interface ExperienceProps {
    companies: Company[];
    education?: Education[];
}

export function Experience({ companies, education = [] }: ExperienceProps) {
    if (companies.length === 0 && education.length === 0) return null;

    const buildSteps = [
        { num: '01', title: 'Plan', sub: 'Requirements & Analysis', icon: PenTool },
        { num: '02', title: 'Architect', sub: 'Clean Architecture & Design', icon: Blocks },
        { num: '03', title: 'Develop', sub: 'Flutter / Native implementation', icon: Code2 },
        { num: '04', title: 'Integrate', sub: 'API / Firebase / Payment', icon: Link },
        { num: '05', title: 'Test', sub: 'QA / Debug / Performance', icon: ShieldCheck },
        { num: '06', title: 'Ship', sub: 'App Store & Google Play', icon: Rocket },
    ];

    return (
        <section id="experience" className="py-12 md:py-16 max-w-7xl mx-auto px-4 md:px-12">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-8">
                
                {/* Left Column: Professional Experience */}
                <div className="lg:col-span-6 xl:col-span-7">
                    <ScrollReveal>
                        <div className="mb-8">
                            <h3 className="text-blue-600 font-bold uppercase tracking-widest text-[10px] mb-1">Career Journey</h3>
                            <h2 className="text-2xl font-bold text-[#0f172a]">Professional Experience</h2>
                        </div>
                    </ScrollReveal>

                    <div className="grid sm:grid-cols-2 gap-8">
                        {companies.map((company, index) => (
                            <ScrollReveal key={company.id} delay={index * 0.1} distance={20}>
                                <div className="group flex flex-col h-full cursor-pointer p-6 rounded-[2rem] bg-white border border-slate-100/80 hover:border-blue-100 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-1 transition-all duration-300">
                                    <div className="flex items-start gap-4 mb-5">
                                        <div className="w-14 h-14 shrink-0 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50/50 border border-blue-100/50 flex items-center justify-center overflow-hidden relative shadow-sm group-hover:scale-105 group-hover:rotate-3 transition-transform duration-500">
                                            {company.logo_url ? (
                                                <Image
                                                    src={company.logo_url}
                                                    alt={`${company.name} logo`}
                                                    fill
                                                    className="w-full h-full object-cover"
                                                    onError={(e) => {
                                                        (e.target as HTMLImageElement).src = 'https://api.dicebear.com/7.x/initials/svg?seed=' + company.name;
                                                    }}
                                                />
                                            ) : (
                                                <span className="text-blue-600 font-bold text-lg">{company.name.charAt(0)}</span>
                                            )}
                                        </div>
                                        <div>
                                            <h4 className="text-[15px] font-bold text-slate-900 leading-snug group-hover:text-blue-600 transition-colors">
                                                {company.name}
                                            </h4>
                                            <p className="text-[11px] font-medium text-slate-500 mt-0.5">
                                                {company.position || 'Mobile Engineer'} 
                                                <span className="mx-1.5 opacity-50">•</span>
                                                {company.start_date ? new Date(company.start_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : ''} 
                                                {' - '}
                                                {company.end_date ? new Date(company.end_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Present'}
                                            </p>
                                        </div>
                                    </div>
                                    
                                    <div className="text-slate-500 text-[12px] leading-relaxed flex-grow">
                                        {company.description ? (
                                            <ul className="space-y-1.5 ml-1">
                                                {company.description.split('\n').filter(line => line.trim().length > 0).map((line, i) => (
                                                    <li key={i} className="flex gap-2 items-start">
                                                        <span className="w-1 h-1 rounded-full bg-slate-300 shrink-0 mt-1.5"></span>
                                                        <span>{line.replace(/^-\s*/, '')}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <p>Professional role and key contributions at {company.name}.</p>
                                        )}
                                    </div>
                                    
                                    {/* Small arrow link simulation like the design */}
                                    <div className="mt-4 flex items-center text-blue-600 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 transform duration-300">
                                        View Details <ArrowRight size={14} className="ml-1" />
                                    </div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>

                {/* Right Column: How I Build */}
                <div className="lg:col-span-6 xl:col-span-5">
                    <ScrollReveal delay={0.2}>
                        <div className="mb-8">
                            <h3 className="text-blue-600 font-bold uppercase tracking-widest text-[10px] mb-1">How I Build</h3>
                            <h2 className="text-2xl font-bold text-[#0f172a]">From Idea to App Store</h2>
                        </div>
                    </ScrollReveal>
                    
                    <ScrollReveal delay={0.3}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {buildSteps.map((step, idx) => {
                                const Icon = step.icon;
                                return (
                                    <div key={idx} className="group relative p-6 rounded-[1.5rem] bg-white border border-slate-100/60 shadow-[0_2px_10px_rgb(0,0,0,0.02)] hover:shadow-xl hover:shadow-blue-900/5 hover:border-blue-100 transition-all duration-300 overflow-hidden cursor-default">
                                        <div className="absolute top-0 right-0 p-6 text-slate-100/80 group-hover:text-blue-50/60 font-black text-5xl transition-colors duration-500 transform translate-x-2 -translate-y-2 group-hover:scale-110">
                                            {step.num}
                                        </div>
                                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50/50 flex items-center justify-center mb-4 text-blue-600 group-hover:bg-blue-500 group-hover:text-white transition-colors duration-500 relative z-10 border border-blue-100/50 group-hover:border-blue-500 shadow-sm">
                                            <Icon size={20} strokeWidth={2} />
                                        </div>
                                        <h4 className="text-[15px] font-bold text-slate-900 leading-tight mb-1 relative z-10 group-hover:text-blue-700 transition-colors">{step.title}</h4>
                                        <p className="text-[12px] text-slate-500 font-medium relative z-10 leading-relaxed pr-2">{step.sub}</p>
                                    </div>
                                )
                            })}
                        </div>
                    </ScrollReveal>
                </div>
            </div>
        </section>
    );
}

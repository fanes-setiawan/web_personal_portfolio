"use client";

import { Company } from '@/types';
import { Building2, Calendar, MapPin, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

interface ExperienceProps {
    companies: Company[];
}

export function Experience({ companies }: ExperienceProps) {
    if (companies.length === 0) return null;

    return (
        <section id="experience" className="py-20 relative overflow-hidden">
            {/* Background Ornaments */}
            <div className="absolute top-1/4 -right-20 w-80 h-80 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="relative z-10">
                <ScrollReveal>
                    <div className="mb-12">
                        <h3 className="text-blue-500 font-bold uppercase tracking-widest text-sm mb-2 text-center md:text-left">Career Journey</h3>
                        <h2 className="text-3xl md:text-4xl font-bold text-white text-center md:text-left">Professional Experience</h2>
                    </div>
                </ScrollReveal>

                <div className="space-y-6">
                    {companies.map((company, index) => (
                        <ScrollReveal key={company.id} delay={index * 0.1} distance={30}>
                            <div
                                className="group relative bg-white/5 border border-white/5 rounded-2xl p-6 md:p-8 hover:bg-white/[0.07] hover:border-white/10 transition-all duration-300 transform hover:-translate-y-1"
                            >
                                <div className="flex flex-col md:flex-row gap-6 md:items-start">
                                    {/* Logo / Icon */}
                                    <div className="w-16 h-16 shrink-0 rounded-2xl bg-navy-900 border border-white/10 flex items-center justify-center overflow-hidden">
                                        {company.logo_url ? (
                                            <img
                                                src={company.logo_url}
                                                alt={company.name}
                                                className="w-full h-full object-contain p-2"
                                                onError={(e) => {
                                                    (e.target as HTMLImageElement).src = 'https://api.dicebear.com/7.x/initials/svg?seed=' + company.name;
                                                }}
                                            />
                                        ) : (
                                            <Building2 className="text-slate-500" size={32} />
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 space-y-4">
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                            <div>
                                                <h4 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                                                    {company.name}
                                                </h4>
                                                <div className="flex flex-wrap items-center gap-4 mt-1 text-sm text-slate-400">
                                                    <div className="flex items-center gap-1.5">
                                                        <MapPin size={14} className="text-blue-500/70" />
                                                        {company.location || 'Remote'}
                                                    </div>
                                                    {company.website && (
                                                        <a
                                                            href={company.website}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="flex items-center gap-1.5 hover:text-blue-400 transition-colors"
                                                        >
                                                            <ExternalLink size={14} />
                                                            Website
                                                        </a>
                                                    )}
                                                </div>
                                            </div>

                                            {company.start_date && (
                                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 rounded-full border border-blue-500/20">
                                                    <Calendar size={14} className="text-blue-400" />
                                                    <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">
                                                        {new Date(company.start_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                                                        {' - '}
                                                        {company.end_date
                                                            ? new Date(company.end_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
                                                            : 'Present'}
                                                    </span>
                                                </div>
                                            )}
                                        </div>

                                        <p className="text-slate-400 text-sm leading-relaxed max-w-3xl whitespace-pre-line">
                                            {company.description || 'Professional role and key contributions at ' + company.name + '.'}
                                        </p>

                                        {company.technologies && company.technologies.length > 0 && (
                                            <div className="flex flex-wrap gap-2 pt-2">
                                                {company.technologies.map((tech) => (
                                                    <span
                                                        key={tech.id}
                                                        className="px-2.5 py-1 text-[10px] font-bold text-slate-300 bg-white/5 border border-white/10 rounded-lg group-hover:bg-blue-500/10 group-hover:border-blue-500/20 group-hover:text-blue-400 transition-all"
                                                    >
                                                        {tech.name}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Decorative Line (Visual connector) */}
                                {index !== companies.length - 1 && (
                                    <div className="hidden md:block absolute -bottom-6 left-14 w-0.5 h-6 bg-slate-800" />
                                )}
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
}

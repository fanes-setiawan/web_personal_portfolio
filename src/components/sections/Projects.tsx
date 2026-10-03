"use client";

import { Project, Skill } from '@/types';
import { useState } from 'react';
import { ArrowRight, ArrowUpRight, Lock } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

import { DeviceMockup } from '@/components/ui/DeviceMockup';

interface ProjectsProps {
    projects: Project[];
    skills?: Skill[];
}

export function Projects({ projects, skills = [] }: ProjectsProps) {
    const [filter, setFilter] = useState<"all" | "ios" | "android">("all");

    const filteredProjects = projects.filter(p => filter === "all" || p.category === filter);

    return (
        <section id="portfolio" className="py-12 md:py-16 max-w-7xl mx-auto px-4 md:px-12">
            <ScrollReveal>
                <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-6">
                    <div>
                        <h3 className="text-blue-600 font-bold uppercase tracking-widest text-xs mb-2">Featured Projects</h3>
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900">My Recent Work</h2>
                        <p className="text-slate-500 text-sm mt-2">A selection of mobile applications I've built and delivered.</p>
                    </div>

                    <Link href="/projects" className="text-blue-600 font-semibold text-sm flex items-center gap-1 hover:text-blue-700 transition-colors">
                        View All Projects <ArrowRight size={16} />
                    </Link>
                </div>
            </ScrollReveal>

            <div className="grid md:grid-cols-2 gap-8">
                {filteredProjects.slice(0,4).map((project, index) => (
                    <ScrollReveal key={project.id} delay={index * 0.1} distance={30}>
                        <Link
                            href={`/projects/${project.id}`}
                            className="group bg-white rounded-[2.5rem] overflow-hidden border border-slate-100/80 transition-all duration-500 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-1 hover:border-blue-100 flex flex-col h-full cursor-pointer relative"
                        >
                            {/* Content Area */}
                            <div className="p-8 pb-0 flex flex-col flex-grow z-10 relative">
                                {/* Decorative Arrow on Hover */}
                                <div className="absolute top-8 right-8 w-10 h-10 bg-slate-50 group-hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors duration-500">
                                    <ArrowUpRight className="text-slate-400 group-hover:text-white transition-colors duration-500" size={20} />
                                </div>
                                
                                <div className="flex items-center gap-4 mb-5 mt-2">
                                    <div className="w-14 h-14 bg-gradient-to-br from-blue-50 to-indigo-50/50 rounded-2xl flex items-center justify-center border border-blue-100/50 shadow-sm shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                                        <span className="text-xl font-bold bg-gradient-to-br from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                            {project.title.charAt(0)}
                                        </span>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-tight pr-12">{project.title}</h3>
                                        <div className="flex items-center gap-2 mt-1.5">
                                            <span className="inline-flex w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                            <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest">{project.category || 'Mobile App'}</p>
                                        </div>
                                    </div>
                                </div>

                                <p className="text-slate-600 text-[15px] leading-relaxed mb-6 line-clamp-3">
                                    {project.shortDescription}
                                </p>

                                {project.tags && project.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mb-8">
                                        {project.tags.slice(0, 3).map(tag => (
                                            <span key={tag} className="flex items-center px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-xl text-xs font-semibold text-slate-600 group-hover:border-blue-100 group-hover:bg-blue-50/50 transition-colors">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                            
                            {/* Dynamic Device Mockup Area */}
                            <div className="relative h-64 sm:h-72 mt-auto bg-gradient-to-b from-transparent to-slate-50/80 overflow-hidden flex items-end justify-center group-hover:to-blue-50/30 transition-colors duration-500">
                                {/* Decorative glow */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-blue-400/20 blur-[60px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                                
                                {project.imageUrl ? (
                                    <div className="relative w-full h-full flex items-end justify-center z-10 translate-y-8 group-hover:translate-y-4 transition-transform duration-700 ease-out">
                                        
                                        {/* LAYOUT 1: Two Tilted Phones (Default) */}
                                        {(!project.mockup_style || project.mockup_style === 'layout1') && (
                                            <>
                                                <DeviceMockup 
                                                    src={project.imageUrl?.split(',')[0] || ''} 
                                                    alt={project.title} 
                                                    className="w-[120px] sm:w-[130px] absolute -ml-[90px] mt-12 rotate-[-12deg] group-hover:rotate-[-18deg] group-hover:-translate-x-6 group-hover:-translate-y-2 transition-all duration-700 opacity-90 shadow-xl" 
                                                />
                                                <DeviceMockup 
                                                    src={project.imageUrl?.split(',')[1] || ''} 
                                                    alt={project.title} 
                                                    className="w-[140px] sm:w-[150px] absolute ml-[70px] mt-4 rotate-[8deg] group-hover:rotate-[14deg] group-hover:translate-x-6 group-hover:-translate-y-4 transition-all duration-700 shadow-[0_20px_50px_rgba(0,0,0,0.3)] z-10" 
                                                />
                                            </>
                                        )}

                                        {/* LAYOUT 2: Tablet + Phone */}
                                        {project.mockup_style === 'layout2' && (
                                            <>
                                                <DeviceMockup 
                                                    type="tablet"
                                                    src={project.imageUrl?.split(',')[0] || ''} 
                                                    alt={project.title} 
                                                    className="w-[240px] sm:w-[260px] absolute -ml-16 mt-8 group-hover:-translate-y-4 group-hover:scale-[1.02] transition-all duration-700 shadow-xl" 
                                                />
                                                <DeviceMockup 
                                                    src={project.imageUrl?.split(',')[1] || ''} 
                                                    alt={project.title} 
                                                    className="w-[90px] sm:w-[100px] absolute ml-[140px] mt-24 rotate-[6deg] group-hover:translate-x-6 group-hover:-translate-y-6 group-hover:rotate-[12deg] transition-all duration-700 shadow-[0_20px_50px_rgba(0,0,0,0.4)] z-10" 
                                                />
                                            </>
                                        )}

                                        {/* LAYOUT 3: Single Phone */}
                                        {project.mockup_style === 'layout3' && (
                                            <>
                                                <DeviceMockup 
                                                    src={project.imageUrl?.split(',')[0] || ''} 
                                                    alt={project.title} 
                                                    className="w-[160px] sm:w-[180px] absolute mt-4 group-hover:-translate-y-4 group-hover:scale-105 transition-all duration-700 shadow-[0_20px_50px_rgba(0,0,0,0.3)] z-10" 
                                                />
                                            </>
                                        )}

                                        {/* LAYOUT 4: Multi Phones */}
                                        {project.mockup_style === 'layout4' && (
                                            <>
                                                {project.imageUrl?.split(',').filter(Boolean).slice(0, 3).map((src, idx) => (
                                                    <DeviceMockup 
                                                        key={idx}
                                                        src={src} 
                                                        alt={project.title} 
                                                        className={`w-[100px] sm:w-[110px] absolute transition-all duration-700 shadow-[0_20px_50px_rgba(0,0,0,0.3)] ${
                                                            idx === 0 ? '-ml-[120px] mt-12 rotate-[-8deg] group-hover:-translate-y-4 group-hover:-rotate-[12deg] opacity-80' : 
                                                            idx === 1 ? 'mt-4 group-hover:-translate-y-6 group-hover:scale-105 z-10' : 
                                                            'ml-[120px] mt-12 rotate-[8deg] group-hover:-translate-y-4 group-hover:rotate-[12deg] opacity-80'
                                                        }`} 
                                                    />
                                                ))}
                                            </>
                                        )}
                                        
                                    </div>
                                ) : (
                                    <div className="relative w-[80%] h-[90%] rounded-t-[2rem] bg-slate-100 border-[8px] border-slate-800 shadow-2xl group-hover:-translate-y-6 transition-transform duration-500 flex items-center justify-center z-10">
                                        <span className="text-4xl opacity-20">📱</span>
                                    </div>
                                )}
                            </div>
                        </Link>
                    </ScrollReveal>
                ))}
            </div>
        </section>
    );
}

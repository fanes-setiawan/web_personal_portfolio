"use client";

import { Project } from '@/types';
import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface ProjectsProps {
    projects: Project[];
}

export function Projects({ projects }: ProjectsProps) {
    const [filter, setFilter] = useState<"all" | "ios" | "android">("all");

    const filteredProjects = projects.filter(p => filter === "all" || p.category === filter);

    return (
        <section id="portfolio" className="py-20">
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-6">
                <div>
                    <h3 className="text-blue-500 font-bold uppercase tracking-widest text-sm mb-2">Selected Work</h3>
                    <h2 className="text-3xl md:text-4xl font-bold text-white">Built for Impact</h2>
                </div>

                <div className="flex items-center gap-2 p-1 bg-slate-800/50 rounded-lg border border-slate-700/50">
                    {(['all', 'ios', 'android'] as const).map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`
                        px-4 py-2 rounded-md text-sm font-medium transition-all capitalize
                        ${filter === cat
                                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20'
                                    : 'text-slate-400 hover:text-white hover:bg-slate-700/50'}
                    `}
                        >
                            {cat === 'all' ? 'All Projects' : cat === 'ios' ? 'iOS' : 'Android'}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.map((project) => (
                    <div key={project.id} className="group relative bg-[#0F1629] rounded-2xl overflow-hidden border border-slate-800 hover:border-slate-600 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-900/5 flex flex-col h-full">
                        {/* Image Area */}
                        <div className="relative h-64 overflow-hidden bg-slate-800">
                            {/* Placeholder for project images */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-slate-800 to-slate-700 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                                <span className="text-6xl opacity-20">📱</span>
                            </div>

                            <div className="absolute top-4 left-4 flex gap-2">
                                {project.tags.map(tag => (
                                    <span key={tag} className="px-2 py-1 bg-black/40 backdrop-blur-md border border-white/10 rounded text-[10px] font-bold text-slate-300 uppercase tracking-wider">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Content Area */}
                        <div className="p-6 flex flex-col flex-grow">
                            <div className="flex items-start justify-between mb-3">
                                <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">{project.title}</h3>
                                <Link href={`/projects/${project.id}`} className="p-2 bg-slate-800 hover:bg-blue-600 rounded-full text-slate-400 hover:text-white transition-all">
                                    <ArrowUpRight size={18} />
                                </Link>
                            </div>

                            <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-grow">
                                {project.description}
                            </p>

                            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                                <span className="text-xs font-mono text-slate-500">2024</span>
                                <span className="text-xs font-bold text-green-500 uppercase tracking-wider">Published</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

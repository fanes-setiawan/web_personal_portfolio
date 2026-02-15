import { Project } from '@/types';
import { ArrowLeft, Share2, DownloadCloud } from 'lucide-react';
import Link from 'next/link';

interface CaseStudyHeaderProps {
    project: Project;
}

export function CaseStudyHeader({ project }: CaseStudyHeaderProps) {
    return (
        <header className="pt-8 pb-16">
            <div className="flex items-center justify-between mb-12">
                <Link href="/" className="group flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                    <div className="p-2 border border-slate-700 rounded-full group-hover:bg-slate-800 transition-colors">
                        <ArrowLeft size={20} />
                    </div>
                    <span className="text-sm font-medium">Back to Portfolio</span>
                </Link>
                <div className="flex gap-4">
                    <button className="p-2 text-slate-400 hover:text-white transition-colors">
                        <Share2 size={20} />
                    </button>
                    <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold rounded-lg flex items-center gap-2 transition-colors">
                        <DownloadCloud size={16} />
                        Edit Case Study
                    </button>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                    <div className="flex items-center gap-3 mb-4">
                        <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider rounded-full">
                            {project.shortDescription}
                        </span>
                        <span className="text-slate-500 text-xs font-mono">2023 - 2024</span>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                        {project.title}
                    </h1>

                    <p className="text-lg text-slate-400 leading-relaxed mb-8 border-l-4 border-blue-500 pl-6">
                        {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                        {project.tags.map(tag => (
                            <span key={tag} className="px-3 py-1 bg-slate-800 border border-slate-700 text-slate-300 text-xs font-medium rounded-md">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Key Stats Grid */}
                {project.stats && (
                    <div className="grid grid-cols-2 gap-4">
                        {project.stats.map((stat, idx) => (
                            <div key={idx} className="p-6 bg-[#111827] border border-slate-800 rounded-2xl flex flex-col items-center text-center hover:border-blue-500/30 transition-colors">
                                <span className="text-3xl font-bold text-white mb-1">{stat.value}</span>
                                <span className="text-xs text-slate-500 uppercase tracking-widest font-semibold">{stat.label}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </header>
    );
}

import { Project } from '@/types';
import { ArrowLeft, Share2, Building2, User, Calendar, DownloadCloud, Apple, Play } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

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
                    <Link
                        href={`/admin/projects`}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold rounded-lg flex items-center gap-2 transition-colors"
                    >
                        Edit Case Study
                    </Link>
                </div>
            </div>

            {/* Hero Image Section */}
            <div className="relative w-full h-[300px] md:h-[500px] mb-12 rounded-3xl overflow-hidden bg-slate-800 border border-slate-800 shadow-2xl">
                {project.imageUrl ? (
                    <Image
                        src={project.imageUrl}
                        alt={project.title}
                        fill
                        priority
                        className="object-cover"
                    />
                ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-navy-900 flex items-center justify-center">
                        <span className="text-8xl opacity-10">📱</span>
                    </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent opacity-60" />
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-start">
                <div>
                    <div className="flex flex-wrap items-center gap-4 mb-6">
                        <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider rounded-full">
                            {project.category}
                        </span>
                        {project.period && (
                            <div className="flex items-center gap-1.5 text-slate-400 text-xs font-medium">
                                <Calendar size={14} className="text-blue-500" />
                                <span>{project.period}</span>
                            </div>
                        )}
                    </div>

                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight uppercase tracking-tight">
                        {project.title}
                    </h1>

                    {/* Metadata Badges */}
                    <div className="flex flex-wrap gap-4 mb-6">
                        {project.company && (
                            <div className="flex flex-col gap-1">
                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Client / Company</span>
                                <div className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-xl">
                                    <Building2 size={16} className="text-blue-400" />
                                    <span className="text-sm font-bold text-white">{project.company}</span>
                                </div>
                            </div>
                        )}
                        {project.role && (
                            <div className="flex flex-col gap-1">
                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">My Role</span>
                                <div className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-xl">
                                    <User size={16} className="text-blue-400" />
                                    <span className="text-sm font-bold text-white">{project.role}</span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* App Store Links */}
                    {(project.appStoreUrl || project.playStoreUrl) && (
                        <div className="flex flex-wrap gap-3 mb-10">
                            {project.appStoreUrl && (
                                <a
                                    href={project.appStoreUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-5 py-2.5 bg-white text-black hover:bg-slate-200 transition-colors rounded-xl font-bold text-xs"
                                >
                                    <Apple size={18} fill="currentColor" />
                                    App Store
                                </a>
                            )}
                            {project.playStoreUrl && (
                                <a
                                    href={project.playStoreUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-5 py-2.5 bg-slate-800 border border-slate-700 text-white hover:bg-slate-700 transition-colors rounded-xl font-bold text-xs"
                                >
                                    <Play size={16} fill="currentColor" />
                                    Google Play
                                </a>
                            )}
                        </div>
                    )}

                    <p className="text-lg text-slate-400 leading-relaxed mb-8 border-l-4 border-blue-500 pl-6 whitespace-pre-line italic">
                        {project.shortDescription}
                    </p>

                    <div className="flex flex-wrap gap-2">
                        {project.tags.map(tag => (
                            <span key={tag} className="px-3 py-1 bg-slate-900 border border-slate-800 text-slate-400 text-[10px] font-bold uppercase tracking-widest rounded-md">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Key Stats Grid */}
                {project.stats && project.stats.length > 0 && (
                    <div className="grid grid-cols-2 gap-4">
                        {project.stats.map((stat, idx) => (
                            <div key={idx} className="p-6 bg-[#0F1629] border border-slate-800 rounded-2xl flex flex-col items-center text-center hover:border-blue-500/30 transition-all group">
                                <span className="text-3xl font-black text-white mb-1 group-hover:text-blue-400 transition-colors uppercase">{stat.value}</span>
                                <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold group-hover:text-slate-400 transition-colors">{stat.label}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="mt-16 pt-16 border-t border-slate-800/50">
                <p className="text-slate-500 text-sm leading-relaxed max-w-3xl">
                    {project.description}
                </p>
            </div>
        </header>
    );
}

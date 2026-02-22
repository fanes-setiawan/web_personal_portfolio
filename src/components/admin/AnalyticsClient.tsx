'use client';

import { BarChart3, PieChart, TrendingUp, Code2, Building2, Star, HardDrive, Files } from 'lucide-react';

interface AnalyticsProps {
    stats: {
        totalProjects: number;
        totalCompanies: number;
        totalSkills: number;
        categoryDist: { label: string; count: number; color: string }[];
        topTags: { tag: string; count: number }[];
        topSkills: { name: string; level: number }[];
        storage: { totalSizeBytes: number; totalCount: number };
    }
}

export function AnalyticsClient({ stats }: AnalyticsProps) {
    const maxProjectCount = Math.max(...stats.categoryDist.map(d => d.count), 1);
    const maxSkillLevel = 100;

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Top Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400">
                        <BarChart3 size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-slate-400">Total Projects</p>
                        <p className="text-2xl font-bold text-white">{stats.totalProjects}</p>
                    </div>
                </div>
                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400">
                        <Building2 size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-slate-400">Companies</p>
                        <p className="text-2xl font-bold text-white">{stats.totalCompanies}</p>
                    </div>
                </div>
                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                        <Star size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-slate-400">Core Skills</p>
                        <p className="text-2xl font-bold text-white">{stats.totalSkills}</p>
                    </div>
                </div>
                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center text-orange-400">
                        <HardDrive size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-slate-400">Storage Usage</p>
                        <div className="flex items-baseline gap-2">
                            <p className="text-2xl font-bold text-white">
                                {(stats.storage.totalSizeBytes / (1024 * 1024)).toFixed(2)} MB
                            </p>
                            <span className="text-xs text-slate-500">({stats.storage.totalCount} files)</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Category Distribution */}
                <div className="bg-white/5 border border-white/10 p-8 rounded-2xl">
                    <div className="flex items-center gap-2 mb-8">
                        <PieChart className="text-primary" size={20} />
                        <h3 className="text-lg font-bold text-white">Project Distribution</h3>
                    </div>
                    <div className="space-y-6">
                        {stats.categoryDist.map((cat) => (
                            <div key={cat.label} className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-300 font-medium capitalize">{cat.label}</span>
                                    <span className="text-slate-500">{cat.count} projects</span>
                                </div>
                                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full ${cat.color} rounded-full transition-all duration-1000`}
                                        style={{ width: `${(cat.count / stats.totalProjects) * 100}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Top Technologies */}
                <div className="bg-white/5 border border-white/10 p-8 rounded-2xl">
                    <div className="flex items-center gap-2 mb-8">
                        <Code2 className="text-primary" size={20} />
                        <h3 className="text-lg font-bold text-white">Top Technologies</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {stats.topTags.map((tag, i) => (
                            <div key={tag.tag} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/5 group hover:border-white/10 transition-colors">
                                <div className="w-8 h-8 rounded-lg bg-navy-900 border border-white/5 flex items-center justify-center text-xs font-bold text-slate-500">
                                    #{i + 1}
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-semibold text-white group-hover:text-primary transition-colors">{tag.tag}</p>
                                    <p className="text-[10px] text-slate-500">{tag.count} usages</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Skill Levels */}
                <div className="bg-white/5 border border-white/10 p-8 rounded-2xl lg:col-span-2">
                    <div className="flex items-center gap-2 mb-8">
                        <TrendingUp className="text-primary" size={20} />
                        <h3 className="text-lg font-bold text-white">Top Rated Skills</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {stats.topSkills.map((skill) => (
                            <div key={skill.name} className="space-y-3">
                                <div className="flex justify-between items-end">
                                    <p className="text-sm font-bold text-white tracking-tight">{skill.name}</p>
                                    <p className="text-[10px] font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full border border-primary/20">
                                        {skill.level}%
                                    </p>
                                </div>
                                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-blue-600 to-primary rounded-full"
                                        style={{ width: `${skill.level}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

import { Project } from '@/types';
import { Zap, Shield } from 'lucide-react';

interface ChallengesProps {
    project: Project;
}

export function Challenges({ project }: ChallengesProps) {
    if (!project.caseStudy?.challenges) return null;
    const { challenges } = project.caseStudy;

    return (
        <section className="py-12 border-t border-slate-800/50">
            <h2 className="text-3xl font-bold text-white mb-8">Key Challenges & Optimizations</h2>
            <div className="grid gap-6">
                {challenges.map((challenge, idx) => (
                    <div key={idx} className="p-8 bg-[#0F1629] border border-slate-800 rounded-2xl hover:border-blue-500/30 transition-colors">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-blue-900/20 rounded-lg text-blue-400">
                                {idx === 0 ? <Zap size={24} /> : <Shield size={24} />}
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white mb-2">{challenge.title}</h3>
                                <p className="text-slate-400 leading-relaxed mb-4">
                                    {challenge.description}
                                </p>
                                <div className="flex gap-2">
                                    {challenge.tags.map(tag => (
                                        <span key={tag} className="px-3 py-1 bg-slate-900 border border-slate-800 text-slate-500 text-xs font-mono rounded">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

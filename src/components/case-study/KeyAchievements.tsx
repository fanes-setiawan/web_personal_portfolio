import { Project } from '@/types';
import { Trophy, CheckCircle2 } from 'lucide-react';

interface KeyAchievementsProps {
    project: Project;
}

export function KeyAchievements({ project }: KeyAchievementsProps) {
    if (!project.achievements || project.achievements.length === 0) return null;

    return (
        <section className="py-12 border-t border-slate-200">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                    <Trophy className="text-blue-500" size={24} />
                </div>
                Tasks & Key Achievements
            </h2>
            <div className="grid gap-4">
                {project.achievements.map((achievement, idx) => (
                    <div 
                        key={idx} 
                        className="group relative p-6 bg-white border border-slate-200 rounded-2xl hover:border-blue-500 hover:shadow-md transition-all duration-300"
                    >
                        <div className="flex items-start gap-4">
                            <div className="mt-1 p-1 bg-blue-50 rounded-full text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300 flex-shrink-0">
                                <CheckCircle2 size={16} />
                            </div>
                            <p className="text-slate-700 leading-relaxed font-medium group-hover:text-slate-900 transition-colors duration-300">
                                {achievement.replace(/^-\s*/, '')}
                            </p>
                        </div>
                        
                        {/* Subtle background glow on hover */}
                        <div className="absolute inset-0 bg-blue-50/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none" />
                    </div>
                ))}
            </div>
        </section>
    );
}

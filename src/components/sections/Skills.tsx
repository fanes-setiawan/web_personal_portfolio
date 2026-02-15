import { Skill } from '@/types';
import * as LucideIcons from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface SkillsProps {
    skills: Skill[];
}

export function Skills({ skills }: SkillsProps) {
    return (
        <section id="skills" className="py-20">
            <div className="mb-12">
                <h3 className="text-blue-500 font-bold uppercase tracking-widest text-sm mb-2">Technical Proficiency</h3>
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-white max-w-lg">
                        Modern stack for future-proof applications
                    </h2>
                    <p className="text-slate-400 max-w-sm text-sm leading-relaxed">
                        Mastery over cross-platform and native ecosystems ensuring high-performance delivery on all devices.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {skills.map((skill) => {
                    // Dynamic icon rendering
                    // Note: In a real app, you might want a safer mapping strategy
                    const IconComponent = (LucideIcons as any)[skill.iconName] || LucideIcons.Code2;

                    return (
                        <div key={skill.id} className="group p-6 bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 hover:border-blue-500/30 rounded-2xl transition-all duration-300 flex flex-col items-center justify-center gap-4 text-center cursor-default">
                            <div className="p-3 bg-slate-900 rounded-xl group-hover:scale-110 transition-transform duration-300 group-hover:bg-blue-500/10">
                                <IconComponent className="text-slate-400 group-hover:text-blue-400 transition-colors" size={32} />
                            </div>
                            <span className="text-slate-300 font-medium group-hover:text-white transition-colors">{skill.name}</span>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}

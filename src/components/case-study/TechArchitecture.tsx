import { Project } from '@/types';
import { Layers, Database, Layout, Box } from 'lucide-react';

interface TechArchitectureProps {
    project: Project;
}

export function TechArchitecture({ project }: TechArchitectureProps) {
    if (!project.caseStudy?.technicalArchitecture) return null;
    const { description, layers } = project.caseStudy.technicalArchitecture;

    return (
        <section className="py-16">
            <h2 className="text-3xl font-bold text-white mb-6">Technical Architecture</h2>
            <p className="text-slate-400 max-w-3xl mb-12">
                {description}
            </p>

            <div className="grid md:grid-cols-3 gap-6">
                {layers.map((layer, idx) => {
                    const isFirst = idx === 0;
                    const isLast = idx === layers.length - 1;

                    return (
                        <div key={idx} className="relative p-8 bg-[#0F1629] border border-blue-900/30 rounded-2xl flex flex-col items-center text-center group hover:border-blue-500/50 transition-all">
                            {/* Connecting Lines for Desktop */}
                            {!isLast && (
                                <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-[2px] bg-blue-900/50 z-0"></div>
                            )}
                            {!isLast && (
                                <div className="hidden md:block absolute top-[calc(50%-4px)] -right-1 w-2 h-2 border-t-2 border-r-2 border-blue-900/50 rotate-45"></div>
                            )}

                            <div className="p-4 bg-slate-900 rounded-xl mb-6 shadow-inner border border-slate-800 group-hover:bg-blue-900/10 group-hover:border-blue-500/30 transition-colors z-10 relative">
                                {idx === 0 ? <Database className="text-blue-400" size={32} /> :
                                    idx === 1 ? <Box className="text-blue-400" size={32} /> :
                                        <Layout className="text-blue-400" size={32} />}
                            </div>

                            <h4 className="text-xl font-bold text-white mb-2">{layer.name}</h4>
                            <p className="text-xs text-blue-300 uppercase tracking-wider font-mono mb-4">
                                {layer.description.split("•").map((item, i) => (
                                    <span key={i} className="block py-1">{item}</span>
                                ))}
                            </p>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}

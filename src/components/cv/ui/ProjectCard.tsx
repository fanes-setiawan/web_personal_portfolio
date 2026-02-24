import { Project } from '@/types';

interface ProjectCardProps {
    project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
    return (
        <div className="p-0 bg-transparent border-none group">
            <h4 className="font-black text-[#0f172a] text-lg mb-1.5 leading-tight group-hover:text-[#3b82f6] transition-colors">
                {project.title}
            </h4>
            <p className="text-[14px] text-[#475569] mb-4 leading-relaxed font-medium">
                {project.shortDescription}
            </p>
            <div className="flex flex-wrap gap-2">
                {project.tags?.map(tag => (
                    <span
                        key={tag}
                        className="px-2.5 py-1 bg-[#f8fafc] text-[#64748b] text-[9px] font-black rounded border border-[#f1f5f9] uppercase tracking-widest"
                    >
                        {tag}
                    </span>
                ))}
            </div>
        </div>
    );
}

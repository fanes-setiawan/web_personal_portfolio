import { Skill } from '@/types';

interface SkillBadgeProps {
    skill: Skill;
}

export function SkillBadge({ skill }: SkillBadgeProps) {
    return (
        <span className="px-3 py-1.5 bg-[#f8fafc] text-[#1e293b] text-[10px] font-black rounded border border-[#f1f5f9] uppercase tracking-widest whitespace-nowrap">
            {skill.name}
        </span>
    );
}

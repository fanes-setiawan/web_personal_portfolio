interface EducationItem {
    degree: string;
    institution: string;
    period: string;
}

interface EducationCardProps {
    education: EducationItem;
}

export function EducationCard({ education }: EducationCardProps) {
    return (
        <div className="p-0 bg-transparent border-none">
            <div className="font-black text-[#0f172a] text-[15px] mb-1 leading-tight">{education.degree}</div>
            <div className="text-[#475569] text-[13px] font-bold mb-2 uppercase tracking-wide">{education.institution}</div>
            <div className="text-[10px] font-black text-[#94a3b8] uppercase tracking-widest">{education.period}</div>
        </div>
    );
}

import { Company } from '@/types';

interface ExperienceTimelineProps {
    companies: Company[];
}

export function ExperienceTimeline({ companies }: ExperienceTimelineProps) {
    return (
        <div className="space-y-14">
            {companies.map((company, index) => (
                <div key={company.id} className="relative pl-12 border-l border-[#f1f5f9]">
                    <div className="absolute -left-[6px] top-[14px] w-3 h-3 bg-[#ffffff] rounded-full border-2 border-[#3b82f6] shadow-[0_0_0_4px_white]"></div>
                    <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                            <h4 className="text-xl font-black text-[#0f172a] tracking-tight leading-tight mb-1">{company.name}</h4>
                            <p className="text-[13px] text-[#475569] font-bold uppercase tracking-wider">{company.location || 'Remote'}</p>
                        </div>
                        <span className="px-3 py-1 bg-[#f8fafc] text-[10px] font-black text-[#64748b] uppercase tracking-widest rounded border border-[#f1f5f9] mt-1">
                            {company.start_date ? new Date(company.start_date).getFullYear() : '2023'}
                            {company.end_date ? ` — ${new Date(company.end_date).getFullYear()}` : ' — Present'}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
}

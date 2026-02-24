interface SectionProps {
    title: string;
    children: React.ReactNode;
    className?: string;
}

export function Section({ title, children, className = "" }: SectionProps) {
    return (
        <section className={`mb-14 ${className}`}>
            <h3 className="text-[12px] font-black text-[#64748b] uppercase tracking-[0.25em] mb-8 flex items-center gap-3">
                <span className="w-6 h-[3px] bg-[#3b82f6] rounded-full"></span>
                {title}
            </h3>
            {children}
        </section>
    );
}

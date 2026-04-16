"use client";

import { useState, useRef } from 'react';
import { Sidebar } from '@/components/cv/Sidebar';
import { CVPreview } from '@/components/cv/CVPreview';
import { Profile, Project, Skill, Company } from '@/types';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { X, Layers } from 'lucide-react';


interface CVGeneratorClientProps {
    profile: Profile;
    skills: Skill[];
    projects: Project[];
    companies: Company[];
    isAdmin?: boolean;
}

export default function CVGeneratorClient({ profile, skills, projects, companies, isAdmin = false }: CVGeneratorClientProps) {
    const [settings, setSettings] = useState({
        showSalary: false,
        showPrivateProjects: isAdmin,
        fullContactInfo: true,
        selectedProjectIds: projects.map(p => p.id),
        selectedCompanyIds: companies.map(c => c.id),
    });

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isExporting, setIsExporting] = useState(false);
    const cvRef = useRef<HTMLDivElement>(null);


    const handleExport = async () => {
        if (!cvRef.current) return;

        setIsExporting(true);

        // Track the download event
        try {
            fetch('/api/tracking/event', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ eventType: 'CV_DOWNLOAD', details: 'Generated PDF' }),
            });
        } catch (e) {
            // Silently fail tracking
        }

        // Temporarily remove shadow and transform for clean capture
        const element = cvRef.current;
        const previousBoxShadow = element.style.boxShadow;
        const previousTransform = element.style.transform;

        element.style.boxShadow = 'none';
        element.style.transform = 'none';

        try {
            const canvas = await html2canvas(element, {
                scale: 3, // Higher scale for even better quality
                useCORS: true,
                allowTaint: true,
                logging: false,
                backgroundColor: '#ffffff',
                imageTimeout: 15000,
            });

            const imgData = canvas.toDataURL('image/png', 1.0);
            const pdf = new jsPDF({
                orientation: canvas.width > canvas.height ? 'landscape' : 'portrait',
                unit: 'px',
                format: [canvas.width, canvas.height],
                compress: true,
            });

            pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height, undefined, 'FAST');
            pdf.save(`Fanes Setiawan_CV.pdf`);
        } catch (error: any) {
            console.error("PDF Export failed:", error);
            alert(`Failed to generate PDF: ${error.message || "Unknown error"}`);
        } finally {
            // Restore original styles
            element.style.boxShadow = previousBoxShadow;
            element.style.transform = previousTransform;
            setIsExporting(false);
        }
    };

    return (
        <div className="flex flex-col lg:flex-row min-h-screen bg-[#0B1121] relative">
            {/* Global Download Button */}
            <button
                onClick={handleExport}
                disabled={isExporting}
                className="fixed bottom-6 right-6 z-[100] px-6 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-full shadow-2xl shadow-blue-900/40 hover:scale-105 active:scale-95 transition-all flex items-center gap-3 group border border-blue-500/30"
            >
                {isExporting ? <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span> : <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><path d="M12 18v-6"/><path d="m9 15 3 3 3-3"/></svg>}
                <span className="font-bold text-sm lg:text-base">{isExporting ? 'Generating...' : 'Download CV'}</span>
            </button>

            {isAdmin && (
                <>
                    {/* Admin Mobile Sidebar Toggle */}
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="lg:hidden fixed top-6 right-6 z-[100] p-3 bg-slate-800 text-white rounded-xl shadow-2xl shadow-black/40 hover:scale-105 active:scale-95 transition-all border border-slate-700"
                    >
                        {isSidebarOpen ? <X size={20} /> : <Layers size={20} />}
                    </button>

                    <Sidebar
                        settings={settings}
                        setSettings={setSettings}
                        projects={projects}
                        companies={companies}
                        isOpen={isSidebarOpen}
                        setIsOpen={setIsSidebarOpen}
                    />
                </>
            )}

            <div className={`flex-1 w-full overflow-x-hidden md:overflow-x-visible ${!isAdmin ? 'lg:pl-0' : ''}`}>
                <CVPreview
                    profile={profile}
                    skills={skills}
                    projects={projects}
                    companies={companies}
                    settings={settings}
                    cvRef={cvRef}
                />
            </div>
        </div>

    );
}

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
}

export default function CVGeneratorClient({ profile, skills, projects, companies }: CVGeneratorClientProps) {
    const [settings, setSettings] = useState({
        showSalary: false,
        showPrivateProjects: true,
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
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4',
                compress: true,
            });

            const imgWidth = 210;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;

            pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight, undefined, 'FAST');
            pdf.save(`${profile.name.replace(/\s+/g, '_')}_CV.pdf`);
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
            {/* Mobile Sidebar Toggle */}
            <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="lg:hidden fixed bottom-6 right-6 z-[100] p-4 bg-blue-600 text-white rounded-full shadow-2xl shadow-blue-900/40 hover:scale-110 active:scale-95 transition-all"
            >
                {isSidebarOpen ? <X size={24} /> : <Layers size={24} />}
            </button>

            <Sidebar
                settings={settings}
                setSettings={setSettings}
                onExport={handleExport}
                isExporting={isExporting}
                projects={projects}
                companies={companies}
                isOpen={isSidebarOpen}
                setIsOpen={setIsSidebarOpen}
            />
            <div className="flex-1 w-full overflow-x-hidden md:overflow-x-visible">
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

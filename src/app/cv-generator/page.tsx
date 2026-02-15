"use client";

import { useState, useRef } from 'react';
import { Sidebar } from '@/components/cv/Sidebar';
import { CVPreview } from '@/components/cv/CVPreview';
import { profileData, skillsData, projectsData } from '@/data/mockData';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default function CVGeneratorPage() {
    const [settings, setSettings] = useState({
        showSalary: false,
        showPrivateProjects: true,
        fullContactInfo: true,
    });

    const [isExporting, setIsExporting] = useState(false);
    const cvRef = useRef<HTMLDivElement>(null);

    const handleExport = async () => {
        if (!cvRef.current) return;

        setIsExporting(true);

        try {
            const canvas = await html2canvas(cvRef.current, {
                scale: 2, // Improve quality
                useCORS: true,
                logging: false,
            });

            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4',
            });

            const imgWidth = 210;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;

            pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
            pdf.save(`${profileData.name.replace(' ', '_')}_CV.pdf`);
        } catch (error) {
            console.error("PDF Export failed:", error);
            alert("Failed to generate PDF. Check console for details.");
        } finally {
            setIsExporting(false);
        }
    };

    return (
        <div className="flex min-h-screen bg-[#0B1121]">
            <Sidebar
                settings={settings}
                setSettings={setSettings}
                onExport={handleExport}
                isExporting={isExporting}
            />
            <CVPreview
                profile={profileData}
                skills={skillsData}
                projects={projectsData}
                settings={settings}
                cvRef={cvRef}
            />
        </div>
    );
}

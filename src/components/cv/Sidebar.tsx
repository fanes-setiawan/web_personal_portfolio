import { Eye, EyeOff, FileDown, Layers, Building2, Smartphone, ChevronDown, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { Project, Company } from '@/types';

interface SidebarProps {
    settings: {
        showSalary: boolean;
        showPrivateProjects: boolean;
        fullContactInfo: boolean;
        selectedProjectIds: string[];
        selectedCompanyIds: string[];
    };
    setSettings: any;
    onExport: () => void;
    isExporting: boolean;
    projects: Project[];
    companies: Company[];
}

export function Sidebar({ settings, setSettings, onExport, isExporting, projects, companies }: SidebarProps) {
    const [isProjectsOpen, setIsProjectsOpen] = useState(false);
    const [isCompaniesOpen, setIsCompaniesOpen] = useState(false);

    const toggleSetting = (key: keyof typeof settings) => {
        setSettings((prev: any) => ({ ...prev, [key]: !prev[key] }));
    };

    const toggleSelection = (key: 'selectedProjectIds' | 'selectedCompanyIds', id: string) => {
        setSettings((prev: any) => {
            const current = [...prev[key]];
            const index = current.indexOf(id);
            if (index > -1) {
                current.splice(index, 1);
            } else {
                current.push(id);
            }
            return { ...prev, [key]: current };
        });
    };

    return (
        <aside className="w-80 h-screen fixed left-0 top-0 bg-[#0B1121] border-r border-slate-800 p-6 flex flex-col z-50">
            <div className="mb-6 shrink-0">
                <h1 className="text-xl font-bold text-white flex items-center gap-2">
                    <span className="text-blue-500">📄</span> CV Engine v2.0
                </h1>
            </div>

            <div className="space-y-8 flex-grow overflow-y-auto pr-2 custom-scrollbar">
                <div>
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Visibility Settings</h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-slate-300">Show Salary Expectations</span>
                            <button
                                onClick={() => toggleSetting('showSalary')}
                                className={`w-10 h-5 rounded-full relative transition-colors ${settings.showSalary ? 'bg-blue-600' : 'bg-slate-700'}`}
                            >
                                <span className={`absolute top-1 left-1 w-3 h-3 bg-white rounded-full transition-transform ${settings.showSalary ? 'translate-x-5' : ''}`}></span>
                            </button>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-slate-300">Include Private Projects</span>
                            <button
                                onClick={() => toggleSetting('showPrivateProjects')}
                                className={`w-10 h-5 rounded-full relative transition-colors ${settings.showPrivateProjects ? 'bg-blue-600' : 'bg-slate-700'}`}
                            >
                                <span className={`absolute top-1 left-1 w-3 h-3 bg-white rounded-full transition-transform ${settings.showPrivateProjects ? 'translate-x-5' : ''}`}></span>
                            </button>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-slate-300">Full Contact Info</span>
                            <button
                                onClick={() => toggleSetting('fullContactInfo')}
                                className={`w-10 h-5 rounded-full relative transition-colors ${settings.fullContactInfo ? 'bg-blue-600' : 'bg-slate-700'}`}
                            >
                                <span className={`absolute top-1 left-1 w-3 h-3 bg-white rounded-full transition-transform ${settings.fullContactInfo ? 'translate-x-5' : ''}`}></span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Project Selection */}
                <div>
                    <button
                        onClick={() => setIsProjectsOpen(!isProjectsOpen)}
                        className="w-full flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 hover:text-slate-300 transition-colors"
                    >
                        <div className="flex items-center gap-2">
                            {isProjectsOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                            Select Projects
                            <span className="bg-blue-600/20 text-blue-400 px-1.5 py-0.5 rounded text-[10px] ml-1">
                                {settings.selectedProjectIds.length}/{projects.length}
                            </span>
                        </div>
                    </button>

                    {isProjectsOpen && (
                        <div className="space-y-2 max-h-48 overflow-y-auto pr-1 animate-in fade-in slide-in-from-top-1 duration-200">
                            {projects.map(project => (
                                <div key={project.id} className="flex items-center justify-between p-2 rounded-lg bg-white/5 border border-white/5 hover:border-white/10 transition-all">
                                    <div className="flex items-center gap-2 truncate pr-2">
                                        <Smartphone size={14} className="text-blue-400 shrink-0" />
                                        <span className="text-xs text-slate-300 truncate">{project.title}</span>
                                    </div>
                                    <button
                                        onClick={() => toggleSelection('selectedProjectIds', project.id)}
                                        className={`w-8 h-4 rounded-full relative transition-colors shrink-0 ${settings.selectedProjectIds.includes(project.id) ? 'bg-blue-600' : 'bg-slate-700'}`}
                                    >
                                        <span className={`absolute top-0.5 left-0.5 w-3 h-3 bg-white rounded-full transition-transform ${settings.selectedProjectIds.includes(project.id) ? 'translate-x-4' : ''}`}></span>
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Company Selection */}
                <div>
                    <button
                        onClick={() => setIsCompaniesOpen(!isCompaniesOpen)}
                        className="w-full flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 hover:text-slate-300 transition-colors"
                    >
                        <div className="flex items-center gap-2">
                            {isCompaniesOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                            Select Companies
                            <span className="bg-blue-600/20 text-blue-400 px-1.5 py-0.5 rounded text-[10px] ml-1">
                                {settings.selectedCompanyIds.length}/{companies.length}
                            </span>
                        </div>
                    </button>

                    {isCompaniesOpen && (
                        <div className="space-y-2 max-h-48 overflow-y-auto pr-1 animate-in fade-in slide-in-from-top-1 duration-200">
                            {companies.map(company => (
                                <div key={company.id} className="flex items-center justify-between p-2 rounded-lg bg-white/5 border border-white/5 hover:border-white/10 transition-all">
                                    <div className="flex items-center gap-2 truncate pr-2">
                                        <Building2 size={14} className="text-blue-400 shrink-0" />
                                        <span className="text-xs text-slate-300 truncate">{company.name}</span>
                                    </div>
                                    <button
                                        onClick={() => toggleSelection('selectedCompanyIds', company.id)}
                                        className={`w-8 h-4 rounded-full relative transition-colors shrink-0 ${settings.selectedCompanyIds.includes(company.id) ? 'bg-blue-600' : 'bg-slate-700'}`}
                                    >
                                        <span className={`absolute top-0.5 left-0.5 w-3 h-3 bg-white rounded-full transition-transform ${settings.selectedCompanyIds.includes(company.id) ? 'translate-x-4' : ''}`}></span>
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div>
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Template Style</h3>
                    <div className="space-y-3">
                        <div className="p-3 bg-blue-600/10 border border-blue-500 rounded-lg cursor-pointer">
                            <div className="flex items-center gap-3">
                                <div className="p-1.5 bg-blue-600 rounded">
                                    <Layers size={14} className="text-white" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-white">Modern</p>
                                    <p className="text-xs text-blue-300">High contrast, tech focused</p>
                                </div>
                            </div>
                        </div>
                        <div className="p-3 border border-slate-700 rounded-lg opacity-50 cursor-not-allowed text-left">
                            <div className="flex items-center gap-3">
                                <div className="p-1.5 bg-slate-700 rounded">
                                    <Layers size={14} className="text-slate-400" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-slate-400">Classic</p>
                                    <p className="text-xs text-slate-500">Traditional layout</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-auto pt-6 border-t border-slate-800 shrink-0">
                <button
                    onClick={onExport}
                    disabled={isExporting}
                    className="w-full py-3 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-900/20"
                >
                    {isExporting ? (
                        <>
                            <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                            Generating...
                        </>
                    ) : (
                        <>
                            <FileDown size={18} />
                            Generate PDF
                        </>
                    )}
                </button>
                <p className="text-xs text-slate-600 text-center mt-3">Export Version v1.4 (Standard)</p>
            </div>
        </aside>
    );
}

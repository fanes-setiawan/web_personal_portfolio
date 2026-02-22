'use client';

import { useState } from 'react';
import { ProjectForm } from '@/components/admin/ProjectForm';
import { ProjectTable } from '@/components/admin/ProjectTable';
import { FolderPlus, Table as TableIcon } from 'lucide-react';
import { Project, Company } from '@/types';

export function ProjectManagementClient({
    initialProjects,
    companies
}: {
    initialProjects: any[],
    companies: Company[]
}) {
    const [editingProject, setEditingProject] = useState<any | null>(null);

    return (
        <div className="space-y-8">
            {/* Form Section */}
            <div className="glass p-1 rounded-2xl border border-white/5 overflow-hidden">
                <ProjectForm
                    project={editingProject}
                    companies={companies}
                    onCancel={() => setEditingProject(null)}
                />
            </div>

            {/* List Section */}
            <div className="glass rounded-2xl border border-white/5 overflow-hidden shadow-2xl">
                <div className="p-6 border-b border-white/5 bg-white/5 flex items-center justify-between">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <TableIcon size={20} className="text-primary" />
                        Existing Projects ({initialProjects.length})
                    </h2>
                </div>

                <ProjectTable
                    projects={initialProjects}
                    onEdit={(project) => {
                        setEditingProject(project);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                />
            </div>
        </div>
    );
}

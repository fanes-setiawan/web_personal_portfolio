'use client';

import { useState } from 'react';
import { Company, Technology } from '@/types';
import { CompanyForm } from '@/components/admin/CompanyForm';
import { CompanyTable } from '@/components/admin/CompanyTable';
import { Building2, Table as TableIcon } from 'lucide-react';

export function CompanyManagementClient({ initialCompanies, technologies }: { initialCompanies: Company[], technologies: Technology[] }) {
    const [editingCompany, setEditingCompany] = useState<Company | null>(null);

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Form Section */}
            <div className="glass p-1 rounded-2xl border border-white/5 overflow-hidden">
                <CompanyForm
                    company={editingCompany}
                    technologies={technologies}
                    onCancel={() => setEditingCompany(null)}
                />
            </div>

            {/* List Section */}
            <div className="glass rounded-2xl border border-white/5 overflow-hidden shadow-2xl">
                <div className="p-6 border-b border-white/5 bg-white/5 flex items-center justify-between">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <TableIcon size={20} className="text-primary" />
                        Partner Companies ({initialCompanies.length})
                    </h2>
                </div>

                <CompanyTable
                    companies={initialCompanies}
                    onEdit={(company) => {
                        setEditingCompany(company);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                />
            </div>
        </div>
    );
}

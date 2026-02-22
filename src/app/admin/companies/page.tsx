import { getCompanies } from '@/data/api';
import { CompanyManagementClient } from '@/components/admin/CompanyManagementClient';
import { Building2 } from 'lucide-react';
import { createClient } from '@/utils/supabase/server';

export default async function ManageCompaniesPage() {
    const supabase = await createClient();
    const { data: technologies } = await supabase
        .from('technologies')
        .select('*')
        .order('name', { ascending: true });

    const companies = await getCompanies();

    return (
        <div className="space-y-8 pb-20">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                    <Building2 className="text-primary" />
                    Manage Companies
                </h1>
                <p className="text-slate-400">Add, edit, or remove partner companies you&apos;ve worked with.</p>
            </div>

            <CompanyManagementClient initialCompanies={companies} technologies={technologies || []} />
        </div>
    );
}

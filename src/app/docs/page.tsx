import { getProfile, getSkills, getProjects, getCompanies } from '@/data/api';
import CVGeneratorClient from '@/components/cv/CVGeneratorClient';
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';

export default async function DocsPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    let isAdmin = false;
    if (user) {
        const { data: userRole } = await supabase
            .from('user_roles')
            .select('role')
            .eq('email', user.email)
            .single();
        isAdmin = userRole?.role === 'SUPER_ADMIN';
    }

    const profile = await getProfile();
    const skills = await getSkills();
    const projects = await getProjects();
    const companies = await getCompanies();

    if (!profile) return (
        <div className="min-h-screen flex items-center justify-center text-white p-4">
            <p className="text-xl font-bold">Profile data not found.</p>
        </div>
    );

    return (
        <CVGeneratorClient
            profile={profile}
            skills={skills}
            projects={projects}
            companies={companies}
            isAdmin={isAdmin}
        />
    );
}

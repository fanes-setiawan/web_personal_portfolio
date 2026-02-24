import { getProfile, getSkills, getProjects, getCompanies, isUserAuthorized } from '@/data/api';
import CVGeneratorClient from '@/components/cv/CVGeneratorClient';
import { redirect } from 'next/navigation';

export default async function DocsPage() {
    const isAuthorized = await isUserAuthorized();

    if (!isAuthorized) {
        redirect('/login?message=Unauthorized access. Please login as HR or Admin to view the CV.');
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
        />
    );
}

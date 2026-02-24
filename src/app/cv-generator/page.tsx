import { getProfile, getSkills, getProjects, getCompanies } from '@/data/api';
import CVGeneratorClient from '@/components/cv/CVGeneratorClient';

export default async function CVGeneratorPage() {
    const profile = await getProfile();
    const skills = await getSkills();
    const projects = await getProjects();
    const companies = await getCompanies();

    if (!profile) return <div>Loading...</div>;

    return <CVGeneratorClient profile={profile} skills={skills} projects={projects} companies={companies} />;
}

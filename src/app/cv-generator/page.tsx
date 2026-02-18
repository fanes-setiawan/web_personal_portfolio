import { getProfile, getSkills, getProjects } from '@/data/api';
import CVGeneratorClient from '@/components/cv/CVGeneratorClient';

export default async function CVGeneratorPage() {
    const profile = await getProfile();
    const skills = await getSkills();
    const projects = await getProjects();

    if (!profile) return <div>Loading...</div>;

    return <CVGeneratorClient profile={profile} skills={skills} projects={projects} />;
}

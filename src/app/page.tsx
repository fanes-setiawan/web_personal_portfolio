import { MainLayout } from '@/components/layout/MainLayout';
import { Hero } from '@/components/sections/Hero';
import { Skills } from '@/components/sections/Skills';
import { Projects } from '@/components/sections/Projects';
import { getProfile, getSkills, getProjects } from '@/data/api';

export default async function Home() {
  const profile = await getProfile();
  const skills = await getSkills();
  const projects = await getProjects();

  if (!profile) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-white p-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Profile Not Found</h1>
        <p className="mb-4 text-slate-400">The database appears to be empty.</p>
        <p className="text-sm bg-slate-800 p-4 rounded mb-4 font-mono">
          Please run the seed script at: <br />
          <a href="/api/seed" className="text-blue-400 underline">/api/seed</a>
        </p>
      </div>
    );
  }

  return (
    <MainLayout>
      <Hero profile={profile} />
      <Skills skills={skills} />
      <Projects projects={projects} />

      {/* Contact Section Placeholder */}
      <section id="contact" className="py-20 flex flex-col items-center justify-center text-center">
        <h2 className="text-4xl font-bold text-white mb-6">Let&apos;s build something great.</h2>
        <p className="text-slate-400 max-w-lg mb-8">
          Available for contract roles and collaborative projects.
        </p>

        {profile.email.includes("Login") ? (
          <div className="flex flex-col items-center gap-4">
            <p className="text-yellow-500 font-medium">Please login as HR to view contact details.</p>
            <a href="/login" className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-bold text-lg transition-all border border-slate-700">
              Login to Hire Me
            </a>
          </div>
        ) : (
          <a href={`mailto:${profile.email}`} className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-bold text-lg transition-all shadow-lg shadow-blue-900/40">
            Hire Me
          </a>
        )}
      </section>
    </MainLayout>
  );
}


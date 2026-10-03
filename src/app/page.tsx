import { MainLayout } from '@/components/layout/MainLayout';
import { Hero } from '@/components/sections/Hero';
import { Skills } from '@/components/sections/Skills';
import { Projects } from '@/components/sections/Projects';
import { Experience } from '@/components/sections/Experience';
import { getProfile, getSkills, getProjects, getCompanies } from '@/data/api';

export default async function Home() {
  const profile = await getProfile();
  const skills = await getSkills();
  const projects = await getProjects();
  const companies = await getCompanies();

  if (!profile) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-slate-900 p-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Profile Not Found</h1>
        <p className="mb-4 text-slate-500">The database appears to be empty.</p>
        <p className="text-sm bg-slate-100 p-4 rounded mb-4 font-mono">
          Please run the seed script at: <br />
          <a href="/api/seed" className="text-blue-600 underline">/api/seed</a>
        </p>
      </div>
    );
  }

  return (
    <MainLayout>
      <Hero profile={profile} />
      <Skills skills={skills} />
      <Experience companies={companies} education={profile.education} />
      <Projects projects={projects} skills={skills} />

      {/* Contact Banner Section */}
      <section id="contact" className="pb-20 pt-10 max-w-7xl mx-auto px-4 md:px-12">
        <div className="bg-[#f0f5ff] rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-blue-600 shadow-sm shrink-0 group-hover:scale-110 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-rocket"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-1">Need an app built or published?</h2>
              <p className="text-slate-500 text-sm">I can develop your app from scratch or help you publish it to Play Store & App Store.</p>
            </div>
          </div>

          <a href={`mailto:${profile.email}`} className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold text-[15px] transition-all shadow-md shrink-0 flex items-center gap-2">
            Let's Talk
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </a>
        </div>
      </section>
    </MainLayout>
  );
}

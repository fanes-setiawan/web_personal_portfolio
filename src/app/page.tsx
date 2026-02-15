import { MainLayout } from '@/components/layout/MainLayout';
import { Hero } from '@/components/sections/Hero';
import { Skills } from '@/components/sections/Skills';
import { Projects } from '@/components/sections/Projects';
import { profileData, skillsData, projectsData } from '@/data/mockData';

export default function Home() {
  return (
    <MainLayout>
      <Hero profile={profileData} />
      <Skills skills={skillsData} />
      <Projects projects={projectsData} />

      {/* Contact Section Placeholder */}
      <section id="contact" className="py-20 flex flex-col items-center justify-center text-center">
        <h2 className="text-4xl font-bold text-white mb-6">Let's build something great.</h2>
        <p className="text-slate-400 max-w-lg mb-8">
          Available for contract roles and collaborative projects.
        </p>
        <a href={`mailto:${profileData.email}`} className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-bold text-lg transition-all shadow-lg shadow-blue-900/40">
          Hire Me
        </a>
      </section>
    </MainLayout>
  );
}

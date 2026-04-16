import { Navbar } from './Navbar';
import { getProfile } from '@/data/api';
import { ContactFloatingButton } from '@/components/ui/ContactFloatingButton';
import { BackgroundOrbs } from '@/components/ui/BackgroundOrbs';
import { GridPattern } from '@/components/ui/GridPattern';
import { ParticlesBackground } from '@/components/ui/ParticlesBackground';

export async function MainLayout({ children }: { children: React.ReactNode }) {
    const profile = await getProfile();

    return (
        <div className="min-h-screen text-slate-200 relative">
            <div className="fixed inset-0 bg-[#0B1121] -z-30" />
            <BackgroundOrbs />
            <GridPattern />
            <ParticlesBackground />
            <div className="max-w-7xl mx-auto relative z-10">
                <Navbar />
                <main className="px-4 md:px-12 pb-20">
                    {children}
                </main>
                <footer className="py-8 text-center text-slate-600 text-sm">
                    © {new Date().getFullYear()} FANES SETIAWAN. All Rights Reserved.
                </footer>
            </div>
            {profile && (
                <ContactFloatingButton
                    whatsappUrl={profile.socials?.whatsapp}
                    email={profile.email.includes("Login") ? undefined : profile.email}
                />
            )}
        </div>
    );
}

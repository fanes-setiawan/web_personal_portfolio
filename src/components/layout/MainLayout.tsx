import { Navbar } from './Navbar';
import { getProfile } from '@/data/api';
import { ContactFloatingButton } from '@/components/ui/ContactFloatingButton';

export async function MainLayout({ children }: { children: React.ReactNode }) {
    const profile = await getProfile();

    return (
        <div className="min-h-screen bg-[#0B1121] text-slate-200">
            <div className="max-w-7xl mx-auto">
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

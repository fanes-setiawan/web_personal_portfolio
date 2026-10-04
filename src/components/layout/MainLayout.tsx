import { Navbar } from './Navbar';
import { getProfile } from '@/data/api';
import { ContactFloatingButton } from '@/components/ui/ContactFloatingButton';
import { InteractiveBackground } from '@/components/ui/InteractiveBackground';
import { DiscordTracker } from '@/components/ui/DiscordTracker';

export async function MainLayout({ children }: { children: React.ReactNode }) {
    const profile = await getProfile();

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 relative">
            <DiscordTracker />
            <InteractiveBackground />
            <div className="max-w-7xl mx-auto relative z-10">
                <Navbar />
                <main className="px-4 md:px-12 pb-20">
                    {children}
                </main>
                <footer className="bg-white py-12 border-t border-slate-200 mt-10 px-4 md:px-12">
                    <div className="flex flex-col md:flex-row justify-between gap-8 mb-8">
                        <div>
                            <span className="font-bold text-slate-900 uppercase tracking-widest text-sm block mb-1">FANES SETIAWAN</span>
                            <span className="text-slate-600 font-medium block mb-2">Mobile Developer</span>
                            <span className="text-slate-500 text-xs">Flutter · Android · iOS · App Release</span>
                        </div>
                        <div className="flex flex-col md:flex-row gap-8 md:gap-16">
                            <div className="flex flex-col gap-2">
                                <span className="font-bold text-slate-900 text-sm mb-1">Navigation</span>
                                <a href="/" className="text-slate-500 hover:text-blue-600 transition-colors text-sm">Home</a>
                                <a href="/#services" className="text-slate-500 hover:text-blue-600 transition-colors text-sm">Services</a>
                                <a href="/#portfolio" className="text-slate-500 hover:text-blue-600 transition-colors text-sm">Portfolio</a>
                                <a href="/#contact" className="text-slate-500 hover:text-blue-600 transition-colors text-sm">Contact</a>
                            </div>
                            <div className="flex flex-col gap-2">
                                <span className="font-bold text-slate-900 text-sm mb-1">Services</span>
                                <a href="/jasa-upload-play-store" className="text-slate-500 hover:text-blue-600 transition-colors text-sm">Jasa Upload Play Store</a>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-slate-100 gap-4">
                        <span className="text-slate-500 text-sm">© {new Date().getFullYear()} Fanes Setiawan. All rights reserved.</span>
                        <div className="flex items-center gap-4 text-slate-700">
                            <a href="https://play.google.com/store/apps/dev?id=6540217402260692469" target="_blank" rel="noreferrer" className="hover:text-emerald-600 transition-colors" title="Google Play Store">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                            </a>
                            {profile?.socials?.github && (
                                <a href={profile.socials.github} target="_blank" rel="noreferrer" className="hover:text-blue-600 transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                                </a>
                            )}
                            {profile?.socials?.linkedin && (
                                <a href={profile.socials.linkedin} target="_blank" rel="noreferrer" className="hover:text-blue-600 transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                                </a>
                            )}
                            {profile?.socials?.whatsapp && (
                                <a href={profile.socials.whatsapp} target="_blank" rel="noreferrer" className="hover:text-blue-600 transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"/><path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1"/></svg>
                                </a>
                            )}
                        </div>
                    </div>
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

import { Navbar } from './Navbar';

export function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-[#0B1121] text-slate-200">
            <div className="max-w-7xl mx-auto">
                <Navbar />
                <main className="px-4 md:px-12 pb-20">
                    {children}
                </main>
                <footer className="py-8 text-center text-slate-600 text-sm">
                    © {new Date().getFullYear()} Alex Rivera. All Rights Reserved.
                </footer>
            </div>
        </div>
    );
}

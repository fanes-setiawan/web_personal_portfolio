import { Mail, MapPin, Globe, Phone } from 'lucide-react';
import { Profile } from '@/types';

interface HeaderProps {
    profile: Profile;
}

export function Header({ profile }: HeaderProps) {
    return (
        <header className="flex justify-between items-center mb-14 border-b border-[#f1f5f9] pb-12">
            <div className="flex-1">
                <h1 className="text-6xl font-black text-[#0f172a] mb-1 tracking-tight leading-[1.1]">{profile.name}</h1>
                <h2 className="text-xl font-bold text-[#1e293b] uppercase tracking-[0.25em] mb-10">{profile.role}</h2>

                <div className="flex flex-wrap gap-x-10 gap-y-4 text-[13px] text-[#475569] font-bold">
                    {profile.location && (
                        <div className="flex items-center gap-2">
                            <MapPin size={15} className="text-[#64748b] translate-y-[0px]" />
                            <span className="leading-none">{profile.location}</span>
                        </div>
                    )}
                    <div className="flex items-center gap-2">
                        <Mail size={15} className="text-[#64748b] translate-y-[0.5px]" />
                        <span className="leading-none">{profile.email}</span>
                    </div>
                    {profile.phone && (
                        <div className="flex items-center gap-2">
                            <Phone size={15} className="text-[#64748b] translate-y-[0.5px]" />
                            <span className="leading-none">{profile.phone}</span>
                        </div>
                    )}
                    {profile.website && (
                        <div className="flex items-center gap-2">
                            <Globe size={15} className="text-[#64748b] translate-y-[0.5px]" />
                            <span className="leading-none">{profile.website.replace(/^https?:\/\//, '')}</span>
                        </div>
                    )}
                </div>
            </div>

            <div className="w-40 h-40 rounded-[2.5rem] bg-[#ffffff] border-[8px] border-[#ffffff] shadow-[0_20px_50px_rgba(0,0,0,0.1)] overflow-hidden flex items-center justify-center relative flex-shrink-0">
                {profile.avatarUrl ? (
                    <img
                        src={profile.avatarUrl}
                        alt={profile.name}
                        className="w-full h-full object-cover"
                        crossOrigin="anonymous"
                    />
                ) : (
                    <span className="text-6xl text-[#e2e8f0]">👤</span>
                )}
            </div>
        </header>
    );
}

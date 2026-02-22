'use client';

import { useState } from 'react';
import { Profile } from '@/types';
import { updateProfileAction } from '@/app/admin/profile/actions';
import { ImageUpload } from '@/components/admin/ImageUpload';
import { Save, Loader2, User, Mail, MapPin, Briefcase, AlignLeft, Award } from 'lucide-react';

export function ProfileManagementClient({ profile }: { profile: Profile & { id: string } }) {
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);
    const [avatarUrl, setAvatarUrl] = useState(profile.avatarUrl || '');

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsLoading(true);
        setStatus(null);

        const formData = new FormData(e.currentTarget);
        try {
            await updateProfileAction(formData);
            setStatus({ type: 'success', message: 'Profile updated successfully!' });
        } catch (error: any) {
            setStatus({ type: 'error', message: error.message });
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="glass p-8 rounded-2xl border border-white/5 bg-white/5 shadow-xl">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <input type="hidden" name="id" value={profile.id} />
                    <input type="hidden" name="avatarUrl" value={avatarUrl} />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Left Side: Image Upload */}
                        <div className="space-y-6">
                            <ImageUpload
                                label="Profile Picture"
                                path="profile/avatar.png"
                                currentImageUrl={profile.avatarUrl}
                                onUploadComplete={setAvatarUrl}
                            />

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                                    <User size={12} /> Full Name
                                </label>
                                <input
                                    required
                                    name="name"
                                    defaultValue={profile.name}
                                    className="w-full bg-black/40 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                                    <Mail size={12} /> Email
                                </label>
                                <input
                                    required
                                    name="email"
                                    defaultValue={profile.email}
                                    className="w-full bg-black/40 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                                />
                            </div>
                        </div>

                        {/* Right Side: Details */}
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                                    <Briefcase size={12} /> Role
                                </label>
                                <input
                                    required
                                    name="role"
                                    defaultValue={profile.role}
                                    className="w-full bg-black/40 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                                    <Briefcase size={12} /> Role Subtitle
                                </label>
                                <input
                                    name="roleSubtitle"
                                    defaultValue={profile.roleSubtitle}
                                    className="w-full bg-black/40 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                                        <Award size={12} /> Experience
                                    </label>
                                    <input
                                        type="number"
                                        name="experienceYears"
                                        defaultValue={profile.experienceYears}
                                        className="w-full bg-black/40 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                                        <MapPin size={12} /> Location
                                    </label>
                                    <input
                                        name="location"
                                        defaultValue={profile.location}
                                        className="w-full bg-black/40 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                                    <AlignLeft size={12} /> Bio
                                </label>
                                <textarea
                                    name="bio"
                                    defaultValue={profile.bio}
                                    rows={4}
                                    className="w-full bg-black/40 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all resize-none"
                                />
                            </div>

                            {/* Social Media Section */}
                            <div className="pt-4 border-t border-white/5 space-y-4">
                                <h4 className="text-sm font-bold text-white uppercase tracking-widest">Social Media Links</h4>

                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">GitHub URL</label>
                                        <input
                                            name="github"
                                            defaultValue={profile.socials?.github}
                                            placeholder="https://github.com/yourusername"
                                            className="w-full bg-black/40 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">LinkedIn URL</label>
                                        <input
                                            name="linkedin"
                                            defaultValue={profile.socials?.linkedin}
                                            placeholder="https://linkedin.com/in/yourusername"
                                            className="w-full bg-black/40 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Twitter URL</label>
                                        <input
                                            name="twitter"
                                            defaultValue={profile.socials?.twitter}
                                            placeholder="https://twitter.com/yourusername"
                                            className="w-full bg-black/40 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">WhatsApp Number / Link</label>
                                        <input
                                            name="whatsapp"
                                            defaultValue={profile.socials?.whatsapp}
                                            placeholder="https://wa.me/628..."
                                            className="w-full bg-black/40 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {status && (
                        <div className={`p-4 rounded-xl text-sm font-medium ${status.type === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                            {status.message}
                        </div>
                    )}

                    <div className="flex justify-end pt-4">
                        <button
                            disabled={isLoading}
                            type="submit"
                            className="bg-primary hover:bg-primary/90 disabled:opacity-50 text-white font-bold px-10 py-4 rounded-xl flex items-center gap-3 transition-all shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98]"
                        >
                            {isLoading ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                            Save Profile Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

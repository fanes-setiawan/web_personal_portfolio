import { createClient } from '@/utils/supabase/server';
import { ProfileManagementClient } from '@/components/admin/ProfileManagementClient';
import { UserCircle } from 'lucide-react';

export default async function AdminProfilePage() {
    const supabase = await createClient();
    const { data: profileData } = await supabase
        .from('profile')
        .select('*')
        .single();

    if (!profileData) {
        return <div className="p-8 text-white">Profile data not found. Please run seed.</div>;
    }

    // Transform to match Profile interface
    const profile = {
        id: profileData.id,
        name: profileData.name,
        role: profileData.role,
        roleSubtitle: profileData.role_subtitle,
        bio: profileData.bio,
        experienceYears: profileData.experience_years,
        avatarUrl: profileData.avatar_url,
        email: profileData.email,
        location: profileData.location,
        socials: profileData.socials || {},
        education: profileData.education || [],
        phone: profileData.phone || "Login to view"
    };

    return (
        <div className="space-y-8 pb-20">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                    <UserCircle className="text-primary" />
                    Manage Profile
                </h1>
                <p className="text-slate-400">Update your personal information and profile picture.</p>
            </div>

            <ProfileManagementClient profile={profile} />
        </div>
    );
}

'use client';

import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

export function LogoutButton() {
    const router = useRouter();
    const supabase = createClient();

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.refresh();
    };

    return (
        <button
            onClick={handleLogout}
            className="text-slate-400 hover:text-white transition-colors text-sm font-medium"
        >
            Logout
        </button>
    );
}

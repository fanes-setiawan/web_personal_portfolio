'use server';

import { uploadFile, deleteFile, getStorageStats } from '@/utils/supabase/storage';
import { revalidatePath } from 'next/cache';

export async function uploadMediaAction(formData: FormData) {
    const file = formData.get('file') as File;
    const path = formData.get('path') as string;

    if (!file || !path) {
        throw new Error('File and path are required');
    }

    try {
        const publicUrl = await uploadFile(file, path);
        revalidatePath('/admin/analytics');
        return publicUrl;
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export async function deleteMediaAction(path: string) {
    try {
        await deleteFile(path);
        revalidatePath('/admin/analytics');
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export async function fetchStorageStatsAction() {
    try {
        return await getStorageStats();
    } catch (error: any) {
        throw new Error(error.message);
    }
}

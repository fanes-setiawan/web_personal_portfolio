import { createClient } from './server';

const BUCKET_NAME = 'Assets';

export async function uploadFile(file: File, path: string) {
    const supabase = await createClient();

    const { data, error } = await supabase.storage
        .from(BUCKET_NAME)
        .upload(path, file, {
            cacheControl: '3600',
            upsert: true,
        });

    if (error) {
        throw new Error(error.message);
    }

    const { data: { publicUrl } } = supabase.storage
        .from(BUCKET_NAME)
        .getPublicUrl(data.path);

    return publicUrl;
}

export async function deleteFile(path: string) {
    const supabase = await createClient();

    const { error } = await supabase.storage
        .from(BUCKET_NAME)
        .remove([path]);

    if (error) {
        throw new Error(error.message);
    }
}

export async function getStorageStats() {
    const supabase = await createClient();

    // listing all files to calculate size
    // Note: Supabase Storage API doesn't have a direct "get bucket size" for all users
    // We iterate through folders if necessary, but here we list the root Assets.
    const { data, error } = await supabase.storage
        .from(BUCKET_NAME)
        .list('', {
            limit: 1000,
            offset: 0,
            sortBy: { column: 'name', order: 'asc' },
        });

    if (error) {
        throw new Error(error.message);
    }

    const totalSizeBytes = data.reduce((acc, file) => acc + (file.metadata?.size || 0), 0);
    const totalCount = data.length;

    return {
        totalSizeBytes,
        totalCount,
    };
}

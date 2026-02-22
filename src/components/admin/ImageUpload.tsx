'use client';

import { useState, useRef } from 'react';
import imageCompression from 'browser-image-compression';
import { uploadMediaAction } from '@/app/admin/media/actions';
import { ImageIcon, Upload, Loader2, X, AlertCircle, CheckCircle2, Zap } from 'lucide-react';

interface ImageUploadProps {
    onUploadComplete: (url: string) => void;
    currentImageUrl?: string;
    label: string;
    path: string; // e.g., 'avatars/fanes.png'
}

export function ImageUpload({ onUploadComplete, currentImageUrl, label, path }: ImageUploadProps) {
    const [preview, setPreview] = useState<string | null>(currentImageUrl || null);
    const [isUploading, setIsUploading] = useState(false);
    const [isCompressing, setIsCompressing] = useState(false);
    const [useCompression, setUseCompression] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;

        setError(null);
        setIsUploading(true);

        try {
            let fileToUpload = file;

            if (useCompression && file.type.startsWith('image/')) {
                setIsCompressing(true);
                const options = {
                    maxSizeMB: 1,
                    maxWidthOrHeight: 1920,
                    useWebWorker: true,
                };
                fileToUpload = await imageCompression(file, options);
                setIsCompressing(false);
            }

            const formData = new FormData();
            formData.append('file', fileToUpload);
            formData.append('path', path);

            const publicUrl = await uploadMediaAction(formData);
            setPreview(publicUrl);
            onUploadComplete(publicUrl);
        } catch (err: any) {
            setError(err.message || 'Failed to upload image');
        } finally {
            setIsUploading(false);
            setIsCompressing(false);
        }
    }

    return (
        <div className="space-y-4 w-full">
            <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                    <ImageIcon size={12} /> {label}
                </label>

                <button
                    type="button"
                    onClick={() => setUseCompression(!useCompression)}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all border ${useCompression
                            ? 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                            : 'bg-slate-800 text-slate-500 border-slate-700'
                        }`}
                >
                    <Zap size={10} fill={useCompression ? "currentColor" : "none"} />
                    COMPRESSION: {useCompression ? 'ON' : 'OFF'}
                </button>
            </div>

            <div
                onClick={() => fileInputRef.current?.click()}
                className={`relative group cursor-pointer border-2 border-dashed rounded-2xl overflow-hidden transition-all duration-300 min-h-[160px] flex flex-col items-center justify-center p-6 ${preview ? 'border-primary/50 bg-primary/5' : 'border-slate-800 bg-black/40 hover:border-slate-700 hover:bg-white/5'
                    }`}
            >
                {preview ? (
                    <div className="relative w-full aspect-video md:aspect-auto md:h-32 flex items-center justify-center">
                        <img
                            src={preview}
                            alt="Preview"
                            className="max-h-full rounded-lg object-contain"
                        />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg">
                            <Upload className="text-white" size={24} />
                            <span className="ml-2 text-white font-bold text-sm">Change Image</span>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                            <Upload className="text-slate-400" size={20} />
                        </div>
                        <p className="text-sm font-medium text-slate-400">Click to upload or drag & drop</p>
                        <p className="text-xs text-slate-600 mt-1">PNG, JPG or WEBP up to 5MB</p>
                    </>
                )}

                {isUploading && (
                    <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center z-10">
                        <Loader2 className="animate-spin text-primary mb-2" size={32} />
                        <p className="text-sm font-bold text-white">
                            {isCompressing ? 'Compressing...' : 'Uploading...'}
                        </p>
                    </div>
                )}
            </div>

            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
            />

            {error && (
                <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs font-medium">
                    <AlertCircle size={14} />
                    {error}
                </div>
            )}

            {!error && preview && !isUploading && (
                <div className="flex items-center gap-2 text-green-400 text-[10px] font-bold uppercase tracking-wider">
                    <CheckCircle2 size={12} />
                    Saved to Supabase Assets
                </div>
            )}
        </div>
    );
}

'use client';

import { useState } from 'react';
import { MessageCircle, Mail, X, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ContactFloatingButtonProps {
    whatsappUrl?: string;
    email?: string;
}

export function ContactFloatingButton({ whatsappUrl, email }: ContactFloatingButtonProps) {
    const [isOpen, setIsOpen] = useState(false);

    if (!whatsappUrl && !email) return null;

    return (
        <div className="fixed bottom-8 right-8 z-[100]">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        className="absolute bottom-20 right-0 w-64 bg-[#0F1629] border border-white/10 rounded-2xl shadow-2xl p-4 space-y-3 mb-2"
                    >
                        <h3 className="text-sm font-bold text-white uppercase tracking-widest px-2 mb-4">Let's Connect</h3>

                        {whatsappUrl && (
                            <a
                                href={whatsappUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-4 p-3 hover:bg-green-500/10 rounded-xl transition-all group"
                            >
                                <div className="p-2 bg-green-500/20 text-green-500 rounded-lg group-hover:scale-110 transition-transform">
                                    <MessageCircle size={20} />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-white">WhatsApp</p>
                                    <p className="text-[10px] text-slate-500">Chat with me now</p>
                                </div>
                            </a>
                        )}

                        {email && (
                            <a
                                href={`mailto:${email}`}
                                className="flex items-center gap-4 p-3 hover:bg-blue-500/10 rounded-xl transition-all group"
                            >
                                <div className="p-2 bg-blue-500/20 text-blue-400 rounded-lg group-hover:scale-110 transition-transform">
                                    <Mail size={20} />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-white">Email Me</p>
                                    <p className="text-[10px] text-slate-500">Send a direct message</p>
                                </div>
                            </a>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-14 h-14 rounded-full flex items-center justify-center transition-all shadow-xl active:scale-90 ${isOpen ? 'bg-slate-800 text-white rotate-90' : 'bg-blue-600 text-white hover:bg-blue-500 shadow-blue-600/20'
                    }`}
            >
                {isOpen ? <X size={24} /> : <Send size={24} />}
            </button>
        </div>
    );
}

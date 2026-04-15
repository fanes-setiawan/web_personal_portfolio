"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Mail, MapPin, Linkedin, Github, CheckCircle2, Loader2 } from "lucide-react";
import { Profile } from "@/types";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

interface ContactProps {
    profile: Profile;
}

export function Contact({ profile }: ContactProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSent, setIsSent] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        // This is a placeholder for form submission logic.
        // You can replace this with Formspree, Formcake, or your own API.
        // For Formspree: https://formspree.io/f/YOUR_ID
        
        await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate API call

        setIsSubmitting(false);
        setIsSent(true);

        // Reset after 5 seconds
        setTimeout(() => setIsSent(false), 5000);
    };

    return (
        <section id="contact" className="py-20 relative overflow-hidden">
            {/* Background Ornaments */}
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <ScrollReveal>
                    <div className="text-center mb-16">
                        <h3 className="text-blue-500 font-bold uppercase tracking-widest text-sm mb-2">Get In Touch</h3>
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 underline decoration-blue-500/30 decoration-4 underline-offset-8">Let&apos;s Build Something Together</h2>
                        <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                            Ready to start a new project or just want to say hi? My inbox is always open.
                        </p>
                    </div>
                </ScrollReveal>

                <div className="grid lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
                    {/* Contact Info */}
                    <ScrollReveal direction="left">
                        <div className="space-y-8">
                            <div className="bg-[#0F1629] border border-slate-800 p-8 rounded-3xl space-y-8">
                                <h4 className="text-2xl font-bold text-white mb-4">Contact Information</h4>
                                
                                <div className="space-y-6">
                                    <div className="flex items-start gap-4 group">
                                        <div className="p-3 bg-blue-600/10 rounded-xl group-hover:bg-blue-600/20 transition-colors">
                                            <Mail className="text-blue-400" size={24} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Email Me</p>
                                            <a href={`mailto:${profile.email}`} className="text-white font-bold hover:text-blue-400 transition-colors">
                                                {profile.email}
                                            </a>
                                        </div>
                                    </div>

                                    {profile.location && (
                                        <div className="flex items-start gap-4 group">
                                            <div className="p-3 bg-blue-600/10 rounded-xl group-hover:bg-blue-600/20 transition-colors">
                                                <MapPin className="text-blue-400" size={24} />
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Location</p>
                                                <p className="text-white font-bold">{profile.location}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="pt-8 border-t border-slate-800">
                                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">Connect on Socials</p>
                                    <div className="flex gap-4">
                                        {profile.socials?.linkedin && (
                                            <a href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer" className="p-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-slate-400 hover:text-blue-400 hover:border-blue-500/30 transition-all">
                                                <Linkedin size={20} />
                                            </a>
                                        )}
                                        {profile.socials?.github && (
                                            <a href={profile.socials.github} target="_blank" rel="noopener noreferrer" className="p-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-slate-400 hover:text-white hover:border-white/20 transition-all">
                                                <Github size={20} />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Decorative Quote */}
                            <div className="p-8 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl text-white shadow-2xl shadow-blue-900/40 transform hover:scale-[1.02] transition-transform duration-300">
                                <p className="text-xl font-medium italic mb-4">&quot;Coding is the closest thing we have to a superpower.&quot;</p>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-0.5 bg-white/30" />
                                    <span className="text-sm font-bold opacity-80 uppercase tracking-widest">{profile.name}</span>
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>

                    {/* Contact Form */}
                    <ScrollReveal direction="right">
                        <div className="bg-[#0F1629] border border-slate-800 p-8 md:p-10 rounded-3xl shadow-2xl relative overflow-hidden">
                            <AnimatePresence mode="wait">
                                {!isSent ? (
                                    <motion.form 
                                        key="contact-form"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        onSubmit={handleSubmit} 
                                        className="space-y-6"
                                    >
                                        <div className="grid sm:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label htmlFor="name" className="text-xs font-bold text-slate-400 uppercase tracking-widest">Full Name</label>
                                                <input 
                                                    type="text" 
                                                    id="name"
                                                    required
                                                    className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/5 transition-all"
                                                    placeholder="John Doe"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label htmlFor="email" className="text-xs font-bold text-slate-400 uppercase tracking-widest">Email Address</label>
                                                <input 
                                                    type="email" 
                                                    id="email"
                                                    required
                                                    className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/5 transition-all"
                                                    placeholder="john@example.com"
                                                />
                                            </div>
                                        </div>
                                        
                                        <div className="space-y-2">
                                            <label htmlFor="subject" className="text-xs font-bold text-slate-400 uppercase tracking-widest">Subject</label>
                                            <input 
                                                type="text" 
                                                id="subject"
                                                required
                                                className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/5 transition-all"
                                                placeholder="Project Collaboration"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label htmlFor="message" className="text-xs font-bold text-slate-400 uppercase tracking-widest">Message</label>
                                            <textarea 
                                                id="message"
                                                required
                                                rows={5}
                                                className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/5 transition-all resize-none"
                                                placeholder="Tell me about your project..."
                                            />
                                        </div>

                                        <button 
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full py-4 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2 group shadow-lg shadow-blue-900/20 active:scale-[0.98]"
                                        >
                                            {isSubmitting ? (
                                                <Loader2 className="animate-spin" size={20} />
                                            ) : (
                                                <>
                                                    Send Message
                                                    <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                                </>
                                            )}
                                        </button>
                                    </motion.form>
                                ) : (
                                    <motion.div 
                                        key="success-message"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="py-12 flex flex-col items-center text-center space-y-4"
                                    >
                                        <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
                                            <CheckCircle2 className="text-green-500" size={40} />
                                        </div>
                                        <h4 className="text-2xl font-bold text-white">Message Sent!</h4>
                                        <p className="text-slate-400">Thanks for reaching out. I&apos;ll get back to you as soon as possible.</p>
                                        <button 
                                            onClick={() => setIsSent(false)}
                                            className="mt-4 text-blue-400 font-bold hover:text-blue-300 transition-colors"
                                        >
                                            Send another message
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </ScrollReveal>
                </div>
            </div>
        </section>
    );
}

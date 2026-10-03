"use client";

import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Quote, Star } from 'lucide-react';
import Image from 'next/image';

export function Testimonials() {
    const testimonials = [
        {
            id: 1,
            name: "John Doe",
            role: "CTO at TechStartup",
            content: "Fanes is an exceptional mobile engineer. He rebuilt our core app architecture from scratch and improved performance significantly. The code quality is top-notch.",
            avatar: "https://api.dicebear.com/7.x/initials/svg?seed=John+Doe&backgroundColor=1e40af"
        },
        {
            id: 2,
            name: "Sarah Smith",
            role: "Product Manager",
            content: "Working with Fanes was a breeze. He doesn't just write code; he understands the product vision and always suggests the best UI/UX approaches for mobile.",
            avatar: "https://api.dicebear.com/7.x/initials/svg?seed=Sarah+Smith&backgroundColor=047857"
        },
        {
            id: 3,
            name: "Michael Chen",
            role: "Founder & CEO",
            content: "Fast, reliable, and incredibly skilled. Fanes handled both the frontend Flutter app and the Firebase backend integration flawlessly. Highly recommended!",
            avatar: "https://api.dicebear.com/7.x/initials/svg?seed=Michael+Chen&backgroundColor=b91c1c"
        }
    ];

    return (
        <section id="testimonials" className="py-12 md:py-16 max-w-7xl mx-auto px-4 md:px-12">
            <ScrollReveal>
                <div className="mb-12 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-6">
                    <div>
                        <h3 className="text-blue-600 font-bold uppercase tracking-widest text-xs mb-2">Social Proof</h3>
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900">What They Say</h2>
                    </div>
                </div>
            </ScrollReveal>

            <div className="grid md:grid-cols-3 gap-6">
                {testimonials.map((testimonial, idx) => (
                    <ScrollReveal key={testimonial.id} delay={idx * 0.15} distance={20}>
                        <div className="group bg-white p-8 rounded-[2rem] border border-slate-100/80 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-xl hover:shadow-blue-900/5 hover:-translate-y-2 transition-all duration-500 flex flex-col h-full relative overflow-hidden">
                            {/* Decorative background quote icon */}
                            <div className="absolute -top-4 -right-4 text-slate-50 opacity-50 group-hover:text-blue-50/30 transition-colors duration-500 rotate-12">
                                <Quote size={120} />
                            </div>

                            <div className="flex gap-1 text-amber-400 mb-6 relative z-10">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={16} fill="currentColor" />
                                ))}
                            </div>

                            <p className="text-slate-600 text-[15px] leading-relaxed mb-8 flex-grow relative z-10 font-medium">
                                "{testimonial.content}"
                            </p>

                            <div className="flex items-center gap-4 relative z-10 pt-6 border-t border-slate-100 group-hover:border-blue-50 transition-colors duration-500">
                                <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-100 border-2 border-white shadow-sm shrink-0">
                                    <Image 
                                        src={testimonial.avatar} 
                                        alt={testimonial.name}
                                        width={48}
                                        height={48}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 text-sm group-hover:text-blue-600 transition-colors">{testimonial.name}</h4>
                                    <p className="text-xs text-slate-500 font-medium">{testimonial.role}</p>
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>
                ))}
            </div>
        </section>
    );
}

"use client";

import { useState } from 'react';
import { ArrowLeft, ExternalLink, Save, Code, Github, Smartphone, Globe } from 'lucide-react';
import Link from 'next/link';

export default function EditProjectPage() {
    const [techStack, setTechStack] = useState(['SwiftUI', 'Combine', 'Firebase', 'Web3.js', 'Lottie']);

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            {/* Header */}
            <header className="flex items-center justify-between pb-6 border-b border-slate-800">
                <div className="flex items-center gap-4">
                    <Link href="/admin" className="p-2 hover:bg-slate-800 rounded-full text-slate-400 transition-colors">
                        <ArrowLeft size={20} />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-white">Edit Project</h1>
                        <p className="text-sm text-slate-400">Currently modifying: <span className="text-blue-400">CryptoWallet X</span></p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button className="px-4 py-2 text-slate-400 hover:text-white text-sm font-medium transition-colors">Before Discard</button>
                    <button className="px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg text-sm font-bold flex items-center gap-2 shadow-lg shadow-green-900/20 transition-all">
                        <Save size={16} />
                        Save Changes
                    </button>
                </div>
            </header>

            {/* Breadcrumbs / Tabs */}
            <div className="flex gap-6 text-sm font-medium text-slate-500 border-b border-slate-800">
                <button className="pb-3 text-blue-500 border-b-2 border-blue-500">General Details</button>
                <button className="pb-3 hover:text-slate-300 transition-colors">Media & Assets</button>
                <button className="pb-3 hover:text-slate-300 transition-colors">Distribution & SEO</button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Column */}
                <div className="lg:col-span-2 space-y-6">

                    {/* Project Identity */}
                    <section className="bg-[#0F1629] border border-slate-800 rounded-xl p-6">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="p-1.5 bg-blue-900/30 rounded text-blue-400">
                                <span className="text-lg">ℹ️</span>
                            </div>
                            <h2 className="text-lg font-bold text-white">Project Identity</h2>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-bold text-slate-400 mb-2">Project Name</label>
                                <input type="text" defaultValue="CryptoWallet X" className="w-full bg-[#0B1121] border border-slate-700 rounded-lg p-3 text-white focus:border-blue-500 outline-none transition-colors" />
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-slate-400 mb-2">Company</label>
                                    <select className="w-full bg-[#0B1121] border border-slate-700 rounded-lg p-3 text-white focus:border-blue-500 outline-none transition-colors appearance-none">
                                        <option>FinTech Corp</option>
                                        <option>StartUp Inc</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-400 mb-3">Platforms Supported</label>
                                <div className="flex gap-4 p-4 border border-slate-700 rounded-lg bg-[#0B1121]">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-slate-600 bg-slate-800 text-blue-600" />
                                        <span className="text-slate-300 text-sm">iOS</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-slate-600 bg-slate-800 text-blue-600" />
                                        <span className="text-slate-300 text-sm">Android</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer opacity-50">
                                        <input type="checkbox" className="w-4 h-4 rounded border-slate-600 bg-slate-800 text-blue-600" />
                                        <span className="text-slate-300 text-sm">Web</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Description */}
                    <section className="bg-[#0F1629] border border-slate-800 rounded-xl p-6">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="p-1.5 bg-blue-900/30 rounded text-blue-400">
                                <Code size={18} />
                            </div>
                            <h2 className="text-lg font-bold text-white">Detailed Description</h2>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-400 mb-2">Job Description & Responsibilities</label>
                            <div className="border border-slate-700 rounded-lg overflow-hidden">
                                <div className="bg-[#0B1121] border-b border-slate-700 p-2 flex gap-2">
                                    <button className="p-1.5 hover:bg-slate-800 rounded text-slate-400 hover:text-white transition-colors"><b>B</b></button>
                                    <button className="p-1.5 hover:bg-slate-800 rounded text-slate-400 hover:text-white transition-colors"><i>I</i></button>
                                    <button className="p-1.5 hover:bg-slate-800 rounded text-slate-400 hover:text-white transition-colors"><span className="text-xs">list</span></button>
                                </div>
                                <textarea
                                    className="w-full bg-[#0F1629] p-4 text-slate-300 outline-none h-40 resize-none text-sm leading-relaxed"
                                    defaultValue="Led the development of the primary mobile application using React Native, focusing on real-time transaction monitoring and cold storage wallet integration."
                                ></textarea>
                            </div>
                        </div>

                        <div className="mt-6">
                            <label className="block text-sm font-bold text-slate-400 mb-2">Key Achievements</label>
                            <div className="border border-slate-700 rounded-lg bg-[#0B1121] p-4">
                                <ul className="space-y-2 text-sm text-slate-300 list-disc pl-4">
                                    <li>Achieved 99.9% crash-free sessions across 50k users.</li>
                                    <li>Reduced transaction lag by 40% through custom websocket layer implementation.</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                </div>

                {/* Right Column */}
                <div className="space-y-8">

                    {/* External Links */}
                    <section className="bg-[#0F1629] border border-slate-800 rounded-xl p-6">
                        <div className="flex items-center gap-2 mb-6">
                            <ExternalLink size={18} className="text-blue-400" />
                            <h2 className="text-lg font-bold text-white">External Links</h2>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">App Store</label>
                                <div className="flex items-center bg-[#0B1121] border border-slate-700 rounded-lg px-3 py-2">
                                    <Smartphone size={14} className="text-slate-500 mr-2" />
                                    <input type="text" defaultValue="https://apps.apple.com/us/ap..." className="bg-transparent text-slate-300 text-sm outline-none w-full truncate" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Play Store</label>
                                <div className="flex items-center bg-[#0B1121] border border-slate-700 rounded-lg px-3 py-2">
                                    <Smartphone size={14} className="text-slate-500 mr-2" />
                                    <input type="text" defaultValue="https://play.google.com/..." className="bg-transparent text-slate-300 text-sm outline-none w-full truncate" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">GitHub Repo</label>
                                <div className="flex items-center bg-[#0B1121] border border-slate-700 rounded-lg px-3 py-2">
                                    <Github size={14} className="text-slate-500 mr-2" />
                                    <input type="text" defaultValue="https://github.com/alexrivera/..." className="bg-transparent text-slate-300 text-sm outline-none w-full truncate" />
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Tech Stack */}
                    <section className="bg-[#0F1629] border border-slate-800 rounded-xl p-6">
                        <div className="flex items-center gap-2 mb-6">
                            <Code size={18} className="text-blue-400" />
                            <h2 className="text-lg font-bold text-white">Tech Stack</h2>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center bg-[#0B1121] border border-slate-700 rounded-lg px-3 py-2">
                                <span className="text-slate-500 mr-2">+</span>
                                <input type="text" placeholder="Add technology..." className="bg-transparent text-slate-300 text-sm outline-none w-full" />
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {techStack.map(tech => (
                                    <span key={tech} className="px-3 py-1 bg-blue-900/20 border border-blue-800 text-blue-300 text-xs font-bold rounded-lg flex items-center gap-1 group cursor-pointer hover:bg-blue-900/40 transition-colors">
                                        {tech}
                                        <button className="opacity-0 group-hover:opacity-100 transition-opacity ml-1 hover:text-white">×</button>
                                    </span>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Visibility */}
                    <section className="bg-[#0F1629] border border-slate-800 rounded-xl p-6">
                        <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6">Visibility</h2>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-bold text-white">Publicly Visible</p>
                                    <p className="text-[10px] text-slate-500">Show this project on your portfolio</p>
                                </div>
                                <div className="w-10 h-5 bg-blue-600 rounded-full relative cursor-pointer">
                                    <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full"></div>
                                </div>
                            </div>
                            <div className="flex items-center justify-between opacity-50">
                                <div>
                                    <p className="text-sm font-bold text-white">Feature Project</p>
                                    <p className="text-[10px] text-slate-500">Highlight at the top of homepage</p>
                                </div>
                                <div className="w-10 h-5 bg-slate-700 rounded-full relative cursor-pointer">
                                    <div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full"></div>
                                </div>
                            </div>
                        </div>
                    </section>

                </div>
            </div>
        </div>
    );
}

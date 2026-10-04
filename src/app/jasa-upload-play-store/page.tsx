import type { Metadata } from 'next';
import { MainLayout } from '@/components/layout/MainLayout';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
    title: 'Jasa Upload Aplikasi ke Play Store | Fanes Setiawan',
    description: 'Jasa upload, publish, dan release aplikasi Android ke Google Play Store. Bantuan AAB, Play Console, testing, submission, update, dan review.',
    alternates: {
        canonical: 'https://fanes.online/jasa-upload-play-store',
    },
    openGraph: {
        title: 'Jasa Upload Aplikasi ke Play Store | Fanes Setiawan',
        description: 'Jasa upload, publish, dan release aplikasi Android ke Google Play Store. Bantuan AAB, Play Console, testing, submission, update, dan review.',
        url: 'https://fanes.online/jasa-upload-play-store',
        type: 'website',
        siteName: 'Fanes Setiawan',
        images: [
            {
                url: 'https://fanes.online/images/og/jasa-upload-play-store.jpg',
                width: 1200,
                height: 630,
                alt: 'Jasa Upload Aplikasi ke Play Store',
            },
        ],
    },
};

export default function JasaUploadPlayStore() {
    const waNumber = "6288225409824";
    const waUrl = `https://wa.me/${waNumber}?text=Halo%20Fanes%2C%20saya%20ingin%20konsultasi%20jasa%20upload%20aplikasi%20ke%20Play%20Store`;

    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Person",
                "@id": "https://fanes.online/#person",
                "name": "Fanes Setiawan",
                "jobTitle": "Mobile Developer",
                "url": "https://fanes.online/"
            },
            {
                "@type": "WebSite",
                "@id": "https://fanes.online/#website",
                "url": "https://fanes.online/",
                "name": "Fanes Setiawan"
            },
            {
                "@type": "WebPage",
                "@id": "https://fanes.online/jasa-upload-play-store#webpage",
                "url": "https://fanes.online/jasa-upload-play-store",
                "name": "Jasa Upload Aplikasi ke Play Store | Fanes Setiawan",
                "isPartOf": { "@id": "https://fanes.online/#website" }
            },
            {
                "@type": "Service",
                "name": "Jasa Upload Aplikasi ke Google Play Store",
                "provider": { "@id": "https://fanes.online/#person" },
                "url": "https://fanes.online/jasa-upload-play-store",
                "areaServed": "Indonesia",
                "serviceType": "App Release and Google Play Store Publishing"
            },
            {
                "@type": "BreadcrumbList",
                "itemListElement": [
                    {
                        "@type": "ListItem",
                        "position": 1,
                        "name": "Home",
                        "item": "https://fanes.online/"
                    },
                    {
                        "@type": "ListItem",
                        "position": 2,
                        "name": "Layanan",
                        "item": "https://fanes.online/#services"
                    },
                    {
                        "@type": "ListItem",
                        "position": 3,
                        "name": "Jasa Upload Aplikasi ke Play Store",
                        "item": "https://fanes.online/jasa-upload-play-store"
                    }
                ]
            },
            {
                "@type": "FAQPage",
                "mainEntity": [
                    {
                        "@type": "Question",
                        "name": "Apakah bisa membantu upload aplikasi Flutter ke Play Store?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Ya. Aplikasi Flutter dapat dipersiapkan untuk Android production release dan diupload ke Google Play menggunakan Android App Bundle."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Apakah bisa upload AAB ke Play Store?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Ya. Saya dapat membantu proses upload dan konfigurasi release AAB melalui Google Play Console."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Apakah bisa membantu aplikasi yang sudah pernah tayang?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Ya. Layanan juga dapat digunakan untuk update aplikasi yang sudah tersedia di Google Play Store."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Apakah bisa membantu aplikasi yang ditolak Google Play?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Bisa membantu menganalisis feedback dan menentukan langkah perbaikan yang diperlukan. Persetujuan akhir tetap ditentukan oleh Google Play."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Apakah aplikasi pasti diterima?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Tidak ada jaminan aplikasi pasti diterima. Aplikasi harus memenuhi kebijakan Google Play dan melewati proses review."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Apakah saya harus memiliki akun Google Play Developer?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Tidak harus. Anda bisa menggunakan akun Google Play Developer milik kami, dan kami akan mengurus semua prosesnya hingga rilis."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Apakah bisa membantu membuat AAB?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Bisa jika source code dan konfigurasi project tersedia dan layanan mencakup proses build."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Apakah bisa membantu update aplikasi?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Ya. Saya dapat membantu proses build release, upload AAB, konfigurasi version, dan submission update."
                        }
                    }
                ]
            }
        ]
    };

    return (
        <MainLayout>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            
            <div className="max-w-4xl mx-auto py-12 px-4 md:px-0">
                {/* BREADCRUMB */}
                <nav className="text-sm text-slate-500 mb-8 flex flex-wrap items-center gap-2">
                    <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
                    <span>→</span>
                    <Link href="/#services" className="hover:text-blue-600 transition-colors cursor-pointer">Layanan</Link>
                    <span>→</span>
                    <span className="text-slate-900 font-medium">Jasa Upload Aplikasi ke Play Store</span>
                </nav>

                {/* HERO SECTION */}
                <ScrollReveal>
                    <header className="mb-16">
                        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight mb-6">
                            Jasa Upload & Release Aplikasi Android ke Google Play Store
                        </h1>
                        <p className="text-lg md:text-xl text-slate-600 mb-8 leading-relaxed">
                            Bantu publikasikan aplikasi Android Anda dari proses persiapan, upload AAB, Google Play Console, testing, submission hingga siap dirilis ke pengguna.
                        </p>
                        
                        <div className="flex flex-wrap gap-4 mb-10">
                            <a href={waUrl} target="_blank" rel="noopener noreferrer" className="px-8 py-3.5 bg-green-600 hover:bg-green-700 text-white rounded-full font-bold transition-all shadow-md flex items-center gap-2">
                                Konsultasi via WhatsApp
                            </a>
                            <Link href="/#portfolio" className="px-8 py-3.5 bg-white border-2 border-slate-200 hover:border-slate-300 text-slate-700 rounded-full font-bold transition-all shadow-sm">
                                Lihat Portfolio
                            </Link>
                        </div>

                        {/* TRUST BADGES */}
                        <div className="flex flex-wrap items-center gap-2 pt-6 border-t border-slate-100">
                            {['Flutter Developer', 'Android', 'Google Play Console', 'Firebase', 'REST API', 'CI/CD', 'App Release', 'App Deployment'].map(badge => (
                                <span key={badge} className="text-xs font-semibold text-slate-600 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200">
                                    {badge}
                                </span>
                            ))}
                        </div>

                        {/* BANNER IMAGE */}
                        <div className="mt-12 rounded-3xl overflow-hidden shadow-xl border border-slate-100">
                            <Image 
                                src="/images/banner-jasa-release1.png" 
                                alt="Jasa Upload dan Release Aplikasi Android ke Play Store" 
                                width={1200} 
                                height={630} 
                                className="w-full h-auto object-cover"
                                priority
                            />
                        </div>
                    </header>
                </ScrollReveal>

                {/* INTRODUCTION */}
                <ScrollReveal>
                    <section className="mb-16 prose prose-slate max-w-none prose-lg">
                        <p className="font-semibold text-xl text-slate-900">Aplikasi Sudah Selesai Dibuat, Tapi Belum Tayang di Play Store?</p>
                        <p>
                            Memiliki aplikasi Android saja belum cukup. Sebelum aplikasi dapat tersedia di Google Play Store, terdapat beberapa proses yang perlu dipersiapkan mulai dari build release, Android App Bundle (AAB), signing, Google Play Console, store listing, testing, hingga submission untuk proses review.
                        </p>
                        <p>
                            Kami <Link href="/" className="font-semibold text-blue-600 no-underline hover:underline">Fanes Setiawan — Mobile Developer</Link> siap membantu developer, startup, UMKM, perusahaan, sekolah, dan pemilik aplikasi mempersiapkan serta mempublikasikan aplikasi Android ke Google Play Store.
                        </p>
                        <p>
                            Layanan ini cocok untuk aplikasi yang dibuat menggunakan Flutter, Kotlin, Java, React Native, maupun teknologi Android lainnya.
                        </p>
                    </section>
                </ScrollReveal>

                {/* SERVICE SECTION */}
                <section className="mb-16">
                    <h2 className="text-3xl font-bold text-slate-900 mb-8">Layanan Upload & Release Aplikasi Android</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                            <h3 className="text-xl font-bold text-slate-900 mb-3">Upload AAB ke Google Play Store</h3>
                            <p className="text-slate-600 text-sm leading-relaxed">Membantu proses upload Android App Bundle (AAB) ke Google Play Console dan menyiapkan release aplikasi.</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                            <h3 className="text-xl font-bold text-slate-900 mb-3">Google Play Console</h3>
                            <p className="text-slate-600 text-sm leading-relaxed">Membantu konfigurasi aplikasi pada Google Play Console, termasuk release, version code, version name, testing, store listing, dan submission.</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                            <h3 className="text-xl font-bold text-slate-900 mb-3">Store Listing</h3>
                            <p className="text-slate-600 text-sm leading-relaxed">Membantu mempersiapkan informasi yang tampil di halaman aplikasi seperti nama aplikasi, deskripsi, icon, screenshot, kategori, dan informasi pendukung lainnya.</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                            <h3 className="text-xl font-bold text-slate-900 mb-3">Testing</h3>
                            <p className="text-slate-600 text-sm leading-relaxed">Membantu mempersiapkan aplikasi untuk Internal Testing atau Closed Testing sesuai kondisi akun dan persyaratan Google Play.</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                            <h3 className="text-xl font-bold text-slate-900 mb-3">App Update</h3>
                            <p className="text-slate-600 text-sm leading-relaxed">Membantu upload dan release versi terbaru untuk aplikasi yang sudah tersedia di Google Play Store.</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                            <h3 className="text-xl font-bold text-slate-900 mb-3">Troubleshooting Release</h3>
                            <p className="text-slate-600 text-sm leading-relaxed">Membantu menganalisis masalah teknis yang muncul ketika build, signing, upload AAB, atau proses release.</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                            <h3 className="text-xl font-bold text-slate-900 mb-3">Review & Rejection Assistance</h3>
                            <p className="text-slate-600 text-sm leading-relaxed">Membantu memahami feedback atau penolakan dari Google Play dan menentukan langkah teknis yang perlu diperbaiki.</p>
                        </div>
                    </div>
                </section>

                {/* FRAMEWORK SUPPORT SECTION */}
                <section className="mb-16 bg-blue-50/50 p-8 rounded-3xl border border-blue-100">
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">Mendukung Semua Teknologi & Framework</h2>
                    <p className="text-slate-700 mb-6">Apapun framework atau bahasa pemrograman yang Anda gunakan, layanan ini mencakup semuanya. Mulai dari aplikasi Native (Kotlin/Java), Cross-platform (Flutter, React Native), hingga framework lainnya.</p>
                    
                    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm mb-6 overflow-x-auto">
                        <p className="text-sm font-mono text-slate-600 leading-loose whitespace-nowrap">
                            Source Code / Project &rarr; Release Config &rarr; Signing / Keystore &rarr; Build AAB &rarr; Google Play Console &rarr; Testing &rarr; Submission &rarr; Production Release
                        </p>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                        <span className="text-xs font-bold text-blue-700 bg-blue-100 px-3 py-1 rounded-full">Flutter</span>
                        <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">Kotlin / Java (Native)</span>
                        <span className="text-xs font-bold text-indigo-700 bg-indigo-100 px-3 py-1 rounded-full">React Native</span>
                        <span className="text-xs font-bold text-purple-700 bg-purple-100 px-3 py-1 rounded-full">Unity</span>
                        <span className="text-xs font-bold text-slate-700 bg-slate-200 px-3 py-1 rounded-full">Semua Framework Android</span>
                    </div>
                </section>

                {/* PROCESS SECTION */}
                <ScrollReveal>
                    <section className="mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 mb-10">Proses Release Aplikasi</h2>
                        
                        {/* Horizontal Timeline Wrapper */}
                        <div className="flex overflow-x-auto pb-8 pt-4 gap-6 snap-x scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
                            {[
                                { 
                                    title: 'Kirim File & Aset', 
                                    desc: 'Kirimkan file aplikasi (AAB/APK) beserta aset desain (logo, screenshot) kepada kami.' 
                                },
                                { 
                                    title: 'Kami Proses Semuanya', 
                                    desc: 'Duduk manis! Kami yang akan mengurus semua setup, konfigurasi, hingga proses upload di Google Play Console.' 
                                },
                                { 
                                    title: 'Aplikasi Tayang', 
                                    desc: 'Setelah lolos review Google, aplikasi Anda langsung rilis dan siap didownload oleh pengguna.' 
                                }
                            ].map((item, index, array) => (
                                <div key={index} className="min-w-[260px] md:min-w-[300px] relative snap-start flex flex-col group">
                                    
                                    {/* Connecting Line (Horizontal) */}
                                    <div className="flex items-center mb-6 relative">
                                        <div className="z-10 w-12 h-12 rounded-full bg-blue-50 border-2 border-blue-200 group-hover:border-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300 flex items-center justify-center text-blue-600 font-bold text-lg shadow-sm">
                                            {index + 1}
                                        </div>
                                        {/* Line connecting to the next node */}
                                        {index !== array.length - 1 && (
                                            <div className="absolute left-12 top-1/2 -translate-y-1/2 w-[120%] h-[2px] bg-blue-100"></div>
                                        )}
                                    </div>
                                    
                                    {/* Content */}
                                    <span className="text-blue-600 font-bold text-xs tracking-widest uppercase block mb-2">Langkah {String(index + 1).padStart(2, '0')}</span>
                                    <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                                    <p className="text-slate-600 text-sm leading-relaxed pr-4">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </ScrollReveal>

                {/* WHAT CLIENT NEEDS TO PREPARE */}
                <section className="mb-16">
                    <h2 className="text-3xl font-bold text-slate-900 mb-6">Apa yang Perlu Disiapkan?</h2>
                    <ul className="grid sm:grid-cols-2 gap-3 mb-6">
                        {[
                            'File AAB', 'Nama aplikasi', 'Icon aplikasi', 'Screenshot',
                            'Deskripsi aplikasi', 'Short description', 'Privacy Policy',
                            'Informasi developer', 'Kategori aplikasi', 'Akun Google Play Developer'
                        ].map(item => (
                            <li key={item} className="flex items-center gap-2 text-slate-700">
                                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full shrink-0"></span> {item}
                            </li>
                        ))}
                    </ul>
                    <p className="text-sm text-slate-500 bg-slate-50 p-4 rounded-lg border border-slate-100">
                        Jika client belum memiliki AAB production, arahkan untuk <a href={waUrl} className="text-blue-600 font-semibold hover:underline">konsultasi</a>.
                    </p>
                </section>

                {/* OWNERSHIP / ACCOUNT SECTION */}
                <section className="mb-16">
                    <h2 className="text-3xl font-bold text-slate-900 mb-6">Gunakan Akun Google Play Developer Anda Sendiri</h2>
                    <p className="text-slate-700 mb-4">Untuk keamanan dan kepemilikan jangka panjang, saya merekomendasikan aplikasi dirilis menggunakan akun Google Play Developer milik Anda sendiri.</p>
                    <p className="text-slate-700 mb-4">Dengan demikian:</p>
                    <ul className="list-disc pl-5 text-slate-700 space-y-2 mb-6">
                        <li>aplikasi tetap berada di bawah kendali Anda</li>
                        <li>akun developer tetap milik Anda</li>
                        <li>update aplikasi dapat dilakukan dari akun Anda</li>
                        <li>tidak bergantung pada akun developer pihak lain</li>
                    </ul>
                </section>

                {/* REJECTION SECTION */}
                <section className="mb-16">
                    <h2 className="text-3xl font-bold text-slate-900 mb-6">Aplikasi Ditolak Google Play?</h2>
                    <p className="text-slate-700 mb-4">Jika aplikasi mendapatkan penolakan atau feedback dari Google Play, jangan langsung membuat aplikasi baru.</p>
                    <p className="text-slate-700 mb-6">Saya dapat membantu membaca feedback dan menganalisis kemungkinan masalah dari sisi teknis maupun proses submission. Masalah yang dapat dianalisis antara lain:</p>
                    <div className="flex flex-wrap gap-2 mb-6">
                        {['App Content', 'Data Safety', 'Privacy Policy', 'Permission', 'Target API', 'Metadata', 'Store Listing', 'Signing', 'AAB', 'Release Configuration', 'Technical Issues'].map(item => (
                            <span key={item} className="text-xs font-semibold text-slate-600 bg-white border border-slate-200 px-3 py-1.5 rounded-full">{item}</span>
                        ))}
                    </div>
                    <p className="text-sm text-slate-500 italic bg-amber-50 border border-amber-100 p-4 rounded-lg">
                        Keputusan akhir mengenai persetujuan aplikasi tetap berada pada Google Play. Tidak ada pihak yang dapat menjamin sebuah aplikasi pasti disetujui.
                    </p>
                </section>

                {/* TARGET CLIENT */}
                <section className="mb-16">
                    <h2 className="text-3xl font-bold text-slate-900 mb-8">Siapa yang Cocok Menggunakan Layanan Ini?</h2>
                    <div className="grid sm:grid-cols-2 gap-6">
                        <div className="bg-white p-6 rounded-xl border border-slate-200">
                            <h3 className="font-bold text-lg text-slate-900 mb-2">Developer</h3>
                            <p className="text-slate-600 text-sm">Sudah selesai coding tetapi belum familiar dengan proses release.</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl border border-slate-200">
                            <h3 className="font-bold text-lg text-slate-900 mb-2">Startup</h3>
                            <p className="text-slate-600 text-sm">Membutuhkan bantuan publikasi aplikasi pertama.</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl border border-slate-200">
                            <h3 className="font-bold text-lg text-slate-900 mb-2">UMKM</h3>
                            <p className="text-slate-600 text-sm">Memiliki aplikasi bisnis tetapi tidak memiliki tim teknis untuk proses deployment.</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl border border-slate-200">
                            <h3 className="font-bold text-lg text-slate-900 mb-2">Perusahaan</h3>
                            <p className="text-slate-600 text-sm">Membutuhkan bantuan release dan update aplikasi mobile.</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl border border-slate-200">
                            <h3 className="font-bold text-lg text-slate-900 mb-2">Sekolah & Institusi</h3>
                            <p className="text-slate-600 text-sm">Memiliki aplikasi pendidikan, presensi, CBT, LMS, atau sistem informasi.</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl border border-slate-200">
                            <h3 className="font-bold text-lg text-slate-900 mb-2">Pemilik Aplikasi Flutter</h3>
                            <p className="text-slate-600 text-sm">Aplikasi sudah selesai tetapi mengalami kendala ketika melakukan Android release.</p>
                        </div>
                    </div>
                </section>

                {/* PORTFOLIO */}
                <section className="mb-16">
                    <h2 className="text-3xl font-bold text-slate-900 mb-6">Pengalaman Mengembangkan & Merilis Aplikasi Mobile</h2>
                    <p className="text-slate-700 mb-6">Berikut adalah beberapa aplikasi mobile yang telah berhasil saya kembangkan dan distribusikan:</p>
                    <ul className="space-y-4 mb-6">
                        <li className="border border-slate-100 p-4 rounded-lg bg-white">
                            <h4 className="font-bold text-slate-900">Cuan Track</h4>
                            <p className="text-sm text-slate-500 mb-2">Platform: Android | Tech: Flutter, Firebase</p>
                            <p className="text-sm text-slate-700">Aplikasi pelacakan pengeluaran personal dengan fitur kategorisasi.</p>
                        </li>
                        <li className="border border-slate-100 p-4 rounded-lg bg-white">
                            <h4 className="font-bold text-slate-900">Guru Smart School</h4>
                            <p className="text-sm text-slate-500 mb-2">Platform: Android | Tech: Flutter, REST API</p>
                            <p className="text-sm text-slate-700">Sistem informasi manajemen sekolah untuk memantau presensi dan nilai.</p>
                        </li>
                    </ul>
                    <Link href="/#portfolio" className="text-blue-600 font-bold hover:underline inline-flex items-center gap-1">
                        Lihat Portfolio Lengkap &rarr;
                    </Link>
                </section>

                {/* TECHNOLOGY */}
                <section className="mb-16">
                    <h2 className="text-3xl font-bold text-slate-900 mb-6">Teknologi yang Digunakan</h2>
                    <div className="flex flex-wrap gap-2">
                        {['Flutter', 'Dart', 'Android', 'Kotlin', 'Firebase', 'REST API', 'Git', 'CI/CD', 'Google Play Console', 'Android App Bundle'].map(tech => (
                            <span key={tech} className="bg-slate-800 text-white text-xs font-semibold px-4 py-2 rounded-full">{tech}</span>
                        ))}
                    </div>
                </section>

                {/* PRICING */}
                <section className="mb-20">
                    <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Paket & Harga Layanan</h2>
                    <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 items-start">
                        
                        {/* CARD 1: AKUN PRIBADI (MILIK FANES) */}
                        <div className="bg-white rounded-[1.5rem] p-4 md:p-5 shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-slate-100 relative">
                            {/* HEADER */}
                            <div className="flex items-center gap-3 mb-4">
                                {/* Profile Icon with Crown */}
                                <div className="relative">
                                    <div className="absolute -top-2 -left-2 text-sm rotate-[-15deg]">👑</div>
                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/30 text-white">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-lg md:text-xl font-extrabold text-slate-800 tracking-tight">Akun <span className="text-indigo-600">Pribadi</span></h3>
                                    <p className="text-slate-500 text-[10px] md:text-xs mt-0.5">Aplikasi dirilis di akun <span className="text-blue-500 font-bold">Google Play</span> kami</p>
                                </div>
                            </div>
                            
                            {/* PRICE BLOCK */}
                            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-[1rem] p-4 relative overflow-hidden mb-5 shadow-lg shadow-blue-500/20">
                                {/* Abstract Shapes in background */}
                                <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-2xl -mr-8 -mt-8"></div>
                                <div className="absolute bottom-0 left-0 w-20 h-20 bg-indigo-900/20 rounded-full blur-xl -ml-8 -mb-8"></div>
                                
                                <div className="relative z-10 flex justify-between items-center">
                                    <div>
                                        <div className="flex items-baseline text-white">
                                            <span className="text-sm md:text-base font-bold mr-1">Rp</span>
                                            <span className="text-3xl md:text-4xl font-black tracking-tighter">500</span>
                                            <span className="text-sm md:text-base font-bold">.000</span>
                                        </div>
                                        <div className="bg-indigo-800/40 text-white text-[9px] sm:text-[10px] font-semibold px-2 py-0.5 rounded-full inline-block mt-1 backdrop-blur-sm border border-white/10">
                                            / 1 Aplikasi (Tahun pertama)
                                        </div>
                                    </div>
                                    
                                    {/* Gold Badge */}
                                    <div className="hidden lg:flex w-14 h-14 bg-gradient-to-br from-yellow-300 via-yellow-400 to-yellow-600 rounded-full items-center justify-center shadow-lg border-4 border-yellow-200/50 transform rotate-12 relative shrink-0 ml-2">
                                        <div className="text-center text-yellow-900 leading-none">
                                            <div className="text-sm mb-0.5">👑</div>
                                            <div className="font-black text-[6px] uppercase">Akun<br/>Pribadi</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            {/* FEATURES LIST */}
                            <ul className="space-y-0 mb-5">
                                {[
                                    {
                                        title: 'Terpasang di akun console kami',
                                        desc: 'Aplikasi sudah siap digunakan di akun console kami.',
                                        icon: <svg className="w-3 h-3 text-blue-500" viewBox="0 0 24 24" fill="currentColor"><path d="M4 3.5v17a.5.5 0 00.757.429l14-8.5a.5.5 0 000-.858l-14-8.5A.5.5 0 004 3.5z"/></svg>,
                                        bg: 'bg-blue-50'
                                    },
                                    {
                                        title: 'Berlaku untuk 1 Aplikasi',
                                        desc: 'Cukup untuk 1 aplikasi sesuai kebutuhan Anda.',
                                        icon: <span className="font-bold text-blue-600 text-sm">1</span>,
                                        bg: 'bg-blue-100'
                                    },
                                    {
                                        title: 'Logo disesuaikan',
                                        desc: 'Kami bantu sesuaikan logo aplikasi sesuai permintaan.',
                                        icon: <svg className="w-3 h-3 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"></path></svg>,
                                        bg: 'bg-purple-50'
                                    },
                                    {
                                        title: 'Aset desain dari client',
                                        desc: 'Menggunakan aset desain dan screenshot dari Anda.',
                                        icon: <svg className="w-3 h-3 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>,
                                        bg: 'bg-pink-50'
                                    },
                                    {
                                        title: 'Terima AAB/APK siap jadi',
                                        desc: 'Anda kirimkan file aplikasi yang sudah siap rilis.',
                                        icon: <svg className="w-3 h-3 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>,
                                        bg: 'bg-orange-50'
                                    },
                                    {
                                        title: 'Perpanjangan Rp 250.000',
                                        desc: 'Biaya perpanjangan tahunan sangat terjangkau.',
                                        icon: <svg className="w-3 h-3 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"></path></svg>,
                                        bg: 'bg-indigo-50'
                                    }
                                ].map((feature, i, arr) => (
                                    <li key={i} className={`flex items-start gap-2.5 py-2.5 ${i !== arr.length - 1 ? 'border-b border-slate-100' : ''}`}>
                                        <div className={`w-8 h-8 rounded-lg ${feature.bg} flex items-center justify-center shrink-0`}>
                                            {feature.icon}
                                        </div>
                                        <div className="flex-1 pt-0.5">
                                            <h4 className="font-bold text-slate-800 text-[11px] md:text-xs">{feature.title}</h4>
                                            <p className="text-slate-500 text-[9px] md:text-[10px] mt-0.5 pr-2 leading-snug">{feature.desc}</p>
                                        </div>
                                        <div className="shrink-0 pt-1">
                                            <div className="w-3.5 h-3.5 rounded-full bg-emerald-500 flex items-center justify-center">
                                                <svg className="w-2 h-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path></svg>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            
                            {/* BUTTON */}
                            <a href={`${waUrl}&text=Halo%20Mas%20Fanes,%20saya%20tertarik%20dengan%20Jasa%20Upload%20Aplikasi%20(Akun%20Pribadi%20Rp%20500rb)`} target="_blank" rel="noopener noreferrer" className="relative group overflow-hidden flex items-center justify-center gap-2 w-full py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-full font-bold transition-all shadow-md hover:-translate-y-0.5 text-[11px] md:text-xs">
                                <div className="absolute inset-0 bg-white/20 w-1/2 -skew-x-12 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
                                <svg className="w-3.5 h-3.5 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
                                <span className="relative z-10">Pesan Sekarang (Upload)</span>
                            </a>
                        </div>

                        {/* CARD 2: PEMBUATAN AKUN */}
                        <div className="bg-white rounded-[1.5rem] p-4 md:p-5 shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-slate-100 relative">
                            {/* HEADER */}
                            <div className="flex items-center gap-3 mb-4">
                                {/* Rocket Icon */}
                                <div className="relative">
                                    <div className="absolute -top-2 -left-2 text-sm rotate-[-15deg]">🚀</div>
                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center shadow-lg shadow-violet-500/30 text-white">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-lg md:text-xl font-extrabold text-slate-800 tracking-tight">Buat <span className="text-fuchsia-600">Akun</span></h3>
                                    <p className="text-slate-500 text-[10px] md:text-xs mt-0.5">Kami bantu buatkan <span className="text-violet-500 font-bold">Akun Play Store</span></p>
                                </div>
                            </div>
                            
                            {/* PRICE BLOCK */}
                            <div className="bg-gradient-to-r from-violet-500 to-fuchsia-600 rounded-[1rem] p-4 relative overflow-hidden mb-5 shadow-lg shadow-violet-500/20">
                                {/* Abstract Shapes in background */}
                                <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-2xl -mr-8 -mt-8"></div>
                                <div className="absolute bottom-0 left-0 w-20 h-20 bg-fuchsia-900/20 rounded-full blur-xl -ml-8 -mb-8"></div>
                                
                                <div className="relative z-10 flex justify-between items-center">
                                    <div>
                                        <div className="flex items-baseline text-white">
                                            <span className="text-sm md:text-base font-bold mr-1">Rp</span>
                                            <span className="text-3xl md:text-4xl font-black tracking-tighter">300</span>
                                            <span className="text-sm md:text-base font-bold">.000</span>
                                        </div>
                                        <div className="bg-fuchsia-800/40 text-white text-[9px] sm:text-[10px] font-semibold px-2 py-0.5 rounded-full inline-block mt-1 backdrop-blur-sm border border-white/10">
                                            / Jasa Pembuatan
                                        </div>
                                    </div>
                                    
                                    {/* Gold Badge */}
                                    <div className="hidden lg:flex w-14 h-14 bg-gradient-to-br from-yellow-300 via-yellow-400 to-yellow-600 rounded-full items-center justify-center shadow-lg border-4 border-yellow-200/50 transform rotate-12 relative shrink-0 ml-2">
                                        <div className="text-center text-yellow-900 leading-none">
                                            <div className="text-sm mb-0.5">✨</div>
                                            <div className="font-black text-[6px] uppercase">Milik<br/>Anda</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            {/* FEATURES LIST */}
                            <ul className="space-y-0 mb-5">
                                {[
                                    {
                                        title: 'Akun 100% Milik Anda',
                                        desc: 'Akses penuh diserahkan ke email Anda selamanya.',
                                        icon: <svg className="w-3 h-3 text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>,
                                        bg: 'bg-violet-50'
                                    },
                                    {
                                        title: 'Bebas Upload Aplikasi',
                                        desc: 'Tidak ada batasan jumlah aplikasi yang diupload.',
                                        icon: <svg className="w-3 h-3 text-fuchsia-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>,
                                        bg: 'bg-fuchsia-50'
                                    },
                                    {
                                        title: 'Belum Termasuk $25',
                                        desc: 'Biaya daftar Google Play dibayar dari saldo/kartu Anda.',
                                        icon: <svg className="w-3 h-3 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>,
                                        bg: 'bg-rose-50'
                                    },
                                    {
                                        title: 'Dibantu Setup Pembayaran',
                                        desc: 'Kami bantu setting akun Merchant untuk IAP.',
                                        icon: <svg className="w-3 h-3 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg>,
                                        bg: 'bg-emerald-50'
                                    },
                                    {
                                        title: 'Pendampingan Penuh',
                                        desc: 'Konsultasi gratis sampai akun berhasil aktif.',
                                        icon: <svg className="w-3 h-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"></path></svg>,
                                        bg: 'bg-blue-50'
                                    },
                                    {
                                        title: 'Sekali Bayar',
                                        desc: 'Tidak ada biaya perpanjangan tahunan.',
                                        icon: <svg className="w-3 h-3 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path></svg>,
                                        bg: 'bg-amber-50'
                                    }
                                ].map((feature, i, arr) => (
                                    <li key={i} className={`flex items-start gap-2.5 py-2.5 ${i !== arr.length - 1 ? 'border-b border-slate-100' : ''}`}>
                                        <div className={`w-8 h-8 rounded-lg ${feature.bg} flex items-center justify-center shrink-0`}>
                                            {feature.icon}
                                        </div>
                                        <div className="flex-1 pt-0.5">
                                            <h4 className="font-bold text-slate-800 text-[11px] md:text-xs">{feature.title}</h4>
                                            <p className="text-slate-500 text-[9px] md:text-[10px] mt-0.5 pr-2 leading-snug">{feature.desc}</p>
                                        </div>
                                        <div className="shrink-0 pt-1">
                                            <div className="w-3.5 h-3.5 rounded-full bg-emerald-500 flex items-center justify-center">
                                                <svg className="w-2 h-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path></svg>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            
                            {/* BUTTON */}
                            <a href={`${waUrl}&text=Halo%20Mas%20Fanes,%20saya%20tertarik%20dengan%20Jasa%20Pembuatan%20Akun%20Play%20Store%20(Rp%20300rb)`} target="_blank" rel="noopener noreferrer" className="relative group overflow-hidden flex items-center justify-center gap-2 w-full py-2.5 bg-gradient-to-r from-violet-500 to-fuchsia-600 hover:from-violet-600 hover:to-fuchsia-700 text-white rounded-full font-bold transition-all shadow-md hover:-translate-y-0.5 text-[11px] md:text-xs">
                                <div className="absolute inset-0 bg-white/20 w-1/2 -skew-x-12 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
                                <svg className="w-3.5 h-3.5 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
                                <span className="relative z-10">Pesan Sekarang (Buat Akun)</span>
                            </a>
                        </div>
                    </div>
                </section>

                {/* FAQ */}
                <section className="mb-16">
                    <h2 className="text-3xl font-bold text-slate-900 mb-8">Frequently Asked Questions</h2>
                    <div className="space-y-6">
                        {[
                            { q: 'Apakah bisa membantu upload aplikasi Flutter ke Play Store?', a: 'Ya. Aplikasi Flutter dapat dipersiapkan untuk Android production release dan diupload ke Google Play menggunakan Android App Bundle.' },
                            { q: 'Apakah bisa upload AAB ke Play Store?', a: 'Ya. Saya dapat membantu proses upload dan konfigurasi release AAB melalui Google Play Console.' },
                            { q: 'Apakah bisa membantu aplikasi yang sudah pernah tayang?', a: 'Ya. Layanan juga dapat digunakan untuk update aplikasi yang sudah tersedia di Google Play Store.' },
                            { q: 'Apakah bisa membantu aplikasi yang ditolak Google Play?', a: 'Bisa membantu menganalisis feedback dan menentukan langkah perbaikan yang diperlukan. Persetujuan akhir tetap ditentukan oleh Google Play.' },
                            { q: 'Apakah aplikasi pasti diterima?', a: 'Tidak ada jaminan aplikasi pasti diterima. Aplikasi harus memenuhi kebijakan Google Play dan melewati proses review.' },
                            { q: 'Apakah saya harus memiliki akun Google Play Developer?', a: 'Tidak harus. Anda bisa menggunakan akun Google Play Developer milik kami, dan kami akan mengurus semua prosesnya hingga rilis.' },
                            { q: 'Apakah bisa membantu membuat AAB?', a: 'Bisa jika source code dan konfigurasi project tersedia dan layanan mencakup proses build.' },
                            { q: 'Apakah bisa membantu update aplikasi?', a: 'Ya. Saya dapat membantu proses build release, upload AAB, konfigurasi version, dan submission update.' }
                        ].map((faq, i) => (
                            <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                                <h3 className="font-bold text-lg text-slate-900 mb-2">{faq.q}</h3>
                                <p className="text-slate-600">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* FINAL CTA */}
                <section className="text-center bg-gradient-to-b from-blue-50 to-white py-16 px-6 rounded-3xl border border-blue-100">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Siap Membawa Aplikasi Anda ke Google Play Store?</h2>
                    <p className="text-lg text-slate-600 mb-2">Aplikasi sudah selesai dibuat.</p>
                    <p className="text-lg text-slate-600 mb-8">Sekarang saatnya membuat aplikasi tersebut tersedia untuk pengguna.</p>
                    
                    <p className="font-mono text-sm text-blue-600 font-bold mb-8 tracking-wider">
                        Build &rarr; Upload &rarr; Test &rarr; Submit &rarr; Release
                    </p>

                    <a href={waUrl} target="_blank" rel="noopener noreferrer" className="inline-flex px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold transition-all shadow-xl hover:-translate-y-1 items-center gap-2 mb-6">
                        Konsultasi Jasa Upload Aplikasi ke Play Store
                    </a>
                    
                    <p className="text-sm text-slate-500 font-medium">
                        Fanes Setiawan <br/>
                        <span className="opacity-80 mt-1 block">Flutter Developer · Mobile Developer · App Release & Deployment</span>
                    </p>
                </section>
            </div>
        </MainLayout>
    );
}

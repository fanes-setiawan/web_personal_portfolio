import { Profile, Project, Skill, Company } from '@/types';

export const profileData: Profile = {
    name: "Fanes Setiawan",
    role: "Software Developer",
    roleSubtitle: "Web Developer",
    bio: "Building clean, responsive, and modern web applications.",
    experienceYears: 1,
    avatarUrl: "https://ui-avatars.com/api/?name=Fanes+Setiawan&size=256&background=1e293b&color=fff",
    email: "admin@fanes.online",
    location: "Indonesia",
    website: "fanes.online",
    socials: {
        github: "https://github.com",
        linkedin: "https://linkedin.com",
    },
    education: [
        { degree: "S1 Teknik Informatika", institution: "Universitas", period: "2020 - 2024" }
    ]
};

export const skillsData: Skill[] = [
    { id: '1', name: 'iOS / Swift', iconName: 'Swift', level: 95 },
    { id: '2', name: 'Android / Kotlin', iconName: 'Kotlin', level: 80 },
    { id: '3', name: 'React Native', iconName: 'React', level: 75 },
    { id: '4', name: 'System Architecture', iconName: 'ServerCrash', level: 85 },
    { id: '5', name: 'Flutter', iconName: 'Flutter', level: 90 },
    { id: '6', name: 'CI/CD', iconName: 'GitMerge', level: 85 },
];

export const projectsData: Project[] = [
    {
        id: '1',
        title: 'Lumina Wallet',
        shortDescription: 'Fintech Solution',
        description: 'A high-performance crypto-asset management platform built for institutional-grade security.',
        imageUrl: '/project1.jpg',
        tags: ['Flutter', 'GetX', 'Go', 'Firebase'],
        category: 'ios',
        role: "Lead iOS Engineer",
        company: "TechFlow Solutions Inc.",
        period: "2021 — PRESENT",
        achievements: [
            "Architecting enterprise-scale FinTech applications using SwiftUI and Combine.",
            "Reduced memory leaks by 40% through rigorous profiling and custom memory management protocols."
        ],
        stats: [
            { label: 'Downloads', value: '100k+' },
            { label: 'User Rating', value: '4.9 ⭐' },
            { label: 'Uptime', value: '99.9%' },
            { label: 'Latency', value: '< 120ms' },
        ],
        caseStudy: {
            problem: "The existing wallet solutions were plagued by fragmented user experiences and severe performance bottlenecks. Institutional users faced complex onboarding flows, while real-time data synchronization was unreliable across varying network conditions in emerging markets.",
            solution: "We engineered Lumina with a 'Mobile-First Infrastructure' approach. By implementing a reactive state management system and an offline-first synchronization engine, we ensured that the interface remained fluid regardless of connectivity status.",
            features: ["Reactive State Management", "Offline-first Sync", "Biometric Security"],
            technicalArchitecture: {
                description: "Following the Clean Architecture principles to ensure modularity, testability, and scalability across the mobile ecosystem.",
                layers: [
                    { name: "Data Layer", description: "DTOs • Repositories • Local/Remote Data Sources" },
                    { name: "Domain Layer", description: "Entities • Use Cases • Business Logic" },
                    { name: "Presentation Layer", description: "UI Components • State Management • ViewModels" }
                ]
            },
            challenges: [
                {
                    title: "Complex State Management",
                    description: "Managing real-time price updates for 50+ assets while maintaining 60FPS UI interactions was our biggest hurdle. We implemented a GetX-based reactive controller pattern with granular listeners.",
                    tags: ["Architecture", "Performance"]
                },
                {
                    title: "Biometric-first Security Layer",
                    description: "Developed a proprietary security abstraction that seamlessly integrates FaceID and Fingerprint API across platforms with a secondary encrypted local fallback for sensitive keychain amenities.",
                    tags: ["Security", "Native Bridge"]
                }
            ],
            results: [
                { metric: "35%", description: "Reduction in average transaction latency after engine optimization." },
                { metric: "92%", description: "Positive user feedback on the new biometric onboarding flow." },
                { metric: "4.9/5", description: "Average App Store rating within the first 6 months of launch." }
            ],
            screenshots: ["/screen1.jpg", "/screen2.jpg", "/screen3.jpg"],
            downloadUrl: "#"
        }
    },
    {
        id: '2',
        title: 'FleetTrack Enterprise',
        shortDescription: 'Logistics App',
        description: 'Real-time logistics and routing application for enterprise tablets using SwiftUI.',
        imageUrl: '/project2.jpg',
        tags: ['Mapbox', 'GRPC'],
        category: 'ios',
        role: "Senior Mobile Developer",
        company: "Nexus App Studio",
        period: "2018 — 2021",
        achievements: [
            "Led a team of 5 developers to ship 12+ client apps.",
            "Spearheaded the migration from Objective-C to Swift, improving build performance by 25%."
        ],
    },
    {
        id: '3',
        title: 'Vitalis Health Monitor',
        shortDescription: 'Health App',
        description: 'Wearable-first health tracking application built with Kotlin and Jetpack Compose.',
        imageUrl: '/project3.jpg',
        tags: ['HealthKit', 'MVVM'],
        category: 'android',
    },
    {
        id: '4',
        title: 'Parisada Mobile',
        shortDescription: 'Religious Community Platform',
        description: 'A comprehensive mobile platform for community engagement, featuring real-time communication and AI-driven accessibility.',
        imageUrl: '/project4.jpg',
        tags: ['Flutter', 'LiveKit', 'AssemblyAI', 'WebSockets'],
        category: 'android',
        role: "Lead Flutter Developer",
        company: "Parisada Community",
        period: "2024 — PRESENT",
        achievements: [
            "Architected a low-latency real-time Speech-to-Text (STT) engine using AssemblyAI Streaming WebSockets for live session transcription.",
            "Optimized audio capture pipeline using PCM 16-bit 48kHz mono streaming, achieving high transcription accuracy even in noisy environments.",
            "Implemented advanced audio session management to resolve hardware microphone conflicts between STT services and LiveKit video conferencing.",
            "Developed robust reconnection and state management logic to handle network instability and maintain session continuity."
        ],
        stats: [
            { label: 'Latency', value: '< 500ms' },
            { label: 'Accuracy', value: '98%' },
            { label: 'Uptime', value: '99.9%' },
        ],
        caseStudy: {
            problem: "The platform needed to provide real-time accessibility for users during live sessions, but integrating speech-to-text alongside high-performance video conferencing (LiveKit) caused severe hardware resource conflicts and latency issues.",
            solution: "Developed a custom STT service that leverages low-level audio streaming and WebSocket connections. By implementing a sophisticated audio focus and session management layer, we allowed the app to broadcast audio and transcribe it simultaneously without interference.",
            features: ["Real-time STT", "LiveKit Integration", "Dynamic Reconnection", "PCM Audio Streaming"],
            technicalArchitecture: {
                description: "Built using a clean architecture pattern in Flutter, separating the audio capture, streaming, and transcription logic for maximum testability.",
                layers: [
                    { name: "Audio Service", description: "Hardware-level audio capture and session management" },
                    { name: "Streaming Layer", description: "WebSocket-based binary data transmission" },
                    { name: "UI/State Layer", description: "Real-time transcription display using StreamBuilder" }
                ]
            },
            challenges: [
                {
                    title: "LiveKit Resource Conflicts",
                    description: "Running multiple audio-dependent services simultaneously triggered OS-level microphone blocks. Resolved this by implementing a priority-based audio session configuration.",
                    tags: ["Audio", "Hardware"]
                }
            ],
            results: [
                { metric: "98%", description: "Successful transcription rate across diverse dialects." },
                { metric: "< 500ms", description: "End-to-end latency from speech to UI display." }
            ],
            screenshots: ["/screen1.jpg"],
            downloadUrl: "#"
        }
    },
];

export const companiesData: Company[] = [
    {
        id: '1',
        name: 'Apple Inc.',
        logo_url: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg',
        website: 'https://apple.com',
        description: 'Global technology leader known for iPhone, Mac, and innovative software ecosystems.',
        location: 'Cupertino, CA',
        start_date: '2022-01-01',
        end_date: undefined
    },

    {
        id: '2',
        name: 'Google',
        logo_url: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg',
        website: 'https://google.com',
        description: 'Pioneer in search, cloud computing, and hardware solutions.',
        location: 'Mountain View, CA',
        start_date: '2020-03-15',
        end_date: '2021-12-31'
    },
    {
        id: '3',
        name: 'Meta',
        logo_url: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg',
        website: 'https://meta.com',
        description: 'Focusing on social connection and the future of the metaverse.',
        location: 'Menlo Park, CA',
        start_date: '2018-06-01',
        end_date: '2020-02-28'
    }
];


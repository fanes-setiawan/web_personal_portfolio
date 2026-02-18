const fs = require('fs');

const profileData = {
    name: "Marcus Sterling",
    role: "Senior Mobile Architect",
    roleSubtitle: "Flutter / iOS / Android",
    bio: "Building scalable mobile solutions with clean architecture & performance-first mindset. Turning complex ideas into seamless user experiences.",
    experienceYears: 8,
    avatarUrl: "/profile-placeholder.jpg",
    email: "marcus.sterling@dex.io",
    location: "San Francisco, CA",
    website: "marcus-mobile.dev",
    socials: {
        github: "https://github.com",
        linkedin: "https://linkedin.com",
    },
    education: [
        { degree: "B.S. Computer Science", institution: "University of California, Berkeley", period: "2014 — 2018" }
    ]
};

const skillsData = [
    { id: '1', name: 'iOS / Swift', iconName: 'Swift', level: 95 },
    { id: '2', name: 'Android / Kotlin', iconName: 'Kotlin', level: 80 },
    { id: '3', name: 'React Native', iconName: 'React', level: 75 },
    { id: '4', name: 'System Architecture', iconName: 'ServerCrash', level: 85 },
    { id: '5', name: 'Flutter', iconName: 'Flutter', level: 90 },
    { id: '6', name: 'CI/CD', iconName: 'GitMerge', level: 85 },
];

const projectsData = [
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
        stats: [],
        caseStudy: null
    },
    {
        id: '3',
        title: 'Vitalis Health Monitor',
        shortDescription: 'Health App',
        description: 'Wearable-first health tracking application built with Kotlin and Jetpack Compose.',
        imageUrl: '/project3.jpg',
        tags: ['HealthKit', 'MVVM'],
        category: 'android',
        role: "Mobile Developer",
        company: "Vitalis Inc.",
        period: "2020",
        stats: [],
        caseStudy: null
    },
];

const escape = (str) => str ? `'${str.replace(/'/g, "''")}'` : 'NULL';
const json = (obj) => obj ? `'${JSON.stringify(obj).replace(/'/g, "''")}'` : 'NULL';
const array = (arr) => arr ? `ARRAY[${arr.map(item => typeof item === 'string' ? escape(item) : json(item)).join(',')}]` : 'NULL';
// For tags/achievements which are text arrays
const textArray = (arr) => arr ? `ARRAY[${arr.map(item => escape(item)).join(',')}]` : 'NULL';
// For JSON arrays (education is JSONB[])
const jsonArray = (arr) => arr ? `ARRAY[${arr.map(item => `${json(item)}::jsonb`).join(',')}]` : 'NULL';

const profileSql = `
-- Create Profile
DELETE FROM public.profile;
INSERT INTO public.profile (name, role, role_subtitle, bio, experience_years, avatar_url, email, location, website, socials, education)
VALUES (
    ${escape(profileData.name)},
    ${escape(profileData.role)},
    ${escape(profileData.roleSubtitle)},
    ${escape(profileData.bio)},
    ${profileData.experienceYears},
    ${escape(profileData.avatarUrl)},
    ${escape(profileData.email)},
    ${escape(profileData.location)},
    ${escape(profileData.website)},
    ${json(profileData.socials)},
    ${jsonArray(profileData.education)}
);
`;

const skillsSql = `
-- Create Skills
DELETE FROM public.skills;
` + skillsData.map(s => `
INSERT INTO public.skills (name, icon_name, level)
VALUES (${escape(s.name)}, ${escape(s.iconName)}, ${s.level});
`).join('\n');

const projectsSql = `
-- Create Projects
DELETE FROM public.projects;
` + projectsData.map(p => `
INSERT INTO public.projects (title, short_description, description, category, image_url, tags, role, company, period, achievements, stats, case_study)
VALUES (
    ${escape(p.title)},
    ${escape(p.shortDescription)},
    ${escape(p.description)},
    ${escape(p.category)},
    ${escape(p.imageUrl)},
    ${textArray(p.tags)},
    ${escape(p.role)},
    ${escape(p.company)},
    ${escape(p.period)},
    ${textArray(p.achievements)},
    ${p.stats && p.stats.length > 0 ? jsonArray(p.stats) : 'NULL'},
    ${json(p.caseStudy)}
);
`).join('\n');

const sql = `${profileSql}\n\n${skillsSql}\n\n${projectsSql}`;

console.log(sql);

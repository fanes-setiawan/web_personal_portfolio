export interface Skill {
    id: string;
    name: string;
    iconName: string; // mapping to Lucide icons
    level?: number; // 0-100 for CV progress bars
}

interface Stat {
    label: string;
    value: string;
    icon?: string;
}

interface CaseStudyDetails {
    problem: string;
    solution: string;
    features: string[];
    technicalArchitecture: {
        description: string;
        layers: {
            name: string;
            description: string;
        }[];
    };
    challenges: {
        title: string;
        description: string;
        tags: string[];
    }[];
    results: {
        metric: string;
        description: string;
    }[];
    screenshots: string[];
    downloadUrl?: string;
}

export interface Project {
    id: string;
    title: string;
    description: string;
    shortDescription: string;
    imageUrl: string;
    tags: string[]; // e.g., "iOS", "Android", "Flutter"
    category: "all" | "ios" | "android" | "web";
    link?: string;
    stats?: Stat[]; // e.g. "100k+ Downloads", "4.9 Rating"
    caseStudy?: CaseStudyDetails;
    role?: string; // For CV: e.g. "Lead iOS Engineer"
    company?: string; // For CV
    period?: string; // For CV: e.g. "2021 - Present"
    appStoreUrl?: string;
    playStoreUrl?: string;
    achievements?: string[]; // For CV bullet points
    isPrivate?: boolean; // For CV categorization
}

export interface Education {
    degree: string;
    institution: string;
    period: string;
}

export interface Technology {
    id: string;
    name: string;
    created_at?: string;
}

export interface Company {
    id: string;
    name: string;
    logo_url?: string;
    website?: string;
    description?: string;
    location?: string;
    start_date?: string;
    end_date?: string;
    technologies?: Technology[];
    created_at?: string;
}

export interface Profile {
    name: string;
    role: string;
    roleSubtitle: string; // "Flutter / iOS / Android"
    bio: string;
    experienceYears: number;
    avatarUrl: string;
    email: string;
    location?: string; // For CV
    phone?: string; // For CV
    website?: string; // For CV
    coreTechStack?: string[]; // For CV
    socials: {
        github?: string;
        linkedin?: string;
        twitter?: string;
        whatsapp?: string;
    };
    education?: Education[];
}

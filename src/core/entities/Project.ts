export interface Project {
    id: string;
    title: string;
    slug: string;
    shortDescription: string;
    fullDescription: string;
    iconUrl: string;
    screenshots: string[];
    platform: 'Android' | 'iOS' | 'Both';
    playStoreUrl?: string;
    appStoreUrl?: string;
    privacyPolicy: string;
    createdAt: string;
    isFeatured: boolean;
}

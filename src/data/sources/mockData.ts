import { Project } from '../../core/entities/Project';
import { CompanyProfile } from '../../core/entities/CompanyProfile';

export const mockCompanyProfile: CompanyProfile = {
    id: 'c1',
    companyName: 'Jawalabs',
    tagline: 'Creating useful and entertaining mobile applications.',
    contactEmail: 'hello@jawalabs.com',
    aboutUs: 'We are a dedicated team of engineers and designers building engaging applications for Android and iOS. Our mission is to build apps that improve daily life and entertain millions of users worldwide.',
};

export const mockProjects: Project[] = [
    {
        id: 'p1',
        title: 'OmniConvert',
        slug: 'omniconvert',
        shortDescription: 'The ultimate conversion tool for all units.',
        fullDescription: 'OmniConvert allows you to seamlessly convert between currencies, measurements, weights, and more using an intuitive brutalist-inspired UI.',
        iconUrl: 'https://placehold.co/150x150/000000/00FFFF/png?text=OC',
        screenshots: [
            'https://placehold.co/300x600/1E1E1E/00FFFF/png?text=Home',
            'https://placehold.co/300x600/1E1E1E/00FFFF/png?text=Convert',
        ],
        platform: 'Android',
        playStoreUrl: 'https://play.google.com/store/apps/details?id=com.jawalabs.omniconvert',
        privacyPolicy: 'This is the privacy policy for OmniConvert. We do not collect or share any personal identifying information without explicit consent.',
        createdAt: new Date().toISOString(),
        isFeatured: true,
    },
    {
        id: 'p2',
        title: 'Secure Vault Calculator',
        slug: 'secure-vault',
        shortDescription: 'Hide your photos behind a functional calculator.',
        fullDescription: 'A private vault secured by a PIN that looks like a normal calculator. Safely store explicit or personal media files completely hidden from prying eyes.',
        iconUrl: 'https://placehold.co/150x150/000000/FF00FF/png?text=SV',
        screenshots: [
            'https://placehold.co/300x600/1E1E1E/FF00FF/png?text=Calc',
            'https://placehold.co/300x600/1E1E1E/FF00FF/png?text=Vault',
        ],
        platform: 'Both',
        playStoreUrl: 'https://play.google.com/store/apps/details?id=com.jawalabs.securevault',
        appStoreUrl: 'https://apps.apple.com/us/app/secure-vault/id0000000',
        privacyPolicy: 'Secure Vault Calculator respects user privacy. Media stored in the vault remains local and is encrypted on-device. No cloud backups are created unless explicitly enabled.',
        createdAt: new Date().toISOString(),
        isFeatured: true,
    }
];

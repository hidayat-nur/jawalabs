import { NextResponse } from 'next/server';
import { query } from '../../../config/db';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const {
            id, title, slug, shortDescription, fullDescription,
            iconUrl, platform, playStoreUrl, appStoreUrl,
            privacyPolicy, isFeatured, screenshots
        } = body;

        const createdAt = new Date().toISOString();

        await query(`
      INSERT INTO Projects (id, title, slug, shortDescription, fullDescription, iconUrl, platform, playStoreUrl, appStoreUrl, privacyPolicy, createdAt, isFeatured)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
    `, [id, title, slug, shortDescription, fullDescription, iconUrl, platform, playStoreUrl, appStoreUrl, privacyPolicy, createdAt, isFeatured]);

        if (screenshots && Array.isArray(screenshots)) {
            for (const url of screenshots) {
                if (url) {
                    await query(`INSERT INTO ProjectScreenshots (projectId, imageUrl) VALUES ($1, $2)`, [id, url]);
                }
            }
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Failed to create project:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

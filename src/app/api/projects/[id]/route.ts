import { NextResponse } from 'next/server';
import { query } from '../../../../config/db';

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const body = await req.json();
        const {
            title, slug, shortDescription, fullDescription,
            iconUrl, platform, playStoreUrl, appStoreUrl,
            privacyPolicy, isFeatured, screenshots
        } = body;

        await query(`
      UPDATE Projects SET 
        title = $1, slug = $2, shortDescription = $3, fullDescription = $4, 
        iconUrl = $5, platform = $6, playStoreUrl = $7, appStoreUrl = $8, 
        privacyPolicy = $9, isFeatured = $10
      WHERE id = $11
    `, [title, slug, shortDescription, fullDescription, iconUrl, platform, playStoreUrl, appStoreUrl, privacyPolicy, isFeatured, id]);

        // Update screenshots: delete old and insert new
        await query(`DELETE FROM ProjectScreenshots WHERE projectId = $1`, [id]);

        if (screenshots && Array.isArray(screenshots)) {
            for (const url of screenshots) {
                if (url) {
                    await query(`INSERT INTO ProjectScreenshots (projectId, imageUrl) VALUES ($1, $2)`, [id, url]);
                }
            }
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Failed to update project:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        await query(`DELETE FROM Projects WHERE id = $1`, [id]);
        // ProjectScreenshots deleted automatically due to ON DELETE CASCADE
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Failed to delete project:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

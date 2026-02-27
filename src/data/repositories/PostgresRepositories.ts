import { Project } from '../../core/entities/Project';
import { CompanyProfile } from '../../core/entities/CompanyProfile';
import { ProjectRepository, CompanyRepository } from '../../core/useCases/Repositories';
import { query } from '../../config/db';

export class PostgresProjectRepository implements ProjectRepository {
    async getProjects(): Promise<Project[]> {
        const res = await query(`
      SELECT p.*, array_agg(s.imageUrl) as screenshots
      FROM Projects p
      LEFT JOIN ProjectScreenshots s ON p.id = s.projectId
      GROUP BY p.id
      ORDER BY p.createdAt DESC
    `);

        return res.rows.map(this.mapToProject);
    }

    async getProjectBySlug(slug: string): Promise<Project | null> {
        const res = await query(`
      SELECT p.*, array_agg(s.imageUrl) as screenshots
      FROM Projects p
      LEFT JOIN ProjectScreenshots s ON p.id = s.projectId
      WHERE p.slug = $1
      GROUP BY p.id
    `, [slug]);

        if (res.rows.length === 0) return null;
        return this.mapToProject(res.rows[0]);
    }

    async getFeaturedProjects(): Promise<Project[]> {
        const res = await query(`
      SELECT p.*, array_agg(s.imageUrl) as screenshots
      FROM Projects p
      LEFT JOIN ProjectScreenshots s ON p.id = s.projectId
      WHERE p.isFeatured = TRUE
      GROUP BY p.id
      ORDER BY p.createdAt DESC
    `);

        return res.rows.map(this.mapToProject);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private mapToProject(dbRow: Record<string, any>): Project {
        return {
            id: dbRow.id,
            title: dbRow.title,
            slug: dbRow.slug,
            shortDescription: dbRow.shortdescription,
            fullDescription: dbRow.fulldescription,
            iconUrl: dbRow.iconurl,
            screenshots: dbRow.screenshots[0] === null ? [] : dbRow.screenshots, // handle null aggregation
            platform: dbRow.platform as 'Android' | 'iOS' | 'Both',
            playStoreUrl: dbRow.playstoreurl,
            appStoreUrl: dbRow.appstoreurl,
            privacyPolicy: dbRow.privacypolicy,
            createdAt: dbRow.createdat.toISOString(),
            isFeatured: dbRow.isfeatured,
        };
    }
}

export class PostgresCompanyRepository implements CompanyRepository {
    async getCompanyProfile(): Promise<CompanyProfile> {
        const res = await query('SELECT * FROM CompanyProfile LIMIT 1');

        if (res.rows.length === 0) {
            throw new Error('Company profile not found in database');
        }

        const dbRow = res.rows[0];
        return {
            id: dbRow.id.toString(),
            companyName: dbRow.companyname,
            tagline: dbRow.tagline,
            contactEmail: dbRow.contactemail,
            aboutUs: dbRow.aboutus,
        };
    }
}

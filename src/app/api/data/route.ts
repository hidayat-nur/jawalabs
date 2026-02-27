import { NextResponse } from 'next/server';
import { PostgresCompanyRepository, PostgresProjectRepository } from '../../../data/repositories/PostgresRepositories';
import { CompanyRepositoryImpl, ProjectRepositoryImpl } from '../../../data/repositories/MockRepositories';

export async function GET() {
    const useDatabase = !!process.env.DATABASE_URL;

    try {
        const companyRepo = useDatabase ? new PostgresCompanyRepository() : new CompanyRepositoryImpl();
        const projectRepo = useDatabase ? new PostgresProjectRepository() : new ProjectRepositoryImpl();

        const [projects, featuredProjects, company] = await Promise.all([
            projectRepo.getProjects(),
            projectRepo.getFeaturedProjects(),
            companyRepo.getCompanyProfile(),
        ]);

        return NextResponse.json({
            projects,
            featuredProjects,
            company
        });
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

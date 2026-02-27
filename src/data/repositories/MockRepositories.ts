import { Project } from '../../core/entities/Project';
import { CompanyProfile } from '../../core/entities/CompanyProfile';
import { ProjectRepository, CompanyRepository } from '../../core/useCases/Repositories';
import { mockProjects, mockCompanyProfile } from '../sources/mockData';

export class ProjectRepositoryImpl implements ProjectRepository {
    async getProjects(): Promise<Project[]> {
        return Promise.resolve(mockProjects);
    }

    async getProjectBySlug(slug: string): Promise<Project | null> {
        const project = mockProjects.find((p) => p.slug === slug);
        return Promise.resolve(project || null);
    }

    async getFeaturedProjects(): Promise<Project[]> {
        const featured = mockProjects.filter((p) => p.isFeatured);
        return Promise.resolve(featured);
    }
}

export class CompanyRepositoryImpl implements CompanyRepository {
    async getCompanyProfile(): Promise<CompanyProfile> {
        return Promise.resolve(mockCompanyProfile);
    }
}

import { Project } from '../entities/Project';
import { CompanyProfile } from '../entities/CompanyProfile';

export interface ProjectRepository {
    getProjects(): Promise<Project[]>;
    getProjectBySlug(slug: string): Promise<Project | null>;
    getFeaturedProjects(): Promise<Project[]>;
}

export interface CompanyRepository {
    getCompanyProfile(): Promise<CompanyProfile>;
}

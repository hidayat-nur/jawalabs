'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Project } from '../../core/entities/Project';
import { CompanyProfile } from '../../core/entities/CompanyProfile';

interface AppContextType {
    projects: Project[];
    featuredProjects: Project[];
    companyParams: CompanyProfile | null;
    loading: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
    const [companyParams, setCompanyParams] = useState<CompanyProfile | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/data');
                if (!response.ok) throw new Error('Data fetch failed');

                const data = await response.json();

                setProjects(data.projects);
                setFeaturedProjects(data.featuredProjects);
                setCompanyParams(data.company);
            } catch (error) {
                console.error('Failed to load application data', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <AppContext.Provider value={{ projects, featuredProjects, companyParams, loading }}>
            {children}
        </AppContext.Provider>
    );
};

export const useApp = () => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useApp must be used within an AppProvider');
    }
    return context;
};

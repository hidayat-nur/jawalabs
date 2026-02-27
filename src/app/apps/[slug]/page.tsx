'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useApp } from '../../../presentation/providers/AppProvider';
import { Project } from '../../../core/entities/Project';

export default function AppDetailPage() {
    const params = useParams();
    const slug = params.slug as string;
    const { projects, loading } = useApp();

    const project: Project | null = projects.find(p => p.slug === slug) || null;

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                <h2>Loading App Detail...</h2>
            </div>
        );
    }

    if (!project) {
        return (
            <div style={{ textAlign: 'center', padding: '100px 0' }}>
                <h2>Application Not Found</h2>
                <Link href="/apps" style={{ color: 'var(--primary)', marginTop: '20px', display: 'inline-block' }}>
                    &larr; Back to Portfolio
                </Link>
            </div>
        );
    }

    return (
        <div style={{ animation: 'fadeIn 0.5s ease-out' }}>
            <Link href="/apps" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none', marginBottom: '40px', display: 'inline-flex', alignItems: 'center', gap: '8px', transition: 'color 0.3s' }}>
                &larr; Back to Portfolio
            </Link>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '60px', alignItems: 'flex-start' }}>
                {/* Left Col: Info */}
                <div style={{ flex: '1 1 400px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '32px' }}>
                        <img
                            src={project.iconUrl}
                            alt={project.title}
                            style={{ width: '120px', height: '120px', borderRadius: '30px', boxShadow: '0 10px 30px rgba(0, 255, 255, 0.2)' }}
                        />
                        <div>
                            <h1 style={{ fontSize: '40px', fontWeight: 800, marginBottom: '8px' }}>{project.title}</h1>
                            <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--primary)', background: 'rgba(0, 255, 255, 0.1)', padding: '6px 12px', borderRadius: '16px' }}>
                                {project.platform}
                            </span>
                        </div>
                    </div>

                    <p style={{ fontSize: '20px', color: 'rgba(255,255,255,0.9)', marginBottom: '24px', lineHeight: 1.6 }}>
                        {project.shortDescription}
                    </p>

                    <div className="glass-panel" style={{ padding: '32px', marginBottom: '40px' }}>
                        <h3 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '16px' }}>About This App</h3>
                        <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.8, marginBottom: '32px' }}>
                            {project.fullDescription}
                        </p>

                        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                            {project.playStoreUrl && (
                                <a href={project.playStoreUrl} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ flex: 1 }}>
                                    Get on Google Play
                                </a>
                            )}
                            {project.appStoreUrl && (
                                <a href={project.appStoreUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ flex: 1 }}>
                                    Get on App Store
                                </a>
                            )}
                        </div>
                    </div>

                    <div style={{ marginTop: '40px', padding: '24px', border: '1px solid var(--glass-border)', borderRadius: '16px', backgroundColor: 'rgba(255,255,255,0.02)' }}>
                        <h4 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '12px', color: 'rgba(255,255,255,0.5)' }}>Compliance & Policies</h4>
                        <Link href={`/apps/${project.slug}/privacy`} style={{ color: 'var(--primary)', textDecoration: 'underline', fontSize: '16px' }}>
                            Privacy Policy for {project.title}
                        </Link>
                    </div>
                </div>

                {/* Right Col: Screenshots */}
                <div style={{ flex: '1 1 300px' }}>
                    <h3 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '24px', textAlign: 'center' }}>Screenshots</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: project.screenshots.length > 1 ? '1fr 1fr' : '1fr', gap: '20px', justifyContent: 'center' }}>
                        {project.screenshots.map((src, i) => (
                            <img
                                key={i}
                                src={src}
                                alt={`${project.title} screenshot ${i + 1}`}
                                style={{ width: '100%', maxWidth: '300px', borderRadius: '24px', border: '4px solid var(--glass-border)', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

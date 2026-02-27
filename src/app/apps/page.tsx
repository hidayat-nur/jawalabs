'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '../../presentation/providers/AppProvider';

export default function AppsPage() {
    const { projects, loading } = useApp();

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                <h2>Loading Portfolio...</h2>
            </div>
        );
    }

    return (
        <div>
            <section style={{ textAlign: 'center', marginBottom: '60px' }}>
                <h1 style={{ fontSize: '48px', fontWeight: 800, marginBottom: '24px' }}>Our <span className="gradient-text">Portfolio</span></h1>
                <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.7)', maxWidth: '600px', margin: '0 auto' }}>
                    Explore the applications developed by Jawalabs across Android and iOS platforms.
                </p>
            </section>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px' }}>
                {projects.map((project) => (
                    <Link href={`/apps/${project.slug}`} key={project.id}>
                        <div className="glass-panel hover-lift" style={{ padding: '32px', cursor: 'pointer', height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '24px' }}>
                                <img
                                    src={project.iconUrl}
                                    alt={project.title}
                                    style={{ width: '64px', height: '64px', borderRadius: '16px' }}
                                />
                                <div>
                                    <h3 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '8px' }}>{project.title}</h3>
                                    <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--primary)', background: 'rgba(0, 255, 255, 0.1)', padding: '4px 8px', borderRadius: '12px' }}>
                                        {project.platform}
                                    </span>
                                </div>
                            </div>
                            <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '24px', flex: 1, lineHeight: 1.6 }}>{project.shortDescription}</p>
                            <span style={{ fontSize: '14px', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '8px' }} className="gradient-text">
                                View Project Details &rarr;
                            </span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

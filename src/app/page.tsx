'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '../presentation/providers/AppProvider';

export default function Home() {
  const { featuredProjects, companyParams, loading } = useApp();

  if (loading || !companyParams) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <h2>Loading Jawalabs...</h2>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section */}
      <section style={{ textAlign: 'center', marginBottom: '80px', paddingTop: '40px' }}>
        <h1 style={{ fontSize: '64px', fontWeight: 800, marginBottom: '24px', lineHeight: 1.1 }}>
          <span className="gradient-text">We Create</span><br />
          Useful & Entertaining<br />
          Mobile Apps.
        </h1>
        <p style={{ fontSize: '20px', color: 'rgba(255,255,255,0.7)', maxWidth: '600px', margin: '0 auto 40px auto' }}>
          {companyParams.aboutUs}
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
          <Link href="/apps" className="btn-primary">View Our Portfolio</Link>
          <a href={`mailto:${companyParams.contactEmail}`} className="btn-secondary">Contact Us</a>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section style={{ marginBottom: '60px' }}>
        <h2 style={{ fontSize: '36px', fontWeight: 800, marginBottom: '40px', textAlign: 'center' }}>Featured Apps</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
          {featuredProjects.map((project) => (
            <Link href={`/apps/${project.slug}`} key={project.id}>
              <div className="glass-panel hover-lift" style={{ padding: '32px', cursor: 'pointer', height: '100%', display: 'flex', flexDirection: 'column' }}>
                <img
                  src={project.iconUrl}
                  alt={project.title}
                  style={{ width: '80px', height: '80px', borderRadius: '20px', marginBottom: '24px' }}
                />
                <h3 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '12px' }}>{project.title}</h3>
                <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '24px', flex: 1 }}>{project.shortDescription}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--primary)', background: 'rgba(0, 255, 255, 0.1)', padding: '6px 12px', borderRadius: '16px' }}>
                    {project.platform}
                  </span>
                  <span style={{ fontSize: '14px', opacity: 0.5 }}>View Details &rarr;</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

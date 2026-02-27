'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useApp } from '../../../../presentation/providers/AppProvider';

export default function PrivacyPolicyPage() {
    const params = useParams();
    const slug = params.slug as string;
    const { projects, companyParams, loading } = useApp();

    const project = projects.find(p => p.slug === slug) || null;

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                <h2>Loading Policy...</h2>
            </div>
        );
    }

    if (!project) {
        return (
            <div style={{ textAlign: 'center', padding: '100px 0' }}>
                <h2>Policy Not Found</h2>
                <Link href="/apps" style={{ color: 'var(--primary)', marginTop: '20px', display: 'inline-block' }}>
                    &larr; Back to Portfolio
                </Link>
            </div>
        );
    }

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', animation: 'fadeIn 0.5s ease-out' }}>
            <Link href={`/apps/${project.slug}`} style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none', marginBottom: '40px', display: 'inline-flex', alignItems: 'center', gap: '8px', transition: 'color 0.3s' }}>
                &larr; Back to {project.title}
            </Link>

            <div className="glass-panel" style={{ padding: '60px' }}>
                <h1 style={{ fontSize: '32px', fontWeight: 800, marginBottom: '24px', borderBottom: '1px solid var(--glass-border)', paddingBottom: '16px' }}>
                    Privacy Policy: {project.title}
                </h1>

                <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.7)', marginBottom: '32px' }}>
                    Effective Date: {new Date(project.createdAt).toLocaleDateString()}
                </p>

                <div style={{ fontSize: '18px', lineHeight: 1.8, color: 'rgba(255,255,255,0.9)' }}>
                    <p style={{ marginBottom: '24px' }}>
                        {companyParams?.companyName} built the {project.title} app as a Free/Freemium/Commercial app.
                        This SERVICE is provided by {companyParams?.companyName} and is intended for use as is.
                    </p>
                    <p style={{ marginBottom: '24px' }}>
                        This page is used to inform visitors regarding our policies with the collection, use, and disclosure of Personal Information if anyone decided to use our Service.
                    </p>
                    <div style={{ backgroundColor: 'rgba(0,0,0,0.3)', padding: '24px', borderRadius: '16px', fontStyle: 'italic', marginBottom: '24px' }}>
                        {project.privacyPolicy}
                    </div>
                    <h2 style={{ fontSize: '24px', fontWeight: 600, marginTop: '40px', marginBottom: '16px' }}>Information Collection and Use</h2>
                    <p style={{ marginBottom: '24px' }}>
                        For a better experience, while using our Service, we may require you to provide us with certain personally identifiable information. The information that we request will be retained by us and used as described in this privacy policy.
                    </p>
                    <h2 style={{ fontSize: '24px', fontWeight: 600, marginTop: '40px', marginBottom: '16px' }}>Contact Us</h2>
                    <p style={{ marginBottom: '24px' }}>
                        If you have any questions or suggestions about our Privacy Policy, do not hesitate to contact us at: <a href={`mailto:${companyParams?.contactEmail}`} style={{ color: 'var(--primary)', textDecoration: 'underline' }}>{companyParams?.contactEmail}</a>.
                    </p>
                </div>
            </div>
        </div>
    );
}

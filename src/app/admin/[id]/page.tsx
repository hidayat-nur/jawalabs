'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

import { Project } from '../../../core/entities/Project';

export default function EditProjectPage() {
    const params = useParams();
    const router = useRouter();
    const idValue = Array.isArray(params.id) ? params.id[0] : params.id;
    const isNew = idValue === 'new';

    const [formData, setFormData] = useState({
        id: '',
        title: '',
        slug: '',
        shortDescription: '',
        fullDescription: '',
        iconUrl: '',
        platform: 'Both',
        playStoreUrl: '',
        appStoreUrl: '',
        privacyPolicy: '',
        isFeatured: false,
        screenshots: ['', '']
    });

    const [loading, setLoading] = useState(!isNew);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (!isNew) {
            fetch('/api/data', { cache: 'no-store' })
                .then(res => res.json())
                .then(data => {
                    const project = data.projects?.find((p: Project) => p.id === idValue);
                    if (project) {
                        setFormData({
                            ...project,
                            screenshots: project.screenshots?.length > 0 ? project.screenshots : ['', '']
                        });
                    } else {
                        alert('Project not found');
                        router.push('/admin');
                    }
                })
                .finally(() => setLoading(false));
        }
    }, [idValue, isNew, router]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target as HTMLInputElement;
        const checked = (e.target as HTMLInputElement).checked;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleScreenshotChange = (index: number, value: string) => {
        const newSc = [...formData.screenshots];
        newSc[index] = value;
        setFormData(prev => ({ ...prev, screenshots: newSc }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        const url = isNew ? '/api/projects' : `/api/projects/${idValue}`;
        const method = isNew ? 'POST' : 'PUT';

        // Filter out empty screenshot entries and generate id for new posts
        const payload = {
            ...formData,
            id: isNew ? 'p' + Date.now().toString() : idValue,
            screenshots: formData.screenshots.filter(s => s.trim() !== '')
        };

        try {
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                router.push('/admin');
                router.refresh();
            } else {
                alert('Error saving project to database.');
                setSaving(false);
            }
        } catch (error) {
            console.error(error);
            alert('API Connection Failed');
            setSaving(false);
        }
    };

    if (loading) return <div style={{ padding: '60px', textAlign: 'center' }}>Loading Project Data...</div>;

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
            <div className="glass-panel" style={{ padding: '40px' }}>
                <h1 style={{ fontSize: '32px', fontWeight: 800, marginBottom: '32px' }}>
                    {isNew ? 'Create New Project' : 'Edit Project Details'}
                </h1>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label style={{ fontSize: '14px', fontWeight: 600, color: 'var(--primary)' }}>Project Title</label>
                        <input name="title" value={formData.title} onChange={handleChange} required style={inputStyle} placeholder="e.g. OmniConvert Pro" />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label style={{ fontSize: '14px', fontWeight: 600, color: 'var(--primary)' }}>Slug (URL Name)</label>
                        <input name="slug" value={formData.slug} onChange={handleChange} required style={inputStyle} placeholder="e.g. omniconvert-pro (Must be unique)" />
                    </div>

                    <div style={{ display: 'flex', gap: '24px' }}>
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <label style={{ fontSize: '14px', fontWeight: 600, color: 'var(--primary)' }}>Platform</label>
                            <select name="platform" value={formData.platform} onChange={handleChange} style={inputStyle}>
                                <option value="Android">Android</option>
                                <option value="iOS">iOS</option>
                                <option value="Both">Both</option>
                            </select>
                        </div>
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <label style={{ fontSize: '14px', fontWeight: 600, color: 'var(--primary)' }}>Icon Image URL</label>
                            <input name="iconUrl" value={formData.iconUrl} onChange={handleChange} required style={inputStyle} placeholder="https://..." />
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label style={{ fontSize: '14px', fontWeight: 600, color: 'var(--primary)' }}>Short Description</label>
                        <textarea name="shortDescription" value={formData.shortDescription} onChange={handleChange} required style={{ ...inputStyle, minHeight: '80px', display: 'block' }} placeholder="Brief summary for the portfolio list." />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label style={{ fontSize: '14px', fontWeight: 600, color: 'var(--primary)' }}>Full Description</label>
                        <textarea name="fullDescription" value={formData.fullDescription} onChange={handleChange} required style={{ ...inputStyle, display: 'block', minHeight: '120px' }} placeholder="Detailed description for the app page." />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label style={{ fontSize: '14px', fontWeight: 600, color: 'var(--primary)' }}>Privacy Policy Text / URL</label>
                        <textarea name="privacyPolicy" value={formData.privacyPolicy} onChange={handleChange} required style={{ ...inputStyle, display: 'block', minHeight: '150px' }} placeholder="Paste the complete privacy policy text here." />
                    </div>

                    <div style={{ display: 'flex', gap: '24px' }}>
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <label style={{ fontSize: '14px', fontWeight: 600, color: 'var(--primary)' }}>Google Play URL (Optional)</label>
                            <input name="playStoreUrl" value={formData.playStoreUrl || ''} onChange={handleChange} style={inputStyle} placeholder="https://play.google.com/..." />
                        </div>
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <label style={{ fontSize: '14px', fontWeight: 600, color: 'var(--primary)' }}>App Store URL (Optional)</label>
                            <input name="appStoreUrl" value={formData.appStoreUrl || ''} onChange={handleChange} style={inputStyle} placeholder="https://apps.apple.com/..." />
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '16px', borderRadius: '12px', background: 'rgba(255,255,255,0.02)', border: '1px dashed var(--glass-border)' }}>
                        <label style={{ fontSize: '14px', fontWeight: 600, color: 'var(--primary)', marginBottom: '8px' }}>App Screenshots (URLs)</label>
                        {formData.screenshots.map((sc, i) => (
                            <input key={i} value={sc} onChange={(e) => handleScreenshotChange(i, e.target.value)} placeholder={`Screenshot URL #${i + 1}...`} style={{ ...inputStyle, marginBottom: '8px' }} />
                        ))}
                        <button type="button" onClick={() => setFormData(prev => ({ ...prev, screenshots: [...prev.screenshots, ''] }))} className="btn-secondary" style={{ alignSelf: 'flex-start', padding: '8px 16px', fontSize: '12px' }}>
                            + Add Screenshot Box
                        </button>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px', borderRadius: '12px', background: 'rgba(0, 255, 255, 0.05)', border: '1px solid rgba(0, 255, 255, 0.2)' }}>
                        <input type="checkbox" name="isFeatured" checked={formData.isFeatured} onChange={handleChange} id="featuredToggle" style={{ width: '20px', height: '20px', accentColor: 'var(--primary)' }} />
                        <label htmlFor="featuredToggle" style={{ fontSize: '16px', fontWeight: 600, cursor: 'pointer' }}>Feature this app on the Home Page</label>
                    </div>

                    <div style={{ display: 'flex', gap: '16px', marginTop: '24px' }}>
                        <button type="submit" className="btn-primary" disabled={saving}>
                            {saving ? 'Saving...' : '🔥 Save Project to Database'}
                        </button>
                        <button type="button" onClick={() => router.push('/admin')} className="btn-secondary">
                            Cancel & Return
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

const inputStyle = {
    padding: '14px',
    borderRadius: '12px',
    border: '1px solid var(--glass-border)',
    background: 'rgba(26, 30, 35, 0.8)',
    color: 'white',
    fontFamily: 'inherit',
    fontSize: '15px',
    width: '100%'
};

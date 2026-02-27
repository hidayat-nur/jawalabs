'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Project } from '../../core/entities/Project';

export default function AdminPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchProjects = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/data', { cache: 'no-store' });
            const data = await res.json();
            setProjects(data.projects || []);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const handleDelete = async (id: string, title: string) => {
        if (!window.confirm(`Are you sure you want to delete ${title}? This cannot be undone.`)) return;

        try {
            const res = await fetch(`/api/projects/${id}`, { method: 'DELETE' });
            if (res.ok) {
                fetchProjects();
            } else {
                alert('Failed to delete project');
            }
        } catch (error) {
            console.error(error);
            alert('Error connecting to the server');
        }
    };

    if (loading) return <div style={{ padding: '60px', textAlign: 'center' }}>Loading Admin Dashboard...</div>;

    return (
        <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
            <div className="glass-panel" style={{ padding: '40px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                    <h1 style={{ fontSize: '32px', fontWeight: 800 }}>Admin Dashboard</h1>
                    <Link href="/admin/new" className="btn-primary" style={{ padding: '10px 20px', fontSize: '14px' }}>
                        + Add New Project
                    </Link>
                </div>

                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead>
                            <tr style={{ borderBottom: '2px solid var(--glass-border)', color: 'rgba(255,255,255,0.7)' }}>
                                <th style={{ padding: '16px' }}>Icon</th>
                                <th style={{ padding: '16px' }}>Title</th>
                                <th style={{ padding: '16px' }}>Platform</th>
                                <th style={{ padding: '16px' }}>Featured</th>
                                <th style={{ padding: '16px', textAlign: 'right' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {projects.map((p) => (
                                <tr key={p.id} style={{ borderBottom: '1px solid var(--glass-border)', transition: 'background-color 0.2s' }}>
                                    <td style={{ padding: '16px' }}>
                                        <img src={p.iconUrl} alt={p.title} width="48" height="48" style={{ borderRadius: '12px', objectFit: 'cover' }} />
                                    </td>
                                    <td style={{ padding: '16px', fontWeight: 600 }}>{p.title}</td>
                                    <td style={{ padding: '16px' }}>
                                        <span style={{ fontSize: '12px', padding: '4px 8px', borderRadius: '8px', background: 'rgba(0, 255, 255, 0.1)', color: 'var(--primary)' }}>
                                            {p.platform}
                                        </span>
                                    </td>
                                    <td style={{ padding: '16px' }}>{p.isFeatured ? '🌟 Yes' : 'No'}</td>
                                    <td style={{ padding: '16px', textAlign: 'right' }}>
                                        <Link href={`/admin/${p.id}`} className="btn-secondary" style={{ padding: '8px 16px', fontSize: '13px', marginRight: '12px', border: '1px solid rgba(255,255,255,0.2)', color: 'white' }}>
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(p.id, p.title)}
                                            className="btn-secondary"
                                            style={{ padding: '8px 16px', fontSize: '13px', color: '#ff4444', border: '1px solid rgba(255, 68, 68, 0.3)' }}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}

                            {projects.length === 0 && (
                                <tr>
                                    <td colSpan={5} style={{ padding: '32px', textAlign: 'center', opacity: 0.5 }}>
                                        No projects found in the database.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

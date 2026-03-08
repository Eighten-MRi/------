import React from 'react';

type LayoutProps = {
    children: React.ReactNode;
    title?: string;
};

export const Layout: React.FC<LayoutProps> = ({ children, title }) => {
    return (
        <div className="layout fade-in" style={{ width: '100%', maxWidth: '800px', margin: '0 auto' }}>
            {title && (
                <header style={{ marginBottom: '2rem', textAlign: 'center' }}>
                    <h1 style={{ fontSize: '2.5rem', color: '#1eb8b8' }}>{title}</h1>
                </header>
            )}
            <main className="card">
                {children}
            </main>
            <footer style={{ marginTop: '2rem', textAlign: 'center', color: 'var(--color-text-subtle)', fontSize: '0.8rem' }}>
                <p>© 2026 Pad Pharmacy System</p>
            </footer>
        </div>
    );
};

'use client';

import Link from 'next/link';
import { AdminSidebar } from '@/components/admin/AdminSidebar';

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header
          className="sticky top-0 z-40 h-[56px] flex items-center justify-between px-4 md:px-8"
          style={{
            background: 'rgba(0,0,0,0.85)',
            backdropFilter: 'blur(12px)',
            borderBottom: '1px solid var(--color-hairline)',
          }}
        >
          <span className="text-[13px] font-medium pl-10 md:pl-0" style={{ color: 'var(--color-ink-muted)' }}>Admin Panel</span>
          <Link
            href="/"
            className="text-[12px] no-underline transition-colors duration-[120ms] hover:text-[var(--color-ink-muted)]"
            style={{ color: 'var(--color-ink-subtle)' }}
          >
            &larr; View Website
          </Link>
        </header>

        {/* Content */}
        <main className="flex-1 p-4 md:p-8 max-w-[1280px] mx-auto w-full">
          {children}
        </main>

        {/* Footer */}
        <footer className="py-6 px-8 text-center" style={{ borderTop: '1px solid var(--color-hairline)' }}>
          <span className="text-[11px]" style={{ color: 'var(--color-ink-subtle)' }}>&copy; 2026 Studio One Graphics</span>
        </footer>
      </div>
    </div>
  );
}

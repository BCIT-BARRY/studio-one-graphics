'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { mockAppointmentRequests } from '@/data/mock';
import { logout } from '@/app/actions/auth';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', href: '/admin', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0h4' },
  { id: 'appointment-requests', label: 'Appointment Requests', href: '/admin/appointment-requests', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2', badge: mockAppointmentRequests.filter((r) => r.status === 'New').length },
  { id: 'appointments', label: 'Appointments', href: '/admin/appointments', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
  { id: 'projects', label: 'Projects', href: '/admin/projects', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' },
  { id: 'gallery', label: 'Gallery Manager', href: '/admin/gallery', icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' },
  { id: 'settings', label: 'Settings', href: '/admin/settings', icon: 'M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4' },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === '/admin') return pathname === '/admin';
    return pathname.startsWith(href);
  };

  const handleLogout = () => {
    logout();
  };

  if (isMobile) {
    return (
      <>
        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(true)}
          className="fixed top-3 left-3 z-[60] bg-transparent border-none cursor-pointer p-2 rounded-[var(--radius-md)]"
          style={{ color: 'var(--color-ink)', background: 'var(--color-surface-2)' }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Backdrop */}
        {mobileOpen && (
          <div
            className="fixed inset-0 z-[60]"
            style={{ background: 'rgba(0,0,0,0.6)' }}
            onClick={() => setMobileOpen(false)}
          />
        )}

        {/* Slide-out drawer */}
        <aside
          className="fixed top-0 left-0 bottom-0 z-[70] flex flex-col transition-transform duration-200 ease-out"
          style={{
            width: 260,
            background: 'var(--color-surface-1)',
            borderRight: '1px solid var(--color-hairline)',
            transform: mobileOpen ? 'translateX(0)' : 'translateX(-100%)',
          }}
        >
          <div className="flex items-center justify-between min-h-[64px] px-5" style={{ borderBottom: '1px solid var(--color-hairline)' }}>
            <div className="flex flex-col gap-1">
              <Image src="/images/logo-full-white.png" alt="Studio One" width={120} height={20} className="h-5 w-auto" />
              <span className="text-[9px] tracking-[0.2px]" style={{ color: 'rgba(255,255,255,0.18)' }}>
                Powered by{' '}
                <a href="https://hellobarrybui.dev" target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255,255,255,0.18)' }}>
                  hellobarrybui.dev
                </a>
              </span>
            </div>
            <button
              onClick={() => setMobileOpen(false)}
              className="bg-transparent border-none cursor-pointer p-1"
              style={{ color: 'var(--color-ink-subtle)' }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <nav className="py-3 px-2 flex flex-col gap-0.5 flex-1">
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className="flex items-center gap-3 rounded-[var(--radius-md)] transition-all duration-[120ms] w-full no-underline"
                  style={{
                    padding: '10px 12px',
                    background: active ? 'var(--color-surface-3)' : 'transparent',
                    color: active ? 'var(--color-ink)' : 'var(--color-ink-muted)',
                    fontSize: '14px',
                    fontWeight: active ? 500 : 400,
                    whiteSpace: 'nowrap',
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                    <path d={item.icon} />
                  </svg>
                  <span className="flex-1">{item.label}</span>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span
                      className="text-[11px] font-semibold px-[7px] leading-[18px]"
                      style={{
                        background: 'var(--color-inverse-canvas)',
                        color: 'var(--color-inverse-ink)',
                        borderRadius: 'var(--radius-pill)',
                      }}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          <div style={{ padding: '16px 20px', borderTop: '1px solid var(--color-hairline)' }}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-semibold shrink-0"
                  style={{ background: 'var(--color-surface-3)', color: 'var(--color-ink)' }}
                >
                  BB
                </div>
                <div className="min-w-0">
                  <span className="block text-[13px] font-medium truncate" style={{ color: 'var(--color-ink)' }}>Barry Bui</span>
                  <span className="block text-[11px]" style={{ color: 'var(--color-ink-subtle)' }}>Owner</span>
                </div>
              </div>
              <button
                onClick={handleLogout}
                title="Logout"
                className="bg-transparent border-none cursor-pointer p-1 shrink-0"
                style={{ color: 'var(--color-ink-subtle)' }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
            </div>
          </div>
        </aside>
      </>
    );
  }

  return (
    <>
      <aside
        className="fixed top-0 left-0 bottom-0 z-50 flex flex-col shrink-0 transition-[width] duration-200 ease-out overflow-hidden"
        style={{
          width: collapsed ? 64 : 240,
          background: 'var(--color-surface-1)',
          borderRight: '1px solid var(--color-hairline)',
        }}
      >
        {/* Logo area */}
        <div
          className="flex items-center min-h-[64px]"
          style={{
            padding: collapsed ? '20px 0' : '20px 20px',
            justifyContent: collapsed ? 'center' : 'space-between',
            borderBottom: '1px solid var(--color-hairline)',
          }}
        >
          {!collapsed && (
            <div className="flex flex-col gap-1">
              <Image src="/images/logo-full-white.png" alt="Studio One" width={120} height={20} className="h-5 w-auto" />
              <span className="text-[9px] tracking-[0.2px]" style={{ color: 'rgba(255,255,255,0.18)' }}>
                Powered by{' '}
                <a href="https://hellobarrybui.dev" target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255,255,255,0.18)' }}>
                  hellobarrybui.dev
                </a>
              </span>
            </div>
          )}
          {collapsed && (
            <Image
              src="/images/icon-white.png"
              alt="S1"
              width={22}
              height={22}
              className="h-[22px] w-auto cursor-pointer"
              onClick={() => setCollapsed(false)}
            />
          )}
          {!collapsed && (
            <button
              onClick={() => setCollapsed(true)}
              className="bg-transparent border-none cursor-pointer p-1"
              style={{ color: 'var(--color-ink-subtle)' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
              </svg>
            </button>
          )}
        </div>

        {/* Nav */}
        <nav className="py-3 px-2 flex flex-col gap-0.5 flex-1">
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.id}
                href={item.href}
                className="flex items-center gap-3 rounded-[var(--radius-md)] transition-all duration-[120ms] w-full no-underline"
                style={{
                  padding: collapsed ? '10px 0' : '10px 12px',
                  justifyContent: collapsed ? 'center' : 'flex-start',
                  background: active ? 'var(--color-surface-3)' : 'transparent',
                  color: active ? 'var(--color-ink)' : 'var(--color-ink-muted)',
                  fontSize: '14px',
                  fontWeight: active ? 500 : 400,
                  whiteSpace: 'nowrap',
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                  <path d={item.icon} />
                </svg>
                {!collapsed && <span className="flex-1">{item.label}</span>}
                {!collapsed && item.badge !== undefined && item.badge > 0 && (
                  <span
                    className="text-[11px] font-semibold px-[7px] leading-[18px]"
                    style={{
                      background: 'var(--color-inverse-canvas)',
                      color: 'var(--color-inverse-ink)',
                      borderRadius: 'var(--radius-pill)',
                    }}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* User */}
        <div style={{ padding: collapsed ? '16px 8px' : '16px 20px', borderTop: '1px solid var(--color-hairline)' }}>
          {!collapsed ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-semibold shrink-0"
                  style={{ background: 'var(--color-surface-3)', color: 'var(--color-ink)' }}
                >
                  BB
                </div>
                <div className="min-w-0">
                  <span className="block text-[13px] font-medium truncate" style={{ color: 'var(--color-ink)' }}>Barry Bui</span>
                  <span className="block text-[11px]" style={{ color: 'var(--color-ink-subtle)' }}>Owner</span>
                </div>
              </div>
              <button
                onClick={handleLogout}
                title="Logout"
                className="bg-transparent border-none cursor-pointer p-1 shrink-0"
                style={{ color: 'var(--color-ink-subtle)' }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-semibold"
                style={{ background: 'var(--color-surface-3)', color: 'var(--color-ink)' }}
              >
                BB
              </div>
              <button
                onClick={handleLogout}
                title="Logout"
                className="bg-transparent border-none cursor-pointer p-1"
                style={{ color: 'var(--color-ink-subtle)' }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* Spacer to push content */}
      <div className="shrink-0 transition-[width] duration-200" style={{ width: collapsed ? 64 : 240 }} />
    </>
  );
}

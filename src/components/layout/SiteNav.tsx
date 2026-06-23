'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const links = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/#services' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-[100] h-[56px] flex items-center justify-between px-5 transition-all duration-300 ease-out"
        style={{
          background: scrolled ? 'rgba(0,0,0,0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled ? '1px solid var(--color-hairline)' : '1px solid transparent',
        }}
      >
        <Link href="/" className="flex items-center shrink-0">
          <Image
            src="/images/logo-full-white.png"
            alt="Studio One Graphics"
            width={140}
            height={20}
            className="h-5 w-auto"
            priority
          />
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex gap-7 items-center">
          {links.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className="text-[13px] font-medium uppercase tracking-[0.5px] transition-colors duration-[120ms]"
              style={{ color: 'var(--color-ink-subtle)' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-ink)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-ink-subtle)')}
            >
              {l.label}
            </Link>
          ))}
          <Link href="/book-appointment">
            <Button size="sm">Book Appointment</Button>
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden bg-transparent border-none cursor-pointer p-2"
          style={{ color: 'var(--color-ink)' }}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            {mobileOpen ? (
              <>
                <line x1="6" y1="6" x2="18" y2="18" />
                <line x1="6" y1="18" x2="18" y2="6" />
              </>
            ) : (
              <>
                <line x1="4" y1="7" x2="20" y2="7" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="17" x2="20" y2="17" />
              </>
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-[99] flex flex-col items-center justify-center gap-8 pt-16"
          style={{ background: 'rgba(0,0,0,0.95)', backdropFilter: 'blur(20px)' }}
          onClick={() => setMobileOpen(false)}
        >
          {links.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className="text-[28px] font-semibold tracking-[-0.5px]"
              style={{ color: 'var(--color-ink)' }}
              onClick={() => setMobileOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <Link href="/book-appointment" onClick={() => setMobileOpen(false)}>
            <Button size="lg">Book Appointment</Button>
          </Link>
        </div>
      )}
    </>
  );
}

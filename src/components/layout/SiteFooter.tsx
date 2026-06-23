import Link from 'next/link';
import Image from 'next/image';

export function SiteFooter() {
  const serviceLinks = ['Vinyl Wraps', 'Paint Protection Film', 'Ceramic Coatings', 'Decals & Graphics', 'Commercial Wraps'];
  const companyLinks = [
    { label: 'Gallery', href: '/gallery' },
    { label: 'Contact', href: '/contact' },
    { label: 'Admin', href: '/admin/login', hidden: true },
  ];

  return (
    <footer style={{ background: 'var(--color-canvas)', borderTop: '1px solid var(--color-hairline)', padding: '48px 20px 36px' }}>
      <div className="max-w-[var(--container-max)] mx-auto grid grid-cols-1 md:grid-cols-[1.2fr_1fr_1fr] gap-12 md:gap-12">
        {/* Brand */}
        <div className="max-w-[280px]">
          <Image src="/images/logo-full-white.png" alt="Studio One Graphics" width={140} height={22} className="h-[22px] w-auto mb-4" />
          <p className="text-[13px] leading-[1.6] m-0" style={{ color: 'var(--color-ink-subtle)' }}>
            Premium automotive wraps, protection, and graphics. By appointment only.
          </p>
          <div className="mt-4 flex flex-col gap-1.5 text-[13px]" style={{ color: 'var(--color-ink-muted)' }}>
            <span>Surrey, BC</span>
            <span>By Appointment Only</span>
          </div>
          <div className="mt-4 flex gap-3">
            <a
              href="https://instagram.com/studioonegraphics"
              target="_blank"
              rel="noopener noreferrer"
              title="Instagram"
              className="transition-colors duration-[120ms]"
              style={{ color: 'var(--color-ink-subtle)' }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="5" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
            </a>
          </div>
        </div>

        {/* Services */}
        <div className="flex flex-col gap-2.5">
          <span className="text-[11px] font-semibold tracking-[1.5px] uppercase" style={{ color: 'var(--color-ink)' }}>Services</span>
          {serviceLinks.map((s) => (
            <span key={s} className="text-[13px] cursor-default" style={{ color: 'var(--color-ink-muted)' }}>{s}</span>
          ))}
        </div>

        {/* Company */}
        <div className="flex flex-col gap-2.5">
          <span className="text-[11px] font-semibold tracking-[1.5px] uppercase" style={{ color: 'var(--color-ink)' }}>Company</span>
          {companyLinks.map((c) => (
            <Link
              key={c.label}
              href={c.href}
              className="text-[13px] transition-colors duration-[120ms]"
              style={{ color: c.hidden ? 'rgba(255,255,255,0.12)' : 'var(--color-ink-muted)' }}
            >
              {c.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-[var(--container-max)] mx-auto mt-6 pt-4 flex flex-wrap justify-between gap-3" style={{ borderTop: '1px solid var(--color-hairline)' }}>
        <span className="text-[12px]" style={{ color: 'var(--color-ink-subtle)' }}>
          &copy; 2026 Studio One Graphics. All rights reserved.
        </span>
        <span className="text-[12px]" style={{ color: 'var(--color-ink-subtle)' }}>
          Powered by{' '}
          <a
            href="https://hellobarrybui.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors duration-[120ms] hover:text-[var(--color-ink-muted)]"
            style={{ color: 'var(--color-ink-subtle)' }}
          >
            hellobarrybui.dev
          </a>
        </span>
      </div>
    </footer>
  );
}

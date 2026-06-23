import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { services } from '@/data/mock';

export default function HomePage() {
  const trust = [
    { title: 'By Appointment Only', desc: 'Each vehicle gets dedicated time, focused attention, and a cleaner customer experience.' },
    { title: 'Premium Materials', desc: 'We use only top-tier films and coatings from trusted professional-grade suppliers.' },
    { title: 'Clean Installs', desc: 'Precision and attention to detail on every edge, seam, and surface.' },
  ];

  return (
    <div>
      {/* Hero */}
      <section
        className="min-h-dvh flex flex-col justify-center max-w-[var(--container-max)] mx-auto"
        style={{ padding: '100px 32px 64px' }}
      >
        <span className="text-[11px] font-medium tracking-[1.2px] uppercase mb-4 inline-block" style={{ color: 'var(--color-ink-subtle)' }}>
          Surrey, BC &middot; By Appointment
        </span>
        <h1
          className="m-0 max-w-[800px]"
          style={{
            color: 'var(--color-ink)',
            fontSize: 'clamp(40px, 5.5vw, 72px)',
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: '-2.5px',
            textWrap: 'balance',
          }}
        >
          Premium wraps, protection, and graphics.
        </h1>
        <p className="mt-6 mb-0 max-w-[520px] text-[17px] leading-[1.65]" style={{ color: 'var(--color-ink-muted)' }}>
          Your vehicle deserves focused attention and a clean install. We work by appointment to make sure every project gets exactly that.
        </p>
        <div className="flex gap-3 mt-9 flex-wrap">
          <Link href="/book-appointment">
            <Button size="lg">Book Appointment</Button>
          </Link>
          <Link href="/gallery">
            <Button variant="ghost" size="lg">View Gallery</Button>
          </Link>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="max-w-[var(--container-max)] mx-auto" style={{ padding: '0 32px 96px' }}>
        <span className="text-[11px] font-semibold tracking-[1.5px] uppercase block" style={{ color: 'var(--color-ink-subtle)' }}>
          Our Services
        </span>
        <h2
          className="mt-3 mb-9"
          style={{ color: 'var(--color-ink)', fontSize: 'clamp(28px, 3vw, 36px)', fontWeight: 600, letterSpacing: '-0.8px' }}
        >
          Everything your vehicle needs
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.slice(0, 3).map((s) => (
            <ServiceCard key={s.id} eyebrow={s.eyebrow} title={s.title} desc={s.desc} image={s.image} />
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5">
          {services.slice(3).map((s) => (
            <ServiceCard key={s.id} eyebrow={s.eyebrow} title={s.title} desc={s.desc} image={s.image} />
          ))}
        </div>
      </section>

      {/* Trust */}
      <section className="max-w-[var(--container-max)] mx-auto" style={{ padding: '0 32px 96px' }}>
        <span className="text-[11px] font-semibold tracking-[1.5px] uppercase block" style={{ color: 'var(--color-ink-subtle)' }}>
          Why Studio One
        </span>
        <h2
          className="mt-3 mb-9"
          style={{ color: 'var(--color-ink)', fontSize: 'clamp(28px, 3vw, 36px)', fontWeight: 600, letterSpacing: '-0.8px' }}
        >
          The difference is in the details
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {trust.map((t) => (
            <div
              key={t.title}
              className="flex flex-col gap-2"
              style={{
                background: 'var(--color-surface-1)',
                border: '1px solid var(--color-hairline)',
                borderRadius: 'var(--radius-lg)',
                padding: 'var(--space-lg)',
              }}
            >
              <h3 className="m-0 text-[18px] font-semibold" style={{ color: 'var(--color-ink)' }}>{t.title}</h3>
              <p className="m-0 text-[14px] leading-[1.6]" style={{ color: 'var(--color-ink-muted)' }}>{t.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="max-w-[var(--container-max)] mx-auto" style={{ padding: '0 32px 96px' }}>
        <div
          className="text-center py-16 px-8"
          style={{
            background: 'var(--color-surface-1)',
            border: '1px solid var(--color-hairline)',
            borderRadius: 'var(--radius-xl)',
          }}
        >
          <span className="text-[11px] font-semibold tracking-[1.5px] uppercase block mb-3" style={{ color: 'var(--color-ink-subtle)' }}>
            Book Now
          </span>
          <h2 className="m-0 text-[28px] sm:text-[36px] font-semibold tracking-[-0.8px]" style={{ color: 'var(--color-ink)' }}>
            Ready to transform your vehicle?
          </h2>
          <p className="mt-3 mb-8 text-[15px] leading-[1.6] max-w-[480px] mx-auto" style={{ color: 'var(--color-ink-muted)' }}>
            Every project gets dedicated studio time and focused, detail-oriented work.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link href="/book-appointment">
              <Button>Book Appointment</Button>
            </Link>
            <Link href="/gallery">
              <Button variant="ghost">View Gallery</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function ServiceCard({ eyebrow, title, desc, image }: { eyebrow: string; title: string; desc: string; image: string }) {
  return (
    <div
      className="overflow-hidden transition-[border-color] duration-150 hover:border-[rgba(255,255,255,0.14)]"
      style={{
        background: 'var(--color-surface-1)',
        border: '1px solid var(--color-hairline)',
        borderRadius: 'var(--radius-lg)',
      }}
    >
      <div className="relative h-[200px] overflow-hidden" style={{ background: 'var(--color-surface-2)' }}>
        <Image src={image} alt={title} fill className="object-cover" />
      </div>
      <div className="p-5 flex flex-col gap-2">
        <span className="text-[11px] font-semibold tracking-[1.2px] uppercase" style={{ color: 'var(--color-ink-subtle)' }}>
          {eyebrow}
        </span>
        <h3 className="m-0 text-[18px] font-semibold" style={{ color: 'var(--color-ink)' }}>{title}</h3>
        <p className="m-0 text-[14px] leading-[1.6]" style={{ color: 'var(--color-ink-muted)' }}>{desc}</p>
      </div>
    </div>
  );
}

import Image from 'next/image';
import { mockGalleryItems } from '@/data/mock';

export const metadata = {
  title: 'Gallery — Studio One Graphics',
};

export default function GalleryPage() {
  const visibleItems = mockGalleryItems.filter((g) => g.visible);

  return (
    <div>
      <section className="max-w-[var(--container-max)] mx-auto" style={{ padding: '100px 32px 36px' }}>
        <span className="text-[11px] font-semibold tracking-[1.5px] uppercase block" style={{ color: 'var(--color-ink-subtle)' }}>
          Our Work
        </span>
        <h1
          className="mt-3 mb-3"
          style={{
            color: 'var(--color-ink)',
            fontSize: 'clamp(36px, 4.5vw, 52px)',
            fontWeight: 700,
            lineHeight: 1.08,
            letterSpacing: '-1.6px',
          }}
        >
          The gallery
        </h1>
        <p className="m-0 max-w-[520px] text-[17px] leading-[1.65]" style={{ color: 'var(--color-ink-muted)' }}>
          A selection of recent projects from Studio One Graphics.
        </p>
      </section>

      <section className="max-w-[var(--container-max)] mx-auto" style={{ padding: '24px 32px 96px' }}>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {visibleItems.map((p, i) => (
            <div
              key={p.id}
              className="overflow-hidden transition-[border-color] duration-150 hover:border-[rgba(255,255,255,0.14)]"
              style={{
                background: 'var(--color-surface-1)',
                border: '1px solid var(--color-hairline)',
                borderRadius: 'var(--radius-lg)',
              }}
            >
              <div
                className="relative overflow-hidden"
                style={{
                  aspectRatio: i === 0 || i === 5 ? '3/2' : '4/3',
                  background: 'var(--color-surface-2)',
                }}
              >
                <Image src={p.image} alt={p.title} fill className="object-cover" />
              </div>
              <div className="p-3 sm:p-4">
                <h3 className="m-0 text-[14px] sm:text-[15px] font-semibold" style={{ color: 'var(--color-ink)' }}>{p.title}</h3>
                <p className="m-0 mt-0.5 text-[12px] sm:text-[13px]" style={{ color: 'var(--color-ink-muted)' }}>{p.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

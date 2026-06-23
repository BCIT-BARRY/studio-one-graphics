import Image from 'next/image';
import { createClient } from '@/lib/supabase/server';

export const metadata = {
  title: 'Gallery',
};

export default async function GalleryPage() {
  const supabase = await createClient();
  const { data: items } = await supabase
    .from('gallery_items')
    .select('id, image_url, title, description, category')
    .order('display_order', { ascending: true });

  const visibleItems = items ?? [];

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
        {visibleItems.length === 0 ? (
          <div
            className="text-center py-20 px-8"
            style={{
              background: 'var(--color-surface-1)',
              border: '1px solid var(--color-hairline)',
              borderRadius: 'var(--radius-lg)',
            }}
          >
            <p className="m-0 text-[17px]" style={{ color: 'var(--color-ink-muted)' }}>
              Gallery coming soon. Check back for our latest work.
            </p>
          </div>
        ) : (
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
                  <Image src={p.image_url} alt={p.title} fill className="object-cover" />
                </div>
                <div className="p-3 sm:p-4">
                  <h3 className="m-0 text-[14px] sm:text-[15px] font-semibold" style={{ color: 'var(--color-ink)' }}>{p.title}</h3>
                  <p className="m-0 mt-0.5 text-[12px] sm:text-[13px]" style={{ color: 'var(--color-ink-muted)' }}>{p.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

'use client';

import { useState, useTransition } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { FilterTabs } from '@/components/ui/FilterTabs';
import { deleteGalleryItem } from '@/app/actions/admin';

interface GalleryItem {
  id: string;
  project_id: string | null;
  image_url: string;
  title: string;
  description: string | null;
  category: string;
  featured: boolean;
  display_order: number;
  created_at: string;
}

const categories = ['All', 'Vinyl Wraps', 'Paint Protection Film (PPF)', 'Ceramic Coatings', 'Decals & Graphics', 'Commercial Wraps'];

export function GalleryManager({ items }: { items: GalleryItem[] }) {
  const [filter, setFilter] = useState('All');
  const [isPending, startTransition] = useTransition();

  const filtered = items.filter((g) => filter === 'All' || g.category === filter);

  function handleDelete(id: string) {
    if (!confirm('Delete this gallery item?')) return;
    startTransition(async () => {
      await deleteGalleryItem(id);
    });
  }

  return (
    <div>
      <div className="flex justify-between items-start mb-6 flex-wrap gap-4">
        <div>
          <h1 className="m-0 text-[28px] font-bold tracking-[-0.8px]" style={{ color: 'var(--color-ink)' }}>Gallery Manager</h1>
          <p className="mt-1.5 text-[15px]" style={{ color: 'var(--color-ink-muted)' }}>Manage project photos for the public gallery</p>
        </div>
        <Button size="sm">+ Upload Photos</Button>
      </div>

      <div className="mb-5">
        <FilterTabs options={categories} value={filter} onChange={setFilter} />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Upload card */}
        <div
          className="flex flex-col items-center justify-center gap-2 cursor-pointer transition-[border-color] duration-150 hover:border-[rgba(255,255,255,0.25)]"
          style={{
            aspectRatio: '4/3',
            background: 'var(--color-surface-1)',
            border: '2px dashed var(--color-hairline-strong)',
            borderRadius: 'var(--radius-lg)',
          }}
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--color-ink-subtle)" strokeWidth="1.5" strokeLinecap="round">
            <path d="M12 4v16m8-8H4" />
          </svg>
          <span className="text-[14px] font-medium" style={{ color: 'var(--color-ink-muted)' }}>Upload photo</span>
          <span className="text-[12px]" style={{ color: 'var(--color-ink-subtle)' }}>Drag &amp; drop or click</span>
        </div>

        {filtered.length === 0 && items.length > 0 && (
          <div className="col-span-full py-12 text-center">
            <p className="text-[15px] m-0" style={{ color: 'var(--color-ink-muted)' }}>No gallery items match this filter.</p>
          </div>
        )}

        {filtered.length === 0 && items.length === 0 && (
          <div className="col-span-full py-12 text-center">
            <p className="text-[15px] m-0" style={{ color: 'var(--color-ink-muted)' }}>No gallery items yet. Upload your first photo above.</p>
          </div>
        )}

        {/* Gallery items */}
        {filtered.map((g) => (
          <div
            key={g.id}
            className="overflow-hidden transition-[border-color] duration-150 hover:border-[rgba(255,255,255,0.14)]"
            style={{
              background: 'var(--color-surface-1)',
              border: '1px solid var(--color-hairline)',
              borderRadius: 'var(--radius-lg)',
            }}
          >
            <div className="relative flex items-center justify-center" style={{ aspectRatio: '4/3', background: 'var(--color-surface-2)' }}>
              {g.image_url ? (
                <Image src={g.image_url} alt={g.title} fill className="object-cover" />
              ) : (
                <span className="text-[13px]" style={{ color: 'var(--color-ink-subtle)' }}>No image</span>
              )}
              {/* Badges */}
              <div className="absolute top-2.5 left-2.5 flex gap-1">
                {g.featured && (
                  <span
                    className="text-[10px] font-semibold px-2 py-0.5 uppercase tracking-[0.5px]"
                    style={{ borderRadius: 'var(--radius-sm)', background: 'rgba(255,255,255,0.9)', color: '#000' }}
                  >
                    Featured
                  </span>
                )}
              </div>
            </div>
            <div className="p-3.5 flex flex-col gap-1">
              <h4 className="m-0 text-[15px] font-semibold" style={{ color: 'var(--color-ink)' }}>{g.title}</h4>
              <span className="text-[12px]" style={{ color: 'var(--color-ink-muted)' }}>{g.category}</span>
              {g.description && (
                <span className="text-[12px]" style={{ color: 'var(--color-ink-subtle)' }}>{g.description}</span>
              )}
              <div className="flex gap-2 mt-2">
                <button
                  className="flex-1 py-1.5 text-[12px] font-medium cursor-pointer"
                  style={{
                    fontFamily: 'var(--font-sans)',
                    background: 'var(--color-surface-2)',
                    color: 'var(--color-ink-muted)',
                    border: '1px solid var(--color-hairline)',
                    borderRadius: 'var(--radius-sm)',
                  }}
                >
                  Edit
                </button>
                <button
                  disabled={isPending}
                  onClick={() => handleDelete(g.id)}
                  className="flex-1 py-1.5 text-[12px] font-medium cursor-pointer"
                  style={{
                    fontFamily: 'var(--font-sans)',
                    background: 'transparent',
                    color: 'var(--color-ink-subtle)',
                    border: '1px solid var(--color-hairline)',
                    borderRadius: 'var(--radius-sm)',
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

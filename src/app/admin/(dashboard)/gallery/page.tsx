'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { mockGalleryItems } from '@/data/mock';

const categories = ['All', 'Vinyl Wraps', 'Paint Protection Film (PPF)', 'Ceramic Coatings', 'Decals & Graphics', 'Commercial Wraps'];

export default function GalleryManagerPage() {
  const [filter, setFilter] = useState('All');

  const filtered = mockGalleryItems.filter((g) => filter === 'All' || g.category === filter);

  return (
    <div>
      <div className="flex justify-between items-start mb-6 flex-wrap gap-4">
        <div>
          <h1 className="m-0 text-[28px] font-bold tracking-[-0.8px]" style={{ color: 'var(--color-ink)' }}>Gallery Manager</h1>
          <p className="mt-1.5 text-[15px]" style={{ color: 'var(--color-ink-muted)' }}>Manage project photos for the public gallery</p>
        </div>
        <Button size="sm">+ Upload Photos</Button>
      </div>

      {/* Filters */}
      <div className="flex gap-1 mb-5 flex-wrap">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className="cursor-pointer transition-all duration-[120ms]"
            style={{
              padding: '6px 14px',
              fontSize: '12px',
              fontWeight: 500,
              fontFamily: 'var(--font-sans)',
              background: filter === c ? 'var(--color-surface-3)' : 'transparent',
              color: filter === c ? 'var(--color-ink)' : 'var(--color-ink-subtle)',
              border: `1px solid ${filter === c ? 'rgba(255,255,255,0.14)' : 'var(--color-hairline)'}`,
              borderRadius: 'var(--radius-sm)',
            }}
          >
            {c}
          </button>
        ))}
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
              <Image src={g.image} alt={g.title} fill className="object-cover" />
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
                <span
                  className="text-[10px] font-semibold px-2 py-0.5 uppercase tracking-[0.5px]"
                  style={{
                    borderRadius: 'var(--radius-sm)',
                    background: g.visible ? 'rgba(34,197,94,0.2)' : 'rgba(107,114,128,0.3)',
                    color: g.visible ? '#22c55e' : '#9ca3af',
                  }}
                >
                  {g.visible ? 'Public' : 'Hidden'}
                </span>
              </div>
            </div>
            <div className="p-3.5 flex flex-col gap-1">
              <h4 className="m-0 text-[15px] font-semibold" style={{ color: 'var(--color-ink)' }}>{g.title}</h4>
              <span className="text-[12px]" style={{ color: 'var(--color-ink-muted)' }}>{g.category}</span>
              <span className="text-[12px]" style={{ color: 'var(--color-ink-subtle)' }}>{g.caption}</span>
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
                  className="flex-1 py-1.5 text-[12px] font-medium cursor-pointer"
                  style={{
                    fontFamily: 'var(--font-sans)',
                    background: 'transparent',
                    color: 'var(--color-ink-subtle)',
                    border: '1px solid var(--color-hairline)',
                    borderRadius: 'var(--radius-sm)',
                  }}
                >
                  {g.visible ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

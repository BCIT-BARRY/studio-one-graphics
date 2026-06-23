'use client';

import { useState } from 'react';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Button } from '@/components/ui/Button';
import { mockProjects } from '@/data/mock';
import type { ProjectStatus } from '@/types';

const statuses: ('All' | ProjectStatus)[] = ['All', 'Scheduled', 'In Progress', 'Waiting on Material', 'Ready for Pickup', 'Completed', 'Cancelled'];

export default function ProjectsPage() {
  const [filter, setFilter] = useState<string>('All');

  const filtered = mockProjects.filter((p) => filter === 'All' || p.status === filter);

  return (
    <div>
      <div className="flex justify-between items-start mb-6 flex-wrap gap-4">
        <div>
          <h1 className="m-0 text-[28px] font-bold tracking-[-0.8px]" style={{ color: 'var(--color-ink)' }}>Projects</h1>
          <p className="mt-1.5 text-[15px]" style={{ color: 'var(--color-ink-muted)' }}>Track vehicle jobs from start to completion</p>
        </div>
        <Button size="sm">+ New Project</Button>
      </div>

      {/* Filters */}
      <div className="flex gap-1 mb-5 flex-wrap">
        {statuses.map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className="cursor-pointer transition-all duration-[120ms]"
            style={{
              padding: '6px 14px',
              fontSize: '12px',
              fontWeight: 500,
              fontFamily: 'var(--font-sans)',
              background: filter === s ? 'var(--color-surface-3)' : 'transparent',
              color: filter === s ? 'var(--color-ink)' : 'var(--color-ink-subtle)',
              border: `1px solid ${filter === s ? 'rgba(255,255,255,0.14)' : 'var(--color-hairline)'}`,
              borderRadius: 'var(--radius-sm)',
            }}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Cards */}
      {filtered.length === 0 ? (
        <div
          className="py-16 px-8 text-center"
          style={{
            background: 'var(--color-surface-1)',
            border: '1px solid var(--color-hairline)',
            borderRadius: 'var(--radius-lg)',
          }}
        >
          <p className="text-[16px] m-0 mb-1" style={{ color: 'var(--color-ink-muted)' }}>No projects match this filter.</p>
          <p className="text-[14px] m-0" style={{ color: 'var(--color-ink-subtle)' }}>Create a project from an appointment request or add one manually.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((p) => (
            <div
              key={p.id}
              className="overflow-hidden transition-[border-color] duration-150 hover:border-[rgba(255,255,255,0.14)]"
              style={{
                background: 'var(--color-surface-1)',
                border: '1px solid var(--color-hairline)',
                borderRadius: 'var(--radius-lg)',
              }}
            >
              {/* Before/after placeholders */}
              <div className="grid grid-cols-2 h-[120px]">
                <div
                  className="flex items-center justify-center"
                  style={{ background: 'var(--color-surface-2)', borderRight: '1px solid var(--color-hairline)' }}
                >
                  <span className="text-[11px] italic" style={{ color: 'var(--color-ink-subtle)' }}>Before photo</span>
                </div>
                <div className="flex items-center justify-center" style={{ background: 'var(--color-surface-2)' }}>
                  <span className="text-[11px] italic" style={{ color: 'var(--color-ink-subtle)' }}>After photo</span>
                </div>
              </div>

              <div className="p-5 flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <span className="text-[11px] font-semibold uppercase tracking-[1px]" style={{ color: 'var(--color-ink-subtle)' }}>{p.service}</span>
                  <StatusBadge status={p.status} />
                </div>
                <h3 className="m-0 text-[18px] font-semibold" style={{ color: 'var(--color-ink)' }}>{p.vehicle}</h3>
                <span className="text-[14px]" style={{ color: 'var(--color-ink-muted)' }}>{p.customer}</span>
                <div className="flex gap-4 text-[12px] mt-1" style={{ color: 'var(--color-ink-subtle)' }}>
                  <span>Start: {new Date(p.startDate + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                  <span>Target: {new Date(p.targetDate + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                </div>
                {p.notes && (
                  <p className="mt-1 text-[13px] leading-[1.4]" style={{ color: 'var(--color-ink-subtle)' }}>{p.notes}</p>
                )}
                <div className="flex gap-2 mt-2 items-center">
                  <Button size="sm" variant="secondary">Update Status</Button>
                  {p.galleryReady && (
                    <span className="text-[11px] flex items-center gap-1" style={{ color: 'var(--color-ink-subtle)' }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Gallery ready
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

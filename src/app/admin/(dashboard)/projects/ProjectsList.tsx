'use client';

import { useState, useTransition } from 'react';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Button } from '@/components/ui/Button';
import { FilterTabs } from '@/components/ui/FilterTabs';
import { updateProjectStatus } from '@/app/actions/admin';

interface Project {
  id: string;
  client_name: string;
  vehicle: string;
  service: string;
  status: string;
  progress: number;
  start_date: string;
  estimated_completion: string;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

const statuses = ['All', 'Design', 'In Progress', 'Wrapping', 'Quality Check', 'Complete'];

export function ProjectsList({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<string>('All');
  const [isPending, startTransition] = useTransition();

  const filtered = projects.filter((p) => filter === 'All' || p.status === filter);

  function handleStatusUpdate(id: string, status: string, progress: number) {
    startTransition(async () => {
      await updateProjectStatus(id, status, progress);
    });
  }

  return (
    <div>
      <div className="flex justify-between items-start mb-6 flex-wrap gap-4">
        <div>
          <h1 className="m-0 text-[28px] font-bold tracking-[-0.8px]" style={{ color: 'var(--color-ink)' }}>Projects</h1>
          <p className="mt-1.5 text-[15px]" style={{ color: 'var(--color-ink-muted)' }}>Track vehicle jobs from start to completion</p>
        </div>
        <Button size="sm">+ New Project</Button>
      </div>

      <div className="mb-5">
        <FilterTabs options={statuses} value={filter} onChange={setFilter} />
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
          <p className="text-[16px] m-0 mb-1" style={{ color: 'var(--color-ink-muted)' }}>
            {projects.length === 0 ? 'No projects yet.' : 'No projects match this filter.'}
          </p>
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
              {/* Progress bar */}
              <div className="h-1" style={{ background: 'var(--color-surface-2)' }}>
                <div
                  className="h-full transition-all duration-300"
                  style={{
                    width: `${p.progress}%`,
                    background: p.progress === 100 ? '#22c55e' : 'var(--color-ink-subtle)',
                  }}
                />
              </div>

              <div className="p-5 flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <span className="text-[11px] font-semibold uppercase tracking-[1px]" style={{ color: 'var(--color-ink-subtle)' }}>{p.service}</span>
                  <StatusBadge status={p.status} />
                </div>
                <h3 className="m-0 text-[18px] font-semibold" style={{ color: 'var(--color-ink)' }}>{p.vehicle}</h3>
                <span className="text-[14px]" style={{ color: 'var(--color-ink-muted)' }}>{p.client_name}</span>
                <div className="flex gap-4 text-[12px] mt-1" style={{ color: 'var(--color-ink-subtle)' }}>
                  <span>Start: {new Date(p.start_date + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                  <span>Target: {new Date(p.estimated_completion + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                  <span>{p.progress}% complete</span>
                </div>
                {p.notes && (
                  <p className="mt-1 text-[13px] leading-[1.4]" style={{ color: 'var(--color-ink-subtle)' }}>{p.notes}</p>
                )}
                <div className="flex gap-2 mt-2 items-center">
                  <Button
                    size="sm"
                    variant="secondary"
                    disabled={isPending}
                    onClick={() => {
                      // Cycle through statuses
                      const cycle: Record<string, { status: string; progress: number }> = {
                        'Design': { status: 'In Progress', progress: 25 },
                        'In Progress': { status: 'Wrapping', progress: 50 },
                        'Wrapping': { status: 'Quality Check', progress: 85 },
                        'Quality Check': { status: 'Complete', progress: 100 },
                      };
                      const next = cycle[p.status];
                      if (next) {
                        handleStatusUpdate(p.id, next.status, next.progress);
                      }
                    }}
                  >
                    {p.status === 'Complete' ? 'Completed' : 'Advance Status'}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

'use client';

import { useState } from 'react';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Button } from '@/components/ui/Button';
import { FilterTabs } from '@/components/ui/FilterTabs';

interface Appointment {
  id: string;
  request_id: string | null;
  title: string;
  date: string;
  time: string;
  type: string;
  status: string;
  notes: string | null;
  created_at: string;
}

const statuses = ['All', 'Scheduled', 'In Progress', 'Completed', 'Cancelled'];

export function AppointmentsList({ appointments }: { appointments: Appointment[] }) {
  const [filter, setFilter] = useState<string>('All');

  const filtered = appointments.filter((a) => filter === 'All' || a.status === filter);

  return (
    <div>
      <div className="flex justify-between items-start mb-6 flex-wrap gap-4">
        <div>
          <h1 className="m-0 text-[28px] font-bold tracking-[-0.8px]" style={{ color: 'var(--color-ink)' }}>Appointments</h1>
          <p className="mt-1.5 text-[15px]" style={{ color: 'var(--color-ink-muted)' }}>Manage customer appointments and scheduling</p>
        </div>
        <Button size="sm">+ New Appointment</Button>
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
            {appointments.length === 0 ? 'No appointments yet.' : 'No appointments match this filter'}
          </p>
          <p className="text-[14px] m-0" style={{ color: 'var(--color-ink-subtle)' }}>Create one manually or schedule from an appointment request.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((a) => (
            <div
              key={a.id}
              className="flex gap-4 transition-[border-color] duration-150 hover:border-[rgba(255,255,255,0.14)]"
              style={{
                background: 'var(--color-surface-1)',
                border: '1px solid var(--color-hairline)',
                borderRadius: 'var(--radius-lg)',
                padding: '20px',
              }}
            >
              {/* Date block */}
              <div
                className="w-[56px] h-[56px] shrink-0 flex flex-col items-center justify-center"
                style={{ borderRadius: 'var(--radius-md)', background: 'var(--color-surface-2)' }}
              >
                <span className="text-[11px] font-medium uppercase" style={{ color: 'var(--color-ink-subtle)' }}>
                  {new Date(a.date + 'T12:00:00').toLocaleDateString('en-US', { month: 'short' })}
                </span>
                <span className="text-[22px] font-bold leading-none" style={{ color: 'var(--color-ink)' }}>
                  {new Date(a.date + 'T12:00:00').getDate()}
                </span>
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[15px] font-semibold" style={{ color: 'var(--color-ink)' }}>{a.title}</span>
                  <StatusBadge status={a.status} />
                </div>
                <div className="flex gap-2 items-center mb-1">
                  <span
                    className="text-[13px]"
                    style={{
                      color: 'var(--color-ink-muted)',
                      background: 'var(--color-surface-2)',
                      padding: '2px 8px',
                      borderRadius: 'var(--radius-sm)',
                    }}
                  >
                    {a.type}
                  </span>
                  <span className="text-[13px]" style={{ color: 'var(--color-ink-muted)' }}>{a.time}</span>
                </div>
                {a.request_id && (
                  <span className="text-[13px]" style={{ color: 'var(--color-ink-subtle)' }}>Request: {a.request_id}</span>
                )}
                {a.notes && (
                  <p className="mt-1.5 text-[12px] leading-[1.4]" style={{ color: 'var(--color-ink-subtle)' }}>{a.notes}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

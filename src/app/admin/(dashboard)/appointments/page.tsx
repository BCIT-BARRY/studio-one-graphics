'use client';

import { useState } from 'react';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Button } from '@/components/ui/Button';
import { mockAppointments } from '@/data/mock';
import type { AppointmentStatus } from '@/types';

const statuses: ('All' | AppointmentStatus)[] = ['All', 'Requested', 'Confirmed', 'Completed', 'Cancelled', 'No-Show'];

export default function AppointmentsPage() {
  const [filter, setFilter] = useState<string>('All');

  const filtered = mockAppointments.filter((a) => filter === 'All' || a.status === filter);

  return (
    <div>
      <div className="flex justify-between items-start mb-6 flex-wrap gap-4">
        <div>
          <h1 className="m-0 text-[28px] font-bold tracking-[-0.8px]" style={{ color: 'var(--color-ink)' }}>Appointments</h1>
          <p className="mt-1.5 text-[15px]" style={{ color: 'var(--color-ink-muted)' }}>Manage customer appointments and scheduling</p>
        </div>
        <Button size="sm">+ New Appointment</Button>
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
          <p className="text-[16px] m-0 mb-1" style={{ color: 'var(--color-ink-muted)' }}>No appointments match this filter</p>
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
                  <span className="text-[15px] font-semibold" style={{ color: 'var(--color-ink)' }}>{a.customer}</span>
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
                <span className="text-[13px]" style={{ color: 'var(--color-ink-subtle)' }}>{a.vehicle}</span>
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

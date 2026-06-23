'use client';

import { useState, useTransition } from 'react';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Button } from '@/components/ui/Button';
import { updateRequestStatus } from '@/app/actions/appointments';
import type { AppointmentRequestStatus } from '@/types';

interface Request {
  id: string;
  name: string;
  phone: string;
  email: string;
  vehicle: string;
  service: string;
  preferred_date: string;
  preferred_time: string;
  notes: string;
  status: string;
  created_at: string;
}

const statuses: ('All' | AppointmentRequestStatus)[] = ['All', 'New', 'Contacted', 'Awaiting Confirmation', 'Confirmed', 'Archived'];

export function AppointmentRequestsList({ requests }: { requests: Request[] }) {
  const [filter, setFilter] = useState<string>('All');
  const [search, setSearch] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const filtered = requests.filter((r) => {
    if (filter !== 'All' && r.status !== filter) return false;
    if (search && !r.name.toLowerCase().includes(search.toLowerCase()) && !r.vehicle.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const detail = selectedId ? requests.find((r) => r.id === selectedId) : null;

  function handleStatusUpdate(id: string, status: string) {
    startTransition(async () => {
      await updateRequestStatus(id, status);
    });
  }

  return (
    <div>
      <div className="flex justify-between items-start mb-6 flex-wrap gap-4">
        <div>
          <h1 className="m-0 text-[28px] font-bold tracking-[-0.8px]" style={{ color: 'var(--color-ink)' }}>Appointment Requests</h1>
          <p className="mt-1.5 text-[15px]" style={{ color: 'var(--color-ink-muted)' }}>Manage customer appointment requests</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-3 mb-5 flex-wrap items-center">
        <div className="relative" style={{ flex: '0 1 280px' }}>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or vehicle..."
            className="w-full outline-none"
            style={{
              background: 'var(--color-surface-1)',
              color: 'var(--color-ink)',
              fontSize: '14px',
              padding: '9px 14px 9px 36px',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--color-hairline-strong)',
            }}
          />
          <svg
            width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-ink-subtle)" strokeWidth="1.5"
            className="absolute left-3 top-1/2 -translate-y-1/2"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
        </div>
        <div className="flex gap-1 flex-wrap">
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
      </div>

      <div className="flex gap-6">
        {/* Table */}
        <div
          className="flex-1 overflow-hidden"
          style={{
            background: 'var(--color-surface-1)',
            border: '1px solid var(--color-hairline)',
            borderRadius: 'var(--radius-lg)',
          }}
        >
          {/* Header */}
          <div
            className="hidden md:grid gap-4 text-[11px] font-semibold uppercase tracking-[1px]"
            style={{
              gridTemplateColumns: '1fr 1.2fr 0.8fr 0.8fr 0.6fr',
              padding: '12px 20px',
              borderBottom: '1px solid var(--color-hairline)',
              color: 'var(--color-ink-subtle)',
            }}
          >
            <span>Customer</span><span>Vehicle</span><span>Service</span><span>Status</span><span>Date</span>
          </div>

          {filtered.length === 0 ? (
            <div className="py-12 px-5 text-center">
              <p className="text-[15px] m-0" style={{ color: 'var(--color-ink-muted)' }}>
                {requests.length === 0
                  ? 'No appointment requests yet. They\'ll appear here when customers book.'
                  : 'No appointment requests match your filters.'}
              </p>
            </div>
          ) : (
            filtered.map((r) => (
              <div
                key={r.id}
                onClick={() => setSelectedId(r.id)}
                className="grid gap-4 cursor-pointer transition-colors duration-100"
                style={{
                  gridTemplateColumns: '1fr 1.2fr 0.8fr 0.8fr 0.6fr',
                  padding: '14px 20px',
                  borderBottom: '1px solid var(--color-hairline)',
                  background: selectedId === r.id ? 'var(--color-surface-2)' : 'transparent',
                }}
              >
                <div>
                  <span className="text-[14px] font-medium block" style={{ color: 'var(--color-ink)' }}>{r.name}</span>
                  <span className="text-[12px]" style={{ color: 'var(--color-ink-subtle)' }}>{r.email}</span>
                </div>
                <span className="text-[14px] self-center" style={{ color: 'var(--color-ink-muted)' }}>{r.vehicle}</span>
                <span className="text-[13px] self-center" style={{ color: 'var(--color-ink-muted)' }}>{r.service}</span>
                <span className="self-center"><StatusBadge status={r.status} /></span>
                <span className="text-[13px] self-center" style={{ color: 'var(--color-ink-subtle)' }}>
                  {new Date(r.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </span>
              </div>
            ))
          )}
        </div>

        {/* Detail panel */}
        {detail && (
          <div
            className="w-[340px] shrink-0 self-start sticky top-[100px] hidden lg:flex flex-col gap-5"
            style={{
              background: 'var(--color-surface-1)',
              border: '1px solid var(--color-hairline)',
              borderRadius: 'var(--radius-lg)',
              padding: '24px',
            }}
          >
            <div className="flex justify-between items-center">
              <span className="text-[12px] font-semibold" style={{ color: 'var(--color-ink-subtle)' }}>
                {new Date(detail.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </span>
              <button
                onClick={() => setSelectedId(null)}
                className="bg-transparent border-none cursor-pointer text-[18px] leading-none"
                style={{ color: 'var(--color-ink-subtle)' }}
              >
                &times;
              </button>
            </div>
            <div>
              <h3 className="m-0 mb-1 text-[20px] font-semibold" style={{ color: 'var(--color-ink)' }}>{detail.name}</h3>
              <StatusBadge status={detail.status} />
            </div>
            {([
              ['Vehicle', detail.vehicle],
              ['Service', detail.service],
              ['Phone', detail.phone || '—'],
              ['Email', detail.email],
              ['Preferred Date', new Date(detail.preferred_date + 'T12:00:00').toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })],
              ['Preferred Time', detail.preferred_time],
            ] as const).map(([label, val]) => (
              <div key={label}>
                <span className="text-[11px] font-semibold uppercase tracking-[1px] block mb-0.5" style={{ color: 'var(--color-ink-subtle)' }}>{label}</span>
                <span className="text-[14px]" style={{ color: 'var(--color-ink)' }}>{val}</span>
              </div>
            ))}
            {detail.notes && (
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-[1px] block mb-0.5" style={{ color: 'var(--color-ink-subtle)' }}>Notes</span>
                <p className="m-0 text-[14px] leading-[1.5]" style={{ color: 'var(--color-ink-muted)' }}>{detail.notes}</p>
              </div>
            )}
            <div className="flex flex-col gap-2 mt-1">
              <span className="text-[11px] font-semibold uppercase tracking-[1px] block" style={{ color: 'var(--color-ink-subtle)' }}>Update Status</span>
              <div className="flex flex-wrap gap-1.5">
                {(['New', 'Contacted', 'Awaiting Confirmation', 'Confirmed', 'Archived'] as const).map((s) => (
                  <button
                    key={s}
                    disabled={isPending || detail.status === s}
                    onClick={() => handleStatusUpdate(detail.id, s)}
                    className="cursor-pointer transition-all duration-[120ms]"
                    style={{
                      padding: '5px 12px',
                      fontSize: '11px',
                      fontWeight: 500,
                      fontFamily: 'var(--font-sans)',
                      background: detail.status === s ? 'var(--color-surface-3)' : 'transparent',
                      color: detail.status === s ? 'var(--color-ink)' : 'var(--color-ink-subtle)',
                      border: `1px solid ${detail.status === s ? 'rgba(255,255,255,0.14)' : 'var(--color-hairline)'}`,
                      borderRadius: 'var(--radius-sm)',
                      opacity: detail.status === s ? 0.5 : 1,
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

'use client';

import { useState, useTransition } from 'react';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Button } from '@/components/ui/Button';
import { updateRequestStatus } from '@/app/actions/appointments';
import { sendDepositLink } from '@/app/actions/stripe';
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
  estimate_cents: number | null;
  deposit_cents: number | null;
  stripe_payment_link_url: string | null;
  payment_status: string;
}

const statuses: ('All' | AppointmentRequestStatus)[] = ['All', 'New', 'Contacted', 'Awaiting Confirmation', 'Confirmed', 'Archived'];

export function AppointmentRequestsList({ requests }: { requests: Request[] }) {
  const [filter, setFilter] = useState<string>('All');
  const [search, setSearch] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [estimate, setEstimate] = useState('');
  const [depositResult, setDepositResult] = useState<{ url?: string; amount?: string; error?: string } | null>(null);
  const [sendingDeposit, setSendingDeposit] = useState(false);

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

  async function handleSendDeposit() {
    if (!detail || !estimate) return;
    setSendingDeposit(true);
    setDepositResult(null);
    const result = await sendDepositLink(detail.id, parseFloat(estimate));
    if (result.error) {
      setDepositResult({ error: result.error });
    } else {
      setDepositResult({ url: result.url, amount: result.depositAmount });
    }
    setSendingDeposit(false);
  }

  function formatCents(cents: number) {
    return `$${(cents / 100).toFixed(2)}`;
  }

  const paymentBadge = (status: string) => {
    const styles: Record<string, { bg: string; color: string; label: string }> = {
      none: { bg: 'transparent', color: 'var(--color-ink-subtle)', label: 'No deposit' },
      pending: { bg: 'rgba(234,179,8,0.15)', color: '#eab308', label: 'Deposit pending' },
      paid: { bg: 'rgba(34,197,94,0.15)', color: '#22c55e', label: 'Deposit paid' },
      refunded: { bg: 'rgba(239,68,68,0.12)', color: '#ef4444', label: 'Refunded' },
    };
    const s = styles[status] || styles.none;
    return (
      <span className="text-[11px] font-medium px-2 py-0.5" style={{ background: s.bg, color: s.color, borderRadius: 'var(--radius-sm)' }}>
        {s.label}
      </span>
    );
  };

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
              gridTemplateColumns: '1fr 1.2fr 0.8fr 0.7fr 0.6fr 0.6fr',
              padding: '12px 20px',
              borderBottom: '1px solid var(--color-hairline)',
              color: 'var(--color-ink-subtle)',
            }}
          >
            <span>Customer</span><span>Vehicle</span><span>Service</span><span>Status</span><span>Deposit</span><span>Date</span>
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
                onClick={() => { setSelectedId(r.id); setEstimate(r.estimate_cents ? (r.estimate_cents / 100).toString() : ''); setDepositResult(null); }}
                className="grid gap-4 cursor-pointer transition-colors duration-100"
                style={{
                  gridTemplateColumns: '1fr 1.2fr 0.8fr 0.7fr 0.6fr 0.6fr',
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
                <span className="self-center">{paymentBadge(r.payment_status)}</span>
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
            className="w-[360px] shrink-0 self-start sticky top-[100px] hidden lg:flex flex-col gap-5"
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
              <div className="flex gap-2 items-center">
                <StatusBadge status={detail.status} />
                {paymentBadge(detail.payment_status)}
              </div>
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

            {/* Deposit section */}
            <div style={{ borderTop: '1px solid var(--color-hairline)', paddingTop: '16px' }}>
              <span className="text-[11px] font-semibold uppercase tracking-[1px] block mb-3" style={{ color: 'var(--color-ink-subtle)' }}>Deposit</span>

              {detail.payment_status === 'paid' && detail.deposit_cents && (
                <div className="flex flex-col gap-1">
                  <span className="text-[14px] font-medium" style={{ color: '#22c55e' }}>Deposit paid: {formatCents(detail.deposit_cents)}</span>
                  {detail.estimate_cents && (
                    <span className="text-[13px]" style={{ color: 'var(--color-ink-muted)' }}>Job estimate: {formatCents(detail.estimate_cents)}</span>
                  )}
                </div>
              )}

              {detail.payment_status === 'pending' && detail.stripe_payment_link_url && (
                <div className="flex flex-col gap-2">
                  <span className="text-[13px]" style={{ color: '#eab308' }}>Deposit link sent — awaiting payment</span>
                  {detail.deposit_cents && (
                    <span className="text-[13px]" style={{ color: 'var(--color-ink-muted)' }}>Amount: {formatCents(detail.deposit_cents)}</span>
                  )}
                  <a
                    href={detail.stripe_payment_link_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[13px] underline"
                    style={{ color: 'var(--color-ink-muted)' }}
                  >
                    View payment link
                  </a>
                  <button
                    onClick={() => navigator.clipboard.writeText(detail.stripe_payment_link_url!)}
                    className="cursor-pointer text-[12px] py-1.5"
                    style={{
                      fontFamily: 'var(--font-sans)',
                      background: 'var(--color-surface-2)',
                      color: 'var(--color-ink-muted)',
                      border: '1px solid var(--color-hairline)',
                      borderRadius: 'var(--radius-sm)',
                    }}
                  >
                    Copy link to clipboard
                  </button>
                </div>
              )}

              {detail.payment_status === 'none' && (
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[13px] font-medium" style={{ color: 'var(--color-ink-muted)' }}>Job estimate (CAD)</label>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[14px]" style={{ color: 'var(--color-ink-subtle)' }}>$</span>
                        <input
                          type="number"
                          min="1"
                          step="0.01"
                          value={estimate}
                          onChange={(e) => setEstimate(e.target.value)}
                          placeholder="0.00"
                          className="w-full outline-none"
                          style={{
                            background: 'var(--color-surface-2)',
                            color: 'var(--color-ink)',
                            fontSize: '14px',
                            padding: '8px 12px 8px 24px',
                            borderRadius: 'var(--radius-sm)',
                            border: '1px solid var(--color-hairline-strong)',
                          }}
                        />
                      </div>
                    </div>
                    {estimate && parseFloat(estimate) > 0 && (
                      <span className="text-[12px]" style={{ color: 'var(--color-ink-subtle)' }}>
                        25% deposit: ${(parseFloat(estimate) * 0.25).toFixed(2)} CAD
                      </span>
                    )}
                  </div>

                  {depositResult?.error && (
                    <div className="text-[13px] py-2 px-3 rounded-[var(--radius-sm)]" style={{ background: 'rgba(239,68,68,0.12)', color: '#ef4444' }}>
                      {depositResult.error}
                    </div>
                  )}

                  {depositResult?.url && (
                    <div className="flex flex-col gap-2">
                      <div className="text-[13px] py-2 px-3 rounded-[var(--radius-sm)]" style={{ background: 'rgba(34,197,94,0.12)', color: '#22c55e' }}>
                        Deposit link created: ${depositResult.amount}
                      </div>
                      <button
                        onClick={() => navigator.clipboard.writeText(depositResult.url!)}
                        className="cursor-pointer text-[12px] py-1.5"
                        style={{
                          fontFamily: 'var(--font-sans)',
                          background: 'var(--color-surface-2)',
                          color: 'var(--color-ink-muted)',
                          border: '1px solid var(--color-hairline)',
                          borderRadius: 'var(--radius-sm)',
                        }}
                      >
                        Copy link to clipboard
                      </button>
                    </div>
                  )}

                  <Button size="sm" onClick={handleSendDeposit} disabled={sendingDeposit || !estimate || parseFloat(estimate) <= 0}>
                    {sendingDeposit ? 'Creating...' : 'Generate Deposit Link'}
                  </Button>
                </div>
              )}
            </div>

            {/* Status update */}
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

'use client';

import Link from 'next/link';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { mockAppointmentRequests, mockAppointments, mockProjects } from '@/data/mock';

export default function AdminDashboardPage() {
  const newRequests = mockAppointmentRequests.filter((r) => r.status === 'New').length;
  const upcomingAppts = mockAppointments.filter((a) => a.status === 'Confirmed' || a.status === 'Requested').length;
  const activeProjects = mockProjects.filter((p) => p.status === 'In Progress' || p.status === 'Waiting on Material').length;
  const completedMonth = mockProjects.filter((p) => p.status === 'Completed').length;

  const stats = [
    { label: 'New Requests', value: newRequests, href: '/admin/appointment-requests' },
    { label: 'Upcoming Appointments', value: upcomingAppts, href: '/admin/appointments' },
    { label: 'Active Projects', value: activeProjects, href: '/admin/projects' },
    { label: 'Completed This Month', value: completedMonth, href: '/admin/projects' },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="m-0 text-[28px] font-bold tracking-[-0.8px]" style={{ color: 'var(--color-ink)' }}>Dashboard</h1>
        <p className="mt-1.5 text-[15px]" style={{ color: 'var(--color-ink-muted)' }}>Business overview for Studio One Graphics</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {stats.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className="no-underline transition-[border-color] duration-150 hover:border-[rgba(255,255,255,0.14)]"
            style={{
              background: 'var(--color-surface-1)',
              border: '1px solid var(--color-hairline)',
              borderRadius: 'var(--radius-lg)',
              padding: '20px 24px',
            }}
          >
            <p className="m-0 text-[12px] font-semibold uppercase tracking-[1px]" style={{ color: 'var(--color-ink-subtle)' }}>{s.label}</p>
            <p className="mt-2 text-[36px] font-bold tracking-[-1px] leading-none" style={{ color: 'var(--color-ink)' }}>{s.value}</p>
          </Link>
        ))}
      </div>

      {/* Recent requests + upcoming appointments */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-6 mb-8">
        {/* Recent Appointment Requests */}
        <div
          className="overflow-hidden"
          style={{
            background: 'var(--color-surface-1)',
            border: '1px solid var(--color-hairline)',
            borderRadius: 'var(--radius-lg)',
          }}
        >
          <div className="flex justify-between items-center" style={{ padding: '16px 20px', borderBottom: '1px solid var(--color-hairline)' }}>
            <h3 className="m-0 text-[15px] font-semibold" style={{ color: 'var(--color-ink)' }}>Recent Appointment Requests</h3>
            <Link href="/admin/appointment-requests" className="text-[12px] no-underline" style={{ color: 'var(--color-ink-subtle)' }}>
              View all &rarr;
            </Link>
          </div>
          <div>
            {mockAppointmentRequests.slice(0, 5).map((r, i) => (
              <div
                key={r.id}
                className="flex items-center gap-4"
                style={{
                  padding: '14px 20px',
                  borderBottom: i < 4 ? '1px solid var(--color-hairline)' : 'none',
                }}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[14px] font-medium" style={{ color: 'var(--color-ink)' }}>{r.name}</span>
                    <span className="text-[11px]" style={{ color: 'var(--color-ink-subtle)' }}>{r.id}</span>
                  </div>
                  <span className="text-[13px]" style={{ color: 'var(--color-ink-muted)' }}>{r.vehicle} &middot; {r.service}</span>
                </div>
                <StatusBadge status={r.status} />
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Appointments */}
        <div
          className="overflow-hidden"
          style={{
            background: 'var(--color-surface-1)',
            border: '1px solid var(--color-hairline)',
            borderRadius: 'var(--radius-lg)',
          }}
        >
          <div className="flex justify-between items-center" style={{ padding: '16px 20px', borderBottom: '1px solid var(--color-hairline)' }}>
            <h3 className="m-0 text-[15px] font-semibold" style={{ color: 'var(--color-ink)' }}>Upcoming Appointments</h3>
            <Link href="/admin/appointments" className="text-[12px] no-underline" style={{ color: 'var(--color-ink-subtle)' }}>
              View all &rarr;
            </Link>
          </div>
          <div>
            {mockAppointments
              .filter((a) => a.status !== 'Completed')
              .slice(0, 4)
              .map((a, i, arr) => (
                <div key={a.id} style={{ padding: '14px 20px', borderBottom: i < arr.length - 1 ? '1px solid var(--color-hairline)' : 'none' }}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[14px] font-medium" style={{ color: 'var(--color-ink)' }}>{a.customer}</span>
                    <StatusBadge status={a.status} />
                  </div>
                  <div className="flex gap-3 text-[13px]" style={{ color: 'var(--color-ink-muted)' }}>
                    <span>{a.type}</span>
                    <span style={{ color: 'var(--color-ink-subtle)' }}>&middot;</span>
                    <span>{new Date(a.date + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} at {a.time}</span>
                  </div>
                  <span className="text-[12px] mt-0.5 block" style={{ color: 'var(--color-ink-subtle)' }}>{a.vehicle}</span>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Active Projects */}
      <div
        className="overflow-hidden"
        style={{
          background: 'var(--color-surface-1)',
          border: '1px solid var(--color-hairline)',
          borderRadius: 'var(--radius-lg)',
        }}
      >
        <div className="flex justify-between items-center" style={{ padding: '16px 20px', borderBottom: '1px solid var(--color-hairline)' }}>
          <h3 className="m-0 text-[15px] font-semibold" style={{ color: 'var(--color-ink)' }}>Active Projects</h3>
          <Link href="/admin/projects" className="text-[12px] no-underline" style={{ color: 'var(--color-ink-subtle)' }}>
            View all &rarr;
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3">
          {mockProjects
            .filter((p) => p.status !== 'Completed')
            .slice(0, 3)
            .map((p, i, arr) => (
              <div
                key={p.id}
                className="flex flex-col gap-2"
                style={{
                  padding: '20px',
                  borderRight: i < arr.length - 1 ? '1px solid var(--color-hairline)' : 'none',
                }}
              >
                <div className="flex justify-between items-center">
                  <span className="text-[11px] font-semibold uppercase tracking-[1px]" style={{ color: 'var(--color-ink-subtle)' }}>{p.service}</span>
                  <StatusBadge status={p.status} />
                </div>
                <h4 className="m-0 text-[16px] font-semibold" style={{ color: 'var(--color-ink)' }}>{p.vehicle}</h4>
                <span className="text-[13px]" style={{ color: 'var(--color-ink-muted)' }}>{p.customer}</span>
                <span className="text-[12px]" style={{ color: 'var(--color-ink-subtle)' }}>
                  Target: {new Date(p.targetDate + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

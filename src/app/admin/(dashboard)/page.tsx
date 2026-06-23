import Link from 'next/link';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { getAppointmentRequests, getDashboardStats } from '@/lib/supabase/queries';

export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
  const [allRequests, dashStats] = await Promise.all([
    getAppointmentRequests(),
    getDashboardStats(),
  ]);

  const stats = [
    { label: 'New Requests', value: dashStats.requests.new, href: '/admin/appointment-requests' },
    { label: 'Active Projects', value: dashStats.projects.active, href: '/admin/projects' },
    { label: 'Gallery Items', value: dashStats.gallery.total, href: '/admin/gallery' },
    { label: 'Unread Messages', value: dashStats.messages.unread, href: '/admin' },
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
          {allRequests.length === 0 ? (
            <div className="py-12 px-5 text-center">
              <p className="text-[15px] m-0" style={{ color: 'var(--color-ink-muted)' }}>No appointment requests yet. They&apos;ll appear here when customers book.</p>
            </div>
          ) : (
            allRequests.slice(0, 8).map((r, i) => (
              <div
                key={r.id}
                className="flex items-center gap-4"
                style={{
                  padding: '14px 20px',
                  borderBottom: i < Math.min(allRequests.length, 8) - 1 ? '1px solid var(--color-hairline)' : 'none',
                }}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[14px] font-medium" style={{ color: 'var(--color-ink)' }}>{r.name}</span>
                    <span className="text-[11px]" style={{ color: 'var(--color-ink-subtle)' }}>
                      {new Date(r.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                  <span className="text-[13px]" style={{ color: 'var(--color-ink-muted)' }}>
                    {r.vehicle} &middot; {r.service}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[12px] hidden sm:inline" style={{ color: 'var(--color-ink-subtle)' }}>
                    {new Date(r.preferred_date + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} at {r.preferred_time}
                  </span>
                  <StatusBadge status={r.status} />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

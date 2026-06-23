import { getStatusColor } from '@/lib/status';

export function StatusBadge({ status }: { status: string }) {
  const color = getStatusColor(status);
  return (
    <span className="inline-flex items-center gap-[5px] text-[12px] font-medium" style={{ color }}>
      <span className="w-[6px] h-[6px] rounded-full" style={{ background: color }} />
      {status}
    </span>
  );
}

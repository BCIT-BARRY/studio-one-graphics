export function getStatusColor(status: string): string {
  const map: Record<string, string> = {
    'New': '#3b82f6',
    'Contacted': '#22c55e',
    'Awaiting Confirmation': '#f59e0b',
    'Confirmed': '#22c55e',
    'Archived': '#6b7280',
    'Requested': '#f59e0b',
    'Completed': '#6b7280',
    'Cancelled': '#ef4444',
    'No-Show': '#ef4444',
    'Scheduled': '#a78bfa',
    'In Progress': '#3b82f6',
    'Waiting on Material': '#f59e0b',
    'Ready for Pickup': '#22c55e',
  };
  return map[status] || '#6b7280';
}

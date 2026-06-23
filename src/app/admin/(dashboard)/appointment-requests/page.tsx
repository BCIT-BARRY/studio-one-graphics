import { createClient } from '@/lib/supabase/server';
import { AppointmentRequestsList } from './AppointmentRequestsList';

export const dynamic = 'force-dynamic';

export default async function AppointmentRequestsPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from('appointment_requests')
    .select('*')
    .order('created_at', { ascending: false });

  return <AppointmentRequestsList requests={data || []} />;
}

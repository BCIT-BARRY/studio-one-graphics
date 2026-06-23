import { getAppointments } from '@/lib/supabase/queries';
import { AppointmentsList } from './AppointmentsList';

export const dynamic = 'force-dynamic';

export default async function AppointmentsPage() {
  const appointments = await getAppointments();

  return <AppointmentsList appointments={appointments} />;
}

'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';

export async function getAppointmentRequests() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('appointment_requests')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) return [];
  return data;
}

export async function updateRequestStatus(id: string, status: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from('appointment_requests')
    .update({ status })
    .eq('id', id);

  if (error) return { error: 'Failed to update status.' };

  revalidatePath('/admin');
  revalidatePath('/admin/appointment-requests');
  return { success: true };
}

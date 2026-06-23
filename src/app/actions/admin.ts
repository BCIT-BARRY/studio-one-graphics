'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';

// ── Appointment Requests ──────────────────────────────────────────────

export async function updateRequestStatus(id: string, status: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from('appointment_requests')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', id);

  if (error) return { error: 'Failed to update status.' };

  revalidatePath('/admin');
  revalidatePath('/admin/appointment-requests');
  return { success: true };
}

// ── Appointments ──────────────────────────────────────────────────────

export async function createAppointment(formData: FormData) {
  const supabase = await createClient();
  const { error } = await supabase.from('appointments').insert({
    request_id: formData.get('request_id') as string || null,
    title: formData.get('title') as string,
    date: formData.get('date') as string,
    time: formData.get('time') as string,
    type: formData.get('type') as string,
    status: 'Scheduled',
    notes: formData.get('notes') as string || null,
  });

  if (error) return { error: 'Failed to create appointment.' };

  revalidatePath('/admin/appointments');
  return { success: true };
}

export async function updateAppointment(
  id: string,
  data: { title?: string; date?: string; time?: string; type?: string; status?: string; notes?: string }
) {
  const supabase = await createClient();
  const { error } = await supabase
    .from('appointments')
    .update(data)
    .eq('id', id);

  if (error) return { error: 'Failed to update appointment.' };

  revalidatePath('/admin/appointments');
  return { success: true };
}

// ── Projects ──────────────────────────────────────────────────────────

export async function createProject(formData: FormData) {
  const supabase = await createClient();

  // Generate project ID
  const { data: existing } = await supabase
    .from('projects')
    .select('id')
    .order('created_at', { ascending: false })
    .limit(1);

  let nextNum = 1;
  if (existing && existing.length > 0) {
    const match = existing[0].id.match(/PRJ-(\d+)/);
    if (match) nextNum = parseInt(match[1], 10) + 1;
  }
  const id = `PRJ-${String(nextNum).padStart(4, '0')}`;

  const { error } = await supabase.from('projects').insert({
    id,
    client_name: formData.get('client_name') as string,
    vehicle: formData.get('vehicle') as string,
    service: formData.get('service') as string,
    status: 'Design',
    progress: 0,
    start_date: formData.get('start_date') as string,
    estimated_completion: formData.get('estimated_completion') as string,
    notes: formData.get('notes') as string || null,
  });

  if (error) return { error: 'Failed to create project.' };

  revalidatePath('/admin/projects');
  return { success: true };
}

export async function updateProject(
  id: string,
  data: { client_name?: string; vehicle?: string; service?: string; status?: string; progress?: number; notes?: string; estimated_completion?: string }
) {
  const supabase = await createClient();
  const { error } = await supabase
    .from('projects')
    .update({ ...data, updated_at: new Date().toISOString() })
    .eq('id', id);

  if (error) return { error: 'Failed to update project.' };

  revalidatePath('/admin/projects');
  return { success: true };
}

export async function updateProjectStatus(id: string, status: string, progress: number) {
  const supabase = await createClient();
  const { error } = await supabase
    .from('projects')
    .update({ status, progress, updated_at: new Date().toISOString() })
    .eq('id', id);

  if (error) return { error: 'Failed to update project status.' };

  revalidatePath('/admin/projects');
  return { success: true };
}

// ── Gallery ───────────────────────────────────────────────────────────

export async function addGalleryItem(formData: FormData) {
  const supabase = await createClient();

  // Get the next display_order
  const { data: existing } = await supabase
    .from('gallery_items')
    .select('display_order')
    .order('display_order', { ascending: false })
    .limit(1);

  const nextOrder = existing && existing.length > 0 ? (existing[0].display_order ?? 0) + 1 : 0;

  const { error } = await supabase.from('gallery_items').insert({
    project_id: formData.get('project_id') as string || null,
    image_url: formData.get('image_url') as string,
    title: formData.get('title') as string,
    description: formData.get('description') as string || null,
    category: formData.get('category') as string,
    featured: formData.get('featured') === 'true',
    display_order: nextOrder,
  });

  if (error) return { error: 'Failed to add gallery item.' };

  revalidatePath('/admin/gallery');
  return { success: true };
}

export async function deleteGalleryItem(id: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from('gallery_items')
    .delete()
    .eq('id', id);

  if (error) return { error: 'Failed to delete gallery item.' };

  revalidatePath('/admin/gallery');
  return { success: true };
}

// ── Business Settings ─────────────────────────────────────────────────

export async function updateBusinessSettings(formData: FormData) {
  const supabase = await createClient();

  const hoursRaw = formData.get('hours') as string | null;
  let hours: unknown = undefined;
  if (hoursRaw) {
    try {
      hours = JSON.parse(hoursRaw);
    } catch {
      // skip invalid JSON
    }
  }

  const updateData: Record<string, unknown> = {
    business_name: formData.get('business_name') as string,
    phone: formData.get('phone') as string,
    email: formData.get('email') as string,
    address: formData.get('address') as string,
    updated_at: new Date().toISOString(),
  };

  if (formData.get('deposit_percentage')) {
    updateData.deposit_percentage = parseInt(formData.get('deposit_percentage') as string, 10);
  }
  if (formData.get('tax_rate')) {
    updateData.tax_rate = parseFloat(formData.get('tax_rate') as string);
  }
  if (hours !== undefined) {
    updateData.hours = hours;
  }

  const { error } = await supabase
    .from('business_settings')
    .update(updateData)
    .eq('id', 1);

  if (error) return { error: 'Failed to update settings.' };

  revalidatePath('/admin/settings');
  revalidatePath('/admin');
  return { success: true };
}

// ── Contact Messages ──────────────────────────────────────────────────

export async function markContactRead(id: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from('contact_messages')
    .update({ read: true })
    .eq('id', id);

  if (error) return { error: 'Failed to mark message as read.' };

  revalidatePath('/admin');
  return { success: true };
}

import { createClient } from '@/lib/supabase/server';

// ── Appointment Requests ──────────────────────────────────────────────

export async function getAppointmentRequests() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('appointment_requests')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('getAppointmentRequests error:', error.message);
    return [];
  }
  return data ?? [];
}

// ── Appointments ──────────────────────────────────────────────────────

export async function getAppointments() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('appointments')
    .select('*')
    .order('date', { ascending: true });

  if (error) {
    console.error('getAppointments error:', error.message);
    return [];
  }
  return data ?? [];
}

// ── Projects ──────────────────────────────────────────────────────────

export async function getProjects() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('getProjects error:', error.message);
    return [];
  }
  return data ?? [];
}

// ── Gallery Items ─────────────────────────────────────────────────────

export async function getGalleryItems() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('gallery_items')
    .select('*')
    .order('display_order', { ascending: true });

  if (error) {
    console.error('getGalleryItems error:', error.message);
    return [];
  }
  return data ?? [];
}

// ── Business Settings ─────────────────────────────────────────────────

export async function getBusinessSettings() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('business_settings')
    .select('*')
    .eq('id', 1)
    .single();

  if (error) {
    console.error('getBusinessSettings error:', error.message);
    return null;
  }
  return data;
}

// ── Contact Messages ──────────────────────────────────────────────────

export async function getContactMessages() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('contact_messages')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('getContactMessages error:', error.message);
    return [];
  }
  return data ?? [];
}

// ── Dashboard Stats ───────────────────────────────────────────────────

export async function getDashboardStats() {
  const supabase = await createClient();

  const [requestsRes, projectsRes, galleryRes, messagesRes] = await Promise.all([
    supabase.from('appointment_requests').select('id, status'),
    supabase.from('projects').select('id, status'),
    supabase.from('gallery_items').select('id'),
    supabase.from('contact_messages').select('id, read'),
  ]);

  const requests = requestsRes.data ?? [];
  const projects = projectsRes.data ?? [];
  const gallery = galleryRes.data ?? [];
  const messages = messagesRes.data ?? [];

  return {
    requests: {
      total: requests.length,
      new: requests.filter((r) => r.status === 'New').length,
      contacted: requests.filter((r) => r.status === 'Contacted').length,
      confirmed: requests.filter((r) => r.status === 'Confirmed').length,
    },
    projects: {
      total: projects.length,
      active: projects.filter((p) => p.status !== 'Complete' && p.status !== 'Completed').length,
    },
    gallery: {
      total: gallery.length,
    },
    messages: {
      total: messages.length,
      unread: messages.filter((m) => !m.read).length,
    },
  };
}

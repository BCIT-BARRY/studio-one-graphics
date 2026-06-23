'use server';

import { createClient } from '@/lib/supabase/server';
import { sendBookingConfirmation, sendAdminBookingAlert } from '@/lib/email';

export async function submitBooking(_prevState: unknown, formData: FormData) {
  const name = (formData.get('name') as string)?.trim();
  const email = (formData.get('email') as string)?.trim();
  const phone = (formData.get('phone') as string)?.trim() || '';
  const vehicle = (formData.get('vehicle') as string)?.trim();
  const service = (formData.get('service') as string)?.trim();
  const preferredDate = formData.get('preferred_date') as string;
  const preferredTime = formData.get('preferred_time') as string;
  const notes = (formData.get('notes') as string)?.trim() || '';

  if (!name || !email || !vehicle || !service || !preferredDate || !preferredTime) {
    return { error: 'Please fill in all required fields.' };
  }

  const supabase = await createClient();

  const { error } = await supabase.from('appointment_requests').insert({
    name,
    email,
    phone,
    vehicle,
    service,
    preferred_date: preferredDate,
    preferred_time: preferredTime,
    notes,
  });

  if (error) {
    return { error: 'Something went wrong. Please try again.' };
  }

  const emailData = { name, email, phone, vehicle, service, preferredDate, preferredTime, notes };
  sendBookingConfirmation(email, emailData);
  sendAdminBookingAlert(emailData);

  return { success: true };
}

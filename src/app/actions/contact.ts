'use server';

import { createClient } from '@/lib/supabase/server';

export async function submitContact(_prevState: unknown, formData: FormData) {
  const name = (formData.get('name') as string)?.trim();
  const email = (formData.get('email') as string)?.trim();
  const phone = (formData.get('phone') as string)?.trim() || '';
  const message = (formData.get('message') as string)?.trim();

  if (!name || !email || !message) {
    return { error: 'Please fill in all required fields.' };
  }

  const supabase = await createClient();

  const { error } = await supabase.from('contact_messages').insert({
    name,
    email,
    phone,
    message,
  });

  if (error) {
    return { error: 'Something went wrong. Please try again.' };
  }

  return { success: true };
}

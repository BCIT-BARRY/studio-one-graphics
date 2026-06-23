'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';
import { stripe } from '@/lib/stripe';

export async function sendDepositLink(requestId: string, estimateDollars: number) {
  if (!stripe) return { error: 'Stripe is not configured. Add STRIPE_SECRET_KEY to your environment.' };
  if (!estimateDollars || estimateDollars <= 0) return { error: 'Please enter a valid estimate amount.' };

  const supabase = await createClient();

  const { data: settings } = await supabase
    .from('business_settings')
    .select('deposit_percentage')
    .eq('id', 1)
    .single();

  const depositPct = settings?.deposit_percentage ?? 25;
  const estimateCents = Math.round(estimateDollars * 100);
  const depositCents = Math.round(estimateCents * (depositPct / 100));

  if (depositCents < 50) return { error: 'Deposit amount must be at least $0.50.' };

  const { data: request } = await supabase
    .from('appointment_requests')
    .select('name, email, service, vehicle')
    .eq('id', requestId)
    .single();

  if (!request) return { error: 'Appointment request not found.' };

  try {
    const product = await stripe.products.create({
      name: `Deposit — ${request.service}`,
      description: `${request.vehicle} · ${request.name}`,
    });

    const price = await stripe.prices.create({
      product: product.id,
      unit_amount: depositCents,
      currency: 'cad',
    });

    const paymentLink = await stripe.paymentLinks.create({
      line_items: [{ price: price.id, quantity: 1 }],
      metadata: {
        request_id: requestId,
        customer_name: request.name,
      },
      after_completion: {
        type: 'redirect',
        redirect: { url: 'https://studioonegraphics.up.railway.app/book-appointment?deposit=paid' },
      },
    });

    await supabase
      .from('appointment_requests')
      .update({
        estimate_cents: estimateCents,
        deposit_cents: depositCents,
        stripe_payment_link_id: paymentLink.id,
        stripe_payment_link_url: paymentLink.url,
        payment_status: 'pending',
        updated_at: new Date().toISOString(),
      })
      .eq('id', requestId);

    revalidatePath('/admin/appointment-requests');
    return { success: true, url: paymentLink.url, depositAmount: (depositCents / 100).toFixed(2) };
  } catch {
    return { error: 'Failed to create payment link. Check your Stripe configuration.' };
  }
}

export async function markDepositPaid(requestId: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from('appointment_requests')
    .update({ payment_status: 'paid', updated_at: new Date().toISOString() })
    .eq('id', requestId);

  if (error) return { error: 'Failed to update payment status.' };

  revalidatePath('/admin/appointment-requests');
  return { success: true };
}

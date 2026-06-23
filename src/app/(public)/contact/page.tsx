'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div>
        <section className="max-w-[var(--container-max)] mx-auto" style={{ padding: '100px 32px 96px' }}>
          <div
            className="text-center py-20 px-8"
            style={{
              background: 'var(--color-surface-1)',
              border: '1px solid var(--color-hairline)',
              borderRadius: 'var(--radius-lg)',
            }}
          >
            <h2 className="m-0 text-[28px] font-semibold tracking-[-0.5px]" style={{ color: 'var(--color-ink)' }}>
              Message sent
            </h2>
            <p className="mt-3 text-[15px] leading-[1.6] max-w-[440px] mx-auto" style={{ color: 'var(--color-ink-muted)' }}>
              Thanks for reaching out. Studio One will get back to you shortly.
            </p>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div>
      <section className="max-w-[var(--container-max)] mx-auto" style={{ padding: '100px 32px 36px' }}>
        <span className="text-[11px] font-semibold tracking-[1.5px] uppercase block" style={{ color: 'var(--color-ink-subtle)' }}>
          Contact
        </span>
        <h1
          className="mt-3 mb-3"
          style={{
            color: 'var(--color-ink)',
            fontSize: 'clamp(36px, 4.5vw, 52px)',
            fontWeight: 700,
            lineHeight: 1.08,
            letterSpacing: '-1.6px',
          }}
        >
          Get in touch
        </h1>
        <p className="m-0 max-w-[520px] text-[17px] leading-[1.65]" style={{ color: 'var(--color-ink-muted)' }}>
          Have a question or want to discuss your project? Send us a message.
        </p>
      </section>

      <section className="max-w-[var(--container-max)] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16" style={{ padding: '24px 32px 96px' }}>
        {/* Form */}
        <form
          className="flex flex-col gap-5"
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitted(true);
          }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="Full name" placeholder="Your name" required />
            <FormField label="Phone" placeholder="(604) 555-0000" type="tel" />
          </div>
          <FormField label="Email" placeholder="you@email.com" type="email" required />
          <div className="flex flex-col gap-1.5">
            <label className="text-[14px] font-semibold" style={{ color: 'var(--color-ink)' }}>Message</label>
            <textarea
              placeholder="Tell us about your project or ask a question..."
              required
              rows={5}
              className="resize-y outline-none"
              style={{
                background: 'var(--color-surface-1)',
                color: 'var(--color-ink)',
                fontSize: '15px',
                padding: '12px 14px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--color-hairline-strong)',
                minHeight: '120px',
              }}
            />
          </div>
          <Button fullWidth size="lg" type="submit">
            Send Message
          </Button>
        </form>

        {/* Info */}
        <div className="flex flex-col gap-8 pt-2">
          <div>
            <h3 className="m-0 mb-2 text-[18px] font-semibold" style={{ color: 'var(--color-ink)' }}>Location</h3>
            <p className="m-0 text-[15px] leading-[1.6]" style={{ color: 'var(--color-ink-muted)' }}>Surrey, British Columbia</p>
          </div>
          <div>
            <h3 className="m-0 mb-2 text-[18px] font-semibold" style={{ color: 'var(--color-ink)' }}>Hours</h3>
            <p className="m-0 text-[15px] leading-[1.6]" style={{ color: 'var(--color-ink-muted)' }}>By Appointment Only</p>
            <p className="mt-1 text-[13px] leading-[1.5]" style={{ color: 'var(--color-ink-subtle)' }}>
              Each vehicle gets dedicated time and focused attention.
            </p>
          </div>
          <div>
            <h3 className="m-0 mb-2 text-[18px] font-semibold" style={{ color: 'var(--color-ink)' }}>Get in touch</h3>
            <div className="flex flex-col gap-2 text-[15px]" style={{ color: 'var(--color-ink-muted)' }}>
              <span>Phone: (604) 555-0000</span>
              <span>Email: hello@studioonegraphics.ca</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function FormField({
  label,
  placeholder,
  type = 'text',
  required = false,
}: {
  label: string;
  placeholder: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[14px] font-semibold" style={{ color: 'var(--color-ink)' }}>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        required={required}
        className="outline-none"
        style={{
          background: 'var(--color-surface-1)',
          color: 'var(--color-ink)',
          fontSize: '15px',
          padding: '12px 14px',
          borderRadius: 'var(--radius-sm)',
          border: '1px solid var(--color-hairline-strong)',
        }}
      />
    </div>
  );
}

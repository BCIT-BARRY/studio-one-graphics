'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { mockBusinessSettings } from '@/data/mock';

export default function SettingsPage() {
  const [settings, setSettings] = useState(mockBusinessSettings);
  const [saved, setSaved] = useState(false);

  const update = (key: keyof typeof settings, value: string) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  };

  return (
    <div>
      <div className="flex justify-between items-start mb-6 flex-wrap gap-4">
        <div>
          <h1 className="m-0 text-[28px] font-bold tracking-[-0.8px]" style={{ color: 'var(--color-ink)' }}>Business Settings</h1>
          <p className="mt-1.5 text-[15px]" style={{ color: 'var(--color-ink-muted)' }}>Update public business information</p>
        </div>
        <Button
          size="sm"
          onClick={() => setSaved(true)}
        >
          {saved ? 'Saved' : 'Save Changes'}
        </Button>
      </div>

      <div className="max-w-[720px]">
        <SettingsSection title="Business Information" desc="Core details shown across the website.">
          <Field label="Business Name" value={settings.businessName} onChange={(v) => update('businessName', v)} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Phone" value={settings.phone} onChange={(v) => update('phone', v)} />
            <Field label="Email" value={settings.email} onChange={(v) => update('email', v)} />
          </div>
          <Field label="Location" value={settings.location} onChange={(v) => update('location', v)} />
        </SettingsSection>

        <SettingsSection title="Appointment Settings" desc="How the by-appointment model is communicated.">
          <TextAreaField label="Appointment Message" value={settings.appointmentMessage} onChange={(v) => update('appointmentMessage', v)} />
          <Field label="Booking CTA Text" value={settings.bookingCtaText} onChange={(v) => update('bookingCtaText', v)} />
        </SettingsSection>

        <SettingsSection title="Social & Links">
          <Field label="Instagram" value={settings.instagram} onChange={(v) => update('instagram', v)} />
          <Field label="Website URL" value={settings.websiteUrl} onChange={(v) => update('websiteUrl', v)} />
        </SettingsSection>

        <SettingsSection title="Footer" desc="Customize the website footer content.">
          <TextAreaField label="Footer Description" value={settings.footerDescription} onChange={(v) => update('footerDescription', v)} />
          <Field label="Developer Credit" value={settings.developerCredit} onChange={(v) => update('developerCredit', v)} />
        </SettingsSection>

        {/* Preview */}
        <div
          className="mb-5"
          style={{
            background: 'var(--color-surface-1)',
            border: '1px solid var(--color-hairline)',
            borderRadius: 'var(--radius-lg)',
            padding: '28px',
          }}
        >
          <h3 className="m-0 mb-4 text-[18px] font-semibold" style={{ color: 'var(--color-ink)' }}>Contact Card Preview</h3>
          <div
            className="flex flex-col gap-3"
            style={{ background: 'var(--color-surface-2)', borderRadius: 'var(--radius-md)', padding: '24px' }}
          >
            <Image src="/images/logo-full-white.png" alt="Studio One" width={120} height={20} className="h-5 w-auto" />
            <p className="m-0 text-[13px] leading-[1.5]" style={{ color: 'var(--color-ink-muted)' }}>{settings.footerDescription}</p>
            <div className="flex flex-col gap-1 text-[13px]" style={{ color: 'var(--color-ink-muted)' }}>
              <span>{settings.location}</span>
              <span>{settings.phone}</span>
              <span>{settings.email}</span>
            </div>
            <span className="text-[11px]" style={{ color: 'var(--color-ink-subtle)' }}>{settings.appointmentMessage}</span>
          </div>
        </div>

        <div className="flex justify-end gap-3 pb-8">
          <Button variant="ghost" onClick={() => { setSettings(mockBusinessSettings); setSaved(false); }}>Discard</Button>
          <Button onClick={() => setSaved(true)}>Save Changes</Button>
        </div>
      </div>
    </div>
  );
}

function SettingsSection({ title, desc, children }: { title: string; desc?: string; children: React.ReactNode }) {
  return (
    <div
      className="mb-5"
      style={{
        background: 'var(--color-surface-1)',
        border: '1px solid var(--color-hairline)',
        borderRadius: 'var(--radius-lg)',
        padding: '28px',
      }}
    >
      <h3 className="m-0 mb-1 text-[18px] font-semibold" style={{ color: 'var(--color-ink)' }}>{title}</h3>
      {desc && <p className="mt-0 mb-5 text-[14px]" style={{ color: 'var(--color-ink-muted)' }}>{desc}</p>}
      <div className="flex flex-col gap-4">{children}</div>
    </div>
  );
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[14px] font-semibold" style={{ color: 'var(--color-ink)' }}>{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
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

function TextAreaField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[14px] font-semibold" style={{ color: 'var(--color-ink)' }}>{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={2}
        className="resize-y outline-none"
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

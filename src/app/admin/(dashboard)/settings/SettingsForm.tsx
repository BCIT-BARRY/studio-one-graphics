'use client';

import { useState, useTransition } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { updateBusinessSettings } from '@/app/actions/admin';

interface BusinessSettings {
  id: number;
  business_name: string;
  phone: string;
  email: string;
  address: string;
  hours: Record<string, string> | null;
  deposit_percentage: number | null;
  tax_rate: number | null;
  created_at: string;
  updated_at: string;
}

const defaults: Omit<BusinessSettings, 'id' | 'created_at' | 'updated_at'> = {
  business_name: 'Studio One Graphics',
  phone: '',
  email: '',
  address: '',
  hours: null,
  deposit_percentage: null,
  tax_rate: null,
};

export function SettingsForm({ settings }: { settings: BusinessSettings | null }) {
  const initial = settings ?? { ...defaults, id: 1, created_at: '', updated_at: '' };
  const [form, setForm] = useState({
    business_name: initial.business_name || '',
    phone: initial.phone || '',
    email: initial.email || '',
    address: initial.address || '',
    deposit_percentage: initial.deposit_percentage?.toString() || '',
    tax_rate: initial.tax_rate?.toString() || '',
  });
  const [saved, setSaved] = useState(false);
  const [isPending, startTransition] = useTransition();

  const update = (key: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  };

  function handleSave() {
    startTransition(async () => {
      const fd = new FormData();
      fd.set('business_name', form.business_name);
      fd.set('phone', form.phone);
      fd.set('email', form.email);
      fd.set('address', form.address);
      if (form.deposit_percentage) fd.set('deposit_percentage', form.deposit_percentage);
      if (form.tax_rate) fd.set('tax_rate', form.tax_rate);
      const result = await updateBusinessSettings(fd);
      if (result.success) setSaved(true);
    });
  }

  return (
    <div>
      <div className="flex justify-between items-start mb-6 flex-wrap gap-4">
        <div>
          <h1 className="m-0 text-[28px] font-bold tracking-[-0.8px]" style={{ color: 'var(--color-ink)' }}>Business Settings</h1>
          <p className="mt-1.5 text-[15px]" style={{ color: 'var(--color-ink-muted)' }}>Update public business information</p>
        </div>
        <Button
          size="sm"
          disabled={isPending}
          onClick={handleSave}
        >
          {isPending ? 'Saving...' : saved ? 'Saved' : 'Save Changes'}
        </Button>
      </div>

      <div className="max-w-[720px]">
        <SettingsSection title="Business Information" desc="Core details shown across the website.">
          <Field label="Business Name" value={form.business_name} onChange={(v) => update('business_name', v)} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Phone" value={form.phone} onChange={(v) => update('phone', v)} />
            <Field label="Email" value={form.email} onChange={(v) => update('email', v)} />
          </div>
          <Field label="Address" value={form.address} onChange={(v) => update('address', v)} />
        </SettingsSection>

        <SettingsSection title="Financial Settings" desc="Deposit and tax configuration.">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Deposit Percentage" value={form.deposit_percentage} onChange={(v) => update('deposit_percentage', v)} />
            <Field label="Tax Rate (%)" value={form.tax_rate} onChange={(v) => update('tax_rate', v)} />
          </div>
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
            <div className="flex flex-col gap-1 text-[13px]" style={{ color: 'var(--color-ink-muted)' }}>
              <span>{form.address || 'No address set'}</span>
              <span>{form.phone || 'No phone set'}</span>
              <span>{form.email || 'No email set'}</span>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 pb-8">
          <Button variant="ghost" onClick={() => {
            setForm({
              business_name: initial.business_name || '',
              phone: initial.phone || '',
              email: initial.email || '',
              address: initial.address || '',
              deposit_percentage: initial.deposit_percentage?.toString() || '',
              tax_rate: initial.tax_rate?.toString() || '',
            });
            setSaved(false);
          }}>Discard</Button>
          <Button disabled={isPending} onClick={handleSave}>
            {isPending ? 'Saving...' : 'Save Changes'}
          </Button>
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

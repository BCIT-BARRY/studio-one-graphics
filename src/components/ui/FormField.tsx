'use client';

export function FormField({
  label,
  placeholder,
  type = 'text',
  required = false,
  name,
  defaultValue,
}: {
  label: string;
  placeholder: string;
  type?: string;
  required?: boolean;
  name?: string;
  defaultValue?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[14px] font-semibold" style={{ color: 'var(--color-ink)' }}>{label}</label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
        defaultValue={defaultValue}
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

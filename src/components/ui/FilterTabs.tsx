'use client';

export function FilterTabs({
  options,
  value,
  onChange,
}: {
  options: string[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="flex gap-1 flex-wrap">
      {options.map((opt) => (
        <button
          key={opt}
          onClick={() => onChange(opt)}
          className="cursor-pointer transition-all duration-[120ms]"
          style={{
            padding: '6px 14px',
            fontSize: '12px',
            fontWeight: 500,
            fontFamily: 'var(--font-sans)',
            background: value === opt ? 'var(--color-surface-3)' : 'transparent',
            color: value === opt ? 'var(--color-ink)' : 'var(--color-ink-subtle)',
            border: `1px solid ${value === opt ? 'rgba(255,255,255,0.14)' : 'var(--color-hairline)'}`,
            borderRadius: 'var(--radius-sm)',
          }}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

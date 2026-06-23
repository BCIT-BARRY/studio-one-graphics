'use client';

import { type ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  children,
  disabled,
  ...props
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center font-semibold uppercase tracking-[0.3px] cursor-pointer transition-all duration-150 ease-out';

  const variants = {
    primary:
      'bg-[var(--color-inverse-canvas)] text-[var(--color-inverse-ink)] border border-transparent hover:opacity-85 active:scale-[0.98]',
    secondary:
      'bg-[var(--color-surface-2)] text-[var(--color-ink)] border border-[var(--color-hairline-strong)] hover:border-[rgba(255,255,255,0.25)] active:scale-[0.98]',
    ghost:
      'bg-transparent text-[var(--color-ink-muted)] border border-[var(--color-hairline-strong)] hover:text-[var(--color-ink)] hover:border-[rgba(255,255,255,0.25)] active:scale-[0.98]',
  };

  const sizes = {
    sm: 'text-[12px] px-4 py-2 rounded-[var(--radius-sm)]',
    md: 'text-[14px] px-6 py-2.5 rounded-[var(--radius-sm)]',
    lg: 'text-[14px] px-8 py-3 rounded-[var(--radius-sm)]',
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${disabled ? 'opacity-40 pointer-events-none' : ''} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}

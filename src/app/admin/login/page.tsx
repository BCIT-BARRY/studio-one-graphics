'use client';

import { useActionState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { login } from '@/app/actions/auth';

export default function AdminLoginPage() {
  const [state, action, pending] = useActionState(login, undefined);

  return (
    <div
      className="min-h-screen flex items-center justify-center p-8"
      style={{ background: 'var(--color-canvas)' }}
    >
      <div className="w-full max-w-[380px] flex flex-col items-center">
        <Image src="/images/logo-full-white.png" alt="Studio One Graphics" width={180} height={28} className="h-7 w-auto mb-12" />

        <form
          action={action}
          className="w-full flex flex-col gap-5"
          style={{
            background: 'var(--color-surface-1)',
            border: '1px solid var(--color-hairline)',
            borderRadius: 'var(--radius-xl)',
            padding: '36px 32px',
          }}
        >
          <div className="text-center mb-1">
            <h1 className="m-0 text-[22px] font-semibold tracking-[-0.3px]" style={{ color: 'var(--color-ink)' }}>
              Admin Login
            </h1>
            <p className="mt-2 text-[14px]" style={{ color: 'var(--color-ink-muted)' }}>
              Sign in to manage Studio One
            </p>
          </div>

          {state?.error && (
            <div
              className="text-[14px] text-center py-3 px-4 rounded-[var(--radius-sm)]"
              style={{ background: 'rgba(239,68,68,0.12)', color: '#ef4444' }}
            >
              {state.error}
            </div>
          )}

          <div className="flex flex-col gap-1.5">
            <label className="text-[14px] font-semibold" style={{ color: 'var(--color-ink)' }}>Email</label>
            <input
              type="email"
              name="email"
              placeholder="admin@studioonegraphics.ca"
              required
              className="outline-none"
              style={{
                background: 'var(--color-surface-2)',
                color: 'var(--color-ink)',
                fontSize: '15px',
                padding: '12px 14px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--color-hairline-strong)',
              }}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[14px] font-semibold" style={{ color: 'var(--color-ink)' }}>Password</label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              required
              className="outline-none"
              style={{
                background: 'var(--color-surface-2)',
                color: 'var(--color-ink)',
                fontSize: '15px',
                padding: '12px 14px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--color-hairline-strong)',
              }}
            />
          </div>

          <Button fullWidth size="lg" type="submit" disabled={pending}>
            {pending ? 'Signing in...' : 'Login'}
          </Button>
        </form>

        <p className="mt-8 text-[11px]" style={{ color: 'var(--color-ink-subtle)' }}>
          Powered by{' '}
          <a href="https://hellobarrybui.dev" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-ink-subtle)' }}>
            hellobarrybui.dev
          </a>
        </p>
      </div>
    </div>
  );
}

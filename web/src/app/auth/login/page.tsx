'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.detail || 'Login failed');
      }
      const data = await res.json();
      localStorage.setItem('access_token', data.access_token);
      router.push('/dashboard');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-mesh min-h-screen flex items-center justify-center px-4">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#070d1f]/60" />
      </div>

      <div className="w-full max-w-md z-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <span className="inline-flex items-center gap-2 mb-3">
            <span className="material-symbols-outlined text-primary text-3xl">inventory_2</span>
            <span className="text-2xl font-black text-primary tracking-tight uppercase">SynckShelf</span>
          </span>
          <h1 className="text-2xl font-bold text-on-surface">Welcome back</h1>
          <p className="text-on-surface-variant text-sm mt-1">Sign in to your inventory dashboard</p>
        </div>

        <div className="glass-dark rounded-2xl p-8 border border-white/10">
          {error && (
            <div className="mb-4 p-3 rounded-xl bg-error/10 border border-error/20 text-error text-sm flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px]">error</span>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline text-[20px]">mail</span>
              <input
                type="email"
                placeholder="Work email"
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                className="input-dark"
                required
              />
            </div>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline text-[20px]">lock</span>
              <input
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                className="input-dark"
                required
              />
            </div>

            <div className="flex justify-end">
              <Link href="/auth/forgot-password" className="text-xs text-primary hover:underline">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="emerald-gradient w-full py-4 rounded-xl font-bold text-on-primary text-base flex items-center justify-center gap-2 active:scale-95 transition-all duration-200 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <span className="material-symbols-outlined animate-spin">refresh</span>
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <span className="material-symbols-outlined">arrow_forward</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-white/8 text-center">
            <p className="text-sm text-on-surface-variant">
              {"Don't have an account? "}
              <Link href="/auth/register" className="text-primary font-semibold hover:underline">
                Get started free
              </Link>
            </p>
          </div>
        </div>

        {/* Demo access */}
        <div className="mt-4 text-center">
          <button
            onClick={() => {
              setForm({ email: 'demo@synckshelf.com', password: 'demo1234' });
            }}
            className="text-xs text-on-surface-variant/60 hover:text-primary transition-colors"
          >
            Use demo credentials
          </button>
        </div>
      </div>
    </div>
  );
}

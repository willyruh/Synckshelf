'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const steps = ['Account', 'Store', 'Done'];

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    name: '', email: '', password: '',
    storeName: '', storeType: 'grocery', branchName: '',
  });

  const update = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (step < 1) { setStep(s => s + 1); return; }
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.detail || 'Registration failed');
      }
      const data = await res.json();
      localStorage.setItem('access_token', data.access_token);
      setStep(2);
      setTimeout(() => router.push('/dashboard'), 1500);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Registration failed');
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
        <div className="text-center mb-8">
          <span className="inline-flex items-center gap-2 mb-3">
            <span className="material-symbols-outlined text-primary text-3xl">inventory_2</span>
            <span className="text-2xl font-black text-primary tracking-tight uppercase">SynckShelf</span>
          </span>
          <h1 className="text-2xl font-bold text-on-surface">Create your account</h1>
          <p className="text-on-surface-variant text-sm mt-1">Start managing inventory intelligently</p>
        </div>

        {/* Step indicator */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {steps.map((s, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                i < step ? 'bg-primary text-on-primary' :
                i === step ? 'bg-primary/20 text-primary border border-primary/40' :
                'bg-white/5 text-on-surface-variant'
              }`}>
                {i < step ? <span className="material-symbols-outlined text-[14px]">check</span> : i + 1}
              </div>
              <span className={`text-xs font-medium hidden sm:inline ${i === step ? 'text-primary' : 'text-on-surface-variant/50'}`}>{s}</span>
              {i < steps.length - 1 && <div className={`w-8 h-px ${i < step ? 'bg-primary' : 'bg-white/10'}`} />}
            </div>
          ))}
        </div>

        <div className="glass-dark rounded-2xl p-8 border border-white/10">
          {step === 2 ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center mx-auto">
                <span className="material-symbols-outlined text-primary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
              </div>
              <h2 className="text-xl font-bold text-on-surface">You&apos;re all set!</h2>
              <p className="text-on-surface-variant text-sm">Launching your SynckShelf dashboard...</p>
              <div className="flex justify-center">
                <span className="material-symbols-outlined text-primary animate-spin">refresh</span>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 rounded-xl bg-error/10 border border-error/20 text-error text-sm flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px]">error</span>
                  {error}
                </div>
              )}

              {step === 0 && (
                <>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline text-[20px]">person</span>
                    <input type="text" placeholder="Full name" value={form.name} onChange={e => update('name', e.target.value)} className="input-dark" required />
                  </div>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline text-[20px]">mail</span>
                    <input type="email" placeholder="Work email" value={form.email} onChange={e => update('email', e.target.value)} className="input-dark" required />
                  </div>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline text-[20px]">lock</span>
                    <input type="password" placeholder="Password (min 8 chars)" value={form.password} onChange={e => update('password', e.target.value)} className="input-dark" required minLength={8} />
                  </div>
                </>
              )}

              {step === 1 && (
                <>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline text-[20px]">store</span>
                    <input type="text" placeholder="Store / Business name" value={form.storeName} onChange={e => update('storeName', e.target.value)} className="input-dark" required />
                  </div>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline text-[20px]">category</span>
                    <select value={form.storeType} onChange={e => update('storeType', e.target.value)}
                      className="input-dark appearance-none cursor-pointer">
                      <option value="grocery">Grocery Store</option>
                      <option value="restaurant">Restaurant</option>
                      <option value="pharmacy">Pharmacy</option>
                      <option value="warehouse">Warehouse</option>
                      <option value="bakery">Bakery</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline text-[20px]">location_on</span>
                    <input type="text" placeholder="Main branch name (e.g. Main Street Hub)" value={form.branchName} onChange={e => update('branchName', e.target.value)} className="input-dark" required />
                  </div>
                </>
              )}

              <button
                type="submit"
                disabled={loading}
                className="emerald-gradient w-full py-4 rounded-xl font-bold text-on-primary text-base flex items-center justify-center gap-2 active:scale-95 transition-all duration-200 disabled:opacity-50 mt-2"
              >
                {loading ? (
                  <><span className="material-symbols-outlined animate-spin">refresh</span> Creating...</>
                ) : step === 0 ? (
                  <>Next <span className="material-symbols-outlined">arrow_forward</span></>
                ) : (
                  <>Create Account <span className="material-symbols-outlined">check</span></>
                )}
              </button>

              {step > 0 && (
                <button type="button" onClick={() => setStep(s => s - 1)} className="w-full py-3 text-on-surface-variant text-sm hover:text-on-surface transition-colors">
                  ← Back
                </button>
              )}
            </form>
          )}

          <div className="mt-6 pt-6 border-t border-white/8 text-center">
            <p className="text-sm text-on-surface-variant">
              Already have an account?{' '}
              <Link href="/auth/login" className="text-primary font-semibold hover:underline">Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

type Role = 'seeker' | 'practitioner' | null

export default function SignUpPage() {
  const [role, setRole] = useState<Role>(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!role) return
    setLoading(true)
    sessionStorage.setItem('userName', name)
    sessionStorage.setItem('userRole', role)
    setTimeout(() => router.push('/dashboard'), 300)
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-orange-50 px-4 py-12">
      <div className="w-full max-w-md">

        {/* Brand */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 rounded-brand gradient-brand shadow-brand flex items-center justify-center mb-4">
            {/* Sun / light mark */}
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
              <circle cx="14" cy="14" r="5" fill="white" />
              <line x1="14" y1="2" x2="14" y2="6" stroke="white" strokeWidth="2" strokeLinecap="round" />
              <line x1="14" y1="22" x2="14" y2="26" stroke="white" strokeWidth="2" strokeLinecap="round" />
              <line x1="2" y1="14" x2="6" y2="14" stroke="white" strokeWidth="2" strokeLinecap="round" />
              <line x1="22" y1="14" x2="26" y2="14" stroke="white" strokeWidth="2" strokeLinecap="round" />
              <line x1="5.5" y1="5.5" x2="8.3" y2="8.3" stroke="white" strokeWidth="2" strokeLinecap="round" />
              <line x1="19.7" y1="19.7" x2="22.5" y2="22.5" stroke="white" strokeWidth="2" strokeLinecap="round" />
              <line x1="22.5" y1="5.5" x2="19.7" y2="8.3" stroke="white" strokeWidth="2" strokeLinecap="round" />
              <line x1="8.3" y1="19.7" x2="5.5" y2="22.5" stroke="white" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <h1 className="font-display text-3xl font-bold text-gradient-brand">
            Join Lit Up
          </h1>
          <p className="mt-1.5 text-gray-500 text-sm text-center">
            Connect with trusted lightworkers, or share your gifts with the world.
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-brand shadow-brand p-8">
          <form onSubmit={handleSubmit} className="space-y-5" noValidate>

            {/* Role selector */}
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">I am joining as…</p>
              <div className="grid grid-cols-2 gap-3">
                {([
                  { value: 'seeker', emoji: '🌿', label: 'A Seeker', desc: 'Find my healer' },
                  { value: 'practitioner', emoji: '✨', label: 'A Practitioner', desc: 'Grow my practice' },
                ] as { value: Role; emoji: string; label: string; desc: string }[]).map(({ value, emoji, label, desc }) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setRole(value)}
                    className={`p-3.5 rounded-brand border-2 text-left transition-all duration-[150ms] ease-out
                      ${role === value
                        ? 'border-brand-primary bg-purple-50'
                        : 'border-gray-200 hover:border-gray-300 bg-white'}`}
                  >
                    <span className="text-xl block mb-1">{emoji}</span>
                    <span className="text-xs font-semibold text-gray-900 block">{label}</span>
                    <span className="text-xs text-gray-400">{desc}</span>
                  </button>
                ))}
              </div>
              {!role && (
                <p className="text-xs text-gray-400 mt-1.5">Please select a role to continue.</p>
              )}
            </div>

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">
                Full name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                required
                autoComplete="name"
                placeholder="Your name"
                className="w-full px-4 py-2.5 rounded-brand border border-gray-200 text-gray-900 placeholder:text-gray-400 text-sm
                  focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary
                  transition-all duration-[150ms] ease-out"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                Email address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                autoComplete="email"
                placeholder="you@example.com"
                className="w-full px-4 py-2.5 rounded-brand border border-gray-200 text-gray-900 placeholder:text-gray-400 text-sm
                  focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary
                  transition-all duration-[150ms] ease-out"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1.5">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                autoComplete="new-password"
                placeholder="Min. 8 characters"
                className="w-full px-4 py-2.5 rounded-brand border border-gray-200 text-gray-900 placeholder:text-gray-400 text-sm
                  focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary
                  transition-all duration-[150ms] ease-out"
              />
            </div>

            <button
              type="submit"
              disabled={loading || !role}
              className="w-full gradient-brand text-white font-semibold py-3 rounded-brand shadow-brand text-sm
                hover:opacity-90 active:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed
                transition-all duration-[150ms] ease-out mt-1"
            >
              {loading ? 'Creating your account…' : 'Begin your journey'}
            </button>
          </form>

          <p className="mt-5 text-center text-xs text-gray-400">
            Already a member?{' '}
            <a href="#" className="text-brand-primary hover:underline font-medium">
              Sign in
            </a>
          </p>
        </div>

        <p className="mt-6 text-center text-xs text-gray-400">
          All practitioners on Lit Up are vetted for authenticity.{' '}
          <a href="#" className="text-brand-primary hover:underline">Learn how</a>.
        </p>
      </div>
    </main>
  )
}

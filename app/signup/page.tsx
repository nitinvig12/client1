'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function SignUpPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    sessionStorage.setItem('userName', name)
    setTimeout(() => router.push('/dashboard'), 300)
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-orange-50 px-4 py-12">
      <div className="w-full max-w-md">

        {/* Brand mark */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 rounded-brand gradient-brand shadow-brand flex items-center justify-center mb-4">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M12 2L2 7l10 5 10-5-10-5Z" fill="white" opacity="0.9" />
              <path d="M2 17l10 5 10-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M2 12l10 5 10-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h1 className="font-display text-3xl font-bold text-gradient-brand">
            Create your account
          </h1>
          <p className="mt-1.5 text-gray-500 text-sm">
            Join thousands of teams already using Client1
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-brand shadow-brand p-8">
          <form onSubmit={handleSubmit} className="space-y-5" noValidate>

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
                placeholder="Jane Smith"
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
                placeholder="jane@example.com"
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
              disabled={loading}
              className="w-full gradient-brand text-white font-semibold py-3 rounded-brand shadow-brand text-sm
                hover:opacity-90 active:opacity-80 disabled:opacity-60
                transition-all duration-[150ms] ease-out mt-1"
            >
              {loading ? 'Creating account…' : 'Create account'}
            </button>
          </form>

          <p className="mt-5 text-center text-xs text-gray-400">
            Already have an account?{' '}
            <a href="#" className="text-brand-primary hover:underline font-medium">
              Sign in
            </a>
          </p>
        </div>

        <p className="mt-6 text-center text-xs text-gray-400">
          By signing up you agree to our{' '}
          <a href="#" className="text-brand-primary hover:underline">Terms of Service</a>
          {' '}and{' '}
          <a href="#" className="text-brand-primary hover:underline">Privacy Policy</a>.
        </p>
      </div>
    </main>
  )
}

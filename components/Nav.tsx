'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'

export function SunIcon({ size = 16, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none" aria-hidden="true" className={className}>
      <circle cx="14" cy="14" r="5" fill="currentColor" />
      <line x1="14" y1="2" x2="14" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="14" y1="22" x2="14" y2="26" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="2" y1="14" x2="6" y2="14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="22" y1="14" x2="26" y2="14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="5.5" y1="5.5" x2="8.3" y2="8.3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="19.7" y1="19.7" x2="22.5" y2="22.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="22.5" y1="5.5" x2="19.7" y2="8.3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="8.3" y1="19.7" x2="5.5" y2="22.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

export default function Nav() {
  const [userName, setUserName] = useState<string | null>(null)
  const [role, setRole] = useState<string | null>(null)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    setUserName(sessionStorage.getItem('userName'))
    setRole(sessionStorage.getItem('userRole'))
  }, [pathname])

  const handleSignOut = () => {
    sessionStorage.clear()
    setUserName(null)
    setRole(null)
    router.push('/')
  }

  const dashboardHref = role === 'practitioner' ? '/dashboard/practitioner' : '/dashboard/seeker'
  const isAdmin = pathname.startsWith('/admin')

  return (
    <nav className="bg-white border-b border-gray-100 shadow-brand sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-3.5 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-brand gradient-brand flex items-center justify-center shadow-brand text-white">
            <SunIcon size={16} />
          </div>
          <span className="font-display font-bold text-gray-900 text-lg tracking-tight">Lit Up</span>
        </Link>

        {/* Centre links */}
        {!isAdmin && (
          <div className="hidden md:flex items-center gap-6">
            {[
              { href: '/explore', label: 'Explore' },
              { href: '/missions', label: 'Missions' },
              { href: '/lumi', label: 'Lumi AI ✦' },
              { href: '/community', label: 'Community' },
              { href: '/founders', label: 'Founders' },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`text-sm transition-colors duration-[150ms] ease-out ${
                  pathname === href ? 'text-brand-primary font-medium' : 'text-gray-500 hover:text-brand-primary'
                }`}
              >
                {label}
              </Link>
            ))}
          </div>
        )}

        {/* Right */}
        <div className="flex items-center gap-3">
          {userName ? (
            <>
              <Link
                href={dashboardHref}
                className="text-sm text-gray-500 hover:text-brand-primary transition-colors hidden sm:block"
              >
                Dashboard
              </Link>
              <Link
                href="/referrals"
                className="text-sm text-gray-500 hover:text-brand-primary transition-colors hidden sm:block"
              >
                Referrals
              </Link>
              <div className="w-8 h-8 rounded-full gradient-brand flex items-center justify-center text-white text-sm font-semibold shadow-brand">
                {userName.charAt(0).toUpperCase()}
              </div>
              <button
                onClick={handleSignOut}
                className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link href="/signup" className="text-sm text-gray-500 hover:text-brand-primary transition-colors hidden sm:block">
                Sign in
              </Link>
              <Link
                href="/signup"
                className="gradient-brand text-white text-sm font-semibold px-4 py-2 rounded-brand shadow-brand hover:opacity-90 transition-all duration-[150ms]"
              >
                Join free
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

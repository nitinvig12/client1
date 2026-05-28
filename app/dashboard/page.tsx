'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

const communityStats = [
  { label: 'Vetted Practitioners', value: '240+', note: 'Across 30+ modalities', up: true },
  { label: 'Sessions Facilitated', value: '1.2k+', note: 'And growing every day', up: true },
  { label: 'Your Connections', value: '0', note: 'Start exploring →', up: false },
  { label: 'Profile Complete', value: '33%', note: 'Finish your profile', up: false },
]

const gettingStarted = [
  { label: 'Create your account', done: true },
  { label: 'Complete your profile', done: false },
  { label: 'Explore the directory', done: false },
]

const recentActivity = [
  { action: 'Welcome to Lit Up — your journey begins here', time: 'Just now' },
  { action: 'Directory updated with 12 new practitioners', time: '2 hr ago' },
  { action: 'New modality added: Human Design Readings', time: 'Yesterday' },
  { action: 'Community spotlight: Sound healing practitioners', time: '2 days ago' },
]

export default function DashboardPage() {
  const [userName, setUserName] = useState('there')
  const [role, setRole] = useState<'seeker' | 'practitioner' | null>(null)
  const router = useRouter()

  const handleSignOut = () => {
    sessionStorage.removeItem('userName')
    sessionStorage.removeItem('userRole')
    router.push('/signup')
  }

  useEffect(() => {
    const stored = sessionStorage.getItem('userName')
    const storedRole = sessionStorage.getItem('userRole') as 'seeker' | 'practitioner' | null
    if (stored) setUserName(stored.split(' ')[0])
    if (storedRole) setRole(storedRole)
  }, [])

  const initial = userName.charAt(0).toUpperCase()

  const roleLabel = role === 'practitioner' ? 'Practitioner' : 'Seeker'
  const ctaHeading = role === 'practitioner'
    ? 'Set up your practitioner profile'
    : 'Find your perfect healer'
  const ctaBody = role === 'practitioner'
    ? 'Add your modalities, availability, and bio so seekers can discover and book you.'
    : 'Browse our vetted directory of lightworkers, healers, and spiritual guides — filtered by what you need.'
  const ctaButton = role === 'practitioner' ? 'Build my profile →' : 'Explore the directory →'

  return (
    <div className="min-h-screen bg-gray-50 font-body">

      {/* Top Nav */}
      <nav className="bg-white border-b border-gray-100 shadow-brand sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Sun mark */}
            <div className="w-8 h-8 rounded-brand gradient-brand flex items-center justify-center shadow-brand">
              <svg width="16" height="16" viewBox="0 0 28 28" fill="none" aria-hidden="true">
                <circle cx="14" cy="14" r="5" fill="white" />
                <line x1="14" y1="2" x2="14" y2="6" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                <line x1="14" y1="22" x2="14" y2="26" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                <line x1="2" y1="14" x2="6" y2="14" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                <line x1="22" y1="14" x2="26" y2="14" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                <line x1="5.5" y1="5.5" x2="8.3" y2="8.3" stroke="white" strokeWidth="2" strokeLinecap="round" />
                <line x1="19.7" y1="19.7" x2="22.5" y2="22.5" stroke="white" strokeWidth="2" strokeLinecap="round" />
                <line x1="22.5" y1="5.5" x2="19.7" y2="8.3" stroke="white" strokeWidth="2" strokeLinecap="round" />
                <line x1="8.3" y1="19.7" x2="5.5" y2="22.5" stroke="white" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <span className="font-display font-bold text-gray-900 text-lg tracking-tight">Lit Up</span>
          </div>

          <div className="flex items-center gap-4">
            <button className="text-sm text-gray-500 hover:text-brand-primary transition-colors duration-[150ms] ease-out hidden sm:block">
              Directory
            </button>
            <button className="text-sm text-gray-500 hover:text-brand-primary transition-colors duration-[150ms] ease-out hidden sm:block">
              Community
            </button>
            <div className="flex items-center gap-2.5">
              {role && (
                <span className="text-xs font-medium text-brand-primary bg-purple-50 px-2.5 py-1 rounded-full hidden sm:block">
                  {roleLabel}
                </span>
              )}
              <div className="w-9 h-9 rounded-full gradient-brand flex items-center justify-center text-white font-semibold text-sm shadow-brand">
                {initial}
              </div>
              <button
                onClick={handleSignOut}
                className="text-sm text-gray-400 hover:text-gray-600 transition-colors duration-[150ms] ease-out ml-1"
                title="Sign out"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main */}
      <main className="max-w-6xl mx-auto px-6 py-10">

        {/* Welcome */}
        <div className="mb-10">
          <p className="text-sm text-brand-primary font-medium mb-1">✨ Welcome to your sacred space</p>
          <h1 className="font-display text-4xl font-bold text-gray-900 leading-tight">
            You&rsquo;re lit up,{' '}
            <span className="text-gradient-brand">{userName}</span>!
          </h1>
          <p className="mt-2 text-gray-500 text-sm">
            {role === 'practitioner'
              ? 'Your practitioner journey starts here. Let\'s help seekers find you.'
              : 'Your healing journey starts here. Let\'s help you find the right guide.'}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {communityStats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-brand shadow-brand p-5 border border-gray-100 hover:shadow-md transition-shadow duration-[150ms] ease-out"
            >
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
                {stat.label}
              </p>
              <p className="font-display text-3xl font-bold text-gray-900 mb-1">
                {stat.value}
              </p>
              <p className={`text-xs font-medium ${stat.up ? 'text-brand-primary' : 'text-gray-400'}`}>
                {stat.note}
              </p>
            </div>
          ))}
        </div>

        {/* Two-col section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">

          {/* Role-aware CTA */}
          <div className="gradient-brand rounded-brand p-7 text-white shadow-brand relative overflow-hidden">
            <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-white/10" />
            <div className="absolute -bottom-10 -right-4 w-28 h-28 rounded-full bg-white/10" />
            <div className="relative">
              <h2 className="font-display text-2xl font-bold mb-2 leading-snug">
                {ctaHeading}
              </h2>
              <p className="text-sm text-white/80 mb-5 leading-relaxed">
                {ctaBody}
              </p>
              <button className="bg-white text-brand-primary font-semibold text-sm px-5 py-2.5 rounded-brand shadow-brand
                hover:bg-white/90 active:bg-white/80 transition-all duration-[150ms] ease-out">
                {ctaButton}
              </button>
            </div>
          </div>

          {/* Getting started checklist */}
          <div className="bg-white rounded-brand shadow-brand border border-gray-100 p-7">
            <h2 className="font-display text-xl font-bold text-gray-900 mb-1">
              Getting started
            </h2>
            <p className="text-sm text-gray-500 mb-5 leading-relaxed">
              Complete these steps to make the most of Lit Up.
            </p>
            <div className="space-y-3">
              {gettingStarted.map((item) => (
                <div key={item.label} className="flex items-center gap-3 text-sm">
                  <span className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold
                    ${item.done ? 'gradient-brand text-white' : 'border-2 border-gray-200 text-gray-300'}`}>
                    {item.done && '✓'}
                  </span>
                  <span className={item.done ? 'text-gray-400 line-through' : 'text-gray-700'}>
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-5">
              <div className="flex justify-between text-xs text-gray-400 mb-1">
                <span>Progress</span>
                <span>33%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-1.5">
                <div className="gradient-brand h-1.5 rounded-full" style={{ width: '33%' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Activity */}
        <div className="bg-white rounded-brand shadow-brand border border-gray-100 p-7">
          <h2 className="font-display text-xl font-bold text-gray-900 mb-5">Community Updates</h2>
          <ul className="space-y-4">
            {recentActivity.map((item, i) => (
              <li key={i} className="flex items-center gap-4">
                <div className="w-2 h-2 rounded-full gradient-brand flex-shrink-0" />
                <span className="text-sm text-gray-700 flex-1">{item.action}</span>
                <span className="text-xs text-gray-400 whitespace-nowrap">{item.time}</span>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  )
}

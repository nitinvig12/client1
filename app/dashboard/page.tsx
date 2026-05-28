'use client'

import { useEffect, useState } from 'react'

const stats = [
  { label: 'Active Projects', value: '12', note: '+3 this month', up: true },
  { label: 'Tasks Completed', value: '84', note: '+12 this week', up: true },
  { label: 'Team Members', value: '6', note: '2 pending invite', up: false },
  { label: 'Hours Saved', value: '38h', note: 'vs last month', up: true },
]

const recentActivity = [
  { action: 'Project "Alpha Launch" created', time: '2 min ago' },
  { action: 'Design review completed', time: '1 hr ago' },
  { action: 'New team member invited', time: '3 hr ago' },
  { action: 'Sprint planning scheduled', time: 'Yesterday' },
]

export default function DashboardPage() {
  const [userName, setUserName] = useState('there')

  useEffect(() => {
    const stored = sessionStorage.getItem('userName')
    if (stored) setUserName(stored.split(' ')[0])
  }, [])

  const initial = userName.charAt(0).toUpperCase()

  return (
    <div className="min-h-screen bg-gray-50 font-body">

      {/* Top Nav */}
      <nav className="bg-white border-b border-gray-100 shadow-brand sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-brand gradient-brand flex items-center justify-center shadow-brand">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M12 2L2 7l10 5 10-5-10-5Z" fill="white" opacity="0.9" />
                <path d="M2 17l10 5 10-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2 12l10 5 10-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="font-display font-bold text-gray-900 text-lg tracking-tight">Client1</span>
          </div>

          <div className="flex items-center gap-4">
            <button className="text-sm text-gray-500 hover:text-brand-primary transition-colors duration-[150ms] ease-out hidden sm:block">
              Docs
            </button>
            <button className="text-sm text-gray-500 hover:text-brand-primary transition-colors duration-[150ms] ease-out hidden sm:block">
              Support
            </button>
            <div className="flex items-center gap-2.5">
              <span className="text-sm text-gray-600 hidden sm:block">{userName}</span>
              <div className="w-9 h-9 rounded-full gradient-brand flex items-center justify-center text-white font-semibold text-sm shadow-brand">
                {initial}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main */}
      <main className="max-w-6xl mx-auto px-6 py-10">

        {/* Welcome hero */}
        <div className="mb-10">
          <p className="text-sm text-brand-primary font-medium mb-1">Good to see you</p>
          <h1 className="font-display text-4xl font-bold text-gray-900 leading-tight">
            Welcome back,{' '}
            <span className="text-gradient-brand">{userName}</span>! 👋
          </h1>
          <p className="mt-2 text-gray-500 text-sm">
            Here&rsquo;s what&rsquo;s happening with your workspace today.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => (
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
                {stat.up ? '↑ ' : ''}{stat.note}
              </p>
            </div>
          ))}
        </div>

        {/* Two-col section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">

          {/* CTA card */}
          <div className="gradient-brand rounded-brand p-7 text-white shadow-brand relative overflow-hidden">
            {/* decorative circle */}
            <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-white/10" />
            <div className="absolute -bottom-10 -right-4 w-28 h-28 rounded-full bg-white/10" />
            <div className="relative">
              <h2 className="font-display text-2xl font-bold mb-2 leading-snug">
                Start your first project
              </h2>
              <p className="text-sm text-white/80 mb-5 leading-relaxed">
                Set up a workspace, invite your team, and hit the ground running.
              </p>
              <button className="bg-white text-brand-primary font-semibold text-sm px-5 py-2.5 rounded-brand shadow-brand
                hover:bg-white/90 active:bg-white/80 transition-all duration-[150ms] ease-out">
                Get started →
              </button>
            </div>
          </div>

          {/* Profile completion */}
          <div className="bg-white rounded-brand shadow-brand border border-gray-100 p-7">
            <h2 className="font-display text-xl font-bold text-gray-900 mb-1">
              Complete your profile
            </h2>
            <p className="text-sm text-gray-500 mb-5 leading-relaxed">
              Add a photo and fill in your details to personalise your workspace.
            </p>
            <div className="space-y-3">
              {[
                { label: 'Add profile photo', done: false },
                { label: 'Verify email address', done: true },
                { label: 'Set your timezone', done: false },
              ].map((item) => (
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
                <div className="gradient-brand h-1.5 rounded-full transition-all duration-[150ms] ease-out" style={{ width: '33%' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Recent activity */}
        <div className="bg-white rounded-brand shadow-brand border border-gray-100 p-7">
          <h2 className="font-display text-xl font-bold text-gray-900 mb-5">Recent Activity</h2>
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

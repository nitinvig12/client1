'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Nav from '@/components/Nav'

const earningsData = [
  { month: 'Aug', amount: 1240 },
  { month: 'Sep', amount: 1680 },
  { month: 'Oct', amount: 1950 },
  { month: 'Nov', amount: 2140 },
]

const litScoreHistory = [8.1, 8.4, 8.7, 8.9, 9.0, 9.1, 9.2, 9.4]

const recentBookings = [
  { client: 'A.W.', type: '60 min Reiki', date: 'Mon 18 Nov, 10:00 AM', status: 'confirmed' },
  { client: 'J.L.', type: '90 min Breathwork', date: 'Wed 20 Nov, 3:00 PM', status: 'confirmed' },
  { client: 'S.M.', type: 'Vibe Check', date: 'Thu 21 Nov, 11:00 AM', status: 'pending' },
]

const profileHealth = [
  { label: 'Bio written', done: true },
  { label: 'Headshot uploaded', done: true },
  { label: 'Modalities set', done: true },
  { label: 'Calendar synced', done: false },
  { label: 'Pricing configured', done: true },
  { label: 'Credential uploaded', done: false },
]

export default function PractitionerDashboard() {
  const [name, setName] = useState('Practitioner')

  useEffect(() => {
    const stored = sessionStorage.getItem('userName')
    if (stored) setName(stored.split(' ')[0])
  }, [])

  const healthScore = Math.round((profileHealth.filter(x => x.done).length / profileHealth.length) * 100)
  const maxEarning = Math.max(...earningsData.map(d => d.amount))

  return (
    <div className="min-h-screen bg-gray-50 font-body">
      <Nav />
      <main className="max-w-6xl mx-auto px-6 py-10">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-10 gap-4">
          <div>
            <p className="text-sm text-brand-primary font-medium mb-1">Practitioner Studio</p>
            <h1 className="font-display text-4xl font-bold text-gray-900">
              Hello, <span className="text-gradient-brand">{name}</span>
            </h1>
            <p className="text-gray-500 text-sm mt-1.5">Your practice at a glance.</p>
          </div>
          <div className="flex gap-3">
            <Link href="/practitioners/1" className="border border-brand-primary text-brand-primary font-semibold px-4 py-2.5 rounded-brand text-sm hover:bg-purple-50 transition-all duration-[150ms]">
              View Profile
            </Link>
            <Link href="/onboarding" className="gradient-brand text-white font-semibold px-4 py-2.5 rounded-brand shadow-brand text-sm hover:opacity-90 transition-all duration-[150ms]">
              Edit Profile
            </Link>
          </div>
        </div>

        {/* KPI cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'LitScore™', value: '9.4', sub: '↑ 0.3 this month', accent: 'text-amber-500' },
            { label: 'Sessions (Nov)', value: '14', sub: '+4 vs October', accent: 'text-brand-primary' },
            { label: 'Earnings (Nov)', value: '$2,140', sub: '+9.7% vs October', accent: 'text-green-600' },
            { label: 'Profile Health', value: `${healthScore}%`, sub: `${profileHealth.filter(x => x.done).length}/${profileHealth.length} steps done`, accent: 'text-brand-primary' },
          ].map((k) => (
            <div key={k.label} className="bg-white rounded-brand shadow-brand border border-gray-100 p-5">
              <p className="text-xs text-gray-400 uppercase tracking-wide mb-2">{k.label}</p>
              <p className={`font-display text-3xl font-bold mb-1 ${k.accent}`}>{k.value}</p>
              <p className="text-xs text-gray-400">{k.sub}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left col */}
          <div className="lg:col-span-2 space-y-6">
            {/* Upcoming sessions */}
            <div className="bg-white rounded-brand shadow-brand border border-gray-100 p-6">
              <h2 className="font-display text-xl font-bold text-gray-900 mb-4">Upcoming Sessions</h2>
              <div className="space-y-3">
                {recentBookings.map((b, i) => (
                  <div key={i} className="flex items-center gap-4 p-3 rounded-brand border border-gray-100">
                    <div className="w-9 h-9 rounded-full gradient-brand flex items-center justify-center text-white font-semibold text-sm flex-shrink-0 shadow-brand">
                      {b.client}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-900">{b.type}</p>
                      <p className="text-xs text-gray-400">{b.date}</p>
                    </div>
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                      b.status === 'confirmed' ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'
                    }`}>
                      {b.status}
                    </span>
                    {b.status === 'confirmed' && (
                      <button className="text-xs gradient-brand text-white px-3 py-1.5 rounded-brand font-semibold hover:opacity-90 transition-all">Join</button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Earnings chart */}
            <div className="bg-white rounded-brand shadow-brand border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-display text-xl font-bold text-gray-900">Earnings Trend</h2>
                <span className="text-xs text-green-600 font-semibold bg-green-50 px-2.5 py-1 rounded-full">↑ 9.7% MoM</span>
              </div>
              <div className="flex items-end gap-3 h-32">
                {earningsData.map((d) => (
                  <div key={d.month} className="flex-1 flex flex-col items-center gap-1">
                    <span className="text-xs font-semibold text-gray-700">${(d.amount / 1000).toFixed(1)}k</span>
                    <div
                      className="w-full gradient-brand rounded-t-brand"
                      style={{ height: `${(d.amount / maxEarning) * 100}%` }}
                    />
                    <span className="text-xs text-gray-400">{d.month}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* LitScore trend */}
            <div className="bg-white rounded-brand shadow-brand border border-gray-100 p-6">
              <h2 className="font-display text-xl font-bold text-gray-900 mb-4">LitScore™ Trend</h2>
              <div className="flex items-end gap-2 h-20">
                {litScoreHistory.map((score, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div
                      className="w-full rounded-t bg-amber-400"
                      style={{ height: `${(score / 10) * 100}%` }}
                    />
                    <span className="text-xs text-gray-300">{i + 1}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-400 mt-2">Last 8 months · Current: <span className="font-bold text-amber-600">9.4</span></p>
            </div>
          </div>

          {/* Right sidebar */}
          <div className="space-y-5">
            {/* Profile health */}
            <div className="bg-white rounded-brand shadow-brand border border-gray-100 p-5">
              <h3 className="font-display font-bold text-gray-900 mb-1">Profile Health</h3>
              <p className="text-xs text-gray-400 mb-4">Complete your profile to appear higher in search results.</p>
              <div className="w-full bg-gray-100 rounded-full h-2 mb-4">
                <div className="gradient-brand h-2 rounded-full" style={{ width: `${healthScore}%` }} />
              </div>
              <div className="space-y-2">
                {profileHealth.map(item => (
                  <div key={item.label} className="flex items-center gap-2.5 text-sm">
                    <span className={`w-4 h-4 rounded-full flex items-center justify-center text-xs flex-shrink-0 ${
                      item.done ? 'gradient-brand text-white' : 'border-2 border-gray-200'
                    }`}>
                      {item.done ? '✓' : ''}
                    </span>
                    <span className={item.done ? 'text-gray-400 line-through text-xs' : 'text-gray-700 text-xs'}>{item.label}</span>
                  </div>
                ))}
              </div>
              <Link href="/onboarding" className="mt-4 block w-full gradient-brand text-white text-xs font-semibold py-2.5 rounded-brand text-center hover:opacity-90 transition-all">
                Complete Profile →
              </Link>
            </div>

            {/* Quick actions */}
            <div className="bg-white rounded-brand shadow-brand border border-gray-100 p-5 space-y-3">
              <h3 className="font-display font-bold text-gray-900 mb-2">Quick Actions</h3>
              {[
                { label: 'Invite Client to Review', icon: '✉' },
                { label: 'Sync Google Calendar', icon: '📅' },
                { label: 'View LitScore Details', icon: '★' },
                { label: 'Withdraw Earnings', icon: '$' },
              ].map(action => (
                <button key={action.label} className="w-full flex items-center gap-3 p-3 rounded-brand border border-gray-100 text-left hover:border-brand-primary/30 hover:bg-purple-50/30 transition-all duration-[150ms]">
                  <span className="text-base w-5 text-center">{action.icon}</span>
                  <span className="text-sm text-gray-700">{action.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

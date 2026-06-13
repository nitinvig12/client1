'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Nav from '@/components/Nav'
import { practitioners, missions } from '@/lib/mockData'

const upcomingSessions = [
  { id: '1', practitioner: 'Aria Moonstone', modality: 'Reiki', date: 'Mon 18 Nov', time: '10:00 AM', type: '60 min', avatarColor: 'from-violet-400 to-purple-600' },
  { id: '2', practitioner: 'Kai Sundaram', modality: 'Breathwork', date: 'Wed 20 Nov', time: '3:00 PM', type: '90 min', avatarColor: 'from-blue-400 to-cyan-500' },
]

export default function SeekerDashboard() {
  const [name, setName] = useState('Friend')
  const karma = 320
  const nextMilestone = 500
  const karmaProgress = Math.round((karma / nextMilestone) * 100)

  useEffect(() => {
    const stored = sessionStorage.getItem('userName')
    if (stored) setName(stored.split(' ')[0])
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 font-body">
      <Nav />
      <main className="max-w-6xl mx-auto px-6 py-10">

        {/* Welcome */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-10 gap-4">
          <div>
            <p className="text-sm text-brand-primary font-medium mb-1">✨ Your healing journey</p>
            <h1 className="font-display text-4xl font-bold text-gray-900">
              Welcome back, <span className="text-gradient-brand">{name}</span>
            </h1>
            <p className="text-gray-500 text-sm mt-1.5">Here's everything happening in your space.</p>
          </div>
          <div className="flex gap-3">
            <Link href="/lumi" className="gradient-brand text-white font-semibold px-5 py-2.5 rounded-brand shadow-brand text-sm hover:opacity-90 transition-all duration-[150ms]">
              Chat with Lumi ✦
            </Link>
            <Link href="/explore" className="border border-brand-primary text-brand-primary font-semibold px-5 py-2.5 rounded-brand text-sm hover:bg-purple-50 transition-all duration-[150ms]">
              Find a Practitioner
            </Link>
          </div>
        </div>

        {/* Karma bar */}
        <div className="bg-white rounded-brand shadow-brand border border-gray-100 p-5 mb-8 flex items-center gap-5">
          <div className="w-12 h-12 rounded-full gradient-brand flex items-center justify-center text-white font-bold text-lg flex-shrink-0 shadow-brand">
            ✦
          </div>
          <div className="flex-1">
            <div className="flex justify-between text-sm mb-1">
              <span className="font-semibold text-gray-900">{karma} Karma Points</span>
              <span className="text-gray-400">{nextMilestone - karma} to next milestone</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2">
              <div className="gradient-brand h-2 rounded-full" style={{ width: `${karmaProgress}%` }} />
            </div>
          </div>
          <div className="text-right hidden sm:block">
            <p className="text-xs text-gray-400">Next reward</p>
            <p className="text-sm font-semibold text-brand-primary">Free 30-min Session</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Upcoming sessions */}
          <div className="lg:col-span-2">
            <h2 className="font-display text-xl font-bold text-gray-900 mb-4">Upcoming Sessions</h2>
            {upcomingSessions.length === 0 ? (
              <div className="bg-white rounded-brand shadow-brand border border-gray-100 p-10 text-center">
                <p className="text-4xl mb-3">🌿</p>
                <p className="font-semibold text-gray-700">No sessions booked yet</p>
                <Link href="/explore" className="text-sm text-brand-primary hover:underline mt-2 block">Browse practitioners →</Link>
              </div>
            ) : (
              <div className="space-y-4">
                {upcomingSessions.map((s) => (
                  <div key={s.id} className="bg-white rounded-brand shadow-brand border border-gray-100 p-5 flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-brand bg-gradient-to-br ${s.avatarColor} flex items-center justify-center text-white font-bold text-lg flex-shrink-0`}>
                      {s.practitioner.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 text-sm">{s.practitioner}</p>
                      <p className="text-xs text-gray-400">{s.modality} · {s.type}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-gray-900">{s.date}</p>
                      <p className="text-xs text-gray-400">{s.time}</p>
                    </div>
                    <button className="gradient-brand text-white text-xs font-semibold px-4 py-2 rounded-brand shadow-brand hover:opacity-90 transition-all duration-[150ms]">
                      Join
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Recommended practitioners */}
            <h2 className="font-display text-xl font-bold text-gray-900 mt-8 mb-4">Recommended for You</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {practitioners.slice(0, 3).map((p) => (
                <Link
                  key={p.id}
                  href={`/practitioners/${p.id}`}
                  className="bg-white rounded-brand shadow-brand border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-[150ms]"
                >
                  <div className={`h-16 bg-gradient-to-br ${p.avatarColor} flex items-end px-3 pb-2`}>
                    <div className="w-8 h-8 rounded-full bg-white/25 flex items-center justify-center text-white font-bold text-sm">{p.name.charAt(0)}</div>
                  </div>
                  <div className="p-3">
                    <p className="font-semibold text-gray-900 text-xs">{p.name}</p>
                    <p className="text-xs text-gray-400 mb-2">{p.modalities[0]}</p>
                    <span className="text-xs font-bold text-amber-600">★ {p.litScore}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Right sidebar */}
          <div className="space-y-5">
            {/* Active missions */}
            <div className="bg-white rounded-brand shadow-brand border border-gray-100 p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display font-bold text-gray-900">My Missions</h3>
                <Link href="/missions" className="text-xs text-brand-primary hover:underline">View all</Link>
              </div>
              <div className="space-y-3">
                {missions.filter(m => m.status === 'active').map(m => (
                  <div key={m.id} className="p-3 rounded-brand border border-gray-100">
                    <p className="text-xs font-semibold text-gray-900 mb-1">{m.title}</p>
                    <div className="flex justify-between text-xs text-gray-400 mb-1.5">
                      <span>{m.progress}% complete</span>
                      <span className="text-brand-primary">+{m.karma} Karma</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-1">
                      <div className="gradient-brand h-1 rounded-full" style={{ width: `${m.progress}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Karma breakdown */}
            <div className="bg-white rounded-brand shadow-brand border border-gray-100 p-5">
              <h3 className="font-display font-bold text-gray-900 mb-4">Karma Earned</h3>
              <div className="space-y-2">
                {[
                  { action: 'Account created', pts: 50 },
                  { action: 'First session booked', pts: 100 },
                  { action: 'Reflection submitted', pts: 75 },
                  { action: 'Mission joined', pts: 95 },
                ].map(item => (
                  <div key={item.action} className="flex justify-between items-center text-sm">
                    <span className="text-gray-600 text-xs">{item.action}</span>
                    <span className="font-semibold text-brand-primary text-xs">+{item.pts}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

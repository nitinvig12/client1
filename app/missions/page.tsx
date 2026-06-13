'use client'

import { useState } from 'react'
import Nav from '@/components/Nav'
import { missions } from '@/lib/mockData'

type StatusFilter = 'all' | 'active' | 'upcoming' | 'completed'

export default function MissionsPage() {
  const [filter, setFilter] = useState<StatusFilter>('all')

  const filtered = missions.filter(m => filter === 'all' || m.status === filter)

  return (
    <div className="min-h-screen bg-gray-50 font-body">
      <Nav />

      {/* Header */}
      <div className="gradient-brand py-16 px-6 text-center relative overflow-hidden">
        <div className="absolute -top-10 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-10 right-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        <div className="relative">
          <p className="text-white/70 text-sm font-medium mb-2">Community</p>
          <h1 className="font-display text-4xl font-bold text-white mb-3">Missions Hub</h1>
          <p className="text-white/80 text-sm max-w-xl mx-auto leading-relaxed">
            Join collaborative healing projects with practitioners and seekers worldwide. Complete missions, earn Karma, and create real-world impact.
          </p>
        </div>
      </div>

      {/* Karma banner */}
      <div className="bg-white border-b border-gray-100 shadow-brand">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            {[
              { label: 'Your Karma', value: '320 pts' },
              { label: 'Missions Completed', value: '2' },
              { label: 'Next Milestone', value: '500 pts' },
            ].map(s => (
              <div key={s.label} className="text-center">
                <p className="font-display font-bold text-gray-900 text-lg">{s.value}</p>
                <p className="text-xs text-gray-400">{s.label}</p>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-3 hidden sm:flex">
            <div className="w-40 bg-gray-100 rounded-full h-2">
              <div className="gradient-brand h-2 rounded-full" style={{ width: '64%' }} />
            </div>
            <span className="text-xs text-gray-500">64% to next milestone</span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Filter tabs */}
        <div className="flex gap-2 mb-8">
          {(['all', 'active', 'upcoming', 'completed'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-brand text-sm font-medium transition-all duration-[150ms] capitalize ${
                filter === f
                  ? 'gradient-brand text-white shadow-brand'
                  : 'bg-white border border-gray-200 text-gray-600 hover:border-brand-primary hover:text-brand-primary'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Mission cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {filtered.map((m) => (
            <div key={m.id} className="bg-white rounded-brand shadow-brand border border-gray-100 p-7 hover:shadow-md transition-shadow duration-[150ms]">
              <div className="flex items-start justify-between mb-4">
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${m.typeColor}`}>{m.type}</span>
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                    m.status === 'active' ? 'bg-green-50 text-green-700' :
                    m.status === 'upcoming' ? 'bg-blue-50 text-blue-700' :
                    'bg-gray-100 text-gray-500'
                  }`}>
                    {m.status === 'active' ? '● Active' : m.status === 'upcoming' ? '◎ Upcoming' : '✓ Completed'}
                  </span>
                </div>
              </div>

              <h2 className="font-display text-xl font-bold text-gray-900 mb-2">{m.title}</h2>
              <p className="text-sm text-gray-500 leading-relaxed mb-5">{m.description}</p>

              {/* Stages */}
              <div className="space-y-1.5 mb-5">
                {m.stages.map((stage, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-gray-500">
                    <span className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 text-xs ${
                      m.progress > (i / m.stages.length) * 100
                        ? 'gradient-brand text-white'
                        : 'border border-gray-200 text-gray-300'
                    }`}>
                      {m.progress > (i / m.stages.length) * 100 ? '✓' : i + 1}
                    </span>
                    {stage}
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between text-xs text-gray-400 mb-3">
                <span>{m.practitioners} practitioners · {m.seekers} seekers</span>
                <span className="font-bold text-brand-primary">+{m.karma} Karma on completion</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-1.5 mb-4">
                <div className="gradient-brand h-1.5 rounded-full transition-all duration-[150ms]" style={{ width: `${m.progress}%` }} />
              </div>
              {m.status !== 'completed' ? (
                <button className="w-full gradient-brand text-white font-semibold py-2.5 rounded-brand shadow-brand text-sm hover:opacity-90 transition-all duration-[150ms]">
                  {m.status === 'active' ? 'Join This Mission' : 'Register Interest'}
                </button>
              ) : (
                <p className="text-center text-xs text-gray-400 py-2">Mission complete · Karma awarded</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

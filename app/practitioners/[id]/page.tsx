'use client'

import { useState, use } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Nav from '@/components/Nav'
import FounderBadge from '@/components/FounderBadge'
import { practitioners, testimonials } from '@/lib/mockData'

const availability = [
  { day: 'Mon', slots: ['10:00 AM', '2:00 PM', '4:00 PM'] },
  { day: 'Tue', slots: ['11:00 AM', '3:00 PM'] },
  { day: 'Wed', slots: ['9:00 AM', '1:00 PM', '5:00 PM'] },
  { day: 'Thu', slots: [] },
  { day: 'Fri', slots: ['10:00 AM', '12:00 PM', '4:00 PM'] },
]

const scoreComponents = [
  { label: 'Bayesian Rating', value: 35 },
  { label: 'Wilson Score', value: 25 },
  { label: 'Aspect Sentiment', value: 15 },
  { label: 'Repeat Bookings', value: 15 },
  { label: 'Freshness', value: 8 },
  { label: 'Verified Badge', value: 2 },
]

export default function PractitionerProfile({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const p = practitioners.find(x => x.id === id)
  if (!p) notFound()

  const [tab, setTab] = useState<'overview' | 'testimonials' | 'availability'>('overview')
  const [showScoreTooltip, setShowScoreTooltip] = useState(false)
  const [introWatched, setIntroWatched] = useState(false)
  const reviews = testimonials.filter(t => t.practitionerId === p.id)
  const bookingLocked = !!p.introVideoUrl && !introWatched

  return (
    <div className="min-h-screen bg-gray-50 font-body">
      <Nav />

      {/* Hero banner */}
      <div className={`relative h-52 bg-gradient-to-br ${p.avatarColor}`}>
        <div className="absolute inset-0 bg-black/10" />
        <div className="max-w-6xl mx-auto px-6 h-full flex items-end pb-6 relative">
          <div className="flex items-end gap-5">
            <div className="w-20 h-20 rounded-brand bg-white/20 border-2 border-white/40 flex items-center justify-center text-white font-display font-bold text-3xl">
              {p.name.charAt(0)}
            </div>
            <div className="pb-1">
              <div className="flex items-center gap-2 mb-1">
                <h1 className="font-display text-2xl font-bold text-white">{p.name}</h1>
                {p.verified && (
                  <span className="bg-white/20 text-white text-xs font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M9 12l2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" /></svg>
                    Verified
                  </span>
                )}
                {p.founder && <FounderBadge />}
                {p.fsaEligible && (
                  <span className="bg-white/20 text-white text-xs font-semibold px-2.5 py-0.5 rounded-full">FSA Eligible</span>
                )}
              </div>
              <p className="text-white/80 text-sm">{p.modality} · {p.location}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8 grid lg:grid-cols-3 gap-8">
        {/* Left: main content */}
        <div className="lg:col-span-2">
          {/* LitScore widget */}
          <div className="bg-white rounded-brand shadow-brand border border-gray-100 p-5 mb-6 flex items-center gap-5">
            <div className="text-center">
              <p className="font-display text-5xl font-bold text-amber-500">{p.litScore}</p>
              <p className="text-xs text-gray-400 mt-0.5">LitScore™</p>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex-1 bg-gray-100 rounded-full h-2">
                  <div className="bg-amber-400 h-2 rounded-full" style={{ width: `${p.litScore * 10}%` }} />
                </div>
                <span className="text-xs text-gray-500">/ 10</span>
              </div>
              <p className="text-xs text-gray-500">{p.reviews} verified reviews · {Math.round(p.litScore * 10)}th percentile</p>
            </div>
            <button
              onClick={() => setShowScoreTooltip(v => !v)}
              className="text-xs text-brand-primary hover:underline flex-shrink-0"
            >
              Why this score?
            </button>
          </div>

          {/* Intro video */}
          {p.introVideoUrl && (
            <div className="bg-white rounded-brand shadow-brand border border-gray-100 p-5 mb-6">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-semibold text-gray-900">5-min Intro Video</p>
                {!introWatched && <span className="text-xs text-amber-600 font-medium">Watch to unlock booking</span>}
                {introWatched && <span className="text-xs text-green-600 font-medium">✓ Watched</span>}
              </div>
              <button
                onClick={() => setIntroWatched(true)}
                className="w-full aspect-video rounded-brand bg-gray-900 flex items-center justify-center group relative overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${p.avatarColor} opacity-30`} />
                <span className="relative w-14 h-14 rounded-full bg-white/90 flex items-center justify-center text-gray-900 group-hover:scale-105 transition-transform duration-[150ms]">
                  ▶
                </span>
              </button>
              <p className="text-xs text-gray-400 mt-2">Required before paid booking · 720p · {p.name.split(' ')[0]}&rsquo;s introduction</p>
            </div>
          )}

          {showScoreTooltip && (
            <div className="bg-white rounded-brand shadow-brand border border-gray-100 p-5 mb-6">
              <p className="text-sm font-semibold text-gray-900 mb-3">LitScore™ Component Weights</p>
              <div className="space-y-2">
                {scoreComponents.map(c => (
                  <div key={c.label} className="flex items-center gap-3">
                    <span className="text-xs text-gray-500 w-32">{c.label}</span>
                    <div className="flex-1 bg-gray-100 rounded-full h-1.5">
                      <div className="gradient-brand h-1.5 rounded-full" style={{ width: `${c.value * 3}%` }} />
                    </div>
                    <span className="text-xs font-semibold text-gray-700 w-8 text-right">{c.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tabs */}
          <div className="flex border-b border-gray-200 mb-6">
            {(['overview', 'testimonials', 'availability'] as const).map(t => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-5 py-3 text-sm font-medium capitalize transition-colors duration-[150ms] border-b-2 -mb-px ${
                  tab === t ? 'border-brand-primary text-brand-primary' : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Overview */}
          {tab === 'overview' && (
            <div className="space-y-6">
              <div className="bg-white rounded-brand shadow-brand border border-gray-100 p-6">
                <h2 className="font-display text-xl font-bold text-gray-900 mb-3">About {p.name.split(' ')[0]}</h2>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">{p.bio}</p>
                <p className="text-xs text-gray-400"><span className="font-semibold text-gray-600">Specialities: </span>{p.specialties}</p>
              </div>
              <div className="bg-white rounded-brand shadow-brand border border-gray-100 p-6">
                <h2 className="font-display text-xl font-bold text-gray-900 mb-4">Modalities</h2>
                <div className="flex flex-wrap gap-2">
                  {p.modalities.map(m => (
                    <span key={m} className="text-sm bg-purple-50 text-brand-primary px-3 py-1.5 rounded-full font-medium">{m}</span>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-brand shadow-brand border border-gray-100 p-6">
                <h2 className="font-display text-xl font-bold text-gray-900 mb-3">Languages</h2>
                <div className="flex gap-2">
                  {p.languages.map(l => (
                    <span key={l} className="text-sm bg-gray-50 text-gray-600 px-3 py-1.5 rounded-full border border-gray-200">{l}</span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Testimonials */}
          {tab === 'testimonials' && (
            <div className="space-y-4">
              {(reviews.length > 0 ? reviews : [
                { id: 'a', author: 'Alex W.', rating: 5, resonance: 89, wouldBook: true, text: 'Truly transformational. I felt heard and supported throughout.', source: 'lit-up', date: '3 weeks ago' },
                { id: 'b', author: 'Jordan L.', rating: 4, resonance: 76, wouldBook: true, text: 'Gentle, insightful, and professional. I will be returning.', source: 'invite', date: '5 weeks ago' },
              ]).map((t) => (
                <div key={t.id} className="bg-white rounded-brand shadow-brand border border-gray-100 p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-semibold text-sm text-gray-900">{t.author}</p>
                      <p className="text-xs text-gray-400">{t.date}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <span key={i} className={`text-sm ${i < t.rating ? 'text-amber-400' : 'text-gray-200'}`}>★</span>
                        ))}
                      </div>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${t.source === 'lit-up' ? 'bg-purple-50 text-brand-primary' : 'bg-green-50 text-green-700'}`}>
                        {t.source === 'lit-up' ? 'Lit Up Verified' : 'Invite Verified'}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed mb-3">&ldquo;{t.text}&rdquo;</p>
                  <div className="flex items-center gap-4 text-xs text-gray-400">
                    <span>Energy resonance: <span className="font-semibold text-brand-primary">{t.resonance}/100</span></span>
                    <span>Would book again: <span className="font-semibold text-green-600">{t.wouldBook ? 'Yes' : 'No'}</span></span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Availability */}
          {tab === 'availability' && (
            <div className="bg-white rounded-brand shadow-brand border border-gray-100 p-6">
              <p className="text-sm text-gray-500 mb-5">Next 5 business days · All times in your local timezone</p>
              <div className="grid grid-cols-5 gap-3">
                {availability.map(({ day, slots }) => (
                  <div key={day}>
                    <p className="text-xs font-semibold text-gray-400 text-center mb-2">{day}</p>
                    <div className="space-y-1.5">
                      {slots.length === 0 ? (
                        <p className="text-xs text-gray-200 text-center py-2">—</p>
                      ) : slots.map(slot => (
                        <button
                          key={slot}
                          className="block w-full text-xs text-center py-1.5 rounded-brand border border-brand-primary/30 text-brand-primary hover:gradient-brand hover:text-white hover:border-transparent transition-all duration-[150ms]"
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right: booking sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-brand shadow-brand border border-gray-100 p-6 sticky top-24">
            <p className="text-xs text-gray-400 mb-1">Sessions from</p>
            <p className="font-display text-3xl font-bold text-gray-900 mb-1">${p.price}</p>
            <p className="text-xs text-gray-400 mb-5">Free 20-min Vibe Check included</p>

            <div className="space-y-2 mb-5">
              {p.sessionTypes.map(type => (
                <div key={type} className="flex items-center justify-between p-3 rounded-brand border border-gray-100 text-sm">
                  <span className="text-gray-700">{type}</span>
                  <span className="font-semibold text-gray-900">
                    ${type === '30 min' ? p.price : type === '60 min' ? p.price * 1.8 : p.price * 2.5}
                  </span>
                </div>
              ))}
            </div>

            {bookingLocked ? (
              <button
                disabled
                className="block w-full bg-gray-100 text-gray-400 font-semibold py-3 rounded-brand text-center cursor-not-allowed mb-3"
              >
                Watch intro video to unlock
              </button>
            ) : (
              <Link
                href={`/book?practitioner=${p.id}`}
                className="block w-full gradient-brand text-white font-semibold py-3 rounded-brand shadow-brand text-center hover:opacity-90 transition-all duration-[150ms] mb-3"
              >
                Book a Session
              </Link>
            )}

            <Link
              href={`/book?practitioner=${p.id}&vibe=true`}
              className="block w-full border-2 border-brand-primary text-brand-primary font-semibold py-2.5 rounded-brand text-center hover:bg-purple-50 transition-all duration-[150ms] text-sm"
            >
              Request Free Vibe Check
            </Link>

            <p className="text-xs text-gray-400 text-center mt-4">No charge until you confirm. Cancel anytime.</p>
          </div>
        </div>
      </div>
    </div>
  )
}


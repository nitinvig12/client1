'use client'

import { useState } from 'react'
import Link from 'next/link'
import Nav from '@/components/Nav'
import { practitioners } from '@/lib/mockData'

const sessionTypes = [
  { label: '30 min', price: 85, desc: 'Quick focus session for a single intention.' },
  { label: '60 min', price: 153, desc: 'Full session with time for integration.' },
  { label: '90 min', price: 213, desc: 'Deep-dive for complex or layered work.' },
  { label: 'Vibe Check (Free)', price: 0, desc: '20-min intro call — no charge, no commitment.' },
]

const slots = ['Mon 18 Nov 10:00 AM', 'Mon 18 Nov 2:00 PM', 'Wed 20 Nov 9:00 AM', 'Wed 20 Nov 1:00 PM', 'Fri 22 Nov 10:00 AM', 'Fri 22 Nov 4:00 PM']

export default function BookPage() {
  const [step, setStep] = useState(1)
  const [sessionType, setSessionType] = useState(sessionTypes[1])
  const [slot, setSlot] = useState('')
  const [showRating, setShowRating] = useState(false)
  const [rating, setRating] = useState(0)
  const [wouldBook, setWouldBook] = useState<boolean | null>(null)
  const [ratingSubmitted, setRatingSubmitted] = useState(false)
  const p = practitioners[0]

  return (
    <div className="min-h-screen bg-gray-50 font-body">
      <Nav />

      <div className="max-w-3xl mx-auto px-6 py-10">
        {/* Progress stepper */}
        <div className="flex items-center gap-2 mb-10">
          {['Select Session', 'Review & Pay', 'Confirmed'].map((label, i) => (
            <div key={label} className="flex items-center gap-2 flex-1">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 transition-all duration-[150ms] ${
                step > i + 1 ? 'gradient-brand text-white' :
                step === i + 1 ? 'border-2 border-brand-primary text-brand-primary' :
                'border-2 border-gray-200 text-gray-300'
              }`}>
                {step > i + 1 ? '✓' : i + 1}
              </div>
              <span className={`text-xs font-medium hidden sm:block ${step === i + 1 ? 'text-brand-primary' : 'text-gray-400'}`}>
                {label}
              </span>
              {i < 2 && <div className={`flex-1 h-px ${step > i + 1 ? 'bg-brand-primary' : 'bg-gray-200'}`} />}
            </div>
          ))}
        </div>

        {/* ── STEP 1 ───────────────────────────── */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="bg-white rounded-brand shadow-brand border border-gray-100 p-5 flex items-center gap-4">
              <div className={`w-14 h-14 rounded-brand bg-gradient-to-br ${p.avatarColor} flex items-center justify-center text-white font-bold text-xl flex-shrink-0`}>
                {p.name.charAt(0)}
              </div>
              <div>
                <p className="font-semibold text-gray-900">{p.name}</p>
                <p className="text-sm text-gray-400">{p.modality}</p>
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-xs font-bold text-amber-600">★ {p.litScore}</span>
                  <span className="text-xs text-gray-400">· {p.reviews} reviews</span>
                </div>
              </div>
            </div>

            <div>
              <h2 className="font-display text-2xl font-bold text-gray-900 mb-4">Choose Session Type</h2>
              <div className="space-y-3">
                {sessionTypes.map((st) => (
                  <button
                    key={st.label}
                    onClick={() => setSessionType(st)}
                    className={`w-full p-4 rounded-brand border-2 text-left transition-all duration-[150ms] ${
                      sessionType.label === st.label
                        ? 'border-brand-primary bg-purple-50'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">{st.label}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{st.desc}</p>
                      </div>
                      <p className="font-bold text-gray-900">{st.price === 0 ? 'Free' : `$${st.price}`}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h2 className="font-display text-2xl font-bold text-gray-900 mb-4">Choose a Time</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {slots.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSlot(s)}
                    className={`py-2.5 px-3 rounded-brand border text-xs font-medium transition-all duration-[150ms] ${
                      slot === s
                        ? 'gradient-brand text-white border-transparent'
                        : 'border-gray-200 text-gray-600 hover:border-brand-primary hover:text-brand-primary'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <button
              disabled={!slot}
              onClick={() => setStep(2)}
              className="w-full gradient-brand text-white font-semibold py-3 rounded-brand shadow-brand hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-[150ms]"
            >
              Continue to Review →
            </button>
          </div>
        )}

        {/* ── STEP 2 ───────────────────────────── */}
        {step === 2 && (
          <div className="space-y-5">
            <h2 className="font-display text-2xl font-bold text-gray-900">Review & Pay</h2>

            <div className="bg-white rounded-brand shadow-brand border border-gray-100 p-6 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Practitioner</span>
                <span className="font-medium text-gray-900">{p.name}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Session type</span>
                <span className="font-medium text-gray-900">{sessionType.label}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Date & time</span>
                <span className="font-medium text-gray-900">{slot}</span>
              </div>
              <div className="border-t border-gray-100 pt-3 flex justify-between">
                <span className="font-semibold text-gray-900">Total</span>
                <span className="font-bold text-gray-900">{sessionType.price === 0 ? 'Free' : `$${sessionType.price}`}</span>
              </div>
            </div>

            {sessionType.price > 0 && (
              <div className="bg-white rounded-brand shadow-brand border border-gray-100 p-6">
                <h3 className="font-semibold text-gray-900 mb-4 text-sm">Payment</h3>
                <div className="space-y-3">
                  <input placeholder="Card number" className="w-full border border-gray-200 rounded-brand px-4 py-2.5 text-sm outline-none focus:border-brand-primary transition-colors" />
                  <div className="flex gap-3">
                    <input placeholder="MM / YY" className="flex-1 border border-gray-200 rounded-brand px-4 py-2.5 text-sm outline-none focus:border-brand-primary transition-colors" />
                    <input placeholder="CVC" className="w-24 border border-gray-200 rounded-brand px-4 py-2.5 text-sm outline-none focus:border-brand-primary transition-colors" />
                  </div>
                </div>
                <p className="text-xs text-gray-400 mt-3 flex items-center gap-1">
                  <span>🔒</span> Secured by Stripe. Your card is never stored on Lit Up.
                </p>
              </div>
            )}

            <div className="flex gap-3">
              <button onClick={() => setStep(1)} className="border border-gray-200 text-gray-600 font-medium px-5 py-3 rounded-brand hover:border-gray-300 transition-all text-sm">
                ← Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="flex-1 gradient-brand text-white font-semibold py-3 rounded-brand shadow-brand hover:opacity-90 transition-all duration-[150ms]"
              >
                {sessionType.price === 0 ? 'Confirm Free Session →' : `Pay $${sessionType.price} →`}
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 3 ───────────────────────────── */}
        {step === 3 && (
          <div className="bg-white rounded-brand shadow-brand border border-gray-100 p-10 text-center">
            <div className="w-16 h-16 rounded-full gradient-brand flex items-center justify-center text-white text-3xl mx-auto mb-5 shadow-brand">
              ✓
            </div>
            <h2 className="font-display text-3xl font-bold text-gray-900 mb-2">You&rsquo;re booked!</h2>
            <p className="text-gray-500 text-sm mb-1">{sessionType.label} with {p.name}</p>
            <p className="text-brand-primary font-semibold mb-6">{slot}</p>
            <p className="text-xs text-gray-400 mb-8">
              A confirmation has been added to your calendar. You&rsquo;ll receive a reminder 24 hours before your session. {sessionType.price > 0 && 'Refund policy: full refund if cancelled 24hrs in advance.'}
            </p>
            <div className="flex gap-3 justify-center mb-4">
              <Link href="/dashboard/seeker" className="gradient-brand text-white font-semibold px-6 py-3 rounded-brand shadow-brand hover:opacity-90 transition-all duration-[150ms] text-sm">
                Go to Dashboard
              </Link>
              <Link href="/explore" className="border border-gray-200 text-gray-600 font-medium px-6 py-3 rounded-brand hover:border-gray-300 transition-all text-sm">
                Explore More
              </Link>
            </div>
            <button onClick={() => setShowRating(true)} className="text-xs text-gray-400 hover:text-brand-primary transition-colors underline">
              Preview: rate this session after it ends
            </button>
          </div>
        )}

        {/* Two-way rating modal */}
        {showRating && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4" onClick={() => setShowRating(false)}>
            <div className="bg-white rounded-brand shadow-brand p-7 w-full max-w-sm" onClick={e => e.stopPropagation()}>
              {!ratingSubmitted ? (
                <>
                  <h3 className="font-display text-xl font-bold text-gray-900 mb-1">Rate your session</h3>
                  <p className="text-xs text-gray-400 mb-5">With {p.name} · Your rating stays blind until {p.name.split(' ')[0]} rates you too, or 24 hours pass.</p>
                  <div className="flex justify-center gap-1.5 mb-5">
                    {[1, 2, 3, 4, 5].map(n => (
                      <button key={n} onClick={() => setRating(n)} className={`text-3xl transition-colors ${n <= rating ? 'text-amber-400' : 'text-gray-200'}`}>★</button>
                    ))}
                  </div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Would you book again?</p>
                  <div className="flex gap-2 mb-5">
                    {[true, false].map(v => (
                      <button
                        key={String(v)}
                        onClick={() => setWouldBook(v)}
                        className={`flex-1 text-sm py-2 rounded-brand border-2 transition-all duration-[150ms] ${
                          wouldBook === v ? 'border-brand-primary bg-purple-50 text-brand-primary' : 'border-gray-200 text-gray-500'
                        }`}
                      >
                        {v ? 'Yes' : 'No'}
                      </button>
                    ))}
                  </div>
                  <textarea
                    rows={2}
                    placeholder="Optional comment…"
                    className="w-full border border-gray-200 rounded-brand px-3 py-2 text-sm outline-none focus:border-brand-primary resize-none mb-4"
                  />
                  <button
                    disabled={!rating || wouldBook === null}
                    onClick={() => setRatingSubmitted(true)}
                    className="w-full gradient-brand text-white font-semibold py-2.5 rounded-brand shadow-brand text-sm hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-[150ms]"
                  >
                    Submit Rating (+10 Karma)
                  </button>
                </>
              ) : (
                <div className="text-center py-3">
                  <div className="w-12 h-12 rounded-full gradient-brand flex items-center justify-center text-white text-xl mx-auto mb-3">✓</div>
                  <h3 className="font-display text-lg font-bold text-gray-900 mb-1">Rating submitted</h3>
                  <p className="text-xs text-gray-400 mb-5">+10 Karma added. You&rsquo;ll see {p.name.split(' ')[0]}&rsquo;s rating of you once both sides have rated, or in 24 hours.</p>
                  <button onClick={() => setShowRating(false)} className="text-sm text-brand-primary hover:underline">Close</button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

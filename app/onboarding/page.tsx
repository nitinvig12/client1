'use client'

import { useState } from 'react'
import Link from 'next/link'
import Nav from '@/components/Nav'

const modalityCategories = [
  'Reiki', 'Sound Healing', 'Human Design', 'Tarot', 'Astrology', 'Breathwork',
  'Somatic Therapy', 'Akashic Records', 'Kundalini', 'Meditation', 'Shamanic Healing',
  'Numerology', 'Gene Keys', 'Plant Medicine Integration', 'Past Life Regression',
  'Chakra Balancing', 'Crystal Healing', 'EFT / Tapping', 'NLP', 'Hypnotherapy',
  'Theta Healing', 'Pranic Healing', 'Access Consciousness', 'Oracle Cards', 'Astral Travel',
]

export default function OnboardingPage() {
  const [step, setStep] = useState(1)
  const [selectedModalities, setSelectedModalities] = useState<string[]>([])
  const [sessionPrices, setSessionPrices] = useState({ '30': '85', '60': '155', '90': '215' })
  const [calendarSynced, setCalendarSynced] = useState<string | null>(null)
  const totalSteps = 5

  const toggleModality = (m: string) =>
    setSelectedModalities(prev => prev.includes(m) ? prev.filter(x => x !== m) : [...prev, m])

  return (
    <div className="min-h-screen bg-gray-50 font-body">
      <Nav />

      <div className="max-w-2xl mx-auto px-6 py-10">
        {/* Progress */}
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-medium text-gray-600">Step {step} of {totalSteps}</p>
          <button className="text-sm text-gray-400 hover:text-gray-600 transition-colors">Save & Exit</button>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-1.5 mb-10">
          <div className="gradient-brand h-1.5 rounded-full transition-all duration-[150ms]" style={{ width: `${(step / totalSteps) * 100}%` }} />
        </div>

        {/* ── STEP 1: Bio & Identity ───────────── */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h1 className="font-display text-3xl font-bold text-gray-900">Bio & Identity</h1>
              <p className="text-gray-500 text-sm mt-1">Tell seekers who you are and what you bring to the space.</p>
            </div>
            <div className="bg-white rounded-brand shadow-brand border border-gray-100 p-6 space-y-5">
              <div className="flex items-center gap-5">
                <div className="w-20 h-20 rounded-brand gradient-brand flex items-center justify-center text-white text-3xl font-bold flex-shrink-0">
                  +
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-1">Profile photo</p>
                  <button className="text-xs text-brand-primary border border-brand-primary/40 px-3 py-1.5 rounded-brand hover:bg-purple-50 transition-all">Upload photo</button>
                </div>
              </div>
              {[
                { label: 'Full name', placeholder: 'Your name as it appears publicly', type: 'text' },
                { label: 'Location', placeholder: 'City, State — or "Remote Only"', type: 'text' },
                { label: 'Credentials / certifications', placeholder: 'e.g. USUI Reiki Master, QHHT Level 2', type: 'text' },
              ].map(f => (
                <div key={f.label}>
                  <label className="text-sm font-medium text-gray-700 block mb-1.5">{f.label}</label>
                  <input type={f.type} placeholder={f.placeholder} className="w-full border border-gray-200 rounded-brand px-4 py-2.5 text-sm outline-none focus:border-brand-primary transition-colors" />
                </div>
              ))}
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1.5">Bio</label>
                <textarea
                  rows={5}
                  placeholder="Share your journey, approach, and what makes your sessions unique. Be authentic — seekers resonate with real stories."
                  className="w-full border border-gray-200 rounded-brand px-4 py-2.5 text-sm outline-none focus:border-brand-primary transition-colors resize-none"
                />
                <p className="text-xs text-gray-400 mt-1">0 / 600 characters</p>
              </div>
            </div>
          </div>
        )}

        {/* ── STEP 2: Modalities & Tags ────────── */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h1 className="font-display text-3xl font-bold text-gray-900">Modalities & Tags</h1>
              <p className="text-gray-500 text-sm mt-1">Select all that apply. This determines how seekers discover you.</p>
            </div>
            <div className="bg-white rounded-brand shadow-brand border border-gray-100 p-6">
              <p className="text-xs text-gray-400 mb-4">{selectedModalities.length} selected · Select at least 1</p>
              <div className="flex flex-wrap gap-2">
                {modalityCategories.map(m => (
                  <button
                    key={m}
                    onClick={() => toggleModality(m)}
                    className={`text-sm px-3.5 py-1.5 rounded-full border transition-all duration-[150ms] ${
                      selectedModalities.includes(m)
                        ? 'gradient-brand text-white border-transparent'
                        : 'border-gray-200 text-gray-600 hover:border-brand-primary hover:text-brand-primary'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
              {selectedModalities.length > 0 && (
                <div className="mt-5 pt-4 border-t border-gray-100">
                  <label className="text-sm font-medium text-gray-700 block mb-2">Primary specialisation</label>
                  <select className="w-full border border-gray-200 rounded-brand px-4 py-2.5 text-sm outline-none focus:border-brand-primary bg-white">
                    {selectedModalities.map(m => <option key={m}>{m}</option>)}
                  </select>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── STEP 3: Pricing ─────────────────── */}
        {step === 3 && (
          <div className="space-y-6">
            <div>
              <h1 className="font-display text-3xl font-bold text-gray-900">Pricing & Session Types</h1>
              <p className="text-gray-500 text-sm mt-1">Set your rates. You can offer virtual, in-person, or both.</p>
            </div>
            <div className="bg-white rounded-brand shadow-brand border border-gray-100 p-6 space-y-5">
              {(['30', '60', '90'] as const).map(dur => (
                <div key={dur} className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{dur}-minute session</p>
                    <p className="text-xs text-gray-400">{dur === '30' ? 'Focus session' : dur === '60' ? 'Full session (recommended)' : 'Deep-dive session'}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500 text-sm">$</span>
                    <input
                      type="number"
                      value={sessionPrices[dur]}
                      onChange={e => setSessionPrices(prev => ({ ...prev, [dur]: e.target.value }))}
                      className="w-24 border border-gray-200 rounded-brand px-3 py-2 text-sm outline-none focus:border-brand-primary text-right"
                    />
                  </div>
                </div>
              ))}
              <div className="border-t border-gray-100 pt-4 space-y-3">
                <p className="text-sm font-semibold text-gray-900">Session format</p>
                <div className="flex gap-3">
                  {['Virtual (video)', 'In-person', 'Both'].map(f => (
                    <label key={f} className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                      <input type="radio" name="format" className="accent-brand-primary" defaultChecked={f === 'Virtual (video)'} />
                      {f}
                    </label>
                  ))}
                </div>
              </div>
              <div className="border-t border-gray-100 pt-4">
                <p className="text-sm font-semibold text-gray-900 mb-2">Refund policy</p>
                <select className="w-full border border-gray-200 rounded-brand px-4 py-2.5 text-sm outline-none focus:border-brand-primary bg-white">
                  <option>Full refund if cancelled 24 hours in advance</option>
                  <option>Full refund if cancelled 48 hours in advance</option>
                  <option>No refunds (clearly stated on profile)</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* ── STEP 4: Availability ─────────────── */}
        {step === 4 && (
          <div className="space-y-6">
            <div>
              <h1 className="font-display text-3xl font-bold text-gray-900">Availability & Calendar</h1>
              <p className="text-gray-500 text-sm mt-1">Connect your calendar for automatic 2-way sync. Your existing events are imported to prevent double-booking.</p>
            </div>
            <div className="space-y-3">
              {[
                { name: 'Google Calendar', icon: '📅', color: 'text-red-600', bg: 'bg-red-50' },
                { name: 'Outlook / Microsoft', icon: '📆', color: 'text-blue-600', bg: 'bg-blue-50' },
                { name: 'Apple iCal', icon: '🗓', color: 'text-gray-600', bg: 'bg-gray-50' },
              ].map(cal => (
                <button
                  key={cal.name}
                  onClick={() => setCalendarSynced(cal.name)}
                  className={`w-full flex items-center gap-4 p-4 rounded-brand border-2 transition-all duration-[150ms] ${
                    calendarSynced === cal.name
                      ? 'border-brand-primary bg-purple-50'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <span className={`w-10 h-10 rounded-brand ${cal.bg} flex items-center justify-center text-xl flex-shrink-0`}>{cal.icon}</span>
                  <div className="text-left">
                    <p className="text-sm font-semibold text-gray-900">{cal.name}</p>
                    <p className="text-xs text-gray-400">OAuth secure connection · 2-way sync</p>
                  </div>
                  {calendarSynced === cal.name && (
                    <span className="ml-auto text-xs font-semibold text-green-600 bg-green-50 px-2.5 py-1 rounded-full">✓ Connected</span>
                  )}
                </button>
              ))}
            </div>
            {calendarSynced && (
              <div className="bg-white rounded-brand shadow-brand border border-gray-100 p-5">
                <p className="text-sm font-semibold text-gray-900 mb-3">Set your availability windows</p>
                <div className="space-y-2">
                  {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map(day => (
                    <div key={day} className="flex items-center gap-3">
                      <input type="checkbox" defaultChecked={day !== 'Thursday'} className="accent-brand-primary" />
                      <span className="text-sm text-gray-700 w-24">{day}</span>
                      <input type="time" defaultValue="09:00" className="border border-gray-200 rounded-brand px-2 py-1 text-xs outline-none focus:border-brand-primary" />
                      <span className="text-xs text-gray-400">to</span>
                      <input type="time" defaultValue="17:00" className="border border-gray-200 rounded-brand px-2 py-1 text-xs outline-none focus:border-brand-primary" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── STEP 5: Verification & Preview ────── */}
        {step === 5 && (
          <div className="space-y-6">
            <div>
              <h1 className="font-display text-3xl font-bold text-gray-900">Verification & Preview</h1>
              <p className="text-gray-500 text-sm mt-1">Optionally upload credentials, then preview your public profile before publishing.</p>
            </div>
            <div className="bg-white rounded-brand shadow-brand border border-gray-100 p-6 space-y-5">
              <div>
                <p className="text-sm font-semibold text-gray-900 mb-1">Upload credentials (optional)</p>
                <p className="text-xs text-gray-400 mb-3">Certificates, licences, or training records. Verified practitioners appear higher in search.</p>
                <div className="border-2 border-dashed border-gray-200 rounded-brand p-8 text-center hover:border-brand-primary/40 transition-colors cursor-pointer">
                  <p className="text-3xl mb-2">📎</p>
                  <p className="text-sm text-gray-500">Drag & drop files or <span className="text-brand-primary font-medium">browse</span></p>
                  <p className="text-xs text-gray-400 mt-1">PDF, JPG, PNG · Max 10MB each</p>
                </div>
              </div>
            </div>

            {/* Profile preview card */}
            <div className="bg-white rounded-brand shadow-brand border border-gray-100 overflow-hidden">
              <div className="h-24 gradient-brand flex items-end px-5 pb-4">
                <div className="w-14 h-14 rounded-brand bg-white/20 border-2 border-white/40 flex items-center justify-center text-white font-bold text-2xl">P</div>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-display font-bold text-gray-900 text-lg">Your Name</p>
                  <span className="text-brand-primary">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M9 12l2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" /></svg>
                  </span>
                </div>
                <p className="text-sm text-gray-400 mb-3">Your Primary Modality · Your Location</p>
                <div className="flex gap-2">
                  {(selectedModalities.slice(0, 3).length > 0 ? selectedModalities.slice(0, 3) : ['Reiki', 'Meditation']).map(m => (
                    <span key={m} className="text-xs bg-purple-50 text-brand-primary px-2.5 py-1 rounded-full">{m}</span>
                  ))}
                </div>
                <div className="flex gap-3 mt-4">
                  <div className="gradient-brand text-white text-xs font-semibold py-2 px-4 rounded-brand text-center">Book a Session</div>
                  <div className="border border-brand-primary text-brand-primary text-xs font-semibold py-2 px-4 rounded-brand text-center">Vibe Check</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation buttons */}
        <div className="flex gap-3 mt-8">
          {step > 1 && (
            <button
              onClick={() => setStep(s => s - 1)}
              className="border border-gray-200 text-gray-600 font-medium px-5 py-3 rounded-brand hover:border-gray-300 transition-all text-sm"
            >
              ← Back
            </button>
          )}
          {step < totalSteps ? (
            <button
              onClick={() => setStep(s => s + 1)}
              className="flex-1 gradient-brand text-white font-semibold py-3 rounded-brand shadow-brand hover:opacity-90 transition-all duration-[150ms]"
            >
              Continue →
            </button>
          ) : (
            <Link
              href="/dashboard/practitioner"
              className="flex-1 gradient-brand text-white font-semibold py-3 rounded-brand shadow-brand hover:opacity-90 transition-all duration-[150ms] text-center"
            >
              Publish My Profile →
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

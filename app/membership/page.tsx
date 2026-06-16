'use client'

import { useState } from 'react'
import Nav from '@/components/Nav'
import { currentUser } from '@/lib/mockData'

const seekerPerks = ['Unlimited Lumi AI conversations', 'Priority booking slots', 'Exclusive missions access', '5% off all session bookings']
const practitionerPerks = ['Featured placement in search results', 'Advanced LitScore analytics', 'Unlimited media uploads', 'Lower marketplace commission tier', 'Access to trainings & collab tools']

export default function MembershipPage() {
  const [billing, setBilling] = useState<'monthly' | 'yearly'>('monthly')
  const isPractitioner = currentUser.role === 'practitioner'

  return (
    <div className="min-h-screen bg-gray-50 font-body">
      <Nav />

      <div className="max-w-4xl mx-auto px-6 py-10 text-center">
        <h1 className="font-display text-3xl font-bold text-gray-900 mb-2">Membership Plans</h1>
        <p className="text-gray-500 text-sm mb-8">Unlock more of Lit Up with a community membership.</p>

        <div className="grid md:grid-cols-2 gap-6 text-left">

          {/* Seeker Community */}
          <div className={`bg-white rounded-brand shadow-brand border-2 p-7 ${!isPractitioner ? 'border-brand-primary' : 'border-gray-100'}`}>
            <p className="text-xs font-semibold text-brand-primary uppercase tracking-wide mb-2">Seeker Community</p>
            <div className="flex items-baseline gap-1 mb-1">
              <span className="font-display text-4xl font-bold text-gray-900">$5</span>
              <span className="text-sm text-gray-400">/mo</span>
            </div>
            <p className="text-xs text-gray-400 mb-5">Free tier available — upgrade anytime.</p>
            <ul className="space-y-2.5 mb-6">
              {seekerPerks.map(p => (
                <li key={p} className="flex items-start gap-2 text-sm text-gray-600">
                  <span className="text-green-500 mt-0.5">✓</span>{p}
                </li>
              ))}
            </ul>
            <button className="w-full gradient-brand text-white font-semibold py-3 rounded-brand shadow-brand hover:opacity-90 transition-all duration-[150ms]">
              {!isPractitioner ? 'Upgrade to Plus' : 'Switch to Seeker'}
            </button>
          </div>

          {/* Practitioner Community */}
          <div className={`bg-white rounded-brand shadow-brand border-2 p-7 ${isPractitioner ? 'border-brand-primary' : 'border-gray-100'}`}>
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-semibold text-brand-primary uppercase tracking-wide">Practitioner Community</p>
              <div className="flex bg-gray-100 rounded-full p-0.5">
                {(['monthly', 'yearly'] as const).map(b => (
                  <button
                    key={b}
                    onClick={() => setBilling(b)}
                    className={`text-xs px-2.5 py-1 rounded-full font-medium transition-all duration-[150ms] ${
                      billing === b ? 'bg-white shadow-sm text-gray-900' : 'text-gray-400'
                    }`}
                  >
                    {b === 'monthly' ? 'Monthly' : 'Yearly'}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-baseline gap-1 mb-1">
              <span className="font-display text-4xl font-bold text-gray-900">{billing === 'monthly' ? '$19' : '$190'}</span>
              <span className="text-sm text-gray-400">{billing === 'monthly' ? '/mo' : '/yr'}</span>
            </div>
            <p className="text-xs text-gray-400 mb-5">{billing === 'yearly' ? 'Save $38 vs monthly billing.' : 'Cancel anytime.'}</p>
            <ul className="space-y-2.5 mb-6">
              {practitionerPerks.map(p => (
                <li key={p} className="flex items-start gap-2 text-sm text-gray-600">
                  <span className="text-green-500 mt-0.5">✓</span>{p}
                </li>
              ))}
            </ul>
            <button className="w-full border-2 border-brand-primary text-brand-primary font-semibold py-2.5 rounded-brand hover:bg-purple-50 transition-all duration-[150ms]">
              {isPractitioner ? 'Upgrade Lounge Access' : 'Switch to Practitioner'}
            </button>
          </div>
        </div>

        <p className="text-xs text-gray-400 mt-8">
          Founding Members keep their permanent karma multiplier (×1.5) on any plan.
        </p>
      </div>
    </div>
  )
}

'use client'

import { useState } from 'react'
import Nav from '@/components/Nav'
import { currentUser } from '@/lib/mockData'

const referralHistory = [
  { name: 'Maya T.', role: 'Seeker', status: 'Converted', karma: 50, date: '3 days ago' },
  { name: 'David Chen', role: 'Practitioner', status: 'Converted', karma: 50, date: '1 week ago' },
  { name: 'Priya S.', role: 'Seeker', status: 'Pending', karma: 0, date: '2 days ago' },
  { name: 'Theo W.', role: 'Seeker', status: 'Converted', karma: 50, date: '2 weeks ago' },
  { name: 'Lena K.', role: 'Practitioner', status: 'Converted', karma: 50, date: '3 weeks ago' },
  { name: 'Sam O.', role: 'Seeker', status: 'Expired', karma: 0, date: '1 month ago' },
]

export default function ReferralsPage() {
  const [copied, setCopied] = useState(false)
  const link = `https://litup.world/join?ref=${currentUser.referralCode}`

  const handleCopy = () => {
    navigator.clipboard?.writeText(link)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const converted = referralHistory.filter(r => r.status === 'Converted').length

  return (
    <div className="min-h-screen bg-gray-50 font-body">
      <Nav />

      <div className="max-w-4xl mx-auto px-6 py-10">
        <h1 className="font-display text-3xl font-bold text-gray-900 mb-1">Referrals</h1>
        <p className="text-gray-500 text-sm mb-8">Invite seekers and practitioners. Earn karma every time someone joins through you.</p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-brand shadow-brand border border-gray-100 p-5">
            <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Total Referrals</p>
            <p className="font-display text-3xl font-bold text-gray-900">{currentUser.referralCount}</p>
          </div>
          <div className="bg-white rounded-brand shadow-brand border border-gray-100 p-5">
            <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Converted</p>
            <p className="font-display text-3xl font-bold text-green-600">{converted}</p>
          </div>
          <div className="bg-white rounded-brand shadow-brand border border-gray-100 p-5">
            <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Karma Earned</p>
            <p className="font-display text-3xl font-bold text-brand-primary">{currentUser.referralKarmaEarned}</p>
          </div>
        </div>

        {/* Link card */}
        <div className="bg-white rounded-brand shadow-brand border border-gray-100 p-6 mb-8">
          <p className="text-sm font-semibold text-gray-900 mb-1">Your referral link</p>
          <p className="text-xs text-gray-400 mb-4">Share this link — you earn +50 karma, they earn +25 karma when they join.</p>
          <div className="flex gap-2">
            <input
              readOnly
              value={link}
              className="flex-1 border border-gray-200 rounded-brand px-4 py-2.5 text-sm text-gray-600 bg-gray-50 outline-none"
            />
            <button
              onClick={handleCopy}
              className="gradient-brand text-white text-sm font-semibold px-5 py-2.5 rounded-brand shadow-brand hover:opacity-90 transition-all duration-[150ms] flex-shrink-0"
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <div className="flex gap-2 mt-3">
            <span className="text-xs bg-gray-50 text-gray-500 px-3 py-1.5 rounded-full border border-gray-200">Code: {currentUser.referralCode}</span>
          </div>
        </div>

        {/* History */}
        <div className="bg-white rounded-brand shadow-brand border border-gray-100 p-6">
          <h2 className="font-display text-lg font-bold text-gray-900 mb-4">Referral History</h2>
          <div className="space-y-2">
            {referralHistory.map((r, i) => (
              <div key={i} className="flex items-center gap-4 p-3 rounded-brand border border-gray-100">
                <div className="w-8 h-8 rounded-full gradient-brand flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                  {r.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{r.name}</p>
                  <p className="text-xs text-gray-400">{r.role} · {r.date}</p>
                </div>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                  r.status === 'Converted' ? 'bg-green-50 text-green-700' :
                  r.status === 'Pending' ? 'bg-amber-50 text-amber-700' :
                  'bg-gray-100 text-gray-500'
                }`}>
                  {r.status}
                </span>
                <span className="text-xs text-brand-primary font-semibold w-16 text-right">{r.karma > 0 ? `+${r.karma} K` : '—'}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

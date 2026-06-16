'use client'

import Nav from '@/components/Nav'
import FounderBadge, { PhoenixIcon } from '@/components/FounderBadge'
import { founders, currentUser } from '@/lib/mockData'

const benefits = [
  { title: 'Permanent Founding Badge', desc: 'A phoenix-glow badge on your profile, posts, and bookings — forever.' },
  { title: 'Karma Bonuses', desc: 'Bonus karma on signup, referrals, and community contributions, all in your wallet.' },
  { title: 'Referral Rewards', desc: 'Your unique link earns +50 karma per conversion, automatically tracked.' },
  { title: 'Early Access', desc: 'First access to Lumi AI upgrades, missions, and new practitioner tools.' },
  { title: 'Wall of Light', desc: 'Permanent recognition on this page, with spotlight rotation for top contributors.' },
  { title: 'Founders-Only Space', desc: 'Private channel for direct updates, livestreams, and roadmap feedback.' },
  { title: 'Marketplace Perks', desc: 'Reduced booking fees and priority access to new practitioners.' },
]

export default function FoundersPage() {
  const remaining = founders.totalSlots - founders.claimedSlots
  const pct = Math.round((founders.claimedSlots / founders.totalSlots) * 100)
  const spotlight = founders.members.filter(m => m.spotlight)

  return (
    <div className="min-h-screen bg-gray-50 font-body">
      <Nav />

      {/* Hero */}
      <div className="relative bg-gradient-to-br from-[#7E5BFF] to-[#FEA971] overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="max-w-4xl mx-auto px-6 py-16 relative text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/15 border border-white/30 mb-5 text-white">
            <PhoenixIcon size={32} />
          </div>
          <h1 className="font-display text-4xl font-bold text-white mb-3">The Founders Circle</h1>
          <p className="text-white/85 max-w-xl mx-auto text-sm leading-relaxed">
            An exclusive home for the first 111 people who believed in Lit Up before the world discovered it.
            Founders shape our roadmap, earn bonus karma, and carry a permanent mark of having been here first.
          </p>

          <div className="mt-8 max-w-sm mx-auto">
            <div className="flex justify-between text-xs text-white/80 mb-1.5">
              <span>{founders.claimedSlots} of {founders.totalSlots} spots claimed</span>
              <span>{remaining} remaining</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2.5">
              <div className="bg-white h-2.5 rounded-full transition-all duration-[150ms]" style={{ width: `${pct}%` }} />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10 space-y-10">

        {/* Your status */}
        {currentUser.founder && (
          <div className="bg-white rounded-brand shadow-brand border border-gray-100 p-6 flex items-center gap-5">
            <div className="w-14 h-14 rounded-brand gradient-brand flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
              {currentUser.name.charAt(0)}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <p className="font-semibold text-gray-900">{currentUser.name}</p>
                <FounderBadge />
              </div>
              <p className="text-xs text-gray-400">Founding Member #{currentUser.founderNumber} · {currentUser.karma} karma earned</p>
            </div>
            <p className="text-sm text-brand-primary font-medium text-right max-w-xs">
              &ldquo;We were here before the world discovered Lit Up.&rdquo;
            </p>
          </div>
        )}

        {/* Benefits grid */}
        <div>
          <h2 className="font-display text-2xl font-bold text-gray-900 mb-5">Founder Benefits</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {benefits.map(b => (
              <div key={b.title} className="bg-white rounded-brand shadow-brand border border-gray-100 p-5">
                <p className="font-semibold text-gray-900 text-sm mb-1.5">{b.title}</p>
                <p className="text-xs text-gray-500 leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Spotlight */}
        <div>
          <h2 className="font-display text-2xl font-bold text-gray-900 mb-5">Founder Spotlight</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {spotlight.map(m => (
              <div key={m.name} className="bg-white rounded-brand shadow-brand border border-gray-100 p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full gradient-brand flex items-center justify-center text-white text-sm font-bold">
                    {m.name.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-gray-900 text-sm">{m.name}</p>
                      <FounderBadge />
                    </div>
                    <p className="text-xs text-gray-400">{m.role} · Joined {m.joined}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 italic leading-relaxed">&ldquo;{m.quote}&rdquo;</p>
              </div>
            ))}
          </div>
        </div>

        {/* Wall of Light */}
        <div>
          <h2 className="font-display text-2xl font-bold text-gray-900 mb-1">Wall of Light</h2>
          <p className="text-sm text-gray-400 mb-5">Every Founding Member, permanently recognised.</p>
          <div className="bg-white rounded-brand shadow-brand border border-gray-100 p-6">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {founders.members.map(m => (
                <div key={m.name} className="flex items-center gap-3 p-3 rounded-brand border border-gray-100">
                  <div className="w-9 h-9 rounded-full gradient-brand flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                    {m.name.charAt(0)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-900 truncate">{m.name}</p>
                    <p className="text-xs text-gray-400">{m.role} · {m.karma} karma</p>
                  </div>
                  <FounderBadge />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

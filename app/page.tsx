import Link from 'next/link'
import Nav from '@/components/Nav'
import { practitioners, missions } from '@/lib/mockData'

const steps = [
  {
    n: '01',
    title: 'Chat with Lumi AI',
    desc: 'Tell Lumi how you\'re feeling and what you\'re seeking. She\'ll ask a few questions, then surface your best-matched practitioners.',
  },
  {
    n: '02',
    title: 'Book a Vibe Check',
    desc: 'Every practitioner offers a free 20-min intro call so you can feel the connection before committing to a full session.',
  },
  {
    n: '03',
    title: 'Transform & Earn Karma',
    desc: 'Attend your session inside Lit Up, leave a verified Reflection, and earn Karma points toward community rewards.',
  },
]

const stats = [
  { value: '240+', label: 'Vetted Practitioners' },
  { value: '30+', label: 'Modalities' },
  { value: '1.2k+', label: 'Sessions Facilitated' },
  { value: '98%', label: 'Would Book Again' },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white font-body">
      <Nav />

      {/* ── HERO ─────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-white to-orange-50 py-28 px-6 text-center">
        {/* Aurora blobs */}
        <div className="absolute -top-20 left-1/4 w-[500px] h-[500px] bg-brand-primary/8 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 right-1/4 w-[500px] h-[500px] bg-brand-accent/8 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white border border-gray-100 rounded-full px-4 py-1.5 mb-8 shadow-brand text-xs">
            <span className="font-medium text-brand-primary">✦ Now in beta</span>
            <span className="text-gray-400">Join 240+ vetted practitioners</span>
          </div>

          <h1 className="font-display text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
            Where Lightworkers<br />and{' '}
            <span className="text-gradient-brand">Seekers</span> Connect
          </h1>

          <p className="text-lg text-gray-500 leading-relaxed mb-10 max-w-xl mx-auto">
            Find vetted healers, spiritual guides, and transformational practitioners — or grow your practice with a community ready to receive your gifts.
          </p>

          {/* Search bar */}
          <div className="flex items-center bg-white rounded-brand shadow-brand border border-gray-100 p-2 max-w-lg mx-auto mb-6">
            <svg className="ml-3 text-gray-400 flex-shrink-0" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder="Search modalities, practitioners…"
              className="flex-1 px-3 py-2 text-sm outline-none text-gray-700 placeholder:text-gray-400 bg-transparent"
              readOnly
            />
            <Link
              href="/explore"
              className="gradient-brand text-white text-sm font-semibold px-5 py-2.5 rounded-[10px] hover:opacity-90 transition-all duration-[150ms] whitespace-nowrap"
            >
              Explore →
            </Link>
          </div>

          <Link href="/lumi" className="text-sm text-brand-primary font-medium hover:underline">
            Or let Lumi AI find your perfect match →
          </Link>
        </div>
      </section>

      {/* ── STATS BAR ───────────────────────────────── */}
      <section className="border-y border-gray-100 bg-white py-10">
        <div className="max-w-4xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="font-display text-3xl font-bold text-gradient-brand">{s.value}</p>
              <p className="text-sm text-gray-500 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────── */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <p className="text-sm font-medium text-brand-primary text-center mb-2">Simple by design</p>
          <h2 className="font-display text-4xl font-bold text-gray-900 text-center mb-16">
            Your healing journey in three steps
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step) => (
              <div key={step.n} className="bg-white rounded-brand shadow-brand p-7 border border-gray-100">
                <span className="text-gradient-brand font-display text-4xl font-bold block mb-4">{step.n}</span>
                <h3 className="font-display text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED PRACTITIONERS ───────────────────── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-sm font-medium text-brand-primary mb-2">Vetted & trusted</p>
              <h2 className="font-display text-4xl font-bold text-gray-900">Featured practitioners</h2>
            </div>
            <Link href="/explore" className="text-sm text-brand-primary font-medium hover:underline hidden md:block">
              View all 240+ →
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {practitioners.slice(0, 4).map((p) => (
              <Link
                key={p.id}
                href={`/practitioners/${p.id}`}
                className="bg-white rounded-brand shadow-brand border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-[150ms] group"
              >
                {/* Avatar */}
                <div className={`h-28 bg-gradient-to-br ${p.avatarColor} flex items-end px-4 pb-3`}>
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white font-display font-bold text-xl">
                    {p.name.charAt(0)}
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between mb-1">
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{p.name}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{p.modality}</p>
                    </div>
                    {p.verified && (
                      <span className="text-brand-primary" title="Verified">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M9 12l2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" /></svg>
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-3">
                    <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
                      ★ {p.litScore}
                    </span>
                    <span className="text-xs text-gray-400">{p.reviews} reviews</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">From <span className="font-semibold text-gray-800">${p.price}</span> / session</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── LUMI AI SECTION ──────────────────────────── */}
      <section className="py-24 px-6 bg-gradient-to-br from-purple-50 to-orange-50">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-sm font-medium text-brand-primary mb-3">Powered by AI</p>
            <h2 className="font-display text-4xl font-bold text-gray-900 mb-4 leading-tight">
              Meet Lumi —<br />your intuitive guide
            </h2>
            <p className="text-gray-500 leading-relaxed mb-8">
              Lumi understands 300+ spiritual modalities. Tell her what you're going through and she'll find practitioners whose energy, approach, and expertise align with exactly what you need.
            </p>
            <Link
              href="/lumi"
              className="gradient-brand text-white font-semibold px-6 py-3 rounded-brand shadow-brand hover:opacity-90 transition-all duration-[150ms] inline-block"
            >
              Chat with Lumi →
            </Link>
          </div>

          {/* Chat preview */}
          <div className="bg-white rounded-brand shadow-brand border border-gray-100 p-5 space-y-3">
            {[
              { from: 'lumi', text: 'Hi! I\'m Lumi. What brings you here today?' },
              { from: 'user', text: 'I\'ve been feeling really stuck and anxious lately.' },
              { from: 'lumi', text: 'I hear you. Anxiety often shows up when we\'re ready for a shift. Would you like to explore energy healing, breathwork, or talk-based guidance?' },
              { from: 'user', text: 'Maybe breathwork? I\'ve heard it can help.' },
              { from: 'lumi', text: 'Great instinct! I\'ve found 3 practitioners who specialise in breathwork for anxiety. Shall I show them?' },
            ].map((msg, i) => (
              <div key={i} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] px-4 py-2.5 rounded-brand text-sm leading-relaxed ${
                  msg.from === 'lumi'
                    ? 'bg-gray-50 text-gray-700 border border-gray-100'
                    : 'gradient-brand text-white'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MISSIONS ─────────────────────────────────── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-sm font-medium text-brand-primary mb-2">Community</p>
              <h2 className="font-display text-4xl font-bold text-gray-900">Active Missions</h2>
              <p className="text-gray-500 text-sm mt-2">Join collective projects, earn Karma, create real-world impact.</p>
            </div>
            <Link href="/missions" className="text-sm text-brand-primary font-medium hover:underline hidden md:block">
              All missions →
            </Link>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {missions.filter(m => m.status === 'active').map((m) => (
              <Link key={m.id} href="/missions" className="block bg-white rounded-brand shadow-brand border border-gray-100 p-6 hover:shadow-md transition-shadow duration-[150ms]">
                <div className="flex items-start justify-between mb-3">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${m.typeColor}`}>{m.type}</span>
                  <span className="text-xs text-brand-primary font-semibold">+{m.karma} Karma</span>
                </div>
                <h3 className="font-display text-lg font-bold text-gray-900 mb-2">{m.title}</h3>
                <p className="text-sm text-gray-500 mb-4 leading-relaxed">{m.description}</p>
                <div className="flex items-center justify-between text-xs text-gray-400 mb-3">
                  <span>{m.practitioners} practitioners · {m.seekers} seekers</span>
                  <span>{m.progress}% complete</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-1.5">
                  <div className="gradient-brand h-1.5 rounded-full" style={{ width: `${m.progress}%` }} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── LITSCORE ─────────────────────────────────── */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm font-medium text-brand-primary mb-3">Trust & Transparency</p>
          <h2 className="font-display text-4xl font-bold text-gray-900 mb-4">The LitScore™</h2>
          <p className="text-gray-500 max-w-xl mx-auto mb-12 leading-relaxed">
            Every practitioner earns a LitScore — a transparent, weighted reputation index built from verified session data, repeat bookings, and community sentiment.
          </p>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {[
              { label: 'Bayesian Rating', pct: '35%' },
              { label: 'Wilson Score', pct: '25%' },
              { label: 'Sentiment', pct: '15%' },
              { label: 'Repeat Bookings', pct: '15%' },
              { label: 'Freshness', pct: '8%' },
              { label: 'Verified Badge', pct: '2%' },
            ].map((c) => (
              <div key={c.label} className="bg-white rounded-brand shadow-brand p-4 border border-gray-100">
                <p className="font-display text-2xl font-bold text-gradient-brand">{c.pct}</p>
                <p className="text-xs text-gray-500 mt-1 leading-tight">{c.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ───────────────────────────────── */}
      <section className="py-20 px-6 gradient-brand text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-4xl font-bold mb-4 leading-tight">
            Ready to find your light?
          </h2>
          <p className="text-white/80 mb-8 leading-relaxed">
            Join Lit Up free. Connect with a vetted practitioner, earn Karma, and be part of a community committed to conscious growth.
          </p>
          <Link
            href="/signup"
            className="bg-white text-brand-primary font-bold px-8 py-3.5 rounded-brand shadow-brand hover:bg-white/90 transition-all duration-[150ms] inline-block"
          >
            Begin your journey →
          </Link>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────── */}
      <footer className="bg-gray-900 text-gray-400 py-16 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-brand gradient-brand flex items-center justify-center text-white text-xs">✦</div>
              <span className="font-display font-bold text-white text-base">Lit Up</span>
            </div>
            <p className="text-sm leading-relaxed">Connecting lightworkers and seekers through trust, technology, and transformation.</p>
          </div>
          {[
            { heading: 'Platform', links: ['Explore', 'Lumi AI', 'Missions', 'LitScore™'] },
            { heading: 'Practitioners', links: ['Join as Practitioner', 'Onboarding', 'LitScore Guide', 'Earnings'] },
            { heading: 'Company', links: ['About', 'Trust Centre', 'Privacy', 'Terms'] },
          ].map((col) => (
            <div key={col.heading}>
              <h4 className="text-white font-semibold text-sm mb-4">{col.heading}</h4>
              <ul className="space-y-2">
                {col.links.map((l) => (
                  <li key={l}><a href="#" className="text-sm hover:text-white transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="max-w-6xl mx-auto mt-12 pt-6 border-t border-gray-800 text-xs text-center">
          © 2025 Lit Up LLC · All rights reserved
        </div>
      </footer>
    </div>
  )
}

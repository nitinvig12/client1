'use client'

import { useState } from 'react'
import Link from 'next/link'
import Nav from '@/components/Nav'
import FounderBadge from '@/components/FounderBadge'
import { practitioners } from '@/lib/mockData'

const modalities = ['All', 'Reiki', 'Sound Healing', 'Human Design', 'Tarot', 'Somatic', 'Astrology', 'Akashic Records', 'Kundalini']
const sorts = ['Relevance', 'Highest LitScore', 'Lowest Price', 'Soonest Available']

export default function ExplorePage() {
  const [search, setSearch] = useState('')
  const [selectedModality, setSelectedModality] = useState('All')
  const [maxPrice, setMaxPrice] = useState(200)
  const [minLitScore, setMinLitScore] = useState(0)
  const [sortBy, setSortBy] = useState('Relevance')
  const [verifiedOnly, setVerifiedOnly] = useState(false)
  const [fsaOnly, setFsaOnly] = useState(false)

  const filtered = practitioners
    .filter((p) => {
      if (verifiedOnly && !p.verified) return false
      if (fsaOnly && !p.fsaEligible) return false
      if (maxPrice < 200 && p.price > maxPrice) return false
      if (minLitScore > 0 && p.litScore < minLitScore) return false
      if (selectedModality !== 'All' && !p.modalities.some(m => m.includes(selectedModality))) return false
      if (search && !p.name.toLowerCase().includes(search.toLowerCase()) && !p.modality.toLowerCase().includes(search.toLowerCase())) return false
      return true
    })
    .sort((a, b) => {
      if (sortBy === 'Highest LitScore') return b.litScore - a.litScore
      if (sortBy === 'Lowest Price') return a.price - b.price
      return 0
    })

  return (
    <div className="min-h-screen bg-gray-50 font-body">
      <Nav />

      {/* Header */}
      <div className="bg-white border-b border-gray-100 shadow-brand">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <h1 className="font-display text-3xl font-bold text-gray-900 mb-4">Explore Practitioners</h1>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 flex items-center bg-gray-50 border border-gray-200 rounded-brand px-4 gap-2">
              <svg className="text-gray-400 flex-shrink-0" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
              </svg>
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search name or modality…"
                className="flex-1 py-2.5 text-sm outline-none bg-transparent text-gray-700 placeholder:text-gray-400"
              />
            </div>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="border border-gray-200 rounded-brand px-4 py-2.5 text-sm text-gray-700 bg-white outline-none focus:border-brand-primary"
            >
              {sorts.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
          {/* Modality chips */}
          <div className="flex gap-2 mt-4 overflow-x-auto pb-1">
            {modalities.map((m) => (
              <button
                key={m}
                onClick={() => setSelectedModality(m)}
                className={`flex-shrink-0 text-xs font-medium px-3.5 py-1.5 rounded-full border transition-all duration-[150ms] ${
                  selectedModality === m
                    ? 'gradient-brand text-white border-transparent'
                    : 'bg-white border-gray-200 text-gray-600 hover:border-brand-primary hover:text-brand-primary'
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 flex gap-6">
        {/* Sidebar filters */}
        <aside className="w-56 flex-shrink-0 hidden lg:block">
          <div className="bg-white rounded-brand shadow-brand border border-gray-100 p-5 sticky top-24 space-y-6">
            <div>
              <label className="text-xs font-semibold text-gray-700 uppercase tracking-wide block mb-2">Max Price</label>
              <input
                type="range" min={30} max={200} step={5} value={maxPrice}
                onChange={e => setMaxPrice(Number(e.target.value))}
                className="w-full accent-brand-primary"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>$30</span>
                <span className="font-semibold text-brand-primary">${maxPrice === 200 ? 'Any' : `≤$${maxPrice}`}</span>
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-700 uppercase tracking-wide block mb-2">Min LitScore</label>
              <input
                type="range" min={0} max={10} step={0.5} value={minLitScore}
                onChange={e => setMinLitScore(Number(e.target.value))}
                className="w-full accent-brand-primary"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Any</span>
                <span className="font-semibold text-brand-primary">{minLitScore > 0 ? `≥ ${minLitScore}` : 'Any'}</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm text-gray-700 font-medium">Verified only</label>
              <button
                onClick={() => setVerifiedOnly(v => !v)}
                className={`w-10 h-5 rounded-full transition-colors duration-[150ms] relative ${verifiedOnly ? 'gradient-brand' : 'bg-gray-200'}`}
              >
                <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform duration-[150ms] ${verifiedOnly ? 'translate-x-5' : 'translate-x-0.5'}`} />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm text-gray-700 font-medium">FSA Eligible</label>
              <button
                onClick={() => setFsaOnly(v => !v)}
                className={`w-10 h-5 rounded-full transition-colors duration-[150ms] relative ${fsaOnly ? 'gradient-brand' : 'bg-gray-200'}`}
              >
                <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform duration-[150ms] ${fsaOnly ? 'translate-x-5' : 'translate-x-0.5'}`} />
              </button>
            </div>
            <button
              onClick={() => { setSearch(''); setSelectedModality('All'); setMaxPrice(200); setMinLitScore(0); setVerifiedOnly(false); setFsaOnly(false) }}
              className="text-xs text-gray-400 hover:text-brand-primary transition-colors"
            >
              Reset all filters
            </button>
          </div>
        </aside>

        {/* Grid */}
        <div className="flex-1">
          <p className="text-sm text-gray-500 mb-5">{filtered.length} practitioner{filtered.length !== 1 ? 's' : ''} found</p>
          {filtered.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <p className="text-4xl mb-3">🔍</p>
              <p className="font-semibold text-gray-600">No practitioners match your filters</p>
              <p className="text-sm mt-1">Try adjusting your search or clearing filters</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {filtered.map((p) => (
                <Link
                  key={p.id}
                  href={`/practitioners/${p.id}`}
                  className="bg-white rounded-brand shadow-brand border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-[150ms] group"
                >
                  <div className={`h-24 bg-gradient-to-br ${p.avatarColor} flex items-end px-4 pb-3`}>
                    <div className="w-10 h-10 rounded-full bg-white/25 flex items-center justify-center text-white font-display font-bold text-lg">
                      {p.name.charAt(0)}
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <p className="font-semibold text-gray-900 text-sm">{p.name}</p>
                          {p.founder && <FounderBadge />}
                        </div>
                        <p className="text-xs text-gray-400 mt-0.5">{p.modality}</p>
                      </div>
                      {p.verified && (
                        <span className="text-brand-primary flex-shrink-0 mt-0.5" title="Verified">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M9 12l2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" /></svg>
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-1 mt-3 mb-3">
                      {p.modalities.slice(0, 2).map(m => (
                        <span key={m} className="text-xs bg-purple-50 text-brand-primary px-2 py-0.5 rounded-full">{m}</span>
                      ))}
                      {p.fsaEligible && (
                        <span className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full">FSA Eligible</span>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">★ {p.litScore}</span>
                        <span className="text-xs text-gray-400">{p.reviews} reviews</span>
                      </div>
                      <span className="text-sm font-bold text-gray-900">from ${p.price}</span>
                    </div>
                    <div className="mt-4">
                      <span className="block w-full gradient-brand text-white text-xs font-semibold py-2 rounded-brand text-center group-hover:opacity-90 transition-opacity">
                        View Profile →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

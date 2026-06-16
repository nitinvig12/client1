'use client'

import { useState } from 'react'
import Nav from '@/components/Nav'
import FounderBadge from '@/components/FounderBadge'
import { communityPosts } from '@/lib/mockData'

const channels = [
  { id: 'home', label: 'Home Feed', desc: 'Announcements, trending posts, and AMAs for everyone.' },
  { id: 'advice', label: 'Advice Hub', desc: 'Seekers ask questions, get peer and practitioner support.' },
  { id: 'practice', label: 'Practice Lab', desc: 'Seekers building consistent practice, sharing progress.' },
  { id: 'lounge', label: 'Practitioner Lounge', desc: 'Business tips, resources, and collaboration for practitioners.' },
  { id: 'founders', label: 'Founders Circle', desc: 'Private space for the first 111 — roadmap input and direct updates.' },
] as const

export default function CommunityPage() {
  const [channel, setChannel] = useState<typeof channels[number]['id']>('home')
  const posts = communityPosts.filter(p => p.channel === channel)
  const activeChannel = channels.find(c => c.id === channel)!

  return (
    <div className="min-h-screen bg-gray-50 font-body">
      <Nav />

      <div className="max-w-4xl mx-auto px-6 py-8">
        <h1 className="font-display text-3xl font-bold text-gray-900 mb-1">Community</h1>
        <p className="text-gray-500 text-sm mb-6">Where seekers and practitioners connect, ask, and grow together.</p>

        {/* Channel tabs */}
        <div className="flex gap-2 overflow-x-auto mb-2 pb-1">
          {channels.map(c => (
            <button
              key={c.id}
              onClick={() => setChannel(c.id)}
              className={`whitespace-nowrap text-sm px-4 py-2 rounded-full border transition-all duration-[150ms] ${
                channel === c.id
                  ? 'gradient-brand text-white border-transparent'
                  : 'border-gray-200 text-gray-600 hover:border-brand-primary hover:text-brand-primary'
              }`}
            >
              {c.label}
              {c.id === 'founders' && <span className="ml-1">✦</span>}
            </button>
          ))}
        </div>
        <p className="text-xs text-gray-400 mb-6">{activeChannel.desc}</p>

        {/* Composer */}
        <div className="bg-white rounded-brand shadow-brand border border-gray-100 p-4 mb-6 flex gap-3">
          <div className="w-9 h-9 rounded-full gradient-brand flex items-center justify-center text-white text-xs font-bold flex-shrink-0">G</div>
          <input
            placeholder={`Share something with ${activeChannel.label}…`}
            className="flex-1 text-sm outline-none placeholder:text-gray-400"
          />
          <button className="text-xs gradient-brand text-white px-4 py-2 rounded-brand font-semibold flex-shrink-0">Post</button>
        </div>

        {/* Posts */}
        <div className="space-y-4">
          {posts.length === 0 && (
            <p className="text-sm text-gray-400 text-center py-10">No posts yet in this channel.</p>
          )}
          {posts.map(p => (
            <div key={p.id} className={`bg-white rounded-brand shadow-brand border p-5 ${p.pinned ? 'border-brand-primary/40' : 'border-gray-100'}`}>
              {p.pinned && (
                <p className="text-xs font-semibold text-brand-primary mb-2 flex items-center gap-1">📌 Pinned</p>
              )}
              <div className="flex items-start gap-3 mb-3">
                <div className="w-9 h-9 rounded-full gradient-brand flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                  {p.author.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-gray-900">{p.author}</p>
                    {p.founder && <FounderBadge />}
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      p.authorRole === 'admin' ? 'bg-gray-900 text-white' :
                      p.authorRole === 'practitioner' ? 'bg-purple-50 text-brand-primary' :
                      'bg-green-50 text-green-700'
                    }`}>
                      {p.authorRole}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400">{p.time}</p>
                </div>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed mb-3">{p.text}</p>
              <div className="flex items-center gap-5 text-xs text-gray-400">
                <button className="hover:text-brand-primary transition-colors">♥ {p.likes}</button>
                <button className="hover:text-brand-primary transition-colors">💬 {p.comments} comments</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import Nav from '@/components/Nav'
import { practitioners } from '@/lib/mockData'
import { SunIcon } from '@/components/Nav'

type Message = { from: 'lumi' | 'user'; text: string }

const starterMessages: Message[] = [
  { from: 'lumi', text: "Hi! I'm Lumi ✦ I'm here to help you find the right practitioner for exactly what you're going through. What brings you to Lit Up today?" },
]

const responses: Record<string, { reply: string; matches?: typeof practitioners }> = {
  default: {
    reply: "Thank you for sharing that. Based on what you've told me, I'm sensing a need for energetic support and clarity. Would you like to explore energy healing, intuitive guidance, or something more body-based like breathwork?",
  },
  breathwork: {
    reply: "Breathwork is a powerful choice for anxiety and feeling stuck. I've found 3 practitioners whose approach could really resonate with you.",
    matches: practitioners.filter(p => p.modalities.some(m => m.toLowerCase().includes('breath') || m.toLowerCase().includes('sound'))).slice(0, 3),
  },
  reiki: {
    reply: "Reiki is a beautiful gentle modality — deeply calming and effective for clearing stagnant energy. Here are your top matches.",
    matches: practitioners.filter(p => p.modalities.some(m => m.toLowerCase().includes('reiki') || m.toLowerCase().includes('energy'))).slice(0, 3),
  },
  tarot: {
    reply: "Intuitive readings can be so clarifying when you're at a crossroads. Let me show you some of our most trusted readers.",
    matches: practitioners.filter(p => p.modalities.some(m => m.toLowerCase().includes('tarot') || m.toLowerCase().includes('intuitive'))).slice(0, 3),
  },
  astrology: {
    reply: "Astrology and Human Design offer such rich maps of the self. These practitioners specialise in chart-based guidance.",
    matches: practitioners.filter(p => p.modalities.some(m => m.toLowerCase().includes('astrology') || m.toLowerCase().includes('human design'))).slice(0, 3),
  },
}

function getResponse(text: string): { reply: string; matches?: typeof practitioners } {
  const lower = text.toLowerCase()
  if (lower.includes('breath')) return responses.breathwork
  if (lower.includes('reiki') || lower.includes('energy')) return responses.reiki
  if (lower.includes('tarot') || lower.includes('oracle') || lower.includes('reading')) return responses.tarot
  if (lower.includes('astro') || lower.includes('human design') || lower.includes('chart')) return responses.astrology
  return responses.default
}

export default function LumiPage() {
  const [messages, setMessages] = useState<Message[]>(starterMessages)
  const [input, setInput] = useState('')
  const [matches, setMatches] = useState<typeof practitioners | null>(null)
  const [typing, setTyping] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  const send = () => {
    if (!input.trim()) return
    const userMsg: Message = { from: 'user', text: input }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setTyping(true)

    const { reply, matches: m } = getResponse(input)
    setTimeout(() => {
      setTyping(false)
      setMessages(prev => [...prev, { from: 'lumi', text: reply }])
      if (m) setMatches(m)
    }, 1200)
  }

  return (
    <div className="min-h-screen bg-gray-50 font-body flex flex-col">
      <Nav />

      <div className="flex-1 max-w-7xl mx-auto w-full px-6 py-8 flex gap-6">
        {/* Chat panel */}
        <div className="flex-1 flex flex-col bg-white rounded-brand shadow-brand border border-gray-100 overflow-hidden">
          {/* Chat header */}
          <div className="gradient-brand p-5 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white">
              <SunIcon size={18} />
            </div>
            <div>
              <p className="font-display font-bold text-white text-lg">Lumi AI</p>
              <p className="text-white/70 text-xs">300+ modalities · Always here for you</p>
            </div>
            <div className="ml-auto flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-green-300 animate-pulse" />
              <span className="text-white/70 text-xs">Active</span>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4" style={{ maxHeight: '480px' }}>
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'} gap-2`}>
                {msg.from === 'lumi' && (
                  <div className="w-7 h-7 rounded-full gradient-brand flex items-center justify-center text-white flex-shrink-0 mt-1">
                    <SunIcon size={12} />
                  </div>
                )}
                <div className={`max-w-[75%] px-4 py-3 rounded-brand text-sm leading-relaxed ${
                  msg.from === 'lumi'
                    ? 'bg-gray-50 text-gray-700 border border-gray-100'
                    : 'gradient-brand text-white'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex gap-2 items-center">
                <div className="w-7 h-7 rounded-full gradient-brand flex items-center justify-center text-white flex-shrink-0">
                  <SunIcon size={12} />
                </div>
                <div className="bg-gray-50 border border-gray-100 px-4 py-3 rounded-brand flex gap-1 items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="border-t border-gray-100 p-4 flex gap-3">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && send()}
              placeholder="Tell Lumi what you're going through…"
              className="flex-1 border border-gray-200 rounded-brand px-4 py-2.5 text-sm outline-none focus:border-brand-primary transition-colors"
            />
            <button
              onClick={send}
              disabled={!input.trim()}
              className="gradient-brand text-white px-5 py-2.5 rounded-brand font-semibold text-sm shadow-brand hover:opacity-90 disabled:opacity-40 transition-all duration-[150ms]"
            >
              Send
            </button>
          </div>
        </div>

        {/* Matches sidebar */}
        <div className="w-80 flex-shrink-0 hidden lg:flex flex-col gap-4">
          <div className="bg-white rounded-brand shadow-brand border border-gray-100 p-5">
            <p className="font-display font-bold text-gray-900 mb-1">
              {matches ? 'Your Matches ✦' : 'Suggested for You'}
            </p>
            <p className="text-xs text-gray-400 mb-4">
              {matches ? 'Based on your conversation with Lumi' : 'Tell Lumi more to refine these matches'}
            </p>
            <div className="space-y-3">
              {(matches ?? practitioners.slice(0, 3)).map((p) => (
                <Link
                  key={p.id}
                  href={`/practitioners/${p.id}`}
                  className="flex items-center gap-3 p-3 rounded-brand border border-gray-100 hover:border-brand-primary/30 hover:bg-purple-50/30 transition-all duration-[150ms]"
                >
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${p.avatarColor} flex items-center justify-center text-white font-bold flex-shrink-0`}>
                    {p.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate">{p.name}</p>
                    <p className="text-xs text-gray-400 truncate">{p.modality}</p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="text-xs font-bold text-amber-600">★ {p.litScore}</span>
                      <span className="text-xs text-gray-400">from ${p.price}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Crisis notice */}
          <div className="bg-rose-50 border border-rose-100 rounded-brand p-4">
            <p className="text-xs font-semibold text-rose-700 mb-1">Feeling overwhelmed?</p>
            <p className="text-xs text-rose-600 leading-relaxed">
              If you're in crisis, Lumi will always connect you with immediate support. You're not alone.
            </p>
            <a href="tel:988" className="text-xs font-bold text-rose-700 mt-2 block hover:underline">
              Call/Text 988 →
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

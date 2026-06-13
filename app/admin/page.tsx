'use client'

import { useState } from 'react'
import Nav from '@/components/Nav'

const metrics = [
  { label: 'Total Users', value: '1,248', sub: '+34 this week', color: 'text-brand-primary' },
  { label: 'Active Sessions', value: '89', sub: 'Right now', color: 'text-green-600' },
  { label: 'Pending Approvals', value: '7', sub: 'Practitioners awaiting review', color: 'text-amber-600' },
  { label: 'AI Alerts', value: '2', sub: 'Require human follow-up', color: 'text-rose-600' },
  { label: 'Revenue (Nov)', value: '$18.4k', sub: '+12% vs October', color: 'text-brand-primary' },
  { label: 'LitScore Appeals', value: '3', sub: 'Awaiting audit', color: 'text-amber-600' },
]

const moderationQueue = [
  { type: 'Testimonial', user: 'Gemma R. → Aria Moonstone', excerpt: '"Completely transformed my..." — 5 stars', time: '12 min ago', risk: 'low' },
  { type: 'Message Flag', user: 'Anonymous Seeker', excerpt: 'Lumi detected potential crisis keywords', time: '38 min ago', risk: 'high' },
  { type: 'Testimonial', user: 'Jordan L. → Kai Sundaram', excerpt: '"Kai\'s session was..." — 4 stars', time: '2 hr ago', risk: 'low' },
  { type: 'New Practitioner', user: 'David Chen — Acupuncture', excerpt: 'Profile submitted for review', time: '4 hr ago', risk: 'medium' },
]

const appeals = [
  { practitioner: 'Soleil Arcana', currentScore: 8.7, requestedScore: 9.1, reason: 'External reviews not being captured from Google', submitted: '2 days ago' },
  { practitioner: 'Orion Blake', currentScore: 9.0, requestedScore: 9.3, reason: 'Recent surge in repeat bookings not reflected', submitted: '3 days ago' },
]

const adminTabs = ['Dashboard', 'Moderation', 'Users', 'Appeals', 'Support', 'Settings']

export default function AdminPage() {
  const [tab, setTab] = useState('Dashboard')

  return (
    <div className="min-h-screen bg-gray-50 font-body">
      <Nav />

      {/* Admin header */}
      <div className="bg-white border-b border-gray-100 shadow-brand">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold text-gray-900">Admin Console</h1>
            <p className="text-xs text-gray-400 mt-0.5">Lit Up Operations · Full access</p>
          </div>
          <span className="text-xs font-semibold bg-red-50 text-red-600 px-3 py-1.5 rounded-full">● 2 Alerts</span>
        </div>
        <div className="max-w-7xl mx-auto px-6 flex gap-0 overflow-x-auto">
          {adminTabs.map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-5 py-3 text-sm font-medium border-b-2 -mb-px transition-colors whitespace-nowrap ${
                tab === t ? 'border-brand-primary text-brand-primary' : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">

        {tab === 'Dashboard' && (
          <div className="space-y-8">
            {/* KPI grid */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              {metrics.map(m => (
                <div key={m.label} className="bg-white rounded-brand shadow-brand border border-gray-100 p-5">
                  <p className="text-xs text-gray-400 uppercase tracking-wide mb-2">{m.label}</p>
                  <p className={`font-display text-3xl font-bold mb-1 ${m.color}`}>{m.value}</p>
                  <p className="text-xs text-gray-400">{m.sub}</p>
                </div>
              ))}
            </div>

            {/* Recent moderation */}
            <div className="bg-white rounded-brand shadow-brand border border-gray-100 p-6">
              <h2 className="font-display text-xl font-bold text-gray-900 mb-5">Moderation Queue</h2>
              <div className="space-y-3">
                {moderationQueue.map((item, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 rounded-brand border border-gray-100">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full flex-shrink-0 ${
                      item.type === 'Message Flag' ? 'bg-rose-50 text-rose-700' :
                      item.type === 'New Practitioner' ? 'bg-blue-50 text-blue-700' :
                      'bg-gray-100 text-gray-600'
                    }`}>{item.type}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 truncate">{item.user}</p>
                      <p className="text-xs text-gray-400 truncate">{item.excerpt}</p>
                    </div>
                    <span className="text-xs text-gray-400 flex-shrink-0">{item.time}</span>
                    <div className="flex gap-2">
                      <button className="text-xs text-green-600 bg-green-50 px-3 py-1.5 rounded-brand font-semibold hover:bg-green-100 transition-colors">Approve</button>
                      <button className="text-xs text-red-600 bg-red-50 px-3 py-1.5 rounded-brand font-semibold hover:bg-red-100 transition-colors">Reject</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {tab === 'Moderation' && (
          <div className="bg-white rounded-brand shadow-brand border border-gray-100 p-6">
            <h2 className="font-display text-xl font-bold text-gray-900 mb-5">All Moderation Items</h2>
            <div className="space-y-3">
              {moderationQueue.map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-4 rounded-brand border border-gray-100">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full flex-shrink-0 ${
                    item.risk === 'high' ? 'bg-rose-50 text-rose-700' :
                    item.risk === 'medium' ? 'bg-amber-50 text-amber-700' :
                    'bg-gray-100 text-gray-600'
                  }`}>{item.risk === 'high' ? '🚨 HIGH' : item.risk === 'medium' ? '⚠ MED' : '● LOW'}</span>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900">{item.user}</p>
                    <p className="text-xs text-gray-500 mb-2">{item.excerpt}</p>
                    <div className="flex gap-2">
                      <button className="text-xs text-green-600 bg-green-50 px-3 py-1.5 rounded-brand font-semibold">Approve</button>
                      <button className="text-xs text-red-600 bg-red-50 px-3 py-1.5 rounded-brand font-semibold">Reject</button>
                      <button className="text-xs text-blue-600 bg-blue-50 px-3 py-1.5 rounded-brand font-semibold">Review Full</button>
                    </div>
                  </div>
                  <span className="text-xs text-gray-400">{item.time}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'Users' && (
          <div className="bg-white rounded-brand shadow-brand border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-display text-xl font-bold text-gray-900">User Management</h2>
              <input placeholder="Search users…" className="border border-gray-200 rounded-brand px-4 py-2 text-sm outline-none focus:border-brand-primary w-56" />
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs text-gray-400 uppercase tracking-wide border-b border-gray-100">
                  <th className="text-left pb-3">User</th>
                  <th className="text-left pb-3">Role</th>
                  <th className="text-left pb-3">Karma</th>
                  <th className="text-left pb-3">Status</th>
                  <th className="text-left pb-3">Joined</th>
                  <th className="pb-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[
                  { name: 'Aria Moonstone', role: 'Practitioner', karma: 1240, status: 'active', joined: 'Oct 2025', founder: true },
                  { name: 'Gemma R.', role: 'Seeker', karma: 320, status: 'active', joined: 'Oct 2025', founder: false },
                  { name: 'Kai Sundaram', role: 'Practitioner', karma: 980, status: 'active', joined: 'Sep 2025', founder: true },
                  { name: 'Jordan L.', role: 'Seeker', karma: 115, status: 'active', joined: 'Nov 2025', founder: false },
                  { name: 'David Chen', role: 'Practitioner', karma: 0, status: 'pending', joined: 'Nov 2025', founder: false },
                ].map((u) => (
                  <tr key={u.name} className="py-3">
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full gradient-brand flex items-center justify-center text-white text-xs font-bold">{u.name.charAt(0)}</div>
                        <span className="font-medium text-gray-900">{u.name}</span>
                        {u.founder && <span className="text-xs bg-amber-50 text-amber-700 px-1.5 py-0.5 rounded font-semibold">Founder ×1.5</span>}
                      </div>
                    </td>
                    <td className="py-3 text-gray-500">{u.role}</td>
                    <td className="py-3 text-brand-primary font-semibold">{u.karma}</td>
                    <td className="py-3">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${u.status === 'active' ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'}`}>{u.status}</span>
                    </td>
                    <td className="py-3 text-gray-400">{u.joined}</td>
                    <td className="py-3">
                      <button className="text-xs text-gray-400 hover:text-red-600 transition-colors">Deactivate</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {tab === 'Appeals' && (
          <div className="space-y-4">
            <h2 className="font-display text-xl font-bold text-gray-900">LitScore™ Appeals</h2>
            {appeals.map((a, i) => (
              <div key={i} className="bg-white rounded-brand shadow-brand border border-gray-100 p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-semibold text-gray-900">{a.practitioner}</p>
                    <p className="text-xs text-gray-400">Submitted {a.submitted}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-400">Current → Requested</p>
                    <p className="font-bold text-gray-900">{a.currentScore} → <span className="text-green-600">{a.requestedScore}</span></p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-4 bg-gray-50 rounded-brand p-3">{a.reason}</p>
                <div className="flex gap-2">
                  <button className="text-xs text-green-600 bg-green-50 px-4 py-2 rounded-brand font-semibold hover:bg-green-100 transition-colors">Approve Recalculation</button>
                  <button className="text-xs text-gray-600 bg-gray-100 px-4 py-2 rounded-brand font-semibold hover:bg-gray-200 transition-colors">Request More Info</button>
                  <button className="text-xs text-red-600 bg-red-50 px-4 py-2 rounded-brand font-semibold hover:bg-red-100 transition-colors">Deny Appeal</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'Settings' && (
          <div className="bg-white rounded-brand shadow-brand border border-gray-100 p-6 space-y-6">
            <h2 className="font-display text-xl font-bold text-gray-900">System Settings</h2>
            {[
              { label: 'Founders Karma Multiplier', value: '1.5×', type: 'text' },
              { label: 'Anti-gaming Daily Karma Cap', value: '200', type: 'number' },
              { label: 'Vibe Check Duration (mins)', value: '20', type: 'number' },
              { label: 'Session Auto-buffer (mins)', value: '15', type: 'number' },
              { label: 'Founding Member Count (First N)', value: '111', type: 'number' },
            ].map(setting => (
              <div key={setting.label} className="flex items-center justify-between gap-8">
                <label className="text-sm font-medium text-gray-700">{setting.label}</label>
                <input
                  type={setting.type}
                  defaultValue={setting.value}
                  className="w-32 border border-gray-200 rounded-brand px-3 py-2 text-sm text-right outline-none focus:border-brand-primary"
                />
              </div>
            ))}
            <div className="pt-4 border-t border-gray-100">
              <button className="gradient-brand text-white font-semibold px-6 py-2.5 rounded-brand shadow-brand text-sm hover:opacity-90 transition-all">
                Save Settings
              </button>
            </div>
          </div>
        )}

        {(tab === 'Support') && (
          <div className="bg-white rounded-brand shadow-brand border border-gray-100 p-6">
            <h2 className="font-display text-xl font-bold text-gray-900 mb-5">Support Inbox</h2>
            {[
              { from: 'Gemma R.', subject: 'Unable to join video session', time: '1 hr ago', status: 'open' },
              { from: 'David Chen', subject: 'Profile approval status?', time: '3 hr ago', status: 'open' },
              { from: 'Jordan L.', subject: 'Refund request for cancelled session', time: 'Yesterday', status: 'resolved' },
            ].map((ticket, i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-brand border border-gray-100 mb-3">
                <div className="w-8 h-8 rounded-full gradient-brand flex items-center justify-center text-white text-xs font-bold flex-shrink-0">{ticket.from.charAt(0)}</div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-900">{ticket.from}</p>
                  <p className="text-xs text-gray-500">{ticket.subject}</p>
                </div>
                <span className="text-xs text-gray-400">{ticket.time}</span>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${ticket.status === 'open' ? 'bg-amber-50 text-amber-700' : 'bg-green-50 text-green-700'}`}>{ticket.status}</span>
                <button className="text-xs gradient-brand text-white px-3 py-1.5 rounded-brand font-semibold">Reply</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

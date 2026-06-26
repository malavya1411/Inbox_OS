import { useState } from 'react'
import { motion } from 'framer-motion'
import { Users, Search, Bell, BellOff, BookOpen, Star } from 'lucide-react'
import { AppLayout } from '../components/layout/AppLayout'
import { SENDERS } from '../data/mock'
import { Select } from '../components/ui/Input'

const PRIORITY_OPTIONS = [
  { value: 'always_notify', label: '🔔 Always Notify', color: 'text-indigo-300' },
  { value: 'normal', label: '📧 Normal', color: 'text-slate-300' },
  { value: 'digest', label: '📋 Digest Only', color: 'text-amber-300' },
  { value: 'never_notify', label: '🔕 Never Notify', color: 'text-slate-500' },
]

export function SendersPage() {
  const [senders, setSenders] = useState(SENDERS)
  const [search, setSearch] = useState('')

  const filtered = senders.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.email.toLowerCase().includes(search.toLowerCase())
  )

  const updateSender = (id, field, value) => {
    setSenders(prev => prev.map(s => s.id === id ? { ...s, [field]: value } : s))
  }

  return (
    <AppLayout title="Sender Preferences" subtitle="Customize how InboxOS handles emails from specific senders">
      <div className="max-w-3xl space-y-4">

        {/* Search */}
        <div className="relative">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search senders..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-9 rounded-xl border border-white/10 bg-white/5 pl-9 pr-3 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 transition-all"
          />
        </div>

        {/* Senders list */}
        <div className="glass rounded-2xl overflow-hidden">
          {filtered.map((sender, i) => (
            <motion.div
              key={sender.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center gap-4 p-4 border-b border-white/5 hover:bg-white/3 transition-all"
            >
              <div className="h-10 w-10 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0"
                style={{ background: `hsl(${sender.email.charCodeAt(0) * 5 % 360}, 55%, 40%)` }}>
                {sender.name[0]}
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white">{sender.name}</p>
                <p className="text-xs text-slate-400">{sender.email}</p>
                <p className="text-xs text-slate-500 mt-0.5">{sender.emails_count} emails received</p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <select
                  value={sender.priority}
                  onChange={(e) => updateSender(sender.id, 'priority', e.target.value)}
                  className="h-8 rounded-lg border border-white/10 bg-surface-800 text-xs text-slate-200 px-2 focus:outline-none focus:border-indigo-500/50"
                >
                  {PRIORITY_OPTIONS.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Legend */}
        <div className="glass rounded-xl p-4">
          <p className="text-xs font-medium text-slate-300 mb-2">Priority Levels</p>
          <div className="grid grid-cols-2 gap-2">
            {PRIORITY_OPTIONS.map(opt => (
              <div key={opt.value} className="flex items-center gap-2 text-xs">
                <span className={opt.color}>{opt.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  )
}

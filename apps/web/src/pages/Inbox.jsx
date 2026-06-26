import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Filter, Search, SlidersHorizontal } from 'lucide-react'
import { AppLayout } from '../components/layout/AppLayout'
import { EmailCard } from '../components/email/EmailCard'
import { CategoryBadge } from '../components/ui/Badge'
import { useEmailStore } from '../stores/emailStore'

const CATEGORIES = ['all', 'academic', 'job', 'finance', 'meeting', 'otp', 'newsletter', 'personal', 'support']

export function InboxPage() {
  const navigate = useNavigate()
  const { getFilteredEmails, filter, setFilter, searchQuery, setSearchQuery } = useEmailStore()
  const [activeCategory, setActiveCategory] = useState('all')

  const emails = getFilteredEmails()

  const handleCategoryFilter = (cat) => {
    setActiveCategory(cat)
    setFilter({ category: cat === 'all' ? null : cat })
  }

  return (
    <AppLayout title="Inbox" subtitle={`${emails.length} emails · sorted by priority`}>
      <div className="max-w-4xl">
        {/* Filter bar */}
        <div className="flex items-center gap-3 mb-5">
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search emails..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-9 rounded-xl border border-white/10 bg-white/5 pl-9 pr-3 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 transition-all"
            />
          </div>
          <button className="h-9 px-3 rounded-xl border border-white/10 bg-white/5 text-slate-400 hover:text-white flex items-center gap-2 text-sm transition-all hover:bg-white/8">
            <SlidersHorizontal size={14} />
            Filter
          </button>
        </div>

        {/* Category tabs */}
        <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-1 scrollbar-hide">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryFilter(cat)}
              className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeCategory === cat
                  ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {cat === 'all' ? 'All Emails' : cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        {/* Email List */}
        <div className="glass rounded-2xl overflow-hidden">
          {emails.length === 0 ? (
            <div className="py-16 text-center">
              <p className="text-slate-400">No emails match your filters.</p>
            </div>
          ) : (
            emails.map((email) => (
              <EmailCard
                key={email.id}
                email={email}
                onClick={() => navigate(`/inbox/${email.id}`)}
              />
            ))
          )}
        </div>
      </div>
    </AppLayout>
  )
}

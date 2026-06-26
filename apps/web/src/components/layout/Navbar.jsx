import { Search, Bell, RefreshCw } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useUIStore } from '../../stores/uiStore'
import { useEmailStore } from '../../stores/emailStore'

export function Navbar({ title, subtitle }) {
  const { activeNotification } = useUIStore()
  const { searchQuery, setSearchQuery } = useEmailStore()

  return (
    <header className="h-14 flex items-center justify-between px-6 border-b border-white/5 shrink-0 bg-surface-900/50 backdrop-blur-sm sticky top-0 z-10">
      <div className="flex flex-col">
        <h1 className="text-base font-semibold text-white leading-tight">{title}</h1>
        {subtitle && <p className="text-xs text-slate-400">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="relative hidden md:block">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search emails..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-8 w-56 rounded-lg border border-white/10 bg-white/5 pl-8 pr-3 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 transition-all"
          />
        </div>

        {/* Refresh */}
        <button className="h-8 w-8 flex items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-all">
          <RefreshCw size={14} />
        </button>

        {/* Notifications */}
        <button className="h-8 w-8 relative flex items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-all">
          <Bell size={14} />
          <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-indigo-500" />
        </button>
      </div>

      {/* Toast notification */}
      <AnimatePresence>
        {activeNotification && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: -20, x: '-50%' }}
            className="fixed top-4 left-1/2 z-50 glass border border-indigo-500/30 px-4 py-3 rounded-xl shadow-xl shadow-black/40"
          >
            <p className="text-sm text-slate-200">{activeNotification}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

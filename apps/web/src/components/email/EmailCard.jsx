import { motion } from 'framer-motion'
import { Star, Archive, Clock } from 'lucide-react'
import { PriorityBadge, CategoryBadge } from '../ui/Badge'
import { useEmailStore } from '../../stores/emailStore'
import { formatDistanceToNow } from '../../utils/time'

export function EmailCard({ email, onClick, isSelected = false }) {
  const { starEmail, archiveEmail, markRead } = useEmailStore()

  const handleStar = (e) => {
    e.stopPropagation()
    starEmail(email.id)
  }

  const handleArchive = (e) => {
    e.stopPropagation()
    archiveEmail(email.id)
  }

  const handleClick = () => {
    markRead(email.id)
    onClick?.(email)
  }

  const priorityScore = email.analysis?.priority_score || 0
  const category = email.analysis?.category

  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ x: 2 }}
      onClick={handleClick}
      className={`
        group relative flex items-start gap-3 p-4 cursor-pointer transition-all duration-150
        border-b border-white/5 hover:bg-white/3
        ${isSelected ? 'bg-indigo-500/8 border-l-2 border-l-indigo-500' : ''}
        ${!email.is_read ? 'bg-white/2' : ''}
      `}
    >
      {/* Unread indicator */}
      {!email.is_read && (
        <div className="absolute left-1.5 top-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-indigo-500 shrink-0" />
      )}

      {/* Avatar */}
      <div className="h-9 w-9 rounded-full shrink-0 flex items-center justify-center text-sm font-semibold text-white"
        style={{ background: `hsl(${email.sender_email.charCodeAt(0) * 5 % 360}, 60%, 40%)` }}>
        {(email.sender_name || email.sender_email)[0].toUpperCase()}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 mb-0.5">
          <p className={`text-sm truncate ${!email.is_read ? 'font-semibold text-white' : 'font-medium text-slate-300'}`}>
            {email.sender_name || email.sender_email}
          </p>
          <div className="flex items-center gap-1.5 shrink-0">
            {priorityScore >= 70 && <PriorityBadge score={priorityScore} size="xs" />}
            <span className="text-xs text-slate-500">
              {formatDistanceToNow(email.received_at)}
            </span>
          </div>
        </div>

        <p className={`text-sm truncate ${!email.is_read ? 'text-slate-200' : 'text-slate-400'}`}>
          {email.subject}
        </p>
        <p className="text-xs text-slate-500 truncate mt-0.5">{email.snippet}</p>

        <div className="flex items-center gap-2 mt-2">
          {category && <CategoryBadge category={category} size="xs" />}
          {email.analysis?.summary && (
            <p className="text-xs text-slate-500 truncate flex-1">
              {email.analysis.summary}
            </p>
          )}
        </div>
      </div>

      {/* Actions (visible on hover) */}
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
        <button onClick={handleStar} className={`p-1.5 rounded-lg hover:bg-white/10 transition-colors ${email.is_starred ? 'text-amber-400' : 'text-slate-500'}`}>
          <Star size={13} fill={email.is_starred ? 'currentColor' : 'none'} />
        </button>
        <button onClick={handleArchive} className="p-1.5 rounded-lg hover:bg-white/10 text-slate-500 hover:text-slate-300 transition-colors">
          <Archive size={13} />
        </button>
      </div>
    </motion.div>
  )
}

const PRIORITY_CONFIG = {
  critical: { label: 'Critical', class: 'badge-critical', dot: 'bg-red-400' },
  high: { label: 'High', class: 'badge-high', dot: 'bg-orange-400' },
  urgent: { label: 'Urgent', class: 'badge-critical', dot: 'bg-red-400' },
  medium: { label: 'Medium', class: 'badge-medium', dot: 'bg-yellow-400' },
  low: { label: 'Low', class: 'badge-low', dot: 'bg-green-400' },
}

const CATEGORY_CONFIG = {
  academic: { label: 'Academic', class: 'badge-academic', emoji: '🎓' },
  job: { label: 'Job', class: 'badge-job', emoji: '💼' },
  finance: { label: 'Finance', class: 'badge-finance', emoji: '💰' },
  meeting: { label: 'Meeting', class: 'badge-meeting', emoji: '📅' },
  otp: { label: 'OTP', class: 'badge-otp', emoji: '🔑' },
  newsletter: { label: 'Newsletter', class: 'badge-newsletter', emoji: '📰' },
  personal: { label: 'Personal', class: 'badge-personal', emoji: '👤' },
  support: { label: 'Support', class: 'badge-support', emoji: '🛠️' },
  urgent: { label: 'Urgent', class: 'badge-critical', emoji: '🚨' },
}

export function PriorityBadge({ score, size = 'sm' }) {
  let level = 'low'
  if (score >= 90) level = 'critical'
  else if (score >= 70) level = 'high'
  else if (score >= 40) level = 'medium'

  const config = PRIORITY_CONFIG[level]
  const sizeClass = size === 'xs' ? 'text-xs px-1.5 py-0.5 rounded' : 'text-xs px-2 py-1 rounded-md'

  return (
    <span className={`inline-flex items-center gap-1 font-medium ${config.class} ${sizeClass}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${config.dot}`} />
      {score.toFixed(0)}
    </span>
  )
}

export function CategoryBadge({ category, size = 'sm' }) {
  const config = CATEGORY_CONFIG[category] || { label: category, class: 'badge-newsletter', emoji: '📧' }
  const sizeClass = size === 'xs' ? 'text-xs px-1.5 py-0.5 rounded gap-0.5' : 'text-xs px-2 py-1 rounded-md gap-1'

  return (
    <span className={`inline-flex items-center font-medium ${config.class} ${sizeClass}`}>
      <span>{config.emoji}</span>
      {config.label}
    </span>
  )
}

export function StatusBadge({ status }) {
  const configs = {
    pending: 'bg-yellow-500/15 text-yellow-300 border border-yellow-500/20',
    sent: 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/20',
    failed: 'bg-red-500/15 text-red-300 border border-red-500/20',
    done: 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/20',
    in_progress: 'bg-blue-500/15 text-blue-300 border border-blue-500/20',
    cancelled: 'bg-slate-500/15 text-slate-400 border border-slate-500/20',
    active: 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/20',
    inactive: 'bg-slate-500/15 text-slate-400 border border-slate-500/20',
  }
  return (
    <span className={`inline-flex items-center text-xs px-2 py-1 rounded-md font-medium ${configs[status] || configs.pending}`}>
      {status?.replace('_', ' ')}
    </span>
  )
}

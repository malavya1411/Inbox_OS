import { motion } from 'framer-motion'

export function Card({ children, className = '', hover = false, onClick, animate = true }) {
  const Wrapper = animate ? motion.div : 'div'
  return (
    <Wrapper
      initial={animate ? { opacity: 0, y: 8 } : undefined}
      animate={animate ? { opacity: 1, y: 0 } : undefined}
      transition={animate ? { duration: 0.2 } : undefined}
      onClick={onClick}
      className={`
        glass
        ${hover ? 'glass-hover cursor-pointer' : ''}
        ${className}
      `}
    >
      {children}
    </Wrapper>
  )
}

export function CardHeader({ children, className = '' }) {
  return <div className={`p-4 border-b border-white/5 ${className}`}>{children}</div>
}

export function CardBody({ children, className = '' }) {
  return <div className={`p-4 ${className}`}>{children}</div>
}

export function StatCard({ label, value, icon: Icon, trend, color = 'brand' }) {
  const colors = {
    brand: 'from-indigo-500/20 to-indigo-600/5 border-indigo-500/20',
    cyan: 'from-cyan-500/20 to-cyan-600/5 border-cyan-500/20',
    emerald: 'from-emerald-500/20 to-emerald-600/5 border-emerald-500/20',
    amber: 'from-amber-500/20 to-amber-600/5 border-amber-500/20',
    red: 'from-red-500/20 to-red-600/5 border-red-500/20',
  }

  const iconColors = {
    brand: 'text-indigo-400',
    cyan: 'text-cyan-400',
    emerald: 'text-emerald-400',
    amber: 'text-amber-400',
    red: 'text-red-400',
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-gradient-to-br ${colors[color]} border rounded-2xl p-5`}
    >
      <div className="flex items-start justify-between mb-3">
        <p className="text-slate-400 text-sm font-medium">{label}</p>
        {Icon && (
          <div className={`p-2 rounded-lg bg-white/5 ${iconColors[color]}`}>
            <Icon size={16} />
          </div>
        )}
      </div>
      <p className="text-3xl font-bold text-white">{value}</p>
      {trend && <p className="text-xs text-slate-400 mt-1">{trend}</p>}
    </motion.div>
  )
}

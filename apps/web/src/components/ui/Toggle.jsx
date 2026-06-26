import { motion, AnimatePresence } from 'framer-motion'

export function Toggle({ checked, onChange, label, description, size = 'md' }) {
  const sizes = {
    sm: { track: 'w-8 h-4', thumb: 'h-3 w-3', translate: 'translate-x-4' },
    md: { track: 'w-11 h-6', thumb: 'h-5 w-5', translate: 'translate-x-5' },
    lg: { track: 'w-14 h-7', thumb: 'h-6 w-6', translate: 'translate-x-7' },
  }
  const s = sizes[size]

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="flex items-start gap-3 text-left group"
    >
      <div className={`
        ${s.track} relative rounded-full transition-all duration-300 shrink-0 mt-0.5
        ${checked ? 'bg-indigo-500 shadow-lg shadow-indigo-500/30' : 'bg-white/10'}
      `}>
        <motion.div
          animate={{ x: checked ? (size === 'sm' ? 16 : size === 'lg' ? 28 : 20) : 2 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          className={`absolute top-0.5 ${s.thumb} rounded-full bg-white shadow-sm`}
          style={{ marginTop: size === 'md' ? '2px' : size === 'sm' ? '0.5px' : '2px' }}
        />
      </div>
      {(label || description) && (
        <div>
          {label && <p className="text-sm font-medium text-slate-200 group-hover:text-white transition-colors">{label}</p>}
          {description && <p className="text-xs text-slate-400 mt-0.5">{description}</p>}
        </div>
      )}
    </button>
  )
}

export function Slider({ value, onChange, min = 0, max = 100, step = 1, label, showValue = true }) {
  return (
    <div className="flex flex-col gap-2">
      {(label || showValue) && (
        <div className="flex items-center justify-between">
          {label && <span className="text-sm text-slate-300">{label}</span>}
          {showValue && <span className="text-sm font-mono text-indigo-400">{value}</span>}
        </div>
      )}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-1.5 rounded-full appearance-none cursor-pointer
          bg-white/10
          [&::-webkit-slider-thumb]:appearance-none
          [&::-webkit-slider-thumb]:h-4
          [&::-webkit-slider-thumb]:w-4
          [&::-webkit-slider-thumb]:rounded-full
          [&::-webkit-slider-thumb]:bg-indigo-500
          [&::-webkit-slider-thumb]:shadow-lg
          [&::-webkit-slider-thumb]:shadow-indigo-500/30
          [&::-webkit-slider-thumb]:transition-all
          [&::-webkit-slider-thumb]:hover:bg-indigo-400
          [&::-webkit-slider-thumb]:hover:scale-125"
        style={{
          background: `linear-gradient(to right, #6366f1 ${((value - min) / (max - min)) * 100}%, rgba(255,255,255,0.1) ${((value - min) / (max - min)) * 100}%)`
        }}
      />
    </div>
  )
}

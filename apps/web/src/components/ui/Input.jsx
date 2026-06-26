import { forwardRef } from 'react'

export const Input = forwardRef(({
  label,
  error,
  icon: Icon,
  iconRight: IconRight,
  className = '',
  containerClassName = '',
  hint,
  ...props
}, ref) => {
  return (
    <div className={`flex flex-col gap-1.5 ${containerClassName}`}>
      {label && (
        <label className="text-sm font-medium text-slate-300">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
            <Icon size={16} />
          </div>
        )}
        <input
          ref={ref}
          className={`
            w-full h-10 rounded-xl border transition-all duration-200
            bg-white/5 border-white/10
            text-slate-100 placeholder-slate-500
            focus:outline-none focus:border-indigo-500/60 focus:ring-2 focus:ring-indigo-500/20
            ${Icon ? 'pl-9' : 'pl-3'}
            ${IconRight ? 'pr-9' : 'pr-3'}
            ${error ? 'border-red-500/50 focus:border-red-500/60 focus:ring-red-500/20' : ''}
            ${className}
          `}
          {...props}
        />
        {IconRight && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
            <IconRight size={16} />
          </div>
        )}
      </div>
      {error && <p className="text-xs text-red-400">{error}</p>}
      {hint && !error && <p className="text-xs text-slate-500">{hint}</p>}
    </div>
  )
})
Input.displayName = 'Input'

export function Textarea({ label, error, className = '', rows = 4, ...props }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && <label className="text-sm font-medium text-slate-300">{label}</label>}
      <textarea
        rows={rows}
        className={`
          w-full rounded-xl border transition-all duration-200 p-3 resize-none
          bg-white/5 border-white/10 text-slate-100 placeholder-slate-500
          focus:outline-none focus:border-indigo-500/60 focus:ring-2 focus:ring-indigo-500/20
          ${error ? 'border-red-500/50' : ''}
          ${className}
        `}
        {...props}
      />
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  )
}

export function Select({ label, error, children, className = '', ...props }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && <label className="text-sm font-medium text-slate-300">{label}</label>}
      <select
        className={`
          w-full h-10 rounded-xl border px-3 transition-all duration-200
          bg-surface-800 border-white/10 text-slate-100
          focus:outline-none focus:border-indigo-500/60 focus:ring-2 focus:ring-indigo-500/20
          ${className}
        `}
        {...props}
      >
        {children}
      </select>
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  )
}

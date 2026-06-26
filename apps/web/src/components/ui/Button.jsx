import { motion } from 'framer-motion'

const variants = {
  primary: 'bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-400 hover:to-indigo-500 text-white shadow-lg shadow-indigo-500/20',
  secondary: 'bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-slate-200',
  ghost: 'hover:bg-white/5 text-slate-300 hover:text-white',
  danger: 'bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 hover:text-red-300',
  success: 'bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 text-emerald-400',
  cyan: 'bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-white shadow-lg shadow-cyan-500/20',
}

const sizes = {
  xs: 'h-7 px-2.5 text-xs rounded-md gap-1',
  sm: 'h-8 px-3 text-sm rounded-lg gap-1.5',
  md: 'h-10 px-4 text-sm rounded-xl gap-2',
  lg: 'h-12 px-6 text-base rounded-xl gap-2.5',
  xl: 'h-14 px-8 text-lg rounded-2xl gap-3',
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  loading = false,
  icon: Icon,
  iconRight: IconRight,
  disabled,
  onClick,
  type = 'button',
  ...props
}) {
  return (
    <motion.button
      type={type}
      whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
      whileTap={{ scale: disabled || loading ? 1 : 0.97 }}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        inline-flex items-center justify-center font-medium transition-all duration-200
        disabled:opacity-50 disabled:cursor-not-allowed select-none
        ${variants[variant]} ${sizes[size]} ${className}
      `}
      {...props}
    >
      {loading ? (
        <span className="h-4 w-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
      ) : Icon ? (
        <Icon className="shrink-0" size={size === 'xs' ? 12 : size === 'sm' ? 14 : size === 'lg' ? 18 : 16} />
      ) : null}
      {children}
      {IconRight && !loading && (
        <IconRight className="shrink-0" size={size === 'xs' ? 12 : size === 'sm' ? 14 : 16} />
      )}
    </motion.button>
  )
}

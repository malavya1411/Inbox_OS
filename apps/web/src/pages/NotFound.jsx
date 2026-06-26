import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { AlertCircle, ArrowLeft } from 'lucide-react'
import { Button } from '../components/ui/Button'

export function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex items-center justify-center p-4"
      style={{ background: 'linear-gradient(135deg, #080c18 0%, #0d1120 100%)' }}>
      
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="glass max-w-md w-full p-8 rounded-2xl border border-white/10 text-center relative z-10"
      >
        <div className="h-14 w-14 rounded-full bg-indigo-500/10 text-indigo-400 flex items-center justify-center mx-auto mb-5 border border-indigo-500/20">
          <AlertCircle size={28} />
        </div>

        <h1 className="text-4xl font-extrabold text-white tracking-tight mb-2">404</h1>
        <h2 className="text-lg font-semibold text-slate-200 mb-3">Page Not Found</h2>
        <p className="text-slate-400 text-sm mb-6 leading-relaxed">
          The page you are looking for does not exist or has been relocated to another route.
        </p>

        <Button
          onClick={() => navigate('/dashboard')}
          className="w-full flex justify-center"
          icon={ArrowLeft}
        >
          Back to Dashboard
        </Button>
      </motion.div>
    </div>
  )
}

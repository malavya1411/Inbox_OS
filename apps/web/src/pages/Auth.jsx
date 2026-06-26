import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, Lock, User, Zap, ArrowRight, Eye, EyeOff } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { useAuthStore } from '../stores/authStore'

function AuthLayout({ children, title, subtitle }) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4"
      style={{ background: 'linear-gradient(135deg, #080c18 0%, #0d1120 100%)' }}>
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center">
              <Zap size={18} className="text-white" />
            </div>
            <span className="font-bold text-white text-xl">InboxOS</span>
          </Link>
          <h1 className="text-2xl font-bold text-white">{title}</h1>
          <p className="text-slate-400 text-sm mt-1">{subtitle}</p>
        </div>

        <div className="glass p-8 rounded-2xl border border-white/10">
          {children}
        </div>
      </motion.div>
    </div>
  )
}

export function LoginPage() {
  const [email, setEmail] = useState('demo@inboxos.app')
  const [password, setPassword] = useState('demo1234')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const { login, loginAsDemo } = useAuthStore()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 800))
    loginAsDemo()
    navigate('/dashboard')
  }

  return (
    <AuthLayout title="Welcome back" subtitle="Sign in to your InboxOS account">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Email"
          type="email"
          icon={Mail}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          required
        />
        <Input
          label="Password"
          type={showPassword ? 'text' : 'password'}
          icon={Lock}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          iconRight={showPassword ? EyeOff : Eye}
          required
        />

        <Button type="submit" className="w-full" size="lg" loading={loading} iconRight={ArrowRight}>
          Sign In
        </Button>

        <div className="relative">
          <div className="border-t border-white/10" />
          <span className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 bg-transparent px-2 text-xs text-slate-500">or</span>
        </div>

        <Button
          variant="secondary"
          className="w-full"
          size="lg"
          onClick={() => { loginAsDemo(); navigate('/dashboard') }}
          type="button"
        >
          <Zap size={16} />
          Try Demo (No Account Needed)
        </Button>

        <p className="text-center text-sm text-slate-400">
          Don't have an account?{' '}
          <Link to="/auth/register" className="text-indigo-400 hover:text-indigo-300 font-medium">
            Sign up
          </Link>
        </p>
      </form>
    </AuthLayout>
  )
}

export function RegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const { loginAsDemo } = useAuthStore()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 800))
    loginAsDemo()
    navigate('/dashboard')
  }

  return (
    <AuthLayout title="Create your account" subtitle="Start managing your inbox with AI">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Full Name"
          type="text"
          icon={User}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Alex Chen"
          required
        />
        <Input
          label="Email"
          type="email"
          icon={Mail}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          required
        />
        <Input
          label="Password"
          type="password"
          icon={Lock}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Min. 8 characters"
          required
        />

        <Button type="submit" className="w-full" size="lg" loading={loading} iconRight={ArrowRight}>
          Create Account
        </Button>

        <p className="text-center text-sm text-slate-400">
          Already have an account?{' '}
          <Link to="/auth/login" className="text-indigo-400 hover:text-indigo-300 font-medium">
            Sign in
          </Link>
        </p>
      </form>
    </AuthLayout>
  )
}

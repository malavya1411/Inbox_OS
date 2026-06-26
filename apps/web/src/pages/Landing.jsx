import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { Zap, ArrowRight, Bot, GitBranch, Bell, BarChart3, Shield, Star, ChevronRight } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { useAuthStore } from '../stores/authStore'

const FEATURES = [
  { icon: Bot, title: 'AI Understanding', desc: 'Every email classified, scored, and summarized instantly.', color: 'from-indigo-500/20 to-indigo-600/5 border-indigo-500/20' },
  { icon: GitBranch, title: 'Smart Rules Engine', desc: 'Define what matters. AI + your rules decide what happens.', color: 'from-cyan-500/20 to-cyan-600/5 border-cyan-500/20' },
  { icon: Bell, title: 'Telegram Delivery', desc: 'Critical emails reach you as instant Telegram messages.', color: 'from-blue-500/20 to-blue-600/5 border-blue-500/20' },
  { icon: BarChart3, title: 'Inbox Analytics', desc: 'Understand your email patterns and response times.', color: 'from-emerald-500/20 to-emerald-600/5 border-emerald-500/20' },
  { icon: Shield, title: 'Privacy First', desc: 'Use local AI (Ollama). Your emails never leave your machine.', color: 'from-amber-500/20 to-amber-600/5 border-amber-500/20' },
  { icon: Star, title: 'Reply Assistant', desc: 'AI-drafted replies with your preferred tone and style.', color: 'from-pink-500/20 to-pink-600/5 border-pink-500/20' },
]

const PIPELINE = ['Email Received', 'AI Analysis', 'Rules Decision', 'Actions', 'Delivery']

export function LandingPage() {
  const { loginAsDemo } = useAuthStore()
  const navigate = useNavigate()

  const handleDemo = () => {
    loginAsDemo()
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: 'linear-gradient(180deg, #080c18 0%, #0d1120 50%, #080c18 100%)' }}>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between px-8 border-b border-white/5 backdrop-blur-xl bg-black/20">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center">
            <Zap size={16} className="text-white" />
          </div>
          <span className="font-bold text-white text-lg">InboxOS</span>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/auth/login" className="text-sm text-slate-400 hover:text-white transition-colors">Sign In</Link>
          <Button size="sm" onClick={() => navigate('/auth/register')}>Get Started</Button>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-40 pb-24 px-6 text-center relative">
        {/* Background glow */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />
        <div className="absolute top-32 left-1/3 h-48 w-48 rounded-full bg-cyan-500/8 blur-3xl pointer-events-none" />

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-sm mb-8">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-pulse" />
            Open Source · v1.0
          </div>

          <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
            Not an inbox.
            <br />
            <span className="gradient-text">An OS for email.</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            InboxOS understands every email, decides what matters, extracts deadlines and action items, and routes information to the right place automatically.
          </p>

          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Button size="xl" onClick={handleDemo} iconRight={ArrowRight}>
              Try Live Demo
            </Button>
            <Button size="xl" variant="secondary" onClick={() => navigate('/auth/register')}>
              Get Started Free
            </Button>
          </div>
        </motion.div>

        {/* Pipeline visualization */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-20 flex items-center justify-center gap-2 flex-wrap"
        >
          {PIPELINE.map((step, i) => (
            <div key={step} className="flex items-center gap-2">
              <div className="glass px-4 py-2 rounded-full text-sm text-slate-300 font-medium">
                {step}
              </div>
              {i < PIPELINE.length - 1 && (
                <ChevronRight size={16} className="text-indigo-500 shrink-0" />
              )}
            </div>
          ))}
        </motion.div>
      </section>

      {/* Features */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Everything your inbox should do</h2>
          <p className="text-slate-400 text-lg">Six powerful layers, working together automatically.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className={`bg-gradient-to-br ${f.color} border rounded-2xl p-6 hover:scale-[1.02] transition-transform duration-200`}
            >
              <div className="p-2.5 rounded-xl bg-white/5 w-fit mb-4">
                <f.icon size={20} className="text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{f.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 text-center">
        <div className="glass max-w-2xl mx-auto p-12 rounded-3xl border border-indigo-500/20">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to transform your inbox?</h2>
          <p className="text-slate-400 mb-8">Open source. Self-hostable. Privacy-first.</p>
          <Button size="xl" onClick={handleDemo} iconRight={ArrowRight}>
            Try the Live Demo
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-white/5 text-center">
        <p className="text-slate-500 text-sm">InboxOS — Open Source AI Inbox Operating System · MIT License</p>
      </footer>
    </div>
  )
}

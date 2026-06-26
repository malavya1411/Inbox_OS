import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, CheckCircle, Bell, BookOpen, Reply, Zap } from 'lucide-react'
import { AppLayout } from '../components/layout/AppLayout'
import { MOCK_NOTIFICATIONS, MOCK_EMAILS } from '../data/mock'

const TELEGRAM_MESSAGES = [
  {
    id: 'tg-001',
    type: 'priority_alert',
    time: '2 min ago',
    content: {
      title: '🚨 Priority Email',
      body: 'DBMS mini-project submission deadline is TONIGHT at 11:59 PM. No extensions will be granted.',
      priority: 96,
      category: 'academic',
      actions: ['View Email', 'Create Task', 'Set Reminder'],
    }
  },
  {
    id: 'tg-002',
    type: 'otp',
    time: '15 min ago',
    content: {
      title: '🔑 OTP Code',
      body: 'Google verification code: **847291**\nExpires in 10 minutes.',
      actions: [],
    }
  },
  {
    id: 'tg-003',
    type: 'job_alert',
    time: '5 hours ago',
    content: {
      title: '💼 Job Opportunity',
      body: 'Stripe has invited you to interview for Software Engineer Intern. Please select a slot by **Friday**.',
      priority: 94,
      category: 'job',
      actions: ['View Details', 'Schedule Reminder'],
    }
  },
  {
    id: 'tg-004',
    type: 'offer',
    time: '2 days ago',
    content: {
      title: '🎉 Job Offer Received',
      body: 'StartupXYZ has sent you an offer: **₹18 LPA + 0.1% equity**\nDeadline to respond: **July 3, 2026**',
      priority: 99,
      category: 'job',
      actions: ['View Offer', 'Set Deadline Reminder'],
    }
  },
  {
    id: 'tg-005',
    type: 'digest',
    time: 'Yesterday 9:00 AM',
    content: {
      title: '📋 Daily Digest',
      body: "Good morning! Here's your inbox summary:\n• 3 newsletters (added to digest)\n• 1 finance receipt — ₹2,499\n• 1 meeting invite — Design Review\n• 2 low-priority emails",
      actions: ['View Full Digest'],
    }
  },
]

function TelegramMessage({ msg }) {
  const [actionClicked, setActionClicked] = useState(null)

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex justify-end mb-4"
    >
      <div className="max-w-xs w-full">
        {/* Time */}
        <p className="text-center text-xs text-slate-500 mb-2">{msg.time}</p>

        {/* Message bubble (Telegram bot style) */}
        <div className="bg-[#1e3a5f] rounded-2xl rounded-tr-sm p-4 border border-blue-500/20">
          <p className="font-semibold text-white text-sm mb-2">{msg.content.title}</p>
          <p className="text-sm text-slate-200 leading-relaxed whitespace-pre-line">
            {msg.content.body.replace(/\*\*(.*?)\*\*/g, '$1')}
          </p>
          {msg.content.priority && (
            <div className="flex items-center gap-2 mt-2 pt-2 border-t border-white/10">
              <span className="text-xs text-slate-400">Priority:</span>
              <span className="text-xs font-mono text-indigo-400">{msg.content.priority}/100</span>
            </div>
          )}

          {/* Inline keyboard buttons */}
          {msg.content.actions?.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {msg.content.actions.map((action) => (
                <button
                  key={action}
                  onClick={() => setActionClicked(action)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                    actionClicked === action
                      ? 'bg-indigo-500 text-white'
                      : 'bg-white/10 hover:bg-white/20 text-slate-300'
                  }`}
                >
                  {actionClicked === action ? '✓ ' : ''}{action}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export function TelegramPage() {
  const [input, setInput] = useState('')

  return (
    <AppLayout title="Telegram Preview" subtitle="Simulated Telegram bot experience">
      <div className="max-w-4xl grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* Phone frame simulation */}
        <div className="lg:col-span-2">
          <div className="glass rounded-3xl overflow-hidden" style={{ minHeight: '600px' }}>
            {/* Chat header */}
            <div className="flex items-center gap-3 p-4 border-b border-white/10 bg-white/3">
              <div className="h-9 w-9 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center">
                <Zap size={16} className="text-white" />
              </div>
              <div>
                <p className="font-semibold text-white text-sm">InboxOS Bot</p>
                <div className="flex items-center gap-1">
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  <p className="text-xs text-emerald-400">Online</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="p-4 overflow-y-auto space-y-1" style={{ minHeight: '480px', background: '#17212b' }}>
              <p className="text-center text-xs text-slate-500 mb-4">Today</p>
              {TELEGRAM_MESSAGES.map(msg => (
                <TelegramMessage key={msg.id} msg={msg} />
              ))}
            </div>

            {/* Input */}
            <div className="p-3 border-t border-white/10 flex items-center gap-2" style={{ background: '#17212b' }}>
              <input
                type="text"
                placeholder="Message InboxOS Bot..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 h-9 rounded-xl bg-white/10 border border-white/10 px-3 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500/50"
              />
              <button className="h-9 w-9 rounded-xl bg-indigo-500 hover:bg-indigo-400 flex items-center justify-center transition-colors">
                <Send size={15} className="text-white" />
              </button>
            </div>
          </div>
        </div>

        {/* Controls panel */}
        <div className="space-y-4">
          <div className="glass rounded-2xl p-4">
            <h3 className="font-semibold text-white mb-3">Bot Channels</h3>
            <div className="space-y-3">
              {[
                { icon: Zap, label: 'Priority Alerts', desc: 'Instant for 90+ score', active: true },
                { icon: BookOpen, label: 'Daily Digest', desc: '9 AM every morning', active: true },
                { icon: Bell, label: 'Reminders', desc: 'Deadline notifications', active: true },
                { icon: Reply, label: 'Reply Approval', desc: 'Approve AI replies', active: false },
              ].map(item => (
                <div key={item.label} className="flex items-center gap-3">
                  <div className={`p-1.5 rounded-lg ${item.active ? 'bg-indigo-500/20' : 'bg-white/5'}`}>
                    <item.icon size={14} className={item.active ? 'text-indigo-400' : 'text-slate-500'} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-slate-200">{item.label}</p>
                    <p className="text-xs text-slate-500">{item.desc}</p>
                  </div>
                  <div className={`h-2 w-2 rounded-full ${item.active ? 'bg-emerald-400' : 'bg-slate-600'}`} />
                </div>
              ))}
            </div>
          </div>

          <div className="glass rounded-2xl p-4">
            <h3 className="font-semibold text-white mb-3 text-sm">Notification Stats</h3>
            <div className="space-y-2">
              {[
                { label: 'Sent Today', value: '12' },
                { label: 'Priority Alerts', value: '4' },
                { label: 'OTPs Forwarded', value: '3' },
                { label: 'Digest Items', value: '8' },
              ].map(s => (
                <div key={s.label} className="flex justify-between text-sm">
                  <span className="text-slate-400">{s.label}</span>
                  <span className="text-white font-medium">{s.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}

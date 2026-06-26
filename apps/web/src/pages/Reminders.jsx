import { useState } from 'react'
import { motion } from 'framer-motion'
import { Clock, Bell, CheckCircle, XCircle, Pause, Plus, Mail, MessageCircle } from 'lucide-react'
import { AppLayout } from '../components/layout/AppLayout'
import { Button } from '../components/ui/Button'
import { StatusBadge } from '../components/ui/Badge'
import { MOCK_REMINDERS, MOCK_EMAILS } from '../data/mock'
import { formatDateTime, isOverdue, daysUntil } from '../utils/time'

const CHANNEL_ICONS = { telegram: MessageCircle, email: Mail, dashboard: Bell }

export function RemindersPage() {
  const [reminders, setReminders] = useState(MOCK_REMINDERS)

  const pending = reminders.filter(r => r.status === 'pending')
  const sent = reminders.filter(r => r.status === 'sent')
  const cancelled = reminders.filter(r => r.status === 'cancelled')

  const handleCancel = (id) => {
    setReminders(prev => prev.map(r => r.id === id ? { ...r, status: 'cancelled' } : r))
  }

  const getLinkedEmail = (email_id) => MOCK_EMAILS.find(e => e.id === email_id)

  return (
    <AppLayout title="Reminder Timeline" subtitle="Scheduled reminders and deadline alerts">
      <div className="max-w-3xl space-y-6">

        {/* Summary row */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Pending', value: pending.length, color: 'text-indigo-400', bg: 'bg-indigo-500/10 border-indigo-500/20' },
            { label: 'Sent', value: sent.length, color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' },
            { label: 'Cancelled', value: cancelled.length, color: 'text-slate-400', bg: 'bg-slate-500/10 border-slate-500/20' },
          ].map(stat => (
            <div key={stat.label} className={`${stat.bg} border rounded-2xl p-4 text-center`}>
              <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
              <p className="text-xs text-slate-400 mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Timeline */}
        <div className="relative">
          <div className="absolute left-6 top-0 bottom-0 w-px bg-white/10" />
          <div className="space-y-4">
            {reminders.sort((a, b) => new Date(a.remind_at) - new Date(b.remind_at)).map((reminder, i) => {
              const linkedEmail = reminder.email_id ? getLinkedEmail(reminder.email_id) : null
              const overdue = isOverdue(reminder.remind_at) && reminder.status === 'pending'
              const ChannelIcon = CHANNEL_ICONS[reminder.channel] || Bell

              return (
                <motion.div
                  key={reminder.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="pl-14 relative"
                >
                  {/* Timeline dot */}
                  <div className={`absolute left-4 top-4 h-4 w-4 rounded-full border-2 flex items-center justify-center ${
                    reminder.status === 'pending' ? overdue ? 'border-red-400 bg-red-500/20' : 'border-indigo-400 bg-indigo-500/20'
                    : reminder.status === 'sent' ? 'border-emerald-400 bg-emerald-500/20'
                    : 'border-slate-500 bg-slate-600/20'
                  }`}>
                    {reminder.status === 'sent' && <CheckCircle size={8} className="text-emerald-400" />}
                    {reminder.status === 'pending' && <div className="h-1.5 w-1.5 rounded-full bg-indigo-400" />}
                    {reminder.status === 'cancelled' && <XCircle size={8} className="text-slate-400" />}
                  </div>

                  <div className={`glass rounded-2xl p-4 ${overdue ? 'border-red-500/20 bg-red-500/3' : ''}`}>
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="font-semibold text-white text-sm">{reminder.title}</p>
                          <StatusBadge status={reminder.status} />
                          {overdue && <span className="text-xs text-red-400 font-medium">Overdue</span>}
                        </div>
                        {reminder.message && (
                          <p className="text-xs text-slate-400 mt-1">{reminder.message}</p>
                        )}
                        <div className="flex items-center gap-3 mt-2">
                          <div className="flex items-center gap-1 text-xs text-slate-400">
                            <Clock size={11} />
                            {formatDateTime(reminder.remind_at)}
                          </div>
                          <div className="flex items-center gap-1 text-xs text-slate-400">
                            <ChannelIcon size={11} />
                            {reminder.channel}
                          </div>
                        </div>
                        {linkedEmail && (
                          <div className="mt-2 p-2 bg-white/3 rounded-lg border border-white/5">
                            <p className="text-xs text-slate-400 truncate">📧 {linkedEmail.subject}</p>
                          </div>
                        )}
                      </div>

                      {reminder.status === 'pending' && (
                        <div className="flex gap-1.5 shrink-0">
                          <button className="p-1.5 rounded-lg text-slate-400 hover:text-amber-400 hover:bg-amber-500/10 transition-all">
                            <Pause size={13} />
                          </button>
                          <button onClick={() => handleCancel(reminder.id)} className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all">
                            <XCircle size={13} />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Add reminder button */}
        <Button variant="secondary" icon={Plus} className="w-full" size="md">
          Set New Reminder
        </Button>
      </div>
    </AppLayout>
  )
}

import { motion } from 'framer-motion'
import {
  Inbox, Bot, CheckSquare, Bell, TrendingUp, Zap,
  Clock, Activity, MailOpen
} from 'lucide-react'
import { AppLayout } from '../components/layout/AppLayout'
import { StatCard } from '../components/ui/Card'
import { CategoryBadge, PriorityBadge, StatusBadge } from '../components/ui/Badge'
import { DASHBOARD_STATS, MOCK_EMAILS, MOCK_TASKS } from '../data/mock'
import { formatDistanceToNow } from '../utils/time'
import { useNavigate } from 'react-router-dom'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts'
import { ANALYTICS_DATA } from '../data/mock'

const PIE_COLORS = ['#6b7280','#10b981','#8b5cf6','#f59e0b','#3b82f6','#ef4444','#06b6d4','#ec4899']

export function DashboardPage() {
  const navigate = useNavigate()
  const priorityEmails = MOCK_EMAILS.filter(e => (e.analysis?.priority_score || 0) >= 70 && !e.is_archived)

  return (
    <AppLayout title="Dashboard" subtitle="AI Inbox Operating System">
      <div className="space-y-6 max-w-7xl">

        {/* Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          <StatCard label="Total Emails" value={DASHBOARD_STATS.total_emails} icon={Inbox} trend="All time" color="brand" />
          <StatCard label="Processed Today" value={DASHBOARD_STATS.processed_today} icon={Bot} trend="Last 24h" color="cyan" />
          <StatCard label="High Priority" value={DASHBOARD_STATS.high_priority} icon={Zap} trend="Needs attention" color="amber" />
          <StatCard label="Pending Tasks" value={DASHBOARD_STATS.pending_tasks} icon={CheckSquare} trend="From emails" color="emerald" />
          <StatCard label="Notifications" value={DASHBOARD_STATS.sent_notifications} icon={Bell} trend="Sent today" color="brand" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Priority Inbox */}
          <div className="lg:col-span-2">
            <div className="glass rounded-2xl overflow-hidden">
              <div className="flex items-center justify-between p-4 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <Zap size={16} className="text-indigo-400" />
                  <h2 className="font-semibold text-white">Priority Inbox</h2>
                </div>
                <button onClick={() => navigate('/inbox')} className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors">
                  View all →
                </button>
              </div>
              <div>
                {priorityEmails.map((email) => (
                  <motion.div
                    key={email.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onClick={() => navigate(`/inbox/${email.id}`)}
                    className="flex items-start gap-3 p-4 border-b border-white/5 hover:bg-white/3 cursor-pointer transition-all group"
                  >
                    <div className="h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                      style={{ background: `hsl(${email.sender_email.charCodeAt(0) * 5 % 360}, 60%, 40%)` }}>
                      {(email.sender_name || email.sender_email)[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm font-medium text-slate-200 truncate">{email.sender_name}</p>
                        <div className="flex items-center gap-2 shrink-0">
                          <CategoryBadge category={email.analysis?.category} size="xs" />
                          <PriorityBadge score={email.analysis?.priority_score || 0} size="xs" />
                        </div>
                      </div>
                      <p className="text-xs text-slate-400 truncate">{email.subject}</p>
                      <p className="text-xs text-slate-500 truncate mt-0.5">{email.analysis?.summary}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-5">
            {/* Today's Summary */}
            <div className="glass rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <Activity size={15} className="text-cyan-400" />
                <h3 className="font-semibold text-white text-sm">Recent Activity</h3>
              </div>
              <div className="space-y-3">
                {DASHBOARD_STATS.recent_activity.map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <span className="text-base">{item.icon}</span>
                    <div>
                      <p className="text-xs text-slate-300">{item.action}</p>
                      <p className="text-xs text-slate-500">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pending Tasks */}
            <div className="glass rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <CheckSquare size={15} className="text-emerald-400" />
                <h3 className="font-semibold text-white text-sm">Pending Tasks</h3>
              </div>
              <div className="space-y-2">
                {MOCK_TASKS.filter(t => t.status !== 'done').map(task => (
                  <div key={task.id} className="flex items-start gap-2 p-2 rounded-lg hover:bg-white/3">
                    <div className={`h-2 w-2 rounded-full mt-1.5 shrink-0 ${
                      task.priority === 'urgent' ? 'bg-red-400' :
                      task.priority === 'high' ? 'bg-orange-400' : 'bg-yellow-400'
                    }`} />
                    <div>
                      <p className="text-xs font-medium text-slate-200">{task.title}</p>
                      <p className="text-xs text-slate-500">Due: {new Date(task.deadline).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Weekly Volume */}
          <div className="glass rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp size={15} className="text-indigo-400" />
              <h3 className="font-semibold text-white">Weekly Email Volume</h3>
            </div>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={ANALYTICS_DATA.weekly_volume}>
                <XAxis dataKey="day" stroke="#475569" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis stroke="#475569" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ background: '#1a2035', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#f1f5f9' }}
                />
                <Bar dataKey="emails" fill="#6366f1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Category Breakdown */}
          <div className="glass rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <MailOpen size={15} className="text-cyan-400" />
              <h3 className="font-semibold text-white">Category Breakdown</h3>
            </div>
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie data={ANALYTICS_DATA.category_trends} dataKey="count" nameKey="category" cx="50%" cy="50%" outerRadius={70} innerRadius={40}>
                  {ANALYTICS_DATA.category_trends.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Legend formatter={(v) => <span style={{ color: '#94a3b8', fontSize: 11 }}>{v}</span>} />
                <Tooltip contentStyle={{ background: '#1a2035', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#f1f5f9' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}

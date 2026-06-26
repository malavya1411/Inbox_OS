import { motion } from 'framer-motion'
import {
  TrendingUp, Users, MailOpen, Clock, Activity, Zap,
  BarChart3, PieChart as PieIcon, ArrowUpRight, ArrowDownRight
} from 'lucide-react'
import { AppLayout } from '../components/layout/AppLayout'
import { StatCard } from '../components/ui/Card'
import { ANALYTICS_DATA, DASHBOARD_STATS } from '../data/mock'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend, AreaChart, Area
} from 'recharts'

const PIE_COLORS = ['#6366f1', '#22d3ee', '#10b981', '#f59e0b', '#3b82f6', '#ef4444', '#06b6d4', '#ec4899']

export function AnalyticsPage() {
  const stats = [
    { label: 'Inbox Volume', value: '247', icon: TrendingUp, trend: '+12% vs last week', isPositive: true, color: 'brand' },
    { label: 'Avg. Response Time', value: `${ANALYTICS_DATA.response_time_avg} hrs`, icon: Clock, trend: '-2.1 hrs improvement', isPositive: true, color: 'emerald' },
    { label: 'AI Accuracy Rate', value: '96.4%', icon: Zap, trend: '+0.8% increase', isPositive: true, color: 'cyan' },
    { label: 'Unique Senders', value: '48', icon: Users, trend: '6 new this week', isPositive: true, color: 'indigo' },
  ]

  const hourlyData = [
    { hour: '00:00', volume: 5 }, { hour: '04:00', volume: 2 }, { hour: '08:00', volume: 18 },
    { hour: '12:00', volume: 32 }, { hour: '16:00', volume: 45 }, { hour: '20:00', volume: 14 }
  ]

  return (
    <AppLayout title="Analytics" subtitle="Deep insights into your communication patterns">
      <div className="space-y-6 max-w-7xl">
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass p-5 rounded-2xl border border-white/5 relative overflow-hidden flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider">{s.label}</span>
                <div className="p-2 rounded-xl bg-white/5">
                  <s.icon size={16} className={`
                    ${s.color === 'brand' ? 'text-indigo-400' : ''}
                    ${s.color === 'emerald' ? 'text-emerald-400' : ''}
                    ${s.color === 'cyan' ? 'text-cyan-400' : ''}
                    ${s.color === 'indigo' ? 'text-blue-400' : ''}
                  `} />
                </div>
              </div>
              <div>
                <p className="text-3xl font-bold text-white tracking-tight">{s.value}</p>
                <div className="flex items-center gap-1 mt-1.5">
                  {s.isPositive ? (
                    <ArrowUpRight size={13} className="text-emerald-400" />
                  ) : (
                    <ArrowDownRight size={13} className="text-red-400" />
                  )}
                  <span className={`text-xs font-medium ${s.isPositive ? 'text-emerald-400' : 'text-red-400'}`}>
                    {s.trend}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Detailed Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Weekly Volume Line/Area Chart */}
          <div className="glass rounded-2xl p-5 border border-white/5 lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <BarChart3 size={16} className="text-indigo-400" />
                <h3 className="font-semibold text-white text-sm">Weekly Activity Trends</h3>
              </div>
              <span className="text-xs text-slate-500">Last 7 days</span>
            </div>
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={ANALYTICS_DATA.weekly_volume}>
                <defs>
                  <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" stroke="#475569" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis stroke="#475569" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: '#0d1120', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px', color: '#f1f5f9' }} />
                <Area type="monotone" dataKey="emails" stroke="#6366f1" strokeWidth={2} fillOpacity={1} fill="url(#colorVolume)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Category Pie Chart */}
          <div className="glass rounded-2xl p-5 border border-white/5">
            <div className="flex items-center gap-2 mb-4">
              <PieIcon size={16} className="text-cyan-400" />
              <h3 className="font-semibold text-white text-sm">Category Breakdown</h3>
            </div>
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie
                  data={ANALYTICS_DATA.category_trends}
                  dataKey="count"
                  nameKey="category"
                  cx="50%"
                  cy="50%"
                  outerRadius={75}
                  innerRadius={45}
                  paddingAngle={2}
                >
                  {ANALYTICS_DATA.category_trends.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: '#0d1120', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px', color: '#f1f5f9' }} />
                <Legend formatter={(v) => <span style={{ color: '#94a3b8', fontSize: 11 }}>{v}</span>} layout="horizontal" verticalAlign="bottom" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Senders Table */}
          <div className="glass rounded-2xl p-5 border border-white/5">
            <div className="flex items-center gap-2 mb-4">
              <Users size={16} className="text-emerald-400" />
              <h3 className="font-semibold text-white text-sm">Top Email Senders</h3>
            </div>
            <div className="space-y-3">
              {ANALYTICS_DATA.top_senders.map((sender, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 rounded-xl hover:bg-white/3 transition-all">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                      style={{ background: `hsl(${sender.email.charCodeAt(0) * 8 % 360}, 55%, 45%)` }}>
                      {sender.sender[0]}
                    </div>
                    <div>
                      <p className="text-xs font-medium text-slate-200">{sender.sender}</p>
                      <p className="text-slate-500 text-[10px]">{sender.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs bg-indigo-500/10 text-indigo-300 px-2 py-0.5 rounded-full font-medium">
                      {sender.count} emails
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Daily Hourly Activity */}
          <div className="glass rounded-2xl p-5 border border-white/5">
            <div className="flex items-center gap-2 mb-4">
              <Activity size={16} className="text-amber-400" />
              <h3 className="font-semibold text-white text-sm">Hourly Processing Load</h3>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={hourlyData}>
                <XAxis dataKey="hour" stroke="#475569" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis stroke="#475569" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: '#0d1120', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px', color: '#f1f5f9' }} />
                <Bar dataKey="volume" fill="#f59e0b" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </AppLayout>
  )
}

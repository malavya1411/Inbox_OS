import { NavLink, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard, Inbox, Bot, GitBranch, Bell, Clock,
  BarChart3, Settings, Send, Users, ChevronLeft, ChevronRight,
  Zap, LogOut, Sun, Moon
} from 'lucide-react'
import { useAuthStore } from '../../stores/authStore'
import { useUIStore } from '../../stores/uiStore'

const NAV_ITEMS = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
  { label: 'Inbox', icon: Inbox, path: '/inbox', badge: 4 },
  { label: 'Telegram', icon: Send, path: '/telegram' },
  { label: 'Rules', icon: GitBranch, path: '/rules' },
  { label: 'Senders', icon: Users, path: '/senders' },
  { label: 'Reply AI', icon: Bot, path: '/replies' },
  { label: 'Reminders', icon: Clock, path: '/reminders' },
  { label: 'Analytics', icon: BarChart3, path: '/analytics' },
]

const BOTTOM_ITEMS = [
  { label: 'Settings', icon: Settings, path: '/settings' },
]

export function Sidebar() {
  const { user, logout } = useAuthStore()
  const { sidebarCollapsed, toggleSidebar, theme, toggleTheme } = useUIStore()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/auth/login')
  }

  return (
    <motion.aside
      animate={{ width: sidebarCollapsed ? 64 : 220 }}
      transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
      className="h-screen flex flex-col shrink-0 border-r border-white/5 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0d1120 0%, #080c18 100%)' }}
    >
      {/* Logo */}
      <div className="h-14 flex items-center justify-between px-3 border-b border-white/5 shrink-0">
        <AnimatePresence mode="wait">
          {!sidebarCollapsed && (
            <motion.div
              key="logo-text"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="flex items-center gap-2"
            >
              <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center shrink-0">
                <Zap size={14} className="text-white" />
              </div>
              <span className="font-bold text-white tracking-tight">InboxOS</span>
            </motion.div>
          )}
          {sidebarCollapsed && (
            <motion.div
              key="logo-icon"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-7 w-7 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center mx-auto"
            >
              <Zap size={14} className="text-white" />
            </motion.div>
          )}
        </AnimatePresence>
        {!sidebarCollapsed && (
          <button onClick={toggleSidebar} className="p-1 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white transition-colors">
            <ChevronLeft size={16} />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-3 px-2 space-y-0.5 overflow-y-auto">
        {NAV_ITEMS.map((item) => (
          <NavLink key={item.path} to={item.path}>
            {({ isActive }) => (
              <motion.div
                whileHover={{ x: sidebarCollapsed ? 0 : 2 }}
                className={`
                  flex items-center gap-3 px-2 py-2 rounded-lg transition-all duration-150 group relative
                  ${isActive
                    ? 'bg-indigo-500/15 text-indigo-300 border border-indigo-500/20'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                  }
                `}
              >
                <item.icon size={17} className="shrink-0" />
                <AnimatePresence mode="wait">
                  {!sidebarCollapsed && (
                    <motion.span
                      key="label"
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: 'auto' }}
                      exit={{ opacity: 0, width: 0 }}
                      className="text-sm font-medium whitespace-nowrap overflow-hidden"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
                {item.badge && !sidebarCollapsed && (
                  <span className="ml-auto text-xs bg-indigo-500 text-white rounded-full h-4 w-4 flex items-center justify-center font-medium shrink-0">
                    {item.badge}
                  </span>
                )}
                {item.badge && sidebarCollapsed && (
                  <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-indigo-500" />
                )}
              </motion.div>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Bottom section */}
      <div className="px-2 pb-3 space-y-0.5 border-t border-white/5 pt-3">
        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="w-full flex items-center gap-3 px-2 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-all"
        >
          {theme === 'dark' ? <Sun size={17} className="shrink-0" /> : <Moon size={17} className="shrink-0" />}
          {!sidebarCollapsed && <span className="text-sm font-medium">{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>}
        </button>

        {BOTTOM_ITEMS.map((item) => (
          <NavLink key={item.path} to={item.path}>
            {({ isActive }) => (
              <div className={`flex items-center gap-3 px-2 py-2 rounded-lg transition-all duration-150 ${isActive ? 'bg-white/5 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
                <item.icon size={17} className="shrink-0" />
                {!sidebarCollapsed && <span className="text-sm font-medium">{item.label}</span>}
              </div>
            )}
          </NavLink>
        ))}

        {/* Collapse button when collapsed */}
        {sidebarCollapsed && (
          <button onClick={toggleSidebar} className="w-full flex items-center justify-center p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-all">
            <ChevronRight size={17} />
          </button>
        )}

        {/* User */}
        <div className={`flex items-center gap-2.5 px-2 py-2 mt-1 rounded-lg border border-white/5 bg-white/3 ${sidebarCollapsed ? 'justify-center' : ''}`}>
          <div className="h-7 w-7 rounded-full bg-gradient-to-br from-indigo-400 to-cyan-400 flex items-center justify-center text-white text-xs font-bold shrink-0">
            {user?.name?.[0] || 'A'}
          </div>
          {!sidebarCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-slate-200 truncate">{user?.name || 'Alex Chen'}</p>
              <p className="text-xs text-slate-500 truncate">{user?.email || 'demo@inboxos.app'}</p>
            </div>
          )}
          {!sidebarCollapsed && (
            <button onClick={handleLogout} className="p-1 text-slate-500 hover:text-red-400 transition-colors shrink-0">
              <LogOut size={14} />
            </button>
          )}
        </div>
      </div>
    </motion.aside>
  )
}

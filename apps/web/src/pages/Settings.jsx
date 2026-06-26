import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Settings, Bot, Radio, Bell, Shield, Key, Mail,
  CheckCircle2, AlertTriangle, Save, RefreshCw
} from 'lucide-react'
import { AppLayout } from '../components/layout/AppLayout'
import { Button } from '../components/ui/Button'
import { Input, Select } from '../components/ui/Input'
import { Toggle, Slider } from '../components/ui/Toggle'
import { useAuthStore } from '../stores/authStore'
import { useUIStore } from '../stores/uiStore'

export function SettingsPage() {
  const { user, updateUser } = useAuthStore()
  const { theme, toggleTheme } = useUIStore()

  const [activeTab, setActiveTab] = useState('profile')

  // Profile forms state
  const [name, setName] = useState(user?.name || 'Alex Chen')
  const [email, setEmail] = useState(user?.email || 'demo@inboxos.app')

  // AI settings state
  const [aiProvider, setAiProvider] = useState('mock')
  const [openaiKey, setOpenaiKey] = useState('')
  const [geminiKey, setGeminiKey] = useState('')
  const [ollamaUrl, setOllamaUrl] = useState('http://localhost:11434')

  // Integration settings
  const [gmailConnected, setGmailConnected] = useState(true)
  const [outlookConnected, setOutlookConnected] = useState(false)
  const [telegramConnected, setTelegramConnected] = useState(true)
  const [telegramToken, setTelegramToken] = useState('6978452144:AAH_...')

  // Notifications
  const [whatsappEnabled, setWhatsappEnabled] = useState(false)
  const [telegramEnabled, setTelegramEnabled] = useState(true)
  const [dashboardAlerts, setDashboardAlerts] = useState(true)
  const [minPriorityAlert, setMinPriorityAlert] = useState(70)

  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState(null)

  const handleSaveProfile = async (e) => {
    e.preventDefault()
    setSaving(true)
    await new Promise(r => setTimeout(r, 600))
    updateUser({ name, email })
    setSaving(false)
    setMessage({ type: 'success', text: 'Profile updated successfully!' })
    setTimeout(() => setMessage(null), 3000)
  }

  const handleSaveAI = async (e) => {
    e.preventDefault()
    setSaving(true)
    await new Promise(r => setTimeout(r, 600))
    setSaving(false)
    setMessage({ type: 'success', text: 'AI configuration updated!' })
    setTimeout(() => setMessage(null), 3000)
  }

  const tabs = [
    { id: 'profile', label: 'General / Profile', icon: Settings },
    { id: 'ai', label: 'AI Configuration', icon: Bot },
    { id: 'integrations', label: 'Inbox Integrations', icon: Mail },
    { id: 'notifications', label: 'Notifications', icon: Bell }
  ]

  return (
    <AppLayout title="Settings" subtitle="Manage your profile, email accounts, and AI preferences">
      <div className="max-w-4xl flex flex-col md:flex-row gap-6">
        
        {/* Navigation Sidebar */}
        <div className="w-full md:w-64 shrink-0 flex flex-col gap-1.5">
          {tabs.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); setMessage(null) }}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left
                  ${isActive
                    ? 'bg-indigo-500/15 text-indigo-300 border border-indigo-500/20'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent'
                  }
                `}
              >
                <Icon size={16} />
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* Form area */}
        <div className="flex-1 glass p-6 rounded-2xl border border-white/5 relative">
          
          {message && (
            <div className={`mb-5 p-3.5 rounded-xl border flex items-center gap-2.5 text-sm ${
              message.type === 'success'
                ? 'bg-emerald-500/15 border-emerald-500/20 text-emerald-300'
                : 'bg-yellow-500/15 border-yellow-500/20 text-yellow-300'
            }`}>
              {message.type === 'success' ? <CheckCircle2 size={16} /> : <AlertTriangle size={16} />}
              {message.text}
            </div>
          )}

          {activeTab === 'profile' && (
            <form onSubmit={handleSaveProfile} className="space-y-5">
              <h3 className="font-semibold text-white text-base">Account Profile</h3>
              
              <Input
                label="Full Name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Alex Chen"
                required
              />

              <Input
                label="Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="alex@inboxos.app"
                required
              />

              <div className="border-t border-white/5 pt-4">
                <h4 className="text-sm font-medium text-slate-300 mb-3">Theme Settings</h4>
                <div className="flex items-center justify-between p-3 rounded-xl bg-white/3 border border-white/5">
                  <div>
                    <p className="text-sm text-slate-200">System Theme</p>
                    <p className="text-xs text-slate-500">Toggle dark and light layout mode</p>
                  </div>
                  <Button type="button" size="sm" variant="secondary" onClick={toggleTheme}>
                    Change to {theme === 'dark' ? 'Light' : 'Dark'}
                  </Button>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <Button type="submit" loading={saving} icon={Save}>
                  Save Changes
                </Button>
              </div>
            </form>
          )}

          {activeTab === 'ai' && (
            <form onSubmit={handleSaveAI} className="space-y-5">
              <div>
                <h3 className="font-semibold text-white text-base mb-1">AI Processor Model</h3>
                <p className="text-xs text-slate-500">Choose the provider that acts as the intelligence layer for parsing your inbox.</p>
              </div>

              <Select
                label="AI Provider"
                value={aiProvider}
                onChange={(e) => setAiProvider(e.target.value)}
              >
                <option value="mock">Deterministic Mock Engine (Development)</option>
                <option value="gemini">Google Gemini API (Recommended)</option>
                <option value="openai">OpenAI GPT-4o Client</option>
                <option value="ollama">Ollama (Local Self-Hosted)</option>
              </Select>

              {aiProvider === 'openai' && (
                <Input
                  label="OpenAI API Key"
                  type="password"
                  value={openaiKey}
                  onChange={(e) => setOpenaiKey(e.target.value)}
                  placeholder="sk-..."
                  icon={Key}
                />
              )}

              {aiProvider === 'gemini' && (
                <Input
                  label="Gemini API Key"
                  type="password"
                  value={geminiKey}
                  onChange={(e) => setGeminiKey(e.target.value)}
                  placeholder="AIzaSy..."
                  icon={Key}
                />
              )}

              {aiProvider === 'ollama' && (
                <Input
                  label="Ollama Connection URL"
                  type="url"
                  value={ollamaUrl}
                  onChange={(e) => setOllamaUrl(e.target.value)}
                  placeholder="http://localhost:11434"
                  icon={Radio}
                />
              )}

              <div className="flex justify-end pt-2">
                <Button type="submit" loading={saving} icon={Save}>
                  Save AI Config
                </Button>
              </div>
            </form>
          )}

          {activeTab === 'integrations' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-white text-base mb-1">Inbox Connectors</h3>
                <p className="text-xs text-slate-500">InboxOS polls or gets push webhooks from these providers to sync new mail.</p>
              </div>

              {/* Gmail Connector */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-white/3 border border-white/5">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-red-500/10 text-red-400 rounded-xl flex items-center justify-center shrink-0">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">Gmail Account</p>
                    <p className="text-xs text-emerald-400 flex items-center gap-1">
                      <span className="h-1.5 w-1.5 bg-emerald-400 rounded-full" /> Connected (demo@inboxos.app)
                    </p>
                  </div>
                </div>
                <Button
                  size="sm"
                  variant={gmailConnected ? 'secondary' : 'primary'}
                  onClick={() => setGmailConnected(!gmailConnected)}
                >
                  {gmailConnected ? 'Disconnect' : 'Connect'}
                </Button>
              </div>

              {/* Outlook Connector */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-white/3 border border-white/5">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-blue-500/10 text-blue-400 rounded-xl flex items-center justify-center shrink-0">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">Outlook / MS Exchange</p>
                    <p className="text-xs text-slate-500">Not connected</p>
                  </div>
                </div>
                <Button
                  size="sm"
                  variant={outlookConnected ? 'secondary' : 'primary'}
                  onClick={() => setOutlookConnected(!outlookConnected)}
                >
                  {outlookConnected ? 'Disconnect' : 'Connect'}
                </Button>
              </div>

              {/* Telegram Delivery Setup */}
              <div className="border-t border-white/5 pt-5 space-y-4">
                <h4 className="text-sm font-medium text-slate-300">Telegram Notification Bot</h4>
                
                <div className="flex items-center justify-between p-4 rounded-xl bg-white/3 border border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-blue-400/10 text-blue-400 rounded-xl flex items-center justify-center shrink-0">
                      <Radio size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">Telegram Bot Status</p>
                      <p className="text-xs text-emerald-400 flex items-center gap-1">
                        <span className="h-1.5 w-1.5 bg-emerald-400 rounded-full" /> Active
                      </p>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => setTelegramConnected(!telegramConnected)}
                  >
                    {telegramConnected ? 'Deactivate Bot' : 'Activate Bot'}
                  </Button>
                </div>

                {telegramConnected && (
                  <Input
                    label="Bot Token"
                    type="password"
                    value={telegramToken}
                    onChange={(e) => setTelegramToken(e.target.value)}
                    placeholder="Enter Telegram Bot Token..."
                    icon={Shield}
                  />
                )}
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-white text-base mb-1">Notification Delivery Rules</h3>
                <p className="text-xs text-slate-500">Configure how and when InboxOS alerts you about incoming emails.</p>
              </div>

              <div className="space-y-4">
                <Toggle
                  label="Dashboard Push Notifications"
                  description="Display real-time popup banners inside the dashboard."
                  checked={dashboardAlerts}
                  onChange={setDashboardAlerts}
                />
                
                <Toggle
                  label="Telegram Forwarding alerts"
                  description="Instantly route high priority matching emails to Telegram bot."
                  checked={telegramEnabled}
                  onChange={setTelegramEnabled}
                />

                <Toggle
                  label="WhatsApp SMS alerts"
                  description="Use Twilio to forward urgent OTP or high-importance jobs emails."
                  checked={whatsappEnabled}
                  onChange={setWhatsappEnabled}
                />
              </div>

              <div className="border-t border-white/5 pt-5">
                <Slider
                  label="Minimum Priority Alert Threshold"
                  min={10}
                  max={100}
                  step={5}
                  value={minPriorityAlert}
                  onChange={setMinPriorityAlert}
                />
                <p className="text-[11px] text-slate-500 mt-2">
                  Emails scoring below <span className="text-indigo-400 font-bold">{minPriorityAlert}</span> priority will be aggregated silently inside the Daily/Weekly Digests and Informational logs rather than triggering push alerts.
                </p>
              </div>

            </div>
          )}

        </div>

      </div>
    </AppLayout>
  )
}

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Bot, RefreshCw, Send, Copy, CheckCircle, ChevronDown } from 'lucide-react'
import { AppLayout } from '../components/layout/AppLayout'
import { Button } from '../components/ui/Button'
import { CategoryBadge, PriorityBadge } from '../components/ui/Badge'
import { MOCK_EMAILS } from '../data/mock'

const TONES = ['professional', 'casual', 'brief', 'formal']

export function RepliesPage() {
  const [selectedEmail, setSelectedEmail] = useState(MOCK_EMAILS[0])
  const [tone, setTone] = useState('professional')
  const [instructions, setInstructions] = useState('')
  const [replyDraft, setReplyDraft] = useState(MOCK_EMAILS[0].analysis?.suggested_reply || '')
  const [isGenerating, setIsGenerating] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleGenerate = async () => {
    setIsGenerating(true)
    await new Promise(r => setTimeout(r, 1200))
    const draft = selectedEmail.analysis?.suggested_reply || 'Thank you for your email. I will review this and respond promptly.'
    const tonePrefix = tone === 'casual' ? 'Hey! ' : tone === 'brief' ? '' : ''
    setReplyDraft(tonePrefix + draft)
    setIsGenerating(false)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(replyDraft)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const emailsWithReplies = MOCK_EMAILS.filter(e => e.analysis?.suggested_reply)

  return (
    <AppLayout title="Reply Assistant" subtitle="AI-powered reply drafts with your preferred tone">
      <div className="max-w-5xl grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* Email selector */}
        <div className="glass rounded-2xl overflow-hidden">
          <div className="p-3 border-b border-white/5">
            <p className="text-sm font-medium text-white">Select Email</p>
          </div>
          <div className="overflow-y-auto" style={{ maxHeight: '500px' }}>
            {emailsWithReplies.map((email) => (
              <button
                key={email.id}
                onClick={() => {
                  setSelectedEmail(email)
                  setReplyDraft(email.analysis?.suggested_reply || '')
                }}
                className={`w-full text-left p-3 border-b border-white/5 transition-all hover:bg-white/5 ${selectedEmail?.id === email.id ? 'bg-indigo-500/10 border-l-2 border-l-indigo-500' : ''}`}
              >
                <p className="text-xs font-medium text-slate-200 truncate">{email.sender_name}</p>
                <p className="text-xs text-slate-400 truncate mt-0.5">{email.subject}</p>
                <div className="flex items-center gap-1.5 mt-1.5">
                  <CategoryBadge category={email.analysis?.category} size="xs" />
                  <PriorityBadge score={email.analysis?.priority_score || 0} size="xs" />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Reply generator */}
        <div className="lg:col-span-2 space-y-4">

          {/* Selected email preview */}
          {selectedEmail && (
            <div className="glass rounded-2xl p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="font-semibold text-white">{selectedEmail.subject}</p>
                  <p className="text-xs text-slate-400">from {selectedEmail.sender_name}</p>
                </div>
                <div className="flex items-center gap-2">
                  <CategoryBadge category={selectedEmail.analysis?.category} />
                  <PriorityBadge score={selectedEmail.analysis?.priority_score || 0} />
                </div>
              </div>
              <p className="text-xs text-slate-400 bg-white/3 rounded-lg p-3 mt-2 leading-relaxed">
                {selectedEmail.snippet}
              </p>
              {selectedEmail.analysis?.summary && (
                <p className="text-xs text-indigo-300 mt-2 flex items-start gap-1.5">
                  <Bot size={12} className="shrink-0 mt-0.5" />
                  {selectedEmail.analysis.summary}
                </p>
              )}
            </div>
          )}

          {/* Controls */}
          <div className="glass rounded-2xl p-4 space-y-4">
            <div>
              <p className="text-sm font-medium text-slate-300 mb-2">Tone</p>
              <div className="flex gap-2 flex-wrap">
                {TONES.map(t => (
                  <button
                    key={t}
                    onClick={() => setTone(t)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all capitalize ${
                      tone === t
                        ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                        : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-slate-300 mb-2">Additional Instructions (optional)</p>
              <input
                type="text"
                placeholder="e.g. mention I'll be available after 3 PM..."
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                className="w-full h-9 rounded-xl border border-white/10 bg-white/5 px-3 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500/50"
              />
            </div>

            <Button onClick={handleGenerate} loading={isGenerating} icon={Bot} className="w-full" size="md">
              {isGenerating ? 'Generating...' : 'Generate Reply'}
            </Button>
          </div>

          {/* Reply draft */}
          {replyDraft && (
            <motion.div
              key={replyDraft}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass rounded-2xl p-4"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Bot size={15} className="text-indigo-400" />
                  <p className="text-sm font-semibold text-white">AI Draft</p>
                  <span className="text-xs text-slate-500 bg-white/5 px-2 py-0.5 rounded-full capitalize">{tone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => handleGenerate()} className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/5">
                    <RefreshCw size={13} />
                  </button>
                  <button onClick={handleCopy} className="flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300 transition-colors">
                    {copied ? <CheckCircle size={13} /> : <Copy size={13} />}
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              </div>
              <textarea
                value={replyDraft}
                onChange={(e) => setReplyDraft(e.target.value)}
                rows={8}
                className="w-full rounded-xl border border-white/10 bg-white/3 p-3 text-sm text-slate-200 leading-relaxed resize-none focus:outline-none focus:border-indigo-500/50"
              />
              <div className="flex gap-2 mt-3">
                <Button size="sm" icon={Send} className="flex-1">Send Now</Button>
                <Button size="sm" variant="secondary" className="flex-1">Schedule Send</Button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </AppLayout>
  )
}

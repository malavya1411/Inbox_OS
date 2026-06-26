import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Star, Archive, Bot, Clock, Send, Copy, RefreshCw, CheckCircle } from 'lucide-react'
import { AppLayout } from '../components/layout/AppLayout'
import { Button } from '../components/ui/Button'
import { PriorityBadge, CategoryBadge } from '../components/ui/Badge'
import { MOCK_EMAILS } from '../data/mock'
import { formatDateTime } from '../utils/time'

function ScoreBar({ label, value, color = '#6366f1' }) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs">
        <span className="text-slate-400">{label}</span>
        <span className="text-slate-300 font-mono">{value.toFixed(0)}</span>
      </div>
      <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="h-full rounded-full"
          style={{ background: color }}
        />
      </div>
    </div>
  )
}

export function EmailDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const email = MOCK_EMAILS.find(e => e.id === id)
  const [replyText, setReplyText] = useState('')
  const [showReply, setShowReply] = useState(false)
  const [copied, setCopied] = useState(false)

  if (!email) {
    return (
      <AppLayout title="Email Not Found">
        <div className="text-center py-20">
          <p className="text-slate-400">Email not found.</p>
          <Button className="mt-4" onClick={() => navigate('/inbox')}>Back to Inbox</Button>
        </div>
      </AppLayout>
    )
  }

  const analysis = email.analysis

  const handleCopySuggested = () => {
    setReplyText(analysis?.suggested_reply || '')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <AppLayout title="Email Detail" subtitle={email.subject}>
      <div className="max-w-5xl">
        {/* Back button */}
        <button onClick={() => navigate('/inbox')} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-5 text-sm">
          <ArrowLeft size={16} />
          Back to Inbox
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">

          {/* Main Email Content */}
          <div className="lg:col-span-3 space-y-4">
            {/* Email Header */}
            <div className="glass rounded-2xl p-5">
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0"
                    style={{ background: `hsl(${email.sender_email.charCodeAt(0) * 5 % 360}, 60%, 40%)` }}>
                    {(email.sender_name || email.sender_email)[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-white">{email.sender_name}</p>
                    <p className="text-sm text-slate-400">{email.sender_email}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{formatDateTime(email.received_at)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <CategoryBadge category={analysis?.category} />
                  <PriorityBadge score={analysis?.priority_score || 0} />
                </div>
              </div>

              <h2 className="text-lg font-semibold text-white mb-4">{email.subject}</h2>

              <div className="text-sm text-slate-300 leading-relaxed whitespace-pre-line bg-white/3 rounded-xl p-4 border border-white/5">
                {email.body_text}
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-2 mt-4 flex-wrap">
                <Button size="sm" variant="secondary" icon={Star}>Star</Button>
                <Button size="sm" variant="secondary" icon={Archive}>Archive</Button>
                <Button size="sm" variant="secondary" icon={Clock}>Remind Me</Button>
                <Button size="sm" onClick={() => setShowReply(!showReply)} icon={Send}>Reply</Button>
              </div>
            </div>

            {/* Reply Box */}
            {showReply && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass rounded-2xl p-5"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-white text-sm">Write Reply</h3>
                  <button onClick={handleCopySuggested} className="flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300 transition-colors">
                    {copied ? <CheckCircle size={12} /> : <Copy size={12} />}
                    {copied ? 'Copied!' : 'Use AI Draft'}
                  </button>
                </div>
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  rows={6}
                  placeholder="Write your reply..."
                  className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 resize-none transition-all"
                />
                <div className="flex gap-2 mt-3">
                  <Button size="sm" icon={Send}>Send Now</Button>
                  <Button size="sm" variant="secondary" icon={Clock}>Schedule</Button>
                </div>
              </motion.div>
            )}
          </div>

          {/* AI Analysis Sidebar */}
          <div className="lg:col-span-2 space-y-4">
            {analysis && (
              <>
                {/* AI Summary */}
                <div className="glass rounded-2xl p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Bot size={15} className="text-indigo-400" />
                    <h3 className="font-semibold text-white text-sm">AI Summary</h3>
                    <span className="ml-auto text-xs text-slate-500 bg-white/5 px-2 py-0.5 rounded-full">mock AI</span>
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed">{analysis.summary}</p>
                </div>

                {/* Scores */}
                <div className="glass rounded-2xl p-4">
                  <h3 className="font-semibold text-white text-sm mb-4">AI Scores</h3>
                  <div className="space-y-3">
                    <ScoreBar label="Priority" value={analysis.priority_score} color="#6366f1" />
                    <ScoreBar label="Urgency" value={analysis.urgency_score} color="#ef4444" />
                    <ScoreBar label="Actionability" value={analysis.actionability_score} color="#10b981" />
                    <div className="pt-1 border-t border-white/5">
                      <div className="flex justify-between text-xs text-slate-400 mt-2">
                        <span>Confidence</span>
                        <span className="text-emerald-400">{(analysis.confidence_score * 100).toFixed(0)}%</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Reasoning */}
                <div className="glass rounded-2xl p-4">
                  <h3 className="font-semibold text-white text-sm mb-2">Reasoning</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{analysis.reasoning}</p>
                </div>

                {/* Extracted Data */}
                {analysis.extracted_data?.entities?.length > 0 && (
                  <div className="glass rounded-2xl p-4">
                    <h3 className="font-semibold text-white text-sm mb-3">Extracted Entities</h3>
                    <div className="space-y-2">
                      {analysis.extracted_data.entities.map((entity, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <span className="text-xs text-slate-500 bg-white/5 px-2 py-0.5 rounded capitalize">{entity.type}</span>
                          <span className="text-xs text-slate-300">{entity.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Items */}
                {analysis.extracted_data?.action_items?.length > 0 && (
                  <div className="glass rounded-2xl p-4">
                    <h3 className="font-semibold text-white text-sm mb-3">Action Items</h3>
                    {analysis.extracted_data.action_items.map((item, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs">
                        <div className="h-4 w-4 rounded border border-indigo-500/40 bg-indigo-500/10 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-slate-300">{item.description}</p>
                          {item.deadline && <p className="text-indigo-400 mt-0.5">Due: {item.deadline}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Suggested Reply */}
                {analysis.suggested_reply && (
                  <div className="glass rounded-2xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-white text-sm">Suggested Reply</h3>
                      <button onClick={handleCopySuggested} className="text-xs text-indigo-400 hover:text-indigo-300">
                        {copied ? '✓ Copied' : 'Use Draft'}
                      </button>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed whitespace-pre-line">{analysis.suggested_reply}</p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  )
}

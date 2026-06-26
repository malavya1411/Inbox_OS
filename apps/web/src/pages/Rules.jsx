import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, GitBranch, Trash2, Edit3, ChevronDown, ChevronUp, Grip } from 'lucide-react'
import { AppLayout } from '../components/layout/AppLayout'
import { Button } from '../components/ui/Button'
import { Toggle } from '../components/ui/Toggle'
import { StatusBadge } from '../components/ui/Badge'
import { MOCK_RULES } from '../data/mock'

const ACTION_LABELS = {
  notify_telegram: '📱 Notify Telegram',
  notify_whatsapp: '💬 Notify WhatsApp',
  create_task: '✅ Create Task',
  add_to_digest: '📋 Add to Digest',
  ignore: '🔕 Ignore',
  mark_important: '⭐ Mark Important',
  priority_boost: '⬆️ Boost Priority',
  log_expense: '💰 Log Expense',
}

const CONDITION_LABELS = {
  category: 'Category',
  sender_email: 'Sender Email',
  priority_score: 'Priority Score',
  subject: 'Subject',
  domain: 'Domain',
}

function RuleCard({ rule, onToggle, onDelete }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className={`glass rounded-2xl overflow-hidden border transition-all ${
        rule.is_active ? 'border-white/8' : 'border-white/4 opacity-60'
      }`}
    >
      <div className="flex items-center gap-3 p-4">
        <div className="text-slate-500 cursor-grab">
          <Grip size={16} />
        </div>

        {/* Priority badge */}
        <div className="h-6 w-6 rounded-md bg-indigo-500/20 text-indigo-300 text-xs font-bold flex items-center justify-center shrink-0">
          {rule.priority_order}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className="font-semibold text-white text-sm">{rule.name}</p>
            <StatusBadge status={rule.is_active ? 'active' : 'inactive'} />
          </div>
          {rule.description && <p className="text-xs text-slate-400 mt-0.5">{rule.description}</p>}

          {/* Preview conditions/actions */}
          <div className="flex items-center gap-2 mt-2 flex-wrap">
            {rule.conditions.slice(0, 2).map((cond, i) => (
              <span key={i} className="text-xs bg-blue-500/10 text-blue-300 border border-blue-500/20 px-2 py-0.5 rounded">
                {CONDITION_LABELS[cond.field] || cond.field} {cond.operator} "{cond.value}"
              </span>
            ))}
            <span className="text-xs text-slate-500">→</span>
            {rule.actions.slice(0, 2).map((action, i) => (
              <span key={i} className="text-xs bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 px-2 py-0.5 rounded">
                {ACTION_LABELS[action.type] || action.type}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Toggle checked={rule.is_active} onChange={() => onToggle(rule.id)} size="sm" />
          <button onClick={() => setExpanded(!expanded)} className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors">
            {expanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
          </button>
          <button onClick={() => onDelete(rule.id)} className="p-1.5 text-slate-500 hover:text-red-400 rounded-lg hover:bg-red-500/10 transition-colors">
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-white/5 overflow-hidden"
          >
            <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-medium text-slate-300 mb-2 uppercase tracking-wider">Conditions (ALL must match)</p>
                <div className="space-y-2">
                  {rule.conditions.map((cond, i) => (
                    <div key={i} className="flex items-center gap-2 p-2 bg-blue-500/5 border border-blue-500/15 rounded-lg text-xs">
                      <span className="text-slate-400">{CONDITION_LABELS[cond.field] || cond.field}</span>
                      <span className="text-slate-500">{cond.operator}</span>
                      <span className="text-blue-300 font-medium">"{cond.value}"</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-medium text-slate-300 mb-2 uppercase tracking-wider">Actions (all execute)</p>
                <div className="space-y-2">
                  {rule.actions.map((action, i) => (
                    <div key={i} className="flex items-center gap-2 p-2 bg-emerald-500/5 border border-emerald-500/15 rounded-lg text-xs">
                      <span className="text-emerald-300">{ACTION_LABELS[action.type] || action.type}</span>
                      {Object.keys(action.params || {}).length > 0 && (
                        <span className="text-slate-500">{JSON.stringify(action.params)}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export function RulesPage() {
  const [rules, setRules] = useState(MOCK_RULES)
  const [showCreateModal, setShowCreateModal] = useState(false)

  const handleToggle = (id) => {
    setRules(prev => prev.map(r => r.id === id ? { ...r, is_active: !r.is_active } : r))
  }

  const handleDelete = (id) => {
    setRules(prev => prev.filter(r => r.id !== id))
  }

  return (
    <AppLayout title="Rules Engine" subtitle="Define how InboxOS handles your emails">
      <div className="max-w-3xl space-y-4">

        {/* Header actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GitBranch size={16} className="text-indigo-400" />
            <p className="text-sm text-slate-400">{rules.filter(r => r.is_active).length} active rules · evaluated in order</p>
          </div>
          <Button size="sm" icon={Plus} onClick={() => setShowCreateModal(true)}>
            New Rule
          </Button>
        </div>

        {/* How it works */}
        <div className="glass rounded-2xl p-4 border border-indigo-500/15 bg-indigo-500/5">
          <p className="text-xs text-indigo-300 font-medium mb-1">How Rules Work</p>
          <p className="text-xs text-slate-400">
            Rules are evaluated in priority order (1 = highest). The first matching rule executes its actions.
            AI analysis runs before rules — you can use AI scores as conditions.
          </p>
        </div>

        {/* Rules list */}
        <div className="space-y-3">
          {rules.sort((a, b) => a.priority_order - b.priority_order).map(rule => (
            <RuleCard key={rule.id} rule={rule} onToggle={handleToggle} onDelete={handleDelete} />
          ))}
        </div>

        {/* Create rule modal placeholder */}
        <AnimatePresence>
          {showCreateModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setShowCreateModal(false)}
            >
              <motion.div
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="glass rounded-2xl p-6 w-full max-w-lg border border-white/10"
              >
                <h3 className="font-semibold text-white text-lg mb-4">Create New Rule</h3>
                <p className="text-slate-400 text-sm mb-6">Visual rule builder — full implementation coming in sprint 2. Rules are stored as JSON and can be edited manually via API.</p>
                <div className="flex gap-2">
                  <Button onClick={() => setShowCreateModal(false)} variant="secondary" className="flex-1">Cancel</Button>
                  <Button className="flex-1" onClick={() => setShowCreateModal(false)}>Create Rule</Button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AppLayout>
  )
}

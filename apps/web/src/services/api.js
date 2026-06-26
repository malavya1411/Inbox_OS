import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
})

// Attach JWT token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('inboxos_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Handle 401 globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('inboxos_token')
      window.location.href = '/auth/login'
    }
    return Promise.reject(error)
  }
)

// ── Auth ──────────────────────────────────────────────────────────────────────
export const authAPI = {
  login: (data) => api.post('/auth/login', data),
  register: (data) => api.post('/auth/register', data),
  me: () => api.get('/auth/me'),
}

// ── Emails ────────────────────────────────────────────────────────────────────
export const emailsAPI = {
  list: (params) => api.get('/emails', { params }),
  get: (id) => api.get(`/emails/${id}`),
  archive: (id) => api.post(`/emails/${id}/archive`),
  star: (id) => api.post(`/emails/${id}/star`),
  markRead: (id) => api.post(`/emails/${id}/mark-read`),
  getAnalysis: (id) => api.get(`/emails/${id}/analysis`),
}

// ── Rules ─────────────────────────────────────────────────────────────────────
export const rulesAPI = {
  list: () => api.get('/rules'),
  get: (id) => api.get(`/rules/${id}`),
  create: (data) => api.post('/rules', data),
  update: (id, data) => api.patch(`/rules/${id}`, data),
  delete: (id) => api.delete(`/rules/${id}`),
  toggle: (id) => api.post(`/rules/${id}/toggle`),
}

// ── Tasks ─────────────────────────────────────────────────────────────────────
export const tasksAPI = {
  list: () => api.get('/tasks'),
  create: (data) => api.post('/tasks', data),
  update: (id, data) => api.patch(`/tasks/${id}`, data),
  delete: (id) => api.delete(`/tasks/${id}`),
}

// ── Reminders ─────────────────────────────────────────────────────────────────
export const remindersAPI = {
  list: () => api.get('/reminders'),
  create: (data) => api.post('/reminders', data),
  cancel: (id) => api.patch(`/reminders/${id}/cancel`),
  snooze: (id, minutes) => api.patch(`/reminders/${id}/snooze?minutes=${minutes}`),
}

// ── Replies ───────────────────────────────────────────────────────────────────
export const repliesAPI = {
  generate: (data) => api.post('/replies/generate', data),
  schedule: (id, data) => api.post(`/replies/${id}/schedule`, data),
  history: () => api.get('/replies/history'),
}

// ── Dashboard ─────────────────────────────────────────────────────────────────
export const dashboardAPI = {
  stats: () => api.get('/dashboard/stats'),
  activity: () => api.get('/dashboard/recent-activity'),
}

// ── Analytics ─────────────────────────────────────────────────────────────────
export const analyticsAPI = {
  all: () => api.get('/analytics'),
  weeklyVolume: () => api.get('/analytics/weekly-volume'),
  categoryTrends: () => api.get('/analytics/category-trends'),
  topSenders: () => api.get('/analytics/top-senders'),
}

// ── Settings ──────────────────────────────────────────────────────────────────
export const settingsAPI = {
  get: () => api.get('/settings'),
  update: (data) => api.patch('/settings', data),
  connectedAccounts: () => api.get('/settings/connected-accounts'),
}

// ── AI ────────────────────────────────────────────────────────────────────────
export const aiAPI = {
  analyze: (data) => api.post('/ai/analyze', data),
  providers: () => api.get('/ai/providers'),
  health: () => api.get('/ai/health'),
}

export default api

import { create } from 'zustand'
import { MOCK_EMAILS } from '../data/mock'

export const useEmailStore = create((set, get) => ({
  emails: MOCK_EMAILS,
  selectedEmail: null,
  filter: { category: null, priority_min: null, is_read: null },
  searchQuery: '',
  isLoading: false,

  setEmails: (emails) => set({ emails }),
  selectEmail: (email) => set({ selectedEmail: email }),
  clearSelection: () => set({ selectedEmail: null }),
  setLoading: (isLoading) => set({ isLoading }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setFilter: (filter) => set((state) => ({ filter: { ...state.filter, ...filter } })),
  resetFilter: () => set({ filter: { category: null, priority_min: null, is_read: null } }),

  archiveEmail: (id) =>
    set((state) => ({
      emails: state.emails.map((e) => (e.id === id ? { ...e, is_archived: true } : e)),
    })),

  starEmail: (id) =>
    set((state) => ({
      emails: state.emails.map((e) => (e.id === id ? { ...e, is_starred: !e.is_starred } : e)),
    })),

  markRead: (id) =>
    set((state) => ({
      emails: state.emails.map((e) => (e.id === id ? { ...e, is_read: true } : e)),
    })),

  getFilteredEmails: () => {
    const { emails, filter, searchQuery } = get()
    let filtered = emails.filter((e) => !e.is_archived)

    if (filter.category) filtered = filtered.filter((e) => e.analysis?.category === filter.category)
    if (filter.priority_min) filtered = filtered.filter((e) => (e.analysis?.priority_score || 0) >= filter.priority_min)
    if (filter.is_read !== null) filtered = filtered.filter((e) => e.is_read === filter.is_read)

    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (e) =>
          e.subject?.toLowerCase().includes(q) ||
          e.sender_name?.toLowerCase().includes(q) ||
          e.sender_email?.toLowerCase().includes(q) ||
          e.snippet?.toLowerCase().includes(q)
      )
    }

    return filtered.sort((a, b) => {
      const pa = a.analysis?.priority_score || 0
      const pb = b.analysis?.priority_score || 0
      return pb - pa
    })
  },
}))

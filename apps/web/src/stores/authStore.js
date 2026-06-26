import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { MOCK_USER } from '../data/mock'

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      login: (user, token) => {
        if (token) localStorage.setItem('inboxos_token', token)
        set({ user, token, isAuthenticated: true })
      },

      logout: () => {
        localStorage.removeItem('inboxos_token')
        set({ user: null, token: null, isAuthenticated: false })
      },

      // Dev shortcut: login as demo user
      loginAsDemo: () => {
        const demoToken = 'dev-mock-token'
        localStorage.setItem('inboxos_token', demoToken)
        set({ user: MOCK_USER, token: demoToken, isAuthenticated: true })
      },

      updateUser: (updates) => set((state) => ({ user: { ...state.user, ...updates } })),
    }),
    {
      name: 'inboxos-auth',
      partialize: (state) => ({ user: state.user, token: state.token, isAuthenticated: state.isAuthenticated }),
    }
  )
)

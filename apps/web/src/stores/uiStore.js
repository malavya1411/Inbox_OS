import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useUIStore = create(
  persist(
    (set) => ({
      theme: 'dark',
      sidebarCollapsed: false,
      activeNotification: null,

      setTheme: (theme) => {
        document.body.classList.toggle('light', theme === 'light')
        set({ theme })
      },

      toggleTheme: () =>
        set((state) => {
          const newTheme = state.theme === 'dark' ? 'light' : 'dark'
          document.body.classList.toggle('light', newTheme === 'light')
          return { theme: newTheme }
        }),

      toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
      setSidebarCollapsed: (sidebarCollapsed) => set({ sidebarCollapsed }),

      showNotification: (notification) => {
        set({ activeNotification: notification })
        setTimeout(() => set({ activeNotification: null }), 4000)
      },
    }),
    {
      name: 'inboxos-ui',
      partialize: (state) => ({ theme: state.theme, sidebarCollapsed: state.sidebarCollapsed }),
    }
  )
)

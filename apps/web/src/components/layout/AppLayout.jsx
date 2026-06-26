import { Sidebar } from './Sidebar'
import { Navbar } from './Navbar'

export function AppLayout({ children, title, subtitle }) {
  return (
    <div className="flex h-screen overflow-hidden" style={{ background: '#080c18' }}>
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Navbar title={title} subtitle={subtitle} />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}

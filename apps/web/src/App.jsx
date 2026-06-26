import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthStore } from './stores/authStore'

// Import all pages
import { LandingPage } from './pages/Landing'
import { LoginPage, RegisterPage } from './pages/Auth'
import { DashboardPage } from './pages/Dashboard'
import { InboxPage } from './pages/Inbox'
import { EmailDetailPage } from './pages/EmailDetail'
import { TelegramPage } from './pages/Telegram'
import { RulesPage } from './pages/Rules'
import { SendersPage } from './pages/Senders'
import { RepliesPage } from './pages/Replies'
import { RemindersPage } from './pages/Reminders'
import { AnalyticsPage } from './pages/Analytics'
import { SettingsPage } from './pages/Settings'
import { NotFoundPage } from './pages/NotFound'

// Route protection wrapper
function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuthStore()
  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />
  }
  return children
}

// Redirect authenticated users away from auth pages
function PublicRoute({ children }) {
  const { isAuthenticated } = useAuthStore()
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }
  return children
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Auth Routes */}
        <Route path="/auth/login" element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        } />
        <Route path="/auth/register" element={
          <PublicRoute>
            <RegisterPage />
          </PublicRoute>
        } />

        {/* Protected Dashboard/App Routes */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        } />
        <Route path="/inbox" element={
          <ProtectedRoute>
            <InboxPage />
          </ProtectedRoute>
        } />
        <Route path="/inbox/:id" element={
          <ProtectedRoute>
            <EmailDetailPage />
          </ProtectedRoute>
        } />
        <Route path="/telegram" element={
          <ProtectedRoute>
            <TelegramPage />
          </ProtectedRoute>
        } />
        <Route path="/rules" element={
          <ProtectedRoute>
            <RulesPage />
          </ProtectedRoute>
        } />
        <Route path="/senders" element={
          <ProtectedRoute>
            <SendersPage />
          </ProtectedRoute>
        } />
        <Route path="/replies" element={
          <ProtectedRoute>
            <RepliesPage />
          </ProtectedRoute>
        } />
        <Route path="/reminders" element={
          <ProtectedRoute>
            <RemindersPage />
          </ProtectedRoute>
        } />
        <Route path="/analytics" element={
          <ProtectedRoute>
            <AnalyticsPage />
          </ProtectedRoute>
        } />
        <Route path="/settings" element={
          <ProtectedRoute>
            <SettingsPage />
          </ProtectedRoute>
        } />

        {/* 404 Route */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

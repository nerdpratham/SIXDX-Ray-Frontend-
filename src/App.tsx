import { type ReactElement } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import Organisation from './pages/Organisation'
import Meeting from './pages/Meeting'
import RecordingPage from './pages/Recording'
import { AppProvider, useAppContext } from './context/AppContext'

function RequireUsername({ children }: { children: ReactElement }) {
  const { username } = useAppContext()
  if (!username) return <Navigate to="/" replace />
  return children
}

function RequireOrganisation({ children }: { children: ReactElement }) {
  const { username, selectedOrg } = useAppContext()
  if (!username) return <Navigate to="/" replace />
  if (!selectedOrg) return <Navigate to="/organizations" replace />
  return children
}

function MeetingRoute() {
  const { username, selectedOrg } = useAppContext()
  return <Meeting roomId={selectedOrg ?? 'default-room'} localName={username ?? 'You'} />
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route
        path="/organizations"
        element={
          <RequireUsername>
            <Organisation />
          </RequireUsername>
        }
      />
      <Route
        path="/meetings"
        element={
          <RequireOrganisation>
            <MeetingRoute />
          </RequireOrganisation>
        }
      />
      <Route
        path="/recordings"
        element={
          <RequireOrganisation>
            <RecordingPage />
          </RequireOrganisation>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default function App() {
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  )
}

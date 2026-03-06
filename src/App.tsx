import { useState } from 'react'
import LandingPage from './pages/LandingPage'
import Organisation from './pages/Organisation'

type Screen = 'login' | 'organisation'

export default function App() {
  const [screen, setScreen] = useState<Screen>('login')

  if (screen === 'organisation') {
    return <Organisation />
  }

  return <LandingPage onLoginSuccess={() => setScreen('organisation')} />
}

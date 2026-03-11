import { createContext, useContext, useState, type ReactNode } from 'react'

type PageName = 'landing' | 'organisation' | 'meetings' | 'recordings'

interface AppContextValue {
  username: string | null
  selectedOrg: string | null
  currentPage: PageName
  /** whether the last login used the test bypass credentials */
  isTestLogin: boolean
  setUsername: (name: string | null) => void
  setSelectedOrg: (org: string | null) => void
  setCurrentPage: (page: PageName) => void
  setIsTestLogin: (flag: boolean) => void
}

const AppContext = createContext<AppContextValue | undefined>(undefined)

export function AppProvider({ children }: { children: ReactNode }) {
  const [username, setUsername] = useState<string | null>(null)
  const [selectedOrg, setSelectedOrg] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState<PageName>('landing')
  const [isTestLogin, setIsTestLogin] = useState<boolean>(false)

  return (
    <AppContext.Provider
      value={{
        username,
        selectedOrg,
        currentPage,
        isTestLogin,
        setUsername,
        setSelectedOrg,
        setCurrentPage,
        setIsTestLogin,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  const ctx = useContext(AppContext)
  if (!ctx) {
    throw new Error('useAppContext must be used within AppProvider')
  }
  return ctx
}


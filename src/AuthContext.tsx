import React, { createContext, useState, useContext, useEffect } from 'react'

type UserRole = 'citizen' | 'government' | null

interface AuthContextType {
  isAuthenticated: boolean
  userRole: UserRole
  login: (username: string, role: 'citizen' | 'government') => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userRole, setUserRole] = useState<UserRole>(null)

  useEffect(() => {
    const storedAuth = localStorage.getItem('isAuthenticated')
    const storedRole = localStorage.getItem('userRole') as UserRole

    if (storedAuth === 'true' && storedRole) {
      setIsAuthenticated(true)
      setUserRole(storedRole)
    }
  }, [])

  const login = (username: string, role: 'citizen' | 'government') => {
    setIsAuthenticated(true)
    setUserRole(role)
    localStorage.setItem('isAuthenticated', 'true')
    localStorage.setItem('userRole', role)
  }

  const logout = () => {
    setIsAuthenticated(false)
    setUserRole(null)
    localStorage.removeItem('isAuthenticated')
    localStorage.removeItem('userRole')
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, userRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
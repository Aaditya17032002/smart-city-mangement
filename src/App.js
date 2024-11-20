'use client'

import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { ThemeProvider } from './ThemeContext.tsx'
import { AuthProvider, useAuth } from './AuthContext.tsx'
import LoginPage from './pages/Login.tsx'
import CitizenDashboard from './pages/citizen/Dashboard.tsx'
import CitizenUsage from './pages/citizen/Usage.tsx'
import CitizenAlerts from './pages/citizen/Alerts.tsx'
import CitizenSustainability from './pages/citizen/Sustainability.tsx'
import GovernmentDashboard from './pages/government/Dashboard.tsx'
import GovernmentResource from './pages/government/Resource.tsx'
import GovernmentAnalytics from './pages/government/Analytics.tsx'
import GovernmentSustainability from './pages/government/Sustainability.tsx'
import GovernmentAlerts from './pages/government/Alerts.tsx'
import SmartSurveillance from './pages/SmartSurveillance.tsx'
import Navbar from './components/Navbar.tsx'
import Sidebar from './components/Sidebar.tsx'
import PreloaderAnimation from './components/PreloaderAnimation.tsx'

function ProtectedRoute({ children, allowedRoles }) {
  const { isAuthenticated, userRole } = useAuth()
  return isAuthenticated && allowedRoles.includes(userRole) ? <>{children}</> : <Navigate to="/login" replace />
}
const originalResizeObserver = window.ResizeObserver;

class NoOpResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

window.ResizeObserver = NoOpResizeObserver;
export default function App() {
  const [isLoading, setIsLoading] = useState(true)
  const { userRole } = useAuth()

  useEffect(() => {
    // Simulate initial data loading
    setTimeout(() => setIsLoading(false), 3000)
  }, [])

  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          {isLoading ? (
            <PreloaderAnimation />
          ) : (
            <div className="flex h-screen bg-background text-foreground">
              <Sidebar />
              <div className="flex-1 flex flex-col overflow-hidden">
                <Navbar />
                <main className="flex-1 overflow-x-hidden overflow-y-auto">
                  <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route 
                      path="/citizen" 
                      element={
                        <ProtectedRoute allowedRoles={['citizen']}>
                          <CitizenDashboard />
                        </ProtectedRoute>
                      } 
                    />
                    <Route 
                      path="/citizen/usage/:resource" 
                      element={
                        <ProtectedRoute allowedRoles={['citizen']}>
                          <CitizenUsage />
                        </ProtectedRoute>
                      } 
                    />
                    <Route 
                      path="/citizen/alerts" 
                      element={
                        <ProtectedRoute allowedRoles={['citizen']}>
                          <CitizenAlerts />
                        </ProtectedRoute>
                      } 
                    />
                    <Route 
                      path="/citizen/sustainability" 
                      element={
                        <ProtectedRoute allowedRoles={['citizen']}>
                          <CitizenSustainability />
                        </ProtectedRoute>
                      } 
                    />
                    <Route 
                      path="/government" 
                      element={
                        <ProtectedRoute allowedRoles={['government']}>
                          <GovernmentDashboard />
                        </ProtectedRoute>
                      } 
                    />
                    <Route 
                      path="/government/resource/:resource" 
                      element={
                        <ProtectedRoute allowedRoles={['government']}>
                          <GovernmentResource />
                        </ProtectedRoute>
                      } 
                    />
                    <Route 
                      path="/government/analytics" 
                      element={
                        <ProtectedRoute allowedRoles={['government']}>
                          <GovernmentAnalytics />
                        </ProtectedRoute>
                      } 
                    />
                    <Route 
                      path="/government/sustainability" 
                      element={
                        <ProtectedRoute allowedRoles={['government']}>
                          <GovernmentSustainability />
                        </ProtectedRoute>
                      } 
                    />
                    <Route 
                      path="/government/alerts" 
                      element={
                        <ProtectedRoute allowedRoles={['government']}>
                          <GovernmentAlerts />
                        </ProtectedRoute>
                      } 
                    />
                    <Route 
                      path="/government/smart-surveillance" 
                      element={
                        <ProtectedRoute allowedRoles={['government']}>
                          <SmartSurveillance />
                        </ProtectedRoute>
                      } 
                    />
                    <Route path="/" element={<Navigate to={userRole === 'citizen' ? "/citizen" : "/government"} replace />} />
                  </Routes>
                </main>
              </div>
            </div>
          )}
        </AuthProvider>
      </ThemeProvider>
    </Router>
  )
}
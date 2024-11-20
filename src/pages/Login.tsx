'use client'
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card.tsx'
import { Input } from '../components/ui/input.tsx'
import { Button } from '../components/ui/button.tsx'
import { Label } from '../components/ui/label.tsx'
import { FaUser, FaLock, FaCity } from 'react-icons/fa'
import { useAuth } from '../AuthContext.tsx'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [userType, setUserType] = useState('citizen')
  const navigate = useNavigate()
  const { login } = useAuth()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Static credentials for testing
    const validCredentials = {
      citizen: { username: 'citizen', password: 'password123' },
      government: { username: 'government', password: 'password123' }
    }

    if (
      (userType === 'citizen' && 
       username === validCredentials.citizen.username && 
       password === validCredentials.citizen.password) ||
      (userType === 'government' && 
       username === validCredentials.government.username && 
       password === validCredentials.government.password)
    ) {
      login(username, userType as 'citizen' | 'government')
      navigate(userType === 'citizen' ? '/citizen' : '/government')
    } else {
      alert('Invalid credentials. Please try again.')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md px-4"
      >
        <Card className="border-primary/20 shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center flex items-center justify-center text-primary">
              <FaCity className="mr-2" />
              Smart City Platform
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-foreground">Username</Label>
                <div className="relative">
                  <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="username"
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="pl-10 border-input bg-background"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-foreground">Password</Label>
                <div className="relative">
                  <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 border-input bg-background"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-foreground">User Type</Label>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    type="button"
                    variant={userType === 'citizen' ? 'default' : 'outline'}
                    className="w-full"
                    onClick={() => setUserType('citizen')}
                  >
                    Citizen
                  </Button>
                  <Button
                    type="button"
                    variant={userType === 'government' ? 'default' : 'outline'}
                    className="w-full"
                    onClick={() => setUserType('government')}
                  >
                    Government
                  </Button>
                </div>
              </div>
              <Button type="submit" className="w-full">
                Log In
              </Button>
            </form>
            <div className="mt-4 text-sm text-muted-foreground">
              <p className="font-semibold">For testing:</p>
              <p>Citizen - Username: citizen, Password: password123</p>
              <p>Government - Username: government, Password: password123</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
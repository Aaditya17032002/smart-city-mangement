'use client'

import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaChevronLeft, FaChevronRight, FaTachometerAlt, FaBolt, FaWater, FaTrash, FaChartLine, FaLeaf, FaBell, FaVideo } from 'react-icons/fa'
import { cn } from './lib/utils.ts'
import { useAuth } from '../AuthContext.tsx'

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const location = useLocation()
  const { userRole } = useAuth()

  const sidebarItems = userRole === 'citizen'
    ? [
        { name: 'Dashboard', icon: FaTachometerAlt, path: '/citizen' },
        { name: 'Electricity', icon: FaBolt, path: '/citizen/usage/electricity' },
        { name: 'Water', icon: FaWater, path: '/citizen/usage/water' },
        { name: 'Waste', icon: FaTrash, path: '/citizen/usage/waste' },
        { name: 'Sustainability', icon: FaLeaf, path: '/citizen/sustainability' },
        { name: 'Alerts', icon: FaBell, path: '/citizen/alerts' },
      ]
    : [
        { name: 'Dashboard', icon: FaTachometerAlt, path: '/government' },
        { name: 'Electricity', icon: FaBolt, path: '/government/resource/electricity' },
        { name: 'Water', icon: FaWater, path: '/government/resource/water' },
        { name: 'Waste', icon: FaTrash, path: '/government/resource/waste' },
        { name: 'Analytics', icon: FaChartLine, path: '/government/analytics' },
        { name: 'Sustainability', icon: FaLeaf, path: '/government/sustainability' },
        { name: 'Alerts', icon: FaBell, path: '/government/alerts' },
        { name: 'Smart Surveillance', icon: FaVideo, path: '/government/smart-surveillance' },
      ]

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsCollapsed(true)
      } else {
        setIsCollapsed(false)
      }
    }

    window.addEventListener('resize', handleResize)
    handleResize() // Call on initial render

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <motion.div
      className={cn(
        "bg-secondary text-secondary-foreground h-screen flex flex-col",
        isCollapsed ? "w-16" : "w-64"
      )}
      animate={{ width: isCollapsed ? 64 : 256 }}
      transition={{ duration: 0.3 }}
    >
      <div className="p-4 flex justify-end">
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)} 
          className="text-secondary-foreground hover:bg-primary hover:text-primary-foreground rounded-full p-2 transition-colors"
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? <FaChevronRight /> : <FaChevronLeft />}
        </button>
      </div>
      <nav className="flex-1 overflow-y-auto">
        <ul className="space-y-2 p-2">
          {sidebarItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className={cn(
                  "flex items-center p-2 rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors",
                  location.pathname === item.path && "bg-primary text-primary-foreground"
                )}
              >
                <item.icon className={cn("w-6 h-6", isCollapsed ? "mx-auto" : "mr-4")} />
                {!isCollapsed && <span className="whitespace-nowrap overflow-hidden text-ellipsis">{item.name}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </motion.div>
  )
}
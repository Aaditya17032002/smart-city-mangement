'use client'

import React from 'react';
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card.tsx'
import { Button } from '../../components/ui/button.tsx'
import { LineChart, Line, AreaChart, Area, BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts'
import { FaLightbulb, FaWater, FaTrash } from 'react-icons/fa'

const resourceData = {
  electricity: [
    { day: 'Mon', usage: 30, average: 35 },
    { day: 'Tue', usage: 35, average: 35 },
    { day: 'Wed', usage: 40, average: 35 },
    { day: 'Thu', usage: 32, average: 35 },
    { day: 'Fri', usage: 38, average: 35 },
    { day: 'Sat', usage: 28, average: 35 },
    { day: 'Sun', usage: 25, average: 35 },
  ],
  water: [
    { day: 'Mon', usage: 250, average: 280 },
    { day: 'Tue', usage: 270, average: 280 },
    { day: 'Wed', usage: 300, average: 280 },
    { day: 'Thu', usage: 260, average: 280 },
    { day: 'Fri', usage: 290, average: 280 },
    { day: 'Sat', usage: 240, average: 280 },
    { day: 'Sun', usage: 220, average: 280 },
  ],
  waste: [
    { day: 'Mon', usage: 2.5, average:  3 },
    { day: 'Tue', usage: 2.8, average: 3 },
    { day: 'Wed', usage: 3.2, average: 3 },
    { day: 'Thu', usage: 2.7, average: 3 },
    { day: 'Fri', usage: 3.1, average: 3 },
    { day: 'Sat', usage: 2.4, average: 3 },
    { day: 'Sun', usage: 2.2, average: 3 },
  ],
}

const forecastData = {
  electricity: [
    { month: 'Jan', forecast: 900, actual: 950 },
    { month: 'Feb', forecast: 850, actual: 900 },
    { month: 'Mar', forecast: 950, actual: 1000 },
    { month: 'Apr', forecast: 1000, actual: 1050 },
    { month: 'May', forecast: 1100, actual: null },
    { month: 'Jun', forecast: 1200, actual: null },
  ],
  water: [
    { month: 'Jan', forecast: 7500, actual: 7800 },
    { month: 'Feb', forecast: 7000, actual: 7200 },
    { month: 'Mar', forecast: 7800, actual: 8000 },
    { month: 'Apr', forecast: 8200, actual: 8500 },
    { month: 'May', forecast: 8800, actual: null },
    { month: 'Jun', forecast: 9500, actual: null },
  ],
  waste: [
    { month: 'Jan', forecast: 75, actual: 78 },
    { month: 'Feb', forecast: 70, actual: 72 },
    { month: 'Mar', forecast: 78, actual: 80 },
    { month: 'Apr', forecast: 82, actual: 85 },
    { month: 'May', forecast: 88, actual: null },
    { month: 'Jun', forecast: 95, actual: null },
  ],
}

const optimizationSuggestions = {
  electricity: [
    "Switch to LED bulbs to save up to 75% on lighting costs",
    "Use a smart power strip to reduce standby power consumption",
    "Upgrade to energy-efficient appliances",
  ],
  water: [
    "Install low-flow showerheads to reduce water usage",
    "Fix leaky faucets to save up to 10% on your water bill",
    "Use drought-resistant plants in your garden",
  ],
  waste: [
    "Start composting food scraps to reduce waste by up to 30%",
    "Use reusable shopping bags to minimize plastic waste",
    "Recycle paper, plastic, and glass materials",
  ],
}

export default function CitizenUsage() {
  const { resource } = useParams<{ resource: 'electricity' | 'water' | 'waste' }>()
  const [acceptedSuggestions, setAcceptedSuggestions] = useState<string[]>([])

  const handleAcceptSuggestion = (suggestion: string) => {
    setAcceptedSuggestions([...acceptedSuggestions, suggestion])
  }

  const resourceIcon = {
    electricity: <FaLightbulb />,
    water: <FaWater />,
    waste: <FaTrash />,
  }

  // Conditional rendering if resource is undefined
  if (!resource) {
    return <div>Error: Resource not found!</div>
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        {resourceIcon[resource]} <span className="ml-2">{resource.charAt(0).toUpperCase() + resource.slice(1)} Usage</span>
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Daily Usage Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={resourceData[resource]}>
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <CartesianGrid strokeDasharray="3 3" />
                <Line type="monotone" dataKey="usage" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="average" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>AI-Powered Forecasting</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={forecastData[resource]}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <CartesianGrid strokeDasharray="3 3" />
                <Area type="monotone" dataKey="forecast" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
                <Area type="monotone" dataKey="actual" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.3} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Optimization Suggestions</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {optimizationSuggestions[resource].map((suggestion, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-2 bg-secondary rounded"
                >
                  <span>{suggestion}</span>
                  {acceptedSuggestions.includes(suggestion) ? (
                    <span className="text-green-500">Accepted</span>
                  ) : (
                    <Button size="sm" onClick={() => handleAcceptSuggestion(suggestion)}>Accept</Button>
                  )}
                </motion.li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Comparison with Community</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={resourceData[resource]}>
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <CartesianGrid strokeDasharray="3 3" />
                <Bar dataKey="usage" fill="#8884d8" name="Your Usage" />
                <Bar dataKey="average" fill="#82ca9d" name="Community Average" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

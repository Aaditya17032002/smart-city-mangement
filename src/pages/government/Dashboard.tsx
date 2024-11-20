'use client'
import React from 'react';

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card.tsx'
import { Button } from '../../components/ui/button.tsx'
import { Progress } from '../../components/ui/progress.tsx'
import { LineChart, Line, AreaChart, Area, BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts'
import { FaBolt, FaWater, FaTrash, FaExclamationTriangle } from 'react-icons/fa'

const resourceData = {
  electricity: [
    { time: '00:00', usage: 2000 },
    { time: '04:00', usage: 1800 },
    { time: '08:00', usage: 2200 },
    { time: '12:00', usage: 2600 },
    { time: '16:00', usage: 2400 },
    { time: '20:00', usage: 2200 },
  ],
  water: [
    { time: '00:00', usage: 1500 },
    { time: '04:00', usage: 1200 },
    { time: '08:00', usage: 1800 },
    { time: '12:00', usage: 2000 },
    { time: '16:00', usage: 1900 },
    { time: '20:00', usage: 1700 },
  ],
  waste: [
    { time: '00:00', usage: 100 },
    { time: '04:00', usage: 80 },
    { time: '08:00', usage: 120 },
    { time: '12:00', usage: 150 },
    { time: '16:00', usage: 140 },
    { time: '20:00', usage: 130 },
  ],
}

const districtData = [
  { name: 'District A', electricity: 2500, water: 1800, waste: 120 },
  { name: 'District B', electricity: 2200, water: 1600, waste: 100 },
  { name: 'District C', electricity: 2800, water: 2000, waste: 140 },
  { name: 'District D', electricity: 2100, water: 1500, waste: 90 },
  { name: 'District E', electricity: 2600, water: 1900, waste: 130 },
]

const alerts = [
  { id: 1, type: 'electricity', message: 'High energy consumption in District C', severity: 'high' },
  { id: 2, type: 'water', message: 'Potential water leak detected in District B', severity: 'medium' },
  { id: 3, type: 'waste', message: 'Waste collection delay in District E', severity: 'low' },
]

export default function GovernmentDashboard() {
    const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
  const [aiSuggestion, setAiSuggestion] = useState('')

  useEffect(() => {
    // Simulating AI-generated suggestion
    const suggestions = [
      "Implement smart street lighting in District A to reduce energy consumption by 15%",
      "Upgrade water infrastructure in District C to minimize leaks and improve efficiency",
      "Introduce AI-powered waste sorting system in District B to optimize recycling rates",
    ]
    setAiSuggestion(suggestions[Math.floor(Math.random() * suggestions.length)])
  }, [])

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold mb-6">Government Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ResourceCard
          title="Electricity"
          icon={<FaBolt />}
          data={resourceData.electricity}
          color="#ffd700"
        />
        <ResourceCard
          title="Water"
          icon={<FaWater />}
          data={resourceData.water}
          color="#4169e1"
        />
        <ResourceCard
          title="Waste"
          icon={<FaTrash />}
          data={resourceData.waste}
          color="#32cd32"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>AI-Powered Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-lg font-semibold mb-4">{aiSuggestion}</p>
            <Button>Implement Suggestion</Button>
          </motion.div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>City-Wide Resource Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={districtData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="electricity" fill="#ffd700" />
              <Bar dataKey="water" fill="#4169e1" />
              <Bar dataKey="waste" fill="#32cd32" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Interactive City Map</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-5 gap-4">
            {districtData.map((district, index) => (
              <motion.div
                key={district.name}
                className={`p-4 rounded-lg cursor-pointer ${
                  selectedDistrict === district.name ? 'bg-primary text-primary-foreground' : 'bg-secondary'
                }`}
                onClick={() => setSelectedDistrict(district.name)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <h3 className="font-semibold mb-2">{district.name}</h3>
                <p className="text-sm">Electricity: {district.electricity} kWh</p>
                <p className="text-sm">Water: {district.water} m³</p>
                <p className="text-sm">Waste: {district.waste} tons</p>
              </motion.div>
            ))}
          </div>
          {selectedDistrict && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4"
            >
              <h3 className="font-semibold mb-2">Selected District: {selectedDistrict}</h3>
              <Button>View Detailed Report</Button>
            </motion.div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Automated Alerts</CardTitle>
        </CardHeader>
        <CardContent>
          {alerts.map(alert => (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`mb-4 p-4 rounded-lg ${
                alert.severity === 'high' ? 'bg-red-100' :
                alert.severity === 'medium' ? 'bg-yellow-100' : 'bg-green-100'
              }`}
            >
              <div className="flex items-center">
                <FaExclamationTriangle className={`mr-2 ${
                  alert.severity === 'high' ? 'text-red-500' :
                  alert.severity === 'medium' ? 'text-yellow-500' : 'text-green-500'
                }`} />
                <span className="font-semibold">{alert.type.charAt(0).toUpperCase() + alert.type.slice(1)} Alert</span>
              </div>
              <p className="mt-2">{alert.message}</p>
              <Button size="sm" className="mt-2">Take Action</Button>
            </motion.div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

function ResourceCard({ title, icon, data, color }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          {icon}
          <span>{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="usage" stroke={color} fill={color} fillOpacity={0.3} />
          </AreaChart>
        </ResponsiveContainer>
        <div className="mt-4">
          <div className="flex justify-between mb-1">
            <span>Efficiency</span>
            <span>78%</span>
          </div>
          <Progress value={78} className="h-2" />
        </div>
      </CardContent>
    </Card>
  )
}
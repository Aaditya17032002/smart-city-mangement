'use client'
import React from 'react';

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card.tsx'
import { Progress } from '../../components/ui/progress.tsx'
import { Button } from '../../components/ui/button.tsx'
import { BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from 'recharts'
import { FaBolt, FaWater, FaTrash, FaLeaf } from 'react-icons/fa'

const resourceData = {
  electricity: { usage: 250, change: -10, unit: 'kWh' },
  water: { usage: 150, change: -5, unit: 'L' },
  waste: { usage: 20, change: -15, unit: 'kg' },
}

const savingsData = [
  { name: 'Electricity', value: 30 },
  { name: 'Water', value: 40 },
  { name: 'Waste', value: 30 },
]

const COLORS = ['#0088FE', '#00C49F', '#FFBB28']

const aiTips = [
  "Switch to energy-efficient LED bulbs to save up to 75% on lighting costs.",
  "Install a smart thermostat to optimize your home's temperature and reduce energy consumption.",
  "Fix leaky faucets to save up to 10% on your water bill.",
  "Use a rain barrel to collect rainwater for watering your garden.",
  "Start composting food scraps to reduce your household waste by up to 30%.",
]

export default function CitizenDashboard() {
  const [showTip, setShowTip] = useState(false)
  const [currentTip, setCurrentTip] = useState('')

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTip(aiTips[Math.floor(Math.random() * aiTips.length)])
      setShowTip(true)
      setTimeout(() => setShowTip(false), 5000)
    }, 10000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold mb-6">Citizen Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ResourceCard
          title="Electricity"
          icon={<FaBolt />}
          data={resourceData.electricity}
        />
        <ResourceCard
          title="Water"
          icon={<FaWater />}
          data={resourceData.water}
        />
        <ResourceCard
          title="Waste"
          icon={<FaTrash />}
          data={resourceData.waste}
        />
      </div>

      <AnimatePresence>
        {showTip && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-4 right-4 bg-primary text-primary-foreground p-4 rounded-lg shadow-lg max-w-sm"
          >
            <h3 className="font-bold mb-2">AI Tip:</h3>
            <p>{currentTip}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Savings Dashboard</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={savingsData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {savingsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Personal Sustainability Goals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span>Reduce Carbon Footprint</span>
                  <span>75%</span>
                </div>
                <Progress value={75} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span>Increase Recycling</span>
                  <span>60%</span>
                </div>
                <Progress value={60} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span>Water Conservation</span>
                  <span>40%</span>
                </div>
                <Progress value={40} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Community Impact</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={savingsData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#8884d8" name="Your Savings" />
                <Bar dataKey="value" fill="#82ca9d" name="Community Average" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-center justify-between p-2 bg-yellow-100 rounded">
                <span>High electricity usage detected</span>
                <Button size="sm">View</Button>
              </li>
              <li className="flex items-center justify-between p-2 bg-green-100 rounded">
                <span>Water saving goal achieved</span>
                <Button size="sm">View</Button>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function ResourceCard({ title, icon, data }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          {icon}
          <span>{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold mb-2">{data.usage} {data.unit}</div>
        <div className={`text-sm ${data.change < 0 ? 'text-green-500' : 'text-red-500'}`}>
          {data.change}% from last week
        </div>
        <Progress value={Math.abs(data.change)} className="h-2 mt-2" />
      </CardContent>
    </Card>
  )
}
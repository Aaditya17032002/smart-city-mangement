'use client'
import React from 'react';
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card.tsx'
import { Progress } from '../../components/ui/progress.tsx'
import { Button } from '../../components/ui/button.tsx'
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts'
import { FaLeaf, FaSeedling, FaRecycle } from 'react-icons/fa'

const carbonFootprintData = [
  { name: 'Electricity', value: 40 },
  { name: 'Transportation', value: 30 },
  { name: 'Waste', value: 15 },
  { name: 'Food', value: 15 },
]

const energySourcesData = [
  { name: 'Solar', value: 30 },
  { name: 'Wind', value: 25 },
  { name: 'Hydro', value: 15 },
  { name: 'Natural Gas', value: 20 },
  { name: 'Coal', value: 10 },
]

const communityImpactData = [
  { name: 'You', trees: 5, waste: 20, energy: 15 },
  { name: 'Avg Neighbor', trees: 3, waste: 30, energy: 25 },
  { name: 'City Goal', trees: 10, waste: 15, energy: 10 },
]

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8']

export default function CitizenSustainability() {
  const [carbonReduction, setCarbonReduction] = useState(0)

  const handleTakeAction = () => {
    setCarbonReduction(prev => Math.min(prev + 5, 100))
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold mb-6">Sustainability Metrics</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FaLeaf className="mr-2" />
              Carbon Footprint Tracker
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={carbonFootprintData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {carbonFootprintData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Carbon Reduction Progress</h3>
              <Progress value={carbonReduction} className="h-2 mb-2" />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>0%</span>
                <span>{carbonReduction}%</span>
                <span>100%</span>
              </div>
              <Button onClick={handleTakeAction} className="mt-4 w-full">
                Take Action to Reduce Carbon Footprint
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FaSeedling className="mr-2" />
              Green Energy Usage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={energySourcesData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {energySourcesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Renewable Energy Usage</h3>
              <Progress value={70} className="h-2 mb-2" />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>0%</span>
                <span>70%</span>
                <span>100%</span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                You're using 70% renewable energy. Great job! Increase your usage to 80% to earn a Green Energy badge.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FaRecycle className="mr-2" />
              Community Engagement
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={communityImpactData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="trees" fill="#82ca9d" name="Trees Planted" />
                <Bar dataKey="waste" fill="#8884d8" name="Waste Reduced (kg)" />
                <Bar dataKey="energy" fill="#ffc658" name="Energy Saved (kWh)" />
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Your Impact</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <FaLeaf className="mr-2 text-green-500" />
                  <span>5 trees planted</span>
                </li>
                <li className="flex items-center">
                  <FaRecycle className="mr-2 text-blue-500" />
                  <span>20 kg waste reduced</span>
                </li>
                <li className="flex items-center">
                  <FaSeedling className="mr-2 text-yellow-500" />
                  <span>15 kWh energy saved</span>
                </li>
              </ul>
              <Button className="mt-4 w-full">Join Community Challenge</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>AI-Powered Sustainability Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-lg font-semibold mb-2">Personalized Recommendations</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <FaLeaf className="mr-2 text-green-500" />
                  <span>Switch to LED bulbs to reduce your energy consumption by up to 75%</span>
                </li>
                <li className="flex items-center">
                  <FaRecycle className="mr-2 text-blue-500" />
                  <span>Start composting food scraps to reduce your waste by up to 30%</span>
                </li>
                <li className="flex items-center">
                  <FaSeedling className="mr-2 text-yellow-500" />
                  <span>Install a smart thermostat to optimize your home's energy usage</span>
                </li>
              </ul>
              <p className="mt-4 text-sm text-muted-foreground">
                These tips are tailored based on your current usage patterns and community trends.
                Implementing them could significantly reduce your carbon footprint and increase your sustainability score.
              </p>
            </motion.div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
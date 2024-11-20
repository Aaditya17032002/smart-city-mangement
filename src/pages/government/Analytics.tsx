'use client'
import React from 'react';
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card.tsx'
import { Button } from '../../components/ui/button.tsx'
import { Slider } from '../../components/ui/slider.tsx'
import { Input } from '../../components/ui/input.tsx'
import { LineChart, Line, AreaChart, Area, ScatterChart, Scatter, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts'
import { FaBolt, FaWater, FaTrash } from 'react-icons/fa'

const initialForecastData = {
  electricity: [
    { month: 'Jan', forecast: 2000, actual: 2100 },
    { month: 'Feb', forecast: 2100, actual: 2050 },
    { month: 'Mar', forecast: 2200, actual: 2300 },
    { month: 'Apr', forecast: 2300, actual: 2250 },
    { month: 'May', forecast: 2400, actual: null },
    { month: 'Jun', forecast: 2500, actual: null },
  ],
  water: [
    { month: 'Jan', forecast: 1500, actual: 1550 },
    { month: 'Feb', forecast: 1600, actual: 1580 },
    { month: 'Mar', forecast: 1700, actual: 1750 },
    { month: 'Apr', forecast: 1800, actual: 1820 },
    { month: 'May', forecast: 1900, actual: null },
    { month: 'Jun', forecast: 2000, actual: null },
  ],
  waste: [
    { month: 'Jan', forecast: 800, actual: 820 },
    { month: 'Feb', forecast: 850, actual: 840 },
    { month: 'Mar', forecast: 900, actual: 920 },
    { month: 'Apr', forecast: 950, actual: 940 },
    { month: 'May', forecast: 1000, actual: null },
    { month: 'Jun', forecast: 1050, actual: null },
  ],
}

const initialHeatmapData = [
  { x: 10, y: 20, value: 100 },
  { x: 30, y: 40, value: 200 },
  { x: 50, y: 60, value: 300 },
  { x: 70, y: 80, value: 400 },
  { x: 90, y: 100, value: 500 },
]

export default function GovernmentAnalytics() {
  const [forecastData, setForecastData] = useState(initialForecastData)
  const [selectedResource, setSelectedResource] = useState('electricity')
  const [populationGrowth, setPopulationGrowth] = useState(1.5)
  const [industrialExpansion, setIndustrialExpansion] = useState(2)
  const [heatmapData, setHeatmapData] = useState(initialHeatmapData)

  useEffect(() => {
    // Simulating API call for updated forecast based on simulation parameters
    const updateForecast = () => {
      const growthFactor = 1 + (populationGrowth / 100)
      const expansionFactor = 1 + (industrialExpansion / 100)
      const updatedForecast = {...forecastData}
      Object.keys(updatedForecast).forEach(resource => {
        updatedForecast[resource] = updatedForecast[resource].map(item => ({
          ...item,
          forecast: Math.round(item.forecast * growthFactor * expansionFactor)
        }))
      })
      setForecastData(updatedForecast)
    }
    updateForecast()
  }, [populationGrowth, industrialExpansion])

  const handleSimulate = () => {
    // Simulating API call for updated heatmap data
    const newHeatmapData = initialHeatmapData.map(item => ({
      ...item,
      value: Math.round(item.value * (1 + (populationGrowth / 100)) * (1 + (industrialExpansion / 100)))
    }))
    setHeatmapData(newHeatmapData)
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold mb-6">Predictive Analytics</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>AI Forecasting Dashboard</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex space-x-4">
                <Button
                  onClick={() => setSelectedResource('electricity')}
                  variant={selectedResource === 'electricity' ? 'default' : 'outline'}
                >
                  <FaBolt className="mr-2" /> Electricity
                </Button>
                <Button
                  onClick={() => setSelectedResource('water')}
                  variant={selectedResource === 'water' ? 'default' : 'outline'}
                >
                  <FaWater className="mr-2" /> Water
                </Button>
                <Button
                  onClick={() => setSelectedResource('waste')}
                  variant={selectedResource === 'waste' ? 'default' : 'outline'}
                >
                  <FaTrash className="mr-2" /> Waste
                </Button>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={forecastData[selectedResource]}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="forecast" stroke="#8884d8" activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="actual" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>What-If Simulations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Population Growth (%)</label>
                <Slider
                  value={[populationGrowth]}
                  onValueChange={(value) => setPopulationGrowth(value[0])}
                  max={5}
                  step={0.1}
                />
                <span className="text-sm text-gray-500">{populationGrowth.toFixed(1)}%</span>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Industrial Expansion (%)</label>
                <Slider
                  value={[industrialExpansion]}
                  onValueChange={(value) => setIndustrialExpansion(value[0])}
                  max={10}
                  step={0.1}
                />
                <span className="text-sm text-gray-500">{industrialExpansion.toFixed(1)}%</span>
              </div>
              <Button onClick={handleSimulate}>Run Simulation</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>City-Wide Resource Demand Heatmap</CardTitle>
          </CardHeader>
          <CardContent>
          <ResponsiveContainer width="100%" height={400}>
  <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
    <CartesianGrid />
    <XAxis type="number" dataKey="x" name="longitude" unit="°" />
    <YAxis type="number" dataKey="y" name="latitude" unit="°" />
    <Tooltip cursor={{ strokeDasharray: '3 3' }} />
    <Scatter name="Resource Demand" data={heatmapData} fill="#8884d8">
      {heatmapData.map((entry, index) => (
        <Scatter 
          key={`scatter-${index}`} 
          fill={`rgb(${Math.min(255, entry.value / 2)}, 0, ${Math.min(255, 255 - entry.value / 2)})`}
          data={[entry]}
        />
      ))}
    </Scatter>
  </ScatterChart>
</ResponsiveContainer>

            <div className="mt-4 text-sm text-gray-500">
              This heatmap shows predicted resource demand across the city. Darker areas indicate higher demand.
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>AI-Driven Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ul className="space-y-2">
                <li className="flex items-center">
                  <FaBolt className="mr-2 text-yellow-500" />
                  <span>Electricity demand is projected to increase by 15% in the next quarter due to industrial expansion.</span>
                </li>
                <li className="flex items-center">
                  <FaWater className="mr-2 text-blue-500" />
                  <span>Water usage efficiency can be improved by 10% through implementation of smart metering in residential areas.</span>
                </li>
                <li className="flex items-center">
                  <FaTrash className="mr-2 text-green-500" />
                  <span>Waste management costs could be reduced by 20% with the adoption of AI-powered sorting systems.</span>
                </li>
              </ul>
            </motion.div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Resource Optimization Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ul className="space-y-2">
                <li className="flex items-center justify-between">
                  <span>Implement smart grid technology in District A</span>
                  <Button size="sm">Details</Button>
                </li>
                <li className="flex items-center justify-between">
                  <span>Upgrade water treatment plant in District C</span>
                  <Button size="sm">Details</Button>
                </li>
                <li className="flex items-center justify-between">
                  <span>Introduce recycling incentives program citywide</span>
                  <Button size="sm">Details</Button>
                </li>
              </ul>
            </motion.div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
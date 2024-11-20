'use client'
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card.tsx'
import { Button } from '../../components/ui/button.tsx'
import { Progress } from '../../components/ui/progress.tsx'
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts'
import { FaLeaf, FaSeedling, FaRecycle, FaSolarPanel, FaWind } from 'react-icons/fa'

// Type for sustainability goal
type SustainabilityGoal = {
  name: string;
  progress: number;
};

const sustainabilityGoals: SustainabilityGoal[] = [
  { name: 'Reduce Carbon Emissions', progress: 65 },
  { name: 'Increase Renewable Energy', progress: 48 },
  { name: 'Improve Waste Recycling', progress: 72 },
  { name: 'Enhance Water Conservation', progress: 55 },
];

const energyData = [
  { year: 2019, renewable: 20, nonRenewable: 80 },
  { year: 2020, renewable: 25, nonRenewable: 75 },
  { year: 2021, renewable: 32, nonRenewable: 68 },
  { year: 2022, renewable: 40, nonRenewable: 60 },
  { year: 2023, renewable: 48, nonRenewable: 52 },
];

const carbonFootprintData = [
  { year: 2019, footprint: 100 },
  { year: 2020, footprint: 95 },
  { year: 2021, footprint: 88 },
  { year: 2022, footprint: 80 },
  { year: 2023, footprint: 72 },
];

const citizenContributionsData = [
  { name: 'Energy Saving', value: 35 },
  { name: 'Water Conservation', value: 25 },
  { name: 'Waste Reduction', value: 20 },
  { name: 'Green Transportation', value: 20 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function GovernmentSustainability() {
  // Set the selected goal type to either SustainabilityGoal or null
  const [selectedGoal, setSelectedGoal] = useState<SustainabilityGoal | null>(null);

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold mb-6">Sustainability Metrics</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FaLeaf className="mr-2" />
              Progress Toward Sustainability Goals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sustainabilityGoals.map((goal, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-1">
                    <span>{goal.name}</span>
                    <span>{goal.progress}%</span>
                  </div>
                  <Progress value={goal.progress} className="h-2" />
                </div>
              ))}
            </div>
            <Button className="mt-4" onClick={() => setSelectedGoal(sustainabilityGoals[0])}>View Details</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FaSolarPanel className="mr-2" />
              Renewable vs. Non-Renewable Energy
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={energyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="renewable" stackId="a" fill="#82ca9d" name="Renewable" />
                <Bar dataKey="nonRenewable" stackId="a" fill="#8884d8" name="Non-Renewable" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FaSeedling className="mr-2" />
              Carbon Footprint Reduction
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={carbonFootprintData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="footprint" stroke="#8884d8" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FaRecycle className="mr-2" />
              Citizen Contributions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={citizenContributionsData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {citizenContributionsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sustainability Initiatives</CardTitle>
          </CardHeader>
          <CardContent>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ul className="space-y-2">
                <li className="flex items-center justify-between">
                  <span className="flex items-center">
                    <FaSolarPanel className="mr-2" />
                    Solar Panel Installation Program
                  </span>
                  <Button size="sm">Details</Button>
                </li>
                <li className="flex items-center justify-between">
                  <span className="flex items-center">
                    <FaWind className="mr-2" />
                    Wind Farm Development
                  </span>
                  <Button size="sm">Details</Button>
                </li>
                <li className="flex items-center justify-between">
                  <span className="flex items-center">
                    <FaRecycle className="mr-2" />
                    City-wide Recycling Program
                  </span>
                  <Button size="sm">Details</Button>
                </li>
              </ul>
            </motion.div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>AI-Powered Sustainability Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ul className="space-y-2">
                <li className="flex items-center">
                  <FaLeaf className="mr-2 text-green-500" />
                  <span>Implement a smart grid system to optimize energy distribution and reduce waste.</span>
                </li>
                <li className="flex items-center">
                  <FaSeedling className="mr-2 text-green-500" />
                  <span>Introduce a city-wide tree planting initiative to increase carbon sequestration.</span>
                </li>
                <li className="flex items-center">
                  <FaRecycle className="mr-2 text-green-500" />
                  <span>Develop an AI-powered waste sorting system to improve recycling efficiency.</span>
                </li>
              </ul>
            </motion.div>
          </CardContent>
        </Card>
      </div>

      {selectedGoal && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
          onClick={() => setSelectedGoal(null)}
        >
          <Card className="w-full max-w-md" onClick={(e) => e.stopPropagation()}>
            <CardHeader>
              <CardTitle>{selectedGoal.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Current Progress: {selectedGoal.progress}%</p>
              <Progress value={selectedGoal.progress} className="h-2 mt-2" />
              <p className="mt-4">Detailed information about the goal and strategies to achieve it would be displayed here.</p>
              <Button className="mt-4" onClick={() => setSelectedGoal(null)}>Close</Button>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  )
}

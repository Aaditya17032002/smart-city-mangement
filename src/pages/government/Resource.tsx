'use client'
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card.tsx';
import { Button } from '../../components/ui/button.tsx';
import { Progress } from '../../components/ui/progress.tsx';
import { Slider } from '../../components/ui/slider.tsx';
import { LineChart, Line, AreaChart, Area, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import { FaBolt, FaWater, FaTrash } from 'react-icons/fa';

type ForecastData = {
  day: string;
  forecast: number;
  actual: number | null;
};

const resourceData = {
  electricity: {
    hourly: [
      { time: '00:00', usage: 2000, generation: 1800 },
      { time: '04:00', usage: 1800, generation: 1600 },
      { time: '08:00', usage: 2200, generation: 2000 },
      { time: '12:00', usage: 2600, generation: 2400 },
      { time: '16:00', usage: 2400, generation: 2200 },
      { time: '20:00', usage: 2200, generation: 2000 },
    ],
    distribution: [
      { name: 'Residential', value: 40 },
      { name: 'Commercial', value: 30 },
      { name: 'Industrial', value: 20 },
      { name: 'Public', value: 10 },
    ],
  },
  water: {
    hourly: [
      { time: '00:00', usage: 1500, supply: 1600 },
      { time: '04:00', usage: 1200, supply: 1400 },
      { time: '08:00', usage: 1800, supply: 1900 },
      { time: '12:00', usage: 2000, supply: 2100 },
      { time: '16:00', usage: 1900, supply: 2000 },
      { time: '20:00', usage: 1700, supply: 1800 },
    ],
    distribution: [
      { name: 'Residential', value: 45 },
      { name: 'Commercial', value: 25 },
      { name: 'Industrial', value: 20 },
      { name: 'Public', value: 10 },
    ],
  },
  waste: {
    hourly: [
      { time: '00:00', collection: 100, processing: 90 },
      { time: '04:00', collection: 80, processing: 70 },
      { time: '08:00', collection: 120, processing: 110 },
      { time: '12:00', collection: 150, processing: 140 },
      { time: '16:00', collection: 140, processing: 130 },
      { time: '20:00', collection: 130, processing: 120 },
    ],
    distribution: [
      { name: 'Residential', value: 50 },
      { name: 'Commercial', value: 30 },
      { name: 'Industrial', value: 15 },
      { name: 'Public', value: 5 },
    ],
  },
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function GovernmentResource() {
  const { resource } = useParams<{ resource: 'electricity' | 'water' | 'waste' }>();
  const [efficiency, setEfficiency] = useState(75);
  const [forecastDays, setForecastDays] = useState(7);
  const [forecastData, setForecastData] = useState<ForecastData[]>([]);

  useEffect(() => {
    // Simulating API call for forecast data
    const generateForecastData = () => {
      const data: ForecastData[] = [];
      for (let i = 0; i < forecastDays; i++) {
        data.push({
          day: `Day ${i + 1}`,
          forecast: Math.floor(Math.random() * 1000) + 1000,
          actual: i < 3 ? Math.floor(Math.random() * 1000) + 1000 : null,
        });
      }
      setForecastData(data);
    };
    generateForecastData();
  }, [forecastDays]);

  // Check if resource is valid
  if (!resource || !(resource in resourceData)) {
    return <div>Invalid resource</div>;
  }

  const resourceIcon = {
    electricity: <FaBolt />,
    water: <FaWater />,
    waste: <FaTrash />,
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        {resourceIcon[resource]} <span className="ml-2">{resource.charAt(0).toUpperCase() + resource.slice(1)} Management</span>
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Hourly {resource.charAt(0).toUpperCase() + resource.slice(1)} Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={resourceData[resource].hourly}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="usage" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey={resource === 'waste' ? 'collection' : 'generation'} stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{resource.charAt(0).toUpperCase() + resource.slice(1)} Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={resourceData[resource].distribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {resourceData[resource].distribution.map((entry, index) => (
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
            <CardTitle>AI-Powered Predictive Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={forecastData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="forecast" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
                <Area type="monotone" dataKey="actual" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.3} />
              </AreaChart>
            </ResponsiveContainer>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">Forecast Days</label>
              <Slider
                value={[forecastDays]}
                onValueChange={(value) => setForecastDays(value[0])}
                max={30}
                step={1}
                className="mt-2"
              />
              <span className="text-sm text-gray-500">{forecastDays} days</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Efficiency Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span>Overall Efficiency</span>
                  <span>{efficiency}%</span>
                </div>
                <Progress value={efficiency} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span>Distribution Efficiency</span>
                  <span>82%</span>
                </div>
                <Progress value={82} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span>Maintenance Efficiency</span>
                  <span>68%</span>
                </div>
                <Progress value={68} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Interactive Action Panel</CardTitle>
          </CardHeader>
          <CardContent>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-lg font-semibold mb-4">AI-Powered Suggestions</h3>
              <ul className="space-y-2">
                <li className="flex items-center justify-between">
                  <span>Optimize peak hour usage in District A</span>
                  <Button size="sm">Implement</Button>
                </li>
                <li className="flex items-center justify-between">
                  <span>Upgrade infrastructure in District C</span>
                  <Button size="sm">Review</Button>
                </li>
                <li className="flex items-center justify-between">
                  <span>Implement smart metering citywide</span>
                  <Button size="sm">Analyze</Button>
                </li>
              </ul>
            </motion.div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

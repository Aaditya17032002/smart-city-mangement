'use client'

import React from 'react';
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card.tsx'
import { Button } from '../../components/ui/button.tsx'
import { Input } from '../../components/ui/input.tsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select.tsx'
import { Slider } from '../../components/ui/slider.tsx'
import { Switch } from '../../components/ui/switch.tsx'
import { Alert, AlertDescription, AlertTitle } from '../../components/ui/alert.tsx'
import { Timeline, TimelineItem, TimelineItemContent, TimelineItemIndicator } from '../../components/ui/timeline.tsx'
import { FaBolt, FaWater, FaTrash, FaExclamationTriangle } from 'react-icons/fa'

const initialAlerts = [
  { id: 1, type: 'electricity', message: 'Power outage detected in District A', severity: 'high', status: 'active' },
  { id: 2, type: 'water', message: 'Low water pressure reported in District B', severity: 'medium', status: 'active' },
  { id: 3, type: 'waste', message: 'Waste collection delay in District C', severity: 'low', status: 'resolved' },
]

const historicalAlerts = [
  { id: 1, type: 'electricity', message: 'City-wide power surge', timestamp: '2023-06-15 14:30', status: 'resolved' },
  { id: 2, type: 'water', message: 'Water main break in District D', timestamp: '2023-06-14 09:15', status: 'resolved' },
  { id: 3, type: 'waste', message: 'Hazardous waste spill on Highway 101', timestamp: '2023-06-13 11:45', status: 'resolved' },
]

export default function GovernmentAlerts() {
  const [alerts, setAlerts] = useState(initialAlerts)
  const [newAlert, setNewAlert] = useState({ type: '', message: '', severity: 'medium', threshold: 50 })
  const [wizardStep, setWizardStep] = useState(0)

  const handleResolveAlert = (id: number) => {
    setAlerts(alerts.map(alert => 
      alert.id === id ? { ...alert, status: 'resolved' } : alert
    ))
  }

  const handleCreateAlert = () => {
    if (wizardStep < 3) {
      setWizardStep(wizardStep + 1)
    } else {
      setAlerts([...alerts, { id: alerts.length + 1, ...newAlert, status: 'active' }])
      setNewAlert({ type: '', message: '', severity: 'medium', threshold: 50 })
      setWizardStep(0)
    }
  }

  const renderAlertIcon = (type: string) => {
    switch (type) {
      case 'electricity':
        return <FaBolt className="mr-2" />
      case 'water':
        return <FaWater className="mr-2" />
      case 'waste':
        return <FaTrash className="mr-2" />
      default:
        return <FaExclamationTriangle className="mr-2" />
    }
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold mb-6">Alerts and Notifications</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Automated Alert System</CardTitle>
          </CardHeader>
          <CardContent>
            {alerts.map(alert => (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mb-4"
              >
                <Alert
  variant={
    alert.severity === 'high' ? 'destructive' :
    alert.severity === 'medium' ? 'default' :
    'default' // Fallback for low severity
  }
>
                  <AlertTitle className="flex items-center">
                    {renderAlertIcon(alert.type)}
                    {alert.type.charAt(0).toUpperCase() + alert.type.slice(1)} Alert
                  </AlertTitle>
                  <AlertDescription>{alert.message}</AlertDescription>
                  {alert.status === 'active' && (
                    <Button size="sm" onClick={() => handleResolveAlert(alert.id)} className="mt-2">
                      Resolve
                    </Button>
                  )}
                </Alert>
              </motion.div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Historical Alerts Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <Timeline>
              {historicalAlerts.map((alert, index) => (
                <TimelineItem key={alert.id}>
                  <TimelineItemIndicator />
                  <TimelineItemContent>
                    <h3 className="font-semibold flex items-center">
                      {renderAlertIcon(alert.type)}
                      {alert.type.charAt(0).toUpperCase() + alert.type.slice(1)} Alert
                    </h3>
                    <p>{alert.message}</p>
                    <p className="text-sm text-gray-500">{alert.timestamp}</p>
                  </TimelineItemContent>
                </TimelineItem>
              ))}
            </Timeline>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Custom Alert Creation Wizard</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {wizardStep === 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Select Alert Type</label>
                  <Select onValueChange={(value) => setNewAlert({ ...newAlert, type: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select alert type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="electricity">Electricity</SelectItem>
                      <SelectItem value="water">Water</SelectItem>
                      <SelectItem value="waste">Waste</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
              {wizardStep === 1 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Alert Message</label>
                  <Input
                    placeholder="Enter alert message"
                    value={newAlert.message}
                    onChange={(e) => setNewAlert({ ...newAlert, message: e.target.value })}
                  />
                </div>
              )}
              {wizardStep === 2 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Alert Severity</label>
                  <Select onValueChange={(value) => setNewAlert({ ...newAlert, severity: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select alert severity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
              {wizardStep === 3 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Alert Threshold</label>
                  <Slider
                    value={[newAlert.threshold]}
                    onValueChange={(value) => setNewAlert({ ...newAlert, threshold: value[0] })}
                    max={100}
                    step={1}
                  />
                  <span className="text-sm text-gray-500">{newAlert.threshold}%</span>
                </div>
              )}
              <Button onClick={handleCreateAlert}>
                {wizardStep < 3 ? 'Next' : 'Create Alert'}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>AI-Powered Alert Analysis</CardTitle>
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
                  <span>Predicted 15% increase in power outages next month due to aging infrastructure.</span>
                </li>
                <li className="flex items-center">
                  <FaWater className="mr-2 text-blue-500" />
                  <span>Water quality alerts in District B show a pattern related to industrial activities.</span>
                </li>
                <li className="flex items-center">
                  <FaTrash className="mr-2 text-green-500" />
                  <span>Waste collection delays correlate with traffic patterns. Suggested route optimization available.</span>
                </li>
              </ul>
            </motion.div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Alert Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Enable AI-powered alert suggestions</span>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <span>Automatic alert resolution for low severity issues</span>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <span>Alert notifications to mobile devices</span>
                <Switch />
              </div>
              <Button className="w-full">Configure Alert Routing</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
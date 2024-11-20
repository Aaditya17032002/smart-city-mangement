import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card.tsx';
import { Button } from '../../components/ui/button.tsx';
import { Switch } from '../../components/ui/switch.tsx';
import { Slider } from '../../components/ui/slider.tsx';
import { Alert, AlertDescription, AlertTitle } from '../../components/ui/alert.tsx';
import { FaBolt, FaWater, FaTrash, FaBell, FaEnvelope, FaSms } from 'react-icons/fa';

const initialAlerts = [
  { id: 1, type: 'electricity', message: 'Your electricity usage is 30% higher than usual.', severity: 'high' },
  { id: 2, type: 'water', message: "You've achieved your water saving goal this month!", severity: 'low' },
  { id: 3, type: 'waste', message: 'Reminder: Tomorrow is recycling day.', severity: 'medium' },
];

export default function CitizenAlerts() {
  const [alerts, setAlerts] = useState(initialAlerts);
  const [notificationSettings, setNotificationSettings] = useState({
    email: true,
    sms: false,
    app: true,
  });
  const [thresholds, setThresholds] = useState({
    electricity: 20,
    water: 15,
    waste: 25,
  });

  const handleDismissAlert = (id: number) => {
    setAlerts(alerts.filter((alert) => alert.id !== id));
  };

  const handleNotificationToggle = (type: 'email' | 'sms' | 'app') => {
    setNotificationSettings((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  const handleThresholdChange = (resource: 'electricity' | 'water' | 'waste', value: number) => {
    setThresholds((prev) => ({ ...prev, [resource]: value }));
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold mb-6">Alerts and Notifications</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Active Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            {alerts.map((alert) => (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mb-4"
              >
                <Alert
                  variant={alert.severity === 'high' ? 'destructive' : 'default'}
                >
                  <AlertTitle className="flex items-center">
                    {alert.type === 'electricity' && <FaBolt className="mr-2" />}
                    {alert.type === 'water' && <FaWater className="mr-2" />}
                    {alert.type === 'waste' && <FaTrash className="mr-2" />}
                    {alert.type.charAt(0).toUpperCase() + alert.type.slice(1)} Alert
                  </AlertTitle>
                  <AlertDescription>{alert.message}</AlertDescription>
                  <Button size="sm" onClick={() => handleDismissAlert(alert.id)} className="mt-2">
                    Dismiss
                  </Button>
                </Alert>
              </motion.div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notification Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <FaEnvelope />
                  <span>Email Notifications</span>
                </div>
                <Switch
                  checked={notificationSettings.email}
                  onCheckedChange={() => handleNotificationToggle('email')}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <FaSms />
                  <span>SMS Notifications</span>
                </div>
                <Switch
                  checked={notificationSettings.sms}
                  onCheckedChange={() => handleNotificationToggle('sms')}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <FaBell />
                  <span>App Notifications</span>
                </div>
                <Switch
                  checked={notificationSettings.app}
                  onCheckedChange={() => handleNotificationToggle('app')}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Alert Thresholds</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Electricity Usage Threshold (%)</label>
                <Slider
                  value={[thresholds.electricity]}
                  onValueChange={(value) => handleThresholdChange('electricity', value[0])}
                  max={100}
                  step={1}
                />
                <span className="text-sm text-muted-foreground">{thresholds.electricity}% above average</span>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Water Usage Threshold (%)</label>
                <Slider
                  value={[thresholds.water]}
                  onValueChange={(value) => handleThresholdChange('water', value[0])}
                  max={100}
                  step={1}
                />
                <span className="text-sm text-muted-foreground">{thresholds.water}% above average</span>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Waste Generation Threshold (%)</label>
                <Slider
                  value={[thresholds.waste]}
                  onValueChange={(value) => handleThresholdChange('waste', value[0])}
                  max={100}
                  step={1}
                />
                <span className="text-sm text-muted-foreground">{thresholds.waste}% above average</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>AI-Powered Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <Alert>
              <AlertTitle>Energy Usage Pattern Detected</AlertTitle>
              <AlertDescription>
                Our AI has detected a pattern of high energy usage during peak hours (2 PM - 6 PM).
                Consider shifting some of your high-energy activities to off-peak hours to save on electricity costs.
              </AlertDescription>
            </Alert>
            <Alert className="mt-4">
              <AlertTitle>Water Conservation Opportunity</AlertTitle>
              <AlertDescription>
                Based on your usage patterns, installing a smart irrigation system could reduce your water consumption by up to 15%.
                Would you like more information on smart irrigation systems?
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

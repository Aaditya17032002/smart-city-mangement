'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card.tsx'
import { Button } from '../components/ui/button.tsx'
import { Input } from '../components/ui/input.tsx'
import { Switch } from '../components/ui/switch.tsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs.tsx'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog.tsx'
import { LineChart, Line, BarChart, Bar, AreaChart, Area, ScatterChart, Scatter, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts'
import { FaCamera, FaExclamationTriangle, FaUserSecret, FaMapMarkerAlt, FaCog } from 'react-icons/fa'
import { GoogleMap, LoadScript, Marker, InfoWindow,useJsApiLoader } from '@react-google-maps/api';

// Simulated camera feeds using YouTube live streams and local camera
const cameraFeeds = [
  { id: 1, location: 'Times Square', status: 'Active', feed: 'https://locationimg.blob.core.windows.net/locationimg/time-square-live1.mp4' },
  { id: 2, location: 'Downtown NewYork', status: 'Active', feed: 'https://locationimg.blob.core.windows.net/locationimg/Downtown-ny.mp4' },
  { id: 3, location: 'Public Square', status: 'Active', feed: 'https://locationimg.blob.core.windows.net/locationimg/Public-square.mp4' },
  { id: 4, location: 'Public Square 2', status: 'Active', feed: 'https://locationimg.blob.core.windows.net/locationimg/Public-square-ny.mp4' },
];



// Google Maps container style
const containerStyle = {
    width: '100%',
    height: '100%',
  };
  
  // New York City coordinates as the center of the map
const center = {
    lat: 40.7128,
    lng: -74.0060,
  };

  const incidentAlerts = [
    { id: 1, type: 'Traffic Accident', location: { lat: 40.7580, lng: -73.9855 }, time: '10:30 AM' },
    { id: 2, type: 'Suspicious Activity', location: { lat: 40.785091, lng: -73.968285 }, time: '11:45 AM' },
    { id: 3, type: 'Crowd Congestion', location: { lat: 40.712776, lng: -74.005974 }, time: '12:15 PM' },
  ];

 
const crowdData = [
  { time: '00:00', density: 20 },
  { time: '04:00', density: 10 },
  { time: '08:00', density: 40 },
  { time: '12:00', density: 100 },
  { time: '16:00', density: 80 },
  { time: '20:00', density: 50 },
]

const incidentTrends = [
  { month: 'Jan', thefts: 20, accidents: 15 },
  { month: 'Feb', thefts: 25, accidents: 20 },
  { month: 'Mar', thefts: 18, accidents: 22 },
  { month: 'Apr', thefts: 22, accidents: 18 },
  { month: 'May', thefts: 30, accidents: 25 },
  { month: 'Jun', thefts: 28, accidents: 20 },
]

interface CameraFeed {
  id: number
  location: string
  status: string
  feed: string | null
}

interface IncidentAlert {
    id: number;
    type: string;
    location: {
      lat: number;
      lng: number;
    };
    time: string;
  }
interface DetectedFace {
  id: number
  tag: string
  status: string
}

export default function SmartSurveillance() {
    const [selectedCamera, setSelectedCamera] = useState<CameraFeed | null>(null);
    const [showIncidentDetails, setShowIncidentDetails] = useState(false);
    const [selectedIncident, setSelectedIncident] = useState<IncidentAlert | null>(null);
    const [zoomLevel, setZoomLevel] = useState(1);
    const [panX, setPanX] = useState(0);
    const [panY, setPanY] = useState(0);
    const [detectedFaces, setDetectedFaces] = useState<DetectedFace[]>([
      { id: 1, tag: 'Person A', status: 'Known' },
      { id: 2, tag: 'Person B', status: 'Unknown' },
      { id: 3, tag: 'Person C', status: 'Known' },
    ]);
    const [selectedPerson, setSelectedPerson] = useState<DetectedFace | null>(null);
    const [timeFilter, setTimeFilter] = useState('1M');
    const [showReportForm, setShowReportForm] = useState(false);
    const [privacySettings, setPrivacySettings] = useState({
      blurFaces: false,
      disablePublicAccess: false,
    });
    const [localStream, setLocalStream] = useState<MediaStream | null>(null);
    const videoRef = useRef<HTMLVideoElement | null>(null);
  
    // Load Google Maps API
    const { isLoaded, loadError } = useJsApiLoader({
      googleMapsApiKey: 'AIzaSyCzJKyY9-OnmLmbK3fGPjStGv-zduK2wqs', // Replace with your API key
      libraries: ['places'],
    });
  
    useEffect(() => {
      // Simulate real-time updates for detected faces
      const interval = setInterval(() => {
        setDetectedFaces((prevFaces) => {
          const newFaces = [...prevFaces];
          newFaces[Math.floor(Math.random() * newFaces.length)].status =
            Math.random() > 0.5 ? 'Known' : 'Unknown';
          return newFaces;
        });
      }, 5000);
  
      return () => clearInterval(interval);
    }, []);
  
    useEffect(() => {
      if (selectedCamera && selectedCamera.feed && videoRef.current) {
        // If the selected camera feed is local, set the video source to the local file
        if (selectedCamera.feed === 'local') {
          // Play the local video assigned to the camera
          videoRef.current.src = selectedCamera.feed;
        } else {
          // If it's a different feed (e.g., a video URL), set it directly
          videoRef.current.src = selectedCamera.feed;
        }
    
        // Autoplay the video if available
        videoRef.current.play().catch((err) => console.error('Error playing the video:', err));
      }
    
      return () => {
        // Stop the video and reset the source when the component unmounts or when selectedCamera changes
        if (videoRef.current) {
          videoRef.current.pause();
          videoRef.current.src = '';
        }
      };
    }, [selectedCamera]);
    
  
    const handleCameraSelect = (camera: CameraFeed) => {
      setSelectedCamera(camera);
      setZoomLevel(1);
      setPanX(0);
      setPanY(0);
    };
  
    const handleIncidentClick = (incident: IncidentAlert) => {
      setSelectedIncident(incident);
      setShowIncidentDetails(true);
    };
  
    const handleZoom = (direction) => {
      setZoomLevel((prevZoom) => {
        const newZoom = prevZoom + direction * 0.1;
        return Math.min(Math.max(newZoom, 1), 3); // Limit zoom between 1x and 3x
      });
    };
  
    const handlePan = (direction, axis) => {
      if (axis === 'x') {
        setPanX((prevPan) => prevPan + direction * 20);
      } else {
        setPanY((prevPan) => prevPan + direction * 20);
      }
    };
  
    const handlePersonClick = (person: DetectedFace) => {
      setSelectedPerson(person);
    };
  
    const handleReportSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      alert('Report submitted successfully!');
      setShowReportForm(false);
    };
  
    if (loadError) {
      return <div>Error loading maps</div>;
    }
  
    if (!isLoaded) {
      return <div>Loading Maps...</div>;
    }
  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold mb-6">Smart Surveillance</h1>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="response">Incident Response</TabsTrigger>
          <TabsTrigger value="citizen">Citizen Access</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-3 gap-4">
          <Card className="col-span-2">
  <CardHeader>
    <CardTitle>Live Camera Feeds</CardTitle>
  </CardHeader>
  <CardContent>
    <div className="grid grid-cols-2 gap-4">
      {cameraFeeds.map((camera) => (
        <div
          key={camera.id}
          className="relative aspect-video bg-gray-200 rounded-lg overflow-hidden cursor-pointer"
          style={{
            position: 'relative',
            paddingBottom: '56.25%', // Maintain 16:9 aspect ratio
            backgroundColor: '#f0f0f0',
            borderRadius: '8px',
            overflow: 'hidden',
            cursor: 'pointer',
          }}
          onClick={() => handleCameraSelect(camera)}
        >
          {camera.feed ? (
            <video
              src={camera.feed} // Use the specific local feed path
              controls
              autoPlay
              muted
              loop
              playsInline
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '8px',
              }}
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              Camera Offline
            </div>
          )}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              color: '#ffffff',
              padding: '8px',
            }}
          >
            <p>{camera.location}</p>
            <p
              style={{
                fontSize: '0.875rem',
                color: camera.status === 'Active' ? '#34d399' : '#f87171',
              }}
            >
              {camera.status}
            </p>
          </div>
        </div>
      ))}
    </div>
  </CardContent>
</Card>
</div>

<Card>
  <CardHeader>
    <CardTitle>Incident Alerts</CardTitle>
  </CardHeader>
  <CardContent>
    <ul className="space-y-2">
      {incidentAlerts.map((incident) => (
        <motion.li
          key={incident.id}
          className="flex items-center justify-between p-2 bg-gray-100 rounded-lg cursor-pointer"
          whileHover={{ scale: 1.02 }}
          onClick={() => handleIncidentClick(incident)}
        >
          <div>
            <p className="font-semibold">{incident.type}</p>
            <p className="text-sm text-gray-600">{`${incident.location.lat}, ${incident.location.lng}`}</p>
          </div>
          <FaExclamationTriangle className="text-yellow-500" />
        </motion.li>
      ))}
    </ul>
  </CardContent>
</Card>

<Dialog open={selectedCamera !== null} onOpenChange={() => setSelectedCamera(null)}>
        <DialogContent className="max-w-4xl dialogContent">
          <DialogHeader>
            <DialogTitle>{selectedCamera?.location}</DialogTitle>
          </DialogHeader>
          <div className="aspect-video bg-gray-800 rounded-lg overflow-hidden">
            {selectedCamera?.feed ? (
              <video
                ref={videoRef}
                src={selectedCamera.feed}
                controls
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
                style={{
                  transform: `scale(${zoomLevel}) translate(${panX}px, ${panY}px)`,
                  transition: 'transform 0.3s ease-out',
                  borderRadius: '8px',
                }}
              />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                Camera Offline
              </div>
            )}
          </div>
          <div className="flex justify-between mt-4">
            <div>
              <Button onClick={() => handleZoom(1)}>Zoom In</Button>
              <Button onClick={() => handleZoom(-1)} className="ml-2">Zoom Out</Button>
            </div>
            <div>
              <Button onClick={() => handlePan(-1, 'x')}>Pan Left</Button>
              <Button onClick={() => handlePan(1, 'x')} className="ml-2">Pan Right</Button>
              <Button onClick={() => handlePan(-1, 'y')} className="ml-2">Pan Up</Button>
              <Button onClick={() => handlePan(1, 'y')} className="ml-2">Pan Down</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

          <Dialog open={showIncidentDetails} onOpenChange={setShowIncidentDetails}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{selectedIncident?.type}</DialogTitle>
      </DialogHeader>
      <div className="space-y-2">
        <p><strong>Location:</strong> {selectedIncident ? `${selectedIncident.location.lat}, ${selectedIncident.location.lng}` : 'N/A'}</p>
        <p><strong>Time:</strong> {selectedIncident?.time}</p>
        <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
          Incident Image Placeholder
        </div>
      </div>
    </DialogContent>
  </Dialog>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Crowd Monitoring Heatmap</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={crowdData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="density" stroke="#8884d8" fill="#8884d8" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Facial Recognition</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {detectedFaces.map((person) => (
                    <motion.li
                      key={person.id}
                      className="flex items-center justify-between p-2 bg-gray-100 rounded-lg cursor-pointer"
                      whileHover={{ scale: 1.02 }}
                      onClick={() => handlePersonClick(person)}
                    >
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gray-300 rounded-full mr-2"></div>
                        <div>
                          <p className="font-semibold">{person.tag}</p>
                          <p className={`text-sm ${person.status === 'Known' ? 'text-green-600' :   'text-red-600'}`}>
                            {person.status}
                          </p>
                        </div>
                      </div>
                      <FaUserSecret />
                    </motion.li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Incident Detection Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-end space-x-2 mb-4">
                  <Button
                    variant={timeFilter === '1M' ? 'default' : 'outline'}
                    onClick={() => setTimeFilter('1M')}
                  >
                    1M
                  </Button>
                  <Button
                    variant={timeFilter === '3M' ? 'default' : 'outline'}
                    onClick={() => setTimeFilter('3M')}
                  >
                    3M
                  </Button>
                  <Button
                    variant={timeFilter === '6M' ? 'default' : 'outline'}
                    onClick={() => setTimeFilter('6M')}
                  >
                    6M
                  </Button>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={incidentTrends.slice(0, timeFilter === '1M' ? 1 : timeFilter === '3M' ? 3 : 6)}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="thefts" fill="#8884d8" />
                    <Bar dataKey="accidents" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Dialog open={selectedPerson !== null} onOpenChange={() => setSelectedPerson(null)}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{selectedPerson?.tag}</DialogTitle>
              </DialogHeader>
              <div className="space-y-2">
                <div className="w-full h-40 bg-gray-300 rounded-lg mb-4"></div>
                <p><strong>Status:</strong> {selectedPerson?.status}</p>
                <p><strong>Last Detected:</strong> Main Street, 15 minutes ago</p>
                <p><strong>Activity Log:</strong></p>
                <ul className="list-disc list-inside">
                  <li>Entered Central Park at 10:30 AM</li>
                  <li>Visited City Hall at 11:45 AM</li>
                  <li>Currently at Main Street</li>
                </ul>
              </div>
            </DialogContent>
          </Dialog>
        </TabsContent>

        <TabsContent value="response">
        <Card>
      <CardHeader>
        <CardTitle>Live Incident Response</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative aspect-video rounded-lg overflow-hidden" style={{ height: '500px' }}>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={12}
          >
            {incidentAlerts.map((incident) => (
              <Marker
                key={incident.id}
                position={incident.location}
                onClick={() => handleIncidentClick(incident)}
                icon={{
                  url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
                  scaledSize: new window.google.maps.Size(32, 32),
                }}
              />
            ))}

            {selectedIncident && (
              <InfoWindow
                position={selectedIncident.location}
                onCloseClick={() => setSelectedIncident(null)}
              >
                <div>
                  <h3>{selectedIncident.type}</h3>
                  <p>Time: {selectedIncident.time}</p>
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
        </div>
      </CardContent>
    </Card>

      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Action Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {incidentAlerts.map((incident) => (
              <motion.li
                key={incident.id}
                className="flex items-center justify-between p-2 bg-gray-100 rounded-lg cursor-pointer"
                whileHover={{ scale: 1.02 }}
                onClick={() => handleIncidentClick(incident)}
              >
                <div>
                  <p className="font-semibold">{incident.type}</p>
                  <p className="text-sm text-gray-600">{incident.time} - {`${incident.location.lat}, ${incident.location.lng}`}</p>
                </div>
                <Button size="sm">View Details</Button>
              </motion.li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </TabsContent>


        <TabsContent value="citizen">
        <Card>
    <CardHeader>
      <CardTitle>My Neighborhood Safety</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="text-lg font-semibold mb-2">Safety Statistics</h3>
          <ul className="space-y-2">
            <li>Crime Rate: Low</li>
            <li>Recent Incidents: 2</li>
            <li>Safety Score: 8.5/10</li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Nearby Alerts</h3>
          <ul className="space-y-2">
            {incidentAlerts.slice(0, 2).map((incident) => (
              <li key={incident.id} className="text-sm">
                {incident.type} - {`${incident.location.lat}, ${incident.location.lng}`}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-4">
        <Button onClick={() => setShowReportForm(true)}>Submit Safety Report</Button>
      </div>
    </CardContent>
  </Card>


          <Dialog open={showReportForm} onOpenChange={setShowReportForm}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Submit Safety Report</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleReportSubmit} className="space-y-4">
                <div>
                  <label htmlFor="incidentType" className="block text-sm font-medium text-gray-700">
                    Incident Type
                  </label>
                  <select
                    id="incidentType"
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  >
                    <option>Suspicious Activity</option>
                    <option>Hazard</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                    Location
                  </label>
                  <Input type="text" id="location" placeholder="Enter location" />
                </div>
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    id="description"
                    rows={3}
                    className="mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Describe the incident or hazard"
                  ></textarea>
                </div>
                <div>
                  <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                    Attach Image (Optional)
                  </label>
                  <Input type="file" id="image" accept="image/*" />
                </div>
                <Button type="submit">Submit Report</Button>
              </form>
            </DialogContent>
          </Dialog>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Surveillance Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Camera Management</h3>
                  <ul className="space-y-2">
                    {cameraFeeds.map((camera) => (
                      <li key={camera.id} className="flex items-center justify-between">
                        <span>{camera.location}</span>
                        <Button size="sm">Edit</Button>
                      </li>
                    ))}
                  </ul>
                  <Button className="mt-2">Add New Camera</Button>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">AI Model Update</h3>
                  <Button>Update AI Models</Button>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Privacy Controls</h3>
                  <div className="flex items-center justify-between">
                    <span>Blur Faces in Public Feeds</span>
                    <Switch
                      checked={privacySettings.blurFaces}
                      onCheckedChange={(checked) => setPrivacySettings(prev => ({ ...prev, blurFaces: checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span>Disable Public Access to Feeds</span>
                    <Switch
                      checked={privacySettings.disablePublicAccess}
                      onCheckedChange={(checked) => setPrivacySettings(prev => ({ ...prev, disablePublicAccess: checked }))}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
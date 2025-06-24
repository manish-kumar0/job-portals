"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Plus, X, Mail } from "lucide-react"

interface JobAlert {
  id: string
  title: string
  keywords: string[]
  location: string
  jobType: string
  salaryRange: string
  frequency: string
  active: boolean
}

export function JobAlerts() {
  const [alerts, setAlerts] = useState<JobAlert[]>([
    {
      id: "1",
      title: "Software Engineer Jobs",
      keywords: ["React", "JavaScript", "Node.js"],
      location: "San Francisco, CA",
      jobType: "Full-time",
      salaryRange: "$80,000+",
      frequency: "daily",
      active: true,
    },
    {
      id: "2",
      title: "Remote Internships",
      keywords: ["Internship", "Remote"],
      location: "Remote",
      jobType: "Internship",
      salaryRange: "Any",
      frequency: "weekly",
      active: true,
    },
  ])

  const [showCreateForm, setShowCreateForm] = useState(false)
  const [newAlert, setNewAlert] = useState({
    title: "",
    keywords: "",
    location: "",
    jobType: "",
    salaryRange: "",
    frequency: "daily",
  })

  const createAlert = () => {
    const alert: JobAlert = {
      id: Date.now().toString(),
      title: newAlert.title,
      keywords: newAlert.keywords.split(",").map((k) => k.trim()),
      location: newAlert.location,
      jobType: newAlert.jobType,
      salaryRange: newAlert.salaryRange,
      frequency: newAlert.frequency,
      active: true,
    }

    setAlerts((prev) => [...prev, alert])
    setNewAlert({
      title: "",
      keywords: "",
      location: "",
      jobType: "",
      salaryRange: "",
      frequency: "daily",
    })
    setShowCreateForm(false)
  }

  const toggleAlert = (id: string) => {
    setAlerts((prev) => prev.map((alert) => (alert.id === id ? { ...alert, active: !alert.active } : alert)))
  }

  const deleteAlert = (id: string) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Job Alerts</h2>
          <p className="text-gray-600">Get notified when new jobs match your criteria</p>
        </div>
        <Button onClick={() => setShowCreateForm(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Create Alert
        </Button>
      </div>

      {/* Existing Alerts */}
      <div className="space-y-4">
        {alerts.map((alert) => (
          <Card key={alert.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="font-semibold">{alert.title}</h3>
                    <Badge variant={alert.active ? "default" : "secondary"}>{alert.active ? "Active" : "Paused"}</Badge>
                  </div>

                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center space-x-4">
                      <span>Keywords:</span>
                      <div className="flex flex-wrap gap-1">
                        {alert.keywords.map((keyword) => (
                          <Badge key={keyword} variant="outline" className="text-xs">
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span>Location: {alert.location}</span>
                      <span>Type: {alert.jobType}</span>
                      <span>Salary: {alert.salaryRange}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4" />
                      <span>Notifications: {alert.frequency}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" onClick={() => toggleAlert(alert.id)}>
                    {alert.active ? "Pause" : "Activate"}
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => deleteAlert(alert.id)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Create Alert Form */}
      {showCreateForm && (
        <Card>
          <CardHeader>
            <CardTitle>Create Job Alert</CardTitle>
            <CardDescription>Set up a new job alert to get notified of matching opportunities</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="alertTitle">Alert Title</Label>
              <Input
                id="alertTitle"
                placeholder="e.g., Software Engineer Jobs"
                value={newAlert.title}
                onChange={(e) => setNewAlert({ ...newAlert, title: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="keywords">Keywords (comma separated)</Label>
              <Input
                id="keywords"
                placeholder="e.g., React, JavaScript, Node.js"
                value={newAlert.keywords}
                onChange={(e) => setNewAlert({ ...newAlert, keywords: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  placeholder="e.g., San Francisco, CA or Remote"
                  value={newAlert.location}
                  onChange={(e) => setNewAlert({ ...newAlert, location: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="jobType">Job Type</Label>
                <Select
                  value={newAlert.jobType}
                  onValueChange={(value) => setNewAlert({ ...newAlert, jobType: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select job type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any Type</SelectItem>
                    <SelectItem value="full-time">Full-time</SelectItem>
                    <SelectItem value="part-time">Part-time</SelectItem>
                    <SelectItem value="internship">Internship</SelectItem>
                    <SelectItem value="contract">Contract</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="salaryRange">Salary Range</Label>
                <Select
                  value={newAlert.salaryRange}
                  onValueChange={(value) => setNewAlert({ ...newAlert, salaryRange: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select salary range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any Salary</SelectItem>
                    <SelectItem value="30000+">$30,000+</SelectItem>
                    <SelectItem value="50000+">$50,000+</SelectItem>
                    <SelectItem value="80000+">$80,000+</SelectItem>
                    <SelectItem value="100000+">$100,000+</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="frequency">Notification Frequency</Label>
                <Select
                  value={newAlert.frequency}
                  onValueChange={(value) => setNewAlert({ ...newAlert, frequency: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="immediate">Immediate</SelectItem>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <Button variant="outline" onClick={() => setShowCreateForm(false)}>
                Cancel
              </Button>
              <Button onClick={createAlert}>Create Alert</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
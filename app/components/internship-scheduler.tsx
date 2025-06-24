"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Clock, Video, MapPin } from "lucide-react"

interface InterviewSchedulerProps {
  candidateName: string
  jobTitle: string
  onSchedule: (details: any) => void
}

export function InterviewScheduler({ candidateName, jobTitle, onSchedule }: InterviewSchedulerProps) {
  const [interviewDetails, setInterviewDetails] = useState({
    date: "",
    time: "",
    duration: "60",
    type: "",
    location: "",
    notes: "",
    interviewers: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSchedule(interviewDetails)
    alert(`Interview scheduled with ${candidateName} for ${jobTitle}`)
  }

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Schedule Interview</CardTitle>
        <CardDescription>
          Schedule an interview with {candidateName} for {jobTitle}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Interview Date</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="date"
                  type="date"
                  className="pl-10"
                  value={interviewDetails.date}
                  onChange={(e) => setInterviewDetails({ ...interviewDetails, date: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="time">Interview Time</Label>
              <div className="relative">
                <Clock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="time"
                  type="time"
                  className="pl-10"
                  value={interviewDetails.time}
                  onChange={(e) => setInterviewDetails({ ...interviewDetails, time: e.target.value })}
                  required
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="duration">Duration (minutes)</Label>
              <Select
                value={interviewDetails.duration}
                onValueChange={(value) => setInterviewDetails({ ...interviewDetails, duration: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30">30 minutes</SelectItem>
                  <SelectItem value="45">45 minutes</SelectItem>
                  <SelectItem value="60">1 hour</SelectItem>
                  <SelectItem value="90">1.5 hours</SelectItem>
                  <SelectItem value="120">2 hours</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Interview Type</Label>
              <Select
                value={interviewDetails.type}
                onValueChange={(value) => setInterviewDetails({ ...interviewDetails, type: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="video">Video Call</SelectItem>
                  <SelectItem value="phone">Phone Call</SelectItem>
                  <SelectItem value="in-person">In-Person</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location/Meeting Link</Label>
            <div className="relative">
              {interviewDetails.type === "video" ? (
                <Video className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              ) : (
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              )}
              <Input
                id="location"
                className="pl-10"
                placeholder={
                  interviewDetails.type === "video"
                    ? "Zoom/Teams meeting link"
                    : interviewDetails.type === "phone"
                      ? "Phone number"
                      : "Office address"
                }
                value={interviewDetails.location}
                onChange={(e) => setInterviewDetails({ ...interviewDetails, location: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="interviewers">Interviewers</Label>
            <Input
              id="interviewers"
              placeholder="Names of interviewers (comma separated)"
              value={interviewDetails.interviewers}
              onChange={(e) => setInterviewDetails({ ...interviewDetails, interviewers: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea
              id="notes"
              placeholder="Any additional information for the candidate..."
              value={interviewDetails.notes}
              onChange={(e) => setInterviewDetails({ ...interviewDetails, notes: e.target.value })}
              rows={3}
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="outline">
              Cancel
            </Button>
            <Button type="submit">Schedule Interview</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

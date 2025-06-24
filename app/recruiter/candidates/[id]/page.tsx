"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  ArrowLeft,
  Download,
  MessageCircle,
  Calendar,
  CheckCircle,
  XCircle,
  Star,
  Phone,
  Mail,
  MapPin,
  GraduationCap,
  Briefcase,
  Award,
  FileText,
  Eye,
} from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { InterviewScheduler } from "@/components/interview-scheduler"

const candidateData = {
  1: {
    id: 1,
    name: "Alice Johnson",
    email: "alice.johnson@mit.edu",
    phone: "+1 (555) 123-4567",
    location: "Boston, MA",
    university: "MIT",
    degree: "Computer Science",
    gpa: "3.8",
    graduationYear: "2024",
    position: "Software Engineer Intern",
    appliedDate: "2024-01-16",
    status: "New",
    avatar: "/placeholder.svg?height=120&width=120",
    skills: ["React", "Node.js", "Python", "JavaScript", "Git", "AWS"],
    experience: [
      {
        title: "Frontend Developer Intern",
        company: "TechStart Inc.",
        duration: "Jun 2023 - Aug 2023",
        description: "Developed responsive web applications using React and TypeScript",
      },
    ],
    education: [
      {
        degree: "Bachelor of Science in Computer Science",
        school: "Massachusetts Institute of Technology",
        year: "2020-2024",
        gpa: "3.8/4.0",
      },
    ],
    projects: [
      {
        name: "E-commerce Platform",
        tech: "React, Node.js, MongoDB",
        description: "Built a full-stack e-commerce platform with payment integration",
      },
      {
        name: "Task Management App",
        tech: "React Native, Firebase",
        description: "Mobile app for task management with real-time synchronization",
      },
    ],
    documents: {
      resume: "alice_johnson_resume.pdf",
      coverLetter: "alice_johnson_cover_letter.pdf",
      transcript: "alice_johnson_transcript.pdf",
    },
    rating: 0,
    notes: "",
  },
}

export default function CandidateDetailPage() {
  const params = useParams()
  const candidateId = Number.parseInt(params?.id as string)
  const [showInterviewScheduler, setShowInterviewScheduler] = useState(false)
  const [rating, setRating] = useState(0)
  const [notes, setNotes] = useState("")
  const [candidateStatus, setCandidateStatus] = useState("New")

  const candidate = candidateData[candidateId as keyof typeof candidateData]

  if (!candidate) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card>
          <CardContent className="p-12 text-center">
            <h2 className="text-2xl font-bold mb-4">Candidate Not Found</h2>
            <p className="text-gray-600 mb-6">The candidate you're looking for doesn't exist.</p>
            <Link href="/dashboard/recruiter">
              <Button>Back to Dashboard</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  const handleDownloadDocument = (fileName: string) => {
    toast({
      title: "Download Started",
      description: `Downloading ${fileName}...`,
    })
    // Simulate download
    setTimeout(() => {
      toast({
        title: "Download Complete",
        description: `${fileName} has been downloaded successfully.`,
      })
    }, 2000)
  }

  const handleSendMessage = () => {
    toast({
      title: "Message Sent",
      description: `Message sent to ${candidate.name} successfully.`,
    })
  }

  const handleScheduleInterview = () => {
    setShowInterviewScheduler(true)
  }

  const handleApprove = () => {
    setCandidateStatus("Approved")
    toast({
      title: "Candidate Approved",
      description: `${candidate.name} has been approved for the next round.`,
    })
  }

  const handleReject = () => {
    setCandidateStatus("Rejected")
    toast({
      title: "Application Rejected",
      description: `${candidate.name}'s application has been rejected.`,
    })
  }

  const handleRating = (newRating: number) => {
    setRating(newRating)
    toast({
      title: "Rating Updated",
      description: `Candidate rated ${newRating} out of 5 stars.`,
    })
  }

  const handleSaveNotes = () => {
    toast({
      title: "Notes Saved",
      description: "Your notes have been saved successfully.",
    })
  }

  const handleCallCandidate = () => {
    toast({
      title: "Calling Candidate",
      description: `Initiating call to ${candidate.phone}...`,
    })
  }

  const handleEmailCandidate = () => {
    toast({
      title: "Email Opened",
      description: `Opening email client to send message to ${candidate.email}...`,
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "New":
        return "bg-blue-500"
      case "Approved":
        return "bg-green-500"
      case "Rejected":
        return "bg-red-500"
      case "Interview":
        return "bg-purple-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/dashboard/recruiter" className="flex items-center text-blue-600 hover:text-blue-700">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Candidate Profile</h1>
            <div className="flex space-x-2">
              <Button onClick={handleApprove} className="bg-green-600 hover:bg-green-700">
                <CheckCircle className="h-4 w-4 mr-2" />
                Approve
              </Button>
              <Button onClick={handleReject} variant="destructive">
                <XCircle className="h-4 w-4 mr-2" />
                Reject
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Candidate Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Basic Info Card */}
            <Card>
              <CardContent className="p-6 text-center">
                <Avatar className="h-24 w-24 mx-auto mb-4">
                  <AvatarImage src={candidate.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="text-2xl">
                    {candidate.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <h2 className="text-2xl font-bold mb-2">{candidate.name}</h2>
                <p className="text-gray-600 mb-4">Applied for: {candidate.position}</p>
                <Badge className={`${getStatusColor(candidateStatus)} text-white mb-4`}>{candidateStatus}</Badge>

                {/* Contact Buttons */}
                <div className="flex space-x-2 mb-4">
                  <Button variant="outline" size="sm" onClick={handleCallCandidate}>
                    <Phone className="h-4 w-4 mr-2" />
                    Call
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleEmailCandidate}>
                    <Mail className="h-4 w-4 mr-2" />
                    Email
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleSendMessage}>
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Message
                  </Button>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2">
                  <Button onClick={handleScheduleInterview} className="w-full">
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule Interview
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-3 text-gray-400" />
                  <span className="text-sm">{candidate.email}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-3 text-gray-400" />
                  <span className="text-sm">{candidate.phone}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-3 text-gray-400" />
                  <span className="text-sm">{candidate.location}</span>
                </div>
              </CardContent>
            </Card>

            {/* Rating */}
            <Card>
              <CardHeader>
                <CardTitle>Rate Candidate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-1 mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => handleRating(star)}
                      className={`p-1 ${star <= rating ? "text-yellow-400" : "text-gray-300"}`}
                    >
                      <Star className="h-6 w-6 fill-current" />
                    </button>
                  ))}
                </div>
                <p className="text-sm text-gray-600">
                  {rating > 0 ? `Rated ${rating} out of 5 stars` : "Click to rate this candidate"}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Detailed Info */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="experience">Experience</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
                <TabsTrigger value="notes">Notes</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                {/* Education */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <GraduationCap className="h-5 w-5 mr-2" />
                      Education
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {candidate.education.map((edu, index) => (
                      <div key={index} className="mb-4 last:mb-0">
                        <h4 className="font-medium">{edu.degree}</h4>
                        <p className="text-sm text-gray-600">{edu.school}</p>
                        <p className="text-sm text-gray-500">
                          {edu.year} • GPA: {edu.gpa}
                        </p>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Skills */}
                <Card>
                  <CardHeader>
                    <CardTitle>Skills</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {candidate.skills.map((skill) => (
                        <Badge key={skill} variant="outline">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Projects */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Award className="h-5 w-5 mr-2" />
                      Projects
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {candidate.projects.map((project, index) => (
                      <div key={index} className="mb-4 last:mb-0 p-4 border rounded-lg">
                        <h4 className="font-medium mb-2">{project.name}</h4>
                        <p className="text-sm text-blue-600 mb-2">{project.tech}</p>
                        <p className="text-sm text-gray-600">{project.description}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="experience" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Briefcase className="h-5 w-5 mr-2" />
                      Work Experience
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {candidate.experience.map((exp, index) => (
                      <div key={index} className="mb-6 last:mb-0 p-4 border rounded-lg">
                        <h4 className="font-medium text-lg">{exp.title}</h4>
                        <p className="text-blue-600 mb-2">{exp.company}</p>
                        <p className="text-sm text-gray-500 mb-3">{exp.duration}</p>
                        <p className="text-sm text-gray-600">{exp.description}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="documents" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <FileText className="h-5 w-5 mr-2" />
                      Documents
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center">
                          <FileText className="h-8 w-8 text-red-500 mr-3" />
                          <div>
                            <p className="font-medium">Resume</p>
                            <p className="text-sm text-gray-500">{candidate.documents.resume}</p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDownloadDocument(candidate.documents.resume)}
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            View
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDownloadDocument(candidate.documents.resume)}
                          >
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center">
                          <FileText className="h-8 w-8 text-blue-500 mr-3" />
                          <div>
                            <p className="font-medium">Cover Letter</p>
                            <p className="text-sm text-gray-500">{candidate.documents.coverLetter}</p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDownloadDocument(candidate.documents.coverLetter)}
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            View
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDownloadDocument(candidate.documents.coverLetter)}
                          >
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center">
                          <FileText className="h-8 w-8 text-green-500 mr-3" />
                          <div>
                            <p className="font-medium">Transcript</p>
                            <p className="text-sm text-gray-500">{candidate.documents.transcript}</p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDownloadDocument(candidate.documents.transcript)}
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            View
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDownloadDocument(candidate.documents.transcript)}
                          >
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="notes" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recruiter Notes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="notes">Add your notes about this candidate</Label>
                        <Textarea
                          id="notes"
                          placeholder="Enter your notes here..."
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                          rows={6}
                          className="mt-2"
                        />
                      </div>
                      <Button onClick={handleSaveNotes}>Save Notes</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Interview Scheduler Modal */}
      {showInterviewScheduler && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <InterviewScheduler
            candidateName={candidate.name}
            jobTitle={candidate.position}
            onSchedule={(details) => {
              console.log("Interview scheduled:", details)
              toast({
                title: "Interview Scheduled",
                description: `Interview scheduled with ${candidate.name} successfully.`,
              })
              setShowInterviewScheduler(false)
            }}
          />
        </div>
      )}
    </div>
  )
}

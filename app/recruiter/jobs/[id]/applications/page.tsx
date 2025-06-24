"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Search, Filter, Eye, CheckCircle, XCircle, Calendar, Download, MessageCircle } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

const jobApplications = {
  1: {
    jobTitle: "Software Engineer Intern",
    applications: [
      {
        id: 1,
        name: "Alice Johnson",
        email: "alice.johnson@mit.edu",
        university: "MIT",
        gpa: "3.8",
        skills: ["React", "Node.js", "Python"],
        appliedDate: "2024-01-16",
        status: "New",
        avatar: "/placeholder.svg?height=40&width=40",
        resume: "alice_resume.pdf",
        coverLetter: "alice_cover.pdf",
      },
      {
        id: 2,
        name: "Bob Smith",
        email: "bob.smith@stanford.edu",
        university: "Stanford",
        gpa: "3.9",
        skills: ["Java", "Spring", "AWS"],
        appliedDate: "2024-01-15",
        status: "Reviewed",
        avatar: "/placeholder.svg?height=40&width=40",
        resume: "bob_resume.pdf",
        coverLetter: "bob_cover.pdf",
      },
      {
        id: 3,
        name: "Carol Davis",
        email: "carol.davis@harvard.edu",
        university: "Harvard",
        gpa: "3.7",
        skills: ["JavaScript", "React", "CSS"],
        appliedDate: "2024-01-14",
        status: "Interview",
        avatar: "/placeholder.svg?height=40&width=40",
        resume: "carol_resume.pdf",
        coverLetter: "carol_cover.pdf",
      },
    ],
  },
}

export default function JobApplicationsPage() {
  const params = useParams()
  const jobId = Number.parseInt(params?.id as string)
  const [statusFilter, setStatusFilter] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

  const jobData = jobApplications[jobId as keyof typeof jobApplications]

  if (!jobData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card>
          <CardContent className="p-12 text-center">
            <h2 className="text-2xl font-bold mb-4">Job Not Found</h2>
            <p className="text-gray-600 mb-6">The job you're looking for doesn't exist.</p>
            <Link href="/dashboard/recruiter">
              <Button>Back to Dashboard</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  const filteredApplications = jobData.applications.filter((app) => {
    const matchesStatus = statusFilter === "all" || app.status.toLowerCase() === statusFilter
    const matchesSearch =
      app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.university.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesStatus && matchesSearch
  })

  const handleViewCandidate = (candidateId: number) => {
    window.location.href = `/recruiter/candidates/${candidateId}`
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

  const handleSendMessage = (candidateName: string) => {
    toast({
      title: "Message Sent",
      description: `Message sent to ${candidateName} successfully.`,
    })
  }

  const handleStatusChange = (candidateId: number, newStatus: string) => {
    toast({
      title: "Status Updated",
      description: `Candidate status changed to ${newStatus}.`,
    })
  }

  const handleScheduleInterview = (candidateName: string) => {
    toast({
      title: "Interview Scheduled",
      description: `Interview scheduled with ${candidateName}.`,
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "New":
        return "bg-blue-500"
      case "Reviewed":
        return "bg-yellow-500"
      case "Interview":
        return "bg-green-500"
      case "Rejected":
        return "bg-red-500"
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
            <h1 className="text-2xl font-bold text-gray-900">Job Applications</h1>
            <div className="w-32"></div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Job Info */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold mb-2">{jobData.jobTitle}</h2>
            <p className="text-gray-600">{jobData.applications.length} applications received</p>
          </CardContent>
        </Card>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search candidates..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="reviewed">Reviewed</SelectItem>
                  <SelectItem value="interview">Interview</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Applications List */}
        <Card>
          <CardHeader>
            <CardTitle>Applications ({filteredApplications.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredApplications.map((application) => (
                <div key={application.id} className="p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={application.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {application.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h4 className="font-medium text-lg">{application.name}</h4>
                        <p className="text-sm text-gray-600">{application.email}</p>
                        <p className="text-sm text-gray-600">
                          {application.university} • GPA: {application.gpa}
                        </p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {application.skills.map((skill) => (
                            <Badge key={skill} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                        <p className="text-xs text-gray-500 mt-2">Applied on {application.appliedDate}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge className={`${getStatusColor(application.status)} text-white`}>{application.status}</Badge>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    <Button variant="outline" size="sm" onClick={() => handleViewCandidate(application.id)}>
                      <Eye className="h-4 w-4 mr-2" />
                      View Profile
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDownloadDocument(application.resume)}>
                      <Download className="h-4 w-4 mr-2" />
                      Resume
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDownloadDocument(application.coverLetter)}>
                      <Download className="h-4 w-4 mr-2" />
                      Cover Letter
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleSendMessage(application.name)}>
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Message
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleScheduleInterview(application.name)}>
                      <Calendar className="h-4 w-4 mr-2" />
                      Schedule Interview
                    </Button>
                  </div>

                  {/* Status Actions */}
                  <div className="flex gap-2 mt-3">
                    <Button
                      size="sm"
                      onClick={() => handleStatusChange(application.id, "Approved")}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleStatusChange(application.id, "Rejected")}
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      Reject
                    </Button>
                  </div>
                </div>
              ))}

              {filteredApplications.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500">No applications found matching your criteria.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

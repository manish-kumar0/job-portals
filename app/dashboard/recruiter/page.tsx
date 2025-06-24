"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Plus,
  Users,
  Briefcase,
  Eye,
  Search,
  Filter,
  CheckCircle,
  XCircle,
  Clock,
  MapPin,
  DollarSign,
} from "lucide-react"

// Add these imports
import { InterviewScheduler } from "@/components/interview-scheduler"
import { AdvancedAnalytics } from "@/components/advanced-analytics"
import { NotificationsPanel } from "@/components/notifications-panel"
import { toast } from "@/components/ui/use-toast"

const jobListings = [
  {
    id: 1,
    title: "Software Engineer Intern",
    department: "Engineering",
    location: "San Francisco, CA",
    type: "Internship",
    salary: "$25/hour",
    posted: "2024-01-15",
    applications: 45,
    status: "Active",
  },
  {
    id: 2,
    title: "Marketing Associate",
    department: "Marketing",
    location: "New York, NY",
    type: "Full-time",
    salary: "$55,000/year",
    posted: "2024-01-10",
    applications: 32,
    status: "Active",
  },
  {
    id: 3,
    title: "Data Analyst",
    department: "Analytics",
    location: "Remote",
    type: "Full-time",
    salary: "$60,000/year",
    posted: "2024-01-08",
    applications: 28,
    status: "Closed",
  },
]

const candidates = [
  {
    id: 1,
    name: "Alice Johnson",
    position: "Software Engineer Intern",
    university: "MIT",
    gpa: "3.8",
    skills: ["React", "Node.js", "Python"],
    appliedDate: "2024-01-16",
    status: "New",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    name: "Bob Smith",
    position: "Software Engineer Intern",
    university: "Stanford",
    gpa: "3.9",
    skills: ["Java", "Spring", "AWS"],
    appliedDate: "2024-01-15",
    status: "Reviewed",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    name: "Carol Davis",
    position: "Marketing Associate",
    university: "Harvard",
    gpa: "3.7",
    skills: ["Digital Marketing", "SEO", "Analytics"],
    appliedDate: "2024-01-14",
    status: "Interview",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export default function RecruiterDashboard() {
  const [showJobForm, setShowJobForm] = useState(false)
  const [jobForm, setJobForm] = useState({
    title: "",
    department: "",
    location: "",
    type: "",
    salary: "",
    description: "",
    requirements: "",
  })

  // Add state for interview scheduler
  const [showInterviewScheduler, setShowInterviewScheduler] = useState(false)
  const [selectedCandidate, setSelectedCandidate] = useState<any>(null)

  // Add these new interactive functions at the top of the component:

  const handleFilterCandidates = () => {
    toast({
      title: "Filter Applied",
      description: "Candidates filtered successfully.",
    })
  }

  const handleSearchCandidates = (searchTerm: string) => {
    if (searchTerm.length > 0) {
      toast({
        title: "Search Results",
        description: `Searching for "${searchTerm}"...`,
      })
    }
  }

  const handleDeleteJob = (jobId: number) => {
    toast({
      title: "Job Deleted",
      description: `Job ${jobId} has been deleted successfully.`,
      variant: "destructive",
    })
  }

  const handleDuplicateJob = (jobId: number) => {
    toast({
      title: "Job Duplicated",
      description: `Job ${jobId} has been duplicated successfully.`,
    })
  }

  const handleShareJob = (jobId: number) => {
    toast({
      title: "Job Shared",
      description: `Job ${jobId} link copied to clipboard.`,
    })
  }

  // Add these functions
  const handleViewApplications = (jobId: number) => {
    window.location.href = `/recruiter/jobs/${jobId}/applications`
  }

  const handleViewCandidate = (candidateId: number) => {
    window.location.href = `/recruiter/candidates/${candidateId}`
  }

  const handleEditJob = (jobId: number) => {
    toast({
      title: "Edit Job",
      description: `Editing job ${jobId}. Feature coming soon!`,
    })
  }

  const handleJobSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    if (!jobForm.title || !jobForm.department || !jobForm.location) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    // Simulate job posting
    toast({
      title: "Job Posted Successfully!",
      description: `${jobForm.title} has been posted and is now live.`,
    })

    console.log("Job posted:", jobForm)
    setShowJobForm(false)
    setJobForm({
      title: "",
      department: "",
      location: "",
      type: "",
      salary: "",
      description: "",
      requirements: "",
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

  const handleCandidateAction = (candidateId: number, action: "approve" | "reject" | "view") => {
    switch (action) {
      case "approve":
        toast({
          title: "Candidate Approved",
          description: `Candidate ${candidateId} has been approved for interview!`,
        })
        break
      case "reject":
        toast({
          title: "Application Rejected",
          description: `Candidate ${candidateId} application has been rejected.`,
        })
        break
      case "view":
        window.location.href = `/recruiter/candidates/${candidateId}`
        break
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Recruiter Dashboard</h1>
          <div className="flex items-center space-x-4">
            <Button onClick={() => setShowJobForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Post Job
            </Button>
            <NotificationsPanel />
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=32&width=32" />
              <AvatarFallback>RC</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Briefcase className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Active Jobs</p>
                  <p className="text-2xl font-bold">8</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Applications</p>
                  <p className="text-2xl font-bold">156</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Eye className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Profile Views</p>
                  <p className="text-2xl font-bold">1,234</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <CheckCircle className="h-8 w-8 text-orange-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Hired</p>
                  <p className="text-2xl font-bold">23</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="jobs" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="jobs">Job Listings</TabsTrigger>
            <TabsTrigger value="candidates">Candidates</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="jobs" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Job Listings</CardTitle>
                    <CardDescription>Manage your job postings and track applications</CardDescription>
                  </div>
                  <Button onClick={() => setShowJobForm(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Post New Job
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {jobListings.map((job) => (
                    <div key={job.id} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-medium text-lg">{job.title}</h4>
                          <p className="text-sm text-gray-600">{job.department}</p>
                        </div>
                        <Badge variant={job.status === "Active" ? "default" : "secondary"}>{job.status}</Badge>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-3">
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {job.location}
                        </div>
                        <div className="flex items-center">
                          <Briefcase className="h-4 w-4 mr-1" />
                          {job.type}
                        </div>
                        <div className="flex items-center">
                          <DollarSign className="h-4 w-4 mr-1" />
                          {job.salary}
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          Posted {job.posted}
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-sm">
                          <span className="font-medium">{job.applications}</span> applications received
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" onClick={() => handleViewApplications(job.id)}>
                            <Eye className="h-4 w-4 mr-2" />
                            View Applications
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleEditJob(job.id)}>
                            Edit
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleDuplicateJob(job.id)}>
                            Duplicate
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleShareJob(job.id)}>
                            Share
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleDeleteJob(job.id)}>
                            Delete
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="candidates" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Candidate Applications</CardTitle>
                    <CardDescription>Review and manage candidate applications</CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={handleFilterCandidates}>
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                    <div className="relative">
                      <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search candidates..."
                        className="pl-10 w-64"
                        onChange={(e) => handleSearchCandidates(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {candidates.map((candidate) => (
                    <div key={candidate.id} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4">
                          <Avatar>
                            <AvatarImage src={candidate.avatar || "/placeholder.svg"} />
                            <AvatarFallback>
                              {candidate.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-medium">{candidate.name}</h4>
                            <p className="text-sm text-gray-600">Applied for: {candidate.position}</p>
                            <p className="text-sm text-gray-600">
                              {candidate.university} • GPA: {candidate.gpa}
                            </p>
                            <div className="flex flex-wrap gap-1 mt-2">
                              {candidate.skills.map((skill) => (
                                <Badge key={skill} variant="outline" className="text-xs">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Badge className={`${getStatusColor(candidate.status)} text-white`}>{candidate.status}</Badge>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm" onClick={() => handleViewCandidate(candidate.id)}>
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleCandidateAction(candidate.id, "approve")}
                            >
                              <CheckCircle className="h-4 w-4 text-green-600" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleCandidateAction(candidate.id, "reject")}
                            >
                              <XCircle className="h-4 w-4 text-red-600" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setSelectedCandidate(candidate)
                                setShowInterviewScheduler(true)
                              }}
                            >
                              Schedule Interview
                            </Button>
                          </div>
                        </div>
                      </div>
                      <div className="mt-3 text-xs text-gray-500">Applied on {candidate.appliedDate}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <AdvancedAnalytics />
          </TabsContent>
        </Tabs>
      </div>

      {/* Job Posting Modal */}
      {showJobForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>Post New Job</CardTitle>
              <CardDescription>Create a new job listing to attract candidates</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleJobSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Job Title</Label>
                    <Input
                      id="title"
                      value={jobForm.title}
                      onChange={(e) => setJobForm({ ...jobForm, title: e.target.value })}
                      placeholder="e.g. Software Engineer Intern"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Input
                      id="department"
                      value={jobForm.department}
                      onChange={(e) => setJobForm({ ...jobForm, department: e.target.value })}
                      placeholder="e.g. Engineering"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={jobForm.location}
                      onChange={(e) => setJobForm({ ...jobForm, location: e.target.value })}
                      placeholder="e.g. San Francisco, CA or Remote"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="type">Job Type</Label>
                    <Select value={jobForm.type} onValueChange={(value) => setJobForm({ ...jobForm, type: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select job type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="full-time">Full-time</SelectItem>
                        <SelectItem value="part-time">Part-time</SelectItem>
                        <SelectItem value="internship">Internship</SelectItem>
                        <SelectItem value="contract">Contract</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="salary">Salary/Compensation</Label>
                  <Input
                    id="salary"
                    value={jobForm.salary}
                    onChange={(e) => setJobForm({ ...jobForm, salary: e.target.value })}
                    placeholder="e.g. $60,000/year or $25/hour"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Job Description</Label>
                  <Textarea
                    id="description"
                    value={jobForm.description}
                    onChange={(e) => setJobForm({ ...jobForm, description: e.target.value })}
                    placeholder="Describe the role, responsibilities, and what the candidate will be doing..."
                    rows={4}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="requirements">Requirements</Label>
                  <Textarea
                    id="requirements"
                    value={jobForm.requirements}
                    onChange={(e) => setJobForm({ ...jobForm, requirements: e.target.value })}
                    placeholder="List the required skills, experience, education, etc..."
                    rows={4}
                    required
                  />
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <Button type="button" variant="outline" onClick={() => setShowJobForm(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Post Job</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}

      {showInterviewScheduler && selectedCandidate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <InterviewScheduler
            candidateName={selectedCandidate.name}
            jobTitle={selectedCandidate.position}
            onSchedule={(details) => {
              console.log("Interview scheduled:", details)
              setShowInterviewScheduler(false)
              setSelectedCandidate(null)
            }}
          />
        </div>
      )}
    </div>
  )
}

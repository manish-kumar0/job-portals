"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Search, MapPin, Clock, Briefcase, DollarSign, BookmarkPlus, Filter } from "lucide-react"

const allJobs = [
  {
    id: 1,
    title: "Software Engineer Intern",
    company: "TechCorp",
    location: "San Francisco, CA",
    type: "Internship",
    salary: "$25/hour",
    posted: "2 days ago",
    tags: ["React", "Node.js", "TypeScript"],
    description: "Join our engineering team as an intern and work on cutting-edge web applications.",
    requirements: ["Computer Science student", "Knowledge of React", "Strong problem-solving skills"],
  },
  {
    id: 2,
    title: "Marketing Associate",
    company: "StartupXYZ",
    location: "New York, NY",
    type: "Full-time",
    salary: "$55,000/year",
    posted: "1 week ago",
    tags: ["Digital Marketing", "SEO", "Analytics"],
    description: "Drive marketing campaigns and help grow our user base.",
    requirements: ["Marketing degree", "2+ years experience", "Google Analytics certified"],
  },
  {
    id: 3,
    title: "Data Science Intern",
    company: "DataFlow Inc",
    location: "Remote",
    type: "Internship",
    salary: "$20/hour",
    posted: "3 days ago",
    tags: ["Python", "Machine Learning", "SQL"],
    description: "Analyze large datasets and build predictive models.",
    requirements: ["Statistics background", "Python proficiency", "SQL knowledge"],
  },
  {
    id: 4,
    title: "Frontend Developer",
    company: "WebTech Solutions",
    location: "Austin, TX",
    type: "Full-time",
    salary: "$70,000/year",
    posted: "5 days ago",
    tags: ["React", "JavaScript", "CSS"],
    description: "Build responsive web applications with modern technologies.",
    requirements: ["3+ years React experience", "Strong CSS skills", "Portfolio required"],
  },
  {
    id: 5,
    title: "UX Design Intern",
    company: "DesignStudio",
    location: "Los Angeles, CA",
    type: "Internship",
    salary: "$22/hour",
    posted: "1 day ago",
    tags: ["Figma", "User Research", "Prototyping"],
    description: "Create user-centered designs for mobile and web applications.",
    requirements: ["Design portfolio", "Figma proficiency", "User research experience"],
  },
]

export default function JobsPage() {
  const searchParams = useSearchParams()
  const [jobs, setJobs] = useState(allJobs)
  const [searchQuery, setSearchQuery] = useState(searchParams?.get("q") || "")
  const [locationQuery, setLocationQuery] = useState(searchParams?.get("location") || "")
  const [jobType, setJobType] = useState("")
  const [salaryRange, setSalaryRange] = useState("")
  const [bookmarkedJobs, setBookmarkedJobs] = useState<number[]>([])

  useEffect(() => {
    filterJobs()
  }, [searchQuery, locationQuery, jobType, salaryRange])

  const filterJobs = () => {
    let filtered = allJobs

    if (searchQuery) {
      filtered = filtered.filter(
        (job) =>
          job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
      )
    }

    if (locationQuery) {
      filtered = filtered.filter((job) => job.location.toLowerCase().includes(locationQuery.toLowerCase()))
    }

    if (jobType) {
      filtered = filtered.filter((job) => job.type === jobType)
    }

    setJobs(filtered)
  }

  const toggleBookmark = (jobId: number) => {
    setBookmarkedJobs((prev) => (prev.includes(jobId) ? prev.filter((id) => id !== jobId) : [...prev, jobId]))
  }

  const handleApply = (jobId: number) => {
    // Redirect to application page
    window.location.href = `/jobs/${jobId}/apply`
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              JobPortal
            </Link>
            <div className="flex space-x-4">
              <Link href="/auth/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link href="/auth/register">
                <Button>Sign Up</Button>
              </Link>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Job title, keywords, or company"
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="flex-1">
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Location"
                  className="pl-10"
                  value={locationQuery}
                  onChange={(e) => setLocationQuery(e.target.value)}
                />
              </div>
            </div>
            <Button onClick={filterJobs}>
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Filter className="h-5 w-5 mr-2" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="text-sm font-medium mb-2 block">Job Type</label>
                  <Select value={jobType} onValueChange={setJobType}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="Full-time">Full-time</SelectItem>
                      <SelectItem value="Part-time">Part-time</SelectItem>
                      <SelectItem value="Internship">Internship</SelectItem>
                      <SelectItem value="Contract">Contract</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Salary Range</label>
                  <Select value={salaryRange} onValueChange={setSalaryRange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Any Salary" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any Salary</SelectItem>
                      <SelectItem value="0-30000">$0 - $30,000</SelectItem>
                      <SelectItem value="30000-60000">$30,000 - $60,000</SelectItem>
                      <SelectItem value="60000-100000">$60,000 - $100,000</SelectItem>
                      <SelectItem value="100000+">$100,000+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-3 block">Experience Level</label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="entry" />
                      <label htmlFor="entry" className="text-sm">
                        Entry Level
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="mid" />
                      <label htmlFor="mid" className="text-sm">
                        Mid Level
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="senior" />
                      <label htmlFor="senior" className="text-sm">
                        Senior Level
                      </label>
                    </div>
                  </div>
                </div>

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    setSearchQuery("")
                    setLocationQuery("")
                    setJobType("")
                    setSalaryRange("")
                    setJobs(allJobs)
                  }}
                >
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Job Listings */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold">
                {jobs.length} Job{jobs.length !== 1 ? "s" : ""} Found
              </h1>
              <Select defaultValue="newest">
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="salary-high">Salary: High to Low</SelectItem>
                  <SelectItem value="salary-low">Salary: Low to High</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-6">
              {jobs.map((job) => (
                <Card key={job.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
                        <p className="text-gray-600 font-medium">{job.company}</p>
                      </div>
                      <Badge variant={job.type === "Internship" ? "secondary" : "default"}>{job.type}</Badge>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2" />
                        {job.location}
                      </div>
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 mr-2" />
                        {job.salary}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2" />
                        {job.posted}
                      </div>
                      <div className="flex items-center">
                        <Briefcase className="h-4 w-4 mr-2" />
                        {job.type}
                      </div>
                    </div>

                    <p className="text-gray-700 mb-4">{job.description}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {job.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex space-x-2">
                        <Button onClick={() => handleApply(job.id)}>Apply Now</Button>
                        <Button
                          variant="outline"
                          onClick={() => toggleBookmark(job.id)}
                          className={bookmarkedJobs.includes(job.id) ? "bg-blue-50 border-blue-200" : ""}
                        >
                          <BookmarkPlus className="h-4 w-4" />
                        </Button>
                      </div>
                      <Link href={`/jobs/${job.id}`}>
                        <Button variant="ghost">View Details</Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {jobs.length === 0 && (
              <Card>
                <CardContent className="p-12 text-center">
                  <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
                  <p className="text-gray-600">Try adjusting your search criteria or filters</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

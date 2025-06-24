"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Search, MapPin, Clock, Briefcase, DollarSign, BookmarkPlus, Filter } from "lucide-react"

const internships = [
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
    duration: "3 months",
    startDate: "Summer 2024",
  },
  {
    id: 2,
    title: "Data Science Intern",
    company: "DataFlow Inc",
    location: "Remote",
    type: "Internship",
    salary: "$20/hour",
    posted: "3 days ago",
    tags: ["Python", "Machine Learning", "SQL"],
    description: "Analyze large datasets and build predictive models.",
    duration: "4 months",
    startDate: "Summer 2024",
  },
  {
    id: 3,
    title: "UX Design Intern",
    company: "DesignStudio",
    location: "Los Angeles, CA",
    type: "Internship",
    salary: "$22/hour",
    posted: "1 day ago",
    tags: ["Figma", "User Research", "Prototyping"],
    description: "Create user-centered designs for mobile and web applications.",
    duration: "3 months",
    startDate: "Summer 2024",
  },
  {
    id: 4,
    title: "Marketing Intern",
    company: "StartupXYZ",
    location: "New York, NY",
    type: "Internship",
    salary: "$18/hour",
    posted: "5 days ago",
    tags: ["Digital Marketing", "Social Media", "Analytics"],
    description: "Support marketing campaigns and social media strategy.",
    duration: "3 months",
    startDate: "Summer 2024",
  },
]

export default function InternshipsPage() {
  const [filteredInternships, setFilteredInternships] = useState(internships)
  const [searchQuery, setSearchQuery] = useState("")
  const [locationQuery, setLocationQuery] = useState("")
  const [salaryRange, setSalaryRange] = useState("")
  const [bookmarkedJobs, setBookmarkedJobs] = useState<number[]>([])

  useEffect(() => {
    filterInternships()
  }, [searchQuery, locationQuery, salaryRange])

  const filterInternships = () => {
    let filtered = internships

    if (searchQuery) {
      filtered = filtered.filter(
        (internship) =>
          internship.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          internship.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
          internship.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
      )
    }

    if (locationQuery) {
      filtered = filtered.filter((internship) =>
        internship.location.toLowerCase().includes(locationQuery.toLowerCase()),
      )
    }

    setFilteredInternships(filtered)
  }

  const toggleBookmark = (internshipId: number) => {
    setBookmarkedJobs((prev) =>
      prev.includes(internshipId) ? prev.filter((id) => id !== internshipId) : [...prev, internshipId],
    )
  }

  const handleApply = (internshipId: number) => {
    window.location.href = `/jobs/${internshipId}/apply`
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
                  placeholder="Internship title, keywords, or company"
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
            <Button onClick={filterInternships}>
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
                  <label className="text-sm font-medium mb-2 block">Salary Range</label>
                  <Select value={salaryRange} onValueChange={setSalaryRange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Any Salary" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any Salary</SelectItem>
                      <SelectItem value="15-20">$15 - $20/hour</SelectItem>
                      <SelectItem value="20-25">$20 - $25/hour</SelectItem>
                      <SelectItem value="25-30">$25 - $30/hour</SelectItem>
                      <SelectItem value="30+">$30+/hour</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-3 block">Duration</label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="3months" />
                      <label htmlFor="3months" className="text-sm">
                        3 months
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="4months" />
                      <label htmlFor="4months" className="text-sm">
                        4 months
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="6months" />
                      <label htmlFor="6months" className="text-sm">
                        6 months
                      </label>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-3 block">Start Date</label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="summer" />
                      <label htmlFor="summer" className="text-sm">
                        Summer 2024
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="fall" />
                      <label htmlFor="fall" className="text-sm">
                        Fall 2024
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="spring" />
                      <label htmlFor="spring" className="text-sm">
                        Spring 2025
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
                    setSalaryRange("")
                    setFilteredInternships(internships)
                  }}
                >
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Internship Listings */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold">
                {filteredInternships.length} Internship{filteredInternships.length !== 1 ? "s" : ""} Found
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
              {filteredInternships.map((internship) => (
                <Card key={internship.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold mb-2">{internship.title}</h3>
                        <p className="text-gray-600 font-medium">{internship.company}</p>
                      </div>
                      <Badge variant="secondary">{internship.type}</Badge>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2" />
                        {internship.location}
                      </div>
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 mr-2" />
                        {internship.salary}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2" />
                        {internship.duration}
                      </div>
                      <div className="flex items-center">
                        <Briefcase className="h-4 w-4 mr-2" />
                        {internship.startDate}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2" />
                        {internship.posted}
                      </div>
                    </div>

                    <p className="text-gray-700 mb-4">{internship.description}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {internship.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex space-x-2">
                        <Button onClick={() => handleApply(internship.id)}>Apply Now</Button>
                        <Button
                          variant="outline"
                          onClick={() => toggleBookmark(internship.id)}
                          className={bookmarkedJobs.includes(internship.id) ? "bg-blue-50 border-blue-200" : ""}
                        >
                          <BookmarkPlus className="h-4 w-4" />
                        </Button>
                      </div>
                      <Link href={`/jobs/${internship.id}`}>
                        <Button variant="ghost">View Details</Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredInternships.length === 0 && (
              <Card>
                <CardContent className="p-12 text-center">
                  <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No internships found</h3>
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

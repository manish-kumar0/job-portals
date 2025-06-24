"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { MapPin, DollarSign, Clock, Briefcase, Building, BookmarkPlus, Share2, ArrowLeft } from "lucide-react"

const jobDetails = {
  1: {
    id: 1,
    title: "Software Engineer Intern",
    company: "TechCorp",
    location: "San Francisco, CA",
    type: "Internship",
    salary: "$25/hour",
    posted: "2 days ago",
    tags: ["React", "Node.js", "TypeScript"],
    description: `We are looking for a passionate Software Engineer Intern to join our dynamic engineering team. You'll work on cutting-edge web applications and contribute to products used by millions of users worldwide.

This is an excellent opportunity to gain hands-on experience with modern web technologies, work alongside experienced engineers, and make a real impact on our products.`,
    responsibilities: [
      "Develop and maintain web applications using React and Node.js",
      "Collaborate with cross-functional teams to define and implement new features",
      "Write clean, maintainable, and efficient code",
      "Participate in code reviews and contribute to team knowledge sharing",
      "Debug and resolve technical issues",
      "Learn and adapt to new technologies and frameworks",
    ],
    requirements: [
      "Currently pursuing a degree in Computer Science or related field",
      "Strong knowledge of JavaScript, HTML, and CSS",
      "Experience with React and modern web development practices",
      "Familiarity with version control systems (Git)",
      "Strong problem-solving skills and attention to detail",
      "Excellent communication and teamwork abilities",
    ],
    benefits: [
      "Competitive hourly compensation",
      "Flexible working hours",
      "Mentorship from senior engineers",
      "Access to latest development tools and technologies",
      "Opportunity for full-time conversion",
      "Free lunch and snacks",
    ],
    companyInfo: {
      name: "TechCorp",
      size: "1000-5000 employees",
      industry: "Technology",
      founded: "2010",
      description:
        "TechCorp is a leading technology company focused on building innovative solutions that connect people and businesses worldwide.",
    },
  },
}

export default function JobDetailPage() {
  const params = useParams()
  const jobId = Number.parseInt(params?.id as string)
  const [isBookmarked, setIsBookmarked] = useState(false)

  const job = jobDetails[jobId as keyof typeof jobDetails]

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card>
          <CardContent className="p-12 text-center">
            <h2 className="text-2xl font-bold mb-4">Job Not Found</h2>
            <p className="text-gray-600 mb-6">The job you're looking for doesn't exist or has been removed.</p>
            <Link href="/jobs">
              <Button>Browse All Jobs</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  const handleApply = () => {
    window.location.href = `/jobs/${jobId}/apply`
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: job.title,
        text: `Check out this job opportunity at ${job.company}`,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert("Job link copied to clipboard!")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/jobs" className="flex items-center text-blue-600 hover:text-blue-700">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Jobs
            </Link>
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
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Job Header */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold mb-2">{job.title}</h1>
                    <p className="text-xl text-gray-600 font-medium">{job.company}</p>
                  </div>
                  <Badge variant={job.type === "Internship" ? "secondary" : "default"} className="text-sm">
                    {job.type}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-5 w-5 mr-2" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <DollarSign className="h-5 w-5 mr-2" />
                    <span>{job.salary}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="h-5 w-5 mr-2" />
                    <span>{job.posted}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Briefcase className="h-5 w-5 mr-2" />
                    <span>{job.type}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {job.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex space-x-4">
                  <Button size="lg" onClick={handleApply} className="flex-1 md:flex-none">
                    Apply Now
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => setIsBookmarked(!isBookmarked)}
                    className={isBookmarked ? "bg-blue-50 border-blue-200" : ""}
                  >
                    <BookmarkPlus className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="lg" onClick={handleShare}>
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Job Description */}
            <Card>
              <CardHeader>
                <CardTitle>Job Description</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">{job.description}</p>
                </div>
              </CardContent>
            </Card>

            {/* Responsibilities */}
            <Card>
              <CardHeader>
                <CardTitle>Key Responsibilities</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {job.responsibilities.map((responsibility, index) => (
                    <li key={index} className="flex items-start">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-gray-700">{responsibility}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Requirements */}
            <Card>
              <CardHeader>
                <CardTitle>Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {job.requirements.map((requirement, index) => (
                    <li key={index} className="flex items-start">
                      <span className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-gray-700">{requirement}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Benefits */}
            <Card>
              <CardHeader>
                <CardTitle>Benefits & Perks</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {job.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <span className="w-2 h-2 bg-purple-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Apply Card */}
            <Card>
              <CardContent className="p-6">
                <Button size="lg" className="w-full mb-4" onClick={handleApply}>
                  Apply for this Job
                </Button>
                <div className="text-center text-sm text-gray-600">
                  <p>Ready to take the next step?</p>
                  <p>Apply now and join our team!</p>
                </div>
              </CardContent>
            </Card>

            {/* Company Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Building className="h-5 w-5 mr-2" />
                  About {job.companyInfo.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700 text-sm">{job.companyInfo.description}</p>

                <Separator />

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Industry:</span>
                    <span className="font-medium">{job.companyInfo.industry}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Company Size:</span>
                    <span className="font-medium">{job.companyInfo.size}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Founded:</span>
                    <span className="font-medium">{job.companyInfo.founded}</span>
                  </div>
                </div>

                <Button variant="outline" className="w-full">
                  <Building className="h-4 w-4 mr-2" />
                  View Company Profile
                </Button>
              </CardContent>
            </Card>

            {/* Job Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Job Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Applications:</span>
                  <span className="font-medium">45 candidates</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Views:</span>
                  <span className="font-medium">234 views</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Posted:</span>
                  <span className="font-medium">{job.posted}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

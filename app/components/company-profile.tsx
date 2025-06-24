"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Building, MapPin, Users, Star, ExternalLink, Briefcase } from "lucide-react"

const companies = [
  {
    id: 1,
    name: "TechCorp",
    logo: "/placeholder.svg?height=64&width=64",
    industry: "Technology",
    size: "1000-5000 employees",
    location: "San Francisco, CA",
    rating: 4.5,
    description:
      "Leading technology company focused on innovative solutions that connect people and businesses worldwide.",
    culture: ["Innovation", "Work-Life Balance", "Remote Friendly", "Learning & Development"],
    benefits: ["Health Insurance", "401k Matching", "Flexible PTO", "Stock Options"],
    openJobs: 23,
    founded: 2010,
    website: "https://techcorp.com",
  },
  {
    id: 2,
    name: "StartupXYZ",
    logo: "/placeholder.svg?height=64&width=64",
    industry: "E-commerce",
    size: "50-200 employees",
    location: "New York, NY",
    rating: 4.2,
    description: "Fast-growing e-commerce startup revolutionizing online shopping experiences.",
    culture: ["Fast-paced", "Entrepreneurial", "Team Collaboration", "Growth Mindset"],
    benefits: ["Equity Package", "Unlimited PTO", "Free Meals", "Learning Budget"],
    openJobs: 8,
    founded: 2018,
    website: "https://startupxyz.com",
  },
  {
    id: 3,
    name: "DataFlow Inc",
    logo: "/placeholder.svg?height=64&width=64",
    industry: "Data Analytics",
    size: "200-500 employees",
    location: "Austin, TX",
    rating: 4.7,
    description: "Data analytics company helping businesses make informed decisions through advanced analytics.",
    culture: ["Data-Driven", "Analytical Thinking", "Continuous Learning", "Diversity & Inclusion"],
    benefits: ["Competitive Salary", "Health & Dental", "Professional Development", "Remote Work"],
    openJobs: 15,
    founded: 2015,
    website: "https://dataflow.com",
  },
]

export function CompanyProfiles() {
  const [selectedCompany, setSelectedCompany] = useState<any>(null)

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
      />
    ))
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Company Profiles</h2>
        <p className="text-gray-600">Discover companies and their culture</p>
      </div>

      {!selectedCompany ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {companies.map((company) => (
            <Card key={company.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4 mb-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={company.logo || "/placeholder.svg"} />
                    <AvatarFallback>{company.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{company.name}</h3>
                    <p className="text-sm text-gray-600">{company.industry}</p>
                    <div className="flex items-center space-x-1 mt-1">
                      {renderStars(company.rating)}
                      <span className="text-sm text-gray-600 ml-2">{company.rating}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2" />
                    {company.location}
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2" />
                    {company.size}
                  </div>
                  <div className="flex items-center">
                    <Briefcase className="h-4 w-4 mr-2" />
                    {company.openJobs} open positions
                  </div>
                </div>

                <p className="text-sm text-gray-700 mb-4 line-clamp-3">{company.description}</p>

                <div className="flex flex-wrap gap-1 mb-4">
                  {company.culture.slice(0, 3).map((trait) => (
                    <Badge key={trait} variant="outline" className="text-xs">
                      {trait}
                    </Badge>
                  ))}
                </div>

                <Button className="w-full" onClick={() => setSelectedCompany(company)}>
                  View Company Profile
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          <Button variant="outline" onClick={() => setSelectedCompany(null)}>
            ← Back to Companies
          </Button>

          <Card>
            <CardContent className="p-8">
              <div className="flex items-start space-x-6 mb-6">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={selectedCompany.logo || "/placeholder.svg"} />
                  <AvatarFallback className="text-2xl">{selectedCompany.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h1 className="text-3xl font-bold mb-2">{selectedCompany.name}</h1>
                  <p className="text-lg text-gray-600 mb-3">{selectedCompany.industry}</p>
                  <div className="flex items-center space-x-1 mb-4">
                    {renderStars(selectedCompany.rating)}
                    <span className="text-lg font-medium ml-2">{selectedCompany.rating}</span>
                    <span className="text-gray-600 ml-2">Company Rating</span>
                  </div>
                  <div className="flex space-x-4">
                    <Button>
                      <Briefcase className="h-4 w-4 mr-2" />
                      View Jobs ({selectedCompany.openJobs})
                    </Button>
                    <Button variant="outline">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Visit Website
                    </Button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-gray-600">{selectedCompany.location}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Users className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="font-medium">Company Size</p>
                    <p className="text-gray-600">{selectedCompany.size}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Building className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="font-medium">Founded</p>
                    <p className="text-gray-600">{selectedCompany.founded}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3">About the Company</h3>
                  <p className="text-gray-700 leading-relaxed">{selectedCompany.description}</p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Company Culture</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedCompany.culture.map((trait: string) => (
                      <Badge key={trait} variant="secondary" className="px-3 py-1">
                        {trait}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Benefits & Perks</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {selectedCompany.benefits.map((benefit: string) => (
                      <div key={benefit} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

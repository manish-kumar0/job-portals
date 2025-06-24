"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BarChart3, TrendingUp, Users, Download, Calendar } from "lucide-react"

const analyticsData = {
  jobPostings: {
    total: 156,
    thisMonth: 23,
    growth: 15.2,
  },
  applications: {
    total: 2847,
    thisMonth: 456,
    growth: 8.7,
  },
  hires: {
    total: 89,
    thisMonth: 12,
    growth: 22.1,
  },
  topSkills: [
    { skill: "React", percentage: 85, count: 234 },
    { skill: "JavaScript", percentage: 78, count: 198 },
    { skill: "Python", percentage: 72, count: 167 },
    { skill: "Node.js", percentage: 65, count: 145 },
    { skill: "SQL", percentage: 58, count: 123 },
  ],
  applicationTrends: [
    { month: "Jan", applications: 180, hires: 8 },
    { month: "Feb", applications: 220, hires: 12 },
    { month: "Mar", applications: 280, hires: 15 },
    { month: "Apr", applications: 320, hires: 18 },
    { month: "May", applications: 380, hires: 22 },
    { month: "Jun", applications: 456, hires: 28 },
  ],
  companyStats: [
    { company: "TechCorp", applications: 89, hires: 12, rate: "13.5%" },
    { company: "StartupXYZ", applications: 67, hires: 8, rate: "11.9%" },
    { company: "DataFlow Inc", applications: 54, hires: 6, rate: "11.1%" },
    { company: "WebTech Solutions", applications: 43, hires: 4, rate: "9.3%" },
  ],
}

export function AdvancedAnalytics() {
  const exportData = (format: string) => {
    alert(`Exporting analytics data in ${format} format...`)
  }

  return (
    <div className="space-y-6">
      {/* Header with Export Options */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Advanced Analytics</h2>
          <p className="text-gray-600">Comprehensive insights and reporting</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => exportData("PDF")}>
            <Download className="h-4 w-4 mr-2" />
            Export PDF
          </Button>
          <Button variant="outline" onClick={() => exportData("Excel")}>
            <Download className="h-4 w-4 mr-2" />
            Export Excel
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Job Postings</p>
                <p className="text-3xl font-bold">{analyticsData.jobPostings.total}</p>
                <p className="text-sm text-green-600">+{analyticsData.jobPostings.growth}% this month</p>
              </div>
              <BarChart3 className="h-12 w-12 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Applications</p>
                <p className="text-3xl font-bold">{analyticsData.applications.total}</p>
                <p className="text-sm text-green-600">+{analyticsData.applications.growth}% this month</p>
              </div>
              <Users className="h-12 w-12 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Successful Hires</p>
                <p className="text-3xl font-bold">{analyticsData.hires.total}</p>
                <p className="text-sm text-green-600">+{analyticsData.hires.growth}% this month</p>
              </div>
              <TrendingUp className="h-12 w-12 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Skills Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>Top Skills in Demand</CardTitle>
            <CardDescription>Most requested skills across all job postings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analyticsData.topSkills.map((skill, index) => (
                <div key={skill.skill} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">#{index + 1}</Badge>
                      <span className="font-medium">{skill.skill}</span>
                    </div>
                    <span className="text-sm text-gray-600">{skill.count} jobs</span>
                  </div>
                  <Progress value={skill.percentage} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Application Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Application Trends</CardTitle>
            <CardDescription>Monthly application and hiring statistics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analyticsData.applicationTrends.map((trend) => (
                <div key={trend.month} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span className="font-medium">{trend.month}</span>
                  </div>
                  <div className="flex space-x-4 text-sm">
                    <span className="text-blue-600">{trend.applications} applications</span>
                    <span className="text-green-600">{trend.hires} hires</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Company Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Company Performance</CardTitle>
          <CardDescription>Hiring success rates by company</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3">Company</th>
                  <th className="text-left p-3">Applications</th>
                  <th className="text-left p-3">Hires</th>
                  <th className="text-left p-3">Success Rate</th>
                  <th className="text-left p-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {analyticsData.companyStats.map((company) => (
                  <tr key={company.company} className="border-b hover:bg-gray-50">
                    <td className="p-3 font-medium">{company.company}</td>
                    <td className="p-3">{company.applications}</td>
                    <td className="p-3">{company.hires}</td>
                    <td className="p-3">
                      <Badge variant="outline" className="bg-green-50 text-green-700">
                        {company.rate}
                      </Badge>
                    </td>
                    <td className="p-3">
                      <Badge variant="default">Active</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Real-time Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">24</div>
            <div className="text-sm text-gray-600">Applications Today</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">3</div>
            <div className="text-sm text-gray-600">Interviews Scheduled</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">7</div>
            <div className="text-sm text-gray-600">New Job Postings</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">2</div>
            <div className="text-sm text-gray-600">Offers Extended</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

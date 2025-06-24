"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableRow, TableHeader } from "@/components/ui/table"

// Add these functions at the top of the component
const handleViewProfile = () => {
  window.location.href = "/profile"
}

const handleJobAlerts = () => {
  window.location.href = "/job-alerts"
}

const handleViewApplication = (applicationId: number) => {
  window.location.href = `/applications/${applicationId}`
}

const handleApplyToJob = (jobId: number) => {
  window.location.href = `/jobs/${jobId}/apply`
}

const handleViewJob = (jobId: number) => {
  window.location.href = `/jobs/${jobId}`
}

const applications = [
  {
    id: 1,
    jobTitle: "Software Engineer",
    company: "Google",
    status: "Applied",
  },
  {
    id: 2,
    jobTitle: "Data Scientist",
    company: "Microsoft",
    status: "Interviewing",
  },
]

const recommendedJobs = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "Facebook",
    location: "Menlo Park, CA",
  },
  {
    id: 2,
    title: "Backend Developer",
    company: "Amazon",
    location: "Seattle, WA",
  },
]

export default function StudentDashboard() {
  return (
    <div className="container mx-auto py-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Section */}
        <Card>
          <CardHeader>
            <CardTitle>Your Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <p>View and manage your profile information.</p>
            <Button onClick={handleViewProfile}>View Profile</Button>
          </CardContent>
        </Card>

        {/* Job Alerts Section */}
        <Card>
          <CardHeader>
            <CardTitle>Job Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Manage your job alerts and preferences.</p>
            <Button onClick={handleJobAlerts}>Manage Alerts</Button>
          </CardContent>
        </Card>

        {/* Applications Section */}
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Your Applications</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableCaption>A list of your recent job applications.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Job Title</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {applications.map((app) => (
                  <TableRow key={app.id}>
                    <TableCell>{app.jobTitle}</TableCell>
                    <TableCell>{app.company}</TableCell>
                    <TableCell>{app.status}</TableCell>
                    <TableCell className="text-right">
                      <Button onClick={() => handleViewApplication(app.id)}>View Details</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Recommended Jobs Section */}
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Recommended Jobs</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableCaption>Jobs recommended based on your profile.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recommendedJobs.map((job) => (
                  <TableRow key={job.id}>
                    <TableCell>{job.title}</TableCell>
                    <TableCell>{job.company}</TableCell>
                    <TableCell>{job.location}</TableCell>
                    <TableCell className="text-right">
                      <Button onClick={() => handleApplyToJob(job.id)}>Apply Now</Button>
                      <Button variant="outline" onClick={() => handleViewJob(job.id)}>
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

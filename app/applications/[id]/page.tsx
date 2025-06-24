"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import {
  ArrowLeft,
  Calendar,
  MapPin,
  DollarSign,
  Clock,
  FileText,
  MessageCircle,
  Download,
  Eye,
  Upload,
  AlertTriangle,
} from "lucide-react"

const applicationDetails = {
  1: {
    id: 1,
    jobTitle: "Software Engineer Intern",
    company: "TechCorp",
    appliedDate: "2024-01-15",
    status: "Under Review",
    statusColor: "bg-yellow-500",
    location: "San Francisco, CA",
    salary: "$25/hour",
    type: "Internship",
    applicationStatus: [
      { step: "Application Submitted", date: "Jan 15, 2024", completed: true },
      { step: "Resume Screening", date: "Jan 16, 2024", completed: true },
      { step: "Technical Assessment", date: "Jan 18, 2024", completed: false, current: true },
      { step: "Interview Round 1", date: "TBD", completed: false },
      { step: "Final Decision", date: "TBD", completed: false },
    ],
    submittedDocuments: [
      {
        name: "Resume.pdf",
        uploadDate: "Jan 15, 2024",
        size: "245 KB",
        type: "application/pdf",
        url: "/placeholder-resume.pdf",
      },
      {
        name: "Cover Letter.pdf",
        uploadDate: "Jan 15, 2024",
        size: "156 KB",
        type: "application/pdf",
        url: "/placeholder-cover-letter.pdf",
      },
    ],
    notes: "Your application has been reviewed by our HR team. You will be contacted soon for the next steps.",
    contactPerson: {
      name: "Sarah Johnson",
      role: "HR Manager",
      email: "sarah.johnson@techcorp.com",
      phone: "+1 (555) 987-6543",
    },
  },
}

export default function ApplicationDetailPage() {
  const params = useParams()
  const applicationId = Number.parseInt(params?.id as string)
  const [showMessageDialog, setShowMessageDialog] = useState(false)
  const [showWithdrawDialog, setShowWithdrawDialog] = useState(false)
  const [message, setMessage] = useState("")
  const [withdrawReason, setWithdrawReason] = useState("")
  const [documentViewer, setDocumentViewer] = useState<{ show: boolean; doc: any }>({ show: false, doc: null })

  const application = applicationDetails[applicationId as keyof typeof applicationDetails]

  if (!application) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card>
          <CardContent className="p-12 text-center">
            <h2 className="text-2xl font-bold mb-4">Application Not Found</h2>
            <p className="text-gray-600 mb-6">The application you're looking for doesn't exist.</p>
            <Link href="/dashboard/student">
              <Button>Back to Dashboard</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  const handleContactHR = () => {
    setShowMessageDialog(true)
  }

  const handleSendMessage = () => {
    if (!message.trim()) {
      toast({
        title: "Error",
        description: "Please enter a message",
        variant: "destructive",
      })
      return
    }

    // Simulate sending message
    toast({
      title: "Message Sent!",
      description: `Your message has been sent to ${application.contactPerson.name}`,
    })
    setMessage("")
    setShowMessageDialog(false)
  }

  const handleWithdrawApplication = () => {
    if (!withdrawReason.trim()) {
      toast({
        title: "Error",
        description: "Please provide a reason for withdrawal",
        variant: "destructive",
      })
      return
    }

    // Simulate withdrawal
    toast({
      title: "Application Withdrawn",
      description: "Your application has been successfully withdrawn",
    })
    setWithdrawReason("")
    setShowWithdrawDialog(false)
  }

  const handleViewDocument = (doc: any) => {
    setDocumentViewer({ show: true, doc })
  }

  const handleDownloadDocument = (doc: any) => {
    // Simulate download
    toast({
      title: "Download Started",
      description: `Downloading ${doc.name}...`,
    })

    // Create a temporary download link
    const link = document.createElement("a")
    link.href = doc.url
    link.download = doc.name
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleUpdateDocuments = () => {
    toast({
      title: "Feature Coming Soon",
      description: "Document update feature will be available soon",
    })
  }

  const handleViewJobDetails = () => {
    window.open(`/jobs/${application.id}`, "_blank")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/dashboard/student" className="flex items-center text-blue-600 hover:text-blue-700">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Application Details</h1>
            <div className="w-32"></div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Application Header */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">{application.jobTitle}</h2>
                    <p className="text-lg text-gray-600">{application.company}</p>
                  </div>
                  <Badge className={`${application.statusColor} text-white`}>{application.status}</Badge>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span className="text-sm">{application.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <DollarSign className="h-4 w-4 mr-2" />
                    <span className="text-sm">{application.salary}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="h-4 w-4 mr-2" />
                    <span className="text-sm">{application.type}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span className="text-sm">Applied {application.appliedDate}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Button onClick={handleContactHR}>
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Contact HR
                  </Button>
                  <Button variant="outline" onClick={handleViewJobDetails}>
                    <FileText className="h-4 w-4 mr-2" />
                    View Job Details
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Application Timeline */}
            <Card>
              <CardHeader>
                <CardTitle>Application Progress</CardTitle>
                <CardDescription>Track your application status through each stage</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {application.applicationStatus.map((step, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div
                        className={`w-4 h-4 rounded-full mt-1 ${
                          step.completed ? "bg-green-500" : step.current ? "bg-blue-500 animate-pulse" : "bg-gray-300"
                        }`}
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4
                            className={`font-medium ${
                              step.current ? "text-blue-600" : step.completed ? "text-green-600" : "text-gray-500"
                            }`}
                          >
                            {step.step}
                          </h4>
                          <span className="text-sm text-gray-500">{step.date}</span>
                        </div>
                        {step.current && (
                          <p className="text-sm text-blue-600 mt-1 font-medium">Currently in progress</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Submitted Documents */}
            <Card>
              <CardHeader>
                <CardTitle>Submitted Documents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {application.submittedDocuments.map((doc, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <FileText className="h-6 w-6 text-red-500" />
                        <div>
                          <p className="font-medium">{doc.name}</p>
                          <p className="text-sm text-gray-500">
                            Uploaded on {doc.uploadDate} • {doc.size}
                          </p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewDocument(doc)}
                          className="hover:bg-blue-50"
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDownloadDocument(doc)}
                          className="hover:bg-green-50"
                        >
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Notes */}
            <Card>
              <CardHeader>
                <CardTitle>Notes from Recruiter</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                  <p className="text-gray-700">{application.notes}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full" onClick={handleContactHR}>
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Message Recruiter
                </Button>
                <Button
                  variant="outline"
                  className="w-full text-red-600 hover:bg-red-50"
                  onClick={() => setShowWithdrawDialog(true)}
                >
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Withdraw Application
                </Button>
                <Button variant="outline" className="w-full" onClick={handleUpdateDocuments}>
                  <Upload className="h-4 w-4 mr-2" />
                  Update Documents
                </Button>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Person</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <p className="font-medium">{application.contactPerson.name}</p>
                    <p className="text-sm text-gray-600">{application.contactPerson.role}</p>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <div>
                      <p className="text-sm text-gray-600">Email</p>
                      <p
                        className="font-medium text-blue-600 cursor-pointer hover:underline"
                        onClick={() => window.open(`mailto:${application.contactPerson.email}`)}
                      >
                        {application.contactPerson.email}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Phone</p>
                      <p
                        className="font-medium text-blue-600 cursor-pointer hover:underline"
                        onClick={() => window.open(`tel:${application.contactPerson.phone}`)}
                      >
                        {application.contactPerson.phone}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Application Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Application Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Application ID:</span>
                    <span className="font-medium">#{application.id.toString().padStart(6, "0")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Days since applied:</span>
                    <span className="font-medium">8 days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total applicants:</span>
                    <span className="font-medium">45 candidates</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Your rank:</span>
                    <span className="font-medium text-green-600">#12</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Message Dialog */}
      <Dialog open={showMessageDialog} onOpenChange={setShowMessageDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Send Message to {application.contactPerson.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="message">Your Message</Label>
              <Textarea
                id="message"
                placeholder="Type your message here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowMessageDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleSendMessage}>Send Message</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Withdraw Dialog */}
      <Dialog open={showWithdrawDialog} onOpenChange={setShowWithdrawDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-red-600">Withdraw Application</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Are you sure you want to withdraw your application? This action cannot be undone.
            </p>
            <div>
              <Label htmlFor="reason">Reason for withdrawal (optional)</Label>
              <Textarea
                id="reason"
                placeholder="Please provide a reason..."
                value={withdrawReason}
                onChange={(e) => setWithdrawReason(e.target.value)}
                rows={3}
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowWithdrawDialog(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleWithdrawApplication}>
                Withdraw Application
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Document Viewer Dialog */}
      <Dialog open={documentViewer.show} onOpenChange={(open) => setDocumentViewer({ show: open, doc: null })}>
        <DialogContent className="sm:max-w-4xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>Document Viewer - {documentViewer.doc?.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {documentViewer.doc && (
              <div className="border rounded-lg p-8 bg-gray-50 text-center min-h-[400px] flex items-center justify-center">
                <div className="space-y-4">
                  <FileText className="h-16 w-16 text-gray-400 mx-auto" />
                  <div>
                    <h3 className="text-lg font-medium">{documentViewer.doc.name}</h3>
                    <p className="text-gray-600">Size: {documentViewer.doc.size}</p>
                    <p className="text-gray-600">Uploaded: {documentViewer.doc.uploadDate}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-500">Document preview is not available in this demo.</p>
                    <Button onClick={() => handleDownloadDocument(documentViewer.doc)}>
                      <Download className="h-4 w-4 mr-2" />
                      Download to View
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

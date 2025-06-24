"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import {
  ArrowLeft,
  CheckCircle,
  XCircle,
  Shield,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Building,
  Download,
  Eye,
  AlertTriangle,
  UserCheck,
  UserX,
  Ban,
  History,
  FileText,
  Send,
} from "lucide-react"

const userDetails = {
  1: {
    id: 1,
    name: "Sarah Wilson",
    email: "sarah.wilson@company.com",
    phone: "+1 (555) 987-6543",
    role: "Recruiter",
    company: "TechCorp Inc",
    location: "San Francisco, CA",
    registeredDate: "2024-01-20",
    status: "Pending",
    avatar: "/placeholder.svg?height=120&width=120",
    verificationDocuments: [
      { name: "Company ID.pdf", uploadDate: "Jan 20, 2024", url: "/documents/company-id.pdf" },
      { name: "Business License.pdf", uploadDate: "Jan 20, 2024", url: "/documents/business-license.pdf" },
    ],
    activityLog: [
      { action: "Account created", timestamp: "Jan 20, 2024 10:30 AM" },
      { action: "Email verification completed", timestamp: "Jan 20, 2024 10:35 AM" },
      { action: "Documents uploaded", timestamp: "Jan 20, 2024 11:00 AM" },
      { action: "Pending admin approval", timestamp: "Jan 20, 2024 11:05 AM" },
    ],
    companyInfo: {
      name: "TechCorp Inc",
      industry: "Technology",
      size: "1000-5000 employees",
      website: "https://techcorp.com",
      description: "Leading technology company focused on innovative solutions",
    },
  },
  2: {
    id: 2,
    name: "John Smith",
    email: "john@student.edu",
    phone: "+1 (555) 123-4567",
    role: "Student",
    company: "University",
    location: "New York, NY",
    registeredDate: "2024-01-15",
    status: "Active",
    avatar: "/placeholder.svg?height=120&width=120",
    verificationDocuments: [{ name: "Student ID.pdf", uploadDate: "Jan 15, 2024", url: "/documents/student-id.pdf" }],
    activityLog: [
      { action: "Account created", timestamp: "Jan 15, 2024 09:00 AM" },
      { action: "Profile completed", timestamp: "Jan 15, 2024 09:30 AM" },
    ],
    companyInfo: null,
  },
}

export default function UserDetailPage() {
  const params = useParams()
  const userId = Number.parseInt(params?.id as string)
  const { toast } = useToast()

  const [userStatus, setUserStatus] = useState(userDetails[userId as keyof typeof userDetails]?.status || "Pending")
  const [isApproveDialogOpen, setIsApproveDialogOpen] = useState(false)
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false)
  const [isSuspendDialogOpen, setIsSuspendDialogOpen] = useState(false)
  const [isEmailDialogOpen, setIsEmailDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [emailSubject, setEmailSubject] = useState("")
  const [emailMessage, setEmailMessage] = useState("")
  const [suspendReason, setSuspendReason] = useState("")
  const [rejectReason, setRejectReason] = useState("")
  const [deleteReason, setDeleteReason] = useState("")

  const user = userDetails[userId as keyof typeof userDetails]

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card>
          <CardContent className="p-12 text-center">
            <h2 className="text-2xl font-bold mb-4">User Not Found</h2>
            <p className="text-gray-600 mb-6">The user you're looking for doesn't exist.</p>
            <Link href="/dashboard/admin">
              <Button>Back to Admin Dashboard</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Admin Action Handlers
  const handleApprove = () => {
    setUserStatus("Approved")
    setIsApproveDialogOpen(false)
    toast({
      title: "User Approved! ✅",
      description: `${user.name} has been approved and can now access the platform.`,
    })
  }

  const handleReject = () => {
    if (!rejectReason.trim()) {
      toast({
        title: "Error",
        description: "Please provide a reason for rejection.",
        variant: "destructive",
      })
      return
    }
    setUserStatus("Rejected")
    setIsRejectDialogOpen(false)
    setRejectReason("")
    toast({
      title: "User Rejected ❌",
      description: `${user.name} has been rejected. Reason: ${rejectReason}`,
      variant: "destructive",
    })
  }

  const handleSuspend = () => {
    if (!suspendReason.trim()) {
      toast({
        title: "Error",
        description: "Please provide a reason for suspension.",
        variant: "destructive",
      })
      return
    }
    setUserStatus("Suspended")
    setIsSuspendDialogOpen(false)
    setSuspendReason("")
    toast({
      title: "Account Suspended ⚠️",
      description: `${user.name}'s account has been suspended. Reason: ${suspendReason}`,
    })
  }

  const handleSendEmail = () => {
    if (!emailSubject.trim() || !emailMessage.trim()) {
      toast({
        title: "Error",
        description: "Please fill in both subject and message fields.",
        variant: "destructive",
      })
      return
    }
    setIsEmailDialogOpen(false)
    setEmailSubject("")
    setEmailMessage("")
    toast({
      title: "Email Sent! 📧",
      description: `Email "${emailSubject}" has been sent to ${user.email}`,
    })
  }

  const handleDeleteUser = () => {
    if (!deleteReason.trim()) {
      toast({
        title: "Error",
        description: "Please provide a reason for deletion.",
        variant: "destructive",
      })
      return
    }
    setIsDeleteDialogOpen(false)
    setDeleteReason("")
    toast({
      title: "User Deleted! 🗑️",
      description: `${user.name}'s account has been permanently deleted.`,
      variant: "destructive",
    })
    // In real app, redirect to admin dashboard
    setTimeout(() => {
      window.location.href = "/dashboard/admin"
    }, 2000)
  }

  const handleViewDocument = (docName: string) => {
    toast({
      title: "Document Viewer 📄",
      description: `Opening ${docName} in document viewer...`,
    })
    // In real app, this would open a document viewer modal
  }

  const handleDownloadDocument = (docName: string, url: string) => {
    toast({
      title: "Download Started 📥",
      description: `Downloading ${docName}...`,
    })
    // Simulate file download
    const link = document.createElement("a")
    link.href = url
    link.download = docName
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleRequestMoreInfo = () => {
    toast({
      title: "Information Request Sent 📋",
      description: `A request for additional information has been sent to ${user.name}`,
    })
  }

  const handleViewFullHistory = () => {
    toast({
      title: "Loading Full History 📊",
      description: "Opening complete activity history...",
    })
    // In real app, this would navigate to full history page
  }

  const handleReactivateUser = () => {
    setUserStatus("Active")
    toast({
      title: "User Reactivated! ✅",
      description: `${user.name}'s account has been reactivated.`,
    })
  }

  const handleBanUser = () => {
    setUserStatus("Banned")
    toast({
      title: "User Banned! 🚫",
      description: `${user.name}'s account has been permanently banned.`,
      variant: "destructive",
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/dashboard/admin" className="flex items-center text-blue-600 hover:text-blue-700">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Admin Dashboard
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">User Details</h1>
            <div className="w-32"></div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* User Header */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start space-x-6 mb-6">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={user.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="text-2xl">
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-2">{user.name}</h2>
                    <div className="flex items-center space-x-3 mb-3">
                      <Badge variant="outline">{user.role}</Badge>
                      <Badge
                        className={
                          userStatus === "Pending"
                            ? "bg-yellow-500"
                            : userStatus === "Approved" || userStatus === "Active"
                              ? "bg-green-500"
                              : userStatus === "Rejected"
                                ? "bg-red-500"
                                : userStatus === "Suspended"
                                  ? "bg-orange-500"
                                  : userStatus === "Banned"
                                    ? "bg-red-800"
                                    : "bg-gray-500"
                        }
                      >
                        {userStatus}
                      </Badge>
                    </div>
                    <p className="text-gray-600">{user.company}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <span className="text-sm">{user.email}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <span className="text-sm">{user.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span className="text-sm">{user.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span className="text-sm">Registered {user.registeredDate}</span>
                  </div>
                </div>

                {/* Action Buttons Based on Status */}
                <div className="flex flex-wrap gap-3">
                  {userStatus === "Pending" && (
                    <>
                      <Dialog open={isApproveDialogOpen} onOpenChange={setIsApproveDialogOpen}>
                        <DialogTrigger asChild>
                          <Button className="bg-green-600 hover:bg-green-700">
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Approve User
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Approve User Account</DialogTitle>
                            <DialogDescription>
                              Are you sure you want to approve {user.name}'s account? They will gain full access to the
                              platform.
                            </DialogDescription>
                          </DialogHeader>
                          <DialogFooter>
                            <Button variant="outline" onClick={() => setIsApproveDialogOpen(false)}>
                              Cancel
                            </Button>
                            <Button onClick={handleApprove} className="bg-green-600 hover:bg-green-700">
                              <UserCheck className="h-4 w-4 mr-2" />
                              Approve Account
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>

                      <Dialog open={isRejectDialogOpen} onOpenChange={setIsRejectDialogOpen}>
                        <DialogTrigger asChild>
                          <Button variant="outline" className="text-red-600 border-red-600 hover:bg-red-50">
                            <XCircle className="h-4 w-4 mr-2" />
                            Reject User
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Reject User Account</DialogTitle>
                            <DialogDescription>
                              Please provide a reason for rejecting {user.name}'s account.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <Label htmlFor="reject-reason">Rejection Reason</Label>
                              <Textarea
                                id="reject-reason"
                                placeholder="Enter reason for rejection..."
                                value={rejectReason}
                                onChange={(e) => setRejectReason(e.target.value)}
                              />
                            </div>
                          </div>
                          <DialogFooter>
                            <Button variant="outline" onClick={() => setIsRejectDialogOpen(false)}>
                              Cancel
                            </Button>
                            <Button onClick={handleReject} variant="destructive">
                              <UserX className="h-4 w-4 mr-2" />
                              Reject Account
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </>
                  )}

                  {(userStatus === "Active" || userStatus === "Approved") && (
                    <Dialog open={isSuspendDialogOpen} onOpenChange={setIsSuspendDialogOpen}>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="text-orange-600 border-orange-600 hover:bg-orange-50">
                          <Shield className="h-4 w-4 mr-2" />
                          Suspend Account
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Suspend User Account</DialogTitle>
                          <DialogDescription>
                            Please provide a reason for suspending {user.name}'s account.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="suspend-reason">Suspension Reason</Label>
                            <Textarea
                              id="suspend-reason"
                              placeholder="Enter reason for suspension..."
                              value={suspendReason}
                              onChange={(e) => setSuspendReason(e.target.value)}
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setIsSuspendDialogOpen(false)}>
                            Cancel
                          </Button>
                          <Button onClick={handleSuspend} variant="destructive">
                            <AlertTriangle className="h-4 w-4 mr-2" />
                            Suspend Account
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  )}

                  {userStatus === "Suspended" && (
                    <Button onClick={handleReactivateUser} className="bg-green-600 hover:bg-green-700">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Reactivate Account
                    </Button>
                  )}

                  <Button variant="outline" onClick={handleRequestMoreInfo}>
                    <FileText className="h-4 w-4 mr-2" />
                    Request More Info
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Company Information */}
            {user.role === "Recruiter" && user.companyInfo && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Building className="h-5 w-5 mr-2" />
                    Company Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Company Name</p>
                        <p className="font-medium">{user.companyInfo.name}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Industry</p>
                        <p className="font-medium">{user.companyInfo.industry}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Company Size</p>
                        <p className="font-medium">{user.companyInfo.size}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Website</p>
                        <a
                          href={user.companyInfo.website}
                          className="text-blue-600 hover:underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {user.companyInfo.website}
                        </a>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-2">Description</p>
                      <p className="text-gray-700">{user.companyInfo.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Verification Documents */}
            <Card>
              <CardHeader>
                <CardTitle>Verification Documents</CardTitle>
                <CardDescription>Documents submitted for account verification</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {user.verificationDocuments.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{doc.name}</p>
                        <p className="text-sm text-gray-500">Uploaded on {doc.uploadDate}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" onClick={() => handleViewDocument(doc.name)}>
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleDownloadDocument(doc.name, doc.url)}>
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Activity Log */}
            <Card>
              <CardHeader>
                <CardTitle>Activity Log</CardTitle>
                <CardDescription>Recent account activity and changes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {user.activityLog.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
                      <div className="flex-1">
                        <p className="font-medium">{activity.action}</p>
                        <p className="text-sm text-gray-500">{activity.timestamp}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Admin Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {userStatus === "Pending" && (
                  <>
                    <Dialog open={isApproveDialogOpen} onOpenChange={setIsApproveDialogOpen}>
                      <DialogTrigger asChild>
                        <Button className="w-full bg-green-600 hover:bg-green-700">
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Approve Account
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Approve User Account</DialogTitle>
                          <DialogDescription>Are you sure you want to approve {user.name}'s account?</DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setIsApproveDialogOpen(false)}>
                            Cancel
                          </Button>
                          <Button onClick={handleApprove} className="bg-green-600 hover:bg-green-700">
                            <UserCheck className="h-4 w-4 mr-2" />
                            Approve Account
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>

                    <Dialog open={isRejectDialogOpen} onOpenChange={setIsRejectDialogOpen}>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="w-full text-red-600">
                          <XCircle className="h-4 w-4 mr-2" />
                          Reject Account
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Reject User Account</DialogTitle>
                          <DialogDescription>
                            Please provide a reason for rejecting {user.name}'s account.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="reject-reason-sidebar">Rejection Reason</Label>
                            <Textarea
                              id="reject-reason-sidebar"
                              placeholder="Enter reason for rejection..."
                              value={rejectReason}
                              onChange={(e) => setRejectReason(e.target.value)}
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setIsRejectDialogOpen(false)}>
                            Cancel
                          </Button>
                          <Button onClick={handleReject} variant="destructive">
                            <UserX className="h-4 w-4 mr-2" />
                            Reject Account
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </>
                )}

                {userStatus === "Suspended" && (
                  <Button onClick={handleReactivateUser} className="w-full bg-green-600 hover:bg-green-700">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Reactivate Account
                  </Button>
                )}

                <Dialog open={isEmailDialogOpen} onOpenChange={setIsEmailDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full">
                      <Mail className="h-4 w-4 mr-2" />
                      Send Email
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Send Email to {user.name}</DialogTitle>
                      <DialogDescription>Compose an email message to send to {user.email}</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="email-subject">Subject</Label>
                        <Input
                          id="email-subject"
                          placeholder="Email subject..."
                          value={emailSubject}
                          onChange={(e) => setEmailSubject(e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="email-message">Message</Label>
                        <Textarea
                          id="email-message"
                          placeholder="Enter your message..."
                          value={emailMessage}
                          onChange={(e) => setEmailMessage(e.target.value)}
                          rows={5}
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsEmailDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleSendEmail}>
                        <Send className="h-4 w-4 mr-2" />
                        Send Email
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                {(userStatus === "Active" || userStatus === "Approved") && (
                  <Dialog open={isSuspendDialogOpen} onOpenChange={setIsSuspendDialogOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="w-full">
                        <Shield className="h-4 w-4 mr-2" />
                        Suspend Account
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Suspend User Account</DialogTitle>
                        <DialogDescription>
                          Please provide a reason for suspending {user.name}'s account.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="suspend-reason-sidebar">Suspension Reason</Label>
                          <Textarea
                            id="suspend-reason-sidebar"
                            placeholder="Enter reason for suspension..."
                            value={suspendReason}
                            onChange={(e) => setSuspendReason(e.target.value)}
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsSuspendDialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleSuspend} variant="destructive">
                          <AlertTriangle className="h-4 w-4 mr-2" />
                          Suspend Account
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                )}

                <Button variant="outline" className="w-full" onClick={handleBanUser}>
                  <Ban className="h-4 w-4 mr-2" />
                  Ban User
                </Button>

                <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full text-red-600">
                      <XCircle className="h-4 w-4 mr-2" />
                      Delete User
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Delete User Account</DialogTitle>
                      <DialogDescription>
                        This action cannot be undone. Please provide a reason for deleting {user.name}'s account.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="delete-reason">Deletion Reason</Label>
                        <Textarea
                          id="delete-reason"
                          placeholder="Enter reason for deletion..."
                          value={deleteReason}
                          onChange={(e) => setDeleteReason(e.target.value)}
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleDeleteUser} variant="destructive">
                        <XCircle className="h-4 w-4 mr-2" />
                        Delete Account
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <Button variant="outline" className="w-full" onClick={handleViewFullHistory}>
                  <History className="h-4 w-4 mr-2" />
                  View Full History
                </Button>
              </CardContent>
            </Card>

            {/* Account Status */}
            <Card>
              <CardHeader>
                <CardTitle>Account Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Status</span>
                    <Badge
                      className={
                        userStatus === "Pending"
                          ? "bg-yellow-500"
                          : userStatus === "Approved" || userStatus === "Active"
                            ? "bg-green-500"
                            : userStatus === "Rejected"
                              ? "bg-red-500"
                              : userStatus === "Suspended"
                                ? "bg-orange-500"
                                : userStatus === "Banned"
                                  ? "bg-red-800"
                                  : "bg-gray-500"
                      }
                    >
                      {userStatus}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Email Verified</span>
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Documents</span>
                    <span className="text-sm font-medium">{user.verificationDocuments.length} uploaded</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Account Type</span>
                    <span className="text-sm font-medium">{user.role}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Risk Assessment */}
            <Card>
              <CardHeader>
                <CardTitle>Risk Assessment</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Risk Level</span>
                    <Badge variant="outline" className="bg-green-50 text-green-700">
                      Low
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Verification Score</span>
                    <span className="text-sm font-medium">95/100</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Trust Score</span>
                    <span className="text-sm font-medium">High</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

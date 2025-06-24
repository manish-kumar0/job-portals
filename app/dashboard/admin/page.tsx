"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"
import {
  Users,
  Briefcase,
  Building2,
  TrendingUp,
  CheckCircle,
  XCircle,
  Eye,
  Mail,
  Shield,
  AlertTriangle,
  UserCheck,
  UserX,
  Search,
  Download,
  RefreshCw,
  Settings,
  Database,
  FileText,
  BarChart3,
  Bell,
  Lock,
  Server,
  Activity,
  Zap,
} from "lucide-react"

const mockUsers = [
  {
    id: 1,
    name: "Sarah Wilson",
    email: "sarah@techcorp.com",
    role: "Recruiter",
    status: "Pending",
    company: "TechCorp Inc",
    joinDate: "2024-01-20",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    name: "John Smith",
    email: "john@student.edu",
    role: "Student",
    status: "Active",
    company: "University",
    joinDate: "2024-01-15",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike@startup.com",
    role: "Recruiter",
    status: "Suspended",
    company: "StartupCo",
    joinDate: "2024-01-10",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

const mockJobs = [
  {
    id: 1,
    title: "Software Engineer",
    company: "TechCorp Inc",
    status: "Active",
    applications: 45,
    postedDate: "2024-01-20",
  },
  {
    id: 2,
    title: "Data Scientist",
    company: "DataCorp",
    status: "Closed",
    applications: 32,
    postedDate: "2024-01-18",
  },
]

export default function AdminDashboard() {
  const { toast } = useToast()
  const [users, setUsers] = useState(mockUsers)
  const [jobs, setJobs] = useState(mockJobs)
  const [searchTerm, setSearchTerm] = useState("")

  // Dialog States
  const [isSystemDialogOpen, setIsSystemDialogOpen] = useState(false)
  const [isEmailDialogOpen, setIsEmailDialogOpen] = useState(false)
  const [isAnalyticsDialogOpen, setIsAnalyticsDialogOpen] = useState(false)
  const [isSettingsDialogOpen, setIsSettingsDialogOpen] = useState(false)
  const [isReportDialogOpen, setIsReportDialogOpen] = useState(false)

  // Form States
  const [emailSubject, setEmailSubject] = useState("")
  const [emailMessage, setEmailMessage] = useState("")
  const [selectedUsers, setSelectedUsers] = useState<number[]>([])
  const [reportType, setReportType] = useState("users")
  const [reportDateRange, setReportDateRange] = useState("last-30-days")

  // Settings States
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    maintenanceMode: false,
    userRegistration: true,
    jobPosting: true,
    autoApproval: false,
  })

  // User Management Functions
  const handleApproveUser = (userId: number) => {
    setUsers(users.map((user) => (user.id === userId ? { ...user, status: "Active" } : user)))
    const user = users.find((u) => u.id === userId)
    toast({
      title: "User Approved! ✅",
      description: `${user?.name} has been approved and can now access the platform.`,
    })
  }

  const handleRejectUser = (userId: number) => {
    setUsers(users.map((user) => (user.id === userId ? { ...user, status: "Rejected" } : user)))
    const user = users.find((u) => u.id === userId)
    toast({
      title: "User Rejected ❌",
      description: `${user?.name}'s account has been rejected.`,
      variant: "destructive",
    })
  }

  const handleSuspendUser = (userId: number) => {
    setUsers(users.map((user) => (user.id === userId ? { ...user, status: "Suspended" } : user)))
    const user = users.find((u) => u.id === userId)
    toast({
      title: "User Suspended ⚠️",
      description: `${user?.name}'s account has been suspended.`,
    })
  }

  const handleDeleteUser = (userId: number) => {
    setUsers(users.filter((user) => user.id !== userId))
    const user = users.find((u) => u.id === userId)
    toast({
      title: "User Deleted 🗑️",
      description: `${user?.name}'s account has been permanently deleted.`,
      variant: "destructive",
    })
  }

  // Job Management Functions
  const handleApproveJob = (jobId: number) => {
    setJobs(jobs.map((job) => (job.id === jobId ? { ...job, status: "Active" } : job)))
    const job = jobs.find((j) => j.id === jobId)
    toast({
      title: "Job Approved! ✅",
      description: `"${job?.title}" has been approved and is now live.`,
    })
  }

  const handleRejectJob = (jobId: number) => {
    setJobs(jobs.map((job) => (job.id === jobId ? { ...job, status: "Rejected" } : job)))
    const job = jobs.find((j) => j.id === jobId)
    toast({
      title: "Job Rejected ❌",
      description: `"${job?.title}" has been rejected.`,
      variant: "destructive",
    })
  }

  const handleDeleteJob = (jobId: number) => {
    setJobs(jobs.filter((job) => job.id !== jobId))
    const job = jobs.find((j) => j.id === jobId)
    toast({
      title: "Job Deleted 🗑️",
      description: `"${job?.title}" has been permanently deleted.`,
      variant: "destructive",
    })
  }

  // System Functions
  const handleGenerateReport = () => {
    setIsReportDialogOpen(true)
  }

  const handleCreateReport = () => {
    setIsReportDialogOpen(false)
    toast({
      title: "Report Generated! 📊",
      description: `${reportType} report for ${reportDateRange} has been generated and is ready for download.`,
    })
    setReportType("users")
    setReportDateRange("last-30-days")
  }

  const handleExportData = () => {
    toast({
      title: "Data Export Started 📥",
      description: "Exporting all system data. This may take a few minutes.",
    })
    // Simulate export progress
    setTimeout(() => {
      toast({
        title: "Export Complete! ✅",
        description: "Data export has been completed. Download link sent to your email.",
      })
    }, 3000)
  }

  const handleBackupDatabase = () => {
    toast({
      title: "Database Backup Started 💾",
      description: "Creating database backup. You'll be notified when complete.",
    })
    // Simulate backup progress
    setTimeout(() => {
      toast({
        title: "Backup Complete! ✅",
        description: "Database backup has been created successfully.",
      })
    }, 5000)
  }

  const handleClearCache = () => {
    toast({
      title: "Clearing Cache... 🧹",
      description: "System cache is being cleared.",
    })
    // Simulate cache clearing
    setTimeout(() => {
      toast({
        title: "Cache Cleared! ✅",
        description: "System cache has been cleared successfully. Performance improved!",
      })
    }, 2000)
  }

  const handleRestartServer = () => {
    toast({
      title: "Server Restart Initiated 🔄",
      description: "Server is restarting. This may take a few minutes.",
    })
    // Simulate server restart
    setTimeout(() => {
      toast({
        title: "Server Restarted! ✅",
        description: "Server has been restarted successfully.",
      })
    }, 4000)
  }

  const handleSendBulkEmail = () => {
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
      title: "Bulk Email Sent! 📧",
      description: `Email "${emailSubject}" sent to all users successfully.`,
    })
  }

  const handleViewAnalytics = () => {
    setIsAnalyticsDialogOpen(true)
  }

  const handleSystemSettings = () => {
    setIsSettingsDialogOpen(true)
  }

  const handleSaveSettings = () => {
    setIsSettingsDialogOpen(false)
    toast({
      title: "Settings Saved! ⚙️",
      description: "System settings have been updated successfully.",
    })
  }

  const handleSettingChange = (key: string, value: boolean) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
    toast({
      title: "Setting Updated",
      description: `${key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())} has been ${value ? "enabled" : "disabled"}.`,
    })
  }

  // System Health Functions
  const handleCheckSystemHealth = () => {
    toast({
      title: "System Health Check Started 🔍",
      description: "Running comprehensive system diagnostics...",
    })
    setTimeout(() => {
      toast({
        title: "System Health: Excellent! ✅",
        description: "All systems are running optimally. No issues detected.",
      })
    }, 3000)
  }

  const handleViewSystemLogs = () => {
    toast({
      title: "Loading System Logs 📋",
      description: "Opening system logs viewer...",
    })
  }

  const handleManagePermissions = () => {
    toast({
      title: "Permission Manager 🔐",
      description: "Opening user permissions management panel...",
    })
  }

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.company.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <div className="flex items-center space-x-4">
              <Button onClick={handleViewAnalytics} variant="outline">
                <BarChart3 className="h-4 w-4 mr-2" />
                Analytics
              </Button>
              <Button onClick={handleSystemSettings} variant="outline">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <Button onClick={handleCheckSystemHealth} variant="outline">
                <Activity className="h-4 w-4 mr-2" />
                Health Check
              </Button>
              <Link href="/">
                <Button variant="outline">Back to Home</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => toast({ title: "Users Overview", description: "Total registered users: 2,847" })}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,847</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>

          <Card
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => toast({ title: "Jobs Overview", description: "Active job postings: 1,234" })}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Jobs</CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,234</div>
              <p className="text-xs text-muted-foreground">+8% from last month</p>
            </CardContent>
          </Card>

          <Card
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => toast({ title: "Companies Overview", description: "Registered companies: 456" })}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Companies</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">456</div>
              <p className="text-xs text-muted-foreground">+15% from last month</p>
            </CardContent>
          </Card>

          <Card
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => toast({ title: "Applications Overview", description: "Total applications: 8,921" })}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Applications</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8,921</div>
              <p className="text-xs text-muted-foreground">+23% from last month</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Frequently used admin functions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              <Button
                onClick={handleGenerateReport}
                className="flex flex-col h-20 hover:scale-105 transition-transform"
              >
                <FileText className="h-6 w-6 mb-2" />
                <span className="text-xs">Generate Report</span>
              </Button>
              <Button
                onClick={handleExportData}
                variant="outline"
                className="flex flex-col h-20 hover:scale-105 transition-transform"
              >
                <Download className="h-6 w-6 mb-2" />
                <span className="text-xs">Export Data</span>
              </Button>
              <Button
                onClick={handleBackupDatabase}
                variant="outline"
                className="flex flex-col h-20 hover:scale-105 transition-transform"
              >
                <Database className="h-6 w-6 mb-2" />
                <span className="text-xs">Backup DB</span>
              </Button>
              <Button
                onClick={handleClearCache}
                variant="outline"
                className="flex flex-col h-20 hover:scale-105 transition-transform"
              >
                <RefreshCw className="h-6 w-6 mb-2" />
                <span className="text-xs">Clear Cache</span>
              </Button>
              <Button
                onClick={handleRestartServer}
                variant="outline"
                className="flex flex-col h-20 hover:scale-105 transition-transform"
              >
                <Server className="h-6 w-6 mb-2" />
                <span className="text-xs">Restart Server</span>
              </Button>
              <Dialog open={isEmailDialogOpen} onOpenChange={setIsEmailDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="flex flex-col h-20 hover:scale-105 transition-transform">
                    <Mail className="h-6 w-6 mb-2" />
                    <span className="text-xs">Bulk Email</span>
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Send Bulk Email</DialogTitle>
                    <DialogDescription>Send email to all users</DialogDescription>
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
                        placeholder="Email message..."
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
                    <Button onClick={handleSendBulkEmail}>Send Email</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* User Management */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>User Management</CardTitle>
                  <CardDescription>Manage user accounts and permissions</CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <Button onClick={handleManagePermissions} variant="outline" size="sm">
                    <Lock className="h-4 w-4 mr-2" />
                    Permissions
                  </Button>
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search users..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-8 w-64"
                    />
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={user.avatar || "/placeholder.svg"} />
                            <AvatarFallback>
                              {user.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-sm text-gray-500">{user.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{user.role}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={
                            user.status === "Active"
                              ? "bg-green-500"
                              : user.status === "Pending"
                                ? "bg-yellow-500"
                                : user.status === "Suspended"
                                  ? "bg-orange-500"
                                  : "bg-red-500"
                          }
                        >
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Link href={`/admin/users/${user.id}`}>
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </Link>
                          {user.status === "Pending" && (
                            <>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleApproveUser(user.id)}
                                className="text-green-600 hover:bg-green-50"
                              >
                                <UserCheck className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleRejectUser(user.id)}
                                className="text-red-600 hover:bg-red-50"
                              >
                                <UserX className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                          {user.status === "Active" && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleSuspendUser(user.id)}
                              className="text-orange-600 hover:bg-orange-50"
                            >
                              <Shield className="h-4 w-4" />
                            </Button>
                          )}
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteUser(user.id)}
                            className="text-red-600 hover:bg-red-50"
                          >
                            <XCircle className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Job Management */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Job Management</CardTitle>
                  <CardDescription>Review and manage job postings</CardDescription>
                </div>
                <Button onClick={handleViewSystemLogs} variant="outline" size="sm">
                  <FileText className="h-4 w-4 mr-2" />
                  View Logs
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Job Title</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {jobs.map((job) => (
                    <TableRow key={job.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{job.title}</p>
                          <p className="text-sm text-gray-500">{job.applications} applications</p>
                        </div>
                      </TableCell>
                      <TableCell>{job.company}</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            job.status === "Active"
                              ? "bg-green-500"
                              : job.status === "Closed"
                                ? "bg-gray-500"
                                : "bg-red-500"
                          }
                        >
                          {job.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Link href={`/jobs/${job.id}`}>
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </Link>
                          {job.status !== "Active" && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleApproveJob(job.id)}
                              className="text-green-600 hover:bg-green-50"
                            >
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                          )}
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleRejectJob(job.id)}
                            className="text-red-600 hover:bg-red-50"
                          >
                            <XCircle className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteJob(job.id)}
                            className="text-red-600 hover:bg-red-50"
                          >
                            <AlertTriangle className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Analytics Dialog */}
      <Dialog open={isAnalyticsDialogOpen} onOpenChange={setIsAnalyticsDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Analytics Dashboard</DialogTitle>
            <DialogDescription>Comprehensive system analytics and insights</DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <Users className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                  <div className="text-2xl font-bold">2,847</div>
                  <div className="text-sm text-gray-600">Total Users</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Briefcase className="h-8 w-8 mx-auto mb-2 text-green-500" />
                  <div className="text-2xl font-bold">1,234</div>
                  <div className="text-sm text-gray-600">Active Jobs</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <TrendingUp className="h-8 w-8 mx-auto mb-2 text-purple-500" />
                  <div className="text-2xl font-bold">8,921</div>
                  <div className="text-sm text-gray-600">Applications</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Activity className="h-8 w-8 mx-auto mb-2 text-orange-500" />
                  <div className="text-2xl font-bold">95%</div>
                  <div className="text-sm text-gray-600">System Health</div>
                </CardContent>
              </Card>
            </div>
            <div className="text-center py-8">
              <BarChart3 className="h-16 w-16 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-600">Advanced analytics charts would be displayed here</p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAnalyticsDialogOpen(false)}>
              Close
            </Button>
            <Button onClick={handleExportData}>
              <Download className="h-4 w-4 mr-2" />
              Export Analytics
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Settings Dialog */}
      <Dialog open={isSettingsDialogOpen} onOpenChange={setIsSettingsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>System Settings</DialogTitle>
            <DialogDescription>Configure system-wide settings and preferences</DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Notifications</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Bell className="h-4 w-4" />
                    <Label htmlFor="email-notifications">Email Notifications</Label>
                  </div>
                  <Switch
                    id="email-notifications"
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked) => handleSettingChange("emailNotifications", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Zap className="h-4 w-4" />
                    <Label htmlFor="sms-notifications">SMS Notifications</Label>
                  </div>
                  <Switch
                    id="sms-notifications"
                    checked={settings.smsNotifications}
                    onCheckedChange={(checked) => handleSettingChange("smsNotifications", checked)}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">System Controls</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Settings className="h-4 w-4" />
                    <Label htmlFor="maintenance-mode">Maintenance Mode</Label>
                  </div>
                  <Switch
                    id="maintenance-mode"
                    checked={settings.maintenanceMode}
                    onCheckedChange={(checked) => handleSettingChange("maintenanceMode", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4" />
                    <Label htmlFor="user-registration">User Registration</Label>
                  </div>
                  <Switch
                    id="user-registration"
                    checked={settings.userRegistration}
                    onCheckedChange={(checked) => handleSettingChange("userRegistration", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Briefcase className="h-4 w-4" />
                    <Label htmlFor="job-posting">Job Posting</Label>
                  </div>
                  <Switch
                    id="job-posting"
                    checked={settings.jobPosting}
                    onCheckedChange={(checked) => handleSettingChange("jobPosting", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4" />
                    <Label htmlFor="auto-approval">Auto Approval</Label>
                  </div>
                  <Switch
                    id="auto-approval"
                    checked={settings.autoApproval}
                    onCheckedChange={(checked) => handleSettingChange("autoApproval", checked)}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button onClick={handleClearCache} variant="outline">
                <RefreshCw className="h-4 w-4 mr-2" />
                Clear Cache
              </Button>
              <Button onClick={handleBackupDatabase} variant="outline">
                <Database className="h-4 w-4 mr-2" />
                Backup Database
              </Button>
              <Button onClick={handleRestartServer} variant="outline">
                <Server className="h-4 w-4 mr-2" />
                Restart Server
              </Button>
              <Button onClick={handleViewSystemLogs} variant="outline">
                <FileText className="h-4 w-4 mr-2" />
                View Logs
              </Button>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsSettingsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveSettings}>Save Settings</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Report Generation Dialog */}
      <Dialog open={isReportDialogOpen} onOpenChange={setIsReportDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Generate Report</DialogTitle>
            <DialogDescription>Create detailed system reports</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="report-type">Report Type</Label>
              <select
                id="report-type"
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                className="w-full p-2 border rounded-md"
              >
                <option value="users">Users Report</option>
                <option value="jobs">Jobs Report</option>
                <option value="applications">Applications Report</option>
                <option value="companies">Companies Report</option>
                <option value="system">System Report</option>
              </select>
            </div>
            <div>
              <Label htmlFor="date-range">Date Range</Label>
              <select
                id="date-range"
                value={reportDateRange}
                onChange={(e) => setReportDateRange(e.target.value)}
                className="w-full p-2 border rounded-md"
              >
                <option value="last-7-days">Last 7 Days</option>
                <option value="last-30-days">Last 30 Days</option>
                <option value="last-90-days">Last 90 Days</option>
                <option value="last-year">Last Year</option>
                <option value="all-time">All Time</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsReportDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateReport}>
              <FileText className="h-4 w-4 mr-2" />
              Generate Report
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

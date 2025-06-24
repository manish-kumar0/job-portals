"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { FileUpload } from "@/components/file-upload"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import {
  Edit,
  Save,
  X,
  Plus,
  MapPin,
  Mail,
  Phone,
  GraduationCap,
  Briefcase,
  Camera,
  Upload,
  Trash2,
} from "lucide-react"

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [profileImage, setProfileImage] = useState("/placeholder.svg?height=96&width=96")
  const [isPhotoDialogOpen, setIsPhotoDialogOpen] = useState(false)
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  const [profile, setProfile] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@university.edu",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    university: "University of Technology",
    major: "Computer Science",
    graduationYear: "2024",
    gpa: "3.8",
    bio: "Passionate computer science student with experience in web development and machine learning. Looking for internship opportunities to apply my skills in real-world projects.",
    skills: ["React", "JavaScript", "Python", "Node.js", "SQL", "Git", "Machine Learning", "TypeScript"],
    experience: [
      {
        title: "Frontend Developer Intern",
        company: "Tech Startup",
        duration: "Summer 2023",
        description: "Developed responsive web applications using React and TypeScript",
      },
    ],
    education: [
      {
        degree: "Bachelor of Science in Computer Science",
        school: "University of Technology",
        year: "2020-2024",
        gpa: "3.8",
      },
    ],
    projects: [
      {
        name: "E-commerce Website",
        description: "Full-stack e-commerce platform built with React and Node.js",
        technologies: ["React", "Node.js", "MongoDB", "Express"],
      },
    ],
  })

  const [newSkill, setNewSkill] = useState("")

  // Photo Upload Functions
  const handlePhotoSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        toast({
          title: "Invalid File Type",
          description: "Please select an image file (JPG, PNG, GIF)",
          variant: "destructive",
        })
        return
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File Too Large",
          description: "Please select an image smaller than 5MB",
          variant: "destructive",
        })
        return
      }

      // Create preview
      const reader = new FileReader()
      reader.onload = (e) => {
        setPhotoPreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handlePhotoUpload = async () => {
    if (!photoPreview) return

    try {
      // Simulate upload process
      toast({
        title: "Uploading Photo",
        description: "Please wait while we upload your photo...",
      })

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      setProfileImage(photoPreview)
      setPhotoPreview(null)
      setIsPhotoDialogOpen(false)

      toast({
        title: "Photo Updated",
        description: "Your profile photo has been updated successfully!",
      })
    } catch (error) {
      toast({
        title: "Upload Failed",
        description: "Failed to upload photo. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handlePhotoRemove = () => {
    setProfileImage("/placeholder.svg?height=96&width=96")
    setPhotoPreview(null)
    setIsPhotoDialogOpen(false)
    toast({
      title: "Photo Removed",
      description: "Your profile photo has been removed.",
    })
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  const handleSave = () => {
    setIsEditing(false)
    toast({
      title: "Profile Updated",
      description: "Your profile has been updated successfully!",
    })
  }

  const addSkill = () => {
    if (newSkill && !profile.skills.includes(newSkill)) {
      setProfile({ ...profile, skills: [...profile.skills, newSkill] })
      setNewSkill("")
      toast({
        title: "Skill Added",
        description: `${newSkill} has been added to your skills.`,
      })
    }
  }

  const removeSkill = (skillToRemove: string) => {
    setProfile({ ...profile, skills: profile.skills.filter((skill) => skill !== skillToRemove) })
    toast({
      title: "Skill Removed",
      description: `${skillToRemove} has been removed from your skills.`,
    })
  }

  const profileCompletion = 85

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
          <div className="flex space-x-3">
            {isEditing ? (
              <>
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
                <Button onClick={handleSave}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </>
            ) : (
              <Button onClick={() => setIsEditing(true)}>
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            )}
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Profile Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-6">
                  <div className="relative">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src={profileImage || "/placeholder.svg"} alt="Profile" />
                      <AvatarFallback className="text-2xl">
                        {profile.firstName[0]}
                        {profile.lastName[0]}
                      </AvatarFallback>
                    </Avatar>
                    {isEditing && (
                      <button
                        onClick={() => setIsPhotoDialogOpen(true)}
                        className="absolute -bottom-2 -right-2 bg-blue-600 text-white rounded-full p-2 hover:bg-blue-700 transition-colors"
                      >
                        <Camera className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                  {isEditing && (
                    <div className="space-y-2">
                      <Button variant="outline" onClick={() => setIsPhotoDialogOpen(true)}>
                        <Camera className="h-4 w-4 mr-2" />
                        Change Photo
                      </Button>
                      <p className="text-xs text-gray-500">JPG, PNG or GIF (max 5MB)</p>
                    </div>
                  )}
                </div>

                {/* Photo Upload Dialog */}
                <Dialog open={isPhotoDialogOpen} onOpenChange={setIsPhotoDialogOpen}>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Update Profile Photo</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      {/* Current/Preview Photo */}
                      <div className="flex justify-center">
                        <Avatar className="h-32 w-32">
                          <AvatarImage src={photoPreview || profileImage} alt="Profile preview" />
                          <AvatarFallback className="text-3xl">
                            {profile.firstName[0]}
                            {profile.lastName[0]}
                          </AvatarFallback>
                        </Avatar>
                      </div>

                      {/* Upload Options */}
                      <div className="space-y-3">
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handlePhotoSelect}
                          className="hidden"
                        />

                        <Button onClick={triggerFileInput} variant="outline" className="w-full">
                          <Upload className="h-4 w-4 mr-2" />
                          Choose New Photo
                        </Button>

                        {profileImage !== "/placeholder.svg?height=96&width=96" && (
                          <Button
                            onClick={handlePhotoRemove}
                            variant="outline"
                            className="w-full text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Remove Photo
                          </Button>
                        )}
                      </div>

                      {/* Action Buttons */}
                      {photoPreview && (
                        <div className="flex space-x-2">
                          <Button onClick={() => setPhotoPreview(null)} variant="outline" className="flex-1">
                            Cancel
                          </Button>
                          <Button onClick={handlePhotoUpload} className="flex-1">
                            Upload Photo
                          </Button>
                        </div>
                      )}
                    </div>
                  </DialogContent>
                </Dialog>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    {isEditing ? (
                      <Input
                        id="firstName"
                        value={profile.firstName}
                        onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                      />
                    ) : (
                      <p className="text-gray-900">{profile.firstName}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    {isEditing ? (
                      <Input
                        id="lastName"
                        value={profile.lastName}
                        onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                      />
                    ) : (
                      <p className="text-gray-900">{profile.lastName}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-gray-400" />
                      {isEditing ? (
                        <Input
                          id="email"
                          type="email"
                          value={profile.email}
                          onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                        />
                      ) : (
                        <p className="text-gray-900">{profile.email}</p>
                      )}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-gray-400" />
                      {isEditing ? (
                        <Input
                          id="phone"
                          value={profile.phone}
                          onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                        />
                      ) : (
                        <p className="text-gray-900">{profile.phone}</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    {isEditing ? (
                      <Input
                        id="location"
                        value={profile.location}
                        onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                      />
                    ) : (
                      <p className="text-gray-900">{profile.location}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  {isEditing ? (
                    <Textarea
                      id="bio"
                      rows={4}
                      value={profile.bio}
                      onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                    />
                  ) : (
                    <p className="text-gray-700">{profile.bio}</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Education */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <GraduationCap className="h-5 w-5 mr-2" />
                  Education
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {profile.education.map((edu, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <h4 className="font-medium">{edu.degree}</h4>
                      <p className="text-gray-600">{edu.school}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500 mt-2">
                        <span>{edu.year}</span>
                        <span>GPA: {edu.gpa}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Experience */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Briefcase className="h-5 w-5 mr-2" />
                  Experience
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {profile.experience.map((exp, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <h4 className="font-medium">{exp.title}</h4>
                      <p className="text-gray-600">{exp.company}</p>
                      <p className="text-sm text-gray-500 mb-2">{exp.duration}</p>
                      <p className="text-gray-700">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Projects */}
            <Card>
              <CardHeader>
                <CardTitle>Projects</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {profile.projects.map((project, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <h4 className="font-medium">{project.name}</h4>
                      <p className="text-gray-700 mb-2">{project.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {project.technologies.map((tech) => (
                          <Badge key={tech} variant="outline" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Completion */}
            <Card>
              <CardHeader>
                <CardTitle>Profile Completion</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Progress</span>
                    <span className="text-sm text-gray-600">{profileCompletion}%</span>
                  </div>
                  <Progress value={profileCompletion} className="w-full" />
                  <p className="text-xs text-gray-500">Complete your profile to increase visibility to recruiters</p>
                </div>
              </CardContent>
            </Card>

            {/* Skills */}
            <Card>
              <CardHeader>
                <CardTitle>Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    {profile.skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="relative group">
                        {skill}
                        {isEditing && (
                          <button onClick={() => removeSkill(skill)} className="ml-2 text-red-500 hover:text-red-700">
                            <X className="h-3 w-3" />
                          </button>
                        )}
                      </Badge>
                    ))}
                  </div>

                  {isEditing && (
                    <div className="flex space-x-2">
                      <Input
                        placeholder="Add a skill"
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && addSkill()}
                      />
                      <Button size="sm" onClick={addSkill}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Resume Upload */}
            <Card>
              <CardHeader>
                <CardTitle>Resume</CardTitle>
              </CardHeader>
              <CardContent>
                <FileUpload
                  onFileUpload={(file) => {
                    toast({
                      title: "Resume Uploaded",
                      description: `${file.name} has been uploaded successfully!`,
                    })
                  }}
                  acceptedTypes={[".pdf", ".doc", ".docx"]}
                  maxSize={5}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

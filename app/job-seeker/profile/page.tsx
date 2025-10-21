"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"
import {
  User,
  Briefcase,
  GraduationCap,
  Award,
  MapPin,
  Mail,
  Phone,
  Globe,
  Github,
  Linkedin,
  Plus,
  Edit,
  Save,
  X,
  Upload,
  FileText,
  Star,
  Trash2,
  Download,
  Eye,
} from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

interface Experience {
  id: number
  title: string
  company: string
  location: string
  startDate: string
  endDate: string
  current: boolean
  description: string
}

interface Education {
  id: number
  degree: string
  school: string
  location: string
  startDate: string
  endDate: string
  gpa?: string
}

interface Project {
  id: number
  title: string
  description: string
  technologies: string[]
  url?: string
  github?: string
}

export default function JobSeekerProfile() {
  const [isEditing, setIsEditing] = useState(false)
  const [profilePicture, setProfilePicture] = useState<string>("/professional-headshot.png")
  const { toast } = useToast()

  const [resumeFile, setResumeFile] = useState<{ name: string; size: number; url: string } | null>({
    name: "Sarah_Chen_Resume.pdf",
    size: 245000,
    url: "/resume.pdf",
  })

  const [profileData, setProfileData] = useState({
    name: "Sarah Chen",
    title: "Senior Frontend Developer",
    email: "sarah.chen@email.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    website: "https://sarahchen.dev",
    linkedin: "https://linkedin.com/in/sarahchen",
    github: "https://github.com/sarahchen",
    summary:
      "Passionate frontend developer with 5+ years of experience building scalable web applications. Specialized in React, TypeScript, and modern web technologies. Love creating intuitive user experiences and mentoring junior developers.",
    skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "GraphQL", "Node.js", "Python", "AWS"],
    availability: "Open to work",
    salaryExpectation: "$120k - $160k",
  })

  const [experiences, setExperiences] = useState<Experience[]>([
    {
      id: 1,
      title: "Senior Frontend Developer",
      company: "TechCorp Inc.",
      location: "San Francisco, CA",
      startDate: "2022-01",
      endDate: "",
      current: true,
      description:
        "Lead frontend development for multiple web applications serving 100k+ users. Mentored 3 junior developers and improved code quality through comprehensive code reviews.",
    },
    {
      id: 2,
      title: "Frontend Developer",
      company: "StartupXYZ",
      location: "San Francisco, CA",
      startDate: "2020-06",
      endDate: "2021-12",
      current: false,
      description:
        "Built responsive web applications using React and TypeScript. Collaborated with design team to implement pixel-perfect UI components.",
    },
  ])

  const [education, setEducation] = useState<Education[]>([
    {
      id: 1,
      degree: "Bachelor of Science in Computer Science",
      school: "University of California, Berkeley",
      location: "Berkeley, CA",
      startDate: "2016-08",
      endDate: "2020-05",
      gpa: "3.8",
    },
  ])

  const [projects, setProjects] = useState<Project[]>([
    {
      id: 1,
      title: "E-commerce Dashboard",
      description:
        "Built a comprehensive admin dashboard for e-commerce management with real-time analytics and inventory tracking.",
      technologies: ["React", "TypeScript", "Chart.js", "Tailwind CSS"],
      url: "https://demo.sarahchen.dev",
      github: "https://github.com/sarahchen/ecommerce-dashboard",
    },
    {
      id: 2,
      title: "Task Management App",
      description:
        "Developed a collaborative task management application with real-time updates and team collaboration features.",
      technologies: ["Next.js", "Prisma", "PostgreSQL", "Socket.io"],
      github: "https://github.com/sarahchen/task-manager",
    },
  ])

  const [newSkill, setNewSkill] = useState("")

  const profileCompleteness = 85

  const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "Error",
          description: "Image size must be less than 5MB",
          variant: "destructive",
        })
        return
      }
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfilePicture(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Validate file type
      const validTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ]
      if (!validTypes.includes(file.type)) {
        toast({
          title: "Error",
          description: "Please upload a PDF or DOC file",
          variant: "destructive",
        })
        return
      }

      // Validate file size (10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "Error",
          description: "Resume size must be less than 10MB",
          variant: "destructive",
        })
        return
      }

      const reader = new FileReader()
      reader.onloadend = () => {
        setResumeFile({
          name: file.name,
          size: file.size,
          url: reader.result as string,
        })
        toast({
          title: "Success",
          description: "Resume uploaded successfully",
        })
      }
      reader.readAsDataURL(file)
    }
  }

  const isValidUrl = (url: string): boolean => {
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  }

  const handleSave = () => {
    // Validate required fields
    if (!profileData.name.trim()) {
      toast({
        title: "Error",
        description: "Name is required",
        variant: "destructive",
      })
      return
    }

    if (!profileData.email.trim() || !profileData.email.includes("@")) {
      toast({
        title: "Error",
        description: "Valid email is required",
        variant: "destructive",
      })
      return
    }

    // Validate URLs
    if (profileData.website && !isValidUrl(profileData.website)) {
      toast({
        title: "Error",
        description: "Please enter a valid website URL",
        variant: "destructive",
      })
      return
    }

    if (profileData.linkedin && !isValidUrl(profileData.linkedin)) {
      toast({
        title: "Error",
        description: "Please enter a valid LinkedIn URL",
        variant: "destructive",
      })
      return
    }

    if (profileData.github && !isValidUrl(profileData.github)) {
      toast({
        title: "Error",
        description: "Please enter a valid GitHub URL",
        variant: "destructive",
      })
      return
    }

    setIsEditing(false)
    toast({
      title: "Success",
      description: "Profile updated successfully",
    })
    console.log("Profile saved:", profileData)
  }

  const handleAddSkill = () => {
    if (newSkill.trim() && !profileData.skills.includes(newSkill.trim())) {
      setProfileData((prev) => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()],
      }))
      setNewSkill("")
    }
  }

  const handleRemoveSkill = (skill: string) => {
    setProfileData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skill),
    }))
  }

  const handleAddExperience = () => {
    const newExp: Experience = {
      id: Math.max(...experiences.map((e) => e.id), 0) + 1,
      title: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
    }
    setExperiences((prev) => [newExp, ...prev])
  }

  const handleUpdateExperience = (id: number, updates: Partial<Experience>) => {
    setExperiences((prev) => prev.map((exp) => (exp.id === id ? { ...exp, ...updates } : exp)))
  }

  const handleDeleteExperience = (id: number) => {
    setExperiences((prev) => prev.filter((exp) => exp.id !== id))
  }

  const handleAddEducation = () => {
    const newEdu: Education = {
      id: Math.max(...education.map((e) => e.id), 0) + 1,
      degree: "",
      school: "",
      location: "",
      startDate: "",
      endDate: "",
      gpa: "",
    }
    setEducation((prev) => [newEdu, ...prev])
  }

  const handleUpdateEducation = (id: number, updates: Partial<Education>) => {
    setEducation((prev) => prev.map((edu) => (edu.id === id ? { ...edu, ...updates } : edu)))
  }

  const handleDeleteEducation = (id: number) => {
    setEducation((prev) => prev.filter((edu) => edu.id !== id))
  }

  const handleAddProject = () => {
    const newProj: Project = {
      id: Math.max(...projects.map((p) => p.id), 0) + 1,
      title: "",
      description: "",
      technologies: [],
      url: "",
      github: "",
    }
    setProjects((prev) => [newProj, ...prev])
  }

  const handleUpdateProject = (id: number, updates: Partial<Project>) => {
    setProjects((prev) => prev.map((proj) => (proj.id === id ? { ...proj, ...updates } : proj)))
  }

  const handleDeleteProject = (id: number) => {
    setProjects((prev) => prev.filter((proj) => proj.id !== id))
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2">
                <Briefcase className="h-8 w-8 text-primary" />
                <span className="font-geist text-2xl font-bold text-foreground">QuickHire</span>
              </div>
              <div className="hidden md:flex space-x-6">
                <a href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                  Home
                </a>
                <a href="/job-seeker" className="text-muted-foreground hover:text-foreground transition-colors">
                  Jobs
                </a>
                <a href="/job-seeker/profile" className="text-foreground font-medium">
                  Profile
                </a>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <Button variant="ghost">Logout</Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Profile Header */}
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-6">
                  <div className="relative">
                    <Avatar className="w-24 h-24">
                      <AvatarImage src={profilePicture || "/placeholder.svg"} />
                      <AvatarFallback className="text-2xl">SC</AvatarFallback>
                    </Avatar>
                    <div>
                      <input
                        type="file"
                        id="profile-picture-upload"
                        accept="image/*"
                        className="hidden"
                        onChange={handleProfilePictureChange}
                      />
                      <Button
                        size="icon"
                        variant="secondary"
                        className="absolute -bottom-2 -right-2 h-8 w-8"
                        onClick={() => document.getElementById("profile-picture-upload")?.click()}
                      >
                        <Upload className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex-1">
                    {isEditing ? (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="name">Full Name *</Label>
                            <Input
                              id="name"
                              value={profileData.name}
                              onChange={(e) => setProfileData((prev) => ({ ...prev, name: e.target.value }))}
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="title">Professional Title</Label>
                            <Input
                              id="title"
                              value={profileData.title}
                              onChange={(e) => setProfileData((prev) => ({ ...prev, title: e.target.value }))}
                            />
                          </div>
                          <div>
                            <Label htmlFor="email">Email *</Label>
                            <Input
                              id="email"
                              type="email"
                              value={profileData.email}
                              onChange={(e) => setProfileData((prev) => ({ ...prev, email: e.target.value }))}
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="phone">Phone</Label>
                            <Input
                              id="phone"
                              type="tel"
                              value={profileData.phone}
                              onChange={(e) => setProfileData((prev) => ({ ...prev, phone: e.target.value }))}
                            />
                          </div>
                          <div>
                            <Label htmlFor="location">Location</Label>
                            <Input
                              id="location"
                              value={profileData.location}
                              onChange={(e) => setProfileData((prev) => ({ ...prev, location: e.target.value }))}
                            />
                          </div>
                          <div>
                            <Label htmlFor="website">Website</Label>
                            <Input
                              id="website"
                              type="url"
                              placeholder="https://yourwebsite.com"
                              value={profileData.website}
                              onChange={(e) => setProfileData((prev) => ({ ...prev, website: e.target.value }))}
                            />
                          </div>
                          <div>
                            <Label htmlFor="linkedin">LinkedIn Profile</Label>
                            <Input
                              id="linkedin"
                              type="url"
                              placeholder="https://linkedin.com/in/yourprofile"
                              value={profileData.linkedin}
                              onChange={(e) => setProfileData((prev) => ({ ...prev, linkedin: e.target.value }))}
                            />
                          </div>
                          <div>
                            <Label htmlFor="github">GitHub Profile</Label>
                            <Input
                              id="github"
                              type="url"
                              placeholder="https://github.com/yourusername"
                              value={profileData.github}
                              onChange={(e) => setProfileData((prev) => ({ ...prev, github: e.target.value }))}
                            />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <h1 className="font-geist text-3xl font-bold mb-2">{profileData.name}</h1>
                        <p className="text-xl text-muted-foreground font-manrope mb-4">{profileData.title}</p>
                        <div className="flex items-center gap-1 mb-4">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                          ))}
                          <span className="text-sm text-muted-foreground ml-1">(4.9)</span>
                        </div>
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {profileData.location}
                          </div>
                          <div className="flex items-center gap-1">
                            <Mail className="h-4 w-4" />
                            {profileData.email}
                          </div>
                          <div className="flex items-center gap-1">
                            <Phone className="h-4 w-4" />
                            {profileData.phone}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  {isEditing ? (
                    <>
                      <Button onClick={handleSave} size="sm">
                        <Save className="h-4 w-4 mr-2" />
                        Save
                      </Button>
                      <Button variant="outline" onClick={() => setIsEditing(false)} size="sm">
                        <X className="h-4 w-4 mr-2" />
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <Button onClick={() => setIsEditing(true)} size="sm">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Profile
                    </Button>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Profile Completeness */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Profile Completeness</span>
                  <span className="text-sm text-muted-foreground">{profileCompleteness}%</span>
                </div>
                <Progress value={profileCompleteness} className="h-2" />
              </div>

              {/* Social Links */}
              <div className="flex gap-4">
                {profileData.website && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={profileData.website} target="_blank" rel="noopener noreferrer">
                      <Globe className="h-4 w-4 mr-2" />
                      Website
                    </a>
                  </Button>
                )}
                {profileData.linkedin && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={profileData.linkedin} target="_blank" rel="noopener noreferrer">
                      <Linkedin className="h-4 w-4 mr-2" />
                      LinkedIn
                    </a>
                  </Button>
                )}
                {profileData.github && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={profileData.github} target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4 mr-2" />
                      GitHub
                    </a>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Profile Content Tabs */}
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="experience" className="flex items-center gap-2">
                <Briefcase className="h-4 w-4" />
                Experience
              </TabsTrigger>
              <TabsTrigger value="education" className="flex items-center gap-2">
                <GraduationCap className="h-4 w-4" />
                Education
              </TabsTrigger>
              <TabsTrigger value="projects" className="flex items-center gap-2">
                <Award className="h-4 w-4" />
                Projects
              </TabsTrigger>
              <TabsTrigger value="resume" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Resume
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="font-geist">Professional Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  {isEditing ? (
                    <Textarea
                      value={profileData.summary}
                      onChange={(e) => setProfileData((prev) => ({ ...prev, summary: e.target.value }))}
                      rows={4}
                      placeholder="Write a brief summary about your professional background and goals..."
                    />
                  ) : (
                    <p className="font-manrope leading-relaxed">{profileData.summary}</p>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="font-geist">Skills</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {profileData.skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="flex items-center gap-1">
                        {skill}
                        {isEditing && (
                          <button onClick={() => handleRemoveSkill(skill)} className="ml-1 hover:text-destructive">
                            <X className="h-3 w-3" />
                          </button>
                        )}
                      </Badge>
                    ))}
                    {isEditing && (
                      <div className="flex gap-2 w-full mt-2">
                        <Input
                          placeholder="Add a skill"
                          value={newSkill}
                          onChange={(e) => setNewSkill(e.target.value)}
                          onKeyPress={(e) => e.key === "Enter" && handleAddSkill()}
                        />
                        <Button onClick={handleAddSkill} size="sm">
                          <Plus className="h-4 w-4 mr-2" />
                          Add
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="font-geist">Availability</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {isEditing ? (
                      <Input
                        value={profileData.availability}
                        onChange={(e) => setProfileData((prev) => ({ ...prev, availability: e.target.value }))}
                      />
                    ) : (
                      <Badge className="bg-green-500">{profileData.availability}</Badge>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="font-geist">Salary Expectation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {isEditing ? (
                      <Input
                        value={profileData.salaryExpectation}
                        onChange={(e) => setProfileData((prev) => ({ ...prev, salaryExpectation: e.target.value }))}
                      />
                    ) : (
                      <p className="font-manrope">{profileData.salaryExpectation}</p>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Experience Tab */}
            <TabsContent value="experience" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="font-geist text-2xl font-semibold">Work Experience</h2>
                <Button size="sm" onClick={handleAddExperience}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Experience
                </Button>
              </div>

              {experiences.map((exp) => (
                <Card key={exp.id}>
                  <CardContent className="p-6">
                    {isEditing ? (
                      <div className="space-y-4">
                        <div className="flex justify-between items-start">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
                            <div>
                              <Label>Job Title</Label>
                              <Input
                                value={exp.title}
                                onChange={(e) => handleUpdateExperience(exp.id, { title: e.target.value })}
                              />
                            </div>
                            <div>
                              <Label>Company</Label>
                              <Input
                                value={exp.company}
                                onChange={(e) => handleUpdateExperience(exp.id, { company: e.target.value })}
                              />
                            </div>
                            <div>
                              <Label>Location</Label>
                              <Input
                                value={exp.location}
                                onChange={(e) => handleUpdateExperience(exp.id, { location: e.target.value })}
                              />
                            </div>
                            <div>
                              <Label>Start Date</Label>
                              <Input
                                type="month"
                                value={exp.startDate}
                                onChange={(e) => handleUpdateExperience(exp.id, { startDate: e.target.value })}
                              />
                            </div>
                            <div>
                              <Label>End Date</Label>
                              <Input
                                type="month"
                                value={exp.endDate}
                                onChange={(e) => handleUpdateExperience(exp.id, { endDate: e.target.value })}
                                disabled={exp.current}
                              />
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                checked={exp.current}
                                onChange={(e) => handleUpdateExperience(exp.id, { current: e.target.checked })}
                              />
                              <Label>Currently working here</Label>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteExperience(exp.id)}
                            className="text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <div>
                          <Label>Description</Label>
                          <Textarea
                            value={exp.description}
                            onChange={(e) => handleUpdateExperience(exp.id, { description: e.target.value })}
                            rows={3}
                          />
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="font-geist text-lg font-semibold">{exp.title}</h3>
                            <p className="text-muted-foreground font-manrope">
                              {exp.company} • {exp.location}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                            </p>
                          </div>
                        </div>
                        <p className="font-manrope leading-relaxed">{exp.description}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            {/* Education Tab */}
            <TabsContent value="education" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="font-geist text-2xl font-semibold">Education</h2>
                <Button size="sm" onClick={handleAddEducation}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Education
                </Button>
              </div>

              {education.map((edu) => (
                <Card key={edu.id}>
                  <CardContent className="p-6">
                    {isEditing ? (
                      <div className="space-y-4">
                        <div className="flex justify-between items-start">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
                            <div className="md:col-span-2">
                              <Label>Degree</Label>
                              <Input
                                value={edu.degree}
                                onChange={(e) => handleUpdateEducation(edu.id, { degree: e.target.value })}
                              />
                            </div>
                            <div>
                              <Label>School</Label>
                              <Input
                                value={edu.school}
                                onChange={(e) => handleUpdateEducation(edu.id, { school: e.target.value })}
                              />
                            </div>
                            <div>
                              <Label>Location</Label>
                              <Input
                                value={edu.location}
                                onChange={(e) => handleUpdateEducation(edu.id, { location: e.target.value })}
                              />
                            </div>
                            <div>
                              <Label>Start Date</Label>
                              <Input
                                type="month"
                                value={edu.startDate}
                                onChange={(e) => handleUpdateEducation(edu.id, { startDate: e.target.value })}
                              />
                            </div>
                            <div>
                              <Label>End Date</Label>
                              <Input
                                type="month"
                                value={edu.endDate}
                                onChange={(e) => handleUpdateEducation(edu.id, { endDate: e.target.value })}
                              />
                            </div>
                            <div>
                              <Label>GPA (Optional)</Label>
                              <Input
                                value={edu.gpa}
                                onChange={(e) => handleUpdateEducation(edu.id, { gpa: e.target.value })}
                              />
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteEducation(edu.id)}
                            className="text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-geist text-lg font-semibold">{edu.degree}</h3>
                          <p className="text-muted-foreground font-manrope">
                            {edu.school} • {edu.location}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {edu.startDate} - {edu.endDate}
                          </p>
                          {edu.gpa && <p className="text-sm text-muted-foreground">GPA: {edu.gpa}</p>}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            {/* Projects Tab */}
            <TabsContent value="projects" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="font-geist text-2xl font-semibold">Projects</h2>
                <Button size="sm" onClick={handleAddProject}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Project
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map((project) => (
                  <Card key={project.id}>
                    <CardContent className="p-6">
                      {isEditing ? (
                        <div className="space-y-4">
                          <div className="flex justify-between items-start">
                            <div className="space-y-4 flex-1">
                              <div>
                                <Label>Project Title</Label>
                                <Input
                                  value={project.title}
                                  onChange={(e) => handleUpdateProject(project.id, { title: e.target.value })}
                                />
                              </div>
                              <div>
                                <Label>Description</Label>
                                <Textarea
                                  value={project.description}
                                  onChange={(e) => handleUpdateProject(project.id, { description: e.target.value })}
                                  rows={3}
                                />
                              </div>
                              <div>
                                <Label>Project URL</Label>
                                <Input
                                  type="url"
                                  value={project.url}
                                  onChange={(e) => handleUpdateProject(project.id, { url: e.target.value })}
                                />
                              </div>
                              <div>
                                <Label>GitHub URL</Label>
                                <Input
                                  type="url"
                                  value={project.github}
                                  onChange={(e) => handleUpdateProject(project.id, { github: e.target.value })}
                                />
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteProject(project.id)}
                              className="text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <div className="flex justify-between items-start mb-4">
                            <h3 className="font-geist text-lg font-semibold">{project.title}</h3>
                          </div>
                          <p className="font-manrope text-muted-foreground mb-4">{project.description}</p>
                          <div className="flex flex-wrap gap-1 mb-4">
                            {project.technologies.map((tech) => (
                              <Badge key={tech} variant="outline" className="text-xs">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex gap-2">
                            {project.url && (
                              <Button variant="outline" size="sm" asChild>
                                <a href={project.url} target="_blank" rel="noopener noreferrer">
                                  <Globe className="h-4 w-4 mr-2" />
                                  Demo
                                </a>
                              </Button>
                            )}
                            {project.github && (
                              <Button variant="outline" size="sm" asChild>
                                <a href={project.github} target="_blank" rel="noopener noreferrer">
                                  <Github className="h-4 w-4 mr-2" />
                                  Code
                                </a>
                              </Button>
                            )}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Resume Tab */}
            <TabsContent value="resume" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="font-geist">Resume Management</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                    <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">Upload Your Resume</h3>
                    <p className="text-muted-foreground mb-4">Upload a PDF or DOC version of your resume (max 10MB)</p>
                    <input
                      type="file"
                      id="resume-upload"
                      accept=".pdf,.doc,.docx"
                      className="hidden"
                      onChange={handleResumeUpload}
                    />
                    <Button onClick={() => document.getElementById("resume-upload")?.click()}>
                      <Upload className="h-4 w-4 mr-2" />
                      Choose File
                    </Button>
                  </div>

                  {resumeFile && (
                    <div className="space-y-4">
                      <h4 className="font-semibold">Current Resume</h4>
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <FileText className="h-8 w-8 text-primary" />
                          <div>
                            <p className="font-medium">{resumeFile.name}</p>
                            <p className="text-sm text-muted-foreground">{(resumeFile.size / 1024).toFixed(0)} KB</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" asChild>
                            <a href={resumeFile.url} target="_blank" rel="noopener noreferrer">
                              <Eye className="h-4 w-4 mr-2" />
                              View
                            </a>
                          </Button>
                          <Button variant="outline" size="sm" asChild>
                            <a href={resumeFile.url} download={resumeFile.name}>
                              <Download className="h-4 w-4 mr-2" />
                              Download
                            </a>
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => document.getElementById("resume-upload")?.click()}
                          >
                            <Upload className="h-4 w-4 mr-2" />
                            Replace
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

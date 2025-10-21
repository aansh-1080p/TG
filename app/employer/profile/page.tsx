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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import {
  Building,
  MapPin,
  Mail,
  Phone,
  Globe,
  Users,
  Calendar,
  Edit,
  Save,
  X,
  Upload,
  Star,
  Briefcase,
  Award,
  ImageIcon,
  Plus,
  Linkedin,
  Trash2,
} from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

interface CompanyBenefit {
  id: number
  name: string
  description: string
}

interface CompanyValue {
  id: number
  title: string
  description: string
}

export default function EmployerProfile() {
  const [isEditing, setIsEditing] = useState(false)
  const [companyLogo, setCompanyLogo] = useState<string>("/company-logo.png")
  const { toast } = useToast()

  const [companyData, setCompanyData] = useState({
    name: "TechCorp Inc.",
    industry: "Technology",
    size: "50-200",
    founded: "2018",
    location: "San Francisco, CA",
    website: "https://techcorp.com",
    linkedin: "https://linkedin.com/in/techcorp",
    email: "hr@techcorp.com",
    phone: "+1 (555) 987-6543",
    description:
      "TechCorp is a leading technology company focused on building innovative web applications and digital solutions. We're passionate about creating products that make a difference in people's lives and fostering a culture of continuous learning and growth.",
    mission:
      "To empower businesses through cutting-edge technology solutions while maintaining the highest standards of quality and innovation.",
    specialties: ["Web Development", "Mobile Apps", "AI/ML", "Cloud Solutions", "DevOps"],
    culture:
      "We believe in work-life balance, continuous learning, and collaborative teamwork. Our office features modern amenities, flexible working hours, and a supportive environment where everyone's voice is heard.",
  })

  const [benefits, setBenefits] = useState<CompanyBenefit[]>([
    {
      id: 1,
      name: "Health Insurance",
      description: "Comprehensive medical, dental, and vision coverage",
    },
    {
      id: 2,
      name: "401(k) Matching",
      description: "Company matches up to 6% of your contributions",
    },
    {
      id: 3,
      name: "Remote Work",
      description: "Flexible remote work options and hybrid schedule",
    },
    {
      id: 4,
      name: "Learning Budget",
      description: "$2,000 annual budget for courses and conferences",
    },
    {
      id: 5,
      name: "Flexible PTO",
      description: "Unlimited paid time off policy",
    },
  ])

  const [newSpecialty, setNewSpecialty] = useState("")

  const [companyValues] = useState<CompanyValue[]>([
    {
      id: 1,
      title: "Innovation First",
      description: "We embrace new technologies and creative solutions to solve complex problems.",
    },
    {
      id: 2,
      title: "Team Collaboration",
      description: "We believe the best results come from diverse teams working together.",
    },
    {
      id: 3,
      title: "Customer Focus",
      description: "Every decision we make is guided by what's best for our customers.",
    },
    {
      id: 4,
      title: "Continuous Learning",
      description: "We invest in our team's growth and encourage lifelong learning.",
    },
  ])

  const profileCompleteness = 92

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
    if (!companyData.name.trim()) {
      toast({
        title: "Error",
        description: "Company name is required",
        variant: "destructive",
      })
      return
    }

    if (!companyData.email.trim() || !companyData.email.includes("@")) {
      toast({
        title: "Error",
        description: "Valid email is required",
        variant: "destructive",
      })
      return
    }

    // Validate URLs
    if (companyData.website && !isValidUrl(companyData.website)) {
      toast({
        title: "Error",
        description: "Please enter a valid website URL",
        variant: "destructive",
      })
      return
    }

    if (companyData.linkedin && !isValidUrl(companyData.linkedin)) {
      toast({
        title: "Error",
        description: "Please enter a valid LinkedIn URL",
        variant: "destructive",
      })
      return
    }

    setIsEditing(false)
    toast({
      title: "Success",
      description: "Company profile updated successfully",
    })
    console.log("Company profile saved:", companyData)
  }

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        setCompanyLogo(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAddSpecialty = () => {
    if (newSpecialty.trim() && !companyData.specialties.includes(newSpecialty.trim())) {
      setCompanyData((prev) => ({
        ...prev,
        specialties: [...prev.specialties, newSpecialty.trim()],
      }))
      setNewSpecialty("")
    }
  }

  const handleRemoveSpecialty = (specialty: string) => {
    setCompanyData((prev) => ({
      ...prev,
      specialties: prev.specialties.filter((s) => s !== specialty),
    }))
  }

  const handleAddBenefit = () => {
    const newBenefit: CompanyBenefit = {
      id: Math.max(...benefits.map((b) => b.id), 0) + 1,
      name: "",
      description: "",
    }
    setBenefits((prev) => [newBenefit, ...prev])
  }

  const handleUpdateBenefit = (id: number, updates: Partial<CompanyBenefit>) => {
    setBenefits((prev) => prev.map((benefit) => (benefit.id === id ? { ...benefit, ...updates } : benefit)))
  }

  const handleDeleteBenefit = (id: number) => {
    setBenefits((prev) => prev.filter((benefit) => benefit.id !== id))
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
                <a href="/employer" className="text-muted-foreground hover:text-foreground transition-colors">
                  Dashboard
                </a>
                <a href="/employer/profile" className="text-foreground font-medium">
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
          {/* Company Header */}
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-6">
                  <div className="relative">
                    <Avatar className="w-24 h-24">
                      <AvatarImage src={companyLogo || "/placeholder.svg"} />
                      <AvatarFallback className="text-2xl">TC</AvatarFallback>
                    </Avatar>
                    <div>
                      <input
                        type="file"
                        id="company-logo-upload"
                        accept="image/*"
                        className="hidden"
                        onChange={handleLogoChange}
                      />
                      <Button
                        size="icon"
                        variant="secondary"
                        className="absolute -bottom-2 -right-2 h-8 w-8"
                        onClick={() => document.getElementById("company-logo-upload")?.click()}
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
                            <Label htmlFor="name">Company Name *</Label>
                            <Input
                              id="name"
                              value={companyData.name}
                              onChange={(e) => setCompanyData((prev) => ({ ...prev, name: e.target.value }))}
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="industry">Industry</Label>
                            <Select
                              value={companyData.industry}
                              onValueChange={(value) => setCompanyData((prev) => ({ ...prev, industry: value }))}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Technology">Technology</SelectItem>
                                <SelectItem value="Healthcare">Healthcare</SelectItem>
                                <SelectItem value="Finance">Finance</SelectItem>
                                <SelectItem value="Education">Education</SelectItem>
                                <SelectItem value="Retail">Retail</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="email">Email *</Label>
                            <Input
                              id="email"
                              type="email"
                              value={companyData.email}
                              onChange={(e) => setCompanyData((prev) => ({ ...prev, email: e.target.value }))}
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="phone">Phone</Label>
                            <Input
                              id="phone"
                              type="tel"
                              value={companyData.phone}
                              onChange={(e) => setCompanyData((prev) => ({ ...prev, phone: e.target.value }))}
                            />
                          </div>
                          <div>
                            <Label htmlFor="location">Location</Label>
                            <Input
                              id="location"
                              value={companyData.location}
                              onChange={(e) => setCompanyData((prev) => ({ ...prev, location: e.target.value }))}
                            />
                          </div>
                          <div>
                            <Label htmlFor="size">Company Size</Label>
                            <Select
                              value={companyData.size}
                              onValueChange={(value) => setCompanyData((prev) => ({ ...prev, size: value }))}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="1-10">1-10 employees</SelectItem>
                                <SelectItem value="10-50">10-50 employees</SelectItem>
                                <SelectItem value="50-200">50-200 employees</SelectItem>
                                <SelectItem value="200+">200+ employees</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="founded">Founded Year</Label>
                            <Input
                              id="founded"
                              value={companyData.founded}
                              onChange={(e) => setCompanyData((prev) => ({ ...prev, founded: e.target.value }))}
                            />
                          </div>
                          <div>
                            <Label htmlFor="website">Website</Label>
                            <Input
                              id="website"
                              type="url"
                              placeholder="https://yourcompany.com"
                              value={companyData.website}
                              onChange={(e) => setCompanyData((prev) => ({ ...prev, website: e.target.value }))}
                            />
                          </div>
                          <div>
                            <Label htmlFor="linkedin">LinkedIn Profile</Label>
                            <Input
                              id="linkedin"
                              type="url"
                              placeholder="https://linkedin.com/company/yourcompany"
                              value={companyData.linkedin}
                              onChange={(e) => setCompanyData((prev) => ({ ...prev, linkedin: e.target.value }))}
                            />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <h1 className="font-geist text-3xl font-bold mb-2">{companyData.name}</h1>
                        <p className="text-xl text-muted-foreground font-manrope mb-4">{companyData.industry}</p>
                        <div className="flex items-center gap-1 mb-4">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                          ))}
                          <span className="text-sm text-muted-foreground ml-1">(4.8)</span>
                        </div>
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {companyData.location}
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            {companyData.size} employees
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            Founded {companyData.founded}
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

              {/* Contact Info */}
              <div className="flex flex-wrap gap-4">
                {companyData.website && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={companyData.website} target="_blank" rel="noopener noreferrer">
                      <Globe className="h-4 w-4 mr-2" />
                      Website
                    </a>
                  </Button>
                )}
                {companyData.linkedin && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={companyData.linkedin} target="_blank" rel="noopener noreferrer">
                      <Linkedin className="h-4 w-4 mr-2" />
                      LinkedIn
                    </a>
                  </Button>
                )}
                <Button variant="outline" size="sm" asChild>
                  <a href={`mailto:${companyData.email}`}>
                    <Mail className="h-4 w-4 mr-2" />
                    Email
                  </a>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <a href={`tel:${companyData.phone}`}>
                    <Phone className="h-4 w-4 mr-2" />
                    Phone
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Company Profile Tabs */}
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview" className="flex items-center gap-2">
                <Building className="h-4 w-4" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="culture" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Culture
              </TabsTrigger>
              <TabsTrigger value="benefits" className="flex items-center gap-2">
                <Award className="h-4 w-4" />
                Benefits
              </TabsTrigger>
              <TabsTrigger value="gallery" className="flex items-center gap-2">
                <ImageIcon className="h-4 w-4" />
                Gallery
              </TabsTrigger>
              <TabsTrigger value="hiring" className="flex items-center gap-2">
                <Briefcase className="h-4 w-4" />
                Hiring
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="font-geist">Company Description</CardTitle>
                </CardHeader>
                <CardContent>
                  {isEditing ? (
                    <Textarea
                      value={companyData.description}
                      onChange={(e) => setCompanyData((prev) => ({ ...prev, description: e.target.value }))}
                      rows={4}
                      placeholder="Describe your company, what you do, and what makes you unique..."
                    />
                  ) : (
                    <p className="font-manrope leading-relaxed">{companyData.description}</p>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="font-geist">Mission Statement</CardTitle>
                </CardHeader>
                <CardContent>
                  {isEditing ? (
                    <Textarea
                      value={companyData.mission}
                      onChange={(e) => setCompanyData((prev) => ({ ...prev, mission: e.target.value }))}
                      rows={3}
                      placeholder="What is your company's mission and vision?"
                    />
                  ) : (
                    <p className="font-manrope leading-relaxed">{companyData.mission}</p>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="font-geist">Specialties</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {companyData.specialties.map((specialty) => (
                      <Badge key={specialty} variant="secondary" className="flex items-center gap-1">
                        {specialty}
                        {isEditing && (
                          <button
                            onClick={() => handleRemoveSpecialty(specialty)}
                            className="ml-1 hover:text-destructive"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        )}
                      </Badge>
                    ))}
                    {isEditing && (
                      <div className="flex gap-2 w-full mt-2">
                        <Input
                          placeholder="Add a specialty"
                          value={newSpecialty}
                          onChange={(e) => setNewSpecialty(e.target.value)}
                          onKeyPress={(e) => e.key === "Enter" && handleAddSpecialty()}
                        />
                        <Button onClick={handleAddSpecialty} size="sm">
                          <Plus className="h-4 w-4 mr-2" />
                          Add
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Culture Tab */}
            <TabsContent value="culture" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="font-geist">Company Culture</CardTitle>
                </CardHeader>
                <CardContent>
                  {isEditing ? (
                    <Textarea
                      value={companyData.culture}
                      onChange={(e) => setCompanyData((prev) => ({ ...prev, culture: e.target.value }))}
                      rows={4}
                      placeholder="Describe your company culture and work environment..."
                    />
                  ) : (
                    <p className="font-manrope leading-relaxed mb-6">{companyData.culture}</p>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="font-geist">Our Values</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {companyValues.map((value) => (
                      <div key={value.id} className="space-y-2">
                        <h3 className="font-semibold">{value.title}</h3>
                        <p className="text-muted-foreground font-manrope text-sm">{value.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Benefits Tab */}
            <TabsContent value="benefits" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="font-geist text-2xl font-semibold">Employee Benefits</h2>
                <Button size="sm" onClick={handleAddBenefit}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Benefit
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {benefits.map((benefit) => (
                  <Card key={benefit.id}>
                    <CardContent className="p-6">
                      {isEditing ? (
                        <div className="space-y-4">
                          <div className="flex justify-between items-start">
                            <div className="space-y-4 flex-1">
                              <div>
                                <Label>Benefit Name</Label>
                                <Input
                                  value={benefit.name}
                                  onChange={(e) => handleUpdateBenefit(benefit.id, { name: e.target.value })}
                                />
                              </div>
                              <div>
                                <Label>Description</Label>
                                <Textarea
                                  value={benefit.description}
                                  onChange={(e) => handleUpdateBenefit(benefit.id, { description: e.target.value })}
                                  rows={2}
                                />
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteBenefit(benefit.id)}
                              className="text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-geist text-lg font-semibold">{benefit.name}</h3>
                          </div>
                          <p className="font-manrope text-muted-foreground">{benefit.description}</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Gallery Tab */}
            <TabsContent value="gallery" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="font-geist text-2xl font-semibold">Company Gallery</h2>
                <Button size="sm">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Photos
                </Button>
              </div>

              <div className="border-2 border-dashed border-border rounded-lg p-12 text-center">
                <ImageIcon className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Showcase Your Workplace</h3>
                <p className="text-muted-foreground mb-4">
                  Upload photos of your office, team events, and company culture to attract top talent
                </p>
                <Button>
                  <Upload className="h-4 w-4 mr-2" />
                  Upload First Photo
                </Button>
              </div>
            </TabsContent>

            {/* Hiring Tab */}
            <TabsContent value="hiring" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="font-geist">Hiring Preferences</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label>Preferred Experience Level</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select experience level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="entry">Entry Level</SelectItem>
                          <SelectItem value="mid">Mid Level</SelectItem>
                          <SelectItem value="senior">Senior Level</SelectItem>
                          <SelectItem value="all">All Levels</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Remote Work Policy</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select remote policy" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="onsite">On-site Only</SelectItem>
                          <SelectItem value="hybrid">Hybrid</SelectItem>
                          <SelectItem value="remote">Fully Remote</SelectItem>
                          <SelectItem value="flexible">Flexible</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label>Hiring Process</Label>
                    <Textarea
                      placeholder="Describe your typical hiring process (e.g., application review, phone screen, technical interview, final interview)"
                      rows={4}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="font-geist">Hiring Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary">15</div>
                      <div className="text-sm text-muted-foreground">Active Job Postings</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary">247</div>
                      <div className="text-sm text-muted-foreground">Total Applications</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary">8</div>
                      <div className="text-sm text-muted-foreground">Hires This Month</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

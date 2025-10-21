"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { X, Plus, CheckCircle } from "lucide-react"

export function PostJobForm() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    salaryMin: "",
    salaryMax: "",
    employeeCount: "",
    duration: "",
    jobType: "",
    remote: false,
    deadline: "",
  })
  const [skills, setSkills] = useState<string[]>([])
  const [newSkill, setNewSkill] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()])
      setNewSkill("")
    }
  }

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 2000))

      console.log("Job posted:", { ...formData, skills })
      setIsSuccess(true)

      // Auto reset form after success
      setTimeout(() => {
        setIsSuccess(false)
        setFormData({
          title: "",
          description: "",
          location: "",
          salaryMin: "",
          salaryMax: "",
          employeeCount: "",
          duration: "",
          jobType: "",
          remote: false,
          deadline: "",
        })
        setSkills([])
      }, 3000)
    } catch (error) {
      console.error("Failed to post job:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <Card className="animate-in fade-in zoom-in-95 duration-500">
        <CardContent className="text-center py-12">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4 animate-pulse" />
          <h3 className="text-2xl font-bold text-green-600 mb-2">Job Posted Successfully!</h3>
          <p className="text-muted-foreground">
            Your job posting has been published and is now visible to job seekers.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="animate-in fade-in slide-in-from-bottom duration-300">
      <CardHeader>
        <CardTitle className="font-geist text-2xl">Post a New Job</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Job Title */}
            <div className="md:col-span-2 animate-in fade-in slide-in-from-left duration-300">
              <Label htmlFor="title">Job Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder="e.g. Senior Frontend Developer"
                required
                disabled={isSubmitting}
                className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
              />
            </div>

            {/* Job Type */}
            <div className="animate-in fade-in slide-in-from-left duration-300 delay-100">
              <Label htmlFor="jobType">Job Type *</Label>
              <Select
                value={formData.jobType}
                onValueChange={(value) => handleInputChange("jobType", value)}
                disabled={isSubmitting}
              >
                <SelectTrigger className="transition-all duration-200 focus:ring-2 focus:ring-primary/20">
                  <SelectValue placeholder="Select job type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="full-time">Full-time</SelectItem>
                  <SelectItem value="part-time">Part-time</SelectItem>
                  <SelectItem value="contract">Contract</SelectItem>
                  <SelectItem value="freelance">Freelance</SelectItem>
                  <SelectItem value="internship">Internship</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Location */}
            <div className="animate-in fade-in slide-in-from-left duration-300 delay-150">
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                placeholder="e.g. San Francisco, CA"
                required
                disabled={isSubmitting}
                className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
              />
            </div>

            {/* Salary Range */}
            <div className="animate-in fade-in slide-in-from-left duration-300 delay-200">
              <Label htmlFor="salaryMin">Minimum Salary ($)</Label>
              <Input
                id="salaryMin"
                type="number"
                value={formData.salaryMin}
                onChange={(e) => handleInputChange("salaryMin", e.target.value)}
                placeholder="80000"
                disabled={isSubmitting}
                className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div className="animate-in fade-in slide-in-from-left duration-300 delay-250">
              <Label htmlFor="salaryMax">Maximum Salary ($)</Label>
              <Input
                id="salaryMax"
                type="number"
                value={formData.salaryMax}
                onChange={(e) => handleInputChange("salaryMax", e.target.value)}
                placeholder="120000"
                disabled={isSubmitting}
                className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
              />
            </div>

            {/* Number of Employees */}
            <div className="animate-in fade-in slide-in-from-left duration-300 delay-300">
              <Label htmlFor="employeeCount">Number of Employees Required</Label>
              <Input
                id="employeeCount"
                type="number"
                value={formData.employeeCount}
                onChange={(e) => handleInputChange("employeeCount", e.target.value)}
                placeholder="1"
                min="1"
                disabled={isSubmitting}
                className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
              />
            </div>

            {/* Duration */}
            <div className="animate-in fade-in slide-in-from-left duration-300 delay-350">
              <Label htmlFor="duration">Duration</Label>
              <Select
                value={formData.duration}
                onValueChange={(value) => handleInputChange("duration", value)}
                disabled={isSubmitting}
              >
                <SelectTrigger className="transition-all duration-200 focus:ring-2 focus:ring-primary/20">
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="permanent">Permanent</SelectItem>
                  <SelectItem value="3-months">3 months</SelectItem>
                  <SelectItem value="6-months">6 months</SelectItem>
                  <SelectItem value="1-year">1 year</SelectItem>
                  <SelectItem value="2-years">2 years</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="md:col-span-2 animate-in fade-in slide-in-from-left duration-300 delay-375">
              <Label htmlFor="deadline">Application Deadline *</Label>
              <Input
                id="deadline"
                type="date"
                value={formData.deadline}
                onChange={(e) => handleInputChange("deadline", e.target.value)}
                min={new Date().toISOString().split("T")[0]}
                required
                disabled={isSubmitting}
                className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Last date for candidates to submit their applications
              </p>
            </div>
          </div>

          {/* Remote Work */}
          <div className="flex items-center space-x-2 animate-in fade-in slide-in-from-left duration-300 delay-400">
            <Checkbox
              id="remote"
              checked={formData.remote}
              onCheckedChange={(checked) => handleInputChange("remote", checked as boolean)}
              disabled={isSubmitting}
            />
            <Label htmlFor="remote" className="cursor-pointer">
              Remote work available
            </Label>
          </div>

          {/* Required Skills */}
          <div className="animate-in fade-in slide-in-from-left duration-300 delay-450">
            <Label>Required Skills</Label>
            <div className="flex gap-2 mb-2">
              <Input
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="Add a skill"
                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
                disabled={isSubmitting}
                className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
              />
              <Button
                type="button"
                onClick={addSkill}
                variant="outline"
                disabled={isSubmitting}
                className="hover:scale-105 transition-all duration-200 bg-transparent"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <Badge
                  key={skill}
                  variant="secondary"
                  className="flex items-center gap-1 animate-in fade-in slide-in-from-bottom duration-200"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {skill}
                  <X
                    className="h-3 w-3 cursor-pointer hover:scale-125 transition-transform duration-200"
                    onClick={() => removeSkill(skill)}
                  />
                </Badge>
              ))}
            </div>
          </div>

          {/* Job Description */}
          <div className="animate-in fade-in slide-in-from-left duration-300 delay-500">
            <Label htmlFor="description">Job Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Describe the role, responsibilities, and what you're looking for in a candidate..."
              rows={6}
              required
              disabled={isSubmitting}
              className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
            />
          </div>

          {/* Submit Button */}
          <div className="animate-in fade-in slide-in-from-bottom duration-300 delay-600">
            <Button
              type="submit"
              className="w-full md:w-auto px-8 hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <LoadingSpinner size="sm" className="mr-2" />
                  Posting Job...
                </>
              ) : (
                "Post Job"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

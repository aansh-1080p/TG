"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, MapPin, Briefcase, Mail, Phone, ExternalLink } from "lucide-react"

// Mock applicants data
const mockApplicants = [
  {
    id: 1,
    name: "Sarah Chen",
    email: "sarah.chen@email.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    experience: "5+ years",
    skills: ["React", "TypeScript", "Next.js", "Node.js"],
    rating: 0,
    appliedDate: "2024-01-16",
    status: "New",
    resume: "/resume-sarah-chen.pdf",
  },
  {
    id: 2,
    name: "Marcus Johnson",
    email: "marcus.j@email.com",
    phone: "+1 (555) 987-6543",
    location: "New York, NY",
    experience: "3+ years",
    skills: ["React", "JavaScript", "CSS", "Python"],
    rating: 4,
    appliedDate: "2024-01-15",
    status: "Reviewed",
    resume: "/resume-marcus-johnson.pdf",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    email: "emily.r@email.com",
    phone: "+1 (555) 456-7890",
    location: "Austin, TX",
    experience: "7+ years",
    skills: ["React", "TypeScript", "GraphQL", "AWS"],
    rating: 5,
    appliedDate: "2024-01-14",
    status: "Shortlisted",
    resume: "/resume-emily-rodriguez.pdf",
  },
  {
    id: 4,
    name: "David Kim",
    email: "david.kim@email.com",
    phone: "+1 (555) 321-0987",
    location: "Seattle, WA",
    experience: "4+ years",
    skills: ["Vue.js", "JavaScript", "Node.js", "MongoDB"],
    rating: 3,
    appliedDate: "2024-01-13",
    status: "Interviewed",
    resume: "/resume-david-kim.pdf",
  },
]

interface ApplicantsTabProps {
  selectedJob: any
}

export function ApplicantsTab({ selectedJob }: ApplicantsTabProps) {
  const [applicants, setApplicants] = useState(mockApplicants)

  const updateRating = (applicantId: number, rating: number) => {
    setApplicants((prev) =>
      prev.map((applicant) => (applicant.id === applicantId ? { ...applicant, rating } : applicant)),
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "New":
        return "bg-blue-500"
      case "Reviewed":
        return "bg-yellow-500"
      case "Shortlisted":
        return "bg-green-500"
      case "Interviewed":
        return "bg-purple-500"
      case "Rejected":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  if (!selectedJob) {
    return (
      <div className="text-center py-12">
        <Briefcase className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">Select a Job to View Applicants</h3>
        <p className="text-muted-foreground">Choose a job from the "My Jobs" tab to see its applicants.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-geist text-2xl font-semibold">Applicants for {selectedJob.title}</h2>
          <p className="text-muted-foreground">{applicants.length} total applicants</p>
        </div>
        <Badge variant="outline">{selectedJob.status}</Badge>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {applicants.map((applicant) => (
          <Card key={applicant.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 flex-1">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={`/applicant-${applicant.id}.png`} />
                    <AvatarFallback>
                      {applicant.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-geist text-lg font-semibold">{applicant.name}</h3>
                      <Badge className={`${getStatusColor(applicant.status)} text-white`}>{applicant.status}</Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Mail className="h-4 w-4" />
                          <span>{applicant.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Phone className="h-4 w-4" />
                          <span>{applicant.phone}</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          <span>{applicant.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Briefcase className="h-4 w-4" />
                          <span>{applicant.experience}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="font-semibold mb-2 text-sm">Skills</h4>
                      <div className="flex flex-wrap gap-1">
                        {applicant.skills.map((skill) => (
                          <Badge key={skill} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold mb-1 text-sm">Your Rating</h4>
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-4 w-4 cursor-pointer ${
                                star <= applicant.rating
                                  ? "fill-primary text-primary"
                                  : "text-muted-foreground hover:text-primary"
                              }`}
                              onClick={() => updateRating(applicant.id, star)}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          View Resume
                        </Button>
                        <Button size="sm">Contact</Button>
                      </div>
                    </div>

                    <div className="mt-2 text-xs text-muted-foreground">Applied on {applicant.appliedDate}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

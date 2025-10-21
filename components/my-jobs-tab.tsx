"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, DollarSign, Clock, Users, Eye } from "lucide-react"

interface Job {
  id: number
  title: string
  location: string
  salary: string
  type: string
  remote: boolean
  postedDate: string
  status: string
  applicants: number
  description: string
  requirements: string[]
}

interface MyJobsTabProps {
  jobs: Job[]
  onViewApplicants: (job: Job) => void
}

export function MyJobsTab({ jobs, onViewApplicants }: MyJobsTabProps) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="font-geist text-2xl font-semibold">My Posted Jobs</h2>
        <Badge variant="outline">{jobs.length} Total Jobs</Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {jobs.map((job) => (
          <Card key={job.id} className="hover:shadow-lg transition-all duration-200 border-2 hover:border-primary/20">
            <CardHeader className="pb-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <CardTitle className="font-geist text-lg mb-2">{job.title}</CardTitle>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{job.location}</span>
                    </div>
                    {job.remote && (
                      <Badge variant="secondary" className="text-xs">
                        Remote
                      </Badge>
                    )}
                  </div>
                </div>
                <Badge className={job.status === "Active" ? "bg-green-500" : "bg-gray-500"}>{job.status}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <DollarSign className="h-4 w-4" />
                  <span>{job.salary}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>Posted on {job.postedDate}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>{job.applicants} applicants</span>
                </div>
              </div>

              <div>
                <div className="flex flex-wrap gap-1 mb-4">
                  {job.requirements.slice(0, 3).map((skill) => (
                    <Badge key={skill} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                  {job.requirements.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{job.requirements.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" className="flex-1 bg-transparent">
                  <Eye className="h-4 w-4 mr-2" />
                  Edit Job
                </Button>
                <Button onClick={() => onViewApplicants(job)} className="flex-1">
                  <Users className="h-4 w-4 mr-2" />
                  View Applicants ({job.applicants})
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

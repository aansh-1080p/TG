"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Building, Plus, Users, FileText } from "lucide-react"
import { MainNav } from "@/components/navigation/main-nav"
import { BreadcrumbNav } from "@/components/navigation/breadcrumb-nav"
import { EmployerProfileCard } from "@/components/employer-profile-card"
import { PostJobForm } from "@/components/post-job-form"
import { MyJobsTab } from "@/components/my-jobs-tab"
import { ApplicantsTab } from "@/components/applicants-tab"
import { useJobs } from "@/lib/job-context"

// Mock notifications
const mockNotifications = [
  {
    id: 1,
    message: "New application for Senior Frontend Developer",
    time: "2 hours ago",
    unread: true,
  },
  {
    id: 2,
    message: "Application withdrawn for Product Designer",
    time: "1 day ago",
    unread: true,
  },
  {
    id: 3,
    message: "Job posting approved: Backend Engineer",
    time: "2 days ago",
    unread: false,
  },
]

export default function EmployerDashboard() {
  const { jobs, applications, getJobStats } = useJobs()
  const [selectedJob, setSelectedJob] = useState<any>(null)
  const unreadCount = mockNotifications.filter((n) => n.unread).length

  const employerJobs = jobs.filter((job) => job.employerId === 1) // Mock employer ID
  const stats = getJobStats(1)

  const breadcrumbItems = [{ label: "Dashboard", current: true }]

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <MainNav currentPage="dashboard" notifications={unreadCount} userType="employer" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <BreadcrumbNav items={breadcrumbItems} className="mb-6" />

        <div className="flex gap-8">
          {/* Employer Profile Card - Always Visible */}
          <div className="w-80 flex-shrink-0">
            <EmployerProfileCard />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview" className="flex items-center gap-2">
                  <Building className="h-4 w-4" />
                  Overview
                </TabsTrigger>
                <TabsTrigger value="post-job" className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Post Job
                </TabsTrigger>
                <TabsTrigger value="my-jobs" className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  My Jobs ({employerJobs.length})
                </TabsTrigger>
                <TabsTrigger value="applicants" className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Applicants
                </TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Active Jobs</CardTitle>
                      <FileText className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{stats.activeJobs}</div>
                      <p className="text-xs text-muted-foreground">Currently hiring</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
                      <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{stats.totalApplications}</div>
                      <p className="text-xs text-muted-foreground">Across all jobs</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Response Rate</CardTitle>
                      <Building className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{stats.responseRate}%</div>
                      <p className="text-xs text-muted-foreground">Application responses</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Recent Activity */}
                <Card>
                  <CardHeader>
                    <CardTitle className="font-geist">Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockNotifications.slice(0, 3).map((notification) => (
                        <div key={notification.id} className="flex items-start space-x-4">
                          <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                          <div className="flex-1">
                            <p className="font-manrope text-sm">{notification.message}</p>
                            <p className="text-xs text-muted-foreground">{notification.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Post Job Tab */}
              <TabsContent value="post-job">
                <PostJobForm />
              </TabsContent>

              {/* My Jobs Tab */}
              <TabsContent value="my-jobs">
                <MyJobsTab jobs={employerJobs} onViewApplicants={setSelectedJob} />
              </TabsContent>

              {/* Applicants Tab */}
              <TabsContent value="applicants">
                <ApplicantsTab selectedJob={selectedJob} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}

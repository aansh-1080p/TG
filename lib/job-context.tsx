"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"

export interface Job {
  id: number
  title: string
  company: string
  location: string
  salary: string
  type: string
  remote: boolean
  description: string
  requirements: string[]
  postedDate: string
  deadline?: string
  applicants: number
  status: "Active" | "Closed" | "Draft"
  employerId: number
  category: string
  experience: string
  benefits: string[]
  companySize: string
  industry: string
}

export interface Application {
  id: number
  jobId: number
  applicantId: number
  applicantName: string
  applicantEmail: string
  status: "Pending" | "Reviewed" | "Shortlisted" | "Interviewed" | "Selected" | "Rejected"
  appliedDate: string
  resume?: string
  coverLetter?: string
  rating: number
}

export interface JobFilters {
  search: string
  jobTypes: string[]
  locations: string[]
  salaryMin: number
  salaryMax: number
  remote: boolean
  experience: string[]
  categories: string[]
}

interface JobContextType {
  jobs: Job[]
  applications: Application[]
  savedJobs: number[]
  filters: JobFilters
  loading: boolean

  // Job management
  addJob: (job: Omit<Job, "id" | "postedDate" | "applicants">) => void
  updateJob: (id: number, updates: Partial<Job>) => void
  deleteJob: (id: number) => void

  // Application management
  applyToJob: (jobId: number, applicationData: Omit<Application, "id" | "appliedDate" | "status" | "rating">) => void
  updateApplicationStatus: (applicationId: number, status: Application["status"]) => void
  rateApplicant: (applicationId: number, rating: number) => void
  removeApplication: (applicationId: number) => void
  hasApplied: (jobId: number) => boolean

  // Job seeker actions
  toggleSaveJob: (jobId: number) => void

  // Search and filtering
  updateFilters: (newFilters: Partial<JobFilters>) => void
  getFilteredJobs: () => Job[]
  searchJobs: (query: string) => Job[]

  // Analytics
  getJobStats: (employerId?: number) => {
    totalJobs: number
    activeJobs: number
    totalApplications: number
    responseRate: number
  }
}

const JobContext = createContext<JobContextType | undefined>(undefined)

// Mock data - in a real app, this would come from an API
const mockJobs: Job[] = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    salary: "$120k - $160k",
    type: "Full-time",
    remote: true,
    description:
      "We're looking for a senior frontend developer to join our team and help build the next generation of web applications. You'll work with cutting-edge technologies and collaborate with a talented team of engineers.",
    requirements: ["React", "TypeScript", "Next.js", "Tailwind CSS", "GraphQL"],
    postedDate: "2024-01-15",
    deadline: "2024-02-28",
    applicants: 45,
    status: "Active",
    employerId: 1,
    category: "Engineering",
    experience: "Senior",
    benefits: ["Health Insurance", "401k", "Remote Work", "Flexible Hours"],
    companySize: "50-200",
    industry: "Technology",
  },
  {
    id: 2,
    title: "Product Designer",
    company: "Design Studio",
    location: "New York, NY",
    salary: "$90k - $130k",
    type: "Full-time",
    remote: false,
    description:
      "Join our creative team as a product designer and help shape user experiences that delight millions of users worldwide.",
    requirements: ["Figma", "Adobe Creative Suite", "User Research", "Prototyping", "Design Systems"],
    postedDate: "2024-01-10",
    deadline: "2024-02-15",
    applicants: 23,
    status: "Active",
    employerId: 2,
    category: "Design",
    experience: "Mid-level",
    benefits: ["Health Insurance", "Creative Budget", "Learning Stipend"],
    companySize: "10-50",
    industry: "Design",
  },
  {
    id: 3,
    title: "Full Stack Engineer",
    company: "StartupXYZ",
    location: "Austin, TX",
    salary: "$100k - $140k",
    type: "Full-time",
    remote: true,
    description: "Looking for a versatile full stack engineer to help build and scale our platform from the ground up.",
    requirements: ["Node.js", "React", "PostgreSQL", "AWS", "Docker"],
    postedDate: "2024-01-08",
    deadline: "2024-03-01",
    applicants: 67,
    status: "Active",
    employerId: 3,
    category: "Engineering",
    experience: "Mid-level",
    benefits: ["Equity", "Health Insurance", "Remote Work"],
    companySize: "10-50",
    industry: "Technology",
  },
  {
    id: 4,
    title: "DevOps Engineer",
    company: "CloudTech",
    location: "Seattle, WA",
    salary: "$110k - $150k",
    type: "Full-time",
    remote: true,
    description: "Help us scale our infrastructure and improve our deployment processes.",
    requirements: ["Docker", "Kubernetes", "AWS", "Terraform", "CI/CD"],
    postedDate: "2024-01-05",
    deadline: "2024-02-20",
    applicants: 34,
    status: "Active",
    employerId: 4,
    category: "Engineering",
    experience: "Senior",
    benefits: ["Health Insurance", "Stock Options", "Remote Work"],
    companySize: "200+",
    industry: "Cloud Services",
  },
  {
    id: 5,
    title: "Backend Engineer",
    company: "DataCorp",
    location: "Boston, MA",
    salary: "$95k - $135k",
    type: "Full-time",
    remote: false,
    description: "Join our backend team to build scalable APIs and data processing systems.",
    requirements: ["Python", "Django", "PostgreSQL", "Redis", "Celery"],
    postedDate: "2024-01-03",
    deadline: "2024-01-31",
    applicants: 28,
    status: "Closed",
    employerId: 5,
    category: "Engineering",
    experience: "Mid-level",
    benefits: ["Health Insurance", "401k", "Learning Budget"],
    companySize: "50-200",
    industry: "Data Analytics",
  },
]

const mockApplications: Application[] = [
  {
    id: 1,
    jobId: 1,
    applicantId: 1,
    applicantName: "Sarah Chen",
    applicantEmail: "sarah.chen@email.com",
    status: "Shortlisted",
    appliedDate: "2024-01-16",
    rating: 0,
  },
  {
    id: 2,
    jobId: 2,
    applicantId: 1,
    applicantName: "Sarah Chen",
    applicantEmail: "sarah.chen@email.com",
    status: "Pending",
    appliedDate: "2024-01-10",
    rating: 0,
  },
  {
    id: 3,
    jobId: 3,
    applicantId: 1,
    applicantName: "Sarah Chen",
    applicantEmail: "sarah.chen@email.com",
    status: "Selected",
    appliedDate: "2024-01-08",
    rating: 0,
  },
  {
    id: 4,
    jobId: 5,
    applicantId: 1,
    applicantName: "Sarah Chen",
    applicantEmail: "sarah.chen@email.com",
    status: "Rejected",
    appliedDate: "2024-01-05",
    rating: 0,
  },
]

export function JobProvider({ children }: { children: React.ReactNode }) {
  const [jobs, setJobs] = useState<Job[]>(mockJobs)
  const [applications, setApplications] = useState<Application[]>(mockApplications)
  const [savedJobs, setSavedJobs] = useState<number[]>([])
  const [loading, setLoading] = useState(false)
  const [filters, setFilters] = useState<JobFilters>({
    search: "",
    jobTypes: [],
    locations: [],
    salaryMin: 0,
    salaryMax: 300000,
    remote: false,
    experience: [],
    categories: [],
  })

  // Job management functions
  const addJob = (jobData: Omit<Job, "id" | "postedDate" | "applicants">) => {
    const newJob: Job = {
      ...jobData,
      id: Math.max(...jobs.map((j) => j.id)) + 1,
      postedDate: new Date().toISOString().split("T")[0],
      applicants: 0,
    }
    setJobs((prev) => [newJob, ...prev])
  }

  const updateJob = (id: number, updates: Partial<Job>) => {
    setJobs((prev) => prev.map((job) => (job.id === id ? { ...job, ...updates } : job)))
  }

  const deleteJob = (id: number) => {
    setJobs((prev) => prev.filter((job) => job.id !== id))
    setApplications((prev) => prev.filter((app) => app.jobId !== id))
  }

  // Application management functions
  const applyToJob = (
    jobId: number,
    applicationData: Omit<Application, "id" | "appliedDate" | "status" | "rating">,
  ) => {
    const newApplication: Application = {
      ...applicationData,
      id: Math.max(...applications.map((a) => a.id), 0) + 1,
      appliedDate: new Date().toISOString().split("T")[0],
      status: "Pending",
      rating: 0,
    }
    setApplications((prev) => [newApplication, ...prev])

    // Update job applicant count
    setJobs((prev) => prev.map((job) => (job.id === jobId ? { ...job, applicants: job.applicants + 1 } : job)))
  }

  const updateApplicationStatus = (applicationId: number, status: Application["status"]) => {
    setApplications((prev) => prev.map((app) => (app.id === applicationId ? { ...app, status } : app)))
  }

  const rateApplicant = (applicationId: number, rating: number) => {
    setApplications((prev) => prev.map((app) => (app.id === applicationId ? { ...app, rating } : app)))
  }

  const removeApplication = (applicationId: number) => {
    const application = applications.find((app) => app.id === applicationId)
    if (application) {
      // Decrease job applicant count
      setJobs((prev) =>
        prev.map((job) =>
          job.id === application.jobId ? { ...job, applicants: Math.max(0, job.applicants - 1) } : job,
        ),
      )
    }
    setApplications((prev) => prev.filter((app) => app.id !== applicationId))
  }

  const hasApplied = (jobId: number) => {
    return applications.some((app) => app.jobId === jobId)
  }

  // Job seeker functions
  const toggleSaveJob = (jobId: number) => {
    setSavedJobs((prev) => (prev.includes(jobId) ? prev.filter((id) => id !== jobId) : [...prev, jobId]))
  }

  // Search and filtering functions
  const updateFilters = (newFilters: Partial<JobFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }))
  }

  const getFilteredJobs = (): Job[] => {
    return jobs.filter((job) => {
      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase()
        const matchesSearch =
          job.title.toLowerCase().includes(searchLower) ||
          job.company.toLowerCase().includes(searchLower) ||
          job.requirements.some((req) => req.toLowerCase().includes(searchLower)) ||
          job.location.toLowerCase().includes(searchLower)

        if (!matchesSearch) return false
      }

      // Job type filter
      if (filters.jobTypes.length > 0 && !filters.jobTypes.includes(job.type)) {
        return false
      }

      // Location filter
      if (filters.locations.length > 0) {
        const matchesLocation = filters.locations.some(
          (loc) => job.location.includes(loc) || (loc === "Remote" && job.remote),
        )
        if (!matchesLocation) return false
      }

      // Remote filter
      if (filters.remote && !job.remote) {
        return false
      }

      // Experience filter
      if (filters.experience.length > 0 && !filters.experience.includes(job.experience)) {
        return false
      }

      // Category filter
      if (filters.categories.length > 0 && !filters.categories.includes(job.category)) {
        return false
      }

      // Salary filter
      const jobSalaryMin = Number.parseInt(job.salary.replace(/[^0-9]/g, "").slice(0, -3) + "000")
      if (jobSalaryMin < filters.salaryMin) {
        return false
      }

      return true
    })
  }

  const searchJobs = (query: string): Job[] => {
    if (!query.trim()) return jobs

    const searchLower = query.toLowerCase()
    return jobs.filter(
      (job) =>
        job.title.toLowerCase().includes(searchLower) ||
        job.company.toLowerCase().includes(searchLower) ||
        job.requirements.some((req) => req.toLowerCase().includes(searchLower)) ||
        job.location.toLowerCase().includes(searchLower) ||
        job.description.toLowerCase().includes(searchLower),
    )
  }

  // Analytics functions
  const getJobStats = (employerId?: number) => {
    const relevantJobs = employerId ? jobs.filter((job) => job.employerId === employerId) : jobs
    const totalApplications = applications.filter((app) => relevantJobs.some((job) => job.id === app.jobId)).length

    return {
      totalJobs: relevantJobs.length,
      activeJobs: relevantJobs.filter((job) => job.status === "Active").length,
      totalApplications,
      responseRate:
        totalApplications > 0
          ? Math.round(
              (applications.filter(
                (app) => app.status !== "Pending" && relevantJobs.some((job) => job.id === app.jobId),
              ).length /
                totalApplications) *
                100,
            )
          : 0,
    }
  }

  const contextValue: JobContextType = {
    jobs,
    applications,
    savedJobs,
    filters,
    loading,
    addJob,
    updateJob,
    deleteJob,
    applyToJob,
    updateApplicationStatus,
    rateApplicant,
    removeApplication,
    hasApplied,
    toggleSaveJob,
    updateFilters,
    getFilteredJobs,
    searchJobs,
    getJobStats,
  }

  return <JobContext.Provider value={contextValue}>{children}</JobContext.Provider>
}

export function useJobs() {
  const context = useContext(JobContext)
  if (context === undefined) {
    throw new Error("useJobs must be used within a JobProvider")
  }
  return context
}

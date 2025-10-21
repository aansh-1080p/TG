"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import {
  Briefcase,
  Bell,
  Menu,
  User,
  Settings,
  LogOut,
  Search,
  Building,
  Users,
  FileText,
  BookmarkIcon,
} from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { EnhancedSearch } from "@/components/enhanced-search"

interface MainNavProps {
  currentPage?: string
  showSearch?: boolean
  notifications?: number
  userType?: "job-seeker" | "employer" | "guest"
}

export function MainNav({ currentPage = "", showSearch = false, notifications = 0, userType = "guest" }: MainNavProps) {
  const [showMobileSearch, setShowMobileSearch] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)

  const mockNotifications = [
    {
      id: 1,
      message: userType === "employer" ? "New application received" : "Application status updated",
      time: "2 hours ago",
      unread: true,
    },
    {
      id: 2,
      message: userType === "employer" ? "Job posting approved" : "New job matches your profile",
      time: "1 day ago",
      unread: true,
    },
    {
      id: 3,
      message: "Profile viewed by employer",
      time: "2 days ago",
      unread: false,
    },
  ]

  const getNavLinks = () => {
    switch (userType) {
      case "job-seeker":
        return [
          { href: "/job-seeker", label: "Jobs", active: currentPage === "jobs" },
          { href: "/job-seeker/profile", label: "Profile", active: currentPage === "profile" },
        ]
      case "employer":
        return [
          { href: "/employer", label: "Dashboard", active: currentPage === "dashboard" },
          { href: "/employer/profile", label: "Profile", active: currentPage === "profile" },
        ]
      default:
        return [
          { href: "#jobs", label: "Jobs", active: false },
          { href: "#companies", label: "Companies", active: false },
          { href: "#about", label: "About", active: false },
        ]
    }
  }

  const getUserInfo = () => {
    if (userType === "guest") return null

    return {
      name: userType === "job-seeker" ? "Sarah Chen" : "TechCorp Inc.",
      email: userType === "job-seeker" ? "sarah.chen@email.com" : "hr@techcorp.com",
      avatar: userType === "job-seeker" ? "/professional-headshot.png" : "/company-logo.png",
      fallback: userType === "job-seeker" ? "SC" : "TC",
    }
  }

  const navLinks = getNavLinks()
  const userInfo = getUserInfo()

  return (
    <nav className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Desktop Navigation */}
          <div className="flex items-center space-x-8">
            <a href="/" className="flex items-center space-x-2 cursor-pointer hover:opacity-80 transition-opacity">
              <Briefcase className="h-8 w-8 text-primary" />
              <span className="font-geist text-2xl font-bold text-foreground">QuickHire</span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex">
              <NavigationMenu>
                <NavigationMenuList>
                  {navLinks.map((link) => (
                    <NavigationMenuItem key={link.href}>
                      <NavigationMenuLink
                        href={link.href}
                        className={`px-4 py-2 text-sm font-medium transition-colors ${
                          link.active
                            ? "text-foreground bg-accent"
                            : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                        }`}
                      >
                        {link.label}
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}

                  {/* Additional Navigation for Authenticated Users */}
                  {userType !== "guest" && (
                    <NavigationMenuItem>
                      <NavigationMenuTrigger className="text-muted-foreground hover:text-foreground">
                        More
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div className="grid gap-3 p-4 w-[400px]">
                          {userType === "job-seeker" ? (
                            <>
                              <NavigationMenuLink
                                href="/job-seeker/applications"
                                className="flex items-center gap-3 p-3 rounded-md hover:bg-accent"
                              >
                                <FileText className="h-5 w-5" />
                                <div>
                                  <div className="font-medium">My Applications</div>
                                  <div className="text-sm text-muted-foreground">Track your job applications</div>
                                </div>
                              </NavigationMenuLink>
                              <NavigationMenuLink
                                href="/job-seeker/saved"
                                className="flex items-center gap-3 p-3 rounded-md hover:bg-accent"
                              >
                                <BookmarkIcon className="h-5 w-5" />
                                <div>
                                  <div className="font-medium">Saved Jobs</div>
                                  <div className="text-sm text-muted-foreground">Jobs you've bookmarked</div>
                                </div>
                              </NavigationMenuLink>
                            </>
                          ) : (
                            <>
                              <NavigationMenuLink
                                href="/employer/jobs"
                                className="flex items-center gap-3 p-3 rounded-md hover:bg-accent"
                              >
                                <Briefcase className="h-5 w-5" />
                                <div>
                                  <div className="font-medium">My Jobs</div>
                                  <div className="text-sm text-muted-foreground">Manage your job postings</div>
                                </div>
                              </NavigationMenuLink>
                              <NavigationMenuLink
                                href="/employer/candidates"
                                className="flex items-center gap-3 p-3 rounded-md hover:bg-accent"
                              >
                                <Users className="h-5 w-5" />
                                <div>
                                  <div className="font-medium">Candidates</div>
                                  <div className="text-sm text-muted-foreground">Browse and manage applicants</div>
                                </div>
                              </NavigationMenuLink>
                            </>
                          )}
                        </div>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  )}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>

          {/* Search Bar (Desktop) */}
          {showSearch && (
            <div className="hidden lg:flex flex-1 max-w-lg mx-8">
              <EnhancedSearch onOpenFilters={() => {}} />
            </div>
          )}

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Search Button (Mobile) */}
            {showSearch && (
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setShowMobileSearch(!showMobileSearch)}
              >
                <Search className="h-5 w-5" />
              </Button>
            )}

            {/* Notifications */}
            {userType !== "guest" && (
              <div className="relative">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative"
                >
                  <Bell className="h-5 w-5" />
                  {notifications > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                      {notifications}
                    </Badge>
                  )}
                </Button>

                {/* Notifications Dropdown */}
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-popover border border-border rounded-lg shadow-lg z-50">
                    <div className="p-4">
                      <h3 className="font-semibold mb-3">Notifications</h3>
                      <div className="space-y-3">
                        {mockNotifications.map((notification) => (
                          <div
                            key={notification.id}
                            className={`p-3 rounded-lg ${
                              notification.unread ? "bg-primary/5 border border-primary/20" : "bg-muted/50"
                            }`}
                          >
                            <p className="text-sm font-manrope">{notification.message}</p>
                            <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                          </div>
                        ))}
                      </div>
                      <Button variant="outline" className="w-full mt-3 bg-transparent" size="sm">
                        View All Notifications
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* User Menu or Auth Buttons */}
            {userType !== "guest" && userInfo ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={userInfo.avatar || "/placeholder.svg"} alt={userInfo.name} />
                      <AvatarFallback>{userInfo.fallback}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{userInfo.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">{userInfo.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <a href={userType === "job-seeker" ? "/job-seeker/profile" : "/employer/profile"}>
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => (window.location.href = "/")}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost">Login</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <a href="/auth/login/job-seeker">Job Seeker Login</a>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <a href="/auth/login/employer">Employer Login</a>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button>Sign Up</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <a href="/auth/register/job-seeker">Job Seeker Sign Up</a>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <a href="/auth/register/employer">Employer Sign Up</a>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col space-y-4 mt-4">
                  {/* Mobile User Info */}
                  {userInfo && (
                    <div className="flex items-center space-x-3 pb-4 border-b">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={userInfo.avatar || "/placeholder.svg"} alt={userInfo.name} />
                        <AvatarFallback>{userInfo.fallback}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{userInfo.name}</p>
                        <p className="text-sm text-muted-foreground">{userInfo.email}</p>
                      </div>
                    </div>
                  )}

                  {/* Mobile Navigation Links */}
                  <div className="space-y-2">
                    {navLinks.map((link) => (
                      <Button
                        key={link.href}
                        variant={link.active ? "secondary" : "ghost"}
                        className="w-full justify-start"
                        asChild
                      >
                        <a href={link.href}>
                          {link.label === "Jobs" && <Search className="mr-2 h-4 w-4" />}
                          {link.label === "Dashboard" && <Building className="mr-2 h-4 w-4" />}
                          {link.label === "Profile" && <User className="mr-2 h-4 w-4" />}
                          {link.label}
                        </a>
                      </Button>
                    ))}
                  </div>

                  {/* Mobile Additional Links */}
                  {userType !== "guest" && (
                    <div className="space-y-2 pt-4 border-t">
                      {userType === "job-seeker" ? (
                        <>
                          <Button variant="ghost" className="w-full justify-start" asChild>
                            <a href="/job-seeker/applications">
                              <FileText className="mr-2 h-4 w-4" />
                              My Applications
                            </a>
                          </Button>
                          <Button variant="ghost" className="w-full justify-start" asChild>
                            <a href="/job-seeker/saved">
                              <BookmarkIcon className="mr-2 h-4 w-4" />
                              Saved Jobs
                            </a>
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button variant="ghost" className="w-full justify-start" asChild>
                            <a href="/employer/jobs">
                              <Briefcase className="mr-2 h-4 w-4" />
                              My Jobs
                            </a>
                          </Button>
                          <Button variant="ghost" className="w-full justify-start" asChild>
                            <a href="/employer/candidates">
                              <Users className="mr-2 h-4 w-4" />
                              Candidates
                            </a>
                          </Button>
                        </>
                      )}
                    </div>
                  )}

                  {/* Mobile Auth Actions */}
                  {userType !== "guest" && (
                    <div className="space-y-2 pt-4 border-t">
                      <Button variant="ghost" className="w-full justify-start">
                        <Settings className="mr-2 h-4 w-4" />
                        Settings
                      </Button>
                      <Button
                        variant="ghost"
                        className="w-full justify-start"
                        onClick={() => (window.location.href = "/")}
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Log out
                      </Button>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {showSearch && showMobileSearch && (
          <div className="lg:hidden py-4 border-t">
            <EnhancedSearch onOpenFilters={() => {}} />
          </div>
        )}
      </div>
    </nav>
  )
}

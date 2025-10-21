import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Star, Edit, MapPin, Building, Users, Calendar } from "lucide-react"

export function EmployerProfileCard() {
  return (
    <Card className="sticky top-24">
      <CardHeader className="text-center pb-4">
        <Avatar className="w-20 h-20 mx-auto mb-4">
          <AvatarImage src="/company-logo.png" />
          <AvatarFallback>TC</AvatarFallback>
        </Avatar>
        <h3 className="font-geist text-xl font-semibold">TechCorp Inc.</h3>
        <p className="text-muted-foreground font-manrope">Technology Company</p>
        <div className="flex items-center justify-center gap-1 mt-2">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-primary text-primary" />
          ))}
          <span className="text-sm text-muted-foreground ml-1">(4.8)</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            San Francisco, CA
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Building className="h-4 w-4" />
            Software Development
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="h-4 w-4" />
            50-200 employees
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            Founded 2018
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-2 text-sm">Company Focus</h4>
          <div className="flex flex-wrap gap-1">
            <Badge variant="secondary" className="text-xs">
              Web Development
            </Badge>
            <Badge variant="secondary" className="text-xs">
              Mobile Apps
            </Badge>
            <Badge variant="secondary" className="text-xs">
              AI/ML
            </Badge>
            <Badge variant="secondary" className="text-xs">
              Cloud
            </Badge>
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-2 text-sm">Hiring Stats</h4>
          <div className="space-y-1 text-sm text-muted-foreground">
            <div className="flex justify-between">
              <span>Active Jobs</span>
              <span>3</span>
            </div>
            <div className="flex justify-between">
              <span>Total Applications</span>
              <span>135</span>
            </div>
            <div className="flex justify-between">
              <span>Hired This Month</span>
              <span>2</span>
            </div>
          </div>
        </div>

        <Button className="w-full bg-transparent" variant="outline">
          <Edit className="h-4 w-4 mr-2" />
          Edit Profile
        </Button>
      </CardContent>
    </Card>
  )
}

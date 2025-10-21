import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Star, Edit, MapPin, Briefcase } from "lucide-react"

export function ProfileCard() {
  return (
    <Card className="sticky top-24">
      <CardHeader className="text-center pb-4">
        <Avatar className="w-20 h-20 mx-auto mb-4">
          <AvatarImage src="/professional-headshot.png" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <h3 className="font-geist text-xl font-semibold">John Doe</h3>
        <p className="text-muted-foreground font-manrope">Frontend Developer</p>
        <div className="flex items-center justify-center gap-1 mt-2">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-primary text-primary" />
          ))}
          <span className="text-sm text-muted-foreground ml-1">(4.9)</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            San Francisco, CA
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Briefcase className="h-4 w-4" />
            5+ years experience
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-2 text-sm">Top Skills</h4>
          <div className="flex flex-wrap gap-1">
            <Badge variant="secondary" className="text-xs">
              React
            </Badge>
            <Badge variant="secondary" className="text-xs">
              TypeScript
            </Badge>
            <Badge variant="secondary" className="text-xs">
              Next.js
            </Badge>
            <Badge variant="secondary" className="text-xs">
              Tailwind
            </Badge>
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-2 text-sm">Quick Stats</h4>
          <div className="space-y-1 text-sm text-muted-foreground">
            <div className="flex justify-between">
              <span>Profile Views</span>
              <span>127</span>
            </div>
            <div className="flex justify-between">
              <span>Applications</span>
              <span>12</span>
            </div>
            <div className="flex justify-between">
              <span>Response Rate</span>
              <span>85%</span>
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

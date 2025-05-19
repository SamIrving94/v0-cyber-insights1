import { Card, CardContent, CardHeader, CardTitle } from "./Card"

interface ProfileDisplayProps {
  profile: {
    name: string
    industry: string
    size: string
    revenue: string
    location: string
    technologyProfile: {
      cloudServices: string[]
      dataTypes: string[]
      securityMeasures: string[]
    }
  }
}

export function ProfileDisplay({ profile }: ProfileDisplayProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{profile.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium text-sm text-muted-foreground mb-2">Business Profile</h4>
            <ul className="space-y-2">
              <li>
                <span className="font-medium">Industry:</span> {profile.industry}
              </li>
              <li>
                <span className="font-medium">Size:</span> {profile.size}
              </li>
              <li>
                <span className="font-medium">Revenue:</span> {profile.revenue}
              </li>
              <li>
                <span className="font-medium">Location:</span> {profile.location}
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-sm text-muted-foreground mb-2">Technology Profile</h4>
            <ul className="space-y-2">
              <li>
                <span className="font-medium">Cloud Services:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {profile.technologyProfile.cloudServices.map((service) => (
                    <span key={service} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                      {service}
                    </span>
                  ))}
                </div>
              </li>
              <li>
                <span className="font-medium">Data Types:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {profile.technologyProfile.dataTypes.map((type) => (
                    <span key={type} className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                      {type}
                    </span>
                  ))}
                </div>
              </li>
              <li>
                <span className="font-medium">Security Measures:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {profile.technologyProfile.securityMeasures.map((measure) => (
                    <span key={measure} className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs">
                      {measure}
                    </span>
                  ))}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

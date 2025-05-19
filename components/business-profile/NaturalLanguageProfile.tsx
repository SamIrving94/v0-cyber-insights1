import { Card, CardContent } from "@/components/ui/Card"

interface NaturalLanguageProfileProps {
  profile: {
    name: string
    industry: string
    subIndustry?: string
    size: string
    employees?: {
      count: number
      range: string
    }
    revenue: string
    location: string
    businessFunctions?: string[]
    technologyProfile: {
      cloudServices: string[]
      dataTypes: string[]
      securityMeasures: string[]
    }
  }
}

export function NaturalLanguageProfile({ profile }: NaturalLanguageProfileProps) {
  // Helper function to join array items with commas and "and" for the last item
  const formatList = (items: string[]): string => {
    if (items.length === 0) return ""
    if (items.length === 1) return items[0]

    const lastItem = items[items.length - 1]
    const otherItems = items.slice(0, items.length - 1)

    return `${otherItems.join(", ")} and ${lastItem}`
  }

  // Create employee count text
  const employeeText = profile.employees
    ? `with approximately ${profile.employees.count.toLocaleString()} employees`
    : ""

  // Create business functions text
  const businessFunctionsText =
    profile.businessFunctions && profile.businessFunctions.length > 0
      ? `Your business ${profile.businessFunctions.length > 1 ? "functions include" : "function includes"} ${formatList(profile.businessFunctions)}.`
      : ""

  return (
    <Card className="shadow-md">
      <CardContent className="p-6">
        <h2 className="text-2xl font-semibold mb-6">Your Business Profile</h2>

        <div className="space-y-4 text-lg leading-relaxed">
          <p>
            Based on our records, <span className="font-semibold">{profile.name}</span> is a{" "}
            {profile.size.toLowerCase()}
            {profile.subIndustry ? ` ${profile.subIndustry.toLowerCase()}` : ""} company in the{" "}
            {profile.industry.toLowerCase()} industry {employeeText}. Your annual revenue is in the range of{" "}
            {profile.revenue} and you're primarily based in {profile.location}.
          </p>

          {businessFunctionsText && <p>{businessFunctionsText}</p>}

          <p>
            Your technology profile indicates the use of {formatList(profile.technologyProfile.cloudServices)} for your
            IT operations. You handle sensitive data including{" "}
            {formatList(profile.technologyProfile.dataTypes.map((type) => type.toLowerCase()))}.
          </p>

          <p>
            Your current security measures include{" "}
            {formatList(profile.technologyProfile.securityMeasures.map((measure) => measure.toLowerCase()))}.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

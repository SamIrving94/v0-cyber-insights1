"use client"
import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/Card"
import { useClientProfile } from "@/hooks/useClientProfile"
import { Shield, Lock, FileText, Users, Download, ArrowLeft } from "lucide-react"

export default function RecommendationsPage() {
  const { profile } = useClientProfile()
  const [selectedCategory, setSelectedCategory] = useState("all")

  if (!profile) {
    return (
      <div className="container mx-auto px-4 py-12 flex items-center justify-center min-h-[calc(100vh-200px)]">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  // Sample recommendations data
  const recommendations = [
    {
      id: "cyber-insurance",
      category: "insurance",
      title: "Obtain Standalone Cyber Insurance",
      description: "A dedicated cyber policy would provide comprehensive coverage for the identified risks.",
      priority: "High",
      estimatedCost: "$5,000 - $15,000 annually",
      implementation: "1-2 months",
      details:
        "Based on your business profile, we recommend a cyber insurance policy with at least $1M in coverage. This should include coverage for ransomware, data breaches, business interruption, and third-party liability.",
    },
    {
      id: "mfa",
      category: "security",
      title: "Implement Multi-Factor Authentication",
      description: "This would significantly reduce the risk of unauthorized access to your systems.",
      priority: "High",
      estimatedCost: "$5-15 per user monthly",
      implementation: "1-2 weeks",
      details:
        "Deploy MFA across all critical systems, especially email, VPN, and cloud services. This simple measure can prevent up to 99.9% of account compromise attacks.",
    },
    {
      id: "incident-response",
      category: "planning",
      title: "Develop an Incident Response Plan",
      description: "A well-prepared response plan can reduce recovery time and financial impact.",
      priority: "Medium",
      estimatedCost: "$5,000 - $15,000",
      implementation: "1-3 months",
      details:
        "Create a formal incident response plan that includes roles and responsibilities, communication protocols, and step-by-step procedures for different types of incidents.",
    },
    {
      id: "backup",
      category: "security",
      title: "Implement 3-2-1 Backup Strategy",
      description: "Proper backups are critical for recovery from ransomware and other destructive attacks.",
      priority: "High",
      estimatedCost: "$2,000 - $10,000 annually",
      implementation: "2-4 weeks",
      details:
        "Maintain at least three copies of data on two different media types with one copy stored offsite. Test backup restoration regularly.",
    },
    {
      id: "training",
      category: "training",
      title: "Regular Security Awareness Training",
      description: "Human error is involved in over 85% of breaches. Training can significantly reduce this risk.",
      priority: "Medium",
      estimatedCost: "$15-30 per user annually",
      implementation: "Ongoing",
      details:
        "Implement quarterly security awareness training for all employees, with a focus on phishing recognition, password security, and social engineering tactics.",
    },
    {
      id: "endpoint",
      category: "security",
      title: "Advanced Endpoint Protection",
      description: "Modern endpoint protection can detect and prevent sophisticated attacks.",
      priority: "Medium",
      estimatedCost: "$30-60 per endpoint annually",
      implementation: "2-4 weeks",
      details:
        "Replace traditional antivirus with next-generation endpoint protection that includes behavioral analysis and machine learning capabilities.",
    },
  ]

  const filteredRecommendations =
    selectedCategory === "all" ? recommendations : recommendations.filter((rec) => rec.category === selectedCategory)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Recommendations & Next Steps</h1>
      <p className="text-muted-foreground mb-8">
        Based on your business profile and identified coverage gaps, here are our tailored recommendations.
      </p>

      <div className="mb-6">
        <div className="flex flex-wrap gap-2 mb-4">
          <Button
            variant={selectedCategory === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory("all")}
          >
            All Recommendations
          </Button>
          <Button
            variant={selectedCategory === "insurance" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory("insurance")}
          >
            <Shield className="h-4 w-4 mr-1" /> Insurance
          </Button>
          <Button
            variant={selectedCategory === "security" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory("security")}
          >
            <Lock className="h-4 w-4 mr-1" /> Security
          </Button>
          <Button
            variant={selectedCategory === "planning" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory("planning")}
          >
            <FileText className="h-4 w-4 mr-1" /> Planning
          </Button>
          <Button
            variant={selectedCategory === "training" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory("training")}
          >
            <Users className="h-4 w-4 mr-1" /> Training
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {filteredRecommendations.map((recommendation) => (
          <Card key={recommendation.id}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{recommendation.title}</CardTitle>
                <span
                  className={`text-xs px-2 py-1 rounded ${
                    recommendation.priority === "High"
                      ? "bg-red-100 text-red-800"
                      : recommendation.priority === "Medium"
                        ? "bg-amber-100 text-amber-800"
                        : "bg-green-100 text-green-800"
                  }`}
                >
                  {recommendation.priority} Priority
                </span>
              </div>
              <CardDescription>{recommendation.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-muted-foreground">Estimated Cost</p>
                    <p className="font-medium">{recommendation.estimatedCost}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Implementation Time</p>
                    <p className="font-medium">{recommendation.implementation}</p>
                  </div>
                </div>
                <div className="text-sm">
                  <p className="text-muted-foreground mb-1">Details</p>
                  <p>{recommendation.details}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Next Steps</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p>
              Based on your business profile and the identified coverage gaps, we recommend the following next steps:
            </p>
            <ol className="space-y-2 ml-6 list-decimal">
              <li className="pl-2">
                <span className="font-medium">Schedule a consultation with a cyber insurance specialist</span> to
                discuss coverage options tailored to your specific needs.
              </li>
              <li className="pl-2">
                <span className="font-medium">Prioritize the high-priority recommendations</span> to address your most
                critical vulnerabilities first.
              </li>
              <li className="pl-2">
                <span className="font-medium">Develop a phased implementation plan</span> for the remaining
                recommendations based on your budget and resources.
              </li>
              <li className="pl-2">
                <span className="font-medium">Consider a formal cyber risk assessment</span> to identify additional
                vulnerabilities specific to your environment.
              </li>
            </ol>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Link href="/risk-scenarios">
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" /> Back to Risk Scenarios
            </Button>
          </Link>
          <Button className="flex items-center gap-2">
            <Download className="h-4 w-4" /> Download Report
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

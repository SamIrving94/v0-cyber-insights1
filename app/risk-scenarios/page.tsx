"use client"
import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/Card"
import { useClientProfile } from "@/hooks/useClientProfile"
import { scenariosData } from "@/data/scenariosData"
import { AlertTriangle, BarChart, DollarSign, Building, Shield } from "lucide-react"

export default function RiskScenariosPage() {
  const { profile } = useClientProfile()
  const [selectedScenario, setSelectedScenario] = useState(scenariosData[0])

  if (!profile) {
    return (
      <div className="container mx-auto px-4 py-12 flex items-center justify-center min-h-[calc(100vh-200px)]">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Risk Scenario Explorer</h1>
      <p className="text-muted-foreground mb-8">
        Explore how these cyber risks have impacted businesses like yours, based on real-world claims data.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-1 space-y-4">
          <h2 className="text-xl font-semibold">Common Scenarios</h2>
          <div className="space-y-2">
            {scenariosData.map((scenario) => (
              <Card
                key={scenario.id}
                className={`cursor-pointer hover:border-blue-300 transition-colors ${selectedScenario.id === scenario.id ? "border-blue-500 bg-blue-50" : ""}`}
                onClick={() => setSelectedScenario(scenario)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      {scenario.id.includes("ransomware") ? (
                        <AlertTriangle className="h-5 w-5 text-red-500" />
                      ) : scenario.id.includes("data-breach") ? (
                        <Shield className="h-5 w-5 text-amber-500" />
                      ) : (
                        <Building className="h-5 w-5 text-blue-500" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium">{scenario.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">{scenario.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>{selectedScenario.title}</CardTitle>
            <CardDescription>{selectedScenario.description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Frequency</h3>
                <div className="flex items-center gap-2">
                  <BarChart className="h-5 w-5 text-blue-600" />
                  <span className="text-lg font-semibold">{selectedScenario.frequency}</span>
                </div>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Average Cost</h3>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-blue-600" />
                  <span className="text-lg font-semibold">{selectedScenario.averageCost}</span>
                </div>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Your Industry Impact</h3>
                <div className="flex items-center gap-2">
                  <Building className="h-5 w-5 text-blue-600" />
                  <span
                    className={`text-lg font-semibold ${
                      selectedScenario.industryImpact[
                        profile.industry as keyof typeof selectedScenario.industryImpact
                      ] === "Critical"
                        ? "text-red-600"
                        : selectedScenario.industryImpact[
                              profile.industry as keyof typeof selectedScenario.industryImpact
                            ] === "High"
                          ? "text-amber-600"
                          : "text-blue-600"
                    }`}
                  >
                    {selectedScenario.industryImpact[
                      profile.industry as keyof typeof selectedScenario.industryImpact
                    ] || "Medium"}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-2">Business Impacts</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {selectedScenario.businessImpacts.map((impact, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-amber-500" />
                    <span>{impact}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gray-50 border rounded-lg p-4">
              <h3 className="font-medium mb-2">Real-World Example</h3>
              <p className="text-sm">{selectedScenario.realWorldExample}</p>
            </div>

            <div>
              <h3 className="font-medium mb-2">Industry Impact</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {Object.entries(selectedScenario.industryImpact).map(([industry, impact]) => (
                  <div key={industry} className="border rounded-lg p-3">
                    <h4 className="text-sm font-medium">{industry}</h4>
                    <span
                      className={`text-xs px-2 py-1 rounded ${
                        impact === "Critical"
                          ? "bg-red-100 text-red-800"
                          : impact === "High"
                            ? "bg-amber-100 text-amber-800"
                            : impact === "Medium"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-green-100 text-green-800"
                      }`}
                    >
                      {impact}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Link href="/coverage-gaps">
              <Button variant="outline">Back to Coverage Analysis</Button>
            </Link>
            <Link href="/recommendations">
              <Button>View Recommendations</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

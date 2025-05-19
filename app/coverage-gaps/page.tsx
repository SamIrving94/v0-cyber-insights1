"use client"
import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/Card"
import { useClientProfile } from "@/hooks/useClientProfile"
import { simulationScenarios } from "@/data/simulationData"
import { formatCurrency } from "@/utils/formatters"
import { AlertTriangle, CheckCircle, Shield, DollarSign, Clock, BarChart } from "lucide-react"

export default function CoverageGapsPage() {
  const { profile } = useClientProfile()
  const [selectedTab, setSelectedTab] = useState("overview")

  if (!profile) {
    return (
      <div className="container mx-auto px-4 py-12 flex items-center justify-center min-h-[calc(100vh-200px)]">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  // Get the appropriate scenario based on the user's industry
  const scenario =
    simulationScenarios[profile.industry as keyof typeof simulationScenarios] || simulationScenarios["Retail"] // Default to Retail if no match

  // Calculate coverage percentage
  const totalImpact = Number.parseInt(scenario.totalFinancialImpact.replace(/[^0-9]/g, ""))
  const protectedImpact = Number.parseInt(scenario.protectedFinancialImpact.replace(/[^0-9]/g, ""))
  const coveragePercentage = Math.round((protectedImpact / totalImpact) * 100)
  const gapPercentage = 100 - coveragePercentage

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Coverage Gap Analysis</h1>
      <p className="text-muted-foreground mb-8">
        Based on your business profile, we've identified potential coverage gaps for common cyber incidents.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl flex items-center gap-2">
              <Shield className="h-5 w-5 text-blue-600" />
              {scenario.title} Scenario
            </CardTitle>
            <CardDescription>{scenario.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Tabs */}
              <div className="flex border-b">
                <button
                  className={`px-4 py-2 font-medium ${
                    selectedTab === "overview" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-500"
                  }`}
                  onClick={() => setSelectedTab("overview")}
                >
                  Overview
                </button>
                <button
                  className={`px-4 py-2 font-medium ${
                    selectedTab === "details" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-500"
                  }`}
                  onClick={() => setSelectedTab("details")}
                >
                  Impact Details
                </button>
                <button
                  className={`px-4 py-2 font-medium ${
                    selectedTab === "example" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-500"
                  }`}
                  onClick={() => setSelectedTab("example")}
                >
                  Real-World Example
                </button>
              </div>

              {/* Tab Content */}
              {selectedTab === "overview" && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h3 className="font-medium mb-2 flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-blue-600" />
                        Financial Impact
                      </h3>
                      <p className="text-2xl font-bold">{scenario.totalFinancialImpact}</p>
                      <p className="text-sm text-muted-foreground">Estimated total cost</p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h3 className="font-medium mb-2 flex items-center gap-2">
                        <Clock className="h-4 w-4 text-blue-600" />
                        Recovery Time
                      </h3>
                      <p className="text-2xl font-bold">{scenario.recoveryTime}</p>
                      <p className="text-sm text-muted-foreground">Estimated business disruption</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Business Impacts</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {scenario.businessImpacts.map((impact, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4 text-amber-500" />
                          <span>{impact}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Industry Benchmark</h3>
                    <p className="mb-2">
                      <span className="font-medium">{scenario.industryBenchmark.percentageWithCoverage}%</span> of{" "}
                      {profile.industry} businesses have cyber coverage for this type of incident.
                    </p>
                    <p>
                      Typical coverage amount:{" "}
                      <span className="font-medium">{scenario.industryBenchmark.typicalCoverageAmount}</span>
                    </p>
                  </div>
                </div>
              )}

              {selectedTab === "details" && (
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Component Impacts</h3>
                    <div className="space-y-3">
                      {Object.entries(scenario.componentImpacts).map(([component, impact]) => (
                        <div key={component} className="border rounded-lg p-3">
                          <div className="flex justify-between items-center mb-1">
                            <h4 className="font-medium capitalize">{component.replace(/-/g, " ")}</h4>
                            <div className="flex items-center">
                              {scenario.protectedComponents.includes(component) ? (
                                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded flex items-center gap-1">
                                  <CheckCircle className="h-3 w-3" /> Protected
                                </span>
                              ) : (
                                <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded flex items-center gap-1">
                                  <AlertTriangle className="h-3 w-3" /> Gap
                                </span>
                              )}
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{impact.description}</p>
                          <div className="flex justify-between text-sm">
                            <span>
                              Financial Impact: <strong>{impact.financialImpact}</strong>
                            </span>
                            <span>
                              Recovery: <strong>{impact.recoveryTime}</strong>
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {selectedTab === "example" && (
                <div className="space-y-4">
                  <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
                    <h3 className="font-medium mb-2 flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-amber-600" />
                      Real-World Example
                    </h3>
                    <p>{scenario.realWorldExample}</p>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Industry Impact</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {Object.entries(scenario.industryImpact).map(([industry, impact]) => (
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
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Coverage Analysis</CardTitle>
            <CardDescription>Your estimated protection level</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Coverage Gauge */}
              <div className="relative h-40 w-40 mx-auto">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  {/* Background circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="10"
                    strokeDasharray="283"
                    strokeDashoffset="0"
                  />
                  {/* Foreground circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke={coveragePercentage < 30 ? "#ef4444" : coveragePercentage < 70 ? "#f59e0b" : "#22c55e"}
                    strokeWidth="10"
                    strokeDasharray="283"
                    strokeDashoffset={283 - (283 * coveragePercentage) / 100}
                    strokeLinecap="round"
                    transform="rotate(-90 50 50)"
                  />
                  <text x="50" y="50" textAnchor="middle" dominantBaseline="middle" className="text-2xl font-bold">
                    {coveragePercentage}%
                  </text>
                  <text x="50" y="65" textAnchor="middle" dominantBaseline="middle" className="text-xs">
                    Coverage
                  </text>
                </svg>
              </div>

              {/* Coverage Stats */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Protected Amount:</span>
                  <span className="font-medium">{scenario.protectedFinancialImpact}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Coverage Gap:</span>
                  <span className="font-medium text-red-600">
                    {formatCurrency(
                      Number.parseInt(scenario.totalFinancialImpact.replace(/[^0-9]/g, "")) -
                        Number.parseInt(scenario.protectedFinancialImpact.replace(/[^0-9]/g, "")),
                    )}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Recovery Time Reduction:</span>
                  <span className="font-medium">{scenario.protectedRecoveryTime}</span>
                </div>
              </div>

              {/* Coverage Status */}
              <div
                className={`p-3 rounded-lg ${profile.coverageStatus?.hasCoverage ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"}`}
              >
                <h3 className="font-medium mb-1 flex items-center gap-2">
                  {profile.coverageStatus?.hasCoverage ? (
                    <>
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>You have cyber coverage</span>
                    </>
                  ) : (
                    <>
                      <AlertTriangle className="h-4 w-4 text-red-600" />
                      <span>No cyber coverage</span>
                    </>
                  )}
                </h3>
                <p className="text-sm">
                  {profile.coverageStatus?.hasCoverage
                    ? `Your ${profile.coverageStatus.coverageType || "cyber policy"} provides some protection, but gaps remain.`
                    : "Without cyber insurance, your business bears the full financial impact of cyber incidents."}
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Link href="/risk-scenarios" className="w-full">
              <Button className="w-full">Explore Risk Scenarios</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>

      {/* Recommendations Preview */}
      <Card className="mb-8">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl flex items-center gap-2">
            <BarChart className="h-5 w-5 text-blue-600" />
            Key Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Based on your business profile and the identified coverage gaps, here are our key recommendations:
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Consider a standalone cyber insurance policy</p>
                  <p className="text-sm text-muted-foreground">
                    A dedicated cyber policy would provide comprehensive coverage for the identified risks.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Implement multi-factor authentication</p>
                  <p className="text-sm text-muted-foreground">
                    This would significantly reduce the risk of unauthorized access to your systems.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Develop an incident response plan</p>
                  <p className="text-sm text-muted-foreground">
                    A well-prepared response plan can reduce recovery time and financial impact.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-3">
          <Link href="/recommendations" className="w-full">
            <Button variant="outline" className="w-full">
              View All Recommendations
            </Button>
          </Link>
          <Button className="w-full">Speak to a Specialist</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

"use client"
import { useState } from "react"
import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Shield, ShieldAlert, ShieldCheck, HelpCircle } from "lucide-react"
import { useClientProfile } from "@/hooks/useClientProfile"

type CoverageStatus = {
  hasCoverage: boolean
  coverageType?: string
  provider?: string
  renewalDate?: string
  coverageLimits?: string
}

export function CoverageStatusSection() {
  const { profile, updateCoverageStatus } = useClientProfile()
  const [isExpanded, setIsExpanded] = useState(false)

  // Default to "No Current Cyber Coverage" for the demo
  const currentStatus = profile?.coverageStatus || { hasCoverage: false }

  const handleStatusChange = (hasCoverage: boolean) => {
    updateCoverageStatus({ hasCoverage })
    if (hasCoverage) {
      setIsExpanded(true)
    } else {
      setIsExpanded(false)
    }
  }

  const handleDetailsSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const coverageDetails: CoverageStatus = {
      hasCoverage: true,
      coverageType: formData.get("coverageType") as string,
      provider: formData.get("provider") as string,
      renewalDate: formData.get("renewalDate") as string,
      coverageLimits: formData.get("coverageLimits") as string,
    }

    updateCoverageStatus(coverageDetails)
    setIsExpanded(false)
  }

  return (
    <Card className="shadow-md mt-8">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl flex items-center gap-2">
          <Shield className="h-5 w-5 text-blue-600" />
          Current Coverage Status
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-6">
          Knowing your current cyber coverage helps us provide more relevant recommendations and identify potential
          gaps. This information improves the accuracy of our analysis without requiring detailed policy information.
        </p>

        <div className="flex flex-col space-y-4">
          <div className="flex flex-wrap gap-4">
            <Button
              variant={currentStatus.hasCoverage === false ? "default" : "outline"}
              className="flex items-center gap-2 min-w-[200px]"
              onClick={() => handleStatusChange(false)}
            >
              <ShieldAlert className="h-4 w-4" />
              No Current Cyber Coverage
            </Button>
            <Button
              variant={currentStatus.hasCoverage === true ? "default" : "outline"}
              className="flex items-center gap-2 min-w-[200px]"
              onClick={() => handleStatusChange(true)}
            >
              <ShieldCheck className="h-4 w-4" />
              Have Cyber Coverage
            </Button>
          </div>

          {isExpanded && (
            <form onSubmit={handleDetailsSubmit} className="mt-4 space-y-4 border rounded-md p-4 bg-gray-50">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="coverageType" className="text-sm font-medium flex items-center gap-1">
                    Coverage Type
                    <HelpCircle className="h-3 w-3 text-muted-foreground" />
                  </label>
                  <select
                    id="coverageType"
                    name="coverageType"
                    className="w-full p-2 border rounded-md"
                    defaultValue={currentStatus.coverageType || ""}
                  >
                    <option value="">Select Coverage Type</option>
                    <option value="Standalone Cyber Policy">Standalone Cyber Policy</option>
                    <option value="Cyber Endorsement">Cyber Endorsement</option>
                    <option value="Package Policy">Package Policy</option>
                    <option value="Not Sure">Not Sure</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="provider" className="text-sm font-medium">
                    Insurance Provider (Optional)
                  </label>
                  <input
                    type="text"
                    id="provider"
                    name="provider"
                    className="w-full p-2 border rounded-md"
                    placeholder="e.g., ABC Insurance"
                    defaultValue={currentStatus.provider || ""}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="renewalDate" className="text-sm font-medium">
                    Renewal Date (Optional)
                  </label>
                  <input
                    type="month"
                    id="renewalDate"
                    name="renewalDate"
                    className="w-full p-2 border rounded-md"
                    defaultValue={currentStatus.renewalDate || ""}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="coverageLimits" className="text-sm font-medium flex items-center gap-1">
                    Coverage Limits (Optional)
                    <HelpCircle className="h-3 w-3 text-muted-foreground" />
                  </label>
                  <select
                    id="coverageLimits"
                    name="coverageLimits"
                    className="w-full p-2 border rounded-md"
                    defaultValue={currentStatus.coverageLimits || ""}
                  >
                    <option value="">Select Coverage Limits</option>
                    <option value="Less than $1M">Less than $1M</option>
                    <option value="$1M - $5M">$1M - $5M</option>
                    <option value="$5M - $10M">$5M - $10M</option>
                    <option value="More than $10M">More than $10M</option>
                    <option value="Not Sure">Not Sure</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsExpanded(false)}>
                  Cancel
                </Button>
                <Button type="submit">Save Coverage Details</Button>
              </div>
            </form>
          )}

          {currentStatus.hasCoverage && !isExpanded && currentStatus.coverageType && (
            <div className="mt-2 p-4 border rounded-md bg-blue-50">
              <h4 className="font-medium mb-2">Your Coverage Details</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="font-medium">Type:</span> {currentStatus.coverageType}
                </div>
                {currentStatus.provider && (
                  <div>
                    <span className="font-medium">Provider:</span> {currentStatus.provider}
                  </div>
                )}
                {currentStatus.renewalDate && (
                  <div>
                    <span className="font-medium">Renewal:</span> {currentStatus.renewalDate}
                  </div>
                )}
                {currentStatus.coverageLimits && (
                  <div>
                    <span className="font-medium">Limits:</span> {currentStatus.coverageLimits}
                  </div>
                )}
                <div className="col-span-2 mt-2">
                  <Button size="sm" variant="outline" onClick={() => setIsExpanded(true)}>
                    Edit Details
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

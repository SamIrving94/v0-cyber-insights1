"use client"
import { useState } from "react"
import type React from "react"

import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/Card"
import { InfoIcon } from "lucide-react"

interface ProfileEditFormProps {
  profile: {
    id: string
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
  onSave: (profile: any) => void
  onCancel: () => void
}

// Sample data for dropdowns and checkboxes
const industries = [
  "Retail",
  "Manufacturing",
  "Healthcare",
  "Technology",
  "Professional Services",
  "Financial Services",
  "Education",
  "Hospitality",
]

const subIndustries = {
  Retail: ["Apparel", "Electronics", "Grocery", "General Merchandise", "Specialty"],
  Manufacturing: ["Automotive", "Electronics", "Food & Beverage", "Pharmaceuticals", "Textiles"],
  Healthcare: ["Hospitals", "Clinics", "Medical Devices", "Pharmaceuticals", "Insurance"],
  Technology: ["Software", "Hardware", "IT Services", "Telecommunications", "E-commerce"],
  "Professional Services": ["Legal", "Accounting", "Consulting", "Marketing", "Architecture"],
  "Financial Services": ["Banking", "Insurance", "Investment", "Fintech", "Wealth Management"],
  Education: ["K-12", "Higher Education", "EdTech", "Training", "Research"],
  Hospitality: ["Hotels", "Restaurants", "Travel", "Entertainment", "Events"],
}

const employeeRanges = ["1-10", "11-50", "51-200", "201-500", "501-1,000", "1,001-5,000", "5,001-10,000", "10,000+"]

const revenueRanges = [
  "Under $1M",
  "$1M - $10M",
  "$10M - $50M",
  "$50M - $100M",
  "$100M - $250M",
  "$250M - $500M",
  "$500M - $1B",
  "Over $1B",
]

const locations = [
  "United States",
  "Canada",
  "United Kingdom",
  "European Union",
  "Asia Pacific",
  "Latin America",
  "Middle East",
  "Africa",
  "Global",
]

const businessFunctions = [
  "E-commerce",
  "Payment Processing",
  "Customer Data Storage",
  "Supply Chain Management",
  "Manufacturing",
  "Research & Development",
  "Professional Services",
  "Healthcare Services",
  "Financial Services",
  "Education",
]

const cloudServices = [
  "AWS",
  "Microsoft Azure",
  "Google Cloud",
  "IBM Cloud",
  "Oracle Cloud",
  "Salesforce",
  "Microsoft 365",
  "G Suite / Google Workspace",
  "Dropbox",
  "Box",
  "Shopify",
  "SAP",
  "Industrial IoT Platform",
  "Electronic Health Record System",
  "Telemedicine Platform",
]

const dataTypes = [
  "Customer PII",
  "Payment Information",
  "Intellectual Property",
  "Supply Chain Data",
  "Employee Information",
  "Patient Health Information (PHI)",
  "Insurance Data",
  "Research Data",
  "Financial Data",
  "Educational Records",
]

const securityMeasures = [
  "Basic Firewall",
  "Endpoint Protection",
  "Annual Security Training",
  "Network Segmentation",
  "SIEM Solution",
  "Quarterly Security Training",
  "HIPAA Compliance Controls",
  "Data Encryption",
  "Access Control",
  "Multi-Factor Authentication",
  "Penetration Testing",
  "Security Audits",
  "Incident Response Plan",
  "Backup and Recovery",
]

export function ProfileEditForm({ profile, onSave, onCancel }: ProfileEditFormProps) {
  const [formData, setFormData] = useState({
    ...profile,
  })

  const [selectedIndustry, setSelectedIndustry] = useState(profile.industry)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    if (name === "industry") {
      setSelectedIndustry(value)
      // Reset subIndustry when industry changes
      setFormData((prev) => ({
        ...prev,
        subIndustry: "",
      }))
    }
  }

  const handleCheckboxChange = (category: string, item: string, checked: boolean) => {
    setFormData((prev) => {
      let updatedItems

      if (category === "businessFunctions") {
        updatedItems = checked
          ? [...(prev.businessFunctions || []), item]
          : (prev.businessFunctions || []).filter((i) => i !== item)
        return { ...prev, businessFunctions: updatedItems }
      } else if (category === "cloudServices") {
        updatedItems = checked
          ? [...prev.technologyProfile.cloudServices, item]
          : prev.technologyProfile.cloudServices.filter((i) => i !== item)
        return {
          ...prev,
          technologyProfile: {
            ...prev.technologyProfile,
            cloudServices: updatedItems,
          },
        }
      } else if (category === "dataTypes") {
        updatedItems = checked
          ? [...prev.technologyProfile.dataTypes, item]
          : prev.technologyProfile.dataTypes.filter((i) => i !== item)
        return {
          ...prev,
          technologyProfile: {
            ...prev.technologyProfile,
            dataTypes: updatedItems,
          },
        }
      } else if (category === "securityMeasures") {
        updatedItems = checked
          ? [...prev.technologyProfile.securityMeasures, item]
          : prev.technologyProfile.securityMeasures.filter((i) => i !== item)
        return {
          ...prev,
          technologyProfile: {
            ...prev.technologyProfile,
            securityMeasures: updatedItems,
          },
        }
      }

      return prev
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  const Tooltip = ({ text }: { text: string }) => (
    <div className="group relative ml-1 inline-block">
      <InfoIcon className="h-4 w-4 text-muted-foreground" />
      <div className="absolute left-full top-0 z-10 ml-2 w-64 rounded bg-black p-2 text-xs text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
        {text}
      </div>
    </div>
  )

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle>Update Your Business Profile</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          <p className="text-sm text-muted-foreground mb-4">
            Please confirm or update the following information to ensure we provide the most relevant insights.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Company Name */}
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium flex items-center">
                Company Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
              />
            </div>

            {/* Industry */}
            <div className="space-y-2">
              <label htmlFor="industry" className="text-sm font-medium flex items-center">
                Industry
                <Tooltip text="Your industry helps us identify the most relevant cyber risks and benchmarks." />
              </label>
              <select
                id="industry"
                name="industry"
                value={formData.industry}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
              >
                <option value="">Select Industry</option>
                {industries.map((industry) => (
                  <option key={industry} value={industry}>
                    {industry}
                  </option>
                ))}
              </select>
            </div>

            {/* Sub-Industry */}
            <div className="space-y-2">
              <label htmlFor="subIndustry" className="text-sm font-medium">
                Sub-Industry
              </label>
              <select
                id="subIndustry"
                name="subIndustry"
                value={formData.subIndustry || ""}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
                disabled={!selectedIndustry || !(selectedIndustry in subIndustries)}
              >
                <option value="">Select Sub-Industry</option>
                {selectedIndustry &&
                  subIndustries[selectedIndustry as keyof typeof subIndustries]?.map((subIndustry) => (
                    <option key={subIndustry} value={subIndustry}>
                      {subIndustry}
                    </option>
                  ))}
              </select>
            </div>

            {/* Company Size */}
            <div className="space-y-2">
              <label htmlFor="size" className="text-sm font-medium">
                Company Size
              </label>
              <select
                id="size"
                name="size"
                value={formData.size}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
              >
                <option value="">Select Size</option>
                <option value="Small Business">Small Business</option>
                <option value="Medium Enterprise">Medium Enterprise</option>
                <option value="Large Enterprise">Large Enterprise</option>
              </select>
            </div>

            {/* Revenue Range */}
            <div className="space-y-2">
              <label htmlFor="revenue" className="text-sm font-medium flex items-center">
                Annual Revenue
                <Tooltip text="Revenue helps determine potential financial impact of cyber incidents." />
              </label>
              <select
                id="revenue"
                name="revenue"
                value={formData.revenue}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
              >
                <option value="">Select Revenue Range</option>
                {revenueRanges.map((range) => (
                  <option key={range} value={range}>
                    {range}
                  </option>
                ))}
              </select>
            </div>

            {/* Location */}
            <div className="space-y-2">
              <label htmlFor="location" className="text-sm font-medium flex items-center">
                Primary Location
                <Tooltip text="Location affects regulatory requirements and regional threat landscapes." />
              </label>
              <select
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
              >
                <option value="">Select Location</option>
                {locations.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Business Functions */}
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center">
              Business Functions
              <Tooltip text="Different business functions have unique cyber risk profiles." />
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {businessFunctions.map((func) => (
                <div key={func} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`func-${func}`}
                    checked={formData.businessFunctions?.includes(func) || false}
                    onChange={(e) => handleCheckboxChange("businessFunctions", func, e.target.checked)}
                    className="mr-2"
                  />
                  <label htmlFor={`func-${func}`} className="text-sm">
                    {func}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Technology Profile */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Technology Profile</h3>

            {/* Cloud Services */}
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center">
                Cloud Services
                <Tooltip text="Cloud services can introduce specific security considerations." />
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {cloudServices.map((service) => (
                  <div key={service} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`cloud-${service}`}
                      checked={formData.technologyProfile.cloudServices.includes(service)}
                      onChange={(e) => handleCheckboxChange("cloudServices", service, e.target.checked)}
                      className="mr-2"
                    />
                    <label htmlFor={`cloud-${service}`} className="text-sm">
                      {service}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Data Types */}
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center">
                Data Types
                <Tooltip text="The types of data you handle affect both risk and regulatory requirements." />
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {dataTypes.map((type) => (
                  <div key={type} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`data-${type}`}
                      checked={formData.technologyProfile.dataTypes.includes(type)}
                      onChange={(e) => handleCheckboxChange("dataTypes", type, e.target.checked)}
                      className="mr-2"
                    />
                    <label htmlFor={`data-${type}`} className="text-sm">
                      {type}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Security Measures */}
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center">
                Security Measures
                <Tooltip text="Your security controls help us identify potential vulnerabilities." />
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {securityMeasures.map((measure) => (
                  <div key={measure} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`security-${measure}`}
                      checked={formData.technologyProfile.securityMeasures.includes(measure)}
                      onChange={(e) => handleCheckboxChange("securityMeasures", measure, e.target.checked)}
                      className="mr-2"
                    />
                    <label htmlFor={`security-${measure}`} className="text-sm">
                      {measure}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end space-x-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">Save Changes</Button>
        </CardFooter>
      </form>
    </Card>
  )
}

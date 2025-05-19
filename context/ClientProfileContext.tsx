"use client"

import { createContext, useState, useContext, type ReactNode, useEffect } from "react"
import { clientProfiles } from "@/data/clientProfiles"

type CoverageStatus = {
  hasCoverage: boolean
  coverageType?: string
  provider?: string
  renewalDate?: string
  coverageLimits?: string
}

type ClientProfile = {
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
  coverageStatus?: CoverageStatus
}

type ClientProfileContextType = {
  profile: ClientProfile | null
  setProfile: (profile: ClientProfile) => void
  isProcessing: boolean
  setIsProcessing: (isProcessing: boolean) => void
  availableProfiles: ClientProfile[]
  switchProfile: (profileId: string) => void
  updateCoverageStatus: (status: CoverageStatus) => void
}

const ClientProfileContext = createContext<ClientProfileContextType | undefined>(undefined)

export function ClientProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<ClientProfile | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [availableProfiles, setAvailableProfiles] = useState<ClientProfile[]>(clientProfiles)

  // Initialize with the first profile by default
  useEffect(() => {
    if (!profile && availableProfiles.length > 0) {
      setProfile(availableProfiles[0])
    }
  }, [profile, availableProfiles])

  const switchProfile = (profileId: string) => {
    const newProfile = availableProfiles.find((p) => p.id === profileId)
    if (newProfile) {
      setProfile(newProfile)
    }
  }

  const updateCoverageStatus = (status: CoverageStatus) => {
    if (profile) {
      setProfile({
        ...profile,
        coverageStatus: status,
      })
    }
  }

  return (
    <ClientProfileContext.Provider
      value={{
        profile,
        setProfile,
        isProcessing,
        setIsProcessing,
        availableProfiles,
        switchProfile,
        updateCoverageStatus,
      }}
    >
      {children}
    </ClientProfileContext.Provider>
  )
}

export function useClientProfile() {
  const context = useContext(ClientProfileContext)
  if (context === undefined) {
    throw new Error("useClientProfile must be used within a ClientProfileProvider")
  }
  return context
}

export { ClientProfileContext }

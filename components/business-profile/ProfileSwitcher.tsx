"use client"
import { useState, useEffect } from "react"
import { useClientProfile } from "@/context/ClientProfileContext"
import { Button } from "@/components/ui/Button"
import { ChevronDown, Users } from "lucide-react"

export function ProfileSwitcher() {
  const { availableProfiles, switchProfile, profile } = useClientProfile()
  const [isOpen, setIsOpen] = useState(false)

  // Handle keyboard shortcut (Alt+P)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && e.key === "p") {
        e.preventDefault()
        setIsOpen((prev) => !prev)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  // Close the dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (isOpen) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener("click", handleClickOutside)
    }

    return () => {
      document.removeEventListener("click", handleClickOutside)
    }
  }, [isOpen])

  const handleProfileSelect = (profileId: string) => {
    switchProfile(profileId)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        className="flex items-center gap-1 text-xs text-muted-foreground"
        onClick={(e) => {
          e.stopPropagation()
          setIsOpen(!isOpen)
        }}
      >
        <Users className="h-3 w-3" />
        <span className="sr-only md:not-sr-only">Demo Profiles</span>
        <ChevronDown className="h-3 w-3" />
      </Button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-1 w-64 rounded-md border bg-background shadow-lg z-50">
          <div className="p-2 text-xs text-muted-foreground">
            <p>Select a demo profile (Alt+P)</p>
          </div>
          <div className="max-h-64 overflow-y-auto">
            {availableProfiles.map((demoProfile) => (
              <button
                key={demoProfile.id}
                className={`w-full px-4 py-2 text-left text-sm hover:bg-muted ${
                  profile?.id === demoProfile.id ? "bg-muted font-medium" : ""
                }`}
                onClick={() => handleProfileSelect(demoProfile.id)}
              >
                {demoProfile.name} ({demoProfile.industry})
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

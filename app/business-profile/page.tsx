"use client"
import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/Button"
import { NaturalLanguageProfile } from "@/components/business-profile/NaturalLanguageProfile"
import { ProfileEditForm } from "@/components/business-profile/ProfileEditForm"
import { ProfileSwitcher } from "@/components/business-profile/ProfileSwitcher"
import { CoverageStatusSection } from "@/components/business-profile/CoverageStatusSection"
import { useClientProfile } from "@/hooks/useClientProfile"
import { Edit } from "lucide-react"

export default function BusinessProfilePage() {
  const { profile, setProfile } = useClientProfile()
  const [isEditing, setIsEditing] = useState(false)

  const handleSaveProfile = (updatedProfile: any) => {
    setProfile(updatedProfile)
    setIsEditing(false)
  }

  const handleCancelEdit = () => {
    setIsEditing(false)
  }

  if (!profile) {
    return (
      <div className="container mx-auto px-4 py-12 flex items-center justify-center min-h-[calc(100vh-200px)]">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Business & Technology Profile</h1>
        <ProfileSwitcher />
      </div>

      <div className="max-w-4xl mx-auto">
        {isEditing ? (
          <ProfileEditForm profile={profile} onSave={handleSaveProfile} onCancel={handleCancelEdit} />
        ) : (
          <div className="space-y-6">
            <div className="flex justify-end">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
                onClick={() => setIsEditing(true)}
              >
                <Edit className="h-4 w-4" />
                Update Your Business Profile
              </Button>
            </div>

            <NaturalLanguageProfile profile={profile} />

            {/* Add the Coverage Status Section */}
            <CoverageStatusSection />

            <div className="flex justify-end mt-8">
              <Link href="/data-processing">
                <Button size="lg">Continue with this profile</Button>
              </Link>
            </div>

            <div className="text-sm text-muted-foreground mt-4">
              <p>
                This information helps us show you the most relevant scenarios from our claims database and identify
                potential coverage gaps specific to your business.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

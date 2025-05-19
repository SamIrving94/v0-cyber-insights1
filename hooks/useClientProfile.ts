"use client"

import { useContext } from "react"
import { ClientProfileContext } from "@/context/ClientProfileContext"

export function useClientProfile() {
  const context = useContext(ClientProfileContext)
  if (context === undefined) {
    throw new Error("useClientProfile must be used within a ClientProfileProvider")
  }
  return context
}

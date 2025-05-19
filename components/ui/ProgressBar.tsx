"use client"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface ProgressBarProps {
  progress?: number
  duration?: number
  className?: string
  barClassName?: string
}

export function ProgressBar({ progress: initialProgress, duration, className, barClassName }: ProgressBarProps) {
  const [progress, setProgress] = useState(initialProgress || 0)

  useEffect(() => {
    // If a specific progress value is provided, use that
    if (initialProgress !== undefined) {
      setProgress(initialProgress)
      return
    }

    // If duration is provided, animate from 0 to 100 over that duration
    if (duration) {
      setProgress(0)
      const interval = 100 // Update every 100ms
      const steps = duration / interval
      const increment = 100 / steps
      let currentProgress = 0

      const timer = setInterval(() => {
        currentProgress += increment
        setProgress(Math.min(currentProgress, 100))

        if (currentProgress >= 100) {
          clearInterval(timer)
        }
      }, interval)

      return () => clearInterval(timer)
    }
  }, [initialProgress, duration])

  return (
    <div className={cn("h-2 w-full overflow-hidden rounded-full bg-gray-200", className)}>
      <div
        className={cn("h-full rounded-full bg-blue-500 transition-all duration-300 ease-out", barClassName)}
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}

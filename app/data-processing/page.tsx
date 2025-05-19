"use client"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/Card"
import { ProcessingAnimation } from "@/components/data-processing/ProcessingAnimation"
import { ProgressBar } from "@/components/ui/ProgressBar"
import { useClientProfile } from "@/hooks/useClientProfile"

export default function DataProcessingPage() {
  const router = useRouter()
  const { profile, setIsProcessing } = useClientProfile()
  const processingDuration = 6000 // 6 seconds

  useEffect(() => {
    // Set processing state to true
    setIsProcessing(true)

    // Automatically navigate to the next page after the duration
    const timer = setTimeout(() => {
      setIsProcessing(false)
      router.push("/coverage-gaps")
    }, processingDuration)

    return () => {
      clearTimeout(timer)
      setIsProcessing(false)
    }
  }, [router, setIsProcessing])

  if (!profile) {
    return (
      <div className="container mx-auto px-4 py-12 flex items-center justify-center min-h-[calc(100vh-200px)]">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 flex items-center justify-center min-h-[calc(100vh-200px)]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl"
      >
        <Card className="shadow-lg">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <motion.h1
                className="text-2xl font-bold mb-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                Analyzing Your Risk Profile
              </motion.h1>
              <motion.p
                className="text-muted-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                Matching your business profile to our database of over 10,000 actual cyber claims...
              </motion.p>
            </div>

            <ProcessingAnimation />

            <div className="mt-12 space-y-4">
              <motion.div
                className="text-sm text-muted-foreground text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
              >
                <p>
                  We're identifying coverage gaps and risk scenarios specific to{" "}
                  <span className="font-medium text-foreground">{profile.industry}</span> businesses like yours.
                </p>
              </motion.div>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 0.5 }}>
                <ProgressBar duration={processingDuration} />
              </motion.div>

              <motion.div
                className="text-xs text-center text-muted-foreground mt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 0.5 }}
              >
                <p>
                  Using real claims data to provide you with actionable insights and recommendations tailored to your
                  business.
                </p>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

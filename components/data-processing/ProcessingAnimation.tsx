"use client"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Database, Building, BarChart, Shield } from "lucide-react"

export function ProcessingAnimation() {
  const [stage, setStage] = useState(0)

  useEffect(() => {
    const timer1 = setTimeout(() => setStage(1), 1000)
    const timer2 = setTimeout(() => setStage(2), 2500)
    const timer3 = setTimeout(() => setStage(3), 4000)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
    }
  }, [])

  return (
    <div className="relative h-64 w-full max-w-md mx-auto">
      {/* Business Profile Icon */}
      <motion.div
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-white p-4 rounded-full shadow-md"
        initial={{ x: 0, opacity: 0 }}
        animate={{ x: stage >= 0 ? 0 : -50, opacity: stage >= 0 ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      >
        <Building className="h-10 w-10 text-blue-600" />
      </motion.div>

      {/* Connection Line 1 */}
      <motion.div
        className="absolute left-[72px] top-1/2 h-1 bg-blue-400 -translate-y-1/2"
        initial={{ width: 0 }}
        animate={{ width: stage >= 1 ? 100 : 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      />

      {/* Database Icon */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-full shadow-md"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: stage >= 1 ? 1 : 0, scale: stage >= 1 ? 1 : 0.8 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <Database className="h-10 w-10 text-blue-600" />
      </motion.div>

      {/* Connection Line 2 */}
      <motion.div
        className="absolute right-[72px] top-1/2 h-1 bg-blue-400 -translate-y-1/2"
        initial={{ width: 0 }}
        animate={{ width: stage >= 2 ? 100 : 0 }}
        transition={{ duration: 0.5, delay: 1.7 }}
      />

      {/* Analysis Icon */}
      <motion.div
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-white p-4 rounded-full shadow-md"
        initial={{ x: 0, opacity: 0 }}
        animate={{ x: stage >= 2 ? 0 : 50, opacity: stage >= 2 ? 1 : 0 }}
        transition={{ duration: 0.5, delay: 2 }}
      >
        <BarChart className="h-10 w-10 text-blue-600" />
      </motion.div>

      {/* Data Points Animation */}
      {stage >= 1 && (
        <>
          <motion.div
            className="absolute"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, repeatDelay: 0.5 }}
            style={{
              left: "calc(50% - 40px)",
              top: "calc(50% - 30px)",
              width: "4px",
              height: "4px",
              backgroundColor: "#3B82F6",
              borderRadius: "50%",
            }}
          />
          <motion.div
            className="absolute"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, repeatDelay: 0.3, delay: 0.2 }}
            style={{
              left: "calc(50% - 20px)",
              top: "calc(50% - 10px)",
              width: "4px",
              height: "4px",
              backgroundColor: "#3B82F6",
              borderRadius: "50%",
            }}
          />
          <motion.div
            className="absolute"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, repeatDelay: 0.4, delay: 0.4 }}
            style={{
              left: "calc(50% - 10px)",
              top: "calc(50% - 25px)",
              width: "4px",
              height: "4px",
              backgroundColor: "#3B82F6",
              borderRadius: "50%",
            }}
          />
          <motion.div
            className="absolute"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, repeatDelay: 0.2, delay: 0.6 }}
            style={{
              left: "calc(50% + 15px)",
              top: "calc(50% - 15px)",
              width: "4px",
              height: "4px",
              backgroundColor: "#3B82F6",
              borderRadius: "50%",
            }}
          />
          <motion.div
            className="absolute"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, repeatDelay: 0.3, delay: 0.8 }}
            style={{
              left: "calc(50% + 25px)",
              top: "calc(50% + 10px)",
              width: "4px",
              height: "4px",
              backgroundColor: "#3B82F6",
              borderRadius: "50%",
            }}
          />
        </>
      )}

      {/* Result Icon */}
      {stage >= 3 && (
        <motion.div
          className="absolute left-1/2 top-[calc(100%-30px)] -translate-x-1/2 bg-white p-3 rounded-full shadow-md"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Shield className="h-8 w-8 text-green-600" />
        </motion.div>
      )}

      {/* Labels */}
      <motion.div
        className="absolute left-0 top-[calc(100%-10px)] w-20 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <span className="text-xs font-medium text-gray-600">Your Profile</span>
      </motion.div>

      <motion.div
        className="absolute left-1/2 top-[20px] -translate-x-1/2 w-24 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: stage >= 1 ? 1 : 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        <span className="text-xs font-medium text-gray-600">Claims Database</span>
      </motion.div>

      <motion.div
        className="absolute right-0 top-[calc(100%-10px)] w-20 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: stage >= 2 ? 1 : 0 }}
        transition={{ duration: 0.5, delay: 2.2 }}
      >
        <span className="text-xs font-medium text-gray-600">Risk Analysis</span>
      </motion.div>

      {stage >= 3 && (
        <motion.div
          className="absolute left-1/2 top-[calc(100%+30px)] -translate-x-1/2 w-32 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <span className="text-xs font-medium text-gray-600">Coverage Insights</span>
        </motion.div>
      )}
    </div>
  )
}

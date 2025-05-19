import { cn } from "@/lib/utils"

interface ProgressIndicatorProps {
  steps: string[]
  currentStep: number
  className?: string
}

export function ProgressIndicator({ steps, currentStep, className }: ProgressIndicatorProps) {
  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center">
            <div
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full text-xs font-medium",
                index < currentStep
                  ? "bg-primary text-primary-foreground"
                  : index === currentStep
                    ? "border-2 border-primary bg-white text-primary"
                    : "border border-gray-300 bg-white text-gray-500",
              )}
            >
              {index + 1}
            </div>
            <span
              className={cn(
                "mt-2 text-xs",
                index === currentStep ? "font-medium text-primary" : "text-muted-foreground",
              )}
            >
              {step}
            </span>
          </div>
        ))}
      </div>
      <div className="relative mt-4">
        <div className="absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 bg-gray-200"></div>
        <div
          className="absolute left-0 top-1/2 h-0.5 -translate-y-1/2 bg-primary transition-all duration-300"
          style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
        ></div>
      </div>
    </div>
  )
}

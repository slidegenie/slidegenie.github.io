import React from "react";
import { cn } from "@/lib/utils";

interface StepIndicatorProps {
  steps: string[];
  currentStep: number;
  onStepClick?: (step: number) => void;
  icons?: React.ReactNode[]; // Added icons prop
}

const StepIndicator = ({ steps, currentStep, onStepClick, icons }: StepIndicatorProps) => {
  return (
    <div className="w-full flex items-start">
      {steps.map((step, index) => {
        // Determine if this step is active, completed, or upcoming
        const isActive = index === currentStep;
        const isCompleted = index < currentStep;
        const isClickable = onStepClick && index < currentStep;

        return (
          <div key={index} className="flex-1 relative px-2 pt-1 pb-6">

            {/* Connector Line - Rendered between steps */}
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "absolute top-[1.5rem] h-0.5 z-0", // Position vertically centered with the circle center
                  // Start the line just after the current circle's edge
                  "left-[calc(50%+1.5rem)]",
                  // Make the line span the distance *between the centers* of the two circles, minus the radius on each end
                  "w-[calc(100%-3rem)]",
                  isCompleted ? "bg-brand-500" : "bg-border/80" // Use brand color if *this* step is completed, make border slightly more opaque
                )}
              />
            )}

             {/* Step Circle and Label container */}
            <div className="relative z-10 flex flex-col items-center">
              {/* Step circle */}
              <div
                className={cn(
                  "flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 shadow-sm",
                  isActive
                    ? "bg-gradient-to-r from-brand-500 to-brand-600 text-white ring-4 ring-brand-100"
                    : isCompleted
                      ? "bg-brand-500 text-white"
                      : "bg-secondary text-muted-foreground",
                   isClickable ? "cursor-pointer hover:opacity-90" : "cursor-default"
                )}
                onClick={() => isClickable && onStepClick(index)}
              >
                {isCompleted ? (
                   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z" clipRule="evenodd" />
                  </svg>
                ) : icons && icons[index] ? (
                  icons[index]
                 ) : (
                  index + 1
                )}
              </div>

              {/* Step label */}
              <div className="mt-2 text-center whitespace-nowrap">
                <p className={cn(
                  "text-sm font-medium",
                  isActive ? "text-brand-600 font-semibold" :
                  isCompleted ? "text-foreground" : "text-muted-foreground"
                )}>
                  {step}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StepIndicator;

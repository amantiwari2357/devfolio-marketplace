import React from "react";
import { Progress } from "./progress";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  className?: string;
}

export function ProgressBar({ currentStep, totalSteps, className = "" }: ProgressBarProps) {
  // Calculate the progress percentage
  const progressValue = (currentStep / totalSteps) * 100;

  return (
    <div className={`w-full ${className}`}>
      <div className="flex justify-between mb-2">
        <span className="text-sm font-medium">
          Step {currentStep} of {totalSteps}
        </span>
        <span className="text-sm text-muted-foreground">
          {Math.round(progressValue)}% Complete
        </span>
      </div>
      <Progress value={progressValue} className="h-2" />
    </div>
  );
}

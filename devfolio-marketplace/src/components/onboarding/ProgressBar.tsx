interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressBar = ({ currentStep, totalSteps }: ProgressBarProps) => {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center relative">
            <span className="text-primary-foreground font-bold text-lg">T</span>
            {currentStep === totalSteps && (
              <div className="absolute -top-1 -right-1">
                <div className="w-6 h-6 bg-green-500 rounded-full animate-scale-in" />
              </div>
            )}
          </div>
          
          <div className="flex-1 relative">
            <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-500 ease-out rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Step indicators */}
          <div className="hidden sm:flex items-center gap-2">
            {Array.from({ length: totalSteps }).map((_, idx) => (
              <div
                key={idx}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  idx < currentStep
                    ? "bg-primary scale-110"
                    : idx === currentStep
                    ? "bg-primary"
                    : "bg-muted"
                }`}
              />
            ))}
          </div>
        </div>

        {currentStep < totalSteps && (
          <button className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Skip
          </button>
        )}
      </div>
    </div>
  );
};

export default ProgressBar;
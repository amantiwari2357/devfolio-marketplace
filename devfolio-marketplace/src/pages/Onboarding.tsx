import { useState } from "react";
import ProgressBar from "@/components/onboarding/ProgressBar";
import Step1Profile from "@/components/onboarding/Step1Profile";
import Step2Availability from "@/components/onboarding/Step2Availability";
import Step3Services from "@/components/onboarding/Step3Services";
import Step4WhatsApp from "@/components/onboarding/Step4WhatsApp";
import SEO from "@/components/layout/SEO";

const Onboarding = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-background selection:bg-primary selection:text-primary-foreground">
      <SEO 
        title="Account Setup" 
        description="Complete your profile setup to start offering your services on Devfolio Marketplace." 
      />
      
      <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
      
      <div className="container mx-auto px-4 pt-32 pb-32">
        <div className="max-w-4xl mx-auto">
          {currentStep === 1 && <Step1Profile onNext={handleNext} />}
          {currentStep === 2 && (
            <Step2Availability onNext={handleNext} onBack={handleBack} />
          )}
          {currentStep === 3 && (
            <Step3Services onNext={handleNext} onBack={handleBack} />
          )}
          {currentStep === 4 && <Step4WhatsApp onBack={handleBack} />}
        </div>
      </div>
      
      {/* Visual background accents */}
      <div className="fixed top-0 right-0 -z-10 w-1/2 h-1/2 bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="fixed bottom-0 left-0 -z-10 w-1/2 h-1/2 bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
    </div>
  );
};

export default Onboarding;
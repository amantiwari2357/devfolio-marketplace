import { useState } from "react";
import ProgressBar from "@/components/onboarding/ProgressBar";
import Step1Profile from "@/components/onboarding/Step1Profile";
import Step2Availability from "@/components/onboarding/Step2Availability";
import Step3Services from "@/components/onboarding/Step3Services";
import Step4WhatsApp from "@/components/onboarding/Step4WhatsApp";

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
    <div className="min-h-screen bg-background">
      <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
      
      <div className="container mx-auto px-4 pt-24 pb-32">
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
  );
};

export default Onboarding;
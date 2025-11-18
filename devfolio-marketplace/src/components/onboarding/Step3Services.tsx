import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { userAPI } from "@/services/auth";
import { useState } from "react";

interface Step3ServicesProps {
  onNext: () => void;
  onBack: () => void;
}

const Step3Services = ({ onNext, onBack }: Step3ServicesProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleNext = async () => {
    setIsLoading(true);
    try {
      await userAPI.updateServices({
        services: [{
          name: "Discovery Call",
          description: "A 30-minute introductory session to understand your needs and discuss how I can help you achieve your goals."
        }],
      });
      toast.success("Services updated successfully!");
      onNext();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to update services");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="animate-fade-in">
      <h1 className="text-4xl font-bold mb-2">Let's add some services</h1>
      <p className="text-muted-foreground mb-8">
        We'll help you get set up based on your expertise
      </p>

      <div className="max-w-2xl">
        <p className="text-sm font-medium mb-4">Popular 1:1 services in your expertise</p>

        <Card className="p-6 border-2 border-border hover:border-primary transition-colors cursor-pointer group">
          <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
            Discovery Call
          </h3>
          <p className="text-sm text-muted-foreground">
            A 30-minute introductory session to understand your needs and discuss how I can help you achieve your goals.
          </p>
        </Card>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4">
        <div className="container mx-auto flex items-center justify-between max-w-3xl">
          <Button variant="ghost" onClick={onBack} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <Button
            onClick={handleNext}
            disabled={isLoading}
            className="w-full max-w-md bg-foreground text-background hover:bg-foreground/90"
          >
            {isLoading ? "Updating..." : "Next"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Step3Services;

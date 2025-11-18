import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

interface Step4WhatsAppProps {
  onBack: () => void;
}

const Step4WhatsApp: React.FC<Step4WhatsAppProps> = ({ onBack }) => {
  const [whatsAppNumber, setWhatsAppNumber] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!agreeToTerms) {
      toast.error("Please agree to the terms and conditions");
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      toast.success("Profile setup completed successfully!");
      // In a real app, this would redirect to dashboard
      console.log('WhatsApp setup:', { whatsAppNumber, agreeToTerms });
      setIsSubmitting(false);
    }, 2000);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Connect WhatsApp</h1>
        <p className="text-gray-600">Link your WhatsApp for client communications</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div>
          <Label htmlFor="whatsapp">WhatsApp Number</Label>
          <Input
            id="whatsapp"
            type="tel"
            value={whatsAppNumber}
            onChange={(e) => setWhatsAppNumber(e.target.value)}
            placeholder="+91 98765 43210"
            required
          />
          <p className="text-sm text-gray-500 mt-2">
            We'll send a verification code to confirm this number
          </p>
        </div>

        <div className="bg-blue-50 p-6 rounded-lg">
          <h3 className="font-semibold text-gray-900 mb-2">Why connect WhatsApp?</h3>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• Direct communication with clients</li>
            <li>• Instant booking confirmations</li>
            <li>• Automated reminders and updates</li>
            <li>• Professional client management</li>
          </ul>
        </div>

        <div className="flex items-start space-x-2">
          <Checkbox
            id="terms"
            checked={agreeToTerms}
            onCheckedChange={(checked) => setAgreeToTerms(checked as boolean)}
          />
          <Label htmlFor="terms" className="text-sm leading-relaxed">
            I agree to the{" "}
            <a href="/terms" className="text-blue-600 hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="/privacy" className="text-blue-600 hover:underline">
              Privacy Policy
            </a>
          </Label>
        </div>

        <div className="flex gap-4">
          <Button type="button" variant="outline" onClick={onBack} className="flex-1">
            Back
          </Button>
          <Button type="submit" disabled={isSubmitting} className="flex-1">
            {isSubmitting ? "Setting up..." : "Complete Setup"}
          </Button>
        </div>
      </form>

      <div className="text-center mt-8">
        <p className="text-sm text-gray-500">
          Need help? Contact our support team
        </p>
      </div>
    </div>
  );
};

export default Step4WhatsApp;

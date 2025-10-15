import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Rocket } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface Step4WhatsAppProps {
  onBack: () => void;
}

const Step4WhatsApp = ({ onBack }: Step4WhatsAppProps) => {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const handleLaunch = () => {
    setShowSuccess(true);
    toast.success("Slots Updated Successfully!", {
      duration: 2000,
    });
    
    setTimeout(() => {
      navigate("/");
      toast.success("🎉 Welcome! Your devfolio-marketplace page is live!", {
        duration: 3000,
      });
    }, 1500);
  };

  return (
    <div className="animate-fade-in">
      <h1 className="text-4xl font-bold mb-2">Alright! One last thing</h1>

      <div className="max-w-2xl space-y-6">
        <div>
          <Label htmlFor="whatsapp">Whatsapp number</Label>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 px-3 py-2 bg-muted rounded-l-lg">
              <span className="text-lg">🇮🇳</span>
              <span className="text-sm">+91</span>
            </div>
            <Input
              id="whatsapp"
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="rounded-l-none flex-1"
              placeholder="Enter your WhatsApp number"
            />
          </div>
        </div>

        <Card className="bg-gradient-to-br from-card-cyan to-card-blue border-none p-6">
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="w-24 h-48 bg-gradient-to-b from-green-600 to-green-700 rounded-2xl p-3 relative">
                <div className="absolute top-3 left-3 right-3">
                  <div className="bg-white/20 rounded-lg p-2 text-white text-xs mb-2">
                    <div className="flex items-center gap-1 mb-1">
                      <div className="w-4 h-4 rounded-full bg-primary" />
                      <span className="font-semibold">devfolio-marketplace</span>
                    </div>
                    <p className="text-[10px]">You have a new booking from John.</p>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="bg-white rounded-full px-2 py-1 flex items-center gap-1">
                      <div className="w-3 h-3 bg-green-500 rounded-full" />
                      <span className="text-[8px] font-medium">Bookings</span>
                    </div>
                    <div className="bg-white rounded-full px-2 py-1 flex items-center gap-1">
                      <div className="w-3 h-3 bg-blue-500 rounded-full" />
                      <span className="text-[8px] font-medium">Reminders</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-2">
                Add your WhatsApp number to get booking updates and reminder.
              </h3>
              <p className="text-foreground/80 font-medium">
                97% users love the integration!
              </p>
            </div>
          </div>
        </Card>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4">
        <div className="container mx-auto flex items-center justify-between max-w-3xl">
          <Button variant="ghost" onClick={onBack} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <Button
            onClick={handleLaunch}
            className="w-full max-w-md bg-foreground text-background hover:bg-foreground/90 gap-2"
          >
            <Rocket className="w-4 h-4" />
            Launch your page
          </Button>
        </div>
      </div>

      {showSuccess && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
          <Card className="bg-card p-8 max-w-md animate-scale-in">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-2">Slots Updated Successfully!</h2>
              <p className="text-muted-foreground">Redirecting to your dashboard...</p>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Step4WhatsApp;

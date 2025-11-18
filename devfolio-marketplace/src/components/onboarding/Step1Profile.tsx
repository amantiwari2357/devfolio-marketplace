import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Check } from "lucide-react";
import { toast } from "sonner";
import { userAPI } from "@/services/auth";

interface Step1ProfileProps {
  onNext: () => void;
}

const expertiseOptions = [
  "Cybersecurity", "Law", "Content & Branding", "Others", "HR",
  "Software", "Product", "Study Abroad", "Finance", "Design",
  "Data", "Astrology", "Mental Health & Wellbeing", "Marketing"
];

const Step1Profile = ({ onNext }: Step1ProfileProps) => {
  const [socialUrl, setSocialUrl] = useState("");
  const [username, setUsername] = useState("aman_tiwari45");
  const [country, setCountry] = useState("india");
  const [currency, setCurrency] = useState("inr");
  const [selectedExpertise, setSelectedExpertise] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const toggleExpertise = (expertise: string) => {
    setSelectedExpertise((prev) =>
      prev.includes(expertise)
        ? prev.filter((e) => e !== expertise)
        : [...prev, expertise]
    );
  };

  const handleNext = async () => {
    setIsLoading(true);
    try {
      await userAPI.updateProfile({
        socialUrl: socialUrl || undefined,
        username,
        country,
        currency,
        expertise: selectedExpertise,
      });
      toast.success("Profile updated successfully!");
      onNext();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="animate-fade-in">
      <h1 className="text-4xl font-bold mb-2">Hello there!</h1>
      <p className="text-muted-foreground mb-8">
        In a few moments you will be ready to share your expertise & time
      </p>

      <div className="space-y-6 max-w-2xl">
        <div>
          <Label htmlFor="social">Connect your social account</Label>
          <div className="flex items-center gap-2">
            <span className="px-3 py-2 bg-muted rounded-l-lg text-sm">https://</span>
            <Input
              id="social"
              placeholder="LinkedIn, Twitter, Instagram"
              value={socialUrl}
              onChange={(e) => setSocialUrl(e.target.value)}
              className="rounded-l-none flex-1"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="username">Your devfolio-marketplace page link</Label>
          <div className="flex items-center gap-2">
            <span className="px-3 py-2 bg-muted rounded-l-lg text-sm">devfolio-marketplace.io/</span>
            <div className="relative flex-1">
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="rounded-l-none pr-10"
              />
              <Check className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="country">Country</Label>
            <Select value={country} onValueChange={setCountry}>
              <SelectTrigger id="country">
                <SelectValue>
                  <div className="flex items-center gap-2">
                    <span className="text-lg">🇮🇳</span>
                    <span>India</span>
                  </div>
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="india">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">🇮🇳</span>
                    <span>India</span>
                  </div>
                </SelectItem>
                <SelectItem value="usa">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">🇺🇸</span>
                    <span>United States</span>
                  </div>
                </SelectItem>
                <SelectItem value="uk">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">🇬🇧</span>
                    <span>United Kingdom</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="currency">Currency</Label>
            <Select value={currency} onValueChange={setCurrency}>
              <SelectTrigger id="currency">
                <SelectValue placeholder="₹ (Indian Rupee)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="inr">₹ (Indian Rupee)</SelectItem>
                <SelectItem value="usd">$ (US Dollar)</SelectItem>
                <SelectItem value="gbp">£ (British Pound)</SelectItem>
                <SelectItem value="eur">€ (Euro)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label>Select your expertise</Label>
          <div className="flex flex-wrap gap-2 mt-2">
            {expertiseOptions.map((expertise) => (
              <Button
                key={expertise}
                variant={selectedExpertise.includes(expertise) ? "default" : "outline"}
                onClick={() => toggleExpertise(expertise)}
                type="button"
                className={selectedExpertise.includes(expertise) ? "bg-foreground text-background hover:bg-foreground/90" : ""}
              >
                {expertise}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4">
        <div className="container mx-auto flex justify-center">
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

export default Step1Profile;

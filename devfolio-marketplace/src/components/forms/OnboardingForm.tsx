import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { userAPI, type User, type OnboardingRequest } from "@/services/auth";
import { toast } from "sonner";
import { Rocket, Zap } from "lucide-react";

interface OnboardingFormProps {
  user: User | null;
  onSuccess: () => void;
}

export const OnboardingForm = ({ user, onSuccess }: OnboardingFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState<OnboardingRequest>({
    experience: "",
    portfolio: "",
    reason: "",
    availability: "",
    projectName: "",
    projectDescription: "",
    requirements: "",
    timeline: "",
    budget: ""
  });

  const handleSubmit = async () => {
    if (!form.projectName || !form.projectDescription || !form.requirements) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);
    try {
      const requestData = {
        ...form,
        clientName: user?.username || "",
        email: user?.email || "",
        phone: user?.phone || ""
      };
      
      const response = await userAPI.submitOnboardingRequest(requestData);
      
      if (response && response.data) {
        toast.success("Project onboarding request submitted successfully!");
        setForm({
          experience: "", portfolio: "", reason: "", availability: "",
          projectName: "", projectDescription: "", requirements: "",
          timeline: "", budget: ""
        });
        onSuccess();
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || "Failed to submit request";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 md:space-y-8 py-4">
      <div className="grid md:grid-cols-2 gap-6 md:gap-8">
        <div className="space-y-2.5">
          <Label htmlFor="projectName" className="text-[10px] font-black uppercase tracking-widest ml-1 opacity-60">Asset Identifier (Name)</Label>
          <Input
            id="projectName"
            className="h-14 rounded-2xl bg-secondary/20 border-border/50 focus:border-primary/50 font-bold px-5"
            value={form.projectName}
            onChange={(e) => setForm({ ...form, projectName: e.target.value })}
            placeholder="Ex. Quantum Architecture"
          />
        </div>
        <div className="space-y-2.5">
          <Label htmlFor="timeline" className="text-[10px] font-black uppercase tracking-widest ml-1 opacity-60">Deployment Velocity</Label>
          <Input
            id="timeline"
            className="h-14 rounded-2xl bg-secondary/20 border-border/50 focus:border-primary/50 font-bold px-5"
            value={form.timeline}
            onChange={(e) => setForm({ ...form, timeline: e.target.value })}
            placeholder="e.g., Immediate Sync"
          />
        </div>
      </div>

      <div className="space-y-2.5">
        <Label htmlFor="projectDescription" className="text-[10px] font-black uppercase tracking-widest ml-1 opacity-60">System Summary</Label>
        <Textarea
          id="projectDescription"
          className="rounded-2xl bg-secondary/20 border-border/50 focus:border-primary/50 font-medium p-5 min-h-[120px]"
          value={form.projectDescription}
          onChange={(e) => setForm({ ...form, projectDescription: e.target.value })}
          placeholder="Define the structural scope..."
        />
      </div>

      <div className="space-y-2.5">
        <Label htmlFor="requirements" className="text-[10px] font-black uppercase tracking-widest ml-1 opacity-60">Module Dependencies</Label>
        <Textarea
          id="requirements"
          className="rounded-2xl bg-secondary/20 border-border/50 focus:border-primary/50 font-medium p-5 min-h-[120px]"
          value={form.requirements}
          onChange={(e) => setForm({ ...form, requirements: e.target.value })}
          placeholder="List critical requirements..."
        />
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-6 pt-4">
        <div className="flex-1 space-y-2.5 w-full">
          <Label htmlFor="budget" className="text-[10px] font-black uppercase tracking-widest ml-1 opacity-60">Value Quantifier</Label>
          <Input
            id="budget"
            className="h-14 rounded-2xl bg-secondary/20 border-border/50 focus:border-primary/50 font-bold px-5"
            value={form.budget}
            onChange={(e) => setForm({ ...form, budget: e.target.value })}
            placeholder="Enter value bracket"
          />
        </div>
        <Button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="h-20 px-12 rounded-3xl bg-primary text-primary-foreground font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all w-full sm:w-auto"
        >
          {isSubmitting ? "Processing..." : "Authorize Module Deployment"}
          <Rocket className="ml-3 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

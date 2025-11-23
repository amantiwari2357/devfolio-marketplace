import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { userAPI } from "@/services/auth";
import type { User, OnboardingRequest } from "@/services/auth";
import { toast } from "sonner";
import { Mail, MapPin, Globe, Phone, Edit, Send, CheckCircle2, ChevronDown, ChevronUp, Bell, Eye } from "lucide-react";
import Header from "@/components/layout/Header";
import { cn } from "@/lib/utils";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);

  const [onboardingForm, setOnboardingForm] = useState<OnboardingRequest>({
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

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await userAPI.getProfile();
        setUser(response.data.user);
      } catch (error) {
        toast.error("Failed to load profile");
        navigate("/login");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();

    const intervalId = setInterval(async () => {
      // Here add real-time polling for onboarding status if needed, example:
      if(user) {
        try {
          const onboardingStatusResponse = await userAPI.getOnboardingStatus();
          // You can update state or notify user based on status here if desired
          // e.g. setOnboardingStatus(onboardingStatusResponse.data);
        } catch (error) {
          // Handle polling errors silently or notify
        }
      }
    }, 30000); // Poll every 30 seconds

    return () => clearInterval(intervalId);
  }, [navigate, user]);

  const handleOnboardingSubmit = async () => {
    // Validate required project onboarding fields here
    if (
      !onboardingForm.projectName ||
      !onboardingForm.projectDescription ||
      !onboardingForm.requirements
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);
    try {
      // Include user information with the onboarding request
      const requestData = {
        ...onboardingForm,
        clientName: user?.username || "",
        email: user?.email || "",
        phone: user?.phone || ""
      };
      
      console.log("Submitting onboarding request:", requestData);
      
      const response = await userAPI.submitOnboardingRequest(requestData);
      console.log("Server response:", response);
      
      if (response && response.data) {
        toast.success("Project onboarding request submitted successfully!");
        setIsOnboardingOpen(false);
        setOnboardingForm({
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
      } else {
        throw new Error("No data received from server");
      }
    } catch (error: any) {
      console.error("Error submitting onboarding request:", error);
      const errorMessage = error.response?.data?.message || 
                         error.message || 
                         "Failed to submit project onboarding request";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 pt-24 pb-12">
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="h-48 bg-muted animate-pulse rounded-lg"></div>
            <div className="h-64 bg-muted animate-pulse rounded-lg"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Profile Header */}
          <Card className="border-border shadow-sm">
            <CardContent className="pt-6">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center text-primary-foreground">
                      {(user as any)?.imageUrl ? (
                        <img
                          src={(user as any).imageUrl}
                          alt="User Profile"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-3xl md:text-4xl font-bold">
                          {user?.username?.charAt(0).toUpperCase()}
                        </span>
                      )}
                    </div>
                    <div className="text-center sm:text-left">
                      <h1 className="text-2xl md:text-3xl font-bold">{user?.username}</h1>
                      <div className="flex items-center justify-center sm:justify-start gap-2 mt-2 text-muted-foreground">
                        <Mail className="h-4 w-4" />
                        <span className="text-sm">{user?.email}</span>
                      </div>
                    </div>
                  </div>
                  <Button
                    onClick={() => navigate("/settings")}
                    variant="outline"
                    className="gap-2"
                  >
                    <Edit className="h-4 w-4" />
                    Edit Profile
                  </Button>
                </div>

                {user?.bio && (
                  <p className="text-muted-foreground">{user.bio}</p>
                )}

                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  {user?.country && (
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>{user.country}</span>
                    </div>
                  )}
                  {user?.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      <span>{user.phone}</span>
                    </div>
                  )}
                  {user?.website && (
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4" />
                      <a href={user.website} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                        {user.website}
                      </a>
                    </div>
                  )}
                  {user?.whatsappNumber && (
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      <span>{user.whatsappNumber}</span>
                    </div>
                  )}
                </div>

                {user?.expertise && user.expertise.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {user.expertise.map((item) => (
                      <Badge key={item} variant="secondary" className="px-3 py-1">
                        {item}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Additional Info */}
          <Card className="border-border shadow-sm">
            <CardHeader>
              <CardTitle>Additional Information</CardTitle>
              <CardDescription>Your profile details and preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Country</p>
                  <p className="text-base">{user?.country || "Not specified"}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Currency</p>
                  <p className="text-base">{user?.currency || "Not specified"}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Project Onboarding Section */}
          <Card className="border-border shadow-sm bg-gradient-to-br from-card to-card/50">
            <CardHeader className="flex flex-row items-center justify-between gap-4">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  Project Onboarding
                </CardTitle>
                <CardDescription>
                  Fill out your project details to proceed with creating your project.
                </CardDescription>
              </div>
              <button
                type="button"
                onClick={() => setIsOnboardingOpen((prev) => !prev)}
                className="flex items-center gap-1 text-sm text-primary hover:text-primary/80 transition-colors border border-border rounded-md px-3 py-2"
              >
                <span>View Onboarding</span>
                {isOnboardingOpen ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </button>
            </CardHeader>
            <CardContent
              className={cn(
                "space-y-4 overflow-hidden transition-all duration-300",
                isOnboardingOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0 pointer-events-none"
              )}
            >
              <div className="space-y-2">
                <Label htmlFor="projectName">Project Name *</Label>
                <Input
                  id="projectName"
                  value={onboardingForm.projectName}
                  onChange={(e) =>
                    setOnboardingForm({ ...onboardingForm, projectName: e.target.value })
                  }
                  placeholder="Enter your project name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="projectDescription">Project Description *</Label>
                <Textarea
                  id="projectDescription"
                  value={onboardingForm.projectDescription}
                  onChange={(e) =>
                    setOnboardingForm({ ...onboardingForm, projectDescription: e.target.value })
                  }
                  rows={4}
                  placeholder="Provide a brief description of your project"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="requirements">Basic Requirements *</Label>
                <Textarea
                  id="requirements"
                  value={onboardingForm.requirements}
                  onChange={(e) =>
                    setOnboardingForm({ ...onboardingForm, requirements: e.target.value })
                  }
                  rows={4}
                  placeholder="List the main requirements or features needed"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="timeline">Expected Timeline</Label>
                <Input
                  id="timeline"
                  value={onboardingForm.timeline}
                  onChange={(e) =>
                    setOnboardingForm({ ...onboardingForm, timeline: e.target.value })
                  }
                  placeholder="e.g., 3 months, ASAP"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="budget">Estimated Budget</Label>
                <Input
                  id="budget"
                  value={onboardingForm.budget}
                  onChange={(e) =>
                    setOnboardingForm({ ...onboardingForm, budget: e.target.value })
                  }
                  placeholder="Enter your budget range"
                />
              </div>
              <Button
                onClick={handleOnboardingSubmit}
                disabled={isSubmitting}
                className="bg-gradient-to-r from-primary to-primary-glow"
              >
                {isSubmitting ? "Submitting..." : "Submit Project Request"}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
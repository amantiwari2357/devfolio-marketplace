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
import { Mail, MapPin, Globe, Phone, Edit, Send, CheckCircle2 } from "lucide-react";
import Header from "@/components/layout/Header";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [onboardingForm, setOnboardingForm] = useState<OnboardingRequest>({
    experience: "",
    portfolio: "",
    reason: "",
    availability: "",
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
  }, [navigate]);

  const handleOnboardingSubmit = async () => {
    if (!onboardingForm.experience || !onboardingForm.reason || !onboardingForm.availability) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);
    try {
      await userAPI.submitOnboardingRequest(onboardingForm);
      toast.success("Onboarding request submitted successfully!");
      setIsDialogOpen(false);
      setOnboardingForm({
        experience: "",
        portfolio: "",
        reason: "",
        availability: "",
      });
    } catch (error) {
      toast.error("Failed to submit onboarding request");
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
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-shrink-0">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center text-4xl font-bold text-primary-foreground">
                    {user?.username?.charAt(0).toUpperCase()}
                  </div>
                </div>
                <div className="flex-1 space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h1 className="text-3xl font-bold">{user?.username}</h1>
                      <div className="flex items-center gap-2 mt-2 text-muted-foreground">
                        <Mail className="h-4 w-4" />
                        <span className="text-sm">{user?.email}</span>
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

          {/* Onboarding Section */}
          <Card className="border-border shadow-sm bg-gradient-to-br from-card to-card/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                Professional Onboarding
              </CardTitle>
              <CardDescription>
                Request to join our verified professionals program
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Get verified as a professional to unlock premium features and showcase your expertise to potential clients.
              </p>
              <div className="flex gap-3">
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="gap-2 bg-gradient-to-r from-primary to-primary-glow">
                      <Send className="h-4 w-4" />
                      Request Onboarding
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Professional Onboarding Request</DialogTitle>
                      <DialogDescription>
                        Fill out this form to request professional verification
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="experience">Years of Experience *</Label>
                        <Input
                          id="experience"
                          value={onboardingForm.experience}
                          onChange={(e) =>
                            setOnboardingForm({ ...onboardingForm, experience: e.target.value })
                          }
                          placeholder="e.g., 5 years"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="portfolio">Portfolio URL</Label>
                        <Input
                          id="portfolio"
                          value={onboardingForm.portfolio}
                          onChange={(e) =>
                            setOnboardingForm({ ...onboardingForm, portfolio: e.target.value })
                          }
                          placeholder="https://yourportfolio.com"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="reason">Why do you want to join? *</Label>
                        <Textarea
                          id="reason"
                          value={onboardingForm.reason}
                          onChange={(e) =>
                            setOnboardingForm({ ...onboardingForm, reason: e.target.value })
                          }
                          placeholder="Tell us about your motivation and goals..."
                          rows={4}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="availability">Availability *</Label>
                        <Input
                          id="availability"
                          value={onboardingForm.availability}
                          onChange={(e) =>
                            setOnboardingForm({ ...onboardingForm, availability: e.target.value })
                          }
                          placeholder="e.g., Full-time, Part-time, Weekends"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        variant="outline"
                        onClick={() => setIsDialogOpen(false)}
                        disabled={isSubmitting}
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={handleOnboardingSubmit}
                        disabled={isSubmitting}
                        className="bg-gradient-to-r from-primary to-primary-glow"
                      >
                        {isSubmitting ? "Submitting..." : "Submit Request"}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                <Button
                  variant="outline"
                  onClick={() => navigate("/onboarding-status")}
                  className="gap-2"
                >
                  <CheckCircle2 className="h-4 w-4" />
                  View Status
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
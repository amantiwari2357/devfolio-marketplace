import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff, Check, Plus, ArrowLeft, Rocket, Clock, Calendar, Globe, User, Mail, Lock, Twitter, Instagram, Linkedin, Github, Youtube, Facebook, Link2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface DaySchedule {
  day: string;
  enabled: boolean;
  startTime: string;
  endTime: string;
}

const ProgressBar = ({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) => {
  return (
    <div className="w-full mb-8">
      <div className="flex justify-between mb-2">
        {[...Array(totalSteps)].map((_, i) => (
          <div
            key={i}
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              i < currentStep
                ? "bg-primary text-primary-foreground"
                : i === currentStep
                ? "bg-primary/10 text-primary border-2 border-primary"
                : "bg-muted text-muted-foreground"
            }`}
          >
            {i + 1}
          </div>
        ))}
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-primary transition-all duration-300"
          style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
        />
      </div>
    </div>
  );
};

const SignUp = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0); 
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  // Onboarding states
  const [socialUrl, setSocialUrl] = useState("");
  const [username, setUsername] = useState("");
  const [country, setCountry] = useState("");
  const [currency, setCurrency] = useState("inr");
  const [selectedExpertise, setSelectedExpertise] = useState<string[]>([]);
  const [schedule, setSchedule] = useState<DaySchedule[]>([
    { day: "Saturday", enabled: true, startTime: "9:00 AM", endTime: "8:00 PM" },
    { day: "Sunday", enabled: true, startTime: "9:00 AM", endTime: "8:00 PM" },
    { day: "Monday", enabled: true, startTime: "9:00 AM", endTime: "6:00 PM" },
    { day: "Tuesday", enabled: true, startTime: "9:00 AM", endTime: "6:00 PM" },
    { day: "Wednesday", enabled: true, startTime: "9:00 AM", endTime: "6:00 PM" },
    { day: "Thursday", enabled: true, startTime: "9:00 AM", endTime: "6:00 PM" },
    { day: "Friday", enabled: true, startTime: "9:00 AM", endTime: "6:00 PM" },
  ]);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [socialLinks, setSocialLinks] = useState([
    { platform: 'twitter', url: '', icon: <Twitter className="h-4 w-4" /> },
    { platform: 'linkedin', url: '', icon: <Linkedin className="h-4 w-4" /> },
    { platform: 'github', url: '', icon: <Github className="h-4 w-4" /> },
    { platform: 'youtube', url: '', icon: <Youtube className="h-4 w-4" /> },
    { platform: 'instagram', url: '', icon: <Instagram className="h-4 w-4" /> },
    { platform: 'facebook', url: '', icon: <Facebook className="h-4 w-4" /> },
    { platform: 'website', url: '', icon: <Globe className="h-4 w-4" /> },
  ]);

  const expertiseOptions = [
    'Web Development', 'Mobile Development', 'UI/UX Design', 'Data Science',
    'Machine Learning', 'DevOps', 'Cloud Computing', 'Blockchain',
    'Cybersecurity', 'Product Management', 'Marketing', 'Content Creation'
  ];

  const countries = [
    { code: 'in', name: 'India' },
    { code: 'us', name: 'United States' },
    { code: 'uk', name: 'United Kingdom' },
    { code: 'ca', name: 'Canada' },
    { code: 'au', name: 'Australia' },
  ];

  const currencies = [
    { code: 'inr', symbol: '₹', name: 'Indian Rupee' },
    { code: 'usd', symbol: '$', name: 'US Dollar' },
    { code: 'eur', symbol: '€', name: 'Euro' },
    { code: 'gbp', symbol: '£', name: 'British Pound' },
  ];

  const handleSocialLinkChange = (index: number, value: string) => {
    const newLinks = [...socialLinks];
    newLinks[index].url = value;
    setSocialLinks(newLinks);
  };

  const handleScheduleChange = (index: number, field: keyof DaySchedule, value: any) => {
    const newSchedule = [...schedule];
    if (field === 'enabled') {
      newSchedule[index] = { ...newSchedule[index], [field]: value };
    } else {
      newSchedule[index] = { 
        ...newSchedule[index], 
        [field]: value,
        ...(field === 'startTime' && !newSchedule[index].endTime ? { endTime: value } : {})
      };
    }
    setSchedule(newSchedule);
  };

  const handleExpertiseToggle = (expertise: string) => {
    setSelectedExpertise(prev => 
      prev.includes(expertise)
        ? prev.filter(e => e !== expertise)
        : [...prev, expertise]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep < 4) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Form submission logic for the final step
      console.log('Form submitted:', {
        ...formData,
        username,
        country,
        currency,
        selectedExpertise,
        schedule,
        phoneNumber,
        socialLinks: socialLinks.filter(link => link.url.trim() !== '')
      });
      // Show success message and redirect to home page
      toast.success('Account created successfully!');
      setTimeout(() => {
        navigate('/');
      }, 2000);
    }
  };

  const handleNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleSubmit(new Event('submit') as unknown as React.FormEvent);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const testimonials = [
    {
      quote:
        "Love the integrations with Calendar, Zoom and WhatsApp. Makes my life easier!",
      name: "Aishwarya Srinivasan",
      title: "LinkedIn Top Voice",
      grad: "from-card-purple to-card-blue",
    },
    {
      quote:
        "devfolio-marketplace is my go-to platform for scheduling 1:1 sessions and hosting webinars!",
      name: "Mohan Kunj",
      title: "Founder of Data Engineer Things",
      grad: "from-card-green to-card-cyan",
    },
    {
      quote:
        "I love devfolio-marketplace! It has made it seamless to schedule mentoring sessions!",
      name: "Neha Gupta",
      title: "Global Data Lead in Energy Industry",
      grad: "from-card-pink to-card-purple",
    },
    {
      quote:
        "The entire experience is just so seamless. My followers love it",
      name: "Raghav Malhotra",
      title: "300K on LinkedIn",
      grad: "from-card-blue to-card-purple",
    },
    {
      quote: "All my monetisation now happens in one place",
      name: "Payal & Gaurav",
      title: "110K+ on Instagram",
      grad: "from-card-cyan to-card-green",
    },
    // India-focused additions
    {
      quote:
        "Scheduling workshops with cohorts across India is effortless now.",
      name: "Tanvi Sharma",
      title: "Educator, IIT Delhi Alumna",
      grad: "from-card-orange to-card-pink",
    },
    {
      quote:
        "My D2C founder community prefers the simple booking flow.",
      name: "Rohit Agarwal",
      title: "Startup Mentor, Bengaluru",
      grad: "from-card-green to-card-emerald",
    },
    {
      quote:
        "Great for AMA sessions and office hours with my product teams.",
      name: "Ankita Jain",
      title: "Product Lead, Mumbai",
      grad: "from-card-purple to-card-fuchsia",
    },
    {
      quote:
        "Seamless payments and reminders—reduced no-shows by a lot.",
      name: "Sanjay Gupta",
      title: "Educator, Pune",
      grad: "from-card-cyan to-card-blue",
    },
    {
      quote:
        "Perfect for managing mentorship slots after work hours.",
      name: "Priya Verma",
      title: "Creator, New Delhi",
      grad: "from-card-amber to-card-orange",
    },
    {
      quote:
        "Workshops and mentorships get booked in minutes—super convenient!",
      name: "Ankur Warikoo",
      title: "Entrepreneur & Mentor",
      grad: "from-card-purple to-card-blue",
    },
    {
      quote:
        "My community sessions are smoother with built-in reminders.",
      name: "Raj Shamani",
      title: "Creator & Founder",
      grad: "from-card-green to-card-cyan",
    },
    {
      quote:
        "Great fit for masterclasses—from payments to scheduling, all-in-one.",
      name: "Kunal Shah",
      title: "Founder & Investor",
      grad: "from-card-blue to-card-purple",
    },
    {
      quote:
        "Perfect for managing live cohorts across multiple timezones.",
      name: "Tanmay Bhat",
      title: "Creator & Educator",
      grad: "from-card-pink to-card-purple",
    },
    {
      quote:
        "My students love the frictionless booking experience.",
      name: "Arvind Arora",
      title: "Educator, India",
      grad: "from-card-cyan to-card-green",
    },
    {
      quote:
        "Scheduling recipe workshops is so easy now!",
      name: "Nisha Madhulika",
      title: "Creator, India",
      grad: "from-card-purple to-card-blue",
    },
  ];

  const containerRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    const content = contentRef.current;
    if (!el || !content) return;

    let rafId: number | null = null;
    let lastTime = performance.now();
    const speed = 20; // pixels per second (slow)

    const step = (timestamp: number) => {
      if (!el || !content) return;
      const delta = (timestamp - lastTime) / 1000; // seconds
      lastTime = timestamp;

      el.scrollTop += speed * delta;
      const halfHeight = content.scrollHeight / 2;
      if (el.scrollTop >= halfHeight) {
        el.scrollTop = 0; // seamless loop
      }

      rafId = requestAnimationFrame(step);
    };

    // Ensure starting position on mount
    el.scrollTop = 0;

    // Start animation
    rafId = requestAnimationFrame(step);

    const handleVisibility = () => {
      if (document.visibilityState === "visible") {
        // Reset timing to avoid jump and ensure it resumes
        lastTime = performance.now();
        if (!rafId) {
          rafId = requestAnimationFrame(step);
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
      if (rafId) cancelAnimationFrame(rafId);
      rafId = null;
    };
  }, []);


  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const toggleExpertise = (expertise: string) => {
    setSelectedExpertise((prev) =>
      prev.includes(expertise)
        ? prev.filter((e) => e !== expertise)
        : [...prev, expertise]
    );
  };

  const toggleDay = (index: number) => {
    const newSchedule = [...schedule];
    newSchedule[index].enabled = !newSchedule[index].enabled;
    if (newSchedule[index].enabled && !newSchedule[index].startTime) {
      newSchedule[index].startTime = "9:00 AM";
      newSchedule[index].endTime = "5:00 PM";
    }
    setSchedule(newSchedule);
  };

  const applyToAll = () => {
    const enabledDay = schedule.find((s) => s.enabled);
    if (enabledDay) {
      setSchedule(
        schedule.map((s) => ({
          ...s,
          enabled: true,
          startTime: enabledDay.startTime,
          endTime: enabledDay.endTime,
        }))
      );
    }
  };

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
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">
              {currentStep === 0 ? 'Create your account' : 'Complete your profile'}
            </h1>
            <p className="text-muted-foreground">
              {currentStep === 0 
                ? 'Join our community of creators and professionals'
                : `Step ${currentStep} of 4`}
            </p>
          </div>
          
          <Card className="p-6">
            {currentStep === 0 ? (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <div className="relative">
                      <Input
                        id="firstName"
                        placeholder="John"
                        value={formData.firstName}
                        onChange={(e) =>
                          setFormData({ ...formData, firstName: e.target.value })
                        }
                        className="pl-10"
                      />
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={(e) =>
                        setFormData({ ...formData, lastName: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="pl-10"
                    />
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a strong password"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                      className="pl-10"
                    />
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    I agree to the Terms of Service and Privacy Policy
                  </label>
                </div>

                <Button 
                  className="w-full" 
                  onClick={() => setCurrentStep(1)}
                  disabled={!formData.firstName || !formData.lastName || !formData.email || !formData.password}
                >
                  Create Account
                </Button>

                <div className="text-center text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <Link to="/login" className="text-primary hover:underline">
                    Sign in
                  </Link>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <ProgressBar currentStep={currentStep - 1} totalSteps={4} />

                {currentStep === 1 && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-4">Personal Information</h3>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label>Username</Label>
                          <div className="relative">
                            <Input
                              placeholder="yourusername"
                              value={username}
                              onChange={(e) => setUsername(e.target.value.replace(/\s+/g, '').toLowerCase())}
                              className="pl-10"
                            />
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Country</Label>
                            <Select value={country} onValueChange={setCountry}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select country" />
                              </SelectTrigger>
                              <SelectContent>
                                {countries.map((c) => (
                                  <SelectItem key={c.code} value={c.code}>
                                    {c.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div className="space-y-2">
                            <Label>Currency</Label>
                            <Select value={currency} onValueChange={setCurrency}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select currency" />
                              </SelectTrigger>
                              <SelectContent>
                                {currencies.map((c) => (
                                  <SelectItem key={c.code} value={c.code}>
                                    {c.name} ({c.symbol})
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label>Phone Number</Label>
                          <Input
                            placeholder="+91 98765 43210"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-4">Your Expertise</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Select the areas you specialize in (select up to 5)
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {expertiseOptions.map((exp) => (
                          <Button
                            key={exp}
                            variant={selectedExpertise.includes(exp) ? "default" : "outline"}
                            size="sm"
                            className={cn(
                              "rounded-full",
                              selectedExpertise.includes(exp) ? "bg-primary/10 text-primary" : ""
                            )}
                            onClick={() => handleExpertiseToggle(exp)}
                            disabled={selectedExpertise.length >= 5 && !selectedExpertise.includes(exp)}
                          >
                            {exp}
                            {selectedExpertise.includes(exp) && (
                              <Check className="ml-2 h-4 w-4" />
                            )}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 3 && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-4">Your Availability</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Set your weekly schedule for when you're available for calls and meetings
                      </p>
                      
                      <div className="space-y-4">
                        {schedule.map((day, index) => (
                          <div key={day.day} className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2 w-32">
                              <Checkbox
                                id={`day-${index}`}
                                checked={day.enabled}
                                onCheckedChange={(checked) => 
                                  handleScheduleChange(index, 'enabled', checked)
                                }
                              />
                              <Label htmlFor={`day-${index}`} className="font-medium">
                                {day.day}
                              </Label>
                            </div>
                            
                            <div className="flex-1 grid grid-cols-2 gap-4">
                              <div className="space-y-1">
                                <Label htmlFor={`start-${index}`} className="text-xs">Start Time</Label>
                                <Select
                                  value={day.startTime}
                                  onValueChange={(value) => 
                                    handleScheduleChange(index, 'startTime', value)
                                  }
                                  disabled={!day.enabled}
                                >
                                  <SelectTrigger>
                                    <Clock className="h-4 w-4 mr-2 opacity-50" />
                                    <SelectValue placeholder="Start time" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {Array.from({ length: 24 }).map((_, i) => {
                                      const hour = i % 12 || 12;
                                      const ampm = i < 12 ? 'AM' : 'PM';
                                      const time = `${hour}:00 ${ampm}`;
                                      return (
                                        <SelectItem key={time} value={time}>
                                          {time}
                                        </SelectItem>
                                      );
                                    })}
                                  </SelectContent>
                                </Select>
                              </div>
                              
                              <div className="space-y-1">
                                <Label htmlFor={`end-${index}`} className="text-xs">End Time</Label>
                                <Select
                                  value={day.endTime}
                                  onValueChange={(value) => 
                                    handleScheduleChange(index, 'endTime', value)
                                  }
                                  disabled={!day.enabled}
                                >
                                  <SelectTrigger>
                                    <Clock className="h-4 w-4 mr-2 opacity-50" />
                                    <SelectValue placeholder="End time" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {Array.from({ length: 24 }).map((_, i) => {
                                      const hour = i % 12 || 12;
                                      const ampm = i < 12 ? 'AM' : 'PM';
                                      const time = `${hour}:00 ${ampm}`;
                                      return (
                                        <SelectItem key={time} value={time}>
                                          {time}
                                        </SelectItem>
                                      );
                                    })}
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 4 && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-4">Connect Your Social Profiles</h3>
                      <p className="text-sm text-muted-foreground mb-6">
                        Add links to your social profiles to help people learn more about you (optional)
                      </p>
                      
                      <div className="space-y-4">
                        {socialLinks.map((social, index) => (
                          <div key={social.platform} className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                              {social.icon}
                            </div>
                            <Input
                              placeholder={`https://${social.platform}.com/yourusername`}
                              value={social.url}
                              onChange={(e) => handleSocialLinkChange(index, e.target.value)}
                              className="flex-1"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex justify-between pt-6">
                  <Button
                    variant="outline"
                    onClick={handlePreviousStep}
                    disabled={currentStep === 1}
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back
                  </Button>
                  
                  <Button 
                    onClick={handleNextStep}
                    disabled={
                      (currentStep === 1 && (!username || !country || !currency)) ||
                      (currentStep === 2 && selectedExpertise.length === 0)
                    }
                  >
                    {currentStep === 4 ? 'Complete Setup' : 'Continue'}
                    {currentStep < 4 && <ArrowLeft className="h-4 w-4 ml-2 transform rotate-180" />}
                  </Button>
                </div>
              </div>
            )}
          </Card>

          {showSuccess && (
            <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
              <div className="bg-background p-8 rounded-lg shadow-xl max-w-md w-full mx-4 border">
                <div className="text-center">
                  <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
                    <Check className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-lg font-medium text-foreground mb-2">Account Created Successfully!</h3>
                  <p className="text-muted-foreground mb-6">
                    Redirecting to home page...
                  </p>
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignUp;

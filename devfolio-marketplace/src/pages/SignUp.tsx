import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { Card } from "@/components/ui/card";

const SignUp = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
      name: "Xinran Waibel",
      title: "Founder of Data Engineer Things",
      grad: "from-card-green to-card-cyan",
    },
    {
      quote:
        "I love devfolio-marketplace! It has made it seamless to schedule mentoring sessions!",
      name: "Jessica",
      title: "Global Data Lead in Energy Industry",
      grad: "from-card-pink to-card-purple",
    },
    {
      quote:
        "The entire experience is just so seamless. My followers love it",
      name: "Joerg Storm",
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Simulate registration
    setTimeout(() => {
      // Mock successful registration
      localStorage.setItem('token', 'mock-token');
      navigate("/onboarding");
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left Side - Form */}
      <div className="flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md">
          <h1 className="text-4xl font-bold mb-2">Sign Up</h1>
          <p className="text-muted-foreground mb-8">Launch your page in no time!</p>

          <div className="space-y-4 mb-6">
            <Button
              variant="outline"
              className="w-full justify-center gap-2"
              type="button"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </Button>

            <Button
              variant="outline"
              className="w-full justify-center gap-2"
              type="button"
            >
              <svg className="w-5 h-5" fill="#0A66C2" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              Continue with LinkedIn
            </Button>
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-background px-2 text-muted-foreground">or</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  placeholder="First name"
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  placeholder="Last name"
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            <Button
              type="submit"
              className="w-full bg-foreground text-background hover:bg-foreground/90"
              disabled={isLoading}
            >
              {isLoading ? "Signing Up..." : "Get Started"}
            </Button>

            <p className="text-xs text-center text-muted-foreground">
              By Signing up, you agree to our{" "}
              <Link to="/terms" className="text-primary hover:underline">
                Terms of Use
              </Link>{" "}
              and{" "}
              <Link to="/privacy" className="text-primary hover:underline">
                Privacy Policy
              </Link>
            </p>
          </form>
        </div>
      </div>

      {/* Right Side - Testimonials */}
      <div className="hidden lg:flex items-center justify-center p-8 bg-card-beige">
        <div ref={containerRef} className="max-w-md relative h-[560px] overflow-hidden">
          <div ref={contentRef} className="space-y-6">
            {[...testimonials, ...testimonials].map((t, idx) => (
              <Card key={idx} className="bg-card border-none p-6">
                <p className="text-foreground mb-4 italic">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.grad}`} />
                  <div>
                    <p className="font-semibold text-sm">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.title}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
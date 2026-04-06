import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff, ShieldCheck, Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { authAPI } from "@/services/auth";
import { toast } from "sonner";
import SEO from "@/components/layout/SEO";
import logo from "../../public/Images/logo.png";

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
      quote: "Love the integrations with Calendar, Zoom and WhatsApp. Makes my life easier!",
      name: "Aishwarya Srinivasan",
      title: "LinkedIn Top Voice",
      grad: "from-primary/20 to-primary-glow/20",
    },
    {
      quote: "devfolio-marketplace is my go-to platform for scheduling 1:1 sessions and hosting webinars!",
      name: "Mohan Kunj",
      title: "Founder of Data Engineer Things",
      grad: "from-secondary/40 to-background",
    },
    {
      quote: "I love devfolio-marketplace! It has made it seamless to schedule mentoring sessions!",
      name: "Neha Gupta",
      title: "Global Data Lead in Energy Industry",
      grad: "from-primary/10 to-secondary/30",
    },
    {
      quote: "Perfect for managing live cohorts across multiple timezones.",
      name: "Tanmay Bhat",
      title: "Creator & Educator",
      grad: "from-primary/20 to-primary-glow/20",
    },
    {
      quote: "My students love the frictionless booking experience.",
      name: "Arvind Arora",
      title: "Educator, India",
      grad: "from-secondary/40 to-background",
    },
    {
      quote: "Scheduling workshops with cohorts across India is effortless now.",
      name: "Tanvi Sharma",
      title: "Educator, IIT Delhi Alumna",
      grad: "from-primary/10 to-secondary/30",
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await authAPI.signup({
        email: formData.email,
        password: formData.password,
      });

      // Store token and navigate to onboarding
      localStorage.setItem('token', response.data.token);
      toast.success("Account created successfully! Redirecting to onboarding...");

      // Auto-login and redirect to onboarding
      setTimeout(() => {
        navigate("/onboarding");
      }, 1000);
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      setError(err.response?.data?.message || "Signup failed");
      toast.error("Signup failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-background selection:bg-primary selection:text-primary-foreground">
      <SEO
        title="Join Devfolio"
        description="Create your Devfolio Marketplace account and start building your future today."
      />

      {/* Left Side - Form */}
      <div className="flex items-center justify-center p-8 lg:p-16 border-r border-border/50">
        <div className="w-full max-w-md">
          {/* Branding */}
          <div className="flex flex-col mb-12">
            <Link to="/" className="flex items-center gap-2 group mb-8">
              <img
                src={logo}
                alt="Devfolio Logo"
                className="h-40 w-auto group-hover:scale-105 transition-transform duration-300"
                fetchPriority="high"
              />
              <span className="text-2xl font-black tracking-tighter text-foreground group-hover:text-primary transition-colors">
                DEVFOLIO<span className="text-primary">.</span>
              </span>
            </Link>
            <h1 className="text-4xl font-black tracking-tight mb-3 text-foreground">
              Create your account<span className="text-primary">.</span>
            </h1>
            <p className="text-muted-foreground font-medium">Join 10,000+ creators and developers building the future.</p>
          </div>

          <div className="space-y-4 mb-8">
            <Button
              variant="outline"
              className="w-full rounded-xl border-border/50 bg-card hover:bg-accent/50 hover:border-primary/20 transition-all font-bold gap-3 py-6"
              type="button"
            >
              <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Sign up with Google
            </Button>
          </div>

          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border/50" />
            </div>
            <div className="relative flex justify-center text-xs uppercase tracking-widest">
              <span className="bg-background px-4 text-muted-foreground font-black">Or use email</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-sm font-bold tracking-tight">First name</Label>
                <Input
                  id="firstName"
                  placeholder="John"
                  className="rounded-xl py-6 border-border/50 bg-secondary/30 focus:border-primary/50 focus:ring-primary/20 transition-all font-medium"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-sm font-bold tracking-tight">Last name</Label>
                <Input
                  id="lastName"
                  placeholder="Doe"
                  className="rounded-xl py-6 border-border/50 bg-secondary/30 focus:border-primary/50 focus:ring-primary/20 transition-all font-medium"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-bold tracking-tight">Email address</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                className="rounded-xl py-6 border-border/50 bg-secondary/30 focus:border-primary/50 focus:ring-primary/20 transition-all font-medium"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" title="password" className="text-sm font-bold tracking-tight">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="rounded-xl py-6 border-border/50 bg-secondary/30 focus:border-primary/50 focus:ring-primary/20 transition-all font-medium"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                  title={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20 flex items-center gap-3 text-destructive animate-in fade-in slide-in-from-top-1">
                <ShieldCheck className="w-5 h-5 flex-shrink-0" />
                <p className="text-sm font-bold">{error}</p>
              </div>
            )}

            <Button
              type="submit"
              className="w-full rounded-xl py-7 font-black text-lg shadow-xl shadow-primary/10 hover:shadow-primary/25 transition-all bg-primary text-primary-foreground hover:scale-[1.02] active:scale-[0.98]"
              disabled={isLoading}
            >
              {isLoading ? "Creating Account..." : "Create Free Account"}
            </Button>

            <p className="text-xs text-center text-muted-foreground leading-relaxed">
              By joining, you agree to our{" "}
              <Link to="/terms" className="text-primary font-bold hover:underline">Terms of Use</Link>{" "}
              and{" "}
              <Link to="/privacy" className="text-primary font-bold hover:underline">Privacy Policy</Link>.
            </p>

            <div className="pt-4 border-t border-border/50 text-center">
              <p className="text-sm font-medium text-muted-foreground">
                Already have an account?{" "}
                <Link to="/login" className="text-primary font-bold hover:underline">Log in</Link>
              </p>
            </div>
          </form>
        </div>
      </div>

      {/* Right Side - Testimonials */}
      <div className="hidden lg:flex flex-col bg-secondary/30 p-16 justify-center">
        <div className="max-w-md mx-auto space-y-8">
          <div className="space-y-4">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-primary text-primary" />
              ))}
            </div>
            <h2 className="text-3xl font-black tracking-tight text-foreground">
              Trusted by experts across <span className="text-primary underline decoration-primary/30 underline-offset-8">industry domains</span>.
            </h2>
          </div>

          <div className="grid gap-6">
            {testimonials.map((t, idx) => (
              <Card key={idx} className={`p-6 border-none bg-gradient-to-br ${t.grad} shadow-sm backdrop-blur-sm group hover:scale-[1.02] transition-all duration-500`}>
                <p className="text-foreground/90 mb-4 font-medium italic leading-relaxed text-sm">"{t.quote}"</p>
                <div className="flex items-center gap-3 border-t border-foreground/10 pt-4">
                  <div className="w-10 h-10 rounded-full bg-background flex items-center justify-center font-bold text-xs shadow-inner">
                    {t.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="font-bold text-sm text-foreground">{t.name}</p>
                    <p className="text-xs text-muted-foreground font-semibold">{t.title}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="pt-8 text-center bg-background/50 rounded-2xl p-6 backdrop-blur-md border border-border/50">
            <p className="text-sm font-black text-muted-foreground uppercase tracking-[0.2em]">Join the revolution</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

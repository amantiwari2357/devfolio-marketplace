import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff, ShieldCheck, Activity, Fingerprint, Lock, ArrowRight, Sparkles, Cpu, Zap } from "lucide-react";
import { authAPI } from "@/services/auth";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import SEO from "@/components/layout/SEO";
import logo from "../../public/Images/logo.png";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Star } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
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
      const response = await authAPI.login({
        email: formData.email,
        password: formData.password,
      });

      localStorage.setItem('token', response.data.token);
      toast.success("Login successful!");

      if (response.data.user.onboardingCompleted) {
        navigate("/");
      } else {
        navigate("/onboarding/");
      }
    } catch (error: any) {
      setError(error.response?.data?.message || "Login failed");
      toast.error("Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-primary selection:text-primary-foreground relative">
      <Header />

      <main className="flex-1 mt-24 relative overflow-hidden">
        <div className="grid lg:grid-cols-2 h-auto">
          <SEO
            title="Neural Access | Portal"
            description="Login to your Devfolio Marketplace account to manage your projects, services, and profile."
          />

          {/* Left Side - Access Form */}
          <div className="flex items-center justify-center p-6 lg:p-16 border-r border-border/50 relative">
            {/* Background Neural Flux for Left Side */}
            <div className="absolute top-0 right-0 -z-10 w-2/3 h-2/3 bg-primary/5 opacity-40 blur-[180px] rounded-full animate-pulse" />

            <div className="w-full max-w-md animate-slide-up">
              {/* Branding Protocol */}
              <div className="flex flex-col mb-12">
                <Link to="/" className="flex items-center gap-2 group mb-8">
                  {/* <div className="relative">
                  
                    <div className="absolute inset-0 bg-primary/20 blur-[30px] rounded-full animate-pulse" />
                    <img
                      src={logo}
                      alt="Devfolio Logo"
                      className="h-32 w-auto group-hover:scale-105 transition-transform duration-500 relative z-10"
                      fetchPriority="high"
                    />
                  </div> */}
                </Link>
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-primary">
                    <Fingerprint className="w-4 h-4 opacity-70" />
                    <span className="text-xs font-semibold uppercase tracking-wider text-primary/80">Secure Access</span>
                  </div>
                  <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-2 text-foreground leading-tight">
                    Welcome back<span className="text-primary">.</span>
                  </h1>
                  <p className="text-sm font-medium text-muted-foreground">Log in to your account and continue your journey.</p>
                </div>
              </div>

              {/* Social Authentication Matrix */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <Button
                  variant="outline"
                  className="h-12 md:h-14 rounded-xl border border-border/50 bg-card hover:bg-accent/50 hover:border-primary/20 transition-all font-bold text-sm gap-3"
                  type="button"
                >
                  <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24">
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
                  Google
                </Button>

                <Button
                  variant="outline"
                  className="h-12 md:h-14 rounded-xl border border-border/50 bg-card hover:bg-accent/50 hover:border-primary/20 transition-all font-bold text-sm gap-3"
                  type="button"
                >
                  <svg className="w-4 h-4 flex-shrink-0" fill="#0A66C2" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  LinkedIn
                </Button>
              </div>

              {/* Protocol Divider */}
              <div className="relative mb-12">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border/20" />
                </div>
                <div className="relative flex justify-center text-xs tracking-wide">
                  <span className="bg-background px-4 text-muted-foreground font-semibold">Or use email</span>
                </div>
              </div>

              {/* Access Payload Form */}
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-semibold text-foreground ml-1">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="hello@example.com"
                    className="h-12 md:h-14 rounded-xl px-4 bg-background border-border focus:border-primary focus:ring-primary/20 transition-all text-sm md:text-base placeholder:text-muted-foreground/50"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between px-1">
                    <Label htmlFor="password" title="password" className="text-sm font-semibold text-foreground">Password</Label>
                    <Link to="/forgot-password/" title="forgot password" className="text-xs font-semibold text-primary hover:text-primary/80 transition-all">Forgot your password?</Link>
                  </div>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••••••"
                      className="h-12 md:h-14 rounded-xl px-4 bg-background border-border focus:border-primary focus:ring-primary/20 transition-all text-sm md:text-base placeholder:text-muted-foreground/50"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-6 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-all"
                      title={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5 opacity-60" />
                      ) : (
                        <Eye className="w-5 h-5 opacity-60" />
                      )}
                    </button>
                  </div>
                </div>

                {error && (
                  <div className="p-4 md:p-5 rounded-xl bg-destructive/10 border border-destructive/20 flex items-center gap-3 text-destructive animate-fade-in shadow-sm">
                    <ShieldCheck className="w-5 h-5 flex-shrink-0" />
                    <p className="text-sm font-semibold">{error}</p>
                  </div>
                )}

                <div className="pt-4">
                  <Button
                    type="submit"
                    className="w-full h-12 md:h-14 rounded-xl font-bold text-sm md:text-base shadow-lg shadow-primary/10 hover:shadow-primary/25 transition-all bg-primary text-primary-foreground hover:scale-[1.02] active:scale-[0.98] border-none group"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-4">
                        <div className="w-5 h-5 rounded-full border-2 border-primary-foreground/20 border-t-primary-foreground animate-spin" />
                        <span>Logging in...</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        Log In
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    )}
                  </Button>
                </div>

                <div className="flex flex-col items-center gap-4 pt-4">
                  <p className="text-sm font-medium text-muted-foreground">
                    Don't have an account?{" "}
                    <Link to="/signup/" className="text-primary hover:underline transition-all font-bold">
                      Sign up
                    </Link>
                  </p>
                  <div className="flex items-center gap-4 text-muted-foreground/30 italic">
                    <ShieldCheck className="w-4 h-4" />
                    {/* <span className="text-[10px] font-black uppercase tracking-[0.4em]">AES-256 Bit Encryption</span> */}
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* Right Side - Brand Content/Testimonials */}
          <div className="hidden lg:flex flex-col bg-secondary/30 p-16 justify-center relative overflow-hidden">
            {/* Background Mesh Flux for Right Side */}
            <div className="absolute bottom-0 left-0 -z-10 w-full h-full bg-primary/5 opacity-30 blur-[150px] rounded-full animate-pulse" />

            <div className="max-w-md mx-auto space-y-8 relative z-10 transition-all duration-1000">
              <div className="space-y-4">
                <div className="flex gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                  ))}
                </div>
                <h2 className="text-3xl font-bold tracking-tight text-foreground leading-snug">
                  Trusted by professionals across the <span className="text-primary underline decoration-primary/30 underline-offset-8">globe</span>.
                </h2>
              </div>

              <div className="h-[600px] overflow-hidden mask-fade-y relative mt-8">
                <div className="flex flex-col gap-6 animate-scroll-y py-12">
                  {[...testimonials, ...testimonials, ...testimonials].map((t, idx) => (
                    <Card key={idx} className={`p-8 border-none bg-gradient-to-br ${t.grad} shadow-xl backdrop-blur-xl group hover:-translate-y-1 transition-all duration-300 rounded-3xl w-full relative overflow-hidden flex flex-col`}>
                      <div className="absolute top-0 right-0 p-6 opacity-5">
                        <Activity className="w-20 h-20 text-foreground" />
                      </div>
                      <p className="text-foreground font-medium leading-relaxed text-sm relative z-10 mb-8 opacity-90">"{t.quote}"</p>
                      <div className="flex items-center gap-4 border-t border-foreground/10 pt-6 relative z-10 mt-auto">
                        <div className="w-12 h-12 rounded-full bg-background/50 border border-background/20 flex items-center justify-center font-bold text-sm shadow-sm text-primary">
                          {t.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="font-bold text-sm text-foreground leading-tight mb-0.5">{t.name}</p>
                          <p className="text-[10px] md:text-xs text-muted-foreground font-semibold uppercase tracking-wider opacity-80">{t.title}</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              <div className="pt-8 text-center">
                <div className="bg-background/20 rounded-2xl p-6 backdrop-blur-md border border-border/10 shadow-sm animate-pulse">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Join 10,000+ Active Users</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;

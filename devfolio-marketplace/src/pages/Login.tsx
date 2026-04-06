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

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
        navigate("/onboarding");
      }
    } catch (error: any) {
      setError(error.response?.data?.message || "Login failed");
      toast.error("Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-primary selection:text-primary-foreground relative overflow-hidden">
      <Header />
      
      <main className="flex-1 flex items-center justify-center p-8 pt-32 pb-20 relative">
        {/* Background Mesh Flux */}
        <div className="absolute top-0 right-0 -z-10 w-2/3 h-2/3 bg-primary/5 opacity-40 blur-[180px] rounded-full animate-pulse" />
        <div className="absolute bottom-0 left-0 -z-10 w-1/2 h-1/2 bg-primary/2 opacity-30 blur-[150px] rounded-full animate-pulse" style={{ animationDelay: '1s' }} />

      <SEO
        title="Neural Access | Portal"
        description="Login to your Devfolio Marketplace account to manage your projects, services, and profile."
      />

      <div className="w-full max-w-[500px] animate-slide-up">
        {/* Entry Module */}
        <Card className="p-12 md:p-16 rounded-[56px] bg-secondary/10 border-border/40 backdrop-blur-3xl shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-12 opacity-0 group-hover:opacity-5 transition-all duration-1000 translate-x-12 translate-y-[-12px] group-hover:translate-x-0 group-hover:translate-y-0 pointer-events-none">
            <Lock className="w-[300px] h-[300px] text-primary" />
          </div>

          <div className="relative z-10">
            {/* Branding Protocol */}
            <div className="flex flex-col items-center mb-16">
              <Link to="/" className="flex items-center gap-2 group mb-8">
                <div className="relative">
                   <div className="absolute inset-0 bg-primary/20 blur-[30px] rounded-full animate-pulse" />
                   <img
                    src={logo}
                    alt="Devfolio Logo"
                    className="h-32 w-auto group-hover:scale-105 transition-transform duration-500 relative z-10"
                    fetchPriority="high"
                  />
                </div>
              </Link>
              <div className="text-center space-y-4">
                <div className="flex items-center justify-center gap-3 text-primary animate-pulse">
                   <Fingerprint className="w-4 h-4" />
                   <span className="text-[10px] font-black uppercase tracking-[0.5em] italic">Biometric Ready</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-black tracking-tighter text-foreground italic uppercase leading-none">
                  Welcome <span className="text-primary NOT-italic">Back.</span>
                </h1>
                <p className="text-[10px] font-bold text-muted-foreground/50 italic uppercase tracking-[0.2em] max-w-[280px] mx-auto opacity-70">Neural access initialization required for node entry.</p>
              </div>
            </div>

            {/* Social Authentication Matrix */}
            <div className="grid grid-cols-2 gap-6 mb-12">
              <Button
                variant="outline"
                className="h-16 rounded-[22px] border-border/40 bg-background/50 hover:bg-foreground hover:text-background transition-all font-black text-[10px] uppercase tracking-[0.2em] gap-4 shadow-inner italic border-none"
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
                className="h-16 rounded-[22px] border-border/40 bg-background/50 hover:bg-foreground hover:text-background transition-all font-black text-[10px] uppercase tracking-[0.2em] gap-4 shadow-inner italic border-none"
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
              <div className="relative flex justify-center">
                <span className="bg-secondary/10 backdrop-blur-3xl px-6 text-[10px] text-muted-foreground font-black italic uppercase tracking-[0.5em]">Secure Terminal Entry</span>
              </div>
            </div>

            {/* Access Payload Form */}
            <form onSubmit={handleSubmit} className="space-y-10">
              <div className="space-y-3">
                <Label htmlFor="email" className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground ml-4 italic px-2">Digital Identity</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="OPERATOR@DEVFOLIO.IO"
                  className="h-16 rounded-[22px] px-8 bg-background/50 border-border/40 focus:border-primary/50 focus:ring-primary/20 transition-all font-black text-xs uppercase tracking-widest placeholder:opacity-30"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between px-2">
                  <Label htmlFor="password" title="password" className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground ml-2 italic">Access Key</Label>
                  <Link to="/forgot-password" title="forgot password" className="text-[10px] font-black italic text-primary uppercase tracking-[0.2em] hover:text-foreground transition-all">Reset Vector</Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••••••"
                    className="h-16 rounded-[22px] px-8 bg-background/50 border-border/40 focus:border-primary/50 focus:ring-primary/20 transition-all font-black text-xs uppercase tracking-widest placeholder:opacity-30"
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
                      <EyeOff className="w-5 h-5 opacity-40" />
                    ) : (
                      <Eye className="w-5 h-5 opacity-40" />
                    )}
                  </button>
                </div>
              </div>

              {error && (
                <div className="p-6 rounded-[24px] bg-destructive/10 border border-destructive/20 flex items-center gap-4 text-destructive animate-fade-in shadow-inner">
                  <ShieldCheck className="w-6 h-6 flex-shrink-0" />
                  <p className="text-xs font-black uppercase tracking-widest italic">{error}</p>
                </div>
              )}

              <div className="pt-4">
                <Button
                  type="submit"
                  className="w-full h-16 rounded-[24px] font-black text-xl bg-primary text-primary-foreground hover:scale-[1.02] active:scale-[0.98] transition-all shadow-2xl shadow-primary/30 uppercase tracking-[0.2em] border-none italic group"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-4">
                      <div className="w-6 h-6 rounded-full border-[3px] border-primary-foreground/20 border-t-primary-foreground animate-spin" />
                      <span className="text-xl">Establishing...</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-6">
                       Initialize Access
                       <ArrowRight className="w-6 h-6 stroke-[4px] group-hover:translate-x-2 transition-transform" />
                    </div>
                  )}
                </Button>
              </div>

              <div className="flex flex-col items-center gap-4 pt-4">
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground italic">
                  New operator?{" "}
                  <Link to="/signup" className="text-primary hover:text-foreground transition-all underline decoration-primary/20 underline-offset-8">
                    Establish Identity
                  </Link>
                </p>
                <div className="flex items-center gap-4 text-muted-foreground/30 italic">
                   <ShieldCheck className="w-4 h-4" />
                   <span className="text-[10px] font-black uppercase tracking-[0.4em]">AES-256 Bit Encryption</span>
                </div>
              </div>
            </form>
          </div>
        </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;

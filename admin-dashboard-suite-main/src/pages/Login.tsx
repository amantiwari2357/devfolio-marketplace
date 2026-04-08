import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Link, Loader2 } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch('https://devfolio-marketplace-1.onrender.com/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Store token and user data
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      // Navigate to dashboard
      navigate("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--primary)/0.05),transparent),radial-gradient(ellipse_at_bottom_left,hsl(var(--accent)/0.05),transparent)] bg-background">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:32px_32px]"></div>
      
      <Card className="w-full max-w-md relative overflow-hidden border-border/40 bg-card/40 backdrop-blur-xl shadow-2xl transition-all duration-500 hover:shadow-primary/5">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/20 via-primary to-primary/20"></div>
        
        <div className="p-8 md:p-10">
          <div className="flex flex-col items-center mb-10">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 border border-primary/20 shadow-lg shadow-primary/5 group transition-all duration-500 hover:scale-110">
                <div className="relative">
                    <Link className="w-8 h-8 text-primary" />
                    <div className="absolute inset-0 bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
            </div>
            <div className="text-center">
              <h1 className="text-2xl md:text-3xl font-black tracking-tighter text-foreground italic uppercase">V_Node / Authentication</h1>
              <p className="text-[10px] md:text-xs font-bold text-muted-foreground/60 uppercase tracking-[0.2em] mt-2 italic shadow-sm">Secure Terminal Access Protocol</p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="p-4 text-[10px] font-bold text-destructive bg-destructive/5 border border-destructive/20 rounded-xl flex items-center gap-3 uppercase tracking-widest italic animate-in fade-in slide-in-from-top-1">
                <div className="w-1.5 h-1.5 rounded-full bg-destructive shadow-[0_0_8px_rgba(var(--destructive),0.5)]"></div>
                {error}
              </div>
            )}

            <div className="space-y-3">
              <Label htmlFor="email" className="text-[10px] font-black uppercase text-foreground/70 italic tracking-widest ml-1">Access_Identifier</Label>
              <Input
                id="email"
                type="email"
                placeholder="ADMIN_NODE_ALPHA"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
                className="bg-muted/10 border-border/30 h-12 rounded-xl px-4 text-xs font-bold italic focus:ring-primary/20 transition-all placeholder:text-muted-foreground/30"
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between ml-1">
                <Label htmlFor="password" className="text-[10px] font-black uppercase text-foreground/70 italic tracking-widest">Security_Sequence</Label>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
                className="bg-muted/10 border-border/30 h-12 rounded-xl px-4 text-xs font-black italic focus:ring-primary/20 transition-all placeholder:text-muted-foreground/30"
              />
            </div>

            <Button type="submit" className="w-full h-12 rounded-xl font-black uppercase italic tracking-[0.2em] text-[11px] shadow-lg shadow-primary/20 transition-all active:scale-95" disabled={loading}>
              {loading ? (
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 border-2 border-background/20 border-t-background rounded-full animate-spin"></div>
                  Synchronizing...
                </div>
              ) : (
                "Authorize_Login"
              )}
            </Button>
          </form>

          <div className="mt-10 pt-8 border-t border-border/5 text-center">
            <p className="text-[10px] font-black italic uppercase tracking-widest text-muted-foreground/40">
              Devfolio_Marketplace_Core // Ver_4.0.1
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Login;

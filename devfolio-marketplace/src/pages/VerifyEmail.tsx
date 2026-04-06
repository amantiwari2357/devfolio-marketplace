import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { CheckCircle2, AlertCircle, Loader, ArrowRight, Fingerprint, Activity } from 'lucide-react';
import api from '@/services/api';
import SEO from '@/components/layout/SEO';
import logo from "../../../public/Images/logo.png";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const token = searchParams.get('token');

        if (!token) {
          setStatus('error');
          setMessage('No verification token provided');
          return;
        }

        const response = await api.get(`/users/verify-email?token=${token}`);

        setStatus('success');
        setMessage(response.data.message);
        toast.success('Email verified successfully!');

        // Redirect to login after 3 seconds
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } catch (error: any) {
        setStatus('error');
        setMessage(error.response?.data?.message || 'Failed to verify email');
        toast.error('Email verification failed');
      }
    };

    verifyEmail();
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-8 selection:bg-primary selection:text-primary-foreground relative overflow-hidden">
      <SEO title="Verify Email | Protocol Identity" description="Verify your email address to activate your Devfolio Marketplace account." />
      
      {/* Background Mesh Flux */}
      <div className="absolute top-0 right-0 -z-10 w-2/3 h-2/3 bg-primary/2 opacity-30 blur-[180px] rounded-full animate-pulse" />
      <div className="absolute bottom-0 left-0 -z-10 w-1/2 h-1/2 bg-primary/2 opacity-20 blur-[150px] rounded-full animate-pulse" style={{ animationDelay: '1s' }} />

      {/* Branding */}
      <div className="flex flex-col items-center mb-16 animate-slide-up">
        <Link to="/" className="flex flex-col items-center gap-6 group">
          <img 
            src={logo} 
            alt="Devfolio Logo" 
            className="h-32 md:h-40 w-auto group-hover:scale-105 transition-transform duration-500"
            fetchPriority="high"
          />
          <span className="text-3xl font-black tracking-tighter text-foreground group-hover:text-primary transition-all italic uppercase">
            DEVFOLIOMARKETPLACE<span className="text-primary NOT-italic">.COM</span>
          </span>
        </Link>
      </div>

      <Card className="w-full max-w-md neural-card p-10 md:p-12 relative overflow-hidden group shadow-2xl animate-slide-up" style={{ animationDelay: '100ms' }}>
        <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-5 transition-all duration-1000 rotate-12">
          <Fingerprint className="w-48 h-48 text-primary" />
        </div>

        <div className="text-center mb-10 space-y-4">
          <h1 className="text-2xl md:text-3xl font-black tracking-tighter italic uppercase text-foreground leading-none">
            Account <span className="text-primary NOT-italic">Verification.</span>
          </h1>
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground opacity-50 italic">
            {status === 'loading' ? 'Establishing identity' : 'Protocol Status'}
          </p>
        </div>

        <div className="space-y-10 relative z-10">
          {status === 'loading' && (
            <div className="flex flex-col items-center gap-8 py-4">
              <div className="relative">
                <div className="w-20 h-20 rounded-[24px] border-4 border-primary/20 border-t-primary animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Activity className="w-8 h-8 text-primary animate-pulse" />
                </div>
              </div>
              <p className="text-center text-sm font-bold text-muted-foreground italic tracking-tight opacity-70">
                Confirming node address...
              </p>
            </div>
          )}

          {status === 'success' && (
            <div className="flex flex-col items-center gap-8 py-4 animate-in fade-in zoom-in duration-700">
              <div className="w-24 h-24 rounded-[28px] bg-primary/10 flex items-center justify-center text-primary shadow-2xl shadow-primary/10">
                <CheckCircle2 className="w-12 h-12" />
              </div>
              <div className="text-center space-y-3">
                <p className="font-black text-xl text-foreground uppercase tracking-tight italic">{message}</p>
                <p className="text-[10px] font-black text-primary uppercase tracking-[0.3em] animate-pulse italic">
                  Redirecting to access terminal...
                </p>
              </div>
              <Button
                onClick={() => navigate('/login')}
                className="w-full h-16 rounded-[22px] font-black text-lg bg-primary text-primary-foreground hover:scale-[1.05] active:scale-[0.95] transition-all shadow-2xl shadow-primary/30 uppercase tracking-[0.2em] italic border-none"
              >
                Go to Login <ArrowRight className="ml-4 w-6 h-6 stroke-[3px]" />
              </Button>
            </div>
          )}

          {status === 'error' && (
            <div className="flex flex-col items-center gap-8 py-4 animate-in fade-in slide-in-from-bottom-8 duration-700">
              <div className="w-24 h-24 rounded-[28px] bg-destructive/10 flex items-center justify-center text-destructive">
                <AlertCircle className="w-12 h-12" />
              </div>
              <div className="text-center space-y-3">
                <p className="font-black text-xl text-foreground uppercase tracking-tight italic">Verification Error</p>
                <p className="text-sm font-bold text-muted-foreground/60 italic opacity-80">{message}</p>
              </div>
              <div className="flex flex-col gap-4 w-full">
                <Button
                  onClick={() => navigate('/login')}
                  className="w-full h-16 rounded-[22px] font-black text-lg bg-primary text-primary-foreground hover:scale-[1.05] active:scale-[0.95] transition-all shadow-2xl shadow-primary/30 uppercase tracking-[0.2em] italic border-none"
                >
                  Return to Terminal
                </Button>
                <Button
                  variant="outline"
                  onClick={() => navigate('/signup')}
                  className="w-full h-16 rounded-[22px] font-black text-sm bg-transparent border-border/50 hover:bg-secondary/50 uppercase tracking-[0.2em] italic"
                >
                  Establish New Node
                </Button>
              </div>
            </div>
          )}
        </div>
      </Card>

      <div className="mt-16 text-center animate-slide-up" style={{ animationDelay: '200ms' }}>
        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.6em] opacity-30 italic">Secure Identity Layer v4.0</p>
      </div>
    </div>
  );
};

export default VerifyEmail;

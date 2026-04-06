import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { CheckCircle2, AlertCircle, Loader, ArrowRight } from 'lucide-react';
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
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-8 selection:bg-primary selection:text-primary-foreground">
      <SEO title="Verify Email" description="Verify your email address to activate your Devfolio Marketplace account." />
      
      {/* Branding */}
      <div className="flex flex-col items-center mb-12">
        <Link to="/" className="flex items-center gap-2 group mb-6">
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
      </div>

      <Card className="w-full max-w-md rounded-2xl border-border/50 bg-card shadow-2xl shadow-primary/5 overflow-hidden">
        <CardHeader className="text-center pb-2">
          <CardTitle className="text-3xl font-black tracking-tight">Account Verification</CardTitle>
          <CardDescription className="text-sm font-medium text-muted-foreground uppercase tracking-widest">
            {status === 'loading' ? 'Verifying your identity' : 'Verification status'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8 pt-6 pb-10">
          {status === 'loading' && (
            <div className="flex flex-col items-center gap-6 py-4">
              <div className="relative">
                <div className="w-16 h-16 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-primary animate-ping" />
                </div>
              </div>
              <p className="text-center text-muted-foreground font-medium">
                Confirming your email address...
              </p>
            </div>
          )}

          {status === 'success' && (
            <div className="flex flex-col items-center gap-6 py-4 animate-in fade-in zoom-in duration-500">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-primary shadow-lg shadow-primary/5">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div className="text-center">
                <p className="font-bold text-xl text-foreground mb-2">{message}</p>
                <p className="text-sm text-muted-foreground font-medium animate-pulse">
                  Redirecting to your dashboard shortly...
                </p>
              </div>
              <Button
                onClick={() => navigate('/login')}
                className="w-full rounded-xl py-6 font-black text-lg bg-primary text-primary-foreground hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                Go to Login <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          )}

          {status === 'error' && (
            <div className="flex flex-col items-center gap-6 py-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center text-destructive">
                <AlertCircle className="w-10 h-10" />
              </div>
              <div className="text-center">
                <p className="font-bold text-xl text-foreground mb-2">Verification Error</p>
                <p className="text-sm text-muted-foreground font-medium">{message}</p>
              </div>
              <div className="flex flex-col gap-3 w-full">
                <Button
                  onClick={() => navigate('/login')}
                  className="w-full rounded-xl py-6 font-black text-lg bg-primary text-primary-foreground hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  Continue to Login
                </Button>
                <Button
                  variant="outline"
                  onClick={() => navigate('/signup')}
                  className="w-full rounded-xl py-6 font-bold bg-transparent border-border/50 hover:bg-secondary/50"
                >
                  Create New Account
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="mt-12 text-center">
        <p className="text-xs font-black text-muted-foreground uppercase tracking-[0.3em] opacity-40">Secure Identity Layer</p>
      </div>
    </div>
  );
};

export default VerifyEmail;

import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { CheckCircle2, AlertCircle, Loader } from 'lucide-react';
import api from '@/services/api';

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

        // Redirect to login after 2 seconds
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } catch (error: any) {
        setStatus('error');
        setMessage(error.response?.data?.message || 'Failed to verify email');
        toast.error('Email verification failed');
      }
    };

    verifyEmail();
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-primary-glow/10 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Email Verification</CardTitle>
          <CardDescription>Verifying your email address</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {status === 'loading' && (
            <div className="flex flex-col items-center gap-4">
              <Loader className="w-12 h-12 text-primary animate-spin" />
              <p className="text-center text-muted-foreground">
                Verifying your email address...
              </p>
            </div>
          )}

          {status === 'success' && (
            <div className="flex flex-col items-center gap-4">
              <CheckCircle2 className="w-12 h-12 text-green-500" />
              <div className="text-center">
                <p className="font-semibold text-foreground">{message}</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Redirecting to login page...
                </p>
              </div>
              <Button
                onClick={() => navigate('/login')}
                className="w-full mt-4"
              >
                Go to Login
              </Button>
            </div>
          )}

          {status === 'error' && (
            <div className="flex flex-col items-center gap-4">
              <AlertCircle className="w-12 h-12 text-destructive" />
              <div className="text-center">
                <p className="font-semibold text-foreground">Verification Failed</p>
                <p className="text-sm text-muted-foreground mt-2">{message}</p>
              </div>
              <div className="flex gap-2 w-full mt-4">
                <Button
                  variant="outline"
                  onClick={() => navigate('/signup')}
                  className="flex-1"
                >
                  Back to Signup
                </Button>
                <Button
                  onClick={() => navigate('/login')}
                  className="flex-1"
                >
                  Go to Login
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default VerifyEmail;

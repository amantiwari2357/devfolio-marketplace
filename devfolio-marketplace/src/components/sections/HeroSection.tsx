import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Star } from "lucide-react";
import ProfileCards from "@/components/cards/ProfileCards";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { userAPI, enquiryAPI } from "@/services/auth";

const HeroSection = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [enquiryForm, setEnquiryForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          await userAPI.getProfile();
          setIsLoggedIn(true);
        } catch (error) {
          setIsLoggedIn(false);
        }
      } else {
        setIsLoggedIn(false);
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const handleLaunchStore = () => {
    if (isLoggedIn) {
      // Open enquiry form dialog for logged-in users
      document.getElementById('enquiry-dialog-trigger')?.click();
    } else {
      // Navigate to signup for non-logged-in users
      navigate("/signup");
    }
  };

  const handleEnquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(false);

    try {
      await enquiryAPI.createEnquiry(enquiryForm);

      alert('Thank you for your enquiry! We will get back to you soon.');
      setEnquiryForm({ name: '', email: '', phone: '', message: '' });
      document.getElementById('enquiry-dialog-close')?.click();
    } catch (error) {
      console.error('Error submitting enquiry:', error);
      setSubmitError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getMailtoLink = () => {
    const subject = encodeURIComponent(`Enquiry from ${enquiryForm.name}`);
    const body = encodeURIComponent(`Name: ${enquiryForm.name}\nEmail: ${enquiryForm.email}\nPhone: ${enquiryForm.phone}\n\nMessage:\n${enquiryForm.message}`);
    return `mailto:devfoliomarketplace@gmail.com?subject=${subject}&body=${body}`;
  };

  if (isLoading) {
    return (
      <section className="section-spacing bg-gradient-to-b from-background to-secondary/30">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="h-20 bg-muted animate-pulse rounded-3xl w-3/4"></div>
              <div className="h-6 bg-muted animate-pulse rounded-xl w-full"></div>
              <div className="h-16 bg-muted animate-pulse rounded-2xl w-48"></div>
            </div>
            <div className="h-[400px] md:h-[600px] bg-muted animate-pulse rounded-[44px]"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-spacing bg-gradient-to-b from-background to-secondary/30 relative overflow-hidden">
      {/* Background Flux */}
      <div className="absolute top-0 right-0 -z-10 w-1/2 h-1/2 bg-primary/2 opacity-30 blur-[150px] rounded-full animate-pulse" />
      
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 md:gap-20 items-center">
          <div className="animate-slide-up space-y-8 md:space-y-12">
            <div className="space-y-6">
              <h1 className="heading-responsive">
                Your All-in-One
                <br />
                Creator <span className="text-primary NOT-italic">Storefront.</span>
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground font-bold italic tracking-tight leading-relaxed max-w-xl opacity-70">
                Helping individuals and brands build modern, responsive websites and powerful digital solutions — all tailored to their business goals.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="h-16 md:h-20 rounded-[22px] md:rounded-[28px] px-10 md:px-12 font-black text-lg md:text-xl bg-foreground text-background hover:scale-105 active:scale-95 transition-all shadow-2xl group uppercase tracking-widest italic border-none"
                onClick={handleLaunchStore}
              >
                Launch Your Store
                <ArrowRight className="ml-4 w-6 h-6 group-hover:translate-x-2 transition-transform stroke-[3px]" />
              </Button>
            </div>
          </div>

          <div className="animate-slide-up" style={{ animationDelay: '100ms' }}>
            <ProfileCards />
          </div>
        </div>
      </div>

      {/* Enquiry Form Dialog */}
      <Dialog>
        <DialogTrigger asChild>
          <button id="enquiry-dialog-trigger" style={{ display: 'none' }}>Open Enquiry</button>
        </DialogTrigger>
        <DialogContent className="max-w-md p-0 border-none bg-transparent">
          <Card className="neural-card p-10 md:p-12 relative overflow-hidden group shadow-2xl">
            <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none group-hover:rotate-12 transition-transform">
              <ArrowRight className="w-48 h-48 text-primary" />
            </div>
            
            <DialogHeader className="mb-10 text-center relative z-10">
              <DialogTitle className="text-3xl font-black tracking-tighter text-foreground italic uppercase">Launch Your <span className="text-primary NOT-italic">Store.</span></DialogTitle>
            </DialogHeader>
            <form onSubmit={handleEnquirySubmit} className="space-y-6 relative z-10">
              <div className="space-y-2.5">
                <Label htmlFor="name" className="text-[10px] font-black uppercase tracking-widest ml-1 opacity-60 italic">Architect Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="ENTER_YOUR_NAME"
                  className="h-14 rounded-2xl bg-background/50 border-border/40 focus:border-primary/50 font-black text-xs uppercase tracking-widest px-6"
                  value={enquiryForm.name}
                  onChange={(e) => setEnquiryForm(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>
              <div className="space-y-2.5">
                <Label htmlFor="email" className="text-[10px] font-black uppercase tracking-widest ml-1 opacity-60 italic">Signal Node (Email)</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="SUPPORT@DEVFOLIOMARKETPLACE.COM"
                  className="h-14 rounded-2xl bg-background/50 border-border/40 focus:border-primary/50 font-black text-xs uppercase tracking-widest px-6"
                  value={enquiryForm.email}
                  onChange={(e) => setEnquiryForm(prev => ({ ...prev, email: e.target.value }))}
                />
              </div>
              <div className="space-y-2.5">
                <Label htmlFor="phone" className="text-[10px] font-black uppercase tracking-widest ml-1 opacity-60 italic">Coordinate (Phone)</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="DIRECT_HOTLINE"
                  className="h-14 rounded-2xl bg-background/50 border-border/40 focus:border-primary/50 font-black text-xs uppercase tracking-widest px-6"
                  value={enquiryForm.phone}
                  onChange={(e) => setEnquiryForm(prev => ({ ...prev, phone: e.target.value }))}
                />
              </div>
              <div className="space-y-2.5">
                <Label htmlFor="message" className="text-[10px] font-black uppercase tracking-widest ml-1 opacity-60 italic">Protocol Brief</Label>
                <Textarea
                  id="message"
                  placeholder="DEFINE_REQUIREMENTS..."
                  className="rounded-2xl bg-background/50 border-border/40 focus:border-primary/50 font-bold text-xs uppercase tracking-widest p-6 min-h-[120px] resize-none"
                  value={enquiryForm.message}
                  onChange={(e) => setEnquiryForm(prev => ({ ...prev, message: e.target.value }))}
                  rows={4}
                />
              </div>
            {submitError && (
              <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-xs font-bold italic animate-shake">
                <p className="mb-3">Transmition failed. Secure relay node unreachable.</p>
                <Button 
                  type="button"
                  variant="outline" 
                  className="w-full border-destructive/50 hover:bg-destructive hover:text-white transition-all text-[10px] uppercase tracking-widest h-12"
                  onClick={() => window.location.href = getMailtoLink()}
                >
                  Mail Us Instead
                </Button>
              </div>
            )}
            <div className="flex gap-4 pt-6">
              <Button type="submit" disabled={isSubmitting} className="flex-1 h-14 rounded-2xl font-black bg-primary text-primary-foreground shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all text-[10px] uppercase tracking-widest italic border-none">
                {isSubmitting ? 'Transmitting...' : 'Dispatch Request'}
              </Button>
              <Button
                type="button"
                variant="outline"
                id="enquiry-dialog-close"
                onClick={() => {
                  const closeBtn = document.querySelector('[data-radix-collection-item]') as HTMLElement;
                  closeBtn?.click();
                }}
                className="flex-1 h-14 rounded-2xl font-black text-[10px] uppercase tracking-widest italic"
              >
                Terminate
              </Button>
            </div>
          </form>
          </Card>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default HeroSection;
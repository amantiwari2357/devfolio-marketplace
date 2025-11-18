import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
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

    try {
      await enquiryAPI.createEnquiry(enquiryForm);

      alert('Thank you for your enquiry! We will get back to you soon.');
      setEnquiryForm({ name: '', email: '', phone: '', message: '' });
      document.getElementById('enquiry-dialog-close')?.click();
    } catch (error) {
      console.error('Error submitting enquiry:', error);
      alert('Failed to submit enquiry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <section className="pt-32 pb-20 bg-gradient-to-b from-background to-secondary/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="h-16 bg-muted animate-pulse rounded mb-6"></div>
              <div className="h-6 bg-muted animate-pulse rounded mb-4"></div>
              <div className="h-10 bg-muted animate-pulse rounded w-48"></div>
            </div>
            <div className="h-96 bg-muted animate-pulse rounded"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="pt-32 pb-20 bg-gradient-to-b from-background to-secondary/30">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Your All-in-One
              <br />
              Creator <span className="text-primary">Storefront</span>
            </h1>

            <p className="text-xl text-muted-foreground mb-8">
            Helping individuals and brands build modern, responsive websites and powerful digital solutions — all tailored to their business goals.            </p>

            <Button
              size="lg"
              className="bg-foreground text-background hover:bg-foreground/90 group"
              onClick={handleLaunchStore}
            >
              Launch Your Store
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>

            <div className="mt-8 space-y-2">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-sm font-medium">100k+ reviews</span>
              </div>
              <p className="text-sm text-muted-foreground">1mn+ professionals</p>
            </div>
          </div>

          <ProfileCards />
        </div>
      </div>

      {/* Enquiry Form Dialog */}
      <Dialog>
        <DialogTrigger asChild>
          <button id="enquiry-dialog-trigger" style={{ display: 'none' }}>Open Enquiry</button>
        </DialogTrigger>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Launch Your Store - Get Started</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleEnquirySubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={enquiryForm.name}
                onChange={(e) => setEnquiryForm(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={enquiryForm.email}
                onChange={(e) => setEnquiryForm(prev => ({ ...prev, email: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="Enter your phone number"
                value={enquiryForm.phone}
                onChange={(e) => setEnquiryForm(prev => ({ ...prev, phone: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="message">Tell us about your requirements</Label>
              <Textarea
                id="message"
                placeholder="Describe your business, target audience, and what kind of store you want to launch..."
                value={enquiryForm.message}
                onChange={(e) => setEnquiryForm(prev => ({ ...prev, message: e.target.value }))}
                rows={4}
              />
            </div>
            <div className="flex gap-3 pt-4">
              <Button type="submit" disabled={isSubmitting} className="flex-1">
                {isSubmitting ? 'Submitting...' : 'Submit Enquiry'}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById('enquiry-dialog-close')?.click()}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default HeroSection;
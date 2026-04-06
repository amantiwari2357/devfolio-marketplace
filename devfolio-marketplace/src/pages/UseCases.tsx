import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Code, Smartphone, Globe, Database, Cloud, Server, Shield, Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import SEO from "@/components/layout/SEO";

const UseCases = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    service: ""
  });

  const services = [
    {
      icon: <Code className="w-8 h-8" />,
      title: "Custom Web Development",
      description: "Bespoke web applications built with modern technologies to meet your specific business needs.",
      benefits: ["Responsive Performance", "Cloud-Scale SEO", "Ultra-Fast Renders"]
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "Mobile Architecture",
      description: "Cross-platform mobile applications that work seamlessly on both iOS and Android devices.",
      benefits: ["Native UX Fidelity", "Offline Resilience", "Store Optimization"]
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "E-commerce Ecosystems",
      description: "Complete e-commerce platforms with secure payment gateways and inventory management.",
      benefits: ["Encrypted Checkout", "Real-time Sync", "Global Distribution"]
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: "Data Intelligence",
      description: "Efficient database design, optimization, and management for your applications.",
      benefits: ["Bank-Grade Security", "Elastic Scaling", "Performance Tuning"]
    },
    {
      icon: <Cloud className="w-8 h-8" />,
      title: "Cloud Infrastructure",
      description: "Cloud infrastructure setup, migration, and management on AWS, Azure, or Google Cloud.",
      benefits: ["99.9% Reliability", "Automated Scaling", "Cost Dynamics"]
    },
    {
      icon: <Server className="w-8 h-8" />,
      title: "DevOps Operations",
      description: "Automated deployment pipelines and infrastructure as code for seamless development workflows.",
      benefits: ["Zero-Downtime CI/CD", "Automated Validation", "Atomic Releases"]
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Cyber Resilience",
      description: "Comprehensive security solutions to protect your digital assets and data.",
      benefits: ["Live Vulnerability Scans", "Penetration Vectors", "Protocol Audits"]
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.service) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('https://devfolio-marketplace-1.onrender.com/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          type: 'service-enquiry'
        })
      });

      if (!response.ok) throw new Error('Failed to submit enquiry');
      toast.success('Strategy session initiated! We will contact you shortly.');
      setIsDialogOpen(false);
      setFormData({ name: '', phone: '', service: '' });
    } catch (error) {
      toast.error('Network synchronization failed. Please retry.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-background selection:bg-primary selection:text-primary-foreground">
      <SEO 
        title="Professional Solutions" 
        description="Explore the advanced software development and consulting services offered by Devfolio Marketplace experts." 
      />
      <Header />
      
      <main className="pt-32 pb-24 overflow-hidden">
        {/* Background Accents */}
        <div className="fixed top-0 right-0 -z-10 w-1/3 h-1/3 bg-primary/5 blur-[120px] pointer-events-none rounded-full" />
        <div className="fixed bottom-0 left-0 -z-10 w-1/3 h-1/3 bg-primary/5 blur-[120px] pointer-events-none rounded-full" />

        <div className="container mx-auto px-4 relative">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border/50 text-xs font-black uppercase tracking-[0.2em] text-primary">
              <Sparkles className="w-4 h-4" />
              Advanced Architecture
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight text-foreground leading-tight">
              Software <span className="text-primary italic">Intelligence.</span>
            </h1>
            <p className="text-xl text-muted-foreground font-medium leading-relaxed">
              Engineering future-proof digital infrastructure with white-glove precision.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
            {services.map((service, index) => (
              <Card key={index} className="p-10 rounded-[40px] bg-card border-border/50 group hover:border-primary/20 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none">
                  {service.icon}
                </div>
                
                <div className="mb-8 w-16 h-16 rounded-2xl bg-secondary/50 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-500 ring-1 ring-border/50 shadow-inner">
                  {service.icon}
                </div>

                <div className="space-y-4 mb-8">
                  <h3 className="text-2xl font-black tracking-tight text-foreground">{service.title}</h3>
                  <p className="text-muted-foreground font-medium leading-relaxed">
                    {service.description}
                  </p>
                </div>

                <ul className="space-y-3 mb-10">
                  {service.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-sm font-bold text-foreground/80">
                      <div className="p-0.5 rounded-full bg-primary/20 text-primary">
                        <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                      {benefit}
                    </li>
                  ))}
                </ul>

                <Dialog open={isDialogOpen && formData.service === service.title} onOpenChange={(open) => {
                  setIsDialogOpen(open);
                  if (open) setFormData(prev => ({ ...prev, service: service.title }));
                }}>
                  <DialogTrigger asChild>
                    <Button 
                      className="w-full rounded-2xl py-8 font-black text-lg bg-secondary/50 border-border/50 hover:bg-primary hover:text-primary-foreground group-hover:shadow-xl group-hover:shadow-primary/20 transition-all gap-3"
                    >
                      Analyze Project
                      <ArrowRight className="w-5 h-5" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="rounded-[40px] border-border/50 bg-background md:p-12">
                    <DialogHeader className="space-y-4 mb-8">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                        {service.icon}
                      </div>
                      <DialogTitle className="text-4xl font-black tracking-tight leading-tight">
                        Initiate <span className="text-primary italic">Intelligence.</span>
                      </DialogTitle>
                      <p className="text-muted-foreground font-medium">
                        Our specialized architects will contact you within 24 hours to map out your {service.title} roadmap.
                      </p>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-xs font-black uppercase tracking-widest text-muted-foreground">Full Identity</Label>
                        <Input 
                          id="name" 
                          name="name" 
                          placeholder="Your professional name" 
                          value={formData.name}
                          onChange={handleInputChange}
                          className="rounded-xl py-6 bg-secondary/20 border-border/50 focus:border-primary/50 font-bold"
                          required 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-xs font-black uppercase tracking-widest text-muted-foreground">Encrypted Link (Phone)</Label>
                        <Input 
                          id="phone" 
                          name="phone" 
                          type="tel" 
                          placeholder="+91 ...." 
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="rounded-xl py-6 bg-secondary/20 border-border/50 focus:border-primary/50 font-bold"
                          required 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Operating Sector</Label>
                        <Input 
                          value={service.title} 
                          disabled 
                          className="rounded-xl py-6 bg-secondary/50 border-border/10 font-black text-primary opacity-100"
                        />
                      </div>
                      <Button type="submit" className="w-full rounded-xl py-8 font-black text-xl bg-primary text-primary-foreground hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-primary/20" disabled={isSubmitting}>
                        {isSubmitting ? 'Synchronizing...' : 'Authorize Call Back'}
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
              </Card>
            ))}
          </div>

          <div className="max-w-5xl mx-auto">
            <Card className="p-12 md:p-20 rounded-[40px] bg-foreground text-background border-none relative overflow-hidden text-center group">
              <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-700">
                <Globe className="w-64 h-64 text-primary" />
              </div>
              
              <div className="relative z-10 space-y-10">
                <div className="space-y-4">
                  <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
                    Have a <span className="text-primary italic">Vision?</span>
                  </h2>
                  <p className="text-xl text-background/60 font-medium max-w-2xl mx-auto leading-relaxed">
                    Collaborate with <span className="text-background font-bold underline decoration-primary/50 underline-offset-8">DEVFOLIO.</span> specialized engineers to turn abstract concepts into mission-critical tech.
                  </p>
                </div>
                
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="lg" className="rounded-2xl px-12 py-8 font-black text-lg bg-primary text-primary-foreground hover:scale-105 transition-all shadow-2xl shadow-primary/30">
                      Request Strategic Audit
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="rounded-[40px] border-border/50 bg-background md:p-12 text-foreground">
                    <DialogHeader className="space-y-4 mb-8">
                      <DialogTitle className="text-4xl font-black tracking-tight leading-tight">
                        Strategic <span className="text-primary italic">Audit.</span>
                      </DialogTitle>
                      <p className="text-muted-foreground font-medium">
                        Initiate a high-level consultation with our platform solutions team.
                      </p>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-xs font-black uppercase tracking-widest text-muted-foreground">Full Identity</Label>
                        <Input 
                          id="name" 
                          name="name" 
                          placeholder="Your name" 
                          value={formData.name}
                          onChange={handleInputChange}
                          className="rounded-xl py-6 bg-secondary/20 border-border/50 font-bold"
                          required 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-xs font-black uppercase tracking-widest text-muted-foreground">Contact Node</Label>
                        <Input 
                          id="phone" 
                          name="phone" 
                          type="tel" 
                          placeholder="Phone number" 
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="rounded-xl py-6 bg-secondary/20 border-border/50 font-bold"
                          required 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="service" className="text-xs font-black uppercase tracking-widest text-muted-foreground">Primary Sector of Interest</Label>
                        <select
                          id="service"
                          name="service"
                          value={formData.service}
                          onChange={(e) => setFormData(prev => ({ ...prev, service: e.target.value }))}
                          className="flex h-14 w-full rounded-xl border border-border/50 bg-secondary/20 px-4 py-2 text-sm font-black focus:ring-2 focus:ring-primary/20 appearance-none transition-all"
                          required
                        >
                          <option value="" className="bg-background">Select a sector</option>
                          {services.map((service, index) => (
                            <option key={index} value={service.title} className="bg-background">{service.title}</option>
                          ))}
                        </select>
                      </div>
                      <Button type="submit" className="w-full rounded-xl py-8 font-black text-xl bg-primary text-primary-foreground hover:scale-[1.02] transition-all shadow-xl shadow-primary/20" disabled={isSubmitting}>
                        {isSubmitting ? 'Synchronizing...' : 'Authorize Consultation'}
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
                
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-background/40">Powered by the Expert Ecosystem.</p>
              </div>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default UseCases;
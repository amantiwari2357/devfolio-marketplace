import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Code, GitBranch, Zap, ShieldCheck, BarChart2, 
  Link as LinkIcon, Github, X, Download, Star, 
  ArrowRight, Globe, Layers, Sparkles, Rocket, Activity, ChevronRight,
  Fingerprint
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import SEO from "@/components/layout/SEO";

interface TemplateCardProps {
  title: string;
  description: string;
  tech: string[];
  stars: string | number;
  downloads: string | number;
  onDownload: () => Promise<void> | void;
}

const TemplateCard = ({ 
  title, 
  description, 
  tech, 
  stars, 
  downloads, 
  onDownload 
}: TemplateCardProps) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    try {
      setIsDownloading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      await onDownload();
    } catch (error) {
      console.error('Download failed:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <Card className="rounded-[44px] overflow-hidden bg-secondary/10 border-border/40 backdrop-blur-3xl hover:border-primary/40 transition-all duration-700 h-full flex flex-col group relative shadow-2xl">
      <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-all duration-700 bg-primary/20 pointer-events-none" />
      
      <div className="h-64 bg-secondary/20 flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity" style={{ backgroundImage: 'radial-gradient(circle, currentColor 1.5px, transparent 1.5px)', backgroundSize: '32px 32px' }} />
        <Code className="w-20 h-20 text-primary/30 group-hover:scale-110 group-hover:rotate-6 transition-all duration-700" />
        <div className="absolute bottom-6 right-6 flex gap-3">
           {tech.slice(0, 2).map((t, i) => (
             <span key={i} className="text-[10px] font-black uppercase tracking-[0.2em] px-4 py-2 bg-background/50 backdrop-blur-xl rounded-xl border border-border/40 italic">{t}</span>
           ))}
        </div>
      </div>

      <div className="p-10 flex-1 flex flex-col space-y-6">
        <div className="space-y-2">
          <h3 className="font-bold text-xl text-foreground group-hover:text-primary transition-colors">{title}</h3>
          <p className="text-sm font-medium text-muted-foreground leading-relaxed line-clamp-2">{description}</p>
        </div>

        <div className="flex justify-between items-center text-xs font-semibold text-muted-foreground mt-auto pt-6 border-t border-border/20">
          <span className="flex items-center gap-2">
            <Star className="w-4 h-4 text-primary fill-primary/20" />
            {stars} Stars
          </span>
          <span className="flex items-center gap-2">
            <Download className="w-4 h-4 text-primary" />
            {downloads} DLs
          </span>
        </div>

        <Button 
          onClick={handleDownload} 
          className="w-full h-12 rounded-xl font-bold text-sm bg-foreground text-background hover:scale-[1.02] active:scale-95 transition-all shadow-lg disabled:opacity-50"
          disabled={isDownloading}
        >
          {isDownloading ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-background/30 border-t-background rounded-full animate-spin" />
              Initializing...
            </div>
          ) : (
            <>
              <Download className="w-4 h-4 mr-2" />
              Deploy Template
            </>
          )}
        </Button>
      </div>
    </Card>
  );
};

const EnquiryForm = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({ name: '', phone: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[550px] rounded-[56px] bg-background/95 backdrop-blur-3xl border-border/40 p-12 overflow-hidden relative shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)]">
        <div className="absolute -top-32 -right-32 w-64 h-64 bg-primary/10 blur-[100px] rounded-full animate-pulse" />
        
        <DialogHeader className="mb-10 space-y-6">
           <div className="flex items-center gap-3 text-primary">
              <Sparkles className="w-4 h-4 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.6em] italic">Initialization Vector</span>
           </div>
           <DialogTitle className="text-3xl md:text-4xl font-bold tracking-tight leading-tight text-foreground">
             Get <span className="text-primary">Started</span>
           </DialogTitle>
           <DialogDescription className="text-base font-medium text-muted-foreground leading-relaxed pt-2">
             Configure your parameters below. Our engineering node will synchronize with your request shortly.
           </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-10">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-semibold ml-1 text-foreground">Full Name</Label>
              <Input 
                id="name" 
                className="h-12 md:h-14 rounded-xl px-4 bg-background border-border focus:border-primary focus:ring-primary/20 transition-all text-sm md:text-base placeholder:text-muted-foreground/50"
                value={formData.name}
                onChange={handleChange}
                placeholder="Ex. Elon Musk"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-semibold ml-1 text-foreground">Phone Number</Label>
              <Input 
                id="phone" 
                type="tel" 
                className="h-12 md:h-14 rounded-xl px-4 bg-background border-border focus:border-primary focus:ring-primary/20 transition-all text-sm md:text-base placeholder:text-muted-foreground/50" 
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 0000000000"
                required
              />
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
             <Button type="button" variant="ghost" onClick={onClose} className="h-12 flex-1 rounded-xl font-bold text-sm">
                Cancel
             </Button>
             <Button type="submit" className="h-12 flex-[2] rounded-xl font-bold text-sm bg-primary text-primary-foreground shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all">
                Submit Request
             </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

const TemplateGallery = ({ isOpen, onClose }) => {
  const [templates, setTemplates] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) fetchTemplates();
  }, [isOpen]);

  const fetchTemplates = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://devfolio-marketplace-1.onrender.com/api/templates');
      const data = await response.json();
      const transformedTemplates = (data.templates || []).map((template: any) => ({
        id: template._id,
        title: template.name,
        description: template.description,
        tech: template.technologies || [],
        stars: template.rating ? `${template.rating}k` : '0',
        downloads: template.downloads || '0',
        pdfUrl: template.pdfUrl,
        pdfName: template.pdfName
      }));
      setTemplates(transformedTemplates);
    } catch (error) {
      console.error('Error fetching templates:', error);
      setTemplates([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[1400px] rounded-[64px] bg-background border-border/40 p-12 md:p-20 overflow-hidden relative shadow-[0_60px_120px_-30px_rgba(0,0,0,0.6)]">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-primary/5 blur-[150px] rounded-full animate-pulse" />
        
        <DialogHeader className="mb-12">
          <div className="flex items-center gap-3 mb-4">
             <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shadow-sm font-bold">
                <Layers className="w-5 h-5" />
             </div>
             <span className="text-xs font-semibold text-muted-foreground opacity-80">Available Templates</span>
          </div>
          <DialogTitle className="text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-tight">
            The Template <span className="text-primary">Gallery.</span>
          </DialogTitle>
          <DialogDescription className="text-lg font-medium text-muted-foreground leading-relaxed pt-4 max-w-2xl">
            Select a high-performance template to initiate your deployment.
          </DialogDescription>
        </DialogHeader>

        <div className="max-h-[65vh] overflow-y-auto pr-8 custom-scrollbar pb-16">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-32 space-y-8">
              <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
              <p className="text-[10px] font-black uppercase tracking-[0.6em] text-muted-foreground italic animate-pulse">Catalyzing Asset Cluster...</p>
            </div>
          ) : templates.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {templates.map((template) => (
                <TemplateCard key={template.id} {...template} onDownload={() => {}} />
              ))}
            </div>
          ) : (
            <div className="text-center py-24 bg-secondary/10 rounded-[32px] border-2 border-border/20 border-dashed backdrop-blur-xl group">
              <Rocket className="w-16 h-16 mx-auto mb-6 text-muted-foreground/30 group-hover:scale-110 group-hover:rotate-12 transition-all duration-700" />
              <h3 className="text-2xl font-bold text-foreground/50">No Templates Found.</h3>
              <p className="text-sm font-medium text-muted-foreground/60 mt-2">Please try again later</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

const Listing = () => {
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [isTemplatesOpen, setIsTemplatesOpen] = useState(false);

  const features = [
    { icon: <Code className="w-8 h-8" />, title: "Logic Showcase", description: "Display high-fidelity modules with precision-tuned syntax highlighting." },
    { icon: <GitBranch className="w-8 h-8" />, title: "Vector Sync", description: "Synchronize with GitHub nodes directly to automate asset ingestion." },
    { icon: <Zap className="w-8 h-8" />, title: "Instant Velocity", description: "Edge-computed performance ensures near-zero latency worldwide." },
    { icon: <ShieldCheck className="w-8 h-8" />, title: "Custom Domain Root", description: "Establish your sovereign identity on your own namespace." },
    { icon: <BarChart2 className="w-8 h-8" />, title: "Telemetry Intel", description: "Deep-trace visitor interactions with high-fidelity analytics." },
    { icon: <LinkIcon className="w-8 h-8" />, title: "Proximity Deploy", description: "Single-signal deployment to our global content acceleration network." }
  ];

  const steps = [
    { number: "01", title: "Connect GitHub", description: "Synchronize your GitHub account to authorize automatic project discovery." },
    { number: "02", title: "Create Profile", description: "Define your technical trajectory with custom parameters and identifiers." },
    { number: "03", title: "Deploy Global", description: "Deploy your sovereign showcase to the world with absolute precision." }
  ];

  return (
    <div className="min-h-screen bg-background selection:bg-primary selection:text-primary-foreground">
      <SEO title="Portfolio Engine | Architecture" description="The ultimate architectural engine for developer showcases and elite portfolios." />
      <Header />
      
      <main className="pt-40 pb-40 relative overflow-hidden">
        {/* Background Mesh Flux */}
        <div className="absolute top-0 right-0 -z-10 w-2/3 h-2/3 bg-primary/2 opacity-30 blur-[200px] rounded-full animate-pulse" />
        <div className="absolute bottom-0 left-0 -z-10 w-1/2 h-1/2 bg-secondary/5 opacity-20 blur-[150px] rounded-full" />
        
        <div className="container mx-auto px-8 max-w-[1400px]">
          {/* Hero Section */}
          <div className="text-center max-w-5xl mx-auto mb-40 relative">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-border/40 text-foreground mb-8 backdrop-blur-md animate-fade-in shadow-sm">
               <Zap className="w-4 h-4 text-primary" />
               <span className="text-xs font-semibold">Developer Portfolios</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-8 text-foreground leading-tight animate-slide-up">
              Engineered <br /><span className="text-primary">Showcases.</span>
            </h1>
            <p className="text-base md:text-lg font-medium text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed animate-slide-up delay-100">
              The high-performance platform for developers to <span className="text-foreground">deploy elite portfolios</span> with technical precision.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-8 justify-center animate-slide-up delay-200">
              <Button 
                size="lg" 
                className="h-14 px-8 rounded-xl bg-primary text-primary-foreground text-base font-bold shadow-lg hover:scale-105 active:scale-95 transition-all border-none group"
                onClick={() => setIsEnquiryOpen(true)}
              >
                Get Started
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="h-14 px-8 rounded-xl border border-border/40 bg-secondary/10 text-base font-bold hover:bg-secondary/20 transition-all gap-2 shadow-sm"
                onClick={() => setIsTemplatesOpen(true)}
              >
                <Layers className="w-6 h-6 text-primary" />
                View Modules
              </Button>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-24 mb-40 items-center">
            <div className="space-y-16">
              <div className="space-y-6">
                <div className="flex items-center gap-3 text-primary font-semibold text-xs uppercase tracking-widest">
                   <Activity className="w-5 h-5 animate-pulse" />
                   System Capabilities
                </div>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6 text-foreground leading-tight">Elite Platform <span className="text-primary">Capabilities.</span></h2>
                <p className="text-base md:text-lg font-medium text-muted-foreground leading-relaxed max-w-xl">
                  Engineered specifically for developers to showcase high-fidelity projects in a premium environment curated for impact.
                </p>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-8">
                {features.map((feature, index) => (
                  <Card key={index} className="flex flex-col gap-6 p-10 rounded-[44px] bg-secondary/10 border-border/40 hover:bg-secondary/20 transition-all duration-700 group relative overflow-hidden shadow-2xl backdrop-blur-3xl min-h-[300px]">
                    <div className="absolute top-0 right-0 p-10 opacity-0 group-hover:opacity-10 transition-all duration-700 translate-x-4 translate-y-[-4px] group-hover:translate-x-0 group-hover:translate-y-0 pointer-events-none">
                       <Zap className="w-20 h-20 text-primary" />
                    </div>
                    <div className="p-5 rounded-[22px] bg-background/50 text-primary w-fit shadow-inner group-hover:scale-110 transition-transform">
                      {feature.icon}
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-bold text-xl text-foreground mb-1">{feature.title}</h3>
                      <p className="text-sm font-medium text-muted-foreground leading-relaxed">{feature.description}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            <Card className="p-16 md:p-24 rounded-[64px] bg-foreground text-background border-none h-full relative overflow-hidden group shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)]">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-transparent to-transparent opacity-40" />
              <div className="absolute -top-12 -right-12 w-96 h-96 bg-primary blur-[150px] opacity-20 rounded-full animate-pulse" />
              
              <div className="relative z-10 space-y-16">
                <div className="flex items-center gap-8">
                  <div className="p-5 bg-background/10 rounded-2xl backdrop-blur-md border border-background/20 shadow-lg group-hover:rotate-6 transition-all duration-700">
                    <Github className="w-10 h-10 text-background" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-2xl font-bold text-background">GitHub Integration</h4>
                    <p className="text-xs font-semibold opacity-60 text-background">Automatic Repository Sync</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  {['React', 'Next.js', 'Vite', 'Node.js', 'Python', 'Go'].map((tech) => (
                    <div key={tech} className="py-4 px-6 bg-background/5 rounded-xl text-center font-bold text-xs border border-background/10 hover:bg-background/20 hover:scale-105 transition-all backdrop-blur-sm cursor-pointer">
                      {tech}
                    </div>
                  ))}
                </div>
                
                <div className="pt-12 border-t border-background/10 space-y-8">
                  <div className="flex items-center gap-4 text-primary italic font-black uppercase tracking-[0.4em] text-[10px] opacity-40">
                     Target Sectors Node Matrix:
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {['Frontend', 'Backend', 'Full Stack', 'Mobile'].map((role) => (
                      <span key={role} className="flex items-center gap-3 px-5 py-2.5 rounded-xl bg-background/10 border border-background/20 text-xs font-bold backdrop-blur-md group/role hover:border-primary/40 transition-all cursor-pointer">
                         <div className="w-2 h-2 rounded-full bg-primary group-hover/role:animate-ping" />
                         {role}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <div className="mb-60 space-y-24">
            <div className="flex flex-col items-center justify-center text-center space-y-6">
               <div className="w-1.5 h-8 bg-primary rounded-full animate-pulse" />
               <h2 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight leading-tight">
                 Deployment <span className="text-primary">Process.</span>
               </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-12">
              {steps.map((step, index) => (
                <Card key={index} className="p-16 rounded-[48px] bg-secondary/10 border-border/40 text-center relative group overflow-hidden shadow-2xl backdrop-blur-3xl min-h-[450px] flex flex-col justify-center">
                  <div className="absolute -top-6 -left-6 text-[150px] font-bold text-primary/5 opacity-0 group-hover:opacity-100 transition-all duration-1000 pointer-events-none select-none">
                     {step.number}
                  </div>
                  <div className="relative z-10 space-y-6">
                    <div className="text-xs font-bold uppercase tracking-widest text-primary">Step {step.number}</div>
                    <h3 className="text-2xl font-bold text-foreground tracking-tight">{step.title}</h3>
                    <p className="text-base font-medium text-muted-foreground leading-relaxed">{step.description}</p>
                    <div className="pt-4">
                       <div className="w-12 h-1 bg-primary/20 rounded-full mx-auto group-hover:w-24 transition-all duration-700" />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <Card className="rounded-[64px] p-20 md:p-32 text-center bg-secondary/10 border-border/40 backdrop-blur-3xl flex flex-col items-center justify-center relative overflow-hidden group shadow-2xl">
            <div className="absolute inset-0 bg-primary/2 opacity-0 group-hover:opacity-10 transition-all duration-1000" />
            <div className="absolute top-0 right-0 p-32 opacity-0 group-hover:opacity-10 transition-all duration-1000 translate-x-12 translate-y-[-12px] group-hover:translate-x-0 group-hover:translate-y-0 pointer-events-none">
               <Globe className="w-[500px] h-[500px] text-primary" />
            </div>
            
            <div className="relative z-10 max-w-4xl mx-auto space-y-12">
              <div className="flex items-center justify-center gap-3 text-primary animate-pulse">
                 <Rocket className="w-6 h-6 fill-primary" />
                 <span className="text-xs font-bold uppercase tracking-widest">Get Started Today</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight leading-tight">
                Create Your <br /><span className="text-primary block">Developer Portfolio.</span>
              </h2>
              <p className="text-base md:text-lg font-medium text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                Join a network of developers deploying their portfolios and interacting with a global audience.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
                <Button 
                   onClick={() => setIsEnquiryOpen(true)}
                   size="lg" 
                   className="h-14 px-10 rounded-xl bg-foreground text-background text-base font-bold hover:scale-105 active:scale-95 transition-all shadow-lg"
                >
                  Start Now
                </Button>
                <Button size="lg" variant="outline" className="h-14 px-10 rounded-xl border-border/40 bg-secondary/10 text-base font-bold hover:bg-secondary/20 transition-all shadow-sm" asChild>
                  <Link to="/explore">
                    Discover Network
                  </Link>
                </Button>
              </div>
              <div className="pt-6 space-y-4">
                 <p className="text-xs font-semibold text-muted-foreground opacity-60">No credit card required • Free forever plan available</p>
              </div>
            </div>
          </Card>
        </div>
      </main>
      <Footer />
      <EnquiryForm 
        isOpen={isEnquiryOpen} 
        onClose={() => setIsEnquiryOpen(false)} 
      />
      <TemplateGallery 
        isOpen={isTemplatesOpen} 
        onClose={() => setIsTemplatesOpen(false)} 
      />
    </div>
  );
};

export default Listing;
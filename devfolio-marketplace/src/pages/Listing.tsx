import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Code, GitBranch, Zap, ShieldCheck, BarChart2, 
  Link as LinkIcon, Github, X, Download, Star, 
  ArrowRight, Globe, Layers, Sparkles, Rocket
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
    <Card className="rounded-[32px] overflow-hidden bg-secondary/5 border-border/50 hover:border-primary/30 transition-all duration-500 h-full flex flex-col group relative">
      <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity bg-primary/20 pointer-events-none" />
      
      <div className="h-52 bg-secondary/20 flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
        <Code className="w-16 h-16 text-primary/40 group-hover:scale-110 transition-transform duration-500" />
        <div className="absolute bottom-4 right-4 flex gap-2">
           {tech.slice(0, 2).map((t, i) => (
             <span key={i} className="text-[10px] font-black uppercase tracking-widest px-3 py-1.5 bg-background/80 backdrop-blur-md rounded-lg border border-border/50">{t}</span>
           ))}
        </div>
      </div>

      <div className="p-8 flex-1 flex flex-col space-y-4">
        <div>
          <h3 className="font-black text-xl tracking-tight text-foreground group-hover:text-primary transition-colors">{title}</h3>
          <p className="text-sm font-medium text-muted-foreground/80 line-clamp-2 mt-2 italic leading-relaxed">{description}</p>
        </div>

        <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mt-auto pt-4 border-t border-border/20">
          <span className="flex items-center gap-2">
            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            {stars} Stars
          </span>
          <span className="flex items-center gap-2">
            <Download className="w-3.5 h-3.5 text-primary" />
            {downloads} DLs
          </span>
        </div>

        <Button 
          onClick={handleDownload} 
          className="w-full h-14 rounded-2xl font-black text-xs uppercase tracking-widest bg-foreground text-background hover:scale-[1.02] transition-all shadow-xl disabled:opacity-50"
          disabled={isDownloading}
        >
          {isDownloading ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-background/30 border-t-background rounded-full animate-spin" />
              Ingesting...
            </div>
          ) : (
            <>
              <Download className="w-4 h-4 mr-2" />
              Deploy Engine
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
      <DialogContent className="sm:max-w-[500px] rounded-[40px] bg-background/95 backdrop-blur-2xl border-border/50 p-10 overflow-hidden relative">
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/5 blur-[80px] rounded-full" />
        
        <DialogHeader className="mb-8 space-y-4">
           <div className="flex items-center gap-2 text-primary">
              <Sparkles className="w-4 h-4" />
              <span className="text-xs font-black uppercase tracking-widest">Initialization Vector</span>
           </div>
           <DialogTitle className="text-4xl font-black tracking-tighter leading-tight text-foreground">
             Start Your <span className="text-primary italic">Trajectory.</span>
           </DialogTitle>
           <DialogDescription className="text-base font-medium text-muted-foreground italic leading-relaxed pt-2">
             Configure your parameters below. Our engineering node will synchronize with your request shortly.
           </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="name" className="text-[10px] font-black uppercase tracking-widest ml-1 text-muted-foreground">Entity Identifier (Name)</Label>
              <Input 
                id="name" 
                className="h-16 rounded-2xl bg-secondary/10 border-border/50 focus:border-primary/50 font-bold px-6" 
                value={formData.name}
                onChange={handleChange}
                placeholder="Ex. Elon T."
                required
              />
            </div>
            <div className="space-y-3">
              <Label htmlFor="phone" className="text-[10px] font-black uppercase tracking-widest ml-1 text-muted-foreground">Signal Coordinate (Phone)</Label>
              <Input 
                id="phone" 
                type="tel" 
                className="h-16 rounded-2xl bg-secondary/10 border-border/50 focus:border-primary/50 font-bold px-6" 
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 XXXXXXXXXX"
                required
              />
            </div>
          </div>
          
          <div className="flex gap-4 pt-4">
             <Button type="button" variant="ghost" onClick={onClose} className="h-16 flex-1 rounded-2xl font-black text-xs uppercase tracking-widest">
                Abort
             </Button>
             <Button type="submit" className="h-16 flex-[2] rounded-2xl font-black text-xs uppercase tracking-widest bg-primary text-primary-foreground shadow-2xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
                Authorize Transaction
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
      <DialogContent className="max-w-7xl rounded-[48px] bg-background border-border/50 p-12 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/2 blur-[100px] rounded-full" />
        
        <DialogHeader className="mb-12">
          <div className="flex items-center gap-3 mb-4">
             <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                <Layers className="w-5 h-5" />
             </div>
             <span className="text-xs font-black uppercase tracking-widest text-muted-foreground">Available Modules</span>
          </div>
          <DialogTitle className="text-5xl font-black tracking-tighter text-foreground leading-tight">
            The Engine <span className="text-primary italic">Gallery.</span>
          </DialogTitle>
          <DialogDescription className="text-lg font-medium text-muted-foreground italic leading-relaxed pt-2">
            Select a high-performance architectural module to initiate your showcase.
          </DialogDescription>
        </DialogHeader>

        <div className="max-h-[60vh] overflow-y-auto pr-6 custom-scrollbar pb-12">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 space-y-4">
              <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">Catalyzing Assets...</p>
            </div>
          ) : templates.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {templates.map((template) => (
                <TemplateCard key={template.id} {...template} onDownload={() => {}} />
              ))}
            </div>
          ) : (
            <div className="text-center py-24 bg-secondary/10 rounded-[40px] border border-border/50 border-dashed">
              <Rocket className="w-12 h-12 mx-auto mb-6 text-muted-foreground/30" />
              <h3 className="text-2xl font-black tracking-tight text-foreground/40 italic">Null Asset Detection.</h3>
              <p className="text-sm font-bold text-muted-foreground/60 mt-2 uppercase tracking-widest">Check Connection Vector</p>
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
    { icon: <Code className="w-6 h-6" />, title: "Logic Showcase", description: "Display high-fidelity modules with precision-tuned syntax highlighting." },
    { icon: <GitBranch className="w-6 h-6" />, title: "Vector Sync", description: "Synchronize with GitHub nodes directly to automate asset ingestion." },
    { icon: <Zap className="w-6 h-6" />, title: "Instant Velocity", description: "Edge-computed performance ensures near-zero latency worldwide." },
    { icon: <ShieldCheck className="w-6 h-6" />, title: "Custom Domain Root", description: "Establish your sovereign identity on your own namespace." },
    { icon: <BarChart2 className="w-6 h-6" />, title: "Telemetry Intel", description: "Deep-trace visitor interactions with high-fidelity analytics." },
    { icon: <LinkIcon className="w-6 h-6" />, title: "Proximity Deploy", description: "Single-signal deployment to our global content acceleration network." }
  ];

  const steps = [
    { number: "01", title: "Node Integration", description: "Synchronize your GitHub node to authorize automatic project discovery." },
    { number: "02", title: "Architect Profile", description: "Define your technical trajectory with custom parameters and identifiers." },
    { number: "03", title: "Global Sync", description: "Deploy your sovereign showcase to the world with absolute precision." }
  ];

  return (
    <div className="min-h-screen bg-background selection:bg-primary selection:text-primary-foreground">
      <SEO title="Portfolio Engine" description="The ultimate architectural engine for developer showcases and elite portfolios." />
      <Header />
      
      <main className="pt-32 pb-32 relative overflow-hidden">
        {/* Background Accents */}
        <div className="absolute top-0 right-0 -z-10 w-1/2 h-1/2 bg-primary/2 opacity-30 blur-[150px] rounded-full" />
        <div className="absolute bottom-0 left-0 -z-10 w-1/3 h-1/3 bg-secondary/5 opacity-20 blur-[120px] rounded-full" />
        
        <div className="container mx-auto px-6 max-w-[1400px]">
          {/* Hero Section */}
          <div className="text-center max-w-5xl mx-auto mb-32 relative">
            <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-secondary/10 border border-border/50 text-foreground mb-10 backdrop-blur-xl animate-fade-in">
               <Zap className="w-4 h-4 text-primary fill-primary/20" />
               <span className="text-[10px] font-black uppercase tracking-[0.3em]">Developer Architecture Engine</span>
            </div>
            
            <h1 className="text-7xl sm:text-8xl font-black tracking-tight mb-8 text-foreground leading-[0.9] animate-slide-up">
              Engineered <br /><span className="text-primary italic">Showcases.</span>
            </h1>
            <p className="text-xl sm:text-2xl font-bold text-muted-foreground/80 mb-14 max-w-3xl mx-auto italic leading-relaxed animate-slide-up delay-100">
              The high-performance platform for architects <span className="text-foreground">to deploy elite developer portfolios</span> with absolute precision.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center animate-slide-up delay-200">
              <Button 
                size="lg" 
                className="h-20 px-12 rounded-[24px] bg-primary text-primary-foreground text-lg font-black uppercase tracking-widest shadow-2xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all"
                onClick={() => setIsEnquiryOpen(true)}
              >
                Start Initialization
                <ArrowRight className="w-5 h-5 ml-3" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="h-20 px-12 rounded-[24px] border-border/50 bg-secondary/5 text-lg font-black uppercase tracking-widest hover:bg-secondary/10 transition-all gap-3"
                onClick={() => setIsTemplatesOpen(true)}
              >
                <Layers className="w-5 h-5" />
                View Modules
              </Button>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-20 mb-32 items-center">
            <div className="space-y-12">
              <div>
                <h2 className="text-5xl font-black tracking-tighter mb-6 text-foreground leading-tight">Elite Platform <br /><span className="text-primary italic">Capabilities.</span></h2>
                <p className="text-lg font-medium text-muted-foreground italic leading-relaxed">
                  Engineered specifically for technical architects to showcase high-fidelity logic modules in a premium environment.
                </p>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-6">
                {features.map((feature, index) => (
                  <div key={index} className="flex flex-col gap-4 p-8 rounded-[32px] bg-secondary/10 border border-border/50 hover:bg-secondary/20 transition-all duration-500 group relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-10 transition-opacity">
                       <Zap className="w-12 h-12 text-primary" />
                    </div>
                    <div className="p-3.5 rounded-2xl bg-secondary/50 text-primary w-fit shadow-inner group-hover:scale-110 transition-transform">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="font-black text-lg tracking-tight text-foreground mb-1">{feature.title}</h3>
                      <p className="text-sm font-medium text-muted-foreground leading-relaxed italic">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Card className="p-12 rounded-[48px] bg-foreground text-background border-none h-full relative overflow-hidden group shadow-2xl">
              <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-5 transition-opacity" />
              <div className="absolute -top-4 -right-4 w-64 h-64 bg-primary blur-[100px] opacity-10 rounded-full" />
              
              <div className="relative z-10 space-y-12">
                <div className="flex items-center gap-6">
                  <div className="p-5 bg-background/10 rounded-[24px] backdrop-blur-md border border-background/20">
                    <Github className="w-10 h-10 text-background" />
                  </div>
                  <div>
                    <h4 className="text-2xl font-black tracking-tight">Node Integration</h4>
                    <p className="text-sm font-bold opacity-60 uppercase tracking-widest mt-1">Automatic Asset Ingestion</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  {['React', 'Next.js', 'Vite', 'Node.js', 'GO', 'Rust'].map((tech) => (
                    <div key={tech} className="py-5 px-6 bg-background/5 rounded-2xl text-center font-black text-xs uppercase tracking-widest border border-background/10 hover:bg-background/10 transition-all">
                      {tech}
                    </div>
                  ))}
                </div>
                
                <div className="pt-8 border-t border-background/10 space-y-6">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40">Target Sectors:</h4>
                  <div className="flex flex-wrap gap-3">
                    {['Kernel Development', 'Cloud Architect', 'Logic Engineering', 'Sovereign UI'].map((role) => (
                      <span key={role} className="flex items-center gap-3 px-5 py-2.5 rounded-xl bg-background/10 border border-background/20 text-xs font-black uppercase tracking-widest">
                         <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                         {role}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <div className="mb-40 space-y-20">
            <h2 className="text-5xl font-black text-center text-foreground tracking-tighter">
              Deployment <span className="text-primary italic">Trajectory.</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-10">
              {steps.map((step, index) => (
                <Card key={index} className="p-12 rounded-[40px] bg-secondary/10 border-border/50 text-center relative group overflow-hidden">
                  <div className="absolute -top-12 -left-12 text-[160px] font-black text-primary/2 opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none select-none">
                     {step.number}
                  </div>
                  <div className="relative z-10">
                    <div className="text-[10px] font-black uppercase tracking-[0.5em] text-primary mb-6">Phase {step.number}</div>
                    <h3 className="text-3xl font-black mb-6 text-foreground tracking-tight">{step.title}</h3>
                    <p className="text-base font-medium text-muted-foreground italic leading-relaxed">{step.description}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div className="rounded-[48px] p-16 md:p-24 text-center bg-secondary/10 border border-border flex flex-col items-center justify-center relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-24 opacity-5 pointer-events-none group-hover:scale-110 transition-transform">
               <Globe className="w-64 h-64 text-primary" />
            </div>
            
            <div className="relative z-10 max-w-4xl mx-auto space-y-10">
              <h2 className="text-6xl md:text-7xl font-black text-foreground tracking-tighter leading-tight">
                Authorize Your <br /><span className="text-primary italic">Showcase Initialization.</span>
              </h2>
              <p className="text-xl md:text-2xl font-medium text-muted-foreground italic leading-relaxed max-w-2xl mx-auto">
                Join a specialized network of senior technical architects deploying sovereign developer identities.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center pt-6">
                <Button 
                   onClick={() => setIsEnquiryOpen(true)}
                   size="lg" 
                   className="h-20 px-16 rounded-2xl bg-foreground text-background text-lg font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-2xl"
                >
                  Authorize Node
                </Button>
                <Button size="lg" variant="outline" className="h-20 px-16 rounded-2xl border-border/50 bg-secondary/10 text-lg font-black uppercase tracking-widest hover:bg-secondary/20 transition-all" asChild>
                  <Link to="/explore">
                    Discover Network
                  </Link>
                </Button>
              </div>
              <p className="text-xs font-black uppercase tracking-[0.3em] text-muted-foreground opacity-40">No signal credentials required • 14-epoch trial active</p>
            </div>
          </div>
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
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
        <div className="space-y-3">
          <h3 className="font-black text-2xl tracking-tighter text-foreground group-hover:text-primary transition-colors italic uppercase">{title}</h3>
          <p className="text-sm font-bold text-muted-foreground/60 line-clamp-2 italic leading-relaxed tracking-tight">{description}</p>
        </div>

        <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground mt-auto pt-6 border-t border-border/20 italic">
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
          className="w-full h-16 rounded-[22px] font-black text-[10px] uppercase tracking-[0.3em] bg-foreground text-background hover:scale-[1.02] active:scale-95 transition-all shadow-2xl disabled:opacity-50 italic"
          disabled={isDownloading}
        >
          {isDownloading ? (
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 border-2 border-background/30 border-t-background rounded-full animate-spin" />
              Ingesting...
            </div>
          ) : (
            <>
              <Download className="w-5 h-5 mr-3" />
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
      <DialogContent className="sm:max-w-[550px] rounded-[56px] bg-background/95 backdrop-blur-3xl border-border/40 p-12 overflow-hidden relative shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)]">
        <div className="absolute -top-32 -right-32 w-64 h-64 bg-primary/10 blur-[100px] rounded-full animate-pulse" />
        
        <DialogHeader className="mb-10 space-y-6">
           <div className="flex items-center gap-3 text-primary">
              <Sparkles className="w-4 h-4 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.6em] italic">Initialization Vector</span>
           </div>
           <DialogTitle className="text-4xl md:text-5xl font-black tracking-tighter leading-[0.9] text-foreground italic uppercase">
             Start Your <span className="text-primary NOT-italic block">Trajectory.</span>
           </DialogTitle>
           <DialogDescription className="text-lg font-bold text-muted-foreground/60 italic leading-relaxed pt-2 tracking-tight">
             Configure your parameters below. Our engineering node will synchronize with your request shortly.
           </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-10">
          <div className="space-y-8">
            <div className="space-y-3">
              <Label htmlFor="name" className="text-[10px] font-black uppercase tracking-[0.4em] ml-4 text-muted-foreground italic">Entity Identifier (Name)</Label>
              <Input 
                id="name" 
                className="h-16 rounded-[22px] bg-secondary/10 border-border/40 focus:border-primary/50 focus:ring-primary/20 transition-all font-black text-xs uppercase tracking-widest px-8 placeholder:opacity-30" 
                value={formData.name}
                onChange={handleChange}
                placeholder="EX. ELON T."
                required
              />
            </div>
            <div className="space-y-3">
              <Label htmlFor="phone" className="text-[10px] font-black uppercase tracking-[0.4em] ml-4 text-muted-foreground italic">Signal Coordinate (Phone)</Label>
              <Input 
                id="phone" 
                type="tel" 
                className="h-16 rounded-[22px] bg-secondary/10 border-border/40 focus:border-primary/50 focus:ring-primary/20 transition-all font-black text-xs uppercase tracking-widest px-8 placeholder:opacity-30" 
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 XXXXXXXXXX"
                required
              />
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 pt-6">
             <Button type="button" variant="ghost" onClick={onClose} className="h-16 flex-1 rounded-[22px] font-black text-[10px] uppercase tracking-[0.3em] italic border-none">
                Abort
             </Button>
             <Button type="submit" className="h-16 flex-[2] rounded-[22px] font-black text-[10px] uppercase tracking-[0.3em] bg-primary text-primary-foreground shadow-2xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all italic border-none">
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
      <DialogContent className="max-w-[1400px] rounded-[64px] bg-background border-border/40 p-12 md:p-20 overflow-hidden relative shadow-[0_60px_120px_-30px_rgba(0,0,0,0.6)]">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-primary/5 blur-[150px] rounded-full animate-pulse" />
        
        <DialogHeader className="mb-16">
          <div className="flex items-center gap-4 mb-6">
             <div className="w-14 h-14 rounded-[18px] bg-primary/10 flex items-center justify-center text-primary shadow-inner italic font-black">
                <Layers className="w-6 h-6" />
             </div>
             <span className="text-[10px] font-black uppercase tracking-[0.6em] text-muted-foreground italic opacity-50">Available Modules Matrix</span>
          </div>
          <DialogTitle className="text-5xl md:text-7xl font-black tracking-tighter text-foreground leading-[0.85] italic uppercase">
            The Engine <span className="text-primary NOT-italic">Gallery.</span>
          </DialogTitle>
          <DialogDescription className="text-xl font-bold text-muted-foreground/60 italic leading-relaxed pt-4 tracking-tight max-w-2xl">
            Select a high-performance architectural module to initiate your sovereign showcase deployment sequence.
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
            <div className="text-center py-32 bg-secondary/10 rounded-[56px] border-2 border-border/20 border-dashed backdrop-blur-xl group">
              <Rocket className="w-20 h-20 mx-auto mb-8 text-muted-foreground/20 group-hover:scale-110 group-hover:rotate-12 transition-all duration-700" />
              <h3 className="text-4xl font-black tracking-tighter text-foreground/30 italic uppercase">Null Asset Detection.</h3>
              <p className="text-sm font-bold text-muted-foreground/40 mt-4 uppercase tracking-[0.4em] italic leading-none">Check connection vector integrity</p>
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
    { number: "01", title: "Node Integration", description: "Synchronize your GitHub node to authorize automatic project discovery." },
    { number: "02", title: "Architect Profile", description: "Define your technical trajectory with custom parameters and identifiers." },
    { number: "03", title: "Global Sync", description: "Deploy your sovereign showcase to the world with absolute precision." }
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
            <div className="inline-flex items-center gap-4 px-8 py-3.5 rounded-full bg-secondary/10 border border-border/40 text-foreground mb-12 backdrop-blur-3xl animate-fade-in shadow-xl">
               <Zap className="w-5 h-5 text-primary fill-primary/20 animate-pulse" />
               <span className="text-[10px] font-black uppercase tracking-[0.5em] italic">Developer Architecture Engine Alpha</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-10 text-foreground leading-[0.8] animate-slide-up uppercase italic">
              Engineered <br /><span className="text-primary NOT-italic">Showcases.</span>
            </h1>
            <p className="text-lg md:text-xl font-bold text-muted-foreground/60 mb-16 max-w-3xl mx-auto italic leading-relaxed animate-slide-up delay-100 tracking-tight">
              The high-performance platform for architects <span className="text-foreground">to deploy elite developer portfolios</span> with absolute technical precision.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-8 justify-center animate-slide-up delay-200">
              <Button 
                size="lg" 
                className="h-20 px-12 rounded-[28px] bg-primary text-primary-foreground text-xl font-black uppercase tracking-[0.2em] shadow-[0_30px_60px_-15px_rgba(var(--primary),0.4)] hover:scale-110 active:scale-95 transition-all italic border-none group"
                onClick={() => setIsEnquiryOpen(true)}
              >
                Start Initialization
                <ArrowRight className="w-6 h-6 ml-4 stroke-[4px] group-hover:translate-x-2 transition-transform" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="h-20 px-12 rounded-[28px] border-border/40 bg-secondary/10 text-xl font-black uppercase tracking-[0.2em] hover:bg-secondary/20 transition-all gap-4 italic border-none shadow-xl"
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
                <div className="flex items-center gap-4 text-primary italic font-black uppercase tracking-[0.4em] text-[10px]">
                   <Activity className="w-5 h-5 animate-pulse" />
                   System Capabilities
                </div>
                <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-8 text-foreground leading-[0.85] italic uppercase">Elite Platform <span className="text-primary NOT-italic">Capabilities.</span></h2>
                <p className="text-lg font-bold text-muted-foreground/60 italic leading-relaxed tracking-tight max-w-xl">
                  Engineered specifically for technical architects to showcase high-fidelity logic modules in a premium environment curated for impact.
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
                    <div className="space-y-3">
                      <h3 className="font-black text-2xl tracking-tighter text-foreground mb-1 italic uppercase leading-none">{feature.title}</h3>
                      <p className="text-sm font-bold text-muted-foreground/60 leading-relaxed italic tracking-tight">{feature.description}</p>
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
                  <div className="p-7 bg-background/10 rounded-[32px] backdrop-blur-3xl border border-background/20 shadow-2xl group-hover:rotate-6 transition-all duration-700">
                    <Github className="w-14 h-14 text-background" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-3xl font-black tracking-tighter italic uppercase">Node Integration</h4>
                    <p className="text-[10px] font-black opacity-40 uppercase tracking-[0.5em] italic">Automatic Asset Ingestion Alpha</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                  {['React', 'Next.js', 'Vite', 'Node.js', 'GO', 'Rust'].map((tech) => (
                    <div key={tech} className="py-7 px-8 bg-background/5 rounded-[22px] text-center font-black text-xs uppercase tracking-[0.3em] border border-background/10 hover:bg-background/20 hover:scale-105 transition-all italic backdrop-blur-sm cursor-pointer">
                      {tech}
                    </div>
                  ))}
                </div>
                
                <div className="pt-12 border-t border-background/10 space-y-8">
                  <div className="flex items-center gap-4 text-primary italic font-black uppercase tracking-[0.4em] text-[10px] opacity-40">
                     Target Sectors Node Matrix:
                  </div>
                  <div className="flex flex-wrap gap-4">
                    {['Kernel Development', 'Cloud Architect', 'Logic Engineering', 'Sovereign UI'].map((role) => (
                      <span key={role} className="flex items-center gap-4 px-6 py-3.5 rounded-[18px] bg-background/10 border border-background/20 text-[10px] font-black uppercase tracking-[0.3em] italic backdrop-blur-xl group/role hover:border-primary/40 transition-all cursor-pointer">
                         <div className="w-2.5 h-2.5 rounded-full bg-primary group-hover/role:animate-ping" />
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
               <div className="w-2 h-10 bg-primary rounded-full animate-pulse" />
               <h2 className="text-4xl md:text-6xl font-black text-foreground tracking-tighter italic uppercase leading-[0.85]">
                 Deployment <span className="text-primary NOT-italic">Trajectory.</span>
               </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-12">
              {steps.map((step, index) => (
                <Card key={index} className="p-16 rounded-[48px] bg-secondary/10 border-border/40 text-center relative group overflow-hidden shadow-2xl backdrop-blur-3xl min-h-[450px] flex flex-col justify-center">
                  <div className="absolute -top-16 -left-16 text-[240px] font-black text-primary/2 opacity-0 group-hover:opacity-100 transition-all duration-1000 pointer-events-none select-none italic">
                     {step.number}
                  </div>
                  <div className="relative z-10 space-y-8">
                    <div className="text-[10px] font-black uppercase tracking-[0.8em] text-primary italic shadow-sm">Phase {step.number} Protocol</div>
                    <h3 className="text-4xl font-black text-foreground tracking-tighter uppercase italic leading-[0.9]">{step.title}</h3>
                    <p className="text-xl font-bold text-muted-foreground/60 italic leading-relaxed tracking-tight">{step.description}</p>
                    <div className="pt-6">
                       <div className="w-16 h-1 bg-primary/10 rounded-full mx-auto group-hover:w-32 transition-all duration-700" />
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
              <div className="flex items-center justify-center gap-4 text-primary animate-pulse">
                 <Rocket className="w-8 h-8 fill-primary" />
                 <span className="text-[10px] font-black uppercase tracking-[0.6em] italic">Final Authorization Protocol</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-foreground tracking-tighter leading-[0.85] italic uppercase">
                Authorize Your <br /><span className="text-primary NOT-italic block">Showcase Initialization.</span>
              </h2>
              <p className="text-lg md:text-xl font-bold text-muted-foreground/60 italic leading-relaxed max-w-3xl mx-auto tracking-tight">
                Join a specialized network of senior technical architects deploying sovereign developer identities on the global creator protocol.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-8 justify-center pt-10">
                <Button 
                   onClick={() => setIsEnquiryOpen(true)}
                   size="lg" 
                   className="h-20 px-16 rounded-[28px] bg-foreground text-background text-xl font-black uppercase tracking-[0.2em] hover:scale-110 active:scale-95 transition-all shadow-2xl italic border-none"
                >
                  Authorize Node
                </Button>
                <Button size="lg" variant="outline" className="h-20 px-16 rounded-[28px] border-border/40 bg-secondary/10 text-xl font-black uppercase tracking-[0.2em] hover:bg-secondary/20 transition-all italic border-none shadow-xl" asChild>
                  <Link to="/explore">
                    Discover Network
                  </Link>
                </Button>
              </div>
              <div className="pt-8 space-y-4">
                 <p className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground opacity-30 italic">No signal credentials required • 14-epoch trial active protocol</p>
                 <div className="flex items-center justify-center gap-4 opacity-10">
                    <Fingerprint className="w-6 h-6" />
                    <Activity className="w-6 h-6" />
                    <Layers className="w-6 h-6" />
                 </div>
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
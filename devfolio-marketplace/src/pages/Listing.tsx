import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Code, GitBranch, Zap, ShieldCheck, BarChart2, Link as LinkIcon, Github, X, Download, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

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
      // Simulate download delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Call the onDownload callback
      await onDownload();
      // Show success message
      alert(`${title} template downloaded successfully!`);
    } catch (error) {
      console.error('Download failed:', error);
      alert('Failed to download template. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
      <div className="h-48 bg-muted/50 flex items-center justify-center">
        <Code className="w-16 h-16 text-muted-foreground" />
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-semibold text-lg mb-1">{title}</h3>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{description}</p>
        <div className="flex flex-wrap gap-2 mb-3">
          {tech.map((t, i) => (
            <span key={i} className="text-xs px-2 py-1 bg-muted rounded-full">{t}</span>
          ))}
        </div>
        <div className="flex justify-between items-center text-sm text-muted-foreground mt-auto">
          <span className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            {stars}
          </span>
          <span className="flex items-center gap-1">
            <Download className="w-4 h-4" />
            {downloads}
          </span>
        </div>
        <Button 
          onClick={handleDownload} 
          variant="outline" 
          className="w-full mt-3"
          disabled={isDownloading}
        >
          {isDownloading ? 'Downloading...' : 'Download Template'}
        </Button>
      </div>
    </Card>
  );
};

const EnquiryForm = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
    // Show success message or redirect
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <form onSubmit={handleSubmit}>
        <DialogContent className="sm:max-w-[450px]">
          <DialogHeader>
            <div className="flex justify-between items-center">
              <DialogTitle>Get Started</DialogTitle>
              <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0" type="button">
                <X className="h-4 w-4" />
              </Button>
            </div>
            <DialogDescription>
              Enter your details and we'll get back to you shortly.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input 
                id="name" 
                className="col-span-3" 
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">
                Phone
              </Label>
              <Input 
                id="phone" 
                type="tel" 
                className="col-span-3" 
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 XXXXXXXXXX"
                required
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose} type="button">
              Cancel
            </Button>
            <Button type="submit">Submit</Button>
          </div>
        </DialogContent>
      </form>
    </Dialog>
  );
};

const TemplateGallery = ({ isOpen, onClose }) => {
  const templates = [
    {
      id: 1,
      title: 'Minimal Portfolio',
      description: 'Clean and minimal portfolio template with focus on content',
      tech: ['React', 'Tailwind', 'Framer Motion'],
      stars: '1.2k',
      downloads: '5.4k',
      downloadUrl: '/templates/minimal-portfolio.zip'
    },
    {
      id: 2,
      title: 'Developer CV',
      description: 'Professional CV template for developers with project showcase',
      tech: ['Next.js', 'TypeScript', 'Shadcn'],
      stars: '2.1k',
      downloads: '8.7k',
      downloadUrl: '/templates/developer-cv.zip'
    },
    {
      id: 3,
      title: 'Creative Portfolio',
      description: 'Modern and creative portfolio with smooth animations',
      tech: ['React', 'GSAP', 'Three.js'],
      stars: '3.5k',
      downloads: '12.3k',
      downloadUrl: '/templates/creative-portfolio.zip'
    },
  ];

  const handleDownload = (template: any): void => {
    // In a real app, you would trigger the actual file download here
    console.log(`Initiating download for: ${template.title} (${template.downloadUrl})`);
    
    // Simulate download by creating a temporary link
    const link = document.createElement('a');
    link.href = template.downloadUrl;
    link.download = `${template.title.toLowerCase().replace(/\s+/g, '-')}.zip`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <DialogTitle>Choose a Template</DialogTitle>
            <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0">
              <X className="h-4 w-4" />
            </Button>
          </div>
          <DialogDescription>
            Select a template to get started with your portfolio
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-4">
          {templates.map((template) => (
            <TemplateCard
              key={template.id}
              {...template}
              onDownload={() => handleDownload(template)}
            />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

const Listing = () => {
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [isTemplatesOpen, setIsTemplatesOpen] = useState(false);
  const features = [
    {
      icon: <Code className="w-6 h-6" />,
      title: "Code Showcase",
      description: "Display your best projects with clean, syntax-highlighted code snippets"
    },
    {
      icon: <GitBranch className="w-6 h-6" />,
      title: "Git Integration",
      description: "Connect your GitHub to automatically sync your repositories"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Fast Loading",
      description: "Blazing fast performance to showcase your work without delays"
    },
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      title: "Custom Domains",
      description: "Use your own domain to build your personal brand"
    },
    {
      icon: <BarChart2 className="w-6 h-6" />,
      title: "Analytics",
      description: "Track visitors and get insights on your portfolio's performance"
    },
    {
      icon: <LinkIcon className="w-6 h-6" />,
      title: "One-Click Deploy",
      description: "Deploy your portfolio with a single click to our global CDN"
    }
  ];

  const steps = [
    {
      number: "01",
      title: "Sign Up & Connect GitHub",
      description: "Create your account and connect your GitHub to import your projects"
    },
    {
      number: "02",
      title: "Customize Your Profile",
      description: "Add your personal information, skills, and customize the look and feel"
    },
    {
      number: "03",
      title: "Deploy & Share",
      description: "Publish your portfolio with one click and share it with the world"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-5xl font-bold mb-6 text-foreground">
              Build Your Developer Portfolio
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Create a stunning portfolio to showcase your projects, skills, and experience to potential employers and clients
            </p>
            <div className="flex gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-foreground text-background hover:bg-foreground/90"
                onClick={() => setIsEnquiryOpen(true)}
              >
                Start Building Free
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => setIsTemplatesOpen(true)}
              >
                <Code className="w-4 h-4 mr-2" />
                View Templates
              </Button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-foreground">Why Choose devfolio-marketplace?</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Our platform is built specifically for developers to showcase their work in the best possible way.
              </p>
              <div className="grid grid-cols-1 gap-6">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="p-2 rounded-full bg-primary/10 text-primary">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{feature.title}</h3>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Card className="p-8 bg-gradient-to-br from-primary/10 to-secondary/10 border-none h-full">
              <h3 className="text-2xl font-bold mb-6 text-foreground">Trusted by developers at</h3>
              <div className="space-y-6">
                <div className="flex items-center gap-4 p-4 bg-background/50 rounded-lg">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Github className="w-6 h-6 text-foreground" />
                  </div>
                  <div>
                    <h4 className="font-semibold">GitHub Integration</h4>
                    <p className="text-sm text-muted-foreground">Automatically sync your repositories</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  {['React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'More...'].map((tech) => (
                    <div key={tech} className="p-3 bg-background/50 rounded-lg text-center font-medium">
                      {tech}
                    </div>
                  ))}
                </div>
                
                <div className="mt-6">
                  <h4 className="font-semibold mb-3">Perfect for:</h4>
                  <ul className="space-y-2">
                    {['Frontend Developers', 'Backend Engineers', 'Full-Stack Developers', 'Open Source Contributors', 'Tech Bloggers'].map((role) => (
                      <li key={role} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                        {role}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          </div>

          <div className="mb-16">
            <h2 className="text-4xl font-bold text-center mb-12 text-foreground">
              Get Started in 3 Simple Steps
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {steps.map((step, index) => (
                <Card key={index} className="p-8 bg-card border-border text-center">
                  <div className="text-6xl font-bold text-primary/20 mb-4">{step.number}</div>
                  <h3 className="text-2xl font-bold mb-4 text-foreground">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </Card>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-3xl p-12 text-center border">
            <h2 className="text-4xl font-bold mb-4 text-foreground">Ready to Build Your Portfolio?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto text-muted-foreground">
              Join thousands of developers who have already created their portfolios with devfolio-marketplace
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90">
                Get Started for Free
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/explore">
                  Explore Portfolios
                </Link>
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-4">No credit card required • 14-day free trial</p>
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

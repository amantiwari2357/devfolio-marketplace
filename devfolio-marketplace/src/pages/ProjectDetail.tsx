import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  ExternalLink, ArrowLeft, ShieldCheck, Zap, 
  Layers, Code, MonitorSmartphone, Activity, 
  Sparkles, Globe, Rocket, MessageSquare
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { enquiryAPI } from "@/services/auth";
import SEO from "@/components/layout/SEO";

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [submitError, setSubmitError] = useState(false);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await fetch(`https://devfolio-marketplace-1.onrender.com/api/projects/${id}`);
        if (response.ok) {
          const data = await response.json();
          setProject(data.project);
        } else {
          const staticProjects = [
            {
              _id: "1",
              title: "E-Commerce Platform",
              description: "Full-featured online store with payment integration",
              category: "E-Commerce",
              icon: "🛍️",
              pricing: "Paid",
              features: [
                "User authentication and authorization",
                "Product catalog with search and filters",
                "Shopping cart and checkout process",
                "Payment gateway integration",
                "Order management system",
                "Admin dashboard for inventory management"
              ],
              technologies: ["React", "Node.js", "MongoDB", "Stripe"],
              timeline: "4-6 weeks",
              priceRange: "$5,000 - $15,000",
              liveUrl: "https://example-ecommerce.com"
            },
            {
              _id: "2",
              title: "Social Media Dashboard",
              description: "Analytics and management for multiple platforms",
              category: "Business Tools",
              icon: "📊",
              pricing: "Freemium",
              features: [
                "Multi-platform analytics integration",
                "Real-time data visualization",
                "Scheduled posting system",
                "Engagement tracking and reporting",
                "Content calendar management",
                "Team collaboration tools"
              ],
              technologies: ["Vue.js", "Python", "PostgreSQL", "Chart.js"],
              timeline: "6-8 weeks",
              priceRange: "$8,000 - $20,000",
              liveUrl: "https://example-dashboard.com"
            },
            {
              _id: "3",
              title: "Learning Management System",
              description: "Complete LMS with courses and assessments",
              category: "Education",
              icon: "📚",
              pricing: "Paid",
              features: [
                "Course creation and management",
                "Student enrollment and progress tracking",
                "Interactive quizzes and assessments",
                "Video streaming and multimedia support",
                "Discussion forums and messaging",
                "Certificate generation"
              ],
              technologies: ["Angular", "Django", "MySQL", "AWS"],
              timeline: "8-12 weeks",
              priceRange: "$10,000 - $25,000",
              liveUrl: "https://example-lms.com"
            },
            {
              _id: "4",
              title: "Task Management App",
              description: "Collaborative task tracking and team management",
              category: "Productivity",
              icon: "✅",
              pricing: "Free",
              features: [
                "Task creation and assignment",
                "Project timeline and milestones",
                "Team collaboration features",
                "Time tracking and reporting",
                "File sharing and attachments",
                "Mobile app support"
              ],
              technologies: ["React Native", "Firebase", "Redux"],
              timeline: "3-5 weeks",
              priceRange: "$2,000 - $8,000",
              liveUrl: "https://example-tasks.com"
            },
            {
              _id: "5",
              title: "Restaurant Booking",
              description: "Table reservation system with real-time availability",
              category: "Hospitality",
              icon: "🍽️",
              pricing: "Paid",
              features: [
                "Real-time table availability",
                "Online reservation system",
                "Menu management",
                "Customer reviews and ratings",
                "Staff scheduling",
                "Payment processing"
              ],
              technologies: ["Next.js", "Express", "MongoDB", "Stripe"],
              timeline: "5-7 weeks",
              priceRange: "$6,000 - $18,000",
              liveUrl: "https://example-restaurant.com"
            },
            {
              _id: "6",
              title: "Fitness Tracker",
              description: "Workout logging and progress tracking",
              category: "Health",
              icon: "💪",
              pricing: "Freemium",
              features: [
                "Workout logging and tracking",
                "Progress visualization",
                "Goal setting and achievements",
                "Nutrition tracking",
                "Social sharing features",
                "Wearable device integration"
              ],
              technologies: ["Flutter", "Firebase", "Google Fit API"],
              timeline: "4-6 weeks",
              priceRange: "$4,000 - $12,000",
              liveUrl: "https://example-fitness.com"
            },
            {
              _id: "7",
              title: "Real Estate Portal",
              description: "Property listings with advanced search filters",
              category: "Real Estate",
              icon: "🏠",
              pricing: "Paid",
              features: [
                "Property listing management",
                "Advanced search and filters",
                "Virtual tours and photo galleries",
                "Agent profiles and reviews",
                "Mortgage calculator",
                "Lead generation tools"
              ],
              technologies: ["React", "Laravel", "MySQL", "Google Maps API"],
              timeline: "7-10 weeks",
              priceRange: "$8,000 - $22,000",
              liveUrl: "https://example-realestate.com"
            },
            {
              _id: "8",
              title: "Job Board Platform",
              description: "Connect employers with job seekers",
              category: "Recruitment",
              icon: "💼",
              pricing: "Freemium",
              features: [
                "Job posting and application system",
                "Resume database and search",
                "Company profiles",
                "Advanced filtering options",
                "Email notifications",
                "Analytics dashboard"
              ],
              technologies: ["Vue.js", "Node.js", "Elasticsearch", "MongoDB"],
              timeline: "6-9 weeks",
              priceRange: "$7,000 - $19,000",
              liveUrl: "https://example-jobs.com"
            }
          ];

          const foundProject = staticProjects.find(p => p._id === id);
          if (foundProject) {
            setProject(foundProject);
          } else {
            throw new Error('Project not found');
          }
        }
      } catch (error) {
        console.error('Error fetching project:', error);
        toast({
          title: "Error",
          description: "Failed to load project details.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProject();
    }
  }, [id, toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(false);
    try {
      const response = await enquiryAPI.createEnquiry({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        source: 'project-detail'
      });

      if (response.data.success) {
        toast({
          title: "Enquiry Submitted!",
          description: "We'll get back to you within 24 hours.",
        });
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        throw new Error(response.data.message || 'Failed to submit enquiry');
      }
    } catch (error) {
      console.error('Error submitting enquiry:', error);
      setSubmitError(true);
      toast({
        title: "Relay Failed",
        description: "Standard terminal submission failed. Fallback enabled.",
        variant: "destructive",
      });
    }
  };

  const getMailtoLink = () => {
    const subject = encodeURIComponent(`Enquiry for ${project?.title}`);
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\n\nMessage:\n${formData.message}`);
    return `mailto:devfoliomarketplace@gmail.com?subject=${subject}&body=${body}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center space-y-6">
        <div className="w-16 h-16 rounded-[22px] bg-primary/10 flex items-center justify-center text-primary animate-pulse shadow-sm">
          <Activity className="w-8 h-8" />
        </div>
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground animate-pulse">Loading Project...</p>
      </div>
    );
  }

  if (!project) {
     return (
       <div className="min-h-screen bg-background flex items-center justify-center">
         <div className="text-center space-y-6">
            <Layers className="w-16 h-16 mx-auto text-muted-foreground/30" />
            <h3 className="text-3xl font-bold tracking-tight text-foreground/60">Project Not Found.</h3>
            <Button onClick={() => navigate('/listing')} variant="outline" className="rounded-xl font-bold text-sm">Return to Directory</Button>
         </div>
       </div>
     );
  }

  return (
    <div className="min-h-screen bg-background selection:bg-primary selection:text-primary-foreground">
      <SEO title={`${project.title} | Showcase`} description={project.description} />
      <Header />
      
      <main className="pt-32 pb-32 relative overflow-hidden">
        {/* Background Accents */}
        <div className="absolute top-0 right-0 -z-10 w-1/2 h-1/2 bg-primary/2 opacity-30 blur-[150px] rounded-full" />
        <div className="absolute bottom-0 left-0 -z-10 w-1/3 h-1/3 bg-secondary/5 opacity-20 blur-[120px] rounded-full" />
        
        <div className="container mx-auto px-6 max-w-[1400px]">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-12 group h-12 px-6 rounded-2xl bg-secondary/10 hover:bg-secondary/20 transition-all font-black text-xs uppercase tracking-widest gap-3"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Directory
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            {/* Project Overview */}
            <div className="lg:col-span-2 space-y-12">
              <header className="space-y-6">
                <div className="flex items-center gap-4">
                   <div className="px-4 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-bold shadow-sm border border-primary/20">
                      {project.category}
                   </div>
                   <div className="text-xs font-semibold text-muted-foreground flex items-center gap-2 shadow-sm">
                      <ShieldCheck className="w-4 h-4 text-primary" />
                      Verified Project
                   </div>
                </div>
                
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                  <div className="space-y-4">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-tight">
                       {project.title}
                    </h1>
                    <p className="text-base md:text-lg font-medium text-muted-foreground leading-relaxed max-w-2xl">
                      {project.description}
                    </p>
                  </div>
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-secondary/10 border border-border/40 flex items-center justify-center text-4xl shadow-sm shrink-0">
                    {project.icon}
                  </div>
                </div>
              </header>

              <Card className="p-10 rounded-[40px] bg-secondary/10 border-border/50 relative overflow-hidden group">
                 <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none group-hover:scale-110 transition-transform">
                    <Layers className="w-32 h-32 text-primary" />
                 </div>
                 
                 <div className="space-y-10 relative z-10">
                   <div>
                     <h3 className="text-lg font-black tracking-tight text-foreground mb-6 flex items-center gap-3">
                        <Activity className="w-6 h-6 text-primary" />
                        Integrated Features
                     </h3>
                     <div className="grid sm:grid-cols-2 gap-4">
                       {project.features?.map((feature: string, index: number) => (
                         <div key={index} className="flex items-start gap-4 p-5 rounded-2xl bg-background/50 border border-border/20 group/item hover:border-primary/20 transition-all">
                           <div className="w-8 h-8 rounded-lg bg-secondary/50 flex items-center justify-center text-primary shrink-0 group-item:scale-110 transition-transform">
                              <Zap className="w-4 h-4" />
                           </div>
                           <span className="text-sm font-bold text-muted-foreground/80 leading-relaxed italic">{feature}</span>
                         </div>
                       ))}
                     </div>
                   </div>

                   <div className="grid md:grid-cols-2 gap-10">
                     <div className="space-y-6">
                        <h3 className="text-base font-black tracking-tight text-foreground flex items-center gap-3">
                           <Code className="w-5 h-5 text-primary" />
                           Logic Stack
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies?.map((tech: string, index: number) => (
                            <div key={index} className="px-5 py-2.5 rounded-xl bg-background shadow-inner border border-border/20 text-[10px] font-black uppercase tracking-widest hover:border-primary/30 transition-all">
                               {tech}
                            </div>
                          ))}
                        </div>
                     </div>

                     <div className="space-y-6">
                        <h3 className="text-base font-black tracking-tight text-foreground flex items-center gap-3">
                           <MonitorSmartphone className="w-5 h-5 text-primary" />
                           Performance Vector
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="p-4 rounded-xl bg-background/30 border border-border/20">
                            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Timeline</p>
                            <p className="text-sm font-bold">{project.timeline || 'N/A'}</p>
                          </div>
                          <div className="p-4 rounded-xl bg-background/30 border border-border/20">
                            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Bracket</p>
                            <p className="text-sm font-bold">{project.priceRange || 'N/A'}</p>
                          </div>
                        </div>
                     </div>
                   </div>

                   <Button
                     className="w-full h-20 rounded-[28px] bg-foreground text-background text-sm font-black uppercase tracking-widest shadow-2xl hover:scale-[1.02] active:scale-95 transition-all gap-4 flex items-center justify-center border-none"
                     onClick={() => window.open(project.liveUrl, "_blank")}
                   >
                     <ExternalLink className="w-6 h-6" />
                     Initialize Live Demo
                     <div className="h-2 w-2 rounded-full bg-primary animate-pulse ml-2" />
                   </Button>
                 </div>
              </Card>
            </div>

            {/* Enquiry Form */}
            <aside className="lg:col-span-1">
              <Card className="sticky top-32 p-8 rounded-[40px] bg-secondary/10 border-border/50 backdrop-blur-2xl relative overflow-hidden group">
                <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary/5 blur-[40px] rounded-full" />
                
                <header className="mb-10 text-center">
                   <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mx-auto mb-6 transform group-hover:rotate-12 transition-transform">
                      <MessageSquare className="w-7 h-7" />
                   </div>
                   <h2 className="text-xl font-black tracking-tighter text-foreground mb-3">Request Node</h2>
                   <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest italic opacity-70">
                      Configure your integration
                   </p>
                </header>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2.5">
                    <Label htmlFor="name" className="text-[10px] font-black uppercase tracking-widest ml-1 opacity-60">Architect Name</Label>
                    <Input
                      id="name"
                      placeholder="Elon T."
                      className="h-14 rounded-2xl bg-background border-border/50 focus:border-primary/50 font-bold px-5"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2.5">
                    <Label htmlFor="email" className="text-[10px] font-black uppercase tracking-widest ml-1 opacity-60">Signal Node (Email)</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="SUPPORT@DEVFOLIOMARKETPLACE.COM"
                      className="h-14 rounded-2xl bg-background border-border/50 focus:border-primary/50 font-bold px-5"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2.5">
                    <Label htmlFor="phone" className="text-[10px] font-black uppercase tracking-widest ml-1 opacity-60">Coordinate (Phone)</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+91 (555) 000-0000"
                      className="h-14 rounded-2xl bg-background border-border/50 focus:border-primary/50 font-bold px-5"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2.5">
                    <Label htmlFor="message" className="text-[10px] font-black uppercase tracking-widest ml-1 opacity-60">Protocol Brief</Label>
                    <Textarea
                      id="message"
                      placeholder="Define your requirements..."
                      className="rounded-2xl bg-background border-border/50 focus:border-primary/50 font-medium p-5 min-h-[120px]"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                    />
                  </div>

                   {submitError && (
                    <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-[10px] font-black uppercase tracking-widest italic animate-shake">
                      <p className="mb-3">Transmition failed. Secure relay node unreachable.</p>
                      <Button 
                        type="button"
                        variant="outline" 
                        className="w-full border-destructive/50 hover:bg-destructive hover:text-white transition-all h-12"
                        onClick={() => window.location.href = getMailtoLink()}
                      >
                        Mail Us Instead
                      </Button>
                    </div>
                  )}

                  <Button type="submit" className="w-full h-16 rounded-2xl bg-primary text-primary-foreground font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
                    Authorize Request
                  </Button>
                </form>
                
                <div className="mt-8 pt-6 border-t border-border/20 flex items-center justify-center gap-3">
                   <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                   <p className="text-[10px] font-black uppercase tracking-widest opacity-40 italic">Global Sync Active</p>
                </div>
              </Card>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProjectDetail;

import { useState, useEffect } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Edit, Trash2, FolderKanban, Calendar, ExternalLink, Loader2 } from "lucide-react";

interface Project {
  _id: string;
  title: string;
  description: string;
  category: string;
  icon: string;
  pricing: string;
  features: string[];
  technologies: string[];
  timeline: string;
  priceRange: string;
  liveUrl: string;
}

const ProjectsManagement = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    icon: "",
    pricing: "Paid",
    features: [] as string[],
    technologies: [] as string[],
    timeline: "",
    priceRange: "",
    liveUrl: "",
  });

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('https://devfolio-marketplace-1.onrender.com/api/projects/all');
        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }
        const data = await response.json();
        setProjects(data.projects || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch projects');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please login first');
        return;
      }

      const url = editingProject
        ? `https://devfolio-marketplace-1.onrender.com/api/projects/${editingProject._id}`
        : 'https://devfolio-marketplace-1.onrender.com/api/projects';

      const method = editingProject ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to save project');
      }

      const data = await response.json();

      if (editingProject) {
        setProjects(projects.map(p =>
          p._id === editingProject._id ? data.project : p
        ));
      } else {
        setProjects([...projects, data.project]);
      }

      setIsOpen(false);
      setEditingProject(null);
      setFormData({
        title: "",
        description: "",
        category: "",
        icon: "",
        pricing: "Paid",
        features: [],
        technologies: [],
        timeline: "",
        priceRange: "",
        liveUrl: "",
      });
    } catch (err) {
      console.error('Error saving project:', err);
      alert('Failed to save project');
    }
  };

  const handleDelete = async (projectId: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please login first');
        return;
      }

      const response = await fetch(
        `https://devfolio-marketplace-1.onrender.com/api/projects/${projectId}`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to delete project');
      }

      setProjects(projects.filter(p => p._id !== projectId));
    } catch (err) {
      console.error('Error deleting project:', err);
      alert('Failed to delete project');
    }
  };

  const handleSeedProjects = async () => {
    const initialProjects = [
      {
        title: "Nexus Commerce",
        description: "Enterprise-grade e-commerce platform with real-time inventory management and advanced analytics. Built for scale and high performance.",
        category: "Web App",
        icon: "🛍️",
        pricing: "Paid",
        features: ["Real-time Inventory", "AI Recommendations", "Multi-currency Support"],
        technologies: ["Next.js", "TypeScript", "Prisma"],
        timeline: "4-6 Months",
        priceRange: "$15k - $45k",
        liveUrl: "https://nexus-commerce.vercel.app"
      },
      {
        title: "Titan CRM",
        description: "Comprehensive customer relationship management system featuring sales pipeline automation and deep communication integration.",
        category: "SaaS",
        icon: "🤝",
        pricing: "Paid",
        features: ["Automated Pipeline", "Lead Scoring", "Email Sync"],
        technologies: ["React", "Node.js", "MongoDB"],
        timeline: "3-5 Months",
        priceRange: "$20k - $60k",
        liveUrl: "https://titan-crm.onrender.com"
      },
      {
        title: "Aether Analytics",
        description: "Privacy-focused web analytics platform providing deep insights without compromising personal data. Real-time visitor tracking.",
        category: "Web Platform",
        icon: "📊",
        pricing: "Free",
        features: ["Privacy-First", "Custom Reports", "Real-time Tracking"],
        technologies: ["Vue.js", "Tailwind", "Docker"],
        timeline: "2-4 Months",
        priceRange: "Free / OSS",
        liveUrl: "https://aether-analytics.io"
      }
    ];

    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Please login first');

      const promises = initialProjects.map(project => 
        fetch('https://devfolio-marketplace-1.onrender.com/api/projects', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(project),
        }).then(res => res.json())
      );

      const results = await Promise.all(promises);
      const newProjects = results.map(r => r.project);
      setProjects([...projects, ...newProjects]);
      alert('Seeding successful! Initial projects integrated.');
    } catch (err) {
      console.error('Error seeding projects:', err);
      alert('Failed to seed projects');
    } finally {
      setLoading(false);
    }
  };

  const openEditDialog = (project: Project) => {
    setEditingProject(project);
    setFormData(project);
    setIsOpen(true);
  };

  const openAddDialog = () => {
    setEditingProject(null);
    setFormData({
      title: "",
      description: "",
      category: "",
      icon: "",
      pricing: "Paid",
      features: [],
      technologies: [],
      timeline: "",
      priceRange: "",
      liveUrl: "",
    });
    setIsOpen(true);
  };

  const addFeature = () => {
    setFormData({ ...formData, features: [...formData.features, ""] });
  };

  const updateFeature = (index: number, value: string) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData({ ...formData, features: newFeatures });
  };

  const removeFeature = (index: number) => {
    setFormData({ ...formData, features: formData.features.filter((_, i) => i !== index) });
  };

  const addTechnology = () => {
    setFormData({ ...formData, technologies: [...formData.technologies, ""] });
  };

  const updateTechnology = (index: number, value: string) => {
    const newTechnologies = [...formData.technologies];
    newTechnologies[index] = value;
    setFormData({ ...formData, technologies: newTechnologies });
  };

  const removeTechnology = (index: number) => {
    setFormData({ ...formData, technologies: formData.technologies.filter((_, i) => i !== index) });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex overflow-hidden">
        <div className={`fixed inset-y-0 left-0 z-30 w-64 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-200 ease-in-out md:translate-x-0`}>
          <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        </div>
        <div className="flex-1 flex flex-col h-screen overflow-hidden md:pl-64">
          <header className="fixed top-0 right-0 left-0 z-20 bg-background border-b md:left-64">
            <DashboardHeader onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
          </header>
          <main className="flex-1 pt-24 pb-6 px-6 flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin" />
            <span className="ml-2">Loading projects...</span>
          </main>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex overflow-hidden">
        <div className={`fixed inset-y-0 left-0 z-30 w-64 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-200 ease-in-out md:translate-x-0`}>
          <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        </div>
        <div className="flex-1 flex flex-col h-screen overflow-hidden md:pl-64">
          <header className="fixed top-0 right-0 left-0 z-20 bg-background border-b md:left-64">
            <DashboardHeader onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
          </header>
          <main className="flex-1 pt-24 pb-6 px-6 flex items-center justify-center">
            <div className="text-red-500">Error: {error}</div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex overflow-hidden">
      {/* Fixed Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-30 w-64 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-200 ease-in-out md:translate-x-0`}>
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden md:pl-64">
        {/* Fixed Header */}
        <header className="fixed top-0 right-0 left-0 z-20 bg-background border-b md:left-64">
          <DashboardHeader onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        </header>
        
        {/* Scrollable Content */}
        <main className="flex-1 pt-24 pb-6 px-4 md:px-6 overflow-y-auto">
          <div className="max-w-7xl mx-auto space-y-8 md:space-y-10">
            <div className="flex justify-end gap-3">
              <Button 
                variant="outline" 
                onClick={handleSeedProjects} 
                className="h-10 px-6 rounded-xl border-border/50 font-bold text-[10px] uppercase tracking-widest gap-2 bg-primary/5 hover:bg-primary/10 transition-colors"
                disabled={loading}
              >
                <FolderKanban className="h-4 w-4" />
                Seed Initial Registry
              </Button>
              <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                  <Button onClick={openAddDialog} className="h-10 px-6 rounded-xl border-border/50 font-bold text-[10px] uppercase tracking-widest gap-2">
                    <Plus className="h-4 w-4" />
                    Initialize Project
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-black uppercase tracking-tighter italic">
                            {editingProject ? 'Modify Sequence' : 'Initialize New Project'}
                        </DialogTitle>
                    </DialogHeader>

                    <form onSubmit={handleSubmit} className="space-y-6 pt-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label className="text-[10px] font-black uppercase tracking-widest italic">Project Title *</Label>
                                <Input 
                                    value={formData.title} 
                                    onChange={e => setFormData({...formData, title: e.target.value})}
                                    placeholder="e.g. Nexus E-Commerce"
                                    required
                                    className="h-11 rounded-lg"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-[10px] font-black uppercase tracking-widest italic">Category *</Label>
                                <Input 
                                    value={formData.category} 
                                    onChange={e => setFormData({...formData, category: e.target.value})}
                                    placeholder="e.g. Web App"
                                    required
                                    className="h-11 rounded-lg"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase tracking-widest italic">Description *</Label>
                            <Textarea 
                                value={formData.description} 
                                onChange={e => setFormData({...formData, description: e.target.value})}
                                placeholder="Describe the technical scope and impact..."
                                className="min-h-[100px] rounded-lg"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <Label className="text-[10px] font-black uppercase tracking-widest italic">Icon (Emoji)</Label>
                                <Input 
                                    value={formData.icon} 
                                    onChange={e => setFormData({...formData, icon: e.target.value})}
                                    placeholder="🛍️"
                                    className="h-11 rounded-lg"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-[10px] font-black uppercase tracking-widest italic">Pricing Model</Label>
                                <Input 
                                    value={formData.pricing} 
                                    onChange={e => setFormData({...formData, pricing: e.target.value})}
                                    placeholder="Paid / Free"
                                    className="h-11 rounded-lg"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-[10px] font-black uppercase tracking-widest italic">Timeline</Label>
                                <Input 
                                    value={formData.timeline} 
                                    onChange={e => setFormData({...formData, timeline: e.target.value})}
                                    placeholder="3-5 Months"
                                    className="h-11 rounded-lg"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label className="text-[10px] font-black uppercase tracking-widest italic">Price Range</Label>
                                <Input 
                                    value={formData.priceRange} 
                                    onChange={e => setFormData({...formData, priceRange: e.target.value})}
                                    placeholder="$5k - $10k"
                                    className="h-11 rounded-lg"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-[10px] font-black uppercase tracking-widest italic">Live URL</Label>
                                <Input 
                                    value={formData.liveUrl} 
                                    onChange={e => setFormData({...formData, liveUrl: e.target.value})}
                                    placeholder="https://example.com"
                                    className="h-11 rounded-lg"
                                />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <Label className="text-[10px] font-black uppercase tracking-widest italic">Core Features</Label>
                                <Button type="button" variant="outline" size="sm" onClick={addFeature} className="h-8 text-[9px] uppercase font-black">Add Feature</Button>
                            </div>
                            <div className="grid gap-2">
                                {formData.features.map((feature, index) => (
                                    <div key={index} className="flex gap-2">
                                        <Input 
                                            value={feature} 
                                            onChange={e => updateFeature(index, e.target.value)}
                                            placeholder={`Feature ${index + 1}`}
                                            className="h-10 text-xs"
                                        />
                                        <Button type="button" variant="ghost" size="icon" onClick={() => removeFeature(index)} className="text-destructive h-10 w-10 shrink-0">
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <Label className="text-[10px] font-black uppercase tracking-widest italic">Tech Stack</Label>
                                <Button type="button" variant="outline" size="sm" onClick={addTechnology} className="h-8 text-[9px] uppercase font-black">Add Tech</Button>
                            </div>
                            <div className="grid gap-2">
                                {formData.technologies.map((tech, index) => (
                                    <div key={index} className="flex gap-2">
                                        <Input 
                                            value={tech} 
                                            onChange={e => updateTechnology(index, e.target.value)}
                                            placeholder={`Tech ${index + 1}`}
                                            className="h-10 text-xs"
                                        />
                                        <Button type="button" variant="ghost" size="icon" onClick={() => removeTechnology(index)} className="text-destructive h-10 w-10 shrink-0">
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex gap-3 pt-6">
                            <Button type="submit" className="flex-1 h-12 rounded-xl font-black uppercase italic tracking-widest text-xs">
                                {editingProject ? 'Commit Changes' : 'Initialize Project'}
                            </Button>
                            <Button type="button" variant="ghost" onClick={() => setIsOpen(false)} className="px-8 h-12 font-black uppercase italic tracking-widest text-xs">
                                Abort
                            </Button>
                        </div>
                    </form>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              <Card className="border-border/50 shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-4 md:px-6">
                  <CardTitle className="text-[10px] md:text-xs font-black uppercase tracking-widest text-muted-foreground italic">Metric / Total</CardTitle>
                  <FolderKanban className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent className="px-4 md:px-6 pb-4">
                  <div className="text-xl md:text-3xl font-black tracking-tighter text-foreground italic">P_{projects.length}</div>
                  <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-tighter mt-1">Repository Nodes</p>
                </CardContent>
              </Card>

              <Card className="border-border/50 shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-4 md:px-6">
                  <CardTitle className="text-[10px] md:text-xs font-black uppercase tracking-widest text-muted-foreground italic">Status / Open</CardTitle>
                  <Calendar className="h-4 w-4 text-chart-2" />
                </CardHeader>
                <CardContent className="px-4 md:px-6 pb-4">
                  <div className="text-xl md:text-3xl font-black tracking-tighter text-chart-2 italic">
                    {projects.filter(p => p.pricing === "Free").length}
                  </div>
                  <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-tighter mt-1">Free Tier Signals</p>
                </CardContent>
              </Card>

              <Card className="col-span-2 lg:col-span-1 border-border/50 shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-4 md:px-6">
                  <CardTitle className="text-[10px] md:text-xs font-black uppercase tracking-widest text-muted-foreground italic">Value / Elite</CardTitle>
                  <FolderKanban className="h-4 w-4 text-chart-1" />
                </CardHeader>
                <CardContent className="px-4 md:px-6 pb-4">
                  <div className="text-xl md:text-3xl font-black tracking-tighter text-chart-1 italic">
                    {projects.filter(p => p.pricing === "Paid").length}
                  </div>
                  <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-tighter mt-1">Paid Protocol Nodes</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <Card key={project._id} className="hover:shadow-lg transition-all border-border/50 group overflow-hidden bg-background/50">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-2xl">
                          {project.icon}
                        </div>
                        <div>
                          <CardTitle className="text-sm">{project.title}</CardTitle>
                          <Badge variant="outline" className="mt-1">{project.category}</Badge>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openEditDialog(project)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                          onClick={() => handleDelete(project._id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">{project.description}</p>

                    <div>
                      <h4 className="text-sm font-semibold mb-2">Key Features</h4>
                      <ul className="space-y-1">
                        {project.features?.slice(0, 3).map((feature: string, index: number) => (
                          <li key={index} className="flex items-start text-xs">
                            <span className="text-primary mr-1">✓</span>
                            <span className="text-muted-foreground">{feature}</span>
                          </li>
                        ))}
                        {project.features && project.features.length > 3 && (
                          <li className="text-xs text-muted-foreground">
                            +{project.features.length - 3} more features
                          </li>
                        )}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold mb-2">Technologies</h4>
                      <div className="flex flex-wrap gap-1">
                        {project.technologies?.slice(0, 4).map((tech: string, index: number) => (
                          <Badge key={index} variant="secondary" className="text-xs">{tech}</Badge>
                        ))}
                        {project.technologies && project.technologies.length > 4 && (
                          <Badge variant="secondary" className="text-xs">
                            +{project.technologies.length - 4}
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="font-semibold">Timeline:</span>
                        <p className="text-muted-foreground">{project.timeline || 'N/A'}</p>
                      </div>
                      <div>
                        <span className="font-semibold">Price:</span>
                        <p className="text-muted-foreground">{project.priceRange || 'N/A'}</p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Badge
                        variant={
                          project.pricing === "Free"
                            ? "default"
                            : project.pricing === "Freemium"
                            ? "secondary"
                            : "outline"
                        }
                        className="flex-1 justify-center"
                      >
                        {project.pricing}
                      </Badge>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(project.liveUrl, "_blank")}
                        disabled={!project.liveUrl}
                      >
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProjectsManagement;

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
import { Plus, Edit, FolderKanban, Calendar, ExternalLink, Loader2 } from "lucide-react";

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
        const response = await fetch('http://localhost:5000/api/projects/all');
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
        ? `http://localhost:5000/api/projects/${editingProject._id}`
        : 'http://localhost:5000/api/projects';

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
      <div className="min-h-screen bg-background flex">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="flex-1 flex flex-col">
          <DashboardHeader onMenuClick={() => setSidebarOpen(true)} />
          <main className="flex-1 p-6 flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin" />
            <span className="ml-2">Loading projects...</span>
          </main>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="flex-1 flex flex-col">
          <DashboardHeader onMenuClick={() => setSidebarOpen(true)} />
          <main className="flex-1 p-6 flex items-center justify-center">
            <div className="text-red-500">Error: {error}</div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col">
        <DashboardHeader onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Projects Management</h1>
                <p className="text-muted-foreground">Create and manage your projects</p>
              </div>
              <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                  <Button onClick={openAddDialog}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Project
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>{editingProject ? "Edit Project" : "Add New Project"}</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="title">Project Title</Label>
                        <Input
                          id="title"
                          value={formData.title}
                          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Input
                          id="category"
                          value={formData.category}
                          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="icon">Icon (emoji)</Label>
                        <Input
                          id="icon"
                          value={formData.icon}
                          onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                          placeholder="🛍️"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="pricing">Pricing</Label>
                        <select
                          id="pricing"
                          value={formData.pricing}
                          onChange={(e) => setFormData({ ...formData, pricing: e.target.value })}
                          className="w-full px-3 py-2 rounded-md border border-input bg-background"
                        >
                          <option value="Free">Free</option>
                          <option value="Freemium">Freemium</option>
                          <option value="Paid">Paid</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Features</Label>
                      {formData.features.map((feature, index) => (
                        <div key={index} className="flex gap-2">
                          <Input
                            value={feature}
                            onChange={(e) => updateFeature(index, e.target.value)}
                            placeholder="Enter feature"
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={() => removeFeature(index)}
                          >
                            ×
                          </Button>
                        </div>
                      ))}
                      <Button type="button" variant="outline" onClick={addFeature}>
                        Add Feature
                      </Button>
                    </div>

                    <div className="space-y-2">
                      <Label>Technologies</Label>
                      {formData.technologies.map((tech, index) => (
                        <div key={index} className="flex gap-2">
                          <Input
                            value={tech}
                            onChange={(e) => updateTechnology(index, e.target.value)}
                            placeholder="Enter technology"
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={() => removeTechnology(index)}
                          >
                            ×
                          </Button>
                        </div>
                      ))}
                      <Button type="button" variant="outline" onClick={addTechnology}>
                        Add Technology
                      </Button>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="timeline">Timeline</Label>
                        <Input
                          id="timeline"
                          value={formData.timeline}
                          onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                          placeholder="4-6 weeks"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="priceRange">Price Range</Label>
                        <Input
                          id="priceRange"
                          value={formData.priceRange}
                          onChange={(e) => setFormData({ ...formData, priceRange: e.target.value })}
                          placeholder="$5,000 - $15,000"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="liveUrl">Live URL</Label>
                      <Input
                        id="liveUrl"
                        type="url"
                        value={formData.liveUrl}
                        onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                        placeholder="https://example.com"
                      />
                    </div>

                    <Button type="submit" className="w-full">
                      {editingProject ? "Update Project" : "Create Project"}
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
                  <FolderKanban className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{projects.length}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Free Projects</CardTitle>
                  <Calendar className="h-4 w-4 text-chart-2" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {projects.filter(p => p.pricing === "Free").length}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Paid Projects</CardTitle>
                  <FolderKanban className="h-4 w-4 text-chart-1" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {projects.filter(p => p.pricing === "Paid").length}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <Card key={project._id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-2xl">
                          {project.icon}
                        </div>
                        <div>
                          <CardTitle className="text-lg">{project.title}</CardTitle>
                          <Badge variant="outline" className="mt-1">{project.category}</Badge>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openEditDialog(project)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
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

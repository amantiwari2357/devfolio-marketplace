import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Star, Download, Edit, Trash2, Plus, Code, X, FileUp } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface Template {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  rating: number;
  downloads: string;
  isActive: boolean;
  pdfUrl?: string;
  pdfName?: string;
}

const TemplateManagement = () => {
  const [templates, setTemplates] = useState<Template[]>([
    {
      id: "1",
      name: "Minimal Portfolio",
      description: "Clean and minimal portfolio template with focus on content",
      technologies: ["React", "Tailwind", "Framer Motion"],
      rating: 1.2,
      downloads: "5.4k",
      isActive: true,
    },
    {
      id: "2",
      name: "Developer CV",
      description: "Professional CV template for developers with project showcase",
      technologies: ["Next.js", "TypeScript", "Shadcn"],
      rating: 2.1,
      downloads: "8.7k",
      isActive: true,
    },
    {
      id: "3",
      name: "Creative Portfolio",
      description: "Modern and creative portfolio with smooth animations",
      technologies: ["React", "GSAP", "Three.js"],
      rating: 3.5,
      downloads: "12.3k",
      isActive: true,
    },
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<Template | null>(null);
  const [deleteTemplateId, setDeleteTemplateId] = useState<string | null>(null);
  const [techInput, setTechInput] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    technologies: [] as string[],
    rating: "",
    downloads: "",
    pdfFile: null as File | null,
  });

  const handleOpenDialog = (template?: Template) => {
    if (template) {
      setEditingTemplate(template);
      setFormData({
        name: template.name,
        description: template.description,
        technologies: template.technologies,
        rating: template.rating.toString(),
        downloads: template.downloads,
        pdfFile: null,
      });
    } else {
      setEditingTemplate(null);
      setFormData({
        name: "",
        description: "",
        technologies: [],
        rating: "",
        downloads: "",
        pdfFile: null,
      });
    }
    setIsDialogOpen(true);
  };

  const handleAddTechnology = () => {
    if (techInput.trim() && !formData.technologies.includes(techInput.trim())) {
      setFormData({
        ...formData,
        technologies: [...formData.technologies, techInput.trim()],
      });
      setTechInput("");
    }
  };

  const handleRemoveTechnology = (tech: string) => {
    setFormData({
      ...formData,
      technologies: formData.technologies.filter((t) => t !== tech),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.description || formData.technologies.length === 0) {
      toast.error("Please fill all required fields");
      return;
    }

    let pdfUrl = editingTemplate?.pdfUrl;
    let pdfName = editingTemplate?.pdfName;

    if (formData.pdfFile) {
      pdfUrl = URL.createObjectURL(formData.pdfFile);
      pdfName = formData.pdfFile.name;
    }

    const templateData: Template = {
      id: editingTemplate?.id || Date.now().toString(),
      name: formData.name,
      description: formData.description,
      technologies: formData.technologies,
      rating: parseFloat(formData.rating) || 0,
      downloads: formData.downloads,
      isActive: editingTemplate?.isActive ?? true,
      pdfUrl,
      pdfName,
    };

    if (editingTemplate) {
      setTemplates(templates.map((t) => (t.id === editingTemplate.id ? templateData : t)));
      toast.success("Template updated successfully!");
    } else {
      setTemplates([...templates, templateData]);
      toast.success("Template created successfully!");
    }

    setIsDialogOpen(false);
    setFormData({
      name: "",
      description: "",
      technologies: [],
      rating: "",
      downloads: "",
      pdfFile: null,
    });
  };

  const handleDownloadPDF = (template: Template) => {
    if (template.pdfUrl) {
      const link = document.createElement("a");
      link.href = template.pdfUrl;
      link.download = template.pdfName || `${template.name}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success("Template downloaded!");
    } else {
      toast.error("No PDF available for this template");
    }
  };

  const handleDeleteClick = (id: string) => {
    setDeleteTemplateId(id);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (deleteTemplateId) {
      setTemplates(templates.filter((t) => t.id !== deleteTemplateId));
      toast.success("Template deleted successfully!");
      setIsDeleteDialogOpen(false);
      setDeleteTemplateId(null);
    }
  };

  const handleToggleActive = (id: string) => {
    setTemplates(
      templates.map((t) =>
        t.id === id ? { ...t, isActive: !t.isActive } : t
      )
    );
    toast.success("Template status updated!");
  };

  return (
    <div className="min-h-screen bg-background p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">Template Management</h1>
              <p className="text-muted-foreground">Manage portfolio and project templates</p>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  onClick={() => handleOpenDialog()}
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Template
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-2xl">
                    {editingTemplate ? "Edit Template" : "Add New Template"}
                  </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label className="text-foreground font-semibold">Template Name *</Label>
                    <Input
                      placeholder="e.g., Minimal Portfolio"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label className="text-foreground font-semibold">Description *</Label>
                    <Textarea
                      placeholder="Clean and minimal portfolio template with focus on content"
                      rows={3}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      required
                      className="mt-2 resize-none"
                    />
                  </div>

                  <div>
                    <Label className="text-foreground font-semibold">Technologies *</Label>
                    <div className="flex gap-2 mt-2">
                      <Input
                        placeholder="Add technology (e.g., React, TypeScript)"
                        value={techInput}
                        onChange={(e) => setTechInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            handleAddTechnology();
                          }
                        }}
                      />
                      <Button type="button" onClick={handleAddTechnology} variant="outline">
                        Add
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {formData.technologies.map((tech) => (
                        <Badge key={tech} variant="secondary" className="px-3 py-1">
                          {tech}
                          <button
                            type="button"
                            onClick={() => handleRemoveTechnology(tech)}
                            className="ml-2 hover:text-destructive"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-foreground font-semibold">Rating (in K)</Label>
                      <Input
                        type="number"
                        step="0.1"
                        placeholder="1.2"
                        value={formData.rating}
                        onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label className="text-foreground font-semibold">Downloads</Label>
                      <Input
                        placeholder="5.4k"
                        value={formData.downloads}
                        onChange={(e) => setFormData({ ...formData, downloads: e.target.value })}
                        className="mt-2"
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="text-foreground font-semibold">Upload PDF Template</Label>
                    <div className="mt-2">
                      <Input
                        type="file"
                        accept=".pdf"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            if (file.type !== "application/pdf") {
                              toast.error("Please upload a PDF file");
                              e.target.value = "";
                              return;
                            }
                            setFormData({ ...formData, pdfFile: file });
                            toast.success("PDF uploaded successfully");
                          }
                        }}
                        className="cursor-pointer"
                      />
                      {formData.pdfFile && (
                        <p className="text-sm text-muted-foreground mt-2 flex items-center gap-2">
                          <FileUp className="w-4 h-4" />
                          {formData.pdfFile.name}
                        </p>
                      )}
                      {editingTemplate?.pdfName && !formData.pdfFile && (
                        <p className="text-sm text-muted-foreground mt-2 flex items-center gap-2">
                          <FileUp className="w-4 h-4" />
                          Current: {editingTemplate.pdfName}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button
                      type="submit"
                      className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      {editingTemplate ? "Update Template" : "Create Template"}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary"></div>
              {templates.filter((t) => t.isActive).length} Active Templates
            </span>
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-muted"></div>
              {templates.filter((t) => !t.isActive).length} Inactive Templates
            </span>
          </div>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template) => (
            <Card
              key={template.id}
              className={`group relative overflow-hidden transition-all duration-300 hover:shadow-xl ${
                !template.isActive ? "opacity-60" : ""
              }`}
            >
              {/* Header with Code Icon */}
              <div className="h-40 bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,hsl(var(--primary)/0.1),transparent)]"></div>
                <Code className="w-20 h-20 text-muted-foreground/40" strokeWidth={1.5} />
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">{template.name}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {template.description}
                  </p>
                </div>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2">
                  {template.technologies.map((tech) => (
                    <Badge
                      key={tech}
                      variant="outline"
                      className="px-2 py-1 text-xs border-border/50"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between pt-2 border-t border-border/50">
                  <div className="flex items-center gap-1 text-sm">
                    <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                    <span className="font-semibold text-foreground">{template.rating}k</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Download className="w-4 h-4" />
                    <span>{template.downloads}</span>
                  </div>
                </div>

                {/* Status Badge */}
                <div className="pt-2">
                  <Badge
                    variant={template.isActive ? "default" : "secondary"}
                    className="text-xs"
                  >
                    {template.isActive ? "Active" : "Inactive"}
                  </Badge>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-2 pt-2">
                  {template.pdfUrl && (
                    <Button
                      variant="default"
                      size="sm"
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                      onClick={() => handleDownloadPDF(template)}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download Template
                    </Button>
                  )}
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => handleToggleActive(template.id)}
                    >
                      {template.isActive ? "Deactivate" : "Activate"}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleOpenDialog(template)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteClick(template.id)}
                      className="hover:bg-destructive/10 hover:text-destructive hover:border-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {templates.length === 0 && (
          <Card className="p-12 text-center">
            <div className="max-w-md mx-auto">
              <Code className="w-16 h-16 text-muted-foreground/40 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No templates yet</h3>
              <p className="text-muted-foreground mb-6">
                Create your first template to get started
              </p>
              <Button onClick={() => handleOpenDialog()}>
                <Plus className="w-4 h-4 mr-2" />
                Add Template
              </Button>
            </div>
          </Card>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this template. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default TemplateManagement;

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Sidebar from "@/components/dashboard/Sidebar";
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

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { templateService, TemplateDto } from "../services/template.service";

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
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(false);

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

  const mapDtoToTemplate = (dto: TemplateDto): Template => ({
    id: dto._id,
    name: dto.name,
    description: dto.description,
    technologies: dto.technologies || [],
    rating: dto.rating,
    downloads: dto.downloads,
    isActive: dto.isActive,
    pdfUrl: dto.pdfUrl,
    pdfName: dto.pdfName,
  });

  useEffect(() => {
    const fetchTemplates = async () => {
      setLoading(true);
      try {
        const data = await templateService.getAllAdmin();
        setTemplates(data.templates.map(mapDtoToTemplate));
      } catch (error) {
        console.error(error);
        toast.error("Failed to load templates");
      } finally {
        setLoading(false);
      }
    };

    fetchTemplates();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.description || formData.technologies.length === 0) {
      toast.error("Please fill all required fields");
      return;
    }

    const payload = {
      name: formData.name,
      description: formData.description,
      technologies: formData.technologies,
      rating: parseFloat(formData.rating) || 0,
      downloads: formData.downloads,
      isActive: editingTemplate?.isActive ?? true,
      pdfUrl: editingTemplate?.pdfUrl,
      pdfName: formData.pdfFile?.name || editingTemplate?.pdfName,
    };

    try {
      if (editingTemplate) {
        const { template } = await templateService.update(editingTemplate.id, payload);
        const updated = mapDtoToTemplate(template);
        setTemplates(templates.map((t) => (t.id === editingTemplate.id ? updated : t)));
        toast.success("Template updated successfully!");
      } else {
        const { template } = await templateService.create(payload);
        const created = mapDtoToTemplate(template);
        setTemplates([...templates, created]);
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
    } catch (error) {
      console.error(error);
      toast.error("Failed to save template");
    }
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

  const handleDeleteConfirm = async () => {
    if (!deleteTemplateId) return;

    try {
      await templateService.delete(deleteTemplateId);
      setTemplates(templates.filter((t) => t.id !== deleteTemplateId));
      toast.success("Template deleted successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete template");
    } finally {
      setIsDeleteDialogOpen(false);
      setDeleteTemplateId(null);
    }
  };

  const handleToggleActive = async (id: string) => {
    try {
      const { template } = await templateService.toggleStatus(id);
      const updated = mapDtoToTemplate(template);
      setTemplates(
        templates.map((t) =>
          t.id === id ? updated : t
        )
      );
      toast.success("Template status updated!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update template status");
    }
  };

  return (
      <div className="min-h-screen bg-background flex">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden md:pl-64">
        {/* Fixed Header */}
        <header className="fixed top-0 right-0 left-0 z-20 bg-background border-b md:left-64">
          <DashboardHeader onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        </header>
        
        {/* Scrollable Content */}
        <main className="flex-1 pt-24 pb-6 px-4 md:px-6 overflow-y-auto">
          <div className="max-w-7xl mx-auto space-y-8 md:space-y-10">
            
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h1 className="text-xl md:text-3xl font-black tracking-tighter text-foreground italic uppercase">V_Node / Blueprint Registry</h1>
                <p className="text-[10px] md:text-xs font-bold text-muted-foreground/60 uppercase tracking-[0.2em] mt-1 shadow-sm">Global Template Deployment & Asset Matrix</p>
              </div>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button
                    onClick={() => handleOpenDialog()}
                    className="gap-2 font-black uppercase italic tracking-widest text-[10px] px-6 h-10 shadow-lg shadow-primary/20"
                  >
                    <Plus className="w-4 h-4" />
                    Initialize_Blueprint
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="font-black uppercase tracking-tighter italic text-xl">
                      {editingTemplate ? 'Update_Sequence' : 'Add_New_Blueprint'}
                    </DialogTitle>
                  </DialogHeader>

                  <form onSubmit={handleSubmit} className="space-y-6 pt-4">
                    <div className="space-y-2">
                      <Label className="font-bold uppercase tracking-widest text-[10px] italic">Blueprint_ID *</Label>
                      <Input
                        placeholder="e.g., Minimal_Node_Alpha"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        className="bg-muted/10 border-border/30 h-10"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="font-bold uppercase tracking-widest text-[10px] italic">Context_Matrix *</Label>
                      <Textarea
                        placeholder="Define the technical scope and structural parameters"
                        rows={3}
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        required
                        className="bg-muted/10 border-border/30 resize-none"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="font-bold uppercase tracking-widest text-[10px] italic">Stack_Protocols *</Label>
                      <div className="flex gap-2">
                        <Input
                          placeholder="Inject technology (e.g., React_Node)"
                          value={techInput}
                          onChange={(e) => setTechInput(e.target.value)}
                          className="bg-muted/10 border-border/30 h-10"
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              handleAddTechnology();
                            }
                          }}
                        />
                        <Button type="button" onClick={handleAddTechnology} variant="outline" className="font-bold uppercase tracking-widest text-[10px] italic">
                          Inject
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {formData.technologies.map((tech) => (
                          <Badge key={tech} variant="secondary" className="font-black uppercase italic tracking-widest text-[9px] px-2 py-0.5 border-none bg-primary/10 text-primary">
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
                      <div className="space-y-2">
                        <Label className="font-bold uppercase tracking-widest text-[10px] italic">Entropy_Rating (in K)</Label>
                        <Input
                          type="number"
                          step="0.1"
                          placeholder="1.2"
                          value={formData.rating}
                          onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                          className="bg-muted/10 border-border/30 h-10"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="font-bold uppercase tracking-widest text-[10px] italic">Download_Syncs</Label>
                        <Input
                          placeholder="5.4k"
                          value={formData.downloads}
                          onChange={(e) => setFormData({ ...formData, downloads: e.target.value })}
                          className="bg-muted/10 border-border/30 h-10"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="font-bold uppercase tracking-widest text-[10px] italic">PDF_Asset_Source</Label>
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
                              toast.success("PDF Source Locked");
                            }
                          }}
                          className="cursor-pointer bg-muted/10 border-border/30"
                        />
                        {formData.pdfFile && (
                          <p className="text-[10px] font-bold text-primary mt-2 flex items-center gap-2 uppercase tracking-tighter">
                            <FileUp className="w-4 h-4" />
                            {formData.pdfFile.name}_LOCKED
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-3 pt-6 border-t border-border/10">
                      <Button
                        type="submit"
                        className="flex-1 font-black uppercase tracking-widest text-[10px] italic h-11"
                      >
                        {editingTemplate ? "Sync_Update" : "Commit_Blueprint"}
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={() => setIsDialogOpen(false)}
                        className="font-bold uppercase tracking-widest text-[10px] italic"
                      >
                        Abort
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            <div className="flex items-center gap-6 text-[10px] font-black uppercase tracking-widest italic text-muted-foreground/60">
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_rgba(var(--primary),0.5)]"></div>
                {templates.filter((t) => t.isActive).length} ACTIVE_NODES
              </span>
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-muted border border-border/50"></div>
                {templates.filter((t) => !t.isActive).length} STANDBY_NODES
              </span>
            </div>
          </div>

          <div className="max-w-7xl mx-auto mt-10">
            {/* Templates Grid */}
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 gap-4">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
                <p className="text-[10px] font-black uppercase tracking-widest italic text-muted-foreground animate-pulse">Synchronizing_Database...</p>
              </div>
            ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {templates.map((template) => (
                <Card
                  key={template.id}
                  className={`group relative overflow-hidden transition-all duration-500 hover:shadow-2xl border-border/40 bg-card/30 backdrop-blur-sm ${
                    !template.isActive ? "opacity-60 saturate-50" : ""
                  }`}
                >
                  {/* Header with Code Icon */}
                  <div className="h-44 bg-gradient-to-br from-primary/10 via-background to-accent/10 flex items-center justify-center relative overflow-hidden border-b border-border/20">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,hsl(var(--primary)/0.15),transparent)] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    <div className="relative transform group-hover:scale-110 transition-transform duration-700">
                      <Code className="w-24 h-24 text-muted-foreground/20" strokeWidth={1} />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 bg-primary/5 rounded-full blur-xl group-hover:bg-primary/20 transition-all"></div>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-5">
                    <div>
                      <h3 className="text-xl font-black text-foreground italic uppercase tracking-tighter mb-2 group-hover:text-primary transition-colors">{template.name}</h3>
                      <p className="text-xs font-medium text-muted-foreground/70 leading-relaxed line-clamp-2">
                        {template.description}
                      </p>
                    </div>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-1.5">
                      {template.technologies.map((tech) => (
                        <Badge
                          key={tech}
                          variant="outline"
                          className="font-bold uppercase tracking-widest text-[8px] px-2 py-0 border-border/30 bg-muted/20 text-muted-foreground group-hover:border-primary/30 transition-colors"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>

                    {/* Stats */}
                    <div className="flex items-center justify-between pt-4 border-t border-border/10">
                      <div className="flex items-center gap-1.5 text-[10px] font-black italic tracking-tighter">
                        <Star className="w-3.5 h-3.5 fill-yellow-500 text-yellow-500" />
                        <span className="text-foreground">{template.rating}K_RATING</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[10px] font-black italic tracking-tighter text-muted-foreground">
                        <Download className="w-3.5 h-3.5" />
                        <span>{template.downloads}_SYNCED</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-2 pt-2">
                      {template.pdfUrl && (
                        <Button
                          variant="default"
                          size="sm"
                          className="w-full font-black uppercase italic tracking-widest text-[9px] h-9 shadow-lg shadow-primary/10"
                          onClick={() => handleDownloadPDF(template)}
                        >
                          <Download className="w-3.5 h-3.5 mr-2" />
                          Pull_Blueprint
                        </Button>
                      )}
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 font-bold uppercase tracking-widest text-[9px] h-9 group/btn"
                          onClick={() => handleToggleActive(template.id)}
                        >
                          {template.isActive ? "Deactivate" : "Activate"}
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-9 w-9 shrink-0"
                          onClick={() => handleOpenDialog(template)}
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleDeleteClick(template.id)}
                          className="h-9 w-9 shrink-0 hover:bg-destructive/10 hover:text-destructive hover:border-destructive transition-all"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            )}

            {templates.length === 0 && !loading && (
              <Card className="p-20 text-center border-dashed border-border/40 bg-muted/5">
                <div className="max-w-md mx-auto">
                  <Code className="w-20 h-20 text-muted-foreground/10 mx-auto mb-6" strokeWidth={1} />
                  <h3 className="text-xl font-black italic uppercase tracking-tighter text-foreground mb-2">Protocol_Empty</h3>
                  <p className="text-xs font-bold text-muted-foreground/60 uppercase tracking-widest mb-8">
                    No blueprints detected in current sequence.
                  </p>
                  <Button onClick={() => handleOpenDialog()} className="font-black uppercase italic tracking-widest text-[10px] px-8 h-10">
                    <Plus className="w-4 h-4 mr-2" />
                    Initialize_First_Blueprint
                  </Button>
                </div>
              </Card>
            )}
          </div>
        </main>
  
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
    </div>
  );
};

export default TemplateManagement;

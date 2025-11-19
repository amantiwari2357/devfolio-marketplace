import { useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Plus, ChevronDown, ChevronUp, CheckCircle2, Clock, Circle, DollarSign, FileText, Calendar, Users, Edit } from "lucide-react";
import { cn } from "@/lib/utils";

interface Stage {
  id: number;
  name: string;
  output: string;
  status: "pending" | "in-progress" | "done";
  completionDate: string;
  assignedMember: string;
  payment: number;
  paymentStatus: "pending" | "partially-paid" | "paid";
  notes: string;
  approvalRequired: boolean;
  approved: boolean;
}

interface Project {
  id: string;
  clientName: string;
  email: string;
  phone: string;
  companyName: string;
  projectName: string;
  techStack: string;
  projectType: string;
  startDate: string;
  deadline: string;
  teamMembers: string[];
  totalAmount: number;
  paidAmount: number;
  stages: Stage[];
}

const defaultStages: Stage[] = [
  { id: 1, name: "Requirement Gathering + Contract", output: "Documents, Payment Part-1", status: "pending", completionDate: "", assignedMember: "", payment: 0, paymentStatus: "pending", notes: "", approvalRequired: true, approved: false },
  { id: 2, name: "Branding & Wireframe", output: "Logo, Colors, Sitemap", status: "pending", completionDate: "", assignedMember: "", payment: 0, paymentStatus: "pending", notes: "", approvalRequired: true, approved: false },
  { id: 3, name: "UI/UX Design", output: "Figma, Approval Status", status: "pending", completionDate: "", assignedMember: "", payment: 0, paymentStatus: "pending", notes: "", approvalRequired: true, approved: false },
  { id: 4, name: "Frontend Development", output: "Web Pages, Components", status: "pending", completionDate: "", assignedMember: "", payment: 0, paymentStatus: "pending", notes: "", approvalRequired: false, approved: false },
  { id: 5, name: "Backend Development", output: "Database, APIs", status: "pending", completionDate: "", assignedMember: "", payment: 0, paymentStatus: "pending", notes: "", approvalRequired: false, approved: false },
  { id: 6, name: "Integrations", output: "Payment, Auth, CRM, Third-Party APIs", status: "pending", completionDate: "", assignedMember: "", payment: 0, paymentStatus: "pending", notes: "", approvalRequired: false, approved: false },
  { id: 7, name: "Content Upload", output: "Images, Text Content", status: "pending", completionDate: "", assignedMember: "", payment: 0, paymentStatus: "pending", notes: "", approvalRequired: true, approved: false },
  { id: 8, name: "Testing & QA", output: "Bugs List, Reports", status: "pending", completionDate: "", assignedMember: "", payment: 0, paymentStatus: "pending", notes: "", approvalRequired: false, approved: false },
  { id: 9, name: "Deployment & Hosting", output: "Domain, SSL, Server", status: "pending", completionDate: "", assignedMember: "", payment: 0, paymentStatus: "pending", notes: "", approvalRequired: true, approved: false },
  { id: 10, name: "Final Delivery & Training", output: "Documentation, Credentials, Warranty", status: "pending", completionDate: "", assignedMember: "", payment: 0, paymentStatus: "pending", notes: "", approvalRequired: true, approved: false },
];

const ClientOnboarding = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [projects, setProjects] = useState<Project[]>([
    {
      id: "1",
      clientName: "John Doe",
      email: "john@example.com",
      phone: "+91 98765 43210",
      companyName: "Tech Solutions",
      projectName: "E-commerce Platform",
      techStack: "React + Node.js",
      projectType: "E-commerce",
      startDate: "2025-01-15",
      deadline: "2025-06-30",
      teamMembers: ["Alice", "Bob"],
      totalAmount: 500000,
      paidAmount: 150000,
      stages: defaultStages.map(s => ({ ...s, payment: 50000 })),
    },
  ]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [expandedStage, setExpandedStage] = useState<number | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const [formData, setFormData] = useState({
    clientName: "",
    email: "",
    phone: "",
    companyName: "",
    projectName: "",
    techStack: "",
    projectType: "",
    startDate: "",
    deadline: "",
    totalAmount: "",
  });

  const calculateProgress = (stages: Stage[]) => {
    const completedStages = stages.filter((s) => s.status === "done").length;
    return (completedStages / stages.length) * 100;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "done":
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case "in-progress":
        return <Clock className="w-5 h-5 text-yellow-500" />;
      default:
        return <Circle className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const getPaymentColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-500";
      case "partially-paid":
        return "bg-yellow-500";
      default:
        return "bg-red-500";
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newProject: Project = {
      id: editingProject?.id || Date.now().toString(),
      clientName: formData.clientName,
      email: formData.email,
      phone: formData.phone,
      companyName: formData.companyName,
      projectName: formData.projectName,
      techStack: formData.techStack,
      projectType: formData.projectType,
      startDate: formData.startDate,
      deadline: formData.deadline,
      totalAmount: Number(formData.totalAmount),
      paidAmount: editingProject?.paidAmount || 0,
      teamMembers: editingProject?.teamMembers || [],
      stages: editingProject?.stages || defaultStages.map(s => ({ ...s, payment: Number(formData.totalAmount) / 10 })),
    };

    if (editingProject) {
      setProjects(projects.map((p) => (p.id === editingProject.id ? newProject : p)));
    } else {
      setProjects([...projects, newProject]);
    }

    setIsDialogOpen(false);
    setFormData({
      clientName: "",
      email: "",
      phone: "",
      companyName: "",
      projectName: "",
      techStack: "",
      projectType: "",
      startDate: "",
      deadline: "",
      totalAmount: "",
    });
    setEditingProject(null);
  };

  const updateStageStatus = (projectId: string, stageId: number, status: "pending" | "in-progress" | "done") => {
    setProjects(
      projects.map((p) =>
        p.id === projectId
          ? {
              ...p,
              stages: p.stages.map((s) =>
                s.id === stageId ? { ...s, status, completionDate: status === "done" ? new Date().toISOString().split("T")[0] : s.completionDate } : s
              ),
            }
          : p
      )
    );
  };

  const updateStagePayment = (projectId: string, stageId: number, paymentStatus: "pending" | "partially-paid" | "paid") => {
    setProjects(
      projects.map((p) =>
        p.id === projectId
          ? {
              ...p,
              stages: p.stages.map((s) => (s.id === stageId ? { ...s, paymentStatus } : s)),
            }
          : p
      )
    );
  };

  const updateStageNotes = (projectId: string, stageId: number, notes: string) => {
    setProjects(
      projects.map((p) =>
        p.id === projectId
          ? {
              ...p,
              stages: p.stages.map((s) => (s.id === stageId ? { ...s, notes } : s)),
            }
          : p
      )
    );
  };

  const openEditDialog = (project: Project) => {
    setEditingProject(project);
    setFormData({
      clientName: project.clientName,
      email: project.email,
      phone: project.phone,
      companyName: project.companyName,
      projectName: project.projectName,
      techStack: project.techStack,
      projectType: project.projectType,
      startDate: project.startDate,
      deadline: project.deadline,
      totalAmount: project.totalAmount.toString(),
    });
    setIsDialogOpen(true);
  };

  return (
    <div className="flex min-h-screen w-full bg-background">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 lg:ml-64">
        <DashboardHeader onMenuClick={() => setSidebarOpen(true)} />

        <main className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Client Onboarding & Project Lifecycle</h1>
              <p className="text-muted-foreground">Track projects from onboarding to delivery through 10 stages</p>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => { setEditingProject(null); setFormData({ clientName: "", email: "", phone: "", companyName: "", projectName: "", techStack: "", projectType: "", startDate: "", deadline: "", totalAmount: "" }); }}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Project
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>{editingProject ? "Edit Project" : "Add New Project"}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Client Name</Label>
                      <Input value={formData.clientName} onChange={(e) => setFormData({ ...formData, clientName: e.target.value })} required />
                    </div>
                    <div>
                      <Label>Email</Label>
                      <Input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
                    </div>
                    <div>
                      <Label>Phone</Label>
                      <Input value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} required />
                    </div>
                    <div>
                      <Label>Company Name</Label>
                      <Input value={formData.companyName} onChange={(e) => setFormData({ ...formData, companyName: e.target.value })} required />
                    </div>
                    <div>
                      <Label>Project Name</Label>
                      <Input value={formData.projectName} onChange={(e) => setFormData({ ...formData, projectName: e.target.value })} required />
                    </div>
                    <div>
                      <Label>Technology Stack</Label>
                      <Select value={formData.techStack} onValueChange={(value) => setFormData({ ...formData, techStack: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select technology" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="React + Node.js">React + Node.js</SelectItem>
                          <SelectItem value="WordPress">WordPress</SelectItem>
                          <SelectItem value="Next.js">Next.js</SelectItem>
                          <SelectItem value="Flutter">Flutter</SelectItem>
                          <SelectItem value="MERN Stack">MERN Stack</SelectItem>
                          <SelectItem value="Shopify">Shopify</SelectItem>
                          <SelectItem value="Custom">Custom</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Project Type</Label>
                      <Select value={formData.projectType} onValueChange={(value) => setFormData({ ...formData, projectType: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Website">Website</SelectItem>
                          <SelectItem value="CRM">CRM</SelectItem>
                          <SelectItem value="App">App</SelectItem>
                          <SelectItem value="E-commerce">E-commerce</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Total Amount (₹)</Label>
                      <Input type="number" value={formData.totalAmount} onChange={(e) => setFormData({ ...formData, totalAmount: e.target.value })} required />
                    </div>
                    <div>
                      <Label>Start Date</Label>
                      <Input type="date" value={formData.startDate} onChange={(e) => setFormData({ ...formData, startDate: e.target.value })} required />
                    </div>
                    <div>
                      <Label>Deadline</Label>
                      <Input type="date" value={formData.deadline} onChange={(e) => setFormData({ ...formData, deadline: e.target.value })} required />
                    </div>
                  </div>
                  <Button type="submit" className="w-full">
                    {editingProject ? "Update Project" : "Create Project"}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {selectedProject ? (
            <div className="space-y-6">
              <Button variant="outline" onClick={() => setSelectedProject(null)}>
                ← Back to Projects
              </Button>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl">{selectedProject.projectName}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      {selectedProject.companyName} • {selectedProject.clientName}
                    </p>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => openEditDialog(selectedProject)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Tech Stack</p>
                      <p className="font-medium">{selectedProject.techStack}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Type</p>
                      <p className="font-medium">{selectedProject.projectType}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Start Date</p>
                      <p className="font-medium">{selectedProject.startDate}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Deadline</p>
                      <p className="font-medium">{selectedProject.deadline}</p>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Overall Progress</span>
                      <span className="text-sm text-muted-foreground">{Math.round(calculateProgress(selectedProject.stages))}%</span>
                    </div>
                    <Progress value={calculateProgress(selectedProject.stages)} />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <Card>
                      <CardContent className="pt-6">
                        <div className="text-2xl font-bold">₹{selectedProject.totalAmount.toLocaleString()}</div>
                        <p className="text-sm text-muted-foreground">Total Amount</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-6">
                        <div className="text-2xl font-bold text-green-500">₹{selectedProject.paidAmount.toLocaleString()}</div>
                        <p className="text-sm text-muted-foreground">Paid</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-6">
                        <div className="text-2xl font-bold text-red-500">₹{(selectedProject.totalAmount - selectedProject.paidAmount).toLocaleString()}</div>
                        <p className="text-sm text-muted-foreground">Pending</p>
                      </CardContent>
                    </Card>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Project Stages</h3>
                    {selectedProject.stages.map((stage) => (
                      <Card key={stage.id}>
                        <CardHeader
                          className="cursor-pointer hover:bg-accent/50 transition-colors"
                          onClick={() => setExpandedStage(expandedStage === stage.id ? null : stage.id)}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold">
                                {stage.id}
                              </div>
                              {getStatusIcon(stage.status)}
                              <div>
                                <h4 className="font-semibold">{stage.name}</h4>
                                <p className="text-sm text-muted-foreground">{stage.output}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-4">
                              <div className={cn("w-3 h-3 rounded-full", getPaymentColor(stage.paymentStatus))} title={stage.paymentStatus} />
                              <Badge variant="outline">₹{stage.payment.toLocaleString()}</Badge>
                              {expandedStage === stage.id ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                            </div>
                          </div>
                        </CardHeader>
                        {expandedStage === stage.id && (
                          <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label>Status</Label>
                                <Select value={stage.status} onValueChange={(value: any) => updateStageStatus(selectedProject.id, stage.id, value)}>
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="pending">Pending</SelectItem>
                                    <SelectItem value="in-progress">In Progress</SelectItem>
                                    <SelectItem value="done">Done</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div>
                                <Label>Payment Status</Label>
                                <Select value={stage.paymentStatus} onValueChange={(value: any) => updateStagePayment(selectedProject.id, stage.id, value)}>
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="pending">Pending</SelectItem>
                                    <SelectItem value="partially-paid">Partially Paid</SelectItem>
                                    <SelectItem value="paid">Paid</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                            {stage.completionDate && (
                              <div>
                                <Label>Completion Date</Label>
                                <p className="text-sm">{stage.completionDate}</p>
                              </div>
                            )}
                            <div>
                              <Label>Notes</Label>
                              <Textarea
                                value={stage.notes}
                                onChange={(e) => updateStageNotes(selectedProject.id, stage.id, e.target.value)}
                                placeholder="Add notes, comments, or attachments info..."
                                rows={3}
                              />
                            </div>
                            {stage.approvalRequired && (
                              <div className="flex items-center gap-2 p-3 bg-yellow-500/10 rounded-lg">
                                <FileText className="w-5 h-5 text-yellow-500" />
                                <span className="text-sm">Approval required before proceeding to next stage</span>
                              </div>
                            )}
                          </CardContent>
                        )}
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <Tabs defaultValue="list" className="space-y-4">
              <TabsList>
                <TabsTrigger value="list">List View</TabsTrigger>
                <TabsTrigger value="timeline">Timeline View</TabsTrigger>
              </TabsList>

              <TabsContent value="list" className="space-y-4">
                <div className="grid gap-4">
                  {projects.map((project) => (
                    <Card key={project.id} className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setSelectedProject(project)}>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="text-xl">{project.projectName}</CardTitle>
                            <p className="text-sm text-muted-foreground mt-1">
                              {project.companyName} • {project.clientName}
                            </p>
                            <div className="flex gap-2 mt-2">
                              <Badge variant="outline">{project.techStack}</Badge>
                              <Badge variant="outline">{project.projectType}</Badge>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); openEditDialog(project); }}>
                            <Edit className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span>Progress</span>
                            <span className="font-medium">{Math.round(calculateProgress(project.stages))}%</span>
                          </div>
                          <Progress value={calculateProgress(project.stages)} />
                        </div>

                        <div className="grid grid-cols-4 gap-4 text-sm">
                          <div>
                            <div className="flex items-center gap-1 text-muted-foreground">
                              <Calendar className="w-4 h-4" />
                              <span>Deadline</span>
                            </div>
                            <p className="font-medium">{project.deadline}</p>
                          </div>
                          <div>
                            <div className="flex items-center gap-1 text-muted-foreground">
                              <DollarSign className="w-4 h-4" />
                              <span>Total</span>
                            </div>
                            <p className="font-medium">₹{project.totalAmount.toLocaleString()}</p>
                          </div>
                          <div>
                            <div className="flex items-center gap-1 text-muted-foreground">
                              <CheckCircle2 className="w-4 h-4" />
                              <span>Paid</span>
                            </div>
                            <p className="font-medium text-green-500">₹{project.paidAmount.toLocaleString()}</p>
                          </div>
                          <div>
                            <div className="flex items-center gap-1 text-muted-foreground">
                              <Clock className="w-4 h-4" />
                              <span>Pending</span>
                            </div>
                            <p className="font-medium text-red-500">₹{(project.totalAmount - project.paidAmount).toLocaleString()}</p>
                          </div>
                        </div>

                        <div className="flex gap-1">
                          {project.stages.map((stage) => (
                            <div key={stage.id} className={cn("flex-1 h-2 rounded-full", stage.status === "done" ? "bg-green-500" : stage.status === "in-progress" ? "bg-yellow-500" : "bg-muted")} title={`Stage ${stage.id}: ${stage.name}`} />
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="timeline" className="space-y-4">
                {projects.map((project) => (
                  <Card key={project.id}>
                    <CardHeader>
                      <CardTitle>{project.projectName}</CardTitle>
                      <p className="text-sm text-muted-foreground">{project.companyName}</p>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {project.stages.map((stage, index) => (
                          <div key={stage.id} className="flex gap-4">
                            <div className="flex flex-col items-center">
                              <div className={cn("w-10 h-10 rounded-full flex items-center justify-center", stage.status === "done" ? "bg-green-500 text-white" : stage.status === "in-progress" ? "bg-yellow-500 text-white" : "bg-muted")}>
                                {stage.id}
                              </div>
                              {index < project.stages.length - 1 && <div className="w-0.5 h-12 bg-border" />}
                            </div>
                            <div className="flex-1 pb-8">
                              <h4 className="font-semibold">{stage.name}</h4>
                              <p className="text-sm text-muted-foreground">{stage.output}</p>
                              <div className="flex gap-2 mt-2">
                                <Badge variant={stage.status === "done" ? "default" : "outline"}>{stage.status}</Badge>
                                <Badge variant="outline">₹{stage.payment.toLocaleString()}</Badge>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          )}
        </main>
      </div>
    </div>
  );
};

export default ClientOnboarding;

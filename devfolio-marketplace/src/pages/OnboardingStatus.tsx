import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { userAPI } from "@/services/auth";
import { toast } from "sonner";
import { ArrowLeft, CheckCircle2, Clock, XCircle, AlertCircle, X, RefreshCw, Layers } from "lucide-react";
import Header from "@/components/layout/Header";
import SEO from "@/components/layout/SEO";
import logo from "../../../public/Images/logo.png";

const OnboardingStatusPage = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<any[]>([]);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchProjects = async (isManualRefresh = false) => {
    if (isManualRefresh) {
      setIsRefreshing(true);
    }
    
    try {
      const response = await userAPI.getOnboardingRequests();
      let projectsData = [];
      
      if (Array.isArray(response.data)) {
        projectsData = response.data;
      } else if (response.data?.projects) {
        projectsData = response.data.projects;
      } else if (response.data?.requests) {
        projectsData = response.data.requests;
      }
      
      setProjects(projectsData);
      setLastUpdated(new Date());
      if (isManualRefresh) toast.success("Status updated");
    } catch (error) {
      console.error('Error fetching projects:', error);
      if (isManualRefresh) toast.error("Failed to refresh status");
    } finally {
      setIsRefreshing(false);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
    const pollInterval = setInterval(() => fetchProjects(), 15000);
    return () => clearInterval(pollInterval);
  }, []);

  const getStatusIcon = (statusType: string) => {
    switch (statusType) {
      case "approved": return <CheckCircle2 className="h-5 w-5 text-primary" />;
      case "rejected": return <XCircle className="h-5 w-5 text-destructive" />;
      case "in_review": return <AlertCircle className="h-5 w-5 text-amber-500" />;
      default: return <Clock className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (statusType: string) => {
    switch (statusType) {
      case "approved": return <Badge className="bg-primary/10 text-primary border-primary/20 font-bold px-3 py-1 rounded-lg">Approved</Badge>;
      case "rejected": return <Badge variant="destructive" className="font-bold px-3 py-1 rounded-lg">Rejected</Badge>;
      case "in_review": return <Badge className="bg-amber-500/10 text-amber-600 border-amber-500/20 font-bold px-3 py-1 rounded-lg">In Review</Badge>;
      default: return <Badge variant="secondary" className="font-bold px-3 py-1 rounded-lg">Pending</Badge>;
    }
  };

  const getOverallStatus = (project: any) => {
    if (!project || !project.stages) return 'pending';
    const stages = project.stages;
    const allDone = stages.length > 0 && stages.every((stage: any) => stage.status === "done");
    if (allDone) return "approved";
    if (stages.some((stage: any) => stage.status === "in-progress" || stage.status === "done")) return "in_review";
    return "pending";
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 pt-32 pb-12">
          <div className="max-w-6xl mx-auto space-y-8">
            <div className="h-10 w-64 bg-secondary/50 animate-pulse rounded-xl" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-56 bg-secondary/30 animate-pulse rounded-2xl border border-border/50" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const project = selectedProject;
  const stages = project?.stages || [];
  const completedStages = stages.filter((stage: any) => stage.status === "done").length;
  const totalStages = stages.length || 1;
  const progressPercentage = (completedStages / totalStages) * 100;
  const overallStatus = getOverallStatus(project);

  return (
    <div className="min-h-screen bg-background selection:bg-primary selection:text-primary-foreground">
      <SEO title="Onboarding Status" description="Track your project onboarding progress and approval status." />
      <Header />
      
      <main className="container mx-auto px-4 pt-32 pb-24">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Top Bar */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-border/50">
            <div className="space-y-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/")}
                className="group text-muted-foreground hover:text-primary transition-colors pl-0"
              >
                <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                Back to Explore
              </Button>
              <div>
                <h1 className="text-4xl font-black tracking-tight text-foreground">
                  Application <span className="text-primary">Status.</span>
                </h1>
                <p className="text-muted-foreground font-medium mt-2">
                  {lastUpdated && `System synchronised at ${lastUpdated.toLocaleTimeString()}`}
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              onClick={() => fetchProjects(true)}
              disabled={isRefreshing}
              className="rounded-xl px-6 py-6 font-bold border-border/50 bg-card hover:bg-accent/50 hover:border-primary/20 transition-all gap-3"
            >
              <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              {isRefreshing ? 'Updating...' : 'Refresh Status'}
            </Button>
          </div>

          {projects.length === 0 ? (
            <Card className="rounded-3xl border-border/50 bg-card shadow-2xl shadow-primary/5 border-dashed py-20 text-center">
              <CardContent className="space-y-6">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-secondary/30 text-primary">
                  <Layers className="h-10 w-10" />
                </div>
                <div className="space-y-2 max-w-sm mx-auto">
                  <h3 className="text-2xl font-black tracking-tight">No Active Applications</h3>
                  <p className="text-muted-foreground font-medium">
                    You haven't submitted any project for review yet. Start your journey today!
                  </p>
                </div>
                <div className="flex justify-center gap-4 pt-4">
                  <Button 
                    onClick={() => navigate("/profile")}
                    className="rounded-xl px-8 py-6 font-black bg-primary text-primary-foreground hover:scale-105 transition-all"
                  >
                    Set Up Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Requests Carousel/Grid */}
              <div className={selectedProject ? "lg:col-span-5 space-y-6" : "lg:col-span-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"}>
                <h2 className="text-sm font-black text-muted-foreground uppercase tracking-[0.2em] mb-4">Active Requests</h2>
                {projects.map((proj: any) => {
                  const projStatus = getOverallStatus(proj);
                  const isActive = selectedProject?._id === proj._id || selectedProject?.id === proj.id;
                  
                  return (
                    <Card
                      key={proj._id || proj.id}
                      className={`group rounded-2xl border-border/50 bg-card transition-all duration-300 cursor-pointer overflow-hidden ${
                        isActive ? 'ring-2 ring-primary bg-primary/[0.03] shadow-xl' : 'hover:border-primary/30 hover:shadow-lg'
                      }`}
                      onClick={() => {
                        setSelectedProject(proj);
                        if (window.innerWidth < 1024) {
                          setTimeout(() => {
                            document.getElementById('details-panel')?.scrollIntoView({ behavior: 'smooth' });
                          }, 100);
                        }
                      }}
                    >
                      <CardHeader className="pb-4">
                        <div className="flex items-start justify-between">
                          <div className="space-y-1">
                            <CardTitle className={`text-xl font-black tracking-tight transition-colors ${isActive ? 'text-primary' : 'text-foreground'}`}>
                              {proj.projectName || proj.name || 'Untitled'}
                            </CardTitle>
                            <CardDescription className="font-medium line-clamp-1">
                              {proj.projectDescription || 'Technical review application'}
                            </CardDescription>
                          </div>
                          <div className={`p-2 rounded-xl ${isActive ? 'bg-primary/20' : 'bg-secondary/50'}`}>
                            {getStatusIcon(projStatus)}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0 pb-6 flex items-center justify-between">
                        <div className="flex flex-col gap-1">
                          <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Milestones</span>
                          <span className="text-sm font-bold">{proj.stages?.length || 0} Stages</span>
                        </div>
                        {getStatusBadge(projStatus)}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {/* Details Panel */}
              {selectedProject && (
                <div id="details-panel" className="lg:col-span-7 space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                  <div className="flex items-center justify-between">
                    <h2 className="text-sm font-black text-muted-foreground uppercase tracking-[0.2em]">Application Intelligence</h2>
                    <Button variant="ghost" size="icon" onClick={() => setSelectedProject(null)} className="rounded-full hover:bg-destructive/10 hover:text-destructive">
                      <X className="h-5 w-5" />
                    </Button>
                  </div>

                  <div className="grid gap-6">
                    {/* Progress Overview */}
                    <Card className="rounded-3xl border-border/50 bg-card p-4">
                      <CardHeader className="pb-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="space-y-1">
                            <CardTitle className="text-3xl font-black tracking-tight">{project.projectName}</CardTitle>
                            <CardDescription className="text-base font-medium">Stage {completedStages + (overallStatus === 'approved' ? 0 : 1)} of {totalStages}</CardDescription>
                          </div>
                          {getStatusBadge(overallStatus)}
                        </div>
                        <div className="space-y-3">
                          <div className="flex justify-between text-xs font-black uppercase tracking-widest text-primary">
                            <span>Completion Efficiency</span>
                            <span>{Math.round(progressPercentage)}%</span>
                          </div>
                          <div className="h-3 bg-secondary/50 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-primary transition-all duration-1000 ease-out shadow-[0_0_20px_rgba(var(--primary),0.5)]"
                              style={{ width: `${progressPercentage}%` }}
                            />
                          </div>
                        </div>
                      </CardHeader>
                      
                      <CardContent className="space-y-6">
                        <div className="grid gap-4">
                          <h3 className="text-xs font-black text-muted-foreground uppercase tracking-[0.2em]">Development Pipeline</h3>
                          {stages.map((stage: any, sIdx: number) => (
                            <div
                              key={stage.id || stage._id}
                              className={`flex items-start gap-4 p-5 rounded-2xl border transition-all ${
                                stage.status === "done" 
                                  ? "bg-primary/[0.03] border-primary/20" 
                                  : stage.status === "in-progress"
                                    ? "bg-secondary/30 border-primary/40 shadow-lg"
                                    : "bg-background border-border/50 opacity-50"
                              }`}
                            >
                              <div className={`mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-black ${
                                stage.status === "done" ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground border border-border"
                              }`}>
                                {sIdx + 1}
                              </div>
                              <div className="flex-1 space-y-1">
                                <div className="flex items-center justify-between">
                                  <p className="font-black tracking-tight">{stage.name}</p>
                                  {stage.status === "done" && <CheckCircle2 className="h-4 w-4 text-primary" />}
                                  {stage.status === "in-progress" && <Clock className="h-4 w-4 text-primary animate-pulse" />}
                                </div>
                                <p className="text-sm text-muted-foreground font-medium leading-relaxed">{stage.output}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Meta Info */}
                    <div className="grid grid-cols-2 gap-4">
                      <Card className="p-6 rounded-2xl border-border/50 bg-secondary/20">
                        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Submission Date</p>
                        <p className="text-lg font-bold">{project.createdAt ? new Date(project.createdAt).toLocaleDateString() : "N/A"}</p>
                      </Card>
                      <Card className="p-6 rounded-2xl border-border/50 bg-secondary/20">
                        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Priority Level</p>
                        <p className="text-lg font-bold">Standard</p>
                      </Card>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Visual background accents */}
      <div className="fixed top-0 right-0 -z-10 w-1/3 h-1/3 bg-primary/5 blur-[100px] pointer-events-none" />
      <div className="fixed bottom-0 left-0 -z-10 w-1/3 h-1/3 bg-primary/5 blur-[100px] pointer-events-none" />
    </div>
  );
};

export default OnboardingStatusPage;
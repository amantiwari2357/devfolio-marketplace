import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { userAPI, type User } from "@/services/auth";
import { toast } from "sonner";
import { 
  ArrowLeft, CheckCircle2, Clock, XCircle, 
  AlertCircle, X, RefreshCw, Layers, Plus, Rocket,
  ExternalLink, ChevronRight, ShieldCheck
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SEO from "@/components/layout/SEO";
import { OnboardingForm } from "@/components/forms/OnboardingForm";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

const OnboardingStatusPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [projects, setProjects] = useState<any[]>([]);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isNewRequestOpen, setIsNewRequestOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchInitialData = async () => {
    try {
      const [profileRes, projectsRes] = await Promise.all([
        userAPI.getProfile(),
        userAPI.getOnboardingRequests()
      ]);
      setUser(profileRes.data.user);
      
      let projectsData = [];
      if (Array.isArray(projectsRes.data)) {
        projectsData = projectsRes.data;
      } else if (projectsRes.data?.projects) {
        projectsData = projectsRes.data.projects;
      } else if (projectsRes.data?.requests) {
        projectsData = projectsRes.data.requests;
      }
      
      setProjects(projectsData);
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchProjects = async (isManualRefresh = false) => {
    if (isManualRefresh) setIsRefreshing(true);
    try {
      const response = await userAPI.getOnboardingRequests();
      let projectsData = [];
      if (Array.isArray(response.data)) {
        projectsData = response.data;
      } else if (response.data?.projects) {
        projectsData = response.data.projects;
      }
      setProjects(projectsData);
      setLastUpdated(new Date());
      if (isManualRefresh) toast.success("Status Synchronized");
    } catch (error) {
      if (isManualRefresh) toast.error("Sync Failed");
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchInitialData();
    const pollInterval = setInterval(() => fetchProjects(), 20000);
    return () => clearInterval(pollInterval);
  }, []);

  const getStatusIcon = (statusType: string) => {
    switch (statusType) {
      case "approved": return <CheckCircle2 className="h-5 w-5 text-emerald-500" />;
      case "rejected": return <XCircle className="h-5 w-5 text-destructive" />;
      case "in_review": return <AlertCircle className="h-5 w-5 text-amber-500" />;
      default: return <Clock className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (statusType: string) => {
    switch (statusType) {
      case "approved": return <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 font-black px-3 py-1 rounded-lg uppercase text-[10px]">Verified</Badge>;
      case "rejected": return <Badge variant="destructive" className="font-black px-3 py-1 rounded-lg uppercase text-[10px]">Failed</Badge>;
      case "in_review": return <Badge className="bg-amber-500/10 text-amber-600 border-amber-500/20 font-black px-3 py-1 rounded-lg uppercase text-[10px]">Analysis</Badge>;
      default: return <Badge variant="secondary" className="font-black px-3 py-1 rounded-lg uppercase text-[10px]">Queued</Badge>;
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
          <div className="max-w-6xl mx-auto space-y-12">
            <div className="space-y-4">
               <div className="h-4 w-32 bg-secondary/50 animate-pulse rounded-full" />
               <div className="h-12 w-64 bg-secondary/50 animate-pulse rounded-xl" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-64 bg-secondary/30 animate-pulse rounded-[32px] border border-border/50" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const ProjectDetails = ({ project, isMobile = false }: { project: any, isMobile?: boolean }) => {
    if (!project) return null;
    const stages = project.stages || [];
    const completedStages = stages.filter((stage: any) => stage.status === "done").length;
    const totalStages = stages.length || 1;
    const progressPercentage = (completedStages / totalStages) * 100;
    const overallStatus = getOverallStatus(project);

    return (
      <div className={cn("space-y-8", isMobile ? "pb-10" : "animate-in fade-in slide-in-from-right-4 duration-500")}>
        {!isMobile && (
          <div className="flex items-center justify-between">
            <h2 className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.4em] italic">SYSTEM_INTELLIGENCE</h2>
            <Button variant="ghost" size="icon" onClick={() => setSelectedProject(null)} className="rounded-full hover:bg-destructive/10 hover:text-destructive transition-colors">
              <X className="h-5 w-5" />
            </Button>
          </div>
        )}

        <div className="grid gap-6">
          <Card className="rounded-[40px] border-border/40 bg-card/50 backdrop-blur-xl p-2 md:p-6 shadow-2xl border-none ring-1 ring-border/50">
            <CardHeader className="pb-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-primary mb-2">
                    <ShieldCheck className="w-5 h-5" />
                    <span className="text-[10px] font-black uppercase tracking-widest italic">Encrypted Secure View</span>
                  </div>
                  <CardTitle className="text-3xl md:text-4xl font-black tracking-tight italic lowercase">{project.projectName}<span className="text-primary not-italic">.</span></CardTitle>
                  <CardDescription className="text-sm font-bold italic opacity-60">Sequence {completedStages + (overallStatus === 'approved' ? 0 : 1)} of {totalStages} active modules</CardDescription>
                </div>
                {getStatusBadge(overallStatus)}
              </div>
              <div className="space-y-4">
                <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.2em] text-primary italic">
                  <span>Resource Distribution</span>
                  <span>{Math.round(progressPercentage)}%</span>
                </div>
                <div className="h-4 bg-secondary/30 rounded-full overflow-hidden p-1 border border-border/20">
                  <div 
                    className="h-full bg-primary rounded-full transition-all duration-[2000ms] ease-out shadow-[0_0_20px_rgba(var(--primary),0.6)]"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-8">
              <div className="space-y-4">
                <h3 className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em] italic px-2">Pipeline Map</h3>
                <div className="grid gap-4">
                  {stages.map((stage: any, sIdx: number) => (
                    <div
                      key={stage.id || stage._id}
                      className={cn(
                        "flex items-start gap-5 p-6 rounded-[32px] border transition-all duration-500",
                        stage.status === "done" 
                          ? "bg-emerald-500/[0.03] border-emerald-500/20" 
                          : stage.status === "in-progress"
                            ? "bg-primary/[0.03] border-primary/40 shadow-xl scale-[1.02]"
                            : "bg-background/20 border-border/30 opacity-40"
                      )}
                    >
                      <div className={cn(
                        "mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-2xl text-[10px] font-black border",
                        stage.status === "done" ? "bg-emerald-500 border-emerald-500 text-white" : "bg-background border-border"
                      )}>
                        {sIdx + 1}
                      </div>
                      <div className="flex-1 space-y-1.5">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-black tracking-tight uppercase italic">{stage.name}</p>
                          {stage.status === "done" && <CheckCircle2 className="h-4 w-4 text-emerald-500" />}
                          {stage.status === "in-progress" && <RefreshCw className="h-4 w-4 text-primary animate-spin" />}
                        </div>
                        <p className="text-sm text-muted-foreground font-bold italic leading-relaxed tracking-tight">{stage.output}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 gap-6">
            <Card className="p-6 rounded-[32px] border-border/40 bg-secondary/10 flex flex-col justify-center">
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2 italic">Discovery Sequence</p>
              <p className="text-base font-black italic">{project.createdAt ? new Date(project.createdAt).toLocaleDateString() : "SECURED"}</p>
            </Card>
            <Card className="p-6 rounded-[32px] border-border/40 bg-secondary/10 flex flex-col justify-center">
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2 italic">Protocol Level</p>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <p className="text-base font-black italic uppercase">Standard</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background selection:bg-primary selection:text-primary-foreground">
      <SEO title="Onboarding Status" description="Track your project onboarding progress and approval status." />
      <Header />
      
      <main id="root-main-content" className="container mx-auto px-4 pt-32 pb-24 relative">
        {/* Background Visual Artifacts */}
        <div className="absolute top-0 right-0 -z-10 w-2/3 h-2/3 bg-primary/2 opacity-20 blur-[150px] rounded-full animate-pulse" />
        
        <div className="max-w-7xl mx-auto space-y-16">
          {/* Top Bar Navigation Architecture */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-10 pb-12 border-b border-border/20">
            <div className="space-y-6">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/")}
                className="group text-muted-foreground hover:text-primary transition-all p-0 h-auto"
              >
                <ArrowLeft className="mr-3 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                <span className="text-[10px] font-black uppercase tracking-widest italic">Return to Base</span>
              </Button>
              <div className="space-y-3">
                <h1 className="text-4xl md:text-7xl font-black tracking-tighter text-foreground leading-[0.85] italic uppercase">
                  APPLICATION <span className="text-primary not-italic">STATUS.</span>
                </h1>
                <div className="flex items-center gap-3">
                   <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                   <p className="text-xs font-bold text-muted-foreground italic tracking-tight">
                    {lastUpdated && `Last sync sequence completed at ${lastUpdated.toLocaleTimeString()}`}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Dialog open={isNewRequestOpen} onOpenChange={setIsNewRequestOpen}>
                <DialogTrigger asChild>
                  <Button
                    className="h-16 rounded-2xl px-10 bg-primary text-primary-foreground font-black text-sm uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all gap-4 italic border-none"
                  >
                    <Plus className="w-5 h-5" />
                    Launch New Project
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto rounded-[40px] border-border/40 bg-background/95 backdrop-blur-3xl p-8 md:p-12 shadow-[0_0_50px_rgba(var(--primary),0.1)]">
                   <DialogHeader className="mb-8">
                      <div className="flex items-center gap-3 text-primary mb-2">
                         <Rocket className="w-6 h-6" />
                         <span className="text-[10px] font-black uppercase tracking-[0.4em] italic">Initialization Protocol</span>
                      </div>
                      <DialogTitle className="text-3xl md:text-5xl font-black tracking-tighter italic lowercase">New Asset Configuration<span className="text-primary not-italic">.</span></DialogTitle>
                   </DialogHeader>
                   <OnboardingForm user={user} onSuccess={() => {
                      setIsNewRequestOpen(false);
                      fetchProjects(true);
                   }} />
                </DialogContent>
              </Dialog>

              <Button
                variant="outline"
                onClick={() => fetchProjects(true)}
                disabled={isRefreshing}
                className="h-16 w-16 md:w-auto md:px-8 rounded-2xl border-border/40 bg-card hover:bg-secondary/10 transition-all"
              >
                <RefreshCw className={cn("h-5 w-5", isRefreshing && "animate-spin")} />
                <span className="hidden md:inline ml-3 font-black text-[10px] uppercase tracking-widest italic">Synchronize</span>
              </Button>
            </div>
          </div>

          {projects.length === 0 ? (
            <Card className="rounded-[56px] border-border/30 bg-secondary/5 border-dashed py-32 text-center relative overflow-hidden group shadow-inner">
              <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none group-hover:rotate-12 transition-transform duration-1000">
                 <Layers className="w-64 h-64 text-primary" />
              </div>
              
              <CardContent className="space-y-10 relative z-10 max-w-xl mx-auto">
                <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-[32px] bg-primary/10 text-primary shadow-xl shadow-primary/5">
                  <Layers className="h-12 w-12" />
                </div>
                <div className="space-y-4">
                  <h3 className="text-3xl md:text-5xl font-black tracking-tighter italic lowercase">Empty Pipeline Status<span className="text-primary not-italic">.</span></h3>
                  <p className="text-lg text-muted-foreground font-bold italic opacity-70 px-4">
                    Zero active deployment sequences detected in the global directory. Initialize your first architectural node now.
                  </p>
                </div>
                <Button 
                  onClick={() => setIsNewRequestOpen(true)}
                  className="rounded-2xl px-12 h-16 font-black bg-foreground text-background uppercase tracking-[0.2em] italic text-xs hover:scale-105 active:scale-95 transition-all shadow-xl"
                >
                  Initiate Sequence
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              {/* Requests Architecture */}
              <div className={cn(
                "space-y-8",
                selectedProject ? "lg:col-span-5" : "lg:col-span-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              )}>
                {!selectedProject && (
                   <h2 className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.5em] italic col-span-full">Active Operational Nodes</h2>
                )}
                
                {projects.map((proj: any) => {
                  const projStatus = getOverallStatus(proj);
                  const isActive = selectedProject?._id === proj._id || selectedProject?.id === proj.id;
                  
                  return (
                    <Card
                      key={proj._id || proj.id}
                      className={cn(
                        "group rounded-[32px] border-border/40 bg-card/60 backdrop-blur-xl transition-all duration-500 cursor-pointer overflow-hidden p-6 relative select-none",
                        isActive 
                          ? 'ring-2 ring-primary/40 bg-primary/[0.03] shadow-2xl scale-[1.02]' 
                          : 'hover:border-primary/40 hover:shadow-xl hover:translate-y-[-4px]'
                      )}
                      onClick={() => {
                        setSelectedProject(proj);
                        if (window.innerWidth < 1024) {
                          setIsDetailsOpen(true);
                        }
                      }}
                    >
                      <div className="absolute -right-4 -top-4 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity duration-1000 group-hover:scale-125 rotate-12">
                         <ActivityIcon className="w-32 h-32" />
                      </div>

                      <div className="space-y-6 relative z-10">
                        <div className="flex items-start justify-between gap-4">
                           <div className="space-y-2 flex-1 min-w-0">
                              <h3 className={cn(
                                "text-2xl font-black italic tracking-tighter truncate lowercase transition-colors",
                                isActive ? "text-primary" : "text-foreground group-hover:text-primary"
                              )}>
                                {proj.projectName || proj.name || 'UNNAMED_SEQ'}<span className="text-primary not-italic">.</span>
                              </h3>
                              <p className="text-xs font-bold text-muted-foreground italic truncate opacity-60">
                                {proj.projectDescription || 'Technical review application'}
                              </p>
                           </div>
                           <div className={cn(
                             "w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500",
                             isActive ? "bg-primary text-white shadow-lg shadow-primary/20" : "bg-secondary/40 text-muted-foreground"
                           )}>
                              {getStatusIcon(projStatus)}
                           </div>
                        </div>

                        <div className="pt-6 border-t border-border/20 flex items-center justify-between">
                           <div className="space-y-1">
                              <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground italic opacity-60">Node Stages</span>
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-black italic">{proj.stages?.length || 0} Modules</span>
                                {isActive && <ChevronRight className="w-4 h-4 text-primary animate-bounce-x" />}
                              </div>
                           </div>
                           {getStatusBadge(projStatus)}
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>

              {/* Mobile Details Intelligence Layer */}
              <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
                 <DialogContent className="max-w-2xl rounded-t-[48px] md:rounded-[56px] border-border/40 bg-background/95 backdrop-blur-3xl p-8 max-h-[90vh] overflow-y-auto shadow-2xl">
                    <DialogHeader className="mb-10 text-center">
                       <DialogTitle className="text-sm font-black uppercase tracking-[0.5em] italic text-primary">System Readout</DialogTitle>
                    </DialogHeader>
                    <ProjectDetails project={selectedProject} isMobile />
                 </DialogContent>
              </Dialog>

              {/* Desktop Details Intelligence Engine */}
              {selectedProject && (
                <div className="hidden lg:block lg:col-span-7 sticky top-32 h-fit">
                   <ProjectDetails project={selectedProject} />
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Neural Network Decoration Layers */}
      <div className="fixed top-0 right-0 -z-20 w-1/2 h-1/2 bg-primary/5 blur-[180px] pointer-events-none rounded-full" />
      <div className="fixed bottom-0 left-0 -z-20 w-1/2 h-1/2 bg-primary/5 blur-[180px] pointer-events-none rounded-full" />
      <Footer />
    </div>
  );
};

const ActivityIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
  </svg>
);

export default OnboardingStatusPage;
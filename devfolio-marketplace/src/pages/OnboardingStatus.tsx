import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { userAPI } from "@/services/auth";

import { toast } from "sonner";
import { ArrowLeft, CheckCircle2, Clock, XCircle, AlertCircle } from "lucide-react";
import Header from "@/components/layout/Header";

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
      // Backend returns array of projects
      const projectsData = Array.isArray(response.data) ? response.data : response.data.requests || [];
      setProjects(projectsData);
      setLastUpdated(new Date());
      
      if (projectsData.length > 0 && !selectedProject) {
        setSelectedProject(projectsData[0]);
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
      if (isManualRefresh) {
        toast.error("Failed to refresh projects");
      }
    } finally {
      setIsRefreshing(false);
      setIsLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchProjects();
    
    // Set up polling every 10 seconds
    const pollInterval = setInterval(() => {
      fetchProjects();
    }, 10000);
    
    // Clean up interval on component unmount
    return () => clearInterval(pollInterval);
  }, []);

  const getStatusIcon = (statusType: string) => {
    switch (statusType) {
      case "approved":
        return <CheckCircle2 className="h-5 w-5 text-success" />;
      case "rejected":
        return <XCircle className="h-5 w-5 text-destructive" />;
      case "in_review":
        return <AlertCircle className="h-5 w-5 text-warning" />;
      default:
        return <Clock className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (statusType: string) => {
    switch (statusType) {
      case "approved":
        return <Badge className="bg-success text-success-foreground">Approved</Badge>;
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>;
      case "in_review":
        return <Badge className="bg-warning text-warning-foreground">In Review</Badge>;
      default:
        return <Badge variant="secondary">Pending</Badge>;
    }
  };

  // Helper function to determine overall status
  const getOverallStatus = (project: any) => {
    if (!project || !project.stages) return 'pending';
    
    const stages = project.stages;
    const completedStages = stages.filter((stage: any) => stage.status === "done").length;
    const totalStages = stages.length || 1;
    const allDone = stages.length > 0 && stages.every((stage: any) => stage.status === "done");
    const anyInProgress = stages.some((stage: any) => stage.status === "in-progress");

    if (allDone) return "approved";
    if (anyInProgress || completedStages > 0) return "in_review";
    return "pending";
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 pt-24 pb-12">
          <div className="max-w-6xl mx-auto space-y-6">
            <div className="h-8 w-48 bg-muted animate-pulse rounded"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-48 bg-muted animate-pulse rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 pt-24 pb-12">
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate(-1)}
                className="rounded-full"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-3xl font-bold">Onboarding Status</h1>
              </div>
            </div>

            <Card className="border-border shadow-sm">
              <CardContent className="pt-8 pb-8 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                  <AlertCircle className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="mt-4 text-lg font-medium text-foreground">No Project Onboarding Found</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  You haven't submitted any project onboarding request yet.
                </p>
                <div className="mt-6 flex justify-center gap-3">
                  <Button 
                    variant="outline" 
                    onClick={() => navigate(-1)}
                  >
                    Go Back
                  </Button>
                  <Button 
                    onClick={() => navigate("/profile")}
                    className="bg-gradient-to-r from-primary to-primary-glow hover:opacity-90"
                  >
                    Request Project Onboarding
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // Get selected project details
  const project = selectedProject;
  const stages = project?.stages || [];
  const completedStages = stages.filter((stage: any) => stage.status === "done").length;
  const totalStages = stages.length || 1;
  const progressPercentage = (completedStages / totalStages) * 100;
  const overallStatus = getOverallStatus(project);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate(-1)}
                className="rounded-full"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-3xl font-bold">Onboarding Status</h1>
                <p className="text-muted-foreground">
                  {lastUpdated && `Last updated: ${lastUpdated.toLocaleTimeString()}`}
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => fetchProjects(true)}
              disabled={isRefreshing}
              className="gap-2"
            >
              {isRefreshing ? 'Refreshing...' : 'Refresh Status'}
              {isRefreshing ? (
                <div className="h-4 w-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-refresh-ccw"
                >
                  <path d="M21 2v6h-6" />
                  <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.68L21 8" />
                  <path d="M3 22v-6h6" />
                  <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.68L3 16" />
                </svg>
              )}
            </Button>
          </div>

          {/* Projects Grid */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Your Onboarding Requests</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {projects.map((proj: any) => {
                const projStatus = getOverallStatus(proj);
                return (
                  <Card
                    key={proj._id || proj.id}
                    className={`border-border shadow-sm cursor-pointer transition-all hover:shadow-md ${
                      selectedProject?._id === proj._id || selectedProject?.id === proj.id
                        ? 'ring-2 ring-primary'
                        : ''
                    }`}
                    onClick={() => setSelectedProject(proj)}
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between gap-2">
                        <CardTitle className="text-base line-clamp-2">
                          {proj.projectName || proj.name || 'Untitled Project'}
                        </CardTitle>
                        {getStatusIcon(projStatus)}
                      </div>
                      <CardDescription className="line-clamp-2">
                        {proj.projectDescription || proj.description || 'No description'}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">
                          {proj.stages?.length || 0} stages
                        </span>
                        {getStatusBadge(projStatus)}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Selected Project Details */}
          {project && (
            <>
              {/* Status Overview */}
              <Card className="border-border shadow-sm">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      {getStatusIcon(overallStatus)}
                      Application Status
                    </CardTitle>
                    {getStatusBadge(overallStatus)}
                  </div>
                  <CardDescription>
                    Submitted on {project.createdAt ? new Date(project.createdAt).toLocaleDateString() : "N/A"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Overall Status</p>
                    <p className="text-base capitalize">{overallStatus.replace("_", " ")}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Progress Tracking */}
              <Card className="border-border shadow-sm">
                <CardHeader>
                  <CardTitle>Progress Tracking</CardTitle>
                  <CardDescription>
                    Completed {completedStages} of {totalStages} stages
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">Overall Progress</span>
                      <span className="text-muted-foreground">{Math.round(progressPercentage)}%</span>
                    </div>
                    <Progress value={progressPercentage} className="h-2" />
                  </div>

                  <div className="space-y-3">
                    <p className="text-sm font-medium">Stages</p>
                    <div className="space-y-2">
                      {stages.map((stage: any) => (
                        <div
                          key={stage.id || stage._id}
                          className="flex items-center justify-between p-3 bg-muted/40 border border-border rounded-lg"
                        >
                          <div>
                            <p className="font-medium">{stage.name}</p>
                            <p className="text-xs text-muted-foreground">{stage.output}</p>
                          </div>
                          <Badge
                            variant={stage.status === "done" ? "default" : stage.status === "in-progress" ? "outline" : "secondary"}
                          >
                            {stage.status.replace("-", " ")}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default OnboardingStatusPage;
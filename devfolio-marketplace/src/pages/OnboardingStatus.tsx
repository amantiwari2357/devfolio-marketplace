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
  const [status, setStatus] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await userAPI.getOnboardingStatus();
        // Backend returns { status: 'none' | 'exists', project }
        setStatus(response.data);
      } catch (error) {
        toast.error("Failed to load onboarding status");
      } finally {
        setIsLoading(false);
      }
    };

    fetchStatus();
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 pt-24 pb-12">
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="h-8 w-48 bg-muted animate-pulse rounded"></div>
            <div className="h-64 bg-muted animate-pulse rounded-lg"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!status || status.status === "none" || !status.project) {

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
              <CardContent className="pt-6 text-center">
                <p className="text-muted-foreground">No onboarding request found</p>
                <Button
                  onClick={() => navigate("/profile")}
                  className="mt-4 bg-gradient-to-r from-primary to-primary-glow"
                >
                  Submit Request
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  const project = status.project;
  const stages = project?.stages || [];
  const completedStages = stages.filter((stage: any) => stage.status === "done").length;
  const totalStages = stages.length || 1;
  const progressPercentage = (completedStages / totalStages) * 100;

  const allDone = stages.length > 0 && stages.every((stage: any) => stage.status === "done");
  const anyInProgress = stages.some((stage: any) => stage.status === "in-progress");

  let overallStatus: "approved" | "rejected" | "in_review" | "pending" = "pending";
  if (allDone) {
    overallStatus = "approved";
  } else if (anyInProgress || completedStages > 0) {
    overallStatus = "in_review";
  }

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
              <p className="text-muted-foreground">Track your professional verification progress</p>
            </div>
          </div>

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
                      key={stage.id}
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
        </div>
      </div>
    </div>
  );
};

export default OnboardingStatusPage;
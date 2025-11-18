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
import { ExternalLink, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";


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

  useEffect(() => {
    const fetchProject = async () => {
      try {
        // Static project data based on id
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate enquiry submission
    toast({
      title: "Enquiry Submitted!",
      description: "We'll get back to you within 24 hours.",
    });
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-center items-center h-64">
              <div className="text-lg">Loading project details...</div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-center items-center h-64">
              <div className="text-lg">Project not found.</div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Project Overview */}
            <div className="lg:col-span-2 space-y-8">
              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center text-4xl">
                      {project.icon}
                    </div>
                    <Badge variant="secondary">{project.pricing}</Badge>
                  </div>
                  <CardTitle className="text-3xl">{project.title}</CardTitle>
                  <CardDescription className="text-lg">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Key Features</h3>
                    <ul className="space-y-2">
                      {project.features?.map((feature: string, index: number) => (
                        <li key={index} className="flex items-start">
                          <span className="text-primary mr-2">✓</span>
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-4">Technologies Used</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies?.map((tech: string, index: number) => (
                        <Badge key={index} variant="outline">{tech}</Badge>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold mb-2">Timeline</h4>
                      <p className="text-muted-foreground">{project.timeline || 'N/A'}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Price Range</h4>
                      <p className="text-muted-foreground">{project.priceRange || 'N/A'}</p>
                    </div>
                  </div>

                  <Button
                    className="w-full"
                    onClick={() => window.open(project.liveUrl, "_blank")}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Live Demo <span className="hidden sm:inline">→</span><span className=" text-color-primary text-2xl font-mono">Free</span>
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Enquiry Form */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Get This Project</CardTitle>
                  <CardDescription>
                    Interested in this project? Send us an enquiry
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        placeholder="Your full name"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Your email address"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+91 (555) 000-0000"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        placeholder="Tell us about your requirements..."
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        rows={4}
                        required
                      />
                    </div>

                    <Button type="submit" className="w-full">
                      Submit Enquiry
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProjectDetail;

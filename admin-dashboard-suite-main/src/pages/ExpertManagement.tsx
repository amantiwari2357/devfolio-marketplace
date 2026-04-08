import { useState, useEffect } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { Menu, Plus, Edit, Trash2, Star, MapPin, Award, Mail, Phone, MessageCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Expert {
  _id: string;
  firstName: string;
  lastName: string;
  role: string;
  profileImage?: string;
  skills: string[];
  bio: string;
  email: string;
  rating?: number;
  connections?: number;
  experience?: string;
  location?: string;
}

interface Enquiry {
  _id: string;
  expertId: string;
  expertName: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  date: string;
  status: "pending" | "contacted" | "closed";
}

const ExpertManagement = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"experts" | "enquiries">("experts");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingExpert, setEditingExpert] = useState<Expert | null>(null);
  const [loading, setLoading] = useState(false);
  const [experts, setExperts] = useState<Expert[]>([]);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [expertsLoading, setExpertsLoading] = useState(true);
  const [enquiriesLoading, setEnquiriesLoading] = useState(true);
  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    role: "",
    skills: "",
    bio: "",
    email: "",
    rating: "",
    connections: "",
    experience: "",
    location: ""
  });

  // Fetch experts on component mount
  useEffect(() => {
    fetchExperts();
  }, []);

  // Fetch enquiries on component mount
  useEffect(() => {
    fetchEnquiries();
  }, []);

  const fetchExperts = async () => {
    try {
      setExpertsLoading(true);
      const response = await fetch('https://devfolio-marketplace-1.onrender.com/api/experts/all');
      if (!response.ok) {
        throw new Error('Failed to fetch experts');
      }
      const data = await response.json();
      setExperts(data.experts || []);
    } catch (error) {
      console.error('Error fetching experts:', error);
      toast.error('Failed to load experts');
    } finally {
      setExpertsLoading(false);
    }
  };

  const fetchEnquiries = async () => {
    try {
      setEnquiriesLoading(true);
      const response = await fetch('https://devfolio-marketplace-1.onrender.com/api/experts/enquiries/all', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch enquiries');
      }
      const data = await response.json();
      setEnquiries(data.enquiries || []);
    } catch (error) {
      console.error('Error fetching enquiries:', error);
      toast.error('Failed to load enquiries');
    } finally {
      setEnquiriesLoading(false);
    }
  };

  const handleAddExpert = () => {
    setEditingExpert(null);
    setFormData({
      firstName: "",
      lastName: "",
      role: "",
      skills: "",
      bio: "",
      email: "",
      rating: "",
      connections: "",
      experience: "",
      location: ""
    });
    setIsDialogOpen(true);
  };

  const handleEditExpert = (expert: Expert) => {
    setEditingExpert(expert);
    setFormData({
      firstName: expert.firstName,
      lastName: expert.lastName,
      role: expert.role,
      skills: expert.skills.join(", "),
      bio: expert.bio,
      email: expert.email,
      rating: expert.rating?.toString() || "",
      connections: expert.connections?.toString() || "",
      experience: expert.experience || "",
      location: expert.location || ""
    });
    setIsDialogOpen(true);
  };

  const handleDeleteExpert = async (id: string) => {
    if (!confirm("Are you sure you want to delete this expert?")) return;

    try {
      setLoading(true);
      const response = await fetch(`https://devfolio-marketplace-1.onrender.com/api/experts/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete expert');
      }

      toast.success("Expert deleted successfully");
      fetchExperts(); // Refresh the list
    } catch (error) {
      console.error('Error deleting expert:', error);
      toast.error('Failed to delete expert');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const expertData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      role: formData.role,
      skills: formData.skills.split(",").map(s => s.trim()).filter(s => s),
      bio: formData.bio,
      email: formData.email,
      rating: formData.rating ? parseFloat(formData.rating) : undefined,
      connections: formData.connections ? parseInt(formData.connections) : undefined,
      experience: formData.experience,
      location: formData.location
    };

    try {
      setLoading(true);
      let response;

      if (editingExpert) {
        // Update existing expert
        response = await fetch(`https://devfolio-marketplace-1.onrender.com/api/experts/${editingExpert._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify(expertData),
        });
      } else {
        // Create new expert
        response = await fetch('https://devfolio-marketplace-1.onrender.com/api/experts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify(expertData),
        });
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to save expert');
      }

      const data = await response.json();
      toast.success(editingExpert ? "Expert updated successfully" : "Expert added successfully");
      setIsDialogOpen(false);
      fetchExperts(); // Refresh the list
    } catch (error) {
      console.error('Error saving expert:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to save expert');
    } finally {
      setLoading(false);
    }
  };

  const handleEnquiryStatusChange = async (id: string, status: "pending" | "contacted" | "closed") => {
    try {
      setLoading(true);
      const response = await fetch(`https://devfolio-marketplace-1.onrender.com/api/experts/enquiries/${id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        throw new Error('Failed to update enquiry status');
      }

      toast.success(`Enquiry status updated to ${status}`);
      fetchEnquiries(); // Refresh the list
    } catch (error) {
      console.error('Error updating enquiry status:', error);
      toast.error('Failed to update enquiry status');
    } finally {
      setLoading(false);
    }
  };

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
            {/* Tabs */}
            <div className="flex gap-2 mb-6">
              <Button
                variant={activeTab === "experts" ? "default" : "outline"}
                onClick={() => setActiveTab("experts")}
                className="rounded-xl font-bold text-[10px] uppercase tracking-widest h-10 px-5"
              >
                Nodes ({experts.length})
              </Button>
              <Button
                variant={activeTab === "enquiries" ? "default" : "outline"}
                onClick={() => setActiveTab("enquiries")}
                className="rounded-xl font-bold text-[10px] uppercase tracking-widest h-10 px-5"
              >
                Influx ({enquiries.filter(e => e.status === "pending").length})
              </Button>
            </div>

            {/* Experts Tab */}
            {activeTab === "experts" && (
              <div className="space-y-6">
                <div className="flex justify-end">
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <Button onClick={handleAddExpert} className="h-10 px-6 rounded-xl border-border/50 font-bold text-[10px] uppercase tracking-widest gap-2">
                        <Plus className="w-4 h-4" />
                        Initialize Expert Node
                      </Button>
                    </DialogTrigger>
                    {/* ... Dialog ... */}
                  </Dialog>
                </div>

                {expertsLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    <span className="ml-3 font-bold uppercase tracking-widest text-sm italic">Accessing Knowledge Base...</span>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {experts.map((expert) => (
                      <Card key={expert._id} className="p-4 md:p-6 border-border/50 bg-background/50 hover:shadow-xl transition-all group relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -translate-y-12 translate-x-12 blur-2xl group-hover:bg-primary/10 transition-colors" />
                        
                        <div className="flex items-start justify-between mb-4 relative z-10">
                          <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-primary/20 to-purple-400/10 rounded-xl flex items-center justify-center text-primary text-lg md:text-2xl font-black italic border border-primary/20">
                            {expert.firstName[0]}{expert.lastName[0]}
                          </div>
                          <div className="flex gap-1 md:gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleEditExpert(expert)}
                              className="h-8 w-8 rounded-lg"
                              disabled={loading}
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDeleteExpert(expert._id)}
                              className="h-8 w-8 rounded-lg text-destructive hover:bg-destructive/10"
                              disabled={loading}
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </Button>
                          </div>
                        </div>

                        <h3 className="text-sm md:text-lg font-black text-foreground mb-0.5 tracking-tighter italic uppercase">
                          {expert.firstName} {expert.lastName}
                        </h3>
                        <p className="text-[10px] md:text-xs text-primary font-black uppercase tracking-widest mb-4 opacity-80 italic">{expert.role}</p>

                        <div className="flex items-center gap-3 mb-4 text-[10px] md:text-xs">
                          {expert.rating && (
                            <div className="flex items-center gap-1 font-bold text-foreground">
                              <Star className="w-3 h-3 fill-primary text-primary" />
                              <span>{expert.rating}</span>
                            </div>
                          )}
                          {expert.connections && (
                            <div className="flex items-center gap-1 font-bold text-muted-foreground">
                              <MessageCircle className="w-3 h-3" />
                              <span>{expert.connections}</span>
                            </div>
                          )}
                        </div>

                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {expert.skills.slice(0, 2).map((skill, idx) => (
                            <span key={idx} className="px-2 py-0.5 bg-secondary/50 border border-border/30 text-muted-foreground rounded text-[9px] font-bold uppercase tracking-tighter">
                              {skill}
                            </span>
                          ))}
                          {expert.skills.length > 2 && (
                            <span className="px-2 py-0.5 bg-secondary/50 border border-border/30 text-muted-foreground rounded text-[9px] font-bold uppercase tracking-tighter">
                              +{expert.skills.length - 2}
                            </span>
                          )}
                        </div>

                        <p className="text-xs text-muted-foreground/80 line-clamp-2 italic font-medium leading-relaxed">{expert.bio}</p>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Enquiries Tab */}
            {activeTab === "enquiries" && (
              <div className="space-y-6">
                <div className="px-1">
                   <h2 className="text-sm md:text-xl font-black tracking-tighter text-foreground italic uppercase">Signal Influx / Enquiries</h2>
                   <p className="text-[10px] md:text-xs font-bold text-muted-foreground/60 uppercase tracking-[0.2em] mt-1">Live Connection Requests Matrix</p>
                </div>
                {enquiriesLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    <span className="ml-3 font-bold uppercase tracking-widest text-sm italic">Extracting Log Data...</span>
                  </div>
                ) : (
                  <div className="grid gap-4 md:gap-6">
                    {enquiries.map((enquiry) => (
                      <Card key={enquiry._id} className="p-4 md:p-6 border-border/50 bg-background/50">
                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                          <div>
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-lg font-black tracking-tighter italic uppercase">{enquiry.name}</h3>
                              <Badge className={cn("rounded-full text-[9px] font-black uppercase tracking-widest h-5", 
                                enquiry.status === "pending" ? "bg-yellow-500/10 text-yellow-600 border-yellow-500/20" : 
                                enquiry.status === "contacted" ? "bg-blue-500/10 text-blue-600 border-blue-500/20" : 
                                "bg-green-500/10 text-green-600 border-green-500/20"
                              )}>
                                {enquiry.status}
                              </Badge>
                            </div>
                            <p className="text-[10px] md:text-sm text-muted-foreground font-bold uppercase tracking-wider mb-1">
                              Target Node: <span className="text-primary italic">{enquiry.expertName}</span>
                            </p>
                            <p className="text-[9px] text-muted-foreground/60 font-bold uppercase tracking-widest italic">{enquiry.date}</p>
                          </div>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-3 mb-6">
                          <div className="flex items-center gap-3 p-3 rounded-xl bg-secondary/5 border border-border/20">
                            <Mail className="w-4 h-4 text-primary" />
                            <span className="text-xs font-bold truncate">{enquiry.email}</span>
                          </div>
                          <div className="flex items-center gap-3 p-3 rounded-xl bg-secondary/5 border border-border/20">
                            <Phone className="w-4 h-4 text-primary" />
                            <span className="text-xs font-bold">{enquiry.phone}</span>
                          </div>
                        </div>

                        <div className="bg-secondary/10 p-4 rounded-2xl mb-6 border border-border/20">
                          <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest mb-2 opacity-60">Message Content</p>
                          <p className="text-sm text-foreground/80 leading-relaxed font-medium italic italic">{enquiry.message}</p>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {["pending", "contacted", "closed"].map((status) => (
                            <Button
                              key={status}
                              size="sm"
                              variant={enquiry.status === status ? "default" : "outline"}
                              onClick={() => handleEnquiryStatusChange(enquiry._id, status as any)}
                              className="rounded-xl font-bold text-[9px] uppercase tracking-widest h-8 px-4"
                              disabled={loading}
                            >
                              {status}
                            </Button>
                          ))}
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ExpertManagement;

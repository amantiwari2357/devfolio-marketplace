import { useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { Menu, Plus, Edit, Trash2, Star, MapPin, Award, Mail, Phone, MessageCircle } from "lucide-react";
import { toast } from "sonner";

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

  const handleDeleteExpert = (id: string) => {
    if (confirm("Are you sure you want to delete this expert?")) {
      setExperts(experts.filter(e => e._id !== id));
      toast.success("Expert deleted successfully");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const expertData: Expert = {
      _id: editingExpert?._id || Date.now().toString(),
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

    if (editingExpert) {
      setExperts(experts.map(e => e._id === editingExpert._id ? expertData : e));
      toast.success("Expert updated successfully");
    } else {
      setExperts([...experts, expertData]);
      toast.success("Expert added successfully");
    }

    setIsDialogOpen(false);
  };

  const handleEnquiryStatusChange = (id: string, status: "pending" | "contacted" | "closed") => {
    setEnquiries(enquiries.map(e => e._id === id ? { ...e, status } : e));
    toast.success(`Enquiry status updated to ${status}`);
  };

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <main className="flex-1 lg:ml-64 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-3xl font-bold text-foreground">Expert Management</h1>
                <p className="text-muted-foreground">Manage experts and their connection requests</p>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-6">
            <Button
              variant={activeTab === "experts" ? "default" : "outline"}
              onClick={() => setActiveTab("experts")}
            >
              Experts ({experts.length})
            </Button>
            <Button
              variant={activeTab === "enquiries" ? "default" : "outline"}
              onClick={() => setActiveTab("enquiries")}
            >
              Enquiries ({enquiries.filter(e => e.status === "pending").length} pending)
            </Button>
          </div>

          {/* Experts Tab */}
          {activeTab === "experts" && (
            <div>
              <div className="flex justify-end mb-6">
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button onClick={handleAddExpert} className="gap-2">
                      <Plus className="w-4 h-4" />
                      Add New Expert
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>
                        {editingExpert ? "Edit Expert" : "Add New Expert"}
                      </DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>First Name *</Label>
                          <Input
                            value={formData.firstName}
                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                            required
                          />
                        </div>
                        <div>
                          <Label>Last Name *</Label>
                          <Input
                            value={formData.lastName}
                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <Label>Role / Title *</Label>
                        <Input
                          value={formData.role}
                          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                          placeholder="e.g., Senior Software Engineer"
                          required
                        />
                      </div>

                      <div>
                        <Label>Email *</Label>
                        <Input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          required
                        />
                      </div>

                      <div>
                        <Label>Skills (comma-separated) *</Label>
                        <Input
                          value={formData.skills}
                          onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                          placeholder="JavaScript, React, Node.js"
                          required
                        />
                      </div>

                      <div>
                        <Label>Bio / Description *</Label>
                        <Textarea
                          value={formData.bio}
                          onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                          rows={4}
                          required
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Experience</Label>
                          <Input
                            value={formData.experience}
                            onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                            placeholder="5+ years"
                          />
                        </div>
                        <div>
                          <Label>Location</Label>
                          <Input
                            value={formData.location}
                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                            placeholder="Bangalore, India"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Rating (0-5)</Label>
                          <Input
                            type="number"
                            step="0.1"
                            min="0"
                            max="5"
                            value={formData.rating}
                            onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                            placeholder="4.8"
                          />
                        </div>
                        <div>
                          <Label>Connections</Label>
                          <Input
                            type="number"
                            value={formData.connections}
                            onChange={(e) => setFormData({ ...formData, connections: e.target.value })}
                            placeholder="342"
                          />
                        </div>
                      </div>

                      <Button type="submit" className="w-full">
                        {editingExpert ? "Update Expert" : "Add Expert"}
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {experts.map((expert) => (
                  <Card key={expert._id} className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-primary to-purple-400 rounded-xl flex items-center justify-center text-primary-foreground text-2xl font-bold">
                        {expert.firstName[0]}{expert.lastName[0]}
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEditExpert(expert)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteExpert(expert._id)}
                        >
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-foreground mb-1">
                      {expert.firstName} {expert.lastName}
                    </h3>
                    <p className="text-sm text-primary font-semibold mb-3">{expert.role}</p>

                    <div className="flex items-center gap-4 mb-3 text-sm text-muted-foreground">
                      {expert.rating && (
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span>{expert.rating}</span>
                        </div>
                      )}
                      {expert.connections && (
                        <div className="flex items-center gap-1">
                          <MessageCircle className="w-4 h-4" />
                          <span>{expert.connections}</span>
                        </div>
                      )}
                    </div>

                    {expert.location && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                        <MapPin className="w-4 h-4" />
                        <span>{expert.location}</span>
                      </div>
                    )}

                    {expert.experience && (
                      <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold mb-3">
                        <Award className="w-3 h-3" />
                        {expert.experience}
                      </div>
                    )}

                    <div className="flex flex-wrap gap-2 mb-3">
                      {expert.skills.slice(0, 3).map((skill, idx) => (
                        <span key={idx} className="px-2 py-1 bg-secondary text-secondary-foreground rounded text-xs">
                          {skill}
                        </span>
                      ))}
                      {expert.skills.length > 3 && (
                        <span className="px-2 py-1 bg-secondary text-secondary-foreground rounded text-xs">
                          +{expert.skills.length - 3}
                        </span>
                      )}
                    </div>

                    <p className="text-sm text-muted-foreground line-clamp-2">{expert.bio}</p>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Enquiries Tab */}
          {activeTab === "enquiries" && (
            <div className="space-y-4">
              {enquiries.map((enquiry) => (
                <Card key={enquiry._id} className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-bold text-foreground">{enquiry.name}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          enquiry.status === "pending" 
                            ? "bg-yellow-100 text-yellow-700" 
                            : enquiry.status === "contacted"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-green-100 text-green-700"
                        }`}>
                          {enquiry.status}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">
                        For: <span className="font-semibold text-foreground">{enquiry.expertName}</span>
                      </p>
                      <p className="text-xs text-muted-foreground">Date: {enquiry.date}</p>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <span className="text-foreground">{enquiry.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <span className="text-foreground">{enquiry.phone}</span>
                    </div>
                  </div>

                  <div className="bg-secondary/50 p-4 rounded-lg mb-4">
                    <p className="text-sm font-semibold text-foreground mb-1">Message:</p>
                    <p className="text-sm text-muted-foreground">{enquiry.message}</p>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant={enquiry.status === "pending" ? "default" : "outline"}
                      onClick={() => handleEnquiryStatusChange(enquiry._id, "pending")}
                    >
                      Pending
                    </Button>
                    <Button
                      size="sm"
                      variant={enquiry.status === "contacted" ? "default" : "outline"}
                      onClick={() => handleEnquiryStatusChange(enquiry._id, "contacted")}
                    >
                      Contacted
                    </Button>
                    <Button
                      size="sm"
                      variant={enquiry.status === "closed" ? "default" : "outline"}
                      onClick={() => handleEnquiryStatusChange(enquiry._id, "closed")}
                    >
                      Closed
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ExpertManagement;    
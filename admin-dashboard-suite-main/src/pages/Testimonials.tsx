import { useState, useEffect } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, Plus, Edit, Trash2, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Testimonial {
  _id: string;
  quote: string;
  author: string;
  role: string;
  isActive: boolean;
  createdAt: string;
}

const Testimonials = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [formData, setFormData] = useState({
    quote: '',
    author: '',
    role: ''
  });
  const { toast } = useToast();

  const fetchTestimonials = async () => {
    try {
      const response = await fetch('https://devfolio-marketplace-1.onrender.com/api/testimonials/admin');
      const data = await response.json();
      setTestimonials(data.testimonials);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      toast({
        title: "Error",
        description: "Failed to fetch testimonials",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingTestimonial
        ? `https://devfolio-marketplace-1.onrender.com/api/testimonials/${editingTestimonial._id}`
        : 'https://devfolio-marketplace-1.onrender.com/api/testimonials';

      const method = editingTestimonial ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: `Testimonial ${editingTestimonial ? 'updated' : 'created'} successfully`,
        });
        setDialogOpen(false);
        setEditingTestimonial(null);
        setFormData({ quote: '', author: '', role: '' });
        fetchTestimonials();
      } else {
        throw new Error('Failed to save testimonial');
      }
    } catch (error) {
      console.error('Error saving testimonial:', error);
      toast({
        title: "Error",
        description: "Failed to save testimonial",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial);
    setFormData({
      quote: testimonial.quote,
      author: testimonial.author,
      role: testimonial.role,
    });
    setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return;

    try {
      const response = await fetch(`https://devfolio-marketplace-1.onrender.com/api/testimonials/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: "Testimonial deleted successfully",
        });
        fetchTestimonials();
      } else {
        throw new Error('Failed to delete testimonial');
      }
    } catch (error) {
      console.error('Error deleting testimonial:', error);
      toast({
        title: "Error",
        description: "Failed to delete testimonial",
        variant: "destructive",
      });
    }
  };

  const handleToggleStatus = async (id: string) => {
    try {
      const response = await fetch(`https://devfolio-marketplace-1.onrender.com/api/testimonials/${id}/toggle`, {
        method: 'PATCH',
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: "Testimonial status updated successfully",
        });
        fetchTestimonials();
      } else {
        throw new Error('Failed to update testimonial status');
      }
    } catch (error) {
      console.error('Error updating testimonial status:', error);
      toast({
        title: "Error",
        description: "Failed to update testimonial status",
        variant: "destructive",
      });
    }
  };

  const getStatusBadge = (isActive: boolean) => {
    return (
      <Badge variant={isActive ? "default" : "secondary"}>
        {isActive ? "Active" : "Pending"}
      </Badge>
    );
  };

  const openCreateDialog = () => {
    setEditingTestimonial(null);
    setFormData({ quote: '', author: '', role: '' });
    setDialogOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="flex-1 flex flex-col">
          <DashboardHeader onMenuClick={() => setSidebarOpen(true)} />
          <main className="flex-1 p-6 overflow-auto">
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          </main>
        </div>
      </div>
    );
  }

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
                <h1 className="text-xl md:text-3xl font-black tracking-tighter text-foreground italic uppercase">V_Node / Client Recognition</h1>
                <p className="text-[10px] md:text-xs font-bold text-muted-foreground/60 uppercase tracking-[0.2em] mt-1 shadow-sm">Global Credit Distribution & Approval Matrix</p>
              </div>
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={openCreateDialog} className="gap-2 font-black uppercase italic tracking-widest text-[10px] px-6 h-10 shadow-lg shadow-primary/20">
                    <Plus className="w-4 h-4 mr-2" />
                    Initialize_Endorsement
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle className="font-black uppercase tracking-tighter italic text-xl">
                      {editingTestimonial ? 'Update_Sequence' : 'Add_New_Endorsement'}
                    </DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleSubmit} className="space-y-4 pt-4">
                    <div className="space-y-2">
                      <Label htmlFor="quote" className="font-bold uppercase tracking-widest text-[10px] italic">Context_Matrix</Label>
                      <Textarea
                        id="quote"
                        value={formData.quote}
                        onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                        placeholder="Define the recognition parameters"
                        required
                        className="bg-muted/10 border-border/30 h-32"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="author" className="font-bold uppercase tracking-widest text-[10px] italic">Entity_ID</Label>
                        <Input
                          id="author"
                          value={formData.author}
                          onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                          placeholder="Client_Name"
                          required
                          className="bg-muted/10 border-border/30 h-10"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="role" className="font-bold uppercase tracking-widest text-[10px] italic">Protocol_Designation</Label>
                        <Input
                          id="role"
                          value={formData.role}
                          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                          placeholder="Role_ID"
                          required
                          className="bg-muted/10 border-border/30 h-10"
                        />
                      </div>
                    </div>
                    <div className="flex justify-end gap-3 pt-6 border-t border-border/10">
                      <Button type="button" variant="ghost" onClick={() => setDialogOpen(false)} className="font-bold uppercase tracking-widest text-[10px] italic">
                        Abort
                      </Button>
                      <Button type="submit" className="font-black uppercase tracking-widest text-[10px] italic px-6">
                        {editingTestimonial ? 'Sync_Update' : 'Commit_Endorsement'}
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card className="border-border/50 shadow-sm relative overflow-hidden">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-4 md:px-6">
                  <CardTitle className="text-[10px] md:text-xs font-black uppercase tracking-widest text-muted-foreground italic">Metric / Total</CardTitle>
                  <MessageSquare className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent className="px-4 md:px-6 pb-4">
                  <div className="text-xl md:text-3xl font-black tracking-tighter text-foreground italic">E_{testimonials.length}</div>
                  <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-tighter mt-1">Total Endorsements</p>
                </CardContent>
              </Card>

              <Card className="border-border/50 shadow-sm relative overflow-hidden">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-4 md:px-6">
                  <CardTitle className="text-[10px] md:text-xs font-black uppercase tracking-widest text-muted-foreground italic">Status / Valid</CardTitle>
                  <Eye className="h-4 w-4 text-green-500" />
                </CardHeader>
                <CardContent className="px-4 md:px-6 pb-4">
                  <div className="text-xl md:text-3xl font-black tracking-tighter text-green-500 italic">V_{testimonials.filter(t => t.isActive).length}</div>
                  <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-tighter mt-1">Verified Nodes</p>
                </CardContent>
              </Card>

              <Card className="col-span-2 lg:col-span-1 border-border/50 shadow-sm relative overflow-hidden">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-4 md:px-6">
                  <CardTitle className="text-[10px] md:text-xs font-black uppercase tracking-widest text-muted-foreground italic">Status / Pending</CardTitle>
                  <EyeOff className="h-4 w-4 text-muted-foreground/40" />
                </CardHeader>
                <CardContent className="px-4 md:px-6 pb-4">
                  <div className="text-xl md:text-3xl font-black tracking-tighter text-muted-foreground/40 italic">P_{testimonials.filter(t => !t.isActive).length}</div>
                  <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-tighter mt-1">Pending Approval</p>
                </CardContent>
              </Card>
            </div>

            <Card className="border-border/50 shadow-md overflow-hidden">
              <CardHeader className="px-4 md:px-6 py-5 border-b border-border/30 bg-secondary/10">
                <CardTitle className="text-lg md:text-xl font-black tracking-tighter text-foreground italic uppercase">Endorsement / Registry</CardTitle>
                <p className="text-[10px] md:text-xs font-bold text-muted-foreground/60 uppercase tracking-[0.2em] mt-1">Consolidated Feedback Grid</p>
              </CardHeader>
              <CardContent className="p-4 md:p-6 pb-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {testimonials.map((testimonial) => (
                    <div
                      key={testimonial._id}
                      className="p-5 rounded-xl bg-muted/20 border border-border/10 hover:border-border/30 transition-all group flex flex-col justify-between"
                    >
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-black text-sm uppercase tracking-tight italic text-foreground group-hover:text-primary transition-colors">{testimonial.author}</div>
                            <div className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest mt-0.5">{testimonial.role}</div>
                          </div>
                          <div className="-mt-1">
                            {getStatusBadge(testimonial.isActive)}
                          </div>
                        </div>
                        <div className="text-xs font-medium leading-relaxed text-muted-foreground/80 relative">
                          <span className="text-2xl font-serif text-primary/10 absolute -top-2 -left-2 leading-none">"</span>
                          <span className="relative z-10 line-clamp-3 italic">{testimonial.quote}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 mt-6 pt-4 border-t border-border/10">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 hover:bg-primary/10 hover:text-primary transition-all rounded-lg"
                          onClick={() => handleToggleStatus(testimonial._id)}
                        >
                          {testimonial.isActive ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 hover:bg-blue-500/10 hover:text-blue-500 transition-all rounded-lg"
                          onClick={() => handleEdit(testimonial)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive transition-all rounded-lg"
                          onClick={() => handleDelete(testimonial._id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  {testimonials.length === 0 && (
                    <div className="col-span-full text-center py-20">
                      <MessageSquare className="w-16 h-16 text-muted-foreground/10 mx-auto mb-4" />
                      <p className="text-[10px] font-black uppercase tracking-widest italic text-muted-foreground/60">
                        Protocol Null: No endorsements found.
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Testimonials;

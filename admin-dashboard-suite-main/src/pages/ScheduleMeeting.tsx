import { useState } from "react";
import { Menu } from "lucide-react";
import Sidebar from "@/components/dashboard/Sidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Clock,
  Plus,
  Search,
  Filter,
  Video,
  Phone,
  MapPin,
  Users,
  FileText,
  CheckCircle2,
  XCircle,
  AlertCircle,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Meeting {
  id: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  title: string;
  type: "Zoom" | "Google Meet" | "Phone" | "In-Person";
  date: string;
  time: string;
  duration: string;
  link: string;
  reminder: string;
  leadProject: string;
  assignedTo: string;
  status: "Scheduled" | "Confirmed" | "Completed" | "Cancelled" | "No-Show";
  notes: string;
  attended: boolean | null;
}

const mockClients = [
  { id: "1", name: "John Doe", email: "john@example.com", phone: "+91 98765 43210" },
  { id: "2", name: "Jane Smith", email: "jane@example.com", phone: "+91 98765 43211" },
  { id: "3", name: "Bob Johnson", email: "bob@example.com", phone: "+91 98765 43212" },
];

const mockLeads = [
  { id: "1", name: "Website Redesign" },
  { id: "2", name: "Mobile App Development" },
  { id: "3", name: "SEO Consultation" },
];

const mockEmployees = [
  { id: "1", name: "Admin" },
  { id: "2", name: "Sales Manager" },
  { id: "3", name: "Project Manager" },
];

const ScheduleMeeting = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [meetings, setMeetings] = useState<Meeting[]>([
    {
      id: "1",
      clientName: "John Doe",
      clientEmail: "john@example.com",
      clientPhone: "+91 98765 43210",
      title: "Project Discussion",
      type: "Zoom",
      date: "2024-01-25",
      time: "10:00",
      duration: "60",
      link: "https://zoom.us/j/123456789",
      reminder: "1hr",
      leadProject: "Website Redesign",
      assignedTo: "Sales Manager",
      status: "Scheduled",
      notes: "",
      attended: null,
    },
  ]);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingMeeting, setEditingMeeting] = useState<Meeting | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterClient, setFilterClient] = useState<string>("all");

  const [formData, setFormData] = useState({
    clientId: "",
    title: "",
    type: "Zoom" as Meeting["type"],
    date: "",
    time: "",
    duration: "30",
    link: "",
    reminder: "1hr",
    leadProject: "",
    assignedTo: "",
    notes: "",
  });

  const handleClientSelect = (clientId: string) => {
    const client = mockClients.find((c) => c.id === clientId);
    setFormData((prev) => ({ ...prev, clientId }));
  };

  const selectedClient = mockClients.find((c) => c.id === formData.clientId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedClient) return;

    const newMeeting: Meeting = {
      id: editingMeeting?.id || Date.now().toString(),
      clientName: selectedClient.name,
      clientEmail: selectedClient.email,
      clientPhone: selectedClient.phone,
      title: formData.title,
      type: formData.type,
      date: formData.date,
      time: formData.time,
      duration: formData.duration,
      link: formData.link,
      reminder: formData.reminder,
      leadProject: formData.leadProject,
      assignedTo: formData.assignedTo,
      status: editingMeeting?.status || "Scheduled",
      notes: formData.notes,
      attended: editingMeeting?.attended || null,
    };

    if (editingMeeting) {
      setMeetings(meetings.map((m) => (m.id === editingMeeting.id ? newMeeting : m)));
    } else {
      setMeetings([...meetings, newMeeting]);
    }

    setDialogOpen(false);
    setEditingMeeting(null);
    setFormData({
      clientId: "",
      title: "",
      type: "Zoom",
      date: "",
      time: "",
      duration: "30",
      link: "",
      reminder: "1hr",
      leadProject: "",
      assignedTo: "",
      notes: "",
    });
  };

  const handleEdit = (meeting: Meeting) => {
    setEditingMeeting(meeting);
    setFormData({
      clientId: mockClients.find((c) => c.name === meeting.clientName)?.id || "",
      title: meeting.title,
      type: meeting.type,
      date: meeting.date,
      time: meeting.time,
      duration: meeting.duration,
      link: meeting.link,
      reminder: meeting.reminder,
      leadProject: meeting.leadProject,
      assignedTo: meeting.assignedTo,
      notes: meeting.notes,
    });
    setDialogOpen(true);
  };

  const handleStatusChange = (id: string, status: Meeting["status"]) => {
    setMeetings(meetings.map((m) => (m.id === id ? { ...m, status } : m)));
  };

  const handleDelete = (id: string) => {
    setMeetings(meetings.filter((m) => m.id !== id));
  };

  const filteredMeetings = meetings.filter((meeting) => {
    const matchesSearch =
      meeting.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      meeting.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || meeting.status === filterStatus;
    const matchesClient = filterClient === "all" || meeting.clientName === filterClient;
    return matchesSearch && matchesStatus && matchesClient;
  });

  const getStatusIcon = (status: Meeting["status"]) => {
    switch (status) {
      case "Confirmed":
        return <CheckCircle2 className="w-4 h-4 text-green-500" />;
      case "Completed":
        return <CheckCircle2 className="w-4 h-4 text-blue-500" />;
      case "Cancelled":
        return <XCircle className="w-4 h-4 text-red-500" />;
      case "No-Show":
        return <AlertCircle className="w-4 h-4 text-orange-500" />;
      default:
        return <Clock className="w-4 h-4 text-yellow-500" />;
    }
  };

  const getTypeIcon = (type: Meeting["type"]) => {
    switch (type) {
      case "Zoom":
      case "Google Meet":
        return <Video className="w-4 h-4" />;
      case "Phone":
        return <Phone className="w-4 h-4" />;
      case "In-Person":
        return <MapPin className="w-4 h-4" />;
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
            
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h1 className="text-xl md:text-3xl font-black tracking-tighter text-foreground italic uppercase">V_Node / Chronos Interface</h1>
                <p className="text-[10px] md:text-xs font-bold text-muted-foreground/60 uppercase tracking-[0.2em] mt-1 shadow-sm">Global Temporal Sync & Engagement Protocol</p>
              </div>
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={() => setEditingMeeting(null)} className="gap-2 font-black uppercase italic tracking-widest text-[10px] px-6 h-10 shadow-lg shadow-primary/20">
                    <Plus className="w-4 h-4" />
                    Initialize_Session
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="font-black uppercase tracking-tighter italic text-xl">
                      {editingMeeting ? 'Update_Interval' : 'Schedule_New_Nexus'}
                    </DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleSubmit} className="space-y-6 pt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2 space-y-2">
                        <Label htmlFor="client" className="font-bold uppercase tracking-widest text-[10px] italic">Entity_ID *</Label>
                        <Select
                          value={formData.clientId}
                          onValueChange={handleClientSelect}
                          required
                        >
                          <SelectTrigger className="bg-muted/10 border-border/30 h-10">
                            <SelectValue placeholder="Select client entry" />
                          </SelectTrigger>
                          <SelectContent>
                            {mockClients.map((client) => (
                              <SelectItem key={client.id} value={client.id}>
                                {client.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label className="font-bold uppercase tracking-widest text-[10px] italic opacity-50">Transmission_Protocol *</Label>
                        <Select
                          value={formData.type}
                          onValueChange={(value: Meeting["type"]) =>
                            setFormData({ ...formData, type: value })
                          }
                        >
                          <SelectTrigger className="bg-muted/10 border-border/30 h-10">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Zoom">Zoom_Interface</SelectItem>
                            <SelectItem value="Google Meet">G_Meet_Proxy</SelectItem>
                            <SelectItem value="Phone">Audio_Link</SelectItem>
                            <SelectItem value="In-Person">Physical_Nexus</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label className="font-bold uppercase tracking-widest text-[10px] italic opacity-50">Temporal_Duration *</Label>
                        <Select
                          value={formData.duration}
                          onValueChange={(value) =>
                            setFormData({ ...formData, duration: value })
                          }
                        >
                          <SelectTrigger className="bg-muted/10 border-border/30 h-10">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="15">0.25 Units (15m)</SelectItem>
                            <SelectItem value="30">0.50 Units (30m)</SelectItem>
                            <SelectItem value="60">1.00 Unit (1h)</SelectItem>
                            <SelectItem value="90">1.50 Units (1.5h)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="date" className="font-bold uppercase tracking-widest text-[10px] italic">Nexus_Date *</Label>
                        <Input
                          id="date"
                          type="date"
                          value={formData.date}
                          onChange={(e) =>
                            setFormData({ ...formData, date: e.target.value })
                          }
                          required
                          className="bg-muted/10 border-border/30 h-10"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="time" className="font-bold uppercase tracking-widest text-[10px] italic">Nexus_Time *</Label>
                        <Input
                          id="time"
                          type="time"
                          value={formData.time}
                          onChange={(e) =>
                            setFormData({ ...formData, time: e.target.value })
                          }
                          required
                          className="bg-muted/10 border-border/30 h-10"
                        />
                      </div>

                      <div className="md:col-span-2 space-y-2">
                        <Label htmlFor="title" className="font-bold uppercase tracking-widest text-[10px] italic">nexus_Designation *</Label>
                        <Input
                          id="title"
                          placeholder="Project_Deep_Dive_Alpha"
                          value={formData.title}
                          onChange={(e) =>
                            setFormData({ ...formData, title: e.target.value })
                          }
                          required
                          className="bg-muted/10 border-border/30 h-10"
                        />
                      </div>

                      <div className="md:col-span-2 space-y-2">
                        <Label htmlFor="link" className="font-bold uppercase tracking-widest text-[10px] italic">Access_Bridge</Label>
                        <Input
                          id="link"
                          value={formData.link}
                          onChange={(e) =>
                            setFormData({ ...formData, link: e.target.value })
                          }
                          placeholder="https://zoom.us/nexus/..."
                          className="bg-muted/10 border-border/30 h-10"
                        />
                      </div>
                    </div>

                    <div className="flex gap-3 pt-6 border-t border-border/10">
                      <Button
                        type="submit"
                        className="flex-1 font-black uppercase tracking-widest text-[10px] italic h-11"
                      >
                        {editingMeeting ? "Sync_Interval" : "Commit_Nexus"}
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={() => setDialogOpen(false)}
                        className="font-bold uppercase tracking-widest text-[10px] italic"
                      >
                        Abort
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            {/* Stats Matrix */}
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="border-border/50 shadow-sm relative overflow-hidden group">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-4 md:px-6">
                  <CardTitle className="text-[10px] md:text-xs font-black uppercase tracking-widest text-muted-foreground italic">Nexus / Total</CardTitle>
                  <Calendar className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent className="px-4 md:px-6 pb-4">
                  <div className="text-xl md:text-3xl font-black tracking-tighter text-foreground italic">N_{meetings.length}</div>
                </CardContent>
              </Card>

              <Card className="border-border/50 shadow-sm relative overflow-hidden group">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-4 md:px-6">
                  <CardTitle className="text-[10px] md:text-xs font-black uppercase tracking-widest text-muted-foreground italic">Sync / Active</CardTitle>
                  <Clock className="h-4 w-4 text-yellow-500" />
                </CardHeader>
                <CardContent className="px-4 md:px-6 pb-4">
                  <div className="text-xl md:text-3xl font-black tracking-tighter text-yellow-500 italic">S_{meetings.filter((m) => m.status === "Scheduled").length}</div>
                </CardContent>
              </Card>

              <Card className="border-border/50 shadow-sm relative overflow-hidden group">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-4 md:px-6">
                  <CardTitle className="text-[10px] md:text-xs font-black uppercase tracking-widest text-muted-foreground italic">Sync / Confirmed</CardTitle>
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                </CardHeader>
                <CardContent className="px-4 md:px-6 pb-4">
                  <div className="text-xl md:text-3xl font-black tracking-tighter text-green-500 italic">V_{meetings.filter((m) => m.status === "Confirmed").length}</div>
                </CardContent>
              </Card>

              <Card className="border-border/50 shadow-sm relative overflow-hidden group">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-4 md:px-6">
                  <CardTitle className="text-[10px] md:text-xs font-black uppercase tracking-widest text-muted-foreground italic">Sync / Failed</CardTitle>
                  <AlertCircle className="h-4 w-4 text-red-500" />
                </CardHeader>
                <CardContent className="px-4 md:px-6 pb-4">
                  <div className="text-xl md:text-3xl font-black tracking-tighter text-red-500 italic">F_{meetings.filter((m) => m.status === "No-Show" || m.status === "Cancelled").length}</div>
                </CardContent>
              </Card>
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="relative flex-1 w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/40" />
                <Input
                  placeholder="Scan Temporal Registry..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-muted/10 border-border/30 h-11 text-xs font-bold uppercase italic tracking-widest"
                />
              </div>
              <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-1 no-scrollbar">
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-[140px] h-11 bg-card border-border/30 text-[10px] font-black uppercase tracking-tighter italic">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Protocol_All</SelectItem>
                    <SelectItem value="Scheduled">Scheduled</SelectItem>
                    <SelectItem value="Confirmed">Confirmed</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* View Architecture */}
            <Tabs defaultValue="list" className="w-full">
              <div className="flex justify-between items-center mb-6 border-b border-border/10 pb-2">
                <TabsList className="bg-muted/10 p-1">
                  <TabsTrigger value="list" className="text-[10px] font-black uppercase italic tracking-widest data-[state=active]:bg-background data-[state=active]:text-primary h-8">Registry_View</TabsTrigger>
                  <TabsTrigger value="calendar" className="text-[10px] font-black uppercase italic tracking-widest data-[state=active]:bg-background data-[state=active]:text-primary h-8">Chronos_View</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="list" className="mt-0 outline-none">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredMeetings.map((meeting) => (
                    <Card key={meeting.id} className="relative overflow-hidden border-border/40 hover:border-primary/30 transition-all duration-300 group shadow-lg hover:shadow-primary/5">
                      <div className="absolute top-0 right-0 p-3">
                         {getStatusIcon(meeting.status)}
                      </div>
                      <CardHeader className="pb-3 border-b border-border/5 bg-secondary/5">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-black italic text-xs border border-primary/20">
                            {meeting.clientName.charAt(0)}
                          </div>
                          <div>
                            <CardTitle className="text-sm font-black uppercase tracking-tight italic text-foreground group-hover:text-primary transition-colors">{meeting.clientName}</CardTitle>
                            <p className="text-[9px] font-bold text-muted-foreground/60 uppercase tracking-widest mt-0.5">{meeting.leadProject || 'NO_PROJECT_LINK'}</p>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-6 space-y-4">
                        <div className="flex flex-col gap-2">
                          <div className="flex items-center justify-between border-b border-border/5 pb-2">
                            <span className="text-[9px] font-black text-muted-foreground/40 uppercase tracking-widest italic">Temporal_Nexus</span>
                            <span className="text-[11px] font-black text-foreground italic uppercase tracking-tighter">{meeting.date} // {meeting.time}</span>
                          </div>
                          <div className="flex items-center justify-between border-b border-border/5 pb-2">
                            <span className="text-[9px] font-black text-muted-foreground/40 uppercase tracking-widest italic">Protocol</span>
                            <div className="flex items-center gap-1.5 text-[10px] font-bold text-foreground italic uppercase">
                              {getTypeIcon(meeting.type)}
                              <span>{meeting.type}</span>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <h4 className="text-[10px] font-black uppercase tracking-widest italic text-primary/80">nexus_parameters</h4>
                          <p className="text-xs font-medium text-muted-foreground leading-relaxed line-clamp-1">{meeting.title}</p>
                        </div>

                        <div className="flex gap-2 pt-2">
                          <Button variant="outline" size="sm" className="flex-1 h-9 text-[9px] font-black uppercase italic tracking-widest border-border/30 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all" onClick={() => handleEdit(meeting)}>
                            Configure
                          </Button>
                          <Button variant="outline" size="sm" className="flex-1 h-9 text-[9px] font-black uppercase italic tracking-widest text-destructive border-border/30 hover:border-destructive/50 transition-all" onClick={() => handleDelete(meeting.id)}>
                            Sever
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  {filteredMeetings.length === 0 && (
                     <div className="col-span-full py-20 text-center bg-card/10 rounded-2xl border border-dashed border-border/30">
                        <Calendar className="w-16 h-16 text-muted-foreground/10 mx-auto mb-4" />
                        <p className="text-[10px] font-black uppercase tracking-widest italic text-muted-foreground/60">No Temporal Entries Detected In Current Sequence.</p>
                     </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="calendar" className="mt-0 outline-none">
                <Card className="border-border/30 shadow-2xl bg-card/40 backdrop-blur-xl overflow-hidden">
                   <div className="p-6 md:p-10 space-y-8">
                      {filteredMeetings.map((meeting) => (
                         <div key={meeting.id} className="relative pl-12 md:pl-20 py-2 border-l border-border/20 group hover:border-primary/50 transition-colors">
                            <div className="absolute -left-1.5 top-0 w-3 h-3 rounded-full bg-border group-hover:bg-primary transition-all shadow-[0_0_10px_rgba(0,0,0,0.1)]"></div>
                            <div className="absolute left-4 md:left-6 top-0 text-[10px] font-black italic uppercase text-muted-foreground/40 tracking-tighter">
                               {new Date(meeting.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }).toUpperCase()}
                            </div>
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                               <div className="space-y-1">
                                  <h3 className="text-sm md:text-lg font-black italic uppercase tracking-tighter text-foreground group-hover:text-primary transition-colors">{meeting.title}</h3>
                                  <div className="flex items-center gap-3 text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest">
                                     <span>{meeting.time} // {meeting.duration}m</span>
                                     <span className="w-1 h-1 rounded-full bg-border/50"></span>
                                     <span className="text-primary/60">{meeting.clientName}</span>
                                  </div>
                               </div>
                               <div className="flex items-center gap-3">
                                  <div className="px-3 py-1 rounded-full bg-muted/20 border border-border/30 text-[9px] font-black uppercase italic tracking-widest text-muted-foreground/60">
                                     {meeting.status}
                                  </div>
                                  <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-primary/10 hover:text-primary transition-all" onClick={() => handleEdit(meeting)}>
                                     <Plus className="w-4 h-4 rotate-45" />
                                  </Button>
                               </div>
                            </div>
                         </div>
                      ))}
                   </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ScheduleMeeting;

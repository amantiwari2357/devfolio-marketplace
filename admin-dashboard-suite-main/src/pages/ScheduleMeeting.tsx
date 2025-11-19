import { useState } from "react";
import { Menu } from "lucide-react";
import Sidebar from "@/components/dashboard/Sidebar";
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
    <div className="min-h-screen bg-background">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 flex items-center gap-4 border-b bg-card px-6 py-4">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </Button>
          <h1 className="text-2xl font-bold text-foreground">Schedule Meeting</h1>
        </header>

        <main className="p-6">
          {/* Stats Cards */}
          <div className="grid gap-4 md:grid-cols-4 mb-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Meetings</CardTitle>
                <Calendar className="w-4 h-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{meetings.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Scheduled</CardTitle>
                <Clock className="w-4 h-4 text-yellow-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {meetings.filter((m) => m.status === "Scheduled").length}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Completed</CardTitle>
                <CheckCircle2 className="w-4 h-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {meetings.filter((m) => m.status === "Completed").length}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">No-Show</CardTitle>
                <AlertCircle className="w-4 h-4 text-orange-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {meetings.filter((m) => m.status === "No-Show").length}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters and Actions */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search meetings..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[180px]">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Scheduled">Scheduled</SelectItem>
                <SelectItem value="Confirmed">Confirmed</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="Cancelled">Cancelled</SelectItem>
                <SelectItem value="No-Show">No-Show</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterClient} onValueChange={setFilterClient}>
              <SelectTrigger className="w-[180px]">
                <Users className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter by client" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Clients</SelectItem>
                {mockClients.map((client) => (
                  <SelectItem key={client.id} value={client.name}>
                    {client.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => setEditingMeeting(null)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Schedule Meeting
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>
                    {editingMeeting ? "Edit Meeting" : "Schedule New Meeting"}
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <Label htmlFor="client">Client *</Label>
                      <Select
                        value={formData.clientId}
                        onValueChange={handleClientSelect}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select client" />
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

                    {selectedClient && (
                      <>
                        <div>
                          <Label>Email</Label>
                          <Input value={selectedClient.email} disabled />
                        </div>
                        <div>
                          <Label>Phone</Label>
                          <Input value={selectedClient.phone} disabled />
                        </div>
                      </>
                    )}

                    <div className="col-span-2">
                      <Label htmlFor="title">Meeting Title *</Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) =>
                          setFormData({ ...formData, title: e.target.value })
                        }
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="type">Meeting Type *</Label>
                      <Select
                        value={formData.type}
                        onValueChange={(value: Meeting["type"]) =>
                          setFormData({ ...formData, type: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Zoom">Zoom</SelectItem>
                          <SelectItem value="Google Meet">Google Meet</SelectItem>
                          <SelectItem value="Phone">Phone</SelectItem>
                          <SelectItem value="In-Person">In-Person</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="duration">Duration (minutes) *</Label>
                      <Select
                        value={formData.duration}
                        onValueChange={(value) =>
                          setFormData({ ...formData, duration: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="15">15 minutes</SelectItem>
                          <SelectItem value="30">30 minutes</SelectItem>
                          <SelectItem value="60">1 hour</SelectItem>
                          <SelectItem value="90">1.5 hours</SelectItem>
                          <SelectItem value="120">2 hours</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="date">Meeting Date *</Label>
                      <Input
                        id="date"
                        type="date"
                        value={formData.date}
                        onChange={(e) =>
                          setFormData({ ...formData, date: e.target.value })
                        }
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="time">Meeting Time *</Label>
                      <Input
                        id="time"
                        type="time"
                        value={formData.time}
                        onChange={(e) =>
                          setFormData({ ...formData, time: e.target.value })
                        }
                        required
                      />
                    </div>

                    <div className="col-span-2">
                      <Label htmlFor="link">Meeting Link / Location</Label>
                      <Input
                        id="link"
                        value={formData.link}
                        onChange={(e) =>
                          setFormData({ ...formData, link: e.target.value })
                        }
                        placeholder="https://zoom.us/j/123456789 or Office Address"
                      />
                    </div>

                    <div>
                      <Label htmlFor="reminder">Reminder</Label>
                      <Select
                        value={formData.reminder}
                        onValueChange={(value) =>
                          setFormData({ ...formData, reminder: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="10min">10 minutes before</SelectItem>
                          <SelectItem value="1hr">1 hour before</SelectItem>
                          <SelectItem value="24hr">24 hours before</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="leadProject">Attach Lead/Project</Label>
                      <Select
                        value={formData.leadProject}
                        onValueChange={(value) =>
                          setFormData({ ...formData, leadProject: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select lead" />
                        </SelectTrigger>
                        <SelectContent>
                          {mockLeads.map((lead) => (
                            <SelectItem key={lead.id} value={lead.name}>
                              {lead.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="col-span-2">
                      <Label htmlFor="assignedTo">Assign to Employee</Label>
                      <Select
                        value={formData.assignedTo}
                        onValueChange={(value) =>
                          setFormData({ ...formData, assignedTo: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select employee" />
                        </SelectTrigger>
                        <SelectContent>
                          {mockEmployees.map((emp) => (
                            <SelectItem key={emp.id} value={emp.name}>
                              {emp.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="col-span-2">
                      <Label htmlFor="notes">Internal Notes</Label>
                      <Textarea
                        id="notes"
                        value={formData.notes}
                        onChange={(e) =>
                          setFormData({ ...formData, notes: e.target.value })
                        }
                        placeholder="Add internal notes (team only)"
                        rows={3}
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit">
                      {editingMeeting ? "Update Meeting" : "Schedule Meeting"}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {/* Tabs for List and Calendar View */}
          <Tabs defaultValue="list" className="w-full">
            <TabsList>
              <TabsTrigger value="list">
                <FileText className="w-4 h-4 mr-2" />
                List View
              </TabsTrigger>
              <TabsTrigger value="calendar">
                <Calendar className="w-4 h-4 mr-2" />
                Calendar View
              </TabsTrigger>
            </TabsList>

            <TabsContent value="list" className="mt-4">
              <Card>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Client</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Date & Time</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Assigned To</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredMeetings.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center text-muted-foreground">
                          No meetings found
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredMeetings.map((meeting) => (
                        <TableRow key={meeting.id}>
                          <TableCell>
                            <div>
                              <div className="font-medium">{meeting.clientName}</div>
                              <div className="text-sm text-muted-foreground">
                                {meeting.clientPhone}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{meeting.title}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {getTypeIcon(meeting.type)}
                              <span>{meeting.type}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <div>{meeting.date}</div>
                              <div className="text-sm text-muted-foreground">
                                {meeting.time}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{meeting.duration} min</TableCell>
                          <TableCell>
                            <Select
                              value={meeting.status}
                              onValueChange={(value: Meeting["status"]) =>
                                handleStatusChange(meeting.id, value)
                              }
                            >
                              <SelectTrigger className="w-[140px]">
                                <div className="flex items-center gap-2">
                                  {getStatusIcon(meeting.status)}
                                  <SelectValue />
                                </div>
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Scheduled">Scheduled</SelectItem>
                                <SelectItem value="Confirmed">Confirmed</SelectItem>
                                <SelectItem value="Completed">Completed</SelectItem>
                                <SelectItem value="Cancelled">Cancelled</SelectItem>
                                <SelectItem value="No-Show">No-Show</SelectItem>
                              </SelectContent>
                            </Select>
                          </TableCell>
                          <TableCell>{meeting.assignedTo || "-"}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleEdit(meeting)}
                              >
                                Edit
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleDelete(meeting.id)}
                              >
                                Delete
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </Card>
            </TabsContent>

            <TabsContent value="calendar" className="mt-4">
              <Card className="p-6">
                <div className="grid gap-4">
                  {filteredMeetings.map((meeting) => (
                    <div
                      key={meeting.id}
                      className="flex items-start gap-4 p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                    >
                      <div className="flex flex-col items-center justify-center bg-primary text-primary-foreground rounded-lg p-3 min-w-[60px]">
                        <div className="text-2xl font-bold">
                          {new Date(meeting.date).getDate()}
                        </div>
                        <div className="text-xs">
                          {new Date(meeting.date).toLocaleString("default", {
                            month: "short",
                          })}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold">{meeting.title}</h3>
                            <p className="text-sm text-muted-foreground">
                              {meeting.clientName} • {meeting.time} • {meeting.duration} min
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            {getStatusIcon(meeting.status)}
                            <Badge variant="outline">{meeting.status}</Badge>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 mt-2 text-sm">
                          <div className="flex items-center gap-1 text-muted-foreground">
                            {getTypeIcon(meeting.type)}
                            <span>{meeting.type}</span>
                          </div>
                          {meeting.leadProject && (
                            <Badge variant="secondary">{meeting.leadProject}</Badge>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(meeting)}
                        >
                          Edit
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default ScheduleMeeting;

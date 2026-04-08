import { useState, useEffect } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, Clock, Loader2, MessageSquare, User, Calendar, MessageCircle, ExternalLink, Plus, Send, ChevronDown, ChevronUp } from "lucide-react";

const Enquiry = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [followUpNote, setFollowUpNote] = useState('');
  const [followUpDialogOpen, setFollowUpDialogOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [viewingFollowUps, setViewingFollowUps] = useState(null);

  useEffect(() => {
    const fetchEnquiries = async () => {
      try {
        const response = await fetch('https://devfolio-marketplace-1.onrender.com/api/enquiries/all');
        if (!response.ok) {
          throw new Error('Failed to fetch enquiries');
        }
        const data = await response.json();
        setEnquiries(data.enquiries || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEnquiries();
  }, []);

  const handleAddFollowUp = async () => {
    if (!selectedEnquiry || !followUpNote.trim()) return;

    try {
      const response = await fetch(`https://devfolio-marketplace-1.onrender.com/api/enquiries/${selectedEnquiry._id}/followup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          note: followUpNote,
          status: 'note'
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add follow-up');
      }

      const fetchResponse = await fetch('https://devfolio-marketplace-1.onrender.com/api/enquiries/all');
      const data = await fetchResponse.json();
      setEnquiries(data.enquiries || []);

      setFollowUpNote('');
      setFollowUpDialogOpen(false);
    } catch (err) {
      console.error('Error adding follow-up:', err);
      alert('Failed to add follow-up. Please try again.');
    }
  };

  const handleViewFollowUps = (enquiry) => {
    setSelectedEnquiry(enquiry);
    setViewingFollowUps(true);
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

            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <span className="ml-3 font-bold uppercase tracking-widest text-sm italic">Synchronizing Enquiries...</span>
              </div>
            ) : error ? (
              <div className="text-center py-12 text-destructive font-bold uppercase tracking-widest text-sm">
                Node Connection Error: {error}
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Card className="border-border/50 shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-4 md:px-6">
                      <CardTitle className="text-[10px] md:text-xs font-black uppercase tracking-widest text-muted-foreground italic">Metric / Total</CardTitle>
                      <Mail className="h-4 w-4 text-primary" />
                    </CardHeader>
                    <CardContent className="px-4 md:px-6 pb-4">
                      <div className="text-xl md:text-3xl font-black tracking-tighter text-foreground italic">Q_{enquiries.length}</div>
                      <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-tighter mt-1">Inbound Signals</p>
                    </CardContent>
                  </Card>

                  <Card className="border-border/50 shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-4 md:px-6">
                      <CardTitle className="text-[10px] md:text-xs font-black uppercase tracking-widest text-muted-foreground italic">Status / Pending</CardTitle>
                      <Clock className="h-4 w-4 text-chart-3" />
                    </CardHeader>
                    <CardContent className="px-4 md:px-6 pb-4">
                      <div className="text-xl md:text-3xl font-black tracking-tighter text-chart-3 italic">
                        {enquiries.filter(e => e.status === "pending").length}
                      </div>
                      <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-tighter mt-1">Awaiting Response</p>
                    </CardContent>
                  </Card>

                  <Card className="col-span-2 lg:col-span-1 border-border/50 shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-4 md:px-6">
                      <CardTitle className="text-[10px] md:text-xs font-black uppercase tracking-widest text-muted-foreground italic">Action / Resolved</CardTitle>
                      <Phone className="h-4 w-4 text-chart-2" />
                    </CardHeader>
                    <CardContent className="px-4 md:px-6 pb-4">
                      <div className="text-xl md:text-3xl font-black tracking-tighter text-chart-2 italic">
                        {enquiries.filter(e => e.status === "in-progress").length + enquiries.filter(e => e.status === "completed").length}
                      </div>
                      <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-tighter mt-1">Processing Stream</p>
                    </CardContent>
                  </Card>
                </div>

                <Card className="border-border/50 shadow-md overflow-hidden">
                  <CardHeader className="px-4 md:px-6 py-5 border-b border-border/30 bg-secondary/10">
                    <CardTitle className="text-lg md:text-xl font-black tracking-tighter text-foreground italic uppercase">Signal Grid / Recent Enquiries</CardTitle>
                    <p className="text-[10px] md:text-xs font-bold text-muted-foreground/60 uppercase tracking-[0.2em] mt-1">Live Inbound Communication Matrix</p>
                  </CardHeader>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead className="w-24">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {enquiries.map((enquiry) => (
                          <TableRow key={enquiry._id}>
                            <TableCell className="font-medium">
                              <div className="flex items-center gap-2">
                                <User className="h-4 w-4 text-muted-foreground" />
                                {enquiry.name}
                              </div>
                            </TableCell>
                            <TableCell>
                                <div className="flex flex-col space-y-2">
                                  <div className="flex space-x-2">
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => {
                                        setSelectedEnquiry(enquiry);
                                        setIsDialogOpen(true);
                                      }}
                                      className="flex-1"
                                    >
                                      <MessageSquare className="h-4 w-4 mr-2" />
                                      View Details
                                    </Button>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => {
                                        setSelectedEnquiry(enquiry);
                                        setFollowUpDialogOpen(true);
                                      }}
                                      className="flex-1"
                                    >
                                      <Plus className="h-4 w-4 mr-1" /> Follow Up
                                    </Button>
                                  </div>
                                  {enquiry.followUps && enquiry.followUps.length > 0 && (
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="text-xs text-muted-foreground p-0 h-auto"
                                      onClick={() => handleViewFollowUps(enquiry)}
                                    >
                                      <MessageCircle className="h-3 w-3 mr-1" />
                                      View Follow-ups ({enquiry.followUps.length})
                                    </Button>
                                  )}
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        </main>
      </div>

      {/* Enquiry Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Enquiry Details</DialogTitle>
          </DialogHeader>
          {selectedEnquiry && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">Contact Information</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span>{selectedEnquiry.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <a href={`mailto:${selectedEnquiry.email}`} className="hover:underline">
                          {selectedEnquiry.email}
                        </a>
                      </div>
                      {selectedEnquiry.phone && (
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <a href={`tel:${selectedEnquiry.phone}`} className="hover:underline">
                            {selectedEnquiry.phone}
                          </a>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">Source</h4>
                    <Badge variant="outline" className="capitalize">
                      {selectedEnquiry.source ? 
                        selectedEnquiry.source.replace(/-/g, ' ') : 
                        'Hero Section'}
                    </Badge>
                  </div>

                  {selectedEnquiry.projectLink && (
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-2">Project Link</h4>
                      <a 
                        href={selectedEnquiry.projectLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:underline flex items-center gap-1"
                      >
                        View Project <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-2">Message</h4>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="whitespace-pre-line">{selectedEnquiry.message}</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Follow-up Dialog */}
      <Dialog open={followUpDialogOpen} onOpenChange={setFollowUpDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Follow Up</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Textarea
              placeholder="Enter your follow-up note..."
              value={followUpNote}
              onChange={(e) => setFollowUpNote(e.target.value)}
              rows={4}
            />
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setFollowUpDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddFollowUp}>
                <Send className="h-4 w-4 mr-2" />
                Send Follow Up
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* View Follow-ups Dialog */}
      <Dialog open={!!viewingFollowUps} onOpenChange={(open) => !open && setViewingFollowUps(false)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Follow-up History</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 max-h-[60vh] overflow-y-auto">
            {selectedEnquiry?.followUps?.length > 0 ? (
              <div className="space-y-4">
                {selectedEnquiry.followUps.map((followUp, idx) => (
                  <div key={idx} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start">
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">
                          {new Date(followUp.createdAt).toLocaleString()}
                        </p>
                        <p className="whitespace-pre-line">{followUp.note}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-8">
                No follow-ups found for this enquiry.
              </p>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Enquiry;
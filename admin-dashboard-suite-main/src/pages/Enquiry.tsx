import { useState, useEffect } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, Clock, Loader2, Eye, Plus, MessageSquare } from "lucide-react";

const Enquiry = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [followUpNote, setFollowUpNote] = useState('');
  const [followUpDialogOpen, setFollowUpDialogOpen] = useState(false);

  useEffect(() => {
    const fetchEnquiries = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/enquiries/all');
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
      const response = await fetch(`http://localhost:5000/api/enquiries/${selectedEnquiry._id}/followup`, {
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

      // Refresh enquiries
      const fetchResponse = await fetch('http://localhost:5000/api/enquiries/all');
      const data = await fetchResponse.json();
      setEnquiries(data.enquiries || []);

      setFollowUpNote('');
      setFollowUpDialogOpen(false);
      setSelectedEnquiry(null);
    } catch (err) {
      console.error('Error adding follow-up:', err);
      alert('Failed to add follow-up. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col">
        <DashboardHeader onMenuClick={() => setSidebarOpen(true)} />
        
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-7xl mx-auto space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Enquiries</h1>
              <p className="text-muted-foreground">Manage customer enquiries and requests</p>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin" />
                <span className="ml-2">Loading enquiries...</span>
              </div>
            ) : error ? (
              <div className="text-center py-8 text-red-500">
                Error: {error}
              </div>
            ) : (
              <>
                <div className="grid gap-4 md:grid-cols-3">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total Enquiries</CardTitle>
                      <Mail className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{enquiries.length}</div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Pending</CardTitle>
                      <Clock className="h-4 w-4 text-chart-3" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {enquiries.filter(e => e.status === "pending").length}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Replied</CardTitle>
                      <Phone className="h-4 w-4 text-chart-2" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {enquiries.filter(e => e.status === "in-progress").length + enquiries.filter(e => e.status === "completed").length}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Recent Enquiries</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Source</TableHead>
                      <TableHead>Message</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                      <TableBody>
                        {enquiries.map((enquiry) => (
                          <TableRow key={enquiry._id}>
                            <TableCell className="font-medium">{enquiry.name}</TableCell>
                            <TableCell>
                              <div className="space-y-1">
                                <div className="flex items-center gap-1 text-sm">
                                  <Mail className="h-3 w-3" />
                                  {enquiry.email}
                                </div>
                                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                  <Phone className="h-3 w-3" />
                                  {enquiry.phone}
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline">
                                {enquiry.source ? enquiry.source.replace('-', ' ').toUpperCase() : 'HERO SECTION'}
                              </Badge>
                            </TableCell>
                            <TableCell className="max-w-xs truncate">{enquiry.message}</TableCell>
                            <TableCell>{new Date(enquiry.createdAt).toLocaleDateString()}</TableCell>
                            <TableCell>
                              <Badge variant={enquiry.status === "pending" ? "secondary" : "default"}>
                                {enquiry.status.charAt(0).toUpperCase() + enquiry.status.slice(1)}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => setSelectedEnquiry(enquiry)}
                                >
                                  <Eye className="h-3 w-3" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => {
                                    setSelectedEnquiry(enquiry);
                                    setFollowUpDialogOpen(true);
                                  }}
                                >
                                  <Plus className="h-3 w-3" />
                                </Button>
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

            {/* Enquiry Details Dialog */}
            <Dialog open={!!selectedEnquiry && !followUpDialogOpen} onOpenChange={() => setSelectedEnquiry(null)}>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Enquiry Details</DialogTitle>
                </DialogHeader>
                {selectedEnquiry && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium">Name</label>
                        <p className="text-sm text-muted-foreground">{selectedEnquiry.name}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Email</label>
                        <p className="text-sm text-muted-foreground">{selectedEnquiry.email}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Phone</label>
                        <p className="text-sm text-muted-foreground">{selectedEnquiry.phone}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Source</label>
                        <p className="text-sm text-muted-foreground">
                          {selectedEnquiry.source ? selectedEnquiry.source.replace('-', ' ').toUpperCase() : 'HERO SECTION'}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Status</label>
                        <Badge variant={selectedEnquiry.status === "pending" ? "secondary" : "default"}>
                          {selectedEnquiry.status.charAt(0).toUpperCase() + selectedEnquiry.status.slice(1)}
                        </Badge>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Date</label>
                        <p className="text-sm text-muted-foreground">
                          {new Date(selectedEnquiry.createdAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Message</label>
                      <p className="text-sm text-muted-foreground mt-1">{selectedEnquiry.message}</p>
                    </div>
                    {selectedEnquiry.followUps && selectedEnquiry.followUps.length > 0 && (
                      <div>
                        <label className="text-sm font-medium">Follow-ups</label>
                        <div className="space-y-2 mt-2">
                          {selectedEnquiry.followUps.map((followUp, index) => (
                            <div key={index} className="border rounded p-3 bg-muted/50">
                              <div className="flex justify-between items-start">
                                <p className="text-sm">{followUp.note}</p>
                                <Badge variant="outline" className="text-xs">
                                  {followUp.status}
                                </Badge>
                              </div>
                              <p className="text-xs text-muted-foreground mt-1">
                                {new Date(followUp.date).toLocaleString()}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </DialogContent>
            </Dialog>

            {/* Add Follow-up Dialog */}
            <Dialog open={followUpDialogOpen} onOpenChange={setFollowUpDialogOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Follow-up</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Follow-up Note</label>
                    <Textarea
                      placeholder="Enter follow-up details..."
                      value={followUpNote}
                      onChange={(e) => setFollowUpNote(e.target.value)}
                      rows={3}
                    />
                  </div>
                  <div className="flex gap-2 justify-end">
                    <Button variant="outline" onClick={() => setFollowUpDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleAddFollowUp} disabled={!followUpNote.trim()}>
                      Add Follow-up
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Enquiry;

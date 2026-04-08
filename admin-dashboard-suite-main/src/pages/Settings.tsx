import { useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Settings = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
          <div className="max-w-4xl mx-auto space-y-8 md:space-y-10">
            
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h1 className="text-xl md:text-3xl font-black tracking-tighter text-foreground italic uppercase">V_Node / System Protocol</h1>
                <p className="text-[10px] md:text-xs font-bold text-muted-foreground/60 uppercase tracking-[0.2em] mt-1 shadow-sm">Global Parameter Sync & Core Security Matrix</p>
              </div>
            </div>

            <Tabs defaultValue="profile" className="space-y-8">
              <div className="border-b border-border/10 pb-2 overflow-x-auto no-scrollbar">
                <TabsList className="bg-muted/10 p-1 flex w-fit">
                  <TabsTrigger value="profile" className="text-[10px] font-black uppercase italic tracking-widest px-6 h-9 data-[state=active]:bg-background data-[state=active]:text-primary">Entity_Profile</TabsTrigger>
                  <TabsTrigger value="notifications" className="text-[10px] font-black uppercase italic tracking-widest px-6 h-9 data-[state=active]:bg-background data-[state=active]:text-primary">Signal_Sync</TabsTrigger>
                  <TabsTrigger value="security" className="text-[10px] font-black uppercase italic tracking-widest px-6 h-9 data-[state=active]:bg-background data-[state=active]:text-primary">Encryption_Keys</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="profile" className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <Card className="border-border/40 shadow-xl bg-card/50 backdrop-blur-sm overflow-hidden">
                  <CardHeader className="border-b border-border/10 bg-secondary/5 px-6 py-5">
                    <CardTitle className="text-sm font-black uppercase italic tracking-widest text-foreground">Identity_Parameters</CardTitle>
                    <CardDescription className="text-[10px] font-bold uppercase tracking-tight text-muted-foreground/60">Update core user identification markers</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 md:p-8 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="font-bold uppercase tracking-widest text-[9px] italic">Entity_Full_Name</Label>
                        <Input id="name" defaultValue="Admin User" className="bg-muted/10 border-border/30 h-10 font-medium italic" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="font-bold uppercase tracking-widest text-[9px] italic">Access_Email</Label>
                        <Input id="email" type="email" defaultValue="admin@dabang.com" className="bg-muted/10 border-border/30 h-10 font-medium italic" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="font-bold uppercase tracking-widest text-[9px] italic">Communication_Link</Label>
                        <Input id="phone" defaultValue="+91 98765 43210" className="bg-muted/10 border-border/30 h-10 font-medium italic" />
                      </div>
                    </div>
                    <div className="pt-4 flex justify-end">
                      <Button className="font-black uppercase italic tracking-widest text-[10px] px-8 h-10 shadow-lg shadow-primary/20">Sync_Changes</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="notifications" className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <Card className="border-border/40 shadow-xl bg-card/50 backdrop-blur-sm overflow-hidden">
                  <CardHeader className="border-b border-border/10 bg-secondary/5 px-6 py-5">
                    <CardTitle className="text-sm font-black uppercase italic tracking-widest text-foreground">Signal_Registry</CardTitle>
                    <CardDescription className="text-[10px] font-bold uppercase tracking-tight text-muted-foreground/60">Configure global event transmission protocols</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 md:p-8 space-y-6">
                    <div className="space-y-6">
                      <div className="flex items-center justify-between p-4 rounded-xl bg-muted/10 border border-border/5">
                        <div className="space-y-1">
                          <Label className="font-bold uppercase tracking-widest text-[10px] italic text-foreground">Email_Transmissions</Label>
                          <p className="text-[9px] font-bold text-muted-foreground/60 uppercase tracking-tight italic">Receive report streams via primary SMTP node</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between p-4 rounded-xl bg-muted/10 border border-border/5">
                        <div className="space-y-1">
                          <Label className="font-bold uppercase tracking-widest text-[10px] italic text-foreground">SMS_Burst_Signals</Label>
                          <p className="text-[9px] font-bold text-muted-foreground/60 uppercase tracking-tight italic">Critical alert injection via cellular bandwidth</p>
                        </div>
                        <Switch />
                      </div>
                      <div className="flex items-center justify-between p-4 rounded-xl bg-muted/10 border border-border/5">
                        <div className="space-y-1">
                          <Label className="font-bold uppercase tracking-widest text-[10px] italic text-foreground">Push_Overlay_Notifications</Label>
                          <p className="text-[9px] font-bold text-muted-foreground/60 uppercase tracking-tight italic">Direct OS-level interrupt transmissions</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                    <div className="pt-4 flex justify-end">
                      <Button className="font-black uppercase italic tracking-widest text-[10px] px-8 h-10 shadow-lg shadow-primary/20">Update_Preferences</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="security" className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <Card className="border-border/40 shadow-xl bg-card/50 backdrop-blur-sm overflow-hidden">
                  <CardHeader className="border-b border-border/10 bg-secondary/5 px-6 py-5">
                    <CardTitle className="text-sm font-black uppercase italic tracking-widest text-foreground">Credential_Rotate</CardTitle>
                    <CardDescription className="text-[10px] font-bold uppercase tracking-tight text-muted-foreground/60">Recalibrate access tokens for enhanced sector security</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 md:p-8 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="current" className="font-bold uppercase tracking-widest text-[9px] italic">Primary_Access_Token</Label>
                        <Input id="current" type="password" placeholder="********" className="bg-muted/10 border-border/30 h-10 font-black italic" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="new" className="font-bold uppercase tracking-widest text-[9px] italic">New_Security_Sequence</Label>
                        <Input id="new" type="password" placeholder="********" className="bg-muted/10 border-border/30 h-10 font-black italic" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm" className="font-bold uppercase tracking-widest text-[9px] italic">Verify_Sequence</Label>
                        <Input id="confirm" type="password" placeholder="********" className="bg-muted/10 border-border/30 h-10 font-black italic" />
                      </div>
                    </div>
                    <div className="pt-4 flex justify-end">
                      <Button className="font-black uppercase italic tracking-widest text-[10px] px-8 h-10 shadow-lg shadow-primary/20">Rotate_Tokens</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Settings;

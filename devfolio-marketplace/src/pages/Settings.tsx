import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Settings as SettingsIcon, User, Bell, Shield, 
  CreditCard, Save, Home as HomeIcon, Calendar, 
  BookOpen, MessageSquare, TrendingUp, LogOut, 
  Activity, Sparkles, Zap, Lock, Eye, Mail, Phone, Globe,
  ShieldCheck, Cpu, Key, Fingerprint, Layers
} from "lucide-react";
import api from "@/services/api";
import { connectSocket, getSocket } from "@/services/socket";
import SEO from "@/components/layout/SEO";
import { AppSidebar } from "@/components/layout/AppSidebar";

type NullableTimeout = ReturnType<typeof setTimeout> | null;

const Settings = () => {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    bio: '',
    website: '',
    location: '',
    phone: ''
  });
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    bookingReminders: true,
    marketingEmails: false,
    messageNotifications: true
  });
  const [privacy, setPrivacy] = useState({
    profileVisibility: 'public',
    showEmail: false,
    showPhone: false,
    allowMessages: true
  });

  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  const profileTimeout = useRef<NullableTimeout>(null);
  const notificationsTimeout = useRef<NullableTimeout>(null);
  const privacyTimeout = useRef<NullableTimeout>(null);

  useEffect(() => {
    const fetchUserSettings = async () => {
      try {
        const response = await api.get('/auth/profile');
        const data = response.data.user ? response.data : { user: response.data, notifications: notifications, privacy: privacy };
        setUser(data.user);
        if (data.notifications) setNotifications(data.notifications);
        if (data.privacy) setPrivacy(data.privacy);
      } catch (error) {
        console.error('Error fetching user settings:', error);
      } finally {
        setInitialLoading(false);
      }
    };

    fetchUserSettings();

    const socket = connectSocket();

    return () => {
      socket.disconnect();
      if (profileTimeout.current) clearTimeout(profileTimeout.current);
      if (notificationsTimeout.current) clearTimeout(notificationsTimeout.current);
      if (privacyTimeout.current) clearTimeout(privacyTimeout.current);
    };
  }, []);

  const emitProfileUpdate = (updatedProfile: typeof user) => {
    if (profileTimeout.current) clearTimeout(profileTimeout.current);
    profileTimeout.current = setTimeout(() => {
      try {
        getSocket().emit('updateProfile', updatedProfile);
      } catch (e) {
        console.error('Socket emit error:', e);
      }
    }, 500);
  };

  const handleUserChange = (field: keyof typeof user, value: string) => {
    const updatedUser = { ...user, [field]: value };
    setUser(updatedUser);
    emitProfileUpdate(updatedUser);
  };

  const handleNotificationChange = (field: keyof typeof notifications, value: boolean) => {
    const updatedNotifications = { ...notifications, [field]: value };
    setNotifications(updatedNotifications);
    if (notificationsTimeout.current) clearTimeout(notificationsTimeout.current);
    notificationsTimeout.current = setTimeout(() => {
      try {
        getSocket().emit('updateNotifications', updatedNotifications);
      } catch (e) {
        console.error('Socket emit error:', e);
      }
    }, 500);
  };

  const handlePrivacyChange = (field: keyof typeof privacy, value: any) => {
    const updatedPrivacy = { ...privacy, [field]: value };
    setPrivacy(updatedPrivacy);
    if (privacyTimeout.current) clearTimeout(privacyTimeout.current);
    privacyTimeout.current = setTimeout(() => {
      try {
        getSocket().emit('updatePrivacy', updatedPrivacy);
      } catch (e) {
        console.error('Socket emit error:', e);
      }
    }, 500);
  };

  const handleSaveProfile = async () => {
    setLoading(true);
    try {
      await api.put('/auth/profile', user);
      try {
        getSocket().emit('profileUpdated', user);
      } catch (e) {
        console.error('Socket emit error:', e);
      }
    } catch (error) {
      console.error('Error saving profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  if (initialLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center space-y-6">
        <div className="w-16 h-16 rounded-[24px] bg-primary/10 flex items-center justify-center text-primary animate-pulse shadow-inner">
          <Cpu className="w-8 h-8" />
        </div>
        <p className="text-[10px] font-black uppercase tracking-[0.5em] text-muted-foreground animate-pulse">Initializing Config Node...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background selection:bg-primary selection:text-primary-foreground">
      <SEO title="System Protocol | Config" description="Manage your architect identity, security layers, and operational parameters within the DEVFOLIO network." />
      
      <div className="flex h-screen overflow-hidden relative">
        <AppSidebar activePath="/settings" />

        {/* Main Interface Core */}
        <main className="flex-1 overflow-y-auto p-6 md:p-16 bg-background relative selection:bg-primary selection:text-primary-foreground pt-24 md:pt-16">
          {/* Background blurs */}
          <div className="absolute top-0 right-0 -z-10 w-2/3 h-2/3 bg-primary/2 opacity-30 blur-[180px] rounded-full animate-pulse" />
          
          <div className="max-w-[1000px] mx-auto space-y-12 md:space-y-16">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-8 animate-slide-up">
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-primary">
                  <SettingsIcon className="w-4 h-4 animate-spin-slow" />
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] italic">Authorized Configuration</span>
                </div>
                <h1 className="heading-responsive">
                  Node <span className="text-primary NOT-italic">Config.</span>
                </h1>
              </div>
              <div className="flex gap-4">
                 <Button variant="outline" className="h-14 rounded-2xl px-8 font-black bg-secondary/30 border-border/50 gap-3 hover:bg-secondary/50 transition-all text-xs uppercase tracking-widest shadow-xl">
                    <Lock className="w-4 h-4" />
                    Security Audit
                 </Button>
              </div>
            </header>

            <Tabs defaultValue="profile" className="space-y-8 md:space-y-12 group animate-slide-up" style={{ animationDelay: '100ms' }}>
              <TabsList className="h-16 md:h-20 p-1 md:p-2 rounded-[20px] md:rounded-[28px] bg-secondary/10 border border-border/40 backdrop-blur-3xl grid grid-cols-4 gap-2 md:gap-3 shadow-2xl">
                {[
                  { value: "profile", label: "Identity", icon: <User className="w-4 h-4" /> },
                  { value: "notifications", label: "Signals", icon: <Bell className="w-4 h-4" /> },
                  { value: "privacy", label: "Stealth", icon: <Shield className="w-4 h-4" /> },
                  { value: "billing", label: "Equity", icon: <CreditCard className="w-4 h-4" /> },
                ].map((tab) => (
                  <TabsTrigger 
                    key={tab.value}
                    value={tab.value} 
                    className="rounded-[16px] md:rounded-[20px] font-black text-[10px] uppercase tracking-widest gap-2 data-[state=active]:bg-foreground data-[state=active]:text-background data-[state=active]:shadow-2xl transition-all h-full"
                  >
                    {tab.icon}
                    <span className="hidden lg:inline italic">{tab.label}</span>
                  </TabsTrigger>
                ))}
              </TabsList>

              {/* Identity Matrix Content */}
              <TabsContent value="profile" className="space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
                <Card className="neural-card p-8 md:p-12 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-700">
                    <Fingerprint className="w-48 h-48 text-primary" />
                  </div>
                  
                  <div className="relative z-10 space-y-12">
                    <div className="flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
                       <div className="w-24 h-24 md:w-28 md:h-28 rounded-[28px] md:rounded-[36px] bg-primary/20 flex items-center justify-center text-primary shadow-inner border border-primary/20 group-hover:rotate-6 transition-transform shrink-0">
                          <span className="text-3xl md:text-4xl font-black">{user.firstName?.[0] || 'U'}</span>
                       </div>
                       <div className="space-y-2">
                          <h2 className="text-2xl md:text-3xl font-black tracking-tighter text-foreground italic">Identity Core.</h2>
                          <p className="text-sm font-bold text-muted-foreground italic leading-relaxed opacity-60">Modify your public-facing expert identity across the DEVFOLIO node.</p>
                       </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-10 pt-4">
                      {[
                        { id: "firstName", label: "Primary Sector", icon: <User className="w-4 h-4" /> },
                        { id: "lastName", label: "Secondary Sector", icon: <Layers className="w-4 h-4" /> },
                        { id: "email", label: "Signal Vector", icon: <Mail className="w-4 h-4" />, type: "email" },
                        { id: "phone", label: "Direct Signal", icon: <Phone className="w-4 h-4" /> },
                        { id: "website", label: "External Domain", icon: <Globe className="w-4 h-4" />, placeholder: "https://domain.io" },
                        { id: "location", label: "Physical Node", icon: <Globe className="w-4 h-4" />, placeholder: "City, Sector" },
                      ].map((field) => (
                        <div key={field.id} className="space-y-4">
                          <Label htmlFor={field.id} className="text-[10px] font-black uppercase tracking-[0.3em] ml-2 text-muted-foreground flex items-center gap-2">
                             {field.icon}
                             {field.label}
                          </Label>
                          <div className="relative group/input">
                            <Input
                              id={field.id}
                              type={field.type || "text"}
                              placeholder={field.placeholder}
                              value={(user as any)[field.id]}
                              onChange={(e) => handleUserChange(field.id as any, e.target.value)}
                              className="h-16 rounded-2xl bg-background border-border/40 focus:border-primary/50 font-black shadow-inner italic"
                            />
                            <div className="absolute inset-0 rounded-2xl border border-primary/0 group-focus-within/input:border-primary/20 transition-all pointer-events-none" />
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="space-y-4">
                      <Label htmlFor="bio" className="text-[10px] font-black uppercase tracking-[0.3em] ml-2 text-muted-foreground">Architectural Narrative</Label>
                      <Textarea
                        id="bio"
                        placeholder="Define your trajectory..."
                        value={user.bio}
                        onChange={(e) => handleUserChange("bio", e.target.value)}
                        rows={6}
                        className="rounded-[32px] bg-background border-border/40 focus:border-primary/50 font-bold italic p-8 shadow-inner"
                      />
                    </div>

                    <div className="flex justify-end pt-8">
                      <Button
                        onClick={handleSaveProfile}
                        disabled={loading}
                        className="h-16 md:h-20 w-full sm:w-auto rounded-[24px] md:rounded-[28px] px-12 md:px-16 font-black text-lg md:text-xl bg-primary text-primary-foreground shadow-2xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all gap-4 uppercase tracking-widest border-none"
                      >
                        <Save className="w-5 h-5 md:w-6 md:h-6" />
                        {loading ? "Syncing..." : "Sync Core"}
                      </Button>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              {/* Other Tabs simplified but consistent */}
              <TabsContent value="notifications" className="space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
                <Card className="neural-card p-8 md:p-12 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
                    <Activity className="w-48 h-48 text-primary" />
                  </div>
                  
                  <div className="relative z-10 space-y-12">
                    <div className="space-y-2">
                       <h2 className="text-3xl font-black tracking-tighter text-foreground italic">Signal Telemetry.</h2>
                       <p className="text-sm font-bold text-muted-foreground italic leading-relaxed opacity-60">Manage how information pulses are delivered to your centralized nodes.</p>
                    </div>

                    <div className="grid gap-6">
                      {[
                        { id: "emailNotifications", label: "Main Vector Pulse", desc: "Broadcast telemetry via primary email node.", icon: <Mail className="w-5 h-5" /> },
                        { id: "bookingReminders", label: "Temporal Alerts", desc: "Synchronize upcoming expert session epochs.", icon: <Calendar className="w-5 h-5" /> },
                        { id: "messageNotifications", label: "Direct Packet Pulse", desc: "Instant notification for incoming message fragments.", icon: <MessageSquare className="w-5 h-5" /> },
                        { id: "marketingEmails", label: "Expansion Briefs", desc: "Updates on network expansion and core logic scales.", icon: <Sparkles className="w-5 h-5" /> },
                      ].map((pref) => (
                        <div key={pref.id} className="flex flex-col sm:flex-row items-center justify-between p-6 md:p-8 rounded-[24px] md:rounded-[32px] bg-background/40 border border-border/20 group/item hover:border-primary/30 transition-all shadow-sm gap-6 sm:gap-4">
                          <div className="flex items-center gap-4 md:gap-6 w-full sm:w-auto">
                            <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-secondary/50 flex items-center justify-center text-primary group-hover/item:scale-110 transition-transform shadow-inner shrink-0">
                              {pref.icon}
                            </div>
                            <div className="space-y-1">
                              <h3 className="font-black text-xs md:text-sm text-foreground uppercase tracking-widest">{pref.label}</h3>
                              <p className="text-[10px] md:text-xs font-bold text-muted-foreground italic opacity-60">{pref.desc}</p>
                            </div>
                          </div>
                          <Switch
                            checked={(notifications as any)[pref.id]}
                            onCheckedChange={(checked) => handleNotificationChange(pref.id as any, checked)}
                            className="scale-110 md:scale-125 data-[state=checked]:bg-primary"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="privacy" className="space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
                <Card className="neural-card p-8 md:p-12 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
                    <ShieldCheck className="w-48 h-48 text-primary" />
                  </div>
                  
                  <div className="relative z-10 space-y-12">
                     <div className="space-y-2">
                       <h2 className="text-3xl font-black tracking-tighter text-foreground italic">Stealth Protocol.</h2>
                       <p className="text-sm font-bold text-muted-foreground italic leading-relaxed opacity-60">Adjust your node's visibility across the decentralized directory.</p>
                    </div>

                    <div className="space-y-10">
                      <div className="p-6 md:p-8 rounded-[28px] md:rounded-[36px] bg-background/50 border border-border/30 shadow-inner">
                        <Label className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground mb-6 block ml-2 italic">Node Visibility Vector</Label>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          {["public", "private", "unlisted"].map((option) => (
                            <Button
                              key={option}
                              variant={privacy.profileVisibility === option ? "default" : "outline"}
                              className={`h-16 md:h-20 rounded-[18px] md:rounded-[22px] font-black text-xs uppercase tracking-[0.2em] transition-all shadow-xl ${
                                privacy.profileVisibility === option 
                                  ? "bg-foreground text-background scale-105" 
                                  : "bg-secondary/30 text-muted-foreground hover:bg-secondary/50 border-border/40"
                              }`}
                              onClick={() => handlePrivacyChange("profileVisibility", option)}
                            >
                              {option}
                              <div className={`ml-2 w-2 h-2 rounded-full ${privacy.profileVisibility === option ? "bg-primary animate-pulse" : "bg-muted-foreground/30"}`} />
                            </Button>
                          ))}
                        </div>
                      </div>

                      {[
                        { id: "showEmail", label: "Public Signal reveal", desc: "Reveal your primary email vector on global profile.", icon: <Eye className="w-5 h-5" /> },
                        { id: "showPhone", label: "Signal reveal (Phone)", desc: "Display communication numbers to authorized nodes.", icon: <Phone className="w-5 h-5" /> },
                        { id: "allowMessages", label: "Pulse intake protocol", desc: "Authorize non-expert nodes to initiate message packets.", icon: <MessageSquare className="w-5 h-5" /> },
                      ].map((pref) => (
                        <div key={pref.id} className="flex flex-col sm:flex-row items-center justify-between p-6 md:p-8 rounded-[24px] md:rounded-[32px] bg-background/40 border border-border/20 group/item hover:border-primary/30 transition-all shadow-sm gap-6 sm:gap-4">
                          <div className="flex items-center gap-4 md:gap-6 w-full sm:w-auto">
                            <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-secondary/50 flex items-center justify-center text-primary group-hover/item:scale-110 transition-transform shadow-inner shrink-0">
                              {pref.icon}
                            </div>
                            <div className="space-y-1">
                              <h3 className="font-black text-xs md:text-sm text-foreground uppercase tracking-widest">{pref.label}</h3>
                              <p className="text-[10px] md:text-xs font-bold text-muted-foreground italic opacity-60">{pref.desc}</p>
                            </div>
                          </div>
                          <Switch
                            checked={(privacy as any)[pref.id]}
                            onCheckedChange={(checked) => handlePrivacyChange(pref.id as any, checked)}
                            className="scale-110 md:scale-125 data-[state=checked]:bg-primary"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="billing" className="space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
                <Card className="neural-card p-8 md:p-12 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
                    <CreditCard className="w-48 h-48 text-primary" />
                  </div>
                  
                  <div className="relative z-10 space-y-16">
                    <div className="space-y-2">
                       <h2 className="text-3xl font-black tracking-tighter text-foreground italic">Equity Flows.</h2>
                       <p className="text-sm font-bold text-muted-foreground italic leading-relaxed opacity-60">Configure financial vectors for high-fidelity payment extraction and payouts.</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-10">
                       <Card className="p-8 md:p-10 rounded-[32px] md:rounded-[40px] bg-background border-border/40 shadow-2xl group/bill hover:border-primary/20 transition-all">
                          <div className="space-y-6">
                            <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl md:rounded-3xl bg-secondary/50 flex items-center justify-center text-primary group-hover/bill:scale-110 transition-transform shadow-inner">
                               <CreditCard className="w-6 h-6 md:w-8 md:h-8" />
                            </div>
                            <div className="space-y-2">
                               <h3 className="text-xl md:text-2xl font-black tracking-tighter uppercase italic">Extraction Node</h3>
                               <p className="text-[10px] md:text-xs font-bold text-muted-foreground leading-relaxed italic opacity-60">Default method for service deployment and equity transfers across the centralized exchange.</p>
                            </div>
                            <Button variant="outline" className="w-full h-14 md:h-16 rounded-2xl font-black text-[10px] md:text-xs uppercase tracking-widest border-border/40 hover:bg-secondary">Update Vector</Button>
                          </div>
                       </Card>

                       <Card className="p-8 md:p-10 rounded-[32px] md:rounded-[40px] bg-primary text-primary-foreground shadow-2xl shadow-primary/30 group/bill border-none relative overflow-hidden">
                          <div className="absolute bottom-0 right-0 p-8 opacity-10 pointer-events-none group-hover:scale-125 transition-transform duration-1000">
                             <Zap className="w-32 h-32 md:w-40 md:h-40" />
                          </div>
                          <div className="relative z-10 space-y-6">
                            <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl md:rounded-3xl bg-background/20 flex items-center justify-center text-primary-foreground group-hover/bill:scale-110 transition-transform backdrop-blur-md">
                               <Zap className="w-6 h-6 md:w-8 md:h-8 fill-primary-foreground" />
                            </div>
                            <div className="space-y-2">
                               <h3 className="text-xl md:text-2xl font-black tracking-tighter uppercase italic">Accelerate Tier</h3>
                               <p className="text-[10px] md:text-xs font-black opacity-70 leading-relaxed italic uppercase tracking-wider">Maximize commission efficiency with the elite protocol activation.</p>
                            </div>
                            <Button className="w-full h-14 md:h-16 rounded-2xl font-black text-[10px] md:text-xs uppercase tracking-widest bg-background text-foreground hover:scale-105 transition-all shadow-2xl">Optimize Level</Button>
                          </div>
                       </Card>
                    </div>

                    <div className="p-10 rounded-[40px] bg-background/5 border border-border/20 flex flex-col sm:flex-row items-center justify-between gap-10 hover:border-primary/10 transition-all group/ledger">
                       <div className="flex items-center gap-6 text-center sm:text-left">
                          <div className="w-16 h-16 rounded-3xl bg-secondary/50 flex items-center justify-center text-primary group-hover/ledger:rotate-12 transition-transform shadow-inner">
                             <Key className="w-8 h-8" />
                          </div>
                          <div className="space-y-1">
                            <h4 className="font-black text-lg uppercase tracking-tight italic leading-none">Flow Ledger Trace</h4>
                            <p className="text-xs font-bold text-muted-foreground italic opacity-60">Review historical equity reallocation packets recorded on the node.</p>
                          </div>
                       </div>
                       <Button variant="outline" className="h-16 px-10 rounded-2xl font-black text-xs uppercase tracking-widest border-border/40 hover:bg-secondary shadow-xl">Access Ledger</Button>
                    </div>
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

export default Settings;

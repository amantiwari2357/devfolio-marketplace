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
  Activity, Sparkles, Zap, Lock, Eye, Mail, Phone, Globe
} from "lucide-react";
import api from "@/services/api";
import { connectSocket, getSocket } from "@/services/socket";
import SEO from "@/components/layout/SEO";

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
        // Handle different data structures if necessary
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

  const emitNotificationsUpdate = (updatedNotifications: typeof notifications) => {
    if (notificationsTimeout.current) clearTimeout(notificationsTimeout.current);
    notificationsTimeout.current = setTimeout(() => {
      try {
        getSocket().emit('updateNotifications', updatedNotifications);
      } catch (e) {
        console.error('Socket emit error:', e);
      }
    }, 500);
  };

  const emitPrivacyUpdate = (updatedPrivacy: typeof privacy) => {
    if (privacyTimeout.current) clearTimeout(privacyTimeout.current);
    privacyTimeout.current = setTimeout(() => {
      try {
        getSocket().emit('updatePrivacy', updatedPrivacy);
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
    emitNotificationsUpdate(updatedNotifications);
  };

  const handlePrivacyChange = (field: keyof typeof privacy, value: any) => {
    const updatedPrivacy = { ...privacy, [field]: value };
    setPrivacy(updatedPrivacy);
    emitPrivacyUpdate(updatedPrivacy);
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

  const navItems = [
    { label: "Home", icon: <HomeIcon className="w-5 h-5" />, href: "/dashboard" },
    { label: "Bookings", icon: <Calendar className="w-5 h-5" />, href: "/bookings" },
    { label: "Priority DM", icon: <MessageSquare className="w-5 h-5" />, href: "/priority-dm" },
    { label: "Services", icon: <BookOpen className="w-5 h-5" />, href: "/services" },
  ];

  const analysisItems = [
    { label: "Analytics", icon: <TrendingUp className="w-5 h-5" />, href: "/analytics" },
    { label: "Settings", icon: <SettingsIcon className="w-5 h-5" />, href: "/settings", active: true },
  ];

  if (initialLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary animate-pulse">
          <SettingsIcon className="w-6 h-6" />
        </div>
        <p className="text-xs font-black uppercase tracking-[0.3em] text-muted-foreground animate-pulse">Accessing Core Config...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background selection:bg-primary selection:text-primary-foreground">
      <SEO title="System Configuration" description="Manage your expert profile, security protocols, and operational preferences." />
      
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <aside className="w-72 border-r border-border/50 bg-secondary/10 flex flex-col p-8 relative">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-10 h-10 rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
              <span className="text-primary-foreground font-black text-xl">C</span>
            </div>
            <div>
              <h2 className="font-black text-lg tracking-tighter text-foreground leading-none">DEVFOLIO<span className="text-primary">.</span></h2>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground opacity-60">Config Node</p>
            </div>
          </div>

          <div className="flex-1 space-y-10 overflow-y-auto pr-2 custom-scrollbar">
            <div className="space-y-4">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground mb-4">Core Directory</p>
              <nav className="space-y-2">
                {navItems.map((item) => (
                  <a 
                    key={item.label}
                    href={item.href} 
                    className="flex items-center gap-4 px-4 py-3.5 rounded-2xl font-bold text-muted-foreground hover:bg-secondary/50 hover:text-foreground transition-all"
                  >
                    {item.icon}
                    <span className="text-sm">{item.label}</span>
                  </a>
                ))}
              </nav>
            </div>

            <div className="space-y-4">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground mb-4">Insights & Scale</p>
              <nav className="space-y-2">
                {analysisItems.map((item) => (
                  <a 
                    key={item.label}
                    href={item.href} 
                    className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl font-bold transition-all ${
                      item.active 
                        ? "bg-primary text-primary-foreground shadow-xl shadow-primary/20" 
                        : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                    }`}
                  >
                    {item.icon}
                    <span className="text-sm">{item.label}</span>
                  </a>
                ))}
              </nav>
            </div>
          </div>

          <div className="pt-8 border-t border-border/50 space-y-4">
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-background shadow-inner border border-border/20">
              <div className="w-10 h-10 rounded-xl bg-secondary/50 flex items-center justify-center font-black text-primary">
                {user?.firstName?.[0] || 'U'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-black truncate text-foreground">{user?.firstName || 'Creator'}</p>
                <p className="text-[10px] font-medium truncate text-muted-foreground">{user?.email}</p>
              </div>
            </div>
            <Button
              onClick={handleLogout}
              variant="ghost"
              className="w-full flex items-center gap-4 px-4 py-4 rounded-2xl font-bold text-destructive hover:bg-destructive/10 hover:text-destructive transition-all justify-start"
            >
              <LogOut className="w-5 h-5" />
              <span className="text-sm">Disconnect</span>
            </Button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-12 bg-background relative">
          <div className="absolute top-0 right-0 -z-10 w-1/2 h-1/2 bg-primary/2 opacity-30 blur-[150px] rounded-full" />
          
          <div className="max-w-4xl mx-auto space-y-12">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-primary">
                  <SettingsIcon className="w-4 h-4" />
                  <span className="text-xs font-black uppercase tracking-widest">Global Preferences</span>
                </div>
                <h1 className="text-5xl font-black tracking-tight text-foreground leading-tight">
                  System <span className="text-primary italic">Config.</span>
                </h1>
              </div>
              <div className="flex gap-3">
                 <Button variant="outline" className="rounded-xl px-6 py-6 font-bold bg-secondary/30 border-border/50 gap-2 hover:bg-secondary/50 transition-all">
                    <Lock className="w-4 h-4" />
                    Security Audit
                 </Button>
              </div>
            </header>

            <Tabs defaultValue="profile" className="space-y-10 group">
              <TabsList className="h-16 p-1.5 rounded-2xl bg-secondary/30 border border-border/50 grid grid-cols-4 gap-2 backdrop-blur-xl">
                {[
                  { value: "profile", label: "Profile", icon: <User className="w-4 h-4" /> },
                  { value: "notifications", label: "Alerts", icon: <Bell className="w-4 h-4" /> },
                  { value: "privacy", label: "Stealth", icon: <Shield className="w-4 h-4" /> },
                  { value: "billing", label: "Equity", icon: <CreditCard className="w-4 h-4" /> },
                ].map((tab) => (
                  <TabsTrigger 
                    key={tab.value}
                    value={tab.value} 
                    className="rounded-[14px] font-black text-[10px] uppercase tracking-widest gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg transition-all"
                  >
                    {tab.icon}
                    <span className="hidden sm:inline">{tab.label}</span>
                  </TabsTrigger>
                ))}
              </TabsList>

              <TabsContent value="profile" className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <Card className="p-10 rounded-[40px] bg-secondary/10 border-border/50 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none group-hover:scale-110 transition-transform">
                    <User className="w-32 h-32 text-primary" />
                  </div>
                  
                  <div className="relative z-10 space-y-8">
                    <div className="flex items-center gap-6">
                       <div className="w-24 h-24 rounded-[32px] bg-primary/20 flex items-center justify-center text-primary shadow-inner border border-primary/20">
                          <span className="text-3xl font-black">{user.firstName?.[0] || 'U'}</span>
                       </div>
                       <div className="space-y-1">
                          <h2 className="text-2xl font-black tracking-tight text-foreground">Identity Core</h2>
                          <p className="text-sm font-medium text-muted-foreground italic leading-relaxed">Modify your public-facing expert identity across the DEVFOLIO node.</p>
                       </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 pt-4">
                      <div className="space-y-3">
                        <Label htmlFor="firstName" className="text-[10px] font-black uppercase tracking-widest ml-1 text-muted-foreground">Primary Sector (First Name)</Label>
                        <Input
                          id="firstName"
                          value={user.firstName}
                          onChange={(e) => handleUserChange("firstName", e.target.value)}
                          className="h-14 rounded-2xl bg-background border-border/50 focus:border-primary/50 font-bold"
                        />
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="lastName" className="text-[10px] font-black uppercase tracking-widest ml-1 text-muted-foreground">Secondary Sector (Last Name)</Label>
                        <Input
                          id="lastName"
                          value={user.lastName}
                          onChange={(e) => handleUserChange("lastName", e.target.value)}
                          className="h-14 rounded-2xl bg-background border-border/50 focus:border-primary/50 font-bold"
                        />
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="email" className="text-[10px] font-black uppercase tracking-widest ml-1 text-muted-foreground">Main Vector (Email)</Label>
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            id="email"
                            type="email"
                            value={user.email}
                            onChange={(e) => handleUserChange("email", e.target.value)}
                            className="h-14 pl-12 rounded-2xl bg-background border-border/50 focus:border-primary/50 font-bold"
                          />
                        </div>
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="phone" className="text-[10px] font-black uppercase tracking-widest ml-1 text-muted-foreground">Signal (Phone)</Label>
                        <div className="relative">
                          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            id="phone"
                            value={user.phone}
                            onChange={(e) => handleUserChange("phone", e.target.value)}
                            className="h-14 pl-12 rounded-2xl bg-background border-border/50 focus:border-primary/50 font-bold"
                          />
                        </div>
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="website" className="text-[10px] font-black uppercase tracking-widest ml-1 text-muted-foreground">External Domain (Website)</Label>
                        <div className="relative">
                          <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            id="website"
                            placeholder="https://yourwebsite.com"
                            value={user.website}
                            onChange={(e) => handleUserChange("website", e.target.value)}
                            className="h-14 pl-12 rounded-2xl bg-background border-border/50 focus:border-primary/50 font-bold"
                          />
                        </div>
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="location" className="text-[10px] font-black uppercase tracking-widest ml-1 text-muted-foreground">Physical Node (Location)</Label>
                        <Input
                          id="location"
                          placeholder="City, Country"
                          value={user.location}
                          onChange={(e) => handleUserChange("location", e.target.value)}
                          className="h-14 rounded-2xl bg-background border-border/50 focus:border-primary/50 font-bold"
                        />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="bio" className="text-[10px] font-black uppercase tracking-widest ml-1 text-muted-foreground">Architectural Bio</Label>
                      <Textarea
                        id="bio"
                        placeholder="Define your trajectory..."
                        value={user.bio}
                        onChange={(e) => handleUserChange("bio", e.target.value)}
                        rows={5}
                        className="rounded-[24px] bg-background border-border/50 focus:border-primary/50 font-medium p-6"
                      />
                    </div>
                    <div className="flex justify-end pt-4">
                      <Button
                        onClick={handleSaveProfile}
                        disabled={loading}
                        className="rounded-2xl px-12 py-8 font-black text-lg bg-primary text-primary-foreground shadow-2xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all gap-3"
                      >
                        <Save className="w-5 h-5" />
                        {loading ? "Synchronizing..." : "Synchronize Core"}
                      </Button>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="notifications" className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <Card className="p-10 rounded-[40px] bg-secondary/10 border-border/50 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none group-hover:scale-110 transition-transform">
                    <Bell className="w-32 h-32 text-primary" />
                  </div>
                  
                  <div className="relative z-10 space-y-10">
                    <div className="space-y-1">
                       <h2 className="text-2xl font-black tracking-tight text-foreground">Alert Telemetry</h2>
                       <p className="text-sm font-medium text-muted-foreground italic leading-relaxed">Manage how information pulses are delivered to your signals.</p>
                    </div>

                    <div className="space-y-6">
                      {[
                        { id: "emailNotifications", label: "Main Vector Alerts", desc: "Broadcast telemetry via primary email node.", icon: <Mail className="w-5 h-5" /> },
                        { id: "bookingReminders", label: "Epoch Reminders", desc: "Synchronize upcoming expert sessions.", icon: <Calendar className="w-5 h-5" /> },
                        { id: "messageNotifications", label: "Direct Message Pulse", desc: "Instant notification for incoming message packets.", icon: <MessageSquare className="w-5 h-5" /> },
                        { id: "marketingEmails", label: "Expansion Briefs", desc: "Updates on network expansion and core updates.", icon: <Sparkles className="w-5 h-5" /> },
                      ].map((pref) => (
                        <div key={pref.id} className="flex items-center justify-between p-6 rounded-3xl bg-background/50 border border-border/50 group/item hover:border-primary/20 transition-all">
                          <div className="flex items-center gap-5">
                            <div className="w-12 h-12 rounded-2xl bg-secondary/50 flex items-center justify-center text-primary group-hover/item:scale-110 transition-transform">
                              {pref.icon}
                            </div>
                            <div>
                              <h3 className="font-black text-sm text-foreground">{pref.label}</h3>
                              <p className="text-xs font-medium text-muted-foreground italic">{pref.desc}</p>
                            </div>
                          </div>
                          <Switch
                            checked={(notifications as any)[pref.id]}
                            onCheckedChange={(checked) => handleNotificationChange(pref.id as any, checked)}
                            className="data-[state=checked]:bg-primary"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="privacy" className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <Card className="p-10 rounded-[40px] bg-secondary/10 border-border/50 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none group-hover:scale-110 transition-transform">
                    <Shield className="w-32 h-32 text-primary" />
                  </div>
                  
                  <div className="relative z-10 space-y-10">
                    <div className="space-y-1">
                       <h2 className="text-2xl font-black tracking-tight text-foreground">Stealth Protocol</h2>
                       <p className="text-sm font-medium text-muted-foreground italic leading-relaxed">Adjust your node's visibility across the centralized directory.</p>
                    </div>

                    <div className="space-y-8">
                      <div className="p-6 rounded-3xl bg-background/50 border border-border/50">
                        <Label className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground mb-4 block ml-1">Node Visibility Vector</Label>
                        <div className="grid grid-cols-3 gap-3">
                          {["public", "private", "unlisted"].map((option) => (
                            <Button
                              key={option}
                              variant={privacy.profileVisibility === option ? "default" : "outline"}
                              className={`h-16 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${
                                privacy.profileVisibility === option 
                                  ? "bg-primary text-primary-foreground shadow-xl shadow-primary/20" 
                                  : "bg-secondary/30 text-muted-foreground hover:bg-secondary/50 border-border/50"
                              }`}
                              onClick={() => handlePrivacyChange("profileVisibility", option)}
                            >
                              {option}
                            </Button>
                          ))}
                        </div>
                      </div>

                      {[
                        { id: "showEmail", label: "Public Email Vector", desc: "Reveal your primary signal on global profile.", icon: <Eye className="w-5 h-5" /> },
                        { id: "showPhone", label: "Public Signal Reveal", desc: "Display communication numbers to authorized nodes.", icon: <Phone className="w-5 h-5" /> },
                        { id: "allowMessages", label: "External Message Flow", desc: "Authorize non-expert nodes to initiate message packets.", icon: <MessageSquare className="w-5 h-5" /> },
                      ].map((pref) => (
                        <div key={pref.id} className="flex items-center justify-between p-6 rounded-3xl bg-background/50 border border-border/50 group/item hover:border-primary/20 transition-all">
                          <div className="flex items-center gap-5">
                            <div className="w-12 h-12 rounded-2xl bg-secondary/50 flex items-center justify-center text-primary group-hover/item:scale-110 transition-transform">
                              {pref.icon}
                            </div>
                            <div>
                              <h3 className="font-black text-sm text-foreground">{pref.label}</h3>
                              <p className="text-xs font-medium text-muted-foreground italic">{pref.desc}</p>
                            </div>
                          </div>
                          <Switch
                            checked={(privacy as any)[pref.id]}
                            onCheckedChange={(checked) => handlePrivacyChange(pref.id as any, checked)}
                            className="data-[state=checked]:bg-primary"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="billing" className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <Card className="p-10 rounded-[40px] bg-secondary/10 border-border/50 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none group-hover:scale-110 transition-transform">
                    <CreditCard className="w-32 h-32 text-primary" />
                  </div>
                  
                  <div className="relative z-10 space-y-12">
                    <div className="space-y-1">
                       <h2 className="text-2xl font-black tracking-tight text-foreground">Equity Management</h2>
                       <p className="text-sm font-medium text-muted-foreground italic leading-relaxed">Configure financial vectors for payment extraction and payouts.</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                       <Card className="p-8 rounded-[32px] bg-background border-border/50 shadow-2xl shadow-primary/5 flex flex-col justify-between group/bill">
                          <div className="space-y-4">
                            <div className="w-12 h-12 rounded-2xl bg-secondary/50 flex items-center justify-center text-primary group-hover/bill:scale-110 transition-transform">
                               <CreditCard className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-black tracking-tight">Active Extraction</h3>
                            <p className="text-xs font-medium text-muted-foreground leading-relaxed italic">Default method for service deployment and equity transfers.</p>
                          </div>
                          <Button variant="outline" className="mt-8 rounded-xl py-6 font-black text-xs uppercase tracking-widest border-border/50 hover:bg-secondary">Update Vector</Button>
                       </Card>

                       <Card className="p-8 rounded-[32px] bg-primary text-primary-foreground shadow-2xl shadow-primary/20 flex flex-col justify-between group/bill">
                          <div className="space-y-4">
                            <div className="w-12 h-12 rounded-2xl bg-background/20 flex items-center justify-center text-primary-foreground group-hover/bill:scale-110 transition-transform">
                               <Zap className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-black tracking-tight">Elite Accelerate</h3>
                            <p className="text-xs font-bold opacity-80 leading-relaxed italic">Maximize commission efficiency with our high-tier protocol.</p>
                          </div>
                          <Button className="mt-8 rounded-xl py-6 font-black text-xs uppercase tracking-widest bg-background text-foreground hover:scale-105 transition-all">Optimize Tier</Button>
                       </Card>
                    </div>

                    <div className="p-8 rounded-[32px] bg-background/50 border border-border/50 flex flex-col sm:flex-row items-center justify-between gap-6">
                       <div className="flex items-center gap-4 text-center sm:text-left">
                          <div className="w-12 h-12 rounded-2xl bg-secondary/50 flex items-center justify-center text-primary">
                             <Activity className="w-6 h-6" />
                          </div>
                          <div>
                            <h4 className="font-black text-sm">Equity Flow Trace</h4>
                            <p className="text-xs font-medium text-muted-foreground italic">Review historical equity reallocation packets.</p>
                          </div>
                       </div>
                       <Button variant="outline" className="rounded-xl px-8 py-6 font-black text-xs uppercase tracking-widest border-border/50 hover:bg-secondary">Access Ledger</Button>
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

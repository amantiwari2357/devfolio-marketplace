import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings as SettingsIcon, User, Bell, Shield, CreditCard, Save } from "lucide-react";
import api from "@/services/api";
import { connectSocket, getSocket } from "@/services/socket";

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

  const profileTimeout = useRef<NullableTimeout>(null);
  const notificationsTimeout = useRef<NullableTimeout>(null);
  const privacyTimeout = useRef<NullableTimeout>(null);

  useEffect(() => {
    const fetchUserSettings = async () => {
      try {
        const response = await api.get('/auth/profile');
        setUser(response.data.user);
        setNotifications(response.data.notifications);
        setPrivacy(response.data.privacy);
      } catch (error) {
        console.error('Error fetching user settings:', error);
      }
    };

    fetchUserSettings();

    const socket = connectSocket();

    // Optional: event listeners to update UI on server broadcasts
    // socket.on('profileUpdated', updatedProfile => setUser(updatedProfile));
    // socket.on('notificationsUpdated', updatedNotifications => setNotifications(updatedNotifications));
    // socket.on('privacyUpdated', updatedPrivacy => setPrivacy(updatedPrivacy));

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

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-2 mb-8">
          <SettingsIcon className="w-8 h-8" />
          <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="w-4 h-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="privacy" className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Privacy
            </TabsTrigger>
            <TabsTrigger value="billing" className="flex items-center gap-2">
              <CreditCard className="w-4 h-4" />
              Billing
            </TabsTrigger>
          </TabsList>

          {/* Profile Settings */}
          <TabsContent value="profile">
            <Card className="p-6 bg-card border-border">
              <h2 className="text-xl font-semibold mb-6">Profile Information</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={user.firstName}
                    onChange={(e) => handleUserChange("firstName", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={user.lastName}
                    onChange={(e) => handleUserChange("lastName", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={user.email}
                    onChange={(e) => handleUserChange("email", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={user.phone}
                    onChange={(e) => handleUserChange("phone", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    placeholder="https://yourwebsite.com"
                    value={user.website}
                    onChange={(e) => handleUserChange("website", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    placeholder="City, Country"
                    value={user.location}
                    onChange={(e) => handleUserChange("location", e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2 mt-6">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  placeholder="Tell us about yourself..."
                  value={user.bio}
                  onChange={(e) => handleUserChange("bio", e.target.value)}
                  rows={4}
                />
              </div>
            </Card>
          </TabsContent>

          {/* Notification Settings */}
          <TabsContent value="notifications">
            <Card className="p-6 bg-card border-border">
              <h2 className="text-xl font-semibold mb-6">Notification Preferences</h2>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Email Notifications</h3>
                    <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                  </div>
                  <Switch
                    checked={notifications.emailNotifications}
                    onCheckedChange={(checked) =>
                      handleNotificationChange("emailNotifications", checked)
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Booking Reminders</h3>
                    <p className="text-sm text-muted-foreground">
                      Get reminded about upcoming bookings
                    </p>
                  </div>
                  <Switch
                    checked={notifications.bookingReminders}
                    onCheckedChange={(checked) =>
                      handleNotificationChange("bookingReminders", checked)
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Message Notifications</h3>
                    <p className="text-sm text-muted-foreground">Notifications for new messages</p>
                  </div>
                  <Switch
                    checked={notifications.messageNotifications}
                    onCheckedChange={(checked) =>
                      handleNotificationChange("messageNotifications", checked)
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Marketing Emails</h3>
                    <p className="text-sm text-muted-foreground">
                      Receive promotional emails and updates
                    </p>
                  </div>
                  <Switch
                    checked={notifications.marketingEmails}
                    onCheckedChange={(checked) =>
                      handleNotificationChange("marketingEmails", checked)
                    }
                  />
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Privacy Settings */}
          <TabsContent value="privacy">
            <Card className="p-6 bg-card border-border">
              <h2 className="text-xl font-semibold mb-6">Privacy Settings</h2>
              <div className="space-y-6">
                <div>
                  <Label className="text-base font-medium">Profile Visibility</Label>
                  <p className="text-sm text-muted-foreground mb-3">Control who can see your profile</p>
                  <div className="flex gap-4">
                    {["public", "private", "unlisted"].map((option) => (
                      <Button
                        key={option}
                        variant={privacy.profileVisibility === option ? "default" : "outline"}
                        size="sm"
                        onClick={() => handlePrivacyChange("profileVisibility", option)}
                      >
                        {option.charAt(0).toUpperCase() + option.slice(1)}
                      </Button>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Show Email Address</h3>
                    <p className="text-sm text-muted-foreground">Display your email on your public profile</p>
                  </div>
                  <Switch
                    checked={privacy.showEmail}
                    onCheckedChange={checked => handlePrivacyChange("showEmail", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Show Phone Number</h3>
                    <p className="text-sm text-muted-foreground">Display your phone number on your profile</p>
                  </div>
                  <Switch
                    checked={privacy.showPhone}
                    onCheckedChange={(checked) => handlePrivacyChange("showPhone", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Allow Direct Messages</h3>
                    <p className="text-sm text-muted-foreground">Let other users send you direct messages</p>
                  </div>
                  <Switch
                    checked={privacy.allowMessages}
                    onCheckedChange={(checked) => handlePrivacyChange("allowMessages", checked)}
                  />
                </div>
              </div>
              <Button
                onClick={() => {}}
                disabled
                className="mt-6 bg-foreground text-background hover:bg-foreground/90 cursor-not-allowed"
              >
                <Save className="w-4 h-4 mr-2" />
                {"Saving... (auto)"}
              </Button>
            </Card>
          </TabsContent>

          {/* Billing Settings */}
          <TabsContent value="billing">
            <Card className="p-6 bg-card border-border">
              <h2 className="text-xl font-semibold mb-6">Billing & Payments</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-3">Payment Methods</h3>
                  <p className="text-muted-foreground mb-4">Manage your payment methods and billing information</p>
                  <Button variant="outline">Add Payment Method</Button>
                </div>
                <div>
                  <h3 className="font-medium mb-3">Billing History</h3>
                  <p className="text-muted-foreground mb-4">View your past transactions and invoices</p>
                  <Button variant="outline">View Billing History</Button>
                </div>
                <div>
                  <h3 className="font-medium mb-3">Subscription</h3>
                  <p className="text-muted-foreground mb-4">Manage your subscription plan</p>
                  <Button variant="outline">Manage Subscription</Button>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Settings;

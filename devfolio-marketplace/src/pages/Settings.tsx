import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings as SettingsIcon, User, Bell, Shield, CreditCard, Save } from "lucide-react";
import api from "@/services/api";

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

  useEffect(() => {
    const fetchUserSettings = async () => {
      try {
        const response = await api.get('/auth/profile');
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user settings:', error);
      }
    };

    fetchUserSettings();
  }, []);

  const handleSaveProfile = async () => {
    setLoading(true);
    try {
      await api.put('/auth/profile', user);
      // Show success message
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveNotifications = async () => {
    setLoading(true);
    try {
      await api.put('/user/notifications', notifications);
      // Show success message
    } catch (error) {
      console.error('Error updating notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSavePrivacy = async () => {
    setLoading(true);
    try {
      await api.put('/user/privacy', privacy);
      // Show success message
    } catch (error) {
      console.error('Error updating privacy:', error);
    } finally {
      setLoading(false);
    }
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
                    onChange={(e) => setUser({...user, firstName: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={user.lastName}
                    onChange={(e) => setUser({...user, lastName: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={user.email}
                    onChange={(e) => setUser({...user, email: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={user.phone}
                    onChange={(e) => setUser({...user, phone: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    placeholder="https://yourwebsite.com"
                    value={user.website}
                    onChange={(e) => setUser({...user, website: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    placeholder="City, Country"
                    value={user.location}
                    onChange={(e) => setUser({...user, location: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-2 mt-6">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  placeholder="Tell us about yourself..."
                  value={user.bio}
                  onChange={(e) => setUser({...user, bio: e.target.value})}
                  rows={4}
                />
              </div>
              <Button
                onClick={handleSaveProfile}
                disabled={loading}
                className="mt-6 bg-foreground text-background hover:bg-foreground/90"
              >
                <Save className="w-4 h-4 mr-2" />
                {loading ? 'Saving...' : 'Save Profile'}
              </Button>
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
                      setNotifications({...notifications, emailNotifications: checked})
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Booking Reminders</h3>
                    <p className="text-sm text-muted-foreground">Get reminded about upcoming bookings</p>
                  </div>
                  <Switch
                    checked={notifications.bookingReminders}
                    onCheckedChange={(checked) =>
                      setNotifications({...notifications, bookingReminders: checked})
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
                      setNotifications({...notifications, messageNotifications: checked})
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Marketing Emails</h3>
                    <p className="text-sm text-muted-foreground">Receive promotional emails and updates</p>
                  </div>
                  <Switch
                    checked={notifications.marketingEmails}
                    onCheckedChange={(checked) =>
                      setNotifications({...notifications, marketingEmails: checked})
                    }
                  />
                </div>
              </div>
              <Button
                onClick={handleSaveNotifications}
                disabled={loading}
                className="mt-6 bg-foreground text-background hover:bg-foreground/90"
              >
                <Save className="w-4 h-4 mr-2" />
                {loading ? 'Saving...' : 'Save Preferences'}
              </Button>
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
                    {['public', 'private', 'unlisted'].map((option) => (
                      <Button
                        key={option}
                        variant={privacy.profileVisibility === option ? "default" : "outline"}
                        size="sm"
                        onClick={() => setPrivacy({...privacy, profileVisibility: option})}
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
                    onCheckedChange={(checked) =>
                      setPrivacy({...privacy, showEmail: checked})
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Show Phone Number</h3>
                    <p className="text-sm text-muted-foreground">Display your phone number on your profile</p>
                  </div>
                  <Switch
                    checked={privacy.showPhone}
                    onCheckedChange={(checked) =>
                      setPrivacy({...privacy, showPhone: checked})
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Allow Direct Messages</h3>
                    <p className="text-sm text-muted-foreground">Let other users send you direct messages</p>
                  </div>
                  <Switch
                    checked={privacy.allowMessages}
                    onCheckedChange={(checked) =>
                      setPrivacy({...privacy, allowMessages: checked})
                    }
                  />
                </div>
              </div>
              <Button
                onClick={handleSavePrivacy}
                disabled={loading}
                className="mt-6 bg-foreground text-background hover:bg-foreground/90"
              >
                <Save className="w-4 h-4 mr-2" />
                {loading ? 'Saving...' : 'Save Privacy Settings'}
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

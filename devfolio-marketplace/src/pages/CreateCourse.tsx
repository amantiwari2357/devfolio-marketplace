import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Upload, Code, MonitorSmartphone, Plus } from "lucide-react";

const CreateService = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="mb-12">
            <h1 className="text-5xl font-bold mb-4 text-foreground">Add Your Service</h1>
            <p className="text-xl text-muted-foreground">
              Showcase your digital solutions — websites, apps, and branding — all in one place.
            </p>
          </div>

          <Card className="p-8 bg-card border-border mb-8">
            <h2 className="text-2xl font-bold mb-6 text-foreground">Service Details</h2>
            <div className="space-y-6">
              <div>
                <Label htmlFor="serviceTitle">Service Title</Label>
                <Input
                  id="serviceTitle"
                  placeholder="Enter your service title (e.g., Web Development)"
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="serviceDescription">Service Description</Label>
                <Textarea
                  id="serviceDescription"
                  placeholder="Describe what’s included in this service"
                  className="mt-2 min-h-32"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="servicePrice">Starting Price (₹)</Label>
                  <Input
                    id="servicePrice"
                    type="number"
                    placeholder="4999"
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="serviceCategory">Category</Label>
                  <Input
                    id="serviceCategory"
                    placeholder="e.g., Website, Mobile App, Branding"
                    className="mt-2"
                  />
                </div>
              </div>

              <div>
                <Label>Service Image / Thumbnail</Label>
                <div className="mt-2 border-2 border-dashed border-border rounded-lg p-12 text-center hover:border-primary transition-colors cursor-pointer">
                  <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground mb-2">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-sm text-muted-foreground">
                    PNG, JPG or WEBP (max. 2MB)
                  </p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-8 bg-card border-border mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-foreground">Service Features</h2>
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                Add Feature
              </Button>
            </div>

            <div className="space-y-4">
              <div className="border border-border rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-lg text-foreground">
                    Feature 1: Responsive Design
                  </h3>
                  <Button variant="outline" size="sm">Edit</Button>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-accent/50 rounded-lg">
                    <MonitorSmartphone className="w-5 h-5 text-primary" />
                    <span className="flex-1">Mobile-friendly layouts</span>
                    <span className="text-sm text-muted-foreground">Included</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-accent/50 rounded-lg">
                    <Code className="w-5 h-5 text-primary" />
                    <span className="flex-1">Clean, SEO-optimized code</span>
                    <span className="text-sm text-muted-foreground">Included</span>
                  </div>
                  <Button variant="outline" size="sm" className="w-full gap-2">
                    <Plus className="w-4 h-4" />
                    Add More
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-8 bg-dark-section text-dark-foreground border-none">
            <h2 className="text-2xl font-bold mb-4">Why Offer Services on devfolio-marketplace?</h2>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-primary"></span>
                Zero commission — keep 100% of your earnings
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-primary"></span>
                Instant payment processing with bank transfer
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-primary"></span>
                Manage all your clients from one dashboard
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-primary"></span>
                Grow visibility with built-in marketing tools
              </li>
            </ul>
          </Card>

          <div className="flex gap-4 mt-8">
            <Button size="lg" className="flex-1 bg-foreground text-background hover:bg-foreground/90">
              Publish Service
            </Button>
            <Button size="lg" variant="outline" className="flex-1">
              Save as Draft
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CreateService;

import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Code, Smartphone, Globe, Database, Cloud, Server, Shield } from "lucide-react";
import { toast } from "sonner";

const UseCases = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    service: ""
  });

  const services = [
    {
      icon: <Code className="w-12 h-12 text-primary" />,
      title: "Custom Web Development",
      description: "Bespoke web applications built with modern technologies to meet your specific business needs.",
      benefits: ["Responsive Design", "SEO Optimized", "Fast Loading"]
    },
    {
      icon: <Smartphone className="w-12 h-12 text-primary" />,
      title: "Mobile App Development",
      description: "Cross-platform mobile applications that work seamlessly on both iOS and Android devices.",
      benefits: ["Native Performance", "Offline Support", "App Store Ready"]
    },
    {
      icon: <Globe className="w-12 h-12 text-primary" />,
      title: "E-commerce Solutions",
      description: "Complete e-commerce platforms with secure payment gateways and inventory management.",
      benefits: ["Secure Checkout", "Product Management", "Order Tracking"]
    },
    {
      icon: <Database className="w-12 h-12 text-primary" />,
      title: "Database Management",
      description: "Efficient database design, optimization, and management for your applications.",
      benefits: ["Data Security", "High Availability", "Performance Tuning"]
    },
    {
      icon: <Cloud className="w-12 h-12 text-primary" />,
      title: "Cloud Services",
      description: "Cloud infrastructure setup, migration, and management on AWS, Azure, or Google Cloud.",
      benefits: ["Scalability", "Cost Effective", "High Availability"]
    },
    {
      icon: <Server className="w-12 h-12 text-primary" />,
      title: "DevOps & CI/CD",
      description: "Automated deployment pipelines and infrastructure as code for seamless development workflows.",
      benefits: ["Faster Deployments", "Automated Testing", "Reliable Releases"]
    },
    {
      icon: <Shield className="w-12 h-12 text-primary" />,
      title: "Cybersecurity",
      description: "Comprehensive security solutions to protect your digital assets and data.",
      benefits: ["Vulnerability Assessment", "Penetration Testing", "Security Audits"]
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Enquiry submitted:', formData);
    toast.success('Thank you for your enquiry! We will contact you soon.');
    setIsDialogOpen(false);
    // Reset form
    setFormData({ name: '', phone: '', service: '' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-5xl font-bold mb-6 text-foreground">
              Professional Software Development Services
            </h1>
            <p className="text-xl text-muted-foreground">
              Custom software solutions tailored to your business needs. From web and mobile apps to cloud services and beyond.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {services.map((service, index) => (
              <Card key={index} className="p-8 bg-card border-border hover:shadow-lg transition-shadow group">
                <div className="mb-6 group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-foreground">{service.title}</h3>
                <p className="text-muted-foreground mb-6">{service.description}</p>
                <ul className="space-y-2 mb-6">
                  {service.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                      {benefit}
                    </li>
                  ))}
                </ul>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button 
                      variant="outline" 
                      className="w-full mt-4"
                      onClick={() => setFormData(prev => ({ ...prev, service: service.title }))}
                    >
                      Get a Quote
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle className="text-2xl mb-2">Request a Call Back</DialogTitle>
                      <p className="text-muted-foreground mb-6">
                        We'll get back to you within 24 hours to discuss your {service.title} needs.
                      </p>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input 
                          id="name" 
                          name="name" 
                          placeholder="Your name" 
                          value={formData.name}
                          onChange={handleInputChange}
                          required 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input 
                          id="phone" 
                          name="phone" 
                          type="tel" 
                          placeholder="Your phone number" 
                          value={formData.phone}
                          onChange={handleInputChange}
                          required 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Service</Label>
                        <Input 
                          value={service.title} 
                          disabled 
                          className="opacity-70"
                        />
                      </div>
                      <Button type="submit" className="w-full mt-4">
                        Request Call Back
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
              </Card>
            ))}
          </div>

          <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-3xl p-12 text-center">
            <h2 className="text-4xl font-bold mb-4 text-foreground">Have a Project in Mind?</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let's discuss how we can turn your ideas into reality with our expert software development services.
            </p>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90">
                  Get a Free Consultation
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="text-2xl mb-2">Schedule a Free Consultation</DialogTitle>
                  <p className="text-muted-foreground mb-6">
                    Fill out the form below and we'll get back to you within 24 hours.
                  </p>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input 
                      id="name" 
                      name="name" 
                      placeholder="Your name" 
                      value={formData.name}
                      onChange={handleInputChange}
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input 
                      id="phone" 
                      name="phone" 
                      type="tel" 
                      placeholder="Your phone number" 
                      value={formData.phone}
                      onChange={handleInputChange}
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="service">Service You're Interested In</Label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={(e) => setFormData(prev => ({ ...prev, service: e.target.value }))}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      required
                    >
                      <option value="">Select a service</option>
                      {services.map((service, index) => (
                        <option key={index} value={service.title}>{service.title}</option>
                      ))}
                    </select>
                  </div>
                  <Button type="submit" className="w-full mt-4">
                    Request Free Consultation
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default UseCases;

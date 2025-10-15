import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MessageSquare, Phone } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-5xl font-bold mb-6 text-foreground">Get in Touch</h1>
            <p className="text-xl text-muted-foreground">
              Have questions? We're here to help. Reach out to our team.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="p-8 bg-card border-border text-center">
              <Mail className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-bold text-xl mb-2 text-foreground">Email Us</h3>
              <p className="text-muted-foreground mb-4">Our team responds within 24 hours</p>
              <a href="mailto:support@devfolio-marketplace.io" className="text-primary hover:underline">
                support@devfolio-marketplace.io
              </a>
            </Card>

            <Card className="p-8 bg-card border-border text-center">
              <MessageSquare className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-bold text-xl mb-2 text-foreground">Live Chat</h3>
              <p className="text-muted-foreground mb-4">Chat with our support team</p>
              <Button className="bg-foreground text-background hover:bg-foreground/90">
                Start Chat
              </Button>
            </Card>

            <Card className="p-8 bg-card border-border text-center">
              <Phone className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-bold text-xl mb-2 text-foreground">Call Us</h3>
              <p className="text-muted-foreground mb-4">Mon-Fri, 9AM to 6PM IST</p>
              <a href="tel:+911234567890" className="text-primary hover:underline">
                +91 123 456 7890
              </a>
            </Card>
          </div>

          <Card className="max-w-2xl mx-auto p-8 bg-card border-border">
            <h2 className="text-3xl font-bold mb-6 text-foreground">Send us a Message</h2>
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" placeholder="John" className="mt-2" />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" placeholder="Doe" className="mt-2" />
                </div>
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  placeholder="How can we help?"
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Tell us more about your inquiry..."
                  className="mt-2 min-h-32"
                />
              </div>

              <Button type="submit" className="w-full bg-foreground text-background hover:bg-foreground/90">
                Send Message
              </Button>
            </form>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;

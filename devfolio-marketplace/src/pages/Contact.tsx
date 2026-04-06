import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MessageSquare, Phone, Send, Info } from "lucide-react";
import SEO from "@/components/layout/SEO";

const Contact = () => {
  return (
    <div className="min-h-screen bg-background selection:bg-primary selection:text-primary-foreground">
      <SEO 
        title="Contact Our Team" 
        description="Have questions about Devfolio Marketplace? Our support team is here to help you build your digital future." 
      />
      <Header />
      
      <main className="pt-32 pb-24 overflow-hidden">
        {/* Background Accents */}
        <div className="fixed top-0 right-0 -z-10 w-1/3 h-1/3 bg-primary/5 blur-[120px] pointer-events-none rounded-full" />
        <div className="fixed bottom-0 left-0 -z-10 w-1/3 h-1/3 bg-primary/5 blur-[120px] pointer-events-none rounded-full" />

        <div className="container mx-auto px-4 relative">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border/50 text-xs font-black uppercase tracking-[0.2em] text-primary">
              <MessageSquare className="w-4 h-4" />
              Direct Support
            </div>
            <h1 className="text-5xl md:text-6xl font-black tracking-tight text-foreground leading-tight">
              Get in <span className="text-primary italic">touch.</span>
            </h1>
            <p className="text-xl text-muted-foreground font-medium leading-relaxed">
              Facing a hurdle? Or just want to say hi? Our specialized success team is ready to assist you.
            </p>
          </div>

          {/* Quick Contact Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-20">
            <Card className="p-10 rounded-3xl bg-secondary/30 border-border/50 group hover:border-primary/20 transition-all text-center space-y-4">
              <div className="mx-auto w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                <Mail className="w-8 h-8" />
              </div>
              <h3 className="font-black text-xl tracking-tight text-foreground">Email Intelligence</h3>
              <p className="text-muted-foreground font-medium">Standard response in &lt;12h</p>
              <div className="pt-2">
                <a href="mailto:support@devfolio.io" className="text-lg font-bold text-primary underline decoration-primary/30 underline-offset-4 hover:decoration-primary transition-all">
                  support@devfolio.io
                </a>
              </div>
            </Card>

            <Card className="p-10 rounded-3xl bg-secondary/30 border-border/50 group hover:border-primary/20 transition-all text-center space-y-4">
              <div className="mx-auto w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                <MessageSquare className="w-8 h-8" />
              </div>
              <h3 className="font-black text-xl tracking-tight text-foreground">Live Operations</h3>
              <p className="text-muted-foreground font-medium">Available for priority members</p>
              <div className="pt-2">
                <Button className="rounded-xl px-8 font-black bg-primary text-primary-foreground hover:scale-105 transition-transform shadow-lg shadow-primary/20">
                  Secure Chat
                </Button>
              </div>
            </Card>

            <Card className="p-10 rounded-3xl bg-secondary/30 border-border/50 group hover:border-primary/20 transition-all text-center space-y-4">
              <div className="mx-auto w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                <Phone className="w-8 h-8" />
              </div>
              <h3 className="font-black text-xl tracking-tight text-foreground">Direct Hotline</h3>
              <p className="text-muted-foreground font-medium">Mon-Fri, 9AM to 6PM IST</p>
              <div className="pt-2">
                <a href="tel:+918000000000" className="text-lg font-bold text-primary underline decoration-primary/30 underline-offset-4 hover:decoration-primary transition-all">
                  +91-DEVFOLIO
                </a>
              </div>
            </Card>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="p-8 md:p-16 rounded-[40px] bg-card border-border/50 shadow-2xl shadow-primary/5 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:rotate-12 transition-transform duration-700 pointer-events-none">
                <Send className="w-64 h-64 text-primary" />
              </div>
              
              <div className="relative z-10 grid lg:grid-cols-12 gap-12">
                <div className="lg:col-span-5 space-y-6">
                  <h2 className="text-4xl font-black tracking-tight text-foreground leading-tight">
                    Send us a <span className="text-primary italic">message.</span>
                  </h2>
                  <p className="text-muted-foreground font-medium leading-relaxed">
                    Our partnership team handles every inquiry with white-glove precision.
                  </p>
                  <div className="pt-8 space-y-4">
                    <div className="flex items-center gap-3 p-4 rounded-2xl bg-secondary/30 border border-border/50">
                      <div className="p-2 rounded-xl bg-primary/10 text-primary">
                        <Info className="w-4 h-4" />
                      </div>
                      <p className="text-xs font-black uppercase tracking-widest text-muted-foreground">End-to-end Encrypted</p>
                    </div>
                  </div>
                </div>

                <form className="lg:col-span-7 space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-xs font-black uppercase tracking-widest text-muted-foreground">First Name</Label>
                      <Input id="firstName" placeholder="John" className="rounded-xl py-6 bg-secondary/30 border-border/50 focus:border-primary/50 transition-all font-medium" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-xs font-black uppercase tracking-widest text-muted-foreground">Last Name</Label>
                      <Input id="lastName" placeholder="Doe" className="rounded-xl py-6 bg-secondary/30 border-border/50 focus:border-primary/50 transition-all font-medium" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-xs font-black uppercase tracking-widest text-muted-foreground">Email address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      className="rounded-xl py-6 bg-secondary/30 border-border/50 focus:border-primary/50 transition-all font-medium"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-xs font-black uppercase tracking-widest text-muted-foreground">Subject of Inquiry</Label>
                    <Input
                      id="subject"
                      placeholder="Technical Query"
                      className="rounded-xl py-6 bg-secondary/30 border-border/50 focus:border-primary/50 transition-all font-medium"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-xs font-black uppercase tracking-widest text-muted-foreground">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Detail your request..."
                      className="rounded-xl bg-secondary/30 border-border/50 focus:border-primary/50 transition-all font-medium min-h-32 p-4"
                    />
                  </div>

                  <Button type="submit" className="w-full rounded-xl py-8 font-black text-xl bg-primary text-primary-foreground hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-primary/20">
                    Dispatch Message
                  </Button>
                </form>
              </div>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;

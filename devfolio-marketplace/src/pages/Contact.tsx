import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MessageSquare, Phone, Send, Info, ShieldCheck, Zap, Activity, Globe, Fingerprint, ArrowRight } from "lucide-react";
import SEO from "@/components/layout/SEO";

const Contact = () => {
  return (
    <div className="min-h-screen bg-background selection:bg-primary selection:text-primary-foreground">
      <SEO
        title="Signal Terminal | Connect"
        description="Have questions about Devfolio Marketplace? Our support team is here to help you build your digital future."
      />
      <Header />

      <main className="section-spacing pt-32 md:pt-40 relative">
        <div className="container mx-auto px-6 relative">
          <div className="text-center max-w-4xl mx-auto mb-16 md:mb-20 space-y-4 md:space-y-6 animate-slide-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-border/40 backdrop-blur-md text-xs font-semibold text-primary shadow-sm">
              <Activity className="w-4 h-4" />
              Contact Support
            </div>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground leading-tight">
              Get in <span className="text-primary">Touch.</span>
            </h1>
            <p className="text-base md:text-lg text-muted-foreground font-medium max-w-2xl mx-auto leading-relaxed">
              Facing a hurdle? Or just want to say hi? Our specialized success team is ready to assist you in real-time.
            </p>
          </div>

          {/* Quick Contact Protocol Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20 animate-slide-up" style={{ animationDelay: '100ms' }}>
            {[
              { icon: <Mail className="w-6 h-6" />, title: "Email Support", sub: "Standard response in <12h", val: "support@devfoliomarketplace.com", href: "mailto:devfoliomarketplace@gmail.com" },
              { icon: <MessageSquare className="w-6 h-6" />, title: "Live Chat", sub: "Priority access", action: "Start Chat" },
              { icon: <Phone className="w-6 h-6" />, title: "Direct Hotline", sub: "Mon-Fri, 9AM to 6PM IST", val: "9031359720", href: "tel:9031359720" },
            ].map((item, i) => (
              <Card key={i} className="neural-card p-8 md:p-10 text-center space-y-6 shadow-md relative overflow-hidden group">
                <div className="mx-auto w-16 h-16 rounded-2xl bg-secondary/50 flex items-center justify-center text-primary mb-4 shadow-sm group-hover:scale-105 group-hover:rotate-6 transition-all">
                  {item.icon}
                </div>
                <div className="space-y-2">
                  <h3 className="font-bold text-xl text-foreground">{item.title}</h3>
                  <p className="text-sm font-medium text-muted-foreground">{item.sub}</p>
                </div>
                <div className="pt-2">
                  {item.action ? (
                    <Button className="h-12 rounded-xl px-8 font-bold bg-primary text-primary-foreground hover:scale-[1.02] transition-all shadow-sm">
                      {item.action}
                    </Button>
                  ) : (
                    <a href={item.href} className="text-base md:text-lg font-bold text-primary hover:underline transition-all block truncate">
                      {item.val}
                    </a>
                  )}
                </div>
              </Card>
            ))}
          </div>

          {/* Contact Inquiry Section */}
          <div className="max-w-5xl mx-auto animate-slide-up mb-24" style={{ animationDelay: '200ms' }}>
            <Card className="p-8 md:p-14 relative overflow-hidden group shadow-lg rounded-[32px] md:rounded-[40px] border-border/60">
              <div className="absolute top-0 right-0 p-8 md:p-12 opacity-5 pointer-events-none group-hover:scale-105 transition-transform duration-1000">
                <Send className="w-48 h-48 md:w-64 md:h-64 text-primary" />
              </div>

              <div className="relative z-10 grid lg:grid-cols-12 gap-12">
                <div className="lg:col-span-5 space-y-8">
                  <div className="space-y-4">
                    <h2 className="text-3xl font-bold tracking-tight text-foreground leading-tight">
                      Send us a <span className="text-primary">message.</span>
                    </h2>
                    <p className="text-base font-medium text-muted-foreground leading-relaxed">
                      Our partnership team handles every inquiry with total confidentiality.
                    </p>
                  </div>

                  <div className="space-y-6 pt-6">
                    <div className="flex items-center gap-4 p-5 rounded-2xl bg-background/50 border border-border/20 shadow-sm group/info hover:border-primary/30 transition-all cursor-pointer">
                      <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover/info:scale-110 transition-transform">
                        <ShieldCheck className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">Security Protocol</p>
                        <p className="text-xs font-medium text-muted-foreground">End-to-End Encrypted</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-5 rounded-2xl bg-background/50 border border-border/20 shadow-sm group/info hover:border-primary/30 transition-all cursor-pointer">
                      <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover/info:scale-110 transition-transform">
                        <Fingerprint className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">Verified Origin</p>
                        <p className="text-xs font-medium text-muted-foreground">Identity Verification</p>
                      </div>
                    </div>
                  </div>
                </div>

                <form className="lg:col-span-7 space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-sm font-semibold text-foreground ml-1">First Name</Label>
                      <Input id="firstName" placeholder="First Name" className="h-12 md:h-14 rounded-xl px-4 bg-background border-border focus:border-primary focus:ring-primary/20 transition-all text-sm md:text-base placeholder:text-muted-foreground/50" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-sm font-semibold text-foreground ml-1">Last Name</Label>
                      <Input id="lastName" placeholder="Last Name" className="h-12 md:h-14 rounded-xl px-4 bg-background border-border focus:border-primary focus:ring-primary/20 transition-all text-sm md:text-base placeholder:text-muted-foreground/50" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-semibold text-foreground ml-1">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="hello@devfolio.com"
                      className="h-12 md:h-14 rounded-xl px-4 bg-background border-border focus:border-primary focus:ring-primary/20 transition-all text-sm md:text-base placeholder:text-muted-foreground/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-sm font-semibold text-foreground ml-1">Subject</Label>
                    <Input
                      id="subject"
                      placeholder="How can we help you?"
                      className="h-12 md:h-14 rounded-xl px-4 bg-background border-border focus:border-primary focus:ring-primary/20 transition-all text-sm md:text-base placeholder:text-muted-foreground/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-sm font-semibold text-foreground ml-1">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Describe your inquiry..."
                      className="rounded-xl bg-background border-border focus:border-primary focus:ring-primary/20 transition-all text-sm md:text-base min-h-[150px] p-4 placeholder:text-muted-foreground/50 resize-y shadow-sm"
                    />
                  </div>

                  <div className="pt-4">
                    <Button type="submit" className="w-full h-12 md:h-14 rounded-xl font-bold text-base bg-primary text-primary-foreground hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg gap-2 group">
                      Send Message
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
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


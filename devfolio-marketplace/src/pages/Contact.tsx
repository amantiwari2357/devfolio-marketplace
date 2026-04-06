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
          <div className="text-center max-w-5xl mx-auto mb-16 md:mb-24 space-y-10 animate-slide-up">
            <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-secondary/10 border border-border/40 backdrop-blur-md text-[10px] font-black uppercase tracking-[0.4em] text-primary italic">
              <Activity className="w-4 h-4 animate-pulse" />
              Direct Communication Stream
            </div>
            <h1 className="heading-responsive">
              Establish <span className="text-primary NOT-italic">Connection.</span>
            </h1>
            <p className="text-base md:text-xl text-muted-foreground font-bold italic tracking-tight leading-relaxed max-w-3xl mx-auto opacity-70">
              Facing a hurdle? Or just want to say hi? Our specialized success team is ready to assist you in real-time.
            </p>
          </div>

          {/* Quick Contact Protocol Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-24 animate-slide-up" style={{ animationDelay: '100ms' }}>
            {[
              { icon: <Mail className="w-8 h-8" />, title: "Email Intelligence", sub: "Standard response in <12h", val: "support@devfoliomarketplace.com", href: "mailto:devfoliomarketplace@gmail.com" },
              { icon: <MessageSquare className="w-8 h-8" />, title: "Live Operations", sub: "Priority access protocol", action: "Initialize Secure Chat" },
              { icon: <Phone className="w-8 h-8" />, title: "Direct Hotline", sub: "Mon-Fri, 9AM to 6PM IST", val: "9031359720", href: "tel:9031359720" },
            ].map((item, i) => (
              <Card key={i} className="neural-card p-10 md:p-12 text-center space-y-6 shadow-xl relative overflow-hidden group">
                <div className="mx-auto w-20 h-20 rounded-[28px] bg-secondary/50 flex items-center justify-center text-primary mb-6 shadow-inner group-hover:scale-110 group-hover:rotate-6 transition-all">
                  {item.icon}
                </div>
                <div className="space-y-2">
                  <h3 className="font-black text-xl md:text-2xl tracking-tighter text-foreground italic uppercase">{item.title}</h3>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground opacity-50 italic">{item.sub}</p>
                </div>
                <div className="pt-4">
                  {item.action ? (
                    <Button className="h-14 rounded-[18px] px-8 font-black bg-primary text-primary-foreground hover:scale-105 transition-all shadow-xl shadow-primary/20 uppercase tracking-[0.2em] text-[10px] border-none italic">
                      {item.action}
                    </Button>
                  ) : (
                    <a href={item.href} className="text-lg md:text-xl font-black text-primary italic underline decoration-primary/20 underline-offset-8 hover:decoration-primary transition-all truncate block">
                      {item.val}
                    </a>
                  )}
                </div>
              </Card>
            ))}
          </div>

          {/* Main Inquiry Core */}
          <div className="max-w-6xl mx-auto animate-slide-up" style={{ animationDelay: '200ms' }}>
            <Card className="neural-card p-8 md:p-24 relative overflow-hidden group shadow-2xl">
              <div className="absolute top-0 right-0 p-16 opacity-0 group-hover:opacity-5 transition-all duration-1000 translate-x-12 translate-y-[-12px] group-hover:translate-x-0 group-hover:translate-y-0 pointer-events-none">
                <Send className="w-[400px] h-[400px] text-primary" />
              </div>

              <div className="relative z-10 grid lg:grid-cols-12 gap-20">
                <div className="lg:col-span-5 space-y-10">
                  <div className="space-y-4">
                    <h2 className="text-3xl font-black tracking-tighter text-foreground leading-[0.9] italic uppercase">
                      Send us a <span className="text-primary NOT-italic">message.</span>
                    </h2>
                    <p className="text-lg font-bold text-muted-foreground/70 italic leading-relaxed tracking-tight max-w-xs">
                      Our partnership team handles every inquiry with white-glove precision and total confidentiality.
                    </p>
                  </div>

                  <div className="space-y-6 pt-10">
                    <div className="flex items-center gap-5 p-6 rounded-[28px] bg-background/50 border border-border/20 shadow-inner group/info hover:border-primary/30 transition-all cursor-pointer">
                      <div className="p-3 rounded-2xl bg-primary/10 text-primary group-hover/info:scale-110 transition-transform">
                        <ShieldCheck className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-foreground italic">Security Protocol</p>
                        <p className="text-xs font-bold text-muted-foreground opacity-60">End-to-End Encrypted Signal</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-5 p-6 rounded-[28px] bg-background/50 border border-border/20 shadow-inner group/info hover:border-primary/30 transition-all cursor-pointer">
                      <div className="p-3 rounded-2xl bg-primary/10 text-primary group-hover/info:scale-110 transition-transform">
                        <Fingerprint className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-foreground italic">Identity Verification</p>
                        <p className="text-xs font-bold text-muted-foreground opacity-60">Verified Origin Protocol</p>
                      </div>
                    </div>
                  </div>
                </div>

                <form className="lg:col-span-7 space-y-10">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <Label htmlFor="firstName" className="text-[11px] font-black uppercase tracking-[0.4em] text-foreground ml-4 italic px-2">First Identity</Label>
                      <Input id="firstName" placeholder="ENTER_FIRST_NAME" className="h-16 rounded-[22px] px-8 bg-background border-border focus:border-primary focus:ring-primary/20 transition-all font-black text-xs uppercase tracking-widest placeholder:opacity-40" />
                    </div>
                    <div className="space-y-4">
                      <Label htmlFor="lastName" className="text-[11px] font-black uppercase tracking-[0.4em] text-foreground ml-4 italic px-2">Last Identity</Label>
                      <Input id="lastName" placeholder="ENTER_LAST_NAME" className="h-16 rounded-[22px] px-8 bg-background border-border focus:border-primary focus:ring-primary/20 transition-all font-black text-xs uppercase tracking-widest placeholder:opacity-40" />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label htmlFor="email" className="text-[11px] font-black uppercase tracking-[0.4em] text-foreground ml-4 italic px-2">Signal Node (Email)</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="OPERATOR@DEVFOLIOMARKETPLACE.COM"
                      className="h-16 rounded-[22px] px-8 bg-background border-border focus:border-primary focus:ring-primary/20 transition-all font-black text-xs uppercase tracking-widest placeholder:opacity-40"
                    />
                  </div>

                  <div className="space-y-4">
                    <Label htmlFor="subject" className="text-[11px] font-black uppercase tracking-[0.4em] text-foreground ml-4 italic px-2">Inquiry Vector</Label>
                    <Input
                      id="subject"
                      placeholder="TECHNICAL_QUERY"
                      className="h-16 rounded-[22px] px-8 bg-background border-border focus:border-primary focus:ring-primary/20 transition-all font-black text-xs uppercase tracking-widest placeholder:opacity-40"
                    />
                  </div>

                  <div className="space-y-4">
                    <Label htmlFor="message" className="text-[11px] font-black uppercase tracking-[0.4em] text-foreground ml-4 italic px-2">Message Payload</Label>
                    <Textarea
                      id="message"
                      placeholder="INITIALIZE_MESSAGE_PAYLOAD..."
                      className="rounded-[28px] bg-background border-border focus:border-primary focus:ring-primary/20 transition-all font-black text-xs uppercase tracking-widest min-h-[220px] p-10 placeholder:opacity-40 resize-none shadow-inner"
                    />
                  </div>

                  <div className="pt-6">
                    <Button type="submit" className="w-full h-20 rounded-[28px] font-black text-2xl bg-primary text-primary-foreground hover:scale-[1.02] active:scale-[0.98] transition-all shadow-2xl shadow-primary/30 gap-8 uppercase tracking-[0.25em] border-none italic group">
                      Dispatch Message
                      <ArrowRight className="w-8 h-8 stroke-[4px] group-hover:translate-x-2 transition-transform" />
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


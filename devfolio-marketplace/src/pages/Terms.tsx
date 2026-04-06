import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card } from "@/components/ui/card";
import { Scale, ShieldCheck, FileText, Info, Database } from "lucide-react";
import SEO from "@/components/layout/SEO";

const Terms = () => {
  return (
    <div className="min-h-screen bg-background selection:bg-primary selection:text-primary-foreground">
      <SEO
        title="Terms of Service"
        description="Read the terms and conditions for using Devfolio Marketplace. We ensure a fair and transparent environment for all creators."
      />
      <Header />

      <main className="section-spacing pt-32 md:pt-40 relative overflow-hidden">
        {/* Background Accents */}
        <div className="fixed top-0 right-0 -z-10 w-1/3 h-1/3 bg-primary/5 blur-[120px] pointer-events-none rounded-full" />
        <div className="fixed bottom-0 left-0 -z-10 w-1/3 h-1/3 bg-primary/5 blur-[120px] pointer-events-none rounded-full" />

        <div className="container mx-auto px-6 max-w-5xl relative">
          <div className="text-center max-w-3xl mx-auto mb-20 md:mb-32 space-y-10 animate-slide-up">
            <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-secondary/10 border border-border/40 backdrop-blur-md text-[10px] font-black uppercase tracking-[0.4em] text-primary italic">
              <Scale className="w-4 h-4 animate-pulse" />
              Legal Framework Protocol
            </div>
            <h1 className="heading-responsive">
              Terms of <span className="text-primary NOT-italic">Service.</span>
            </h1>
            <p className="text-base md:text-xl text-muted-foreground font-bold italic tracking-tight leading-relaxed max-w-3xl mx-auto opacity-70 mt-8">
              Last updated: <span className="text-foreground NOT-italic">January 15, 2025</span>
            </p>
          </div>

          <Card className="p-8 md:p-16 rounded-[40px] bg-secondary/30 border-border/50 shadow-2xl shadow-primary/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none group-hover:rotate-12 transition-transform duration-700">
              <FileText className="w-64 h-64 text-primary" />
            </div>

            <div className="relative z-10 space-y-12 text-foreground">
              <section className="space-y-4">
                <h2 className="text-2xl font-black tracking-tight flex items-center gap-3">
                  <span className="text-primary">01.</span> Acceptance of Terms
                </h2>
                <div className="p-6 rounded-2xl bg-background/50 border border-border/50">
                  <p className="text-muted-foreground font-medium leading-relaxed">
                    By accessing and using <span className="text-foreground font-bold">DEVFOLIOMARKETPLACE.COM</span> services, you accept and agree to be bound by the terms and provision of this agreement. Our ecosystem is built on mutual trust and professional integrity.
                  </p>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-black tracking-tight flex items-center gap-3">
                  <span className="text-primary">02.</span> Scope of Service
                </h2>
                <p className="text-muted-foreground font-medium leading-relaxed mb-6">
                  Our platform architecturally facilitates connections between global experts and their audience through:
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    "One-on-one professional mentoring",
                    "High-engagement group webinars",
                    "Structured digital course delivery",
                    "Encrypted priority messaging"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-primary/5 border border-primary/10">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      <span className="text-sm font-bold text-foreground/80">{item}</span>
                    </div>
                  ))}
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-black tracking-tight flex items-center gap-3">
                  <span className="text-primary">03.</span> Identity & Security
                </h2>
                <div className="flex gap-4 p-6 rounded-2xl bg-amber-500/5 border border-amber-500/20">
                  <div className="mt-1">
                    <ShieldCheck className="w-5 h-5 text-amber-500" />
                  </div>
                  <p className="text-muted-foreground font-medium leading-relaxed">
                    You are solely responsible for maintaining the cryptographic integrity of your account credentials. <span className="text-foreground font-bold text-amber-600">DEVFOLIOMARKETPLACE.COM</span> must be notified immediately of any unauthorized access detection.
                  </p>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-black tracking-tight flex items-center gap-3">
                  <span className="text-primary">04.</span> Financial Protocol
                </h2>
                <p className="text-muted-foreground font-medium leading-relaxed">
                  All transactions are executed through decentralized and secure third-party processors. Commission structures are plan-dependent and subject to the selected tier at the time of session creation.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-black tracking-tight flex items-center gap-3">
                  <span className="text-primary">05.</span> Intellectual Property
                </h2>
                <p className="text-muted-foreground font-medium leading-relaxed">
                  Experts retain 100% ownership of their knowledge assets. By utilizing our infrastructure, you grant <span className="text-foreground font-bold">DEVFOLIOMARKETPLACE.COM</span> a non-exclusive, global license to optimize, display, and distribute said assets within the platform boundaries.
                </p>
              </section>

              <section className="pt-12 border-t border-border/50">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="space-y-2">
                    <h3 className="text-lg font-black tracking-tight">Legal Inquiry?</h3>
                    <p className="text-muted-foreground font-medium">Reach our compliance team at <br/> <a href="tel:9031359720" className="text-foreground NOT-italic hover:text-primary transition-colors block mt-2">+91 9031359720</a> <a href="mailto:devfoliomarketplace@gmail.com" className="text-primary hover:underline block mt-1">support@devfoliomarketplace.com</a></p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-2xl bg-secondary/50 text-muted-foreground">
                      <Database className="w-5 h-5" />
                    </div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground max-w-[200px]">Your data is your legacy. We are its guardians.</p>
                  </div>
                </div>
              </section>
            </div>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;

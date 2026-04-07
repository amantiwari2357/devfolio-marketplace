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
          <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20 space-y-6 animate-slide-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-border/40 backdrop-blur-md text-xs font-semibold text-primary">
              <Scale className="w-4 h-4" />
              Legal Framework
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
              Terms of <span className="text-primary">Service.</span>
            </h1>
            <p className="text-base md:text-lg text-muted-foreground font-medium max-w-2xl mx-auto mt-6">
              Last updated: <span className="text-foreground">January 15, 2025</span>
            </p>
          </div>

          <Card className="p-8 md:p-12 rounded-[32px] bg-secondary/30 border-border/50 shadow-lg relative overflow-hidden group mb-16">
            <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none group-hover:rotate-12 transition-transform duration-700">
              <FileText className="w-48 h-48 text-primary" />
            </div>

            <div className="relative z-10 space-y-10 text-foreground">
              <section className="space-y-3">
                <h2 className="text-xl font-bold tracking-tight flex items-center gap-2">
                  <span className="text-primary">01.</span> Acceptance of Terms
                </h2>
                <div className="p-5 rounded-xl bg-background/50 border border-border/50">
                  <p className="text-sm font-medium text-muted-foreground leading-relaxed">
                    By accessing and using <span className="text-foreground font-semibold">DEVFOLIOMARKETPLACE.COM</span> services, you accept and agree to be bound by the terms and provision of this agreement. Our ecosystem is built on mutual trust and professional integrity.
                  </p>
                </div>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl font-bold tracking-tight flex items-center gap-2">
                  <span className="text-primary">02.</span> Scope of Service
                </h2>
                <p className="text-sm font-medium text-muted-foreground leading-relaxed mb-4">
                  Our platform architecturally facilitates connections between global experts and their audience through:
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    "One-on-one professional mentoring",
                    "High-engagement group webinars",
                    "Structured digital course delivery",
                    "Encrypted priority messaging"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 p-3 rounded-lg bg-primary/5 border border-primary/10">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      <span className="text-sm font-medium text-foreground/80">{item}</span>
                    </div>
                  ))}
                </div>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl font-bold tracking-tight flex items-center gap-2">
                  <span className="text-primary">03.</span> Identity & Security
                </h2>
                <div className="flex gap-3 p-5 rounded-xl bg-amber-500/5 border border-amber-500/20">
                  <div className="mt-0.5">
                    <ShieldCheck className="w-5 h-5 text-amber-500" />
                  </div>
                  <p className="text-sm font-medium text-muted-foreground leading-relaxed">
                    You are solely responsible for maintaining the security of your account credentials. <span className="text-foreground font-semibold text-amber-600">Devfolio Marketplace</span> must be notified immediately of any unauthorized access.
                  </p>
                </div>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl font-bold tracking-tight flex items-center gap-2">
                  <span className="text-primary">04.</span> Financial Protocol
                </h2>
                <p className="text-sm font-medium text-muted-foreground leading-relaxed">
                  All transactions are executed through decentralized and secure third-party processors. Commission structures are plan-dependent and subject to the selected tier at the time of session creation.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl font-bold tracking-tight flex items-center gap-2">
                  <span className="text-primary">05.</span> Intellectual Property
                </h2>
                <p className="text-sm font-medium text-muted-foreground leading-relaxed">
                  Experts retain 100% ownership of their knowledge assets. By utilizing our infrastructure, you grant <span className="text-foreground font-semibold">DEVFOLIOMARKETPLACE.COM</span> a non-exclusive, global license to optimize, display, and distribute said assets within the platform boundaries.
                </p>
              </section>

              <section className="pt-8 border-t border-border/50">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="space-y-1">
                    <h3 className="text-base font-bold tracking-tight">Legal Inquiry?</h3>
                    <p className="text-sm font-medium text-muted-foreground">Reach our compliance team at <br/> <a href="tel:9031359720" className="text-foreground hover:text-primary transition-colors block mt-2">+91 9031359720</a> <a href="mailto:devfoliomarketplace@gmail.com" className="text-primary hover:underline block mt-1">support@devfoliomarketplace.com</a></p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-secondary/50 text-muted-foreground">
                      <Database className="w-5 h-5" />
                    </div>
                    <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground max-w-[200px]">Your data is your legacy. We are its guardians.</p>
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

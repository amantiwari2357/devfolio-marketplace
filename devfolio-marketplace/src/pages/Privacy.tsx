import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card } from "@/components/ui/card";
import { Shield, Lock, Database, Activity, Fingerprint, Zap, ShieldCheck, Eye } from "lucide-react";
import SEO from "@/components/layout/SEO";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background selection:bg-primary selection:text-primary-foreground">
      <SEO 
        title="Privacy Protocol | Data Sovereignty" 
        description="Learn how Devfolio Marketplace protects your identity and data. Our privacy-first architecture keeps your information secure." 
      />
      <Header />
      
      <main className="section-spacing pt-32 md:pt-40 relative overflow-hidden">
        {/* Background Mesh Flux */}
        <div className="absolute top-0 right-0 -z-10 w-2/3 h-2/3 bg-primary/2 opacity-30 blur-[180px] rounded-full animate-pulse" />
        <div className="absolute bottom-0 left-0 -z-10 w-1/2 h-1/2 bg-primary/2 opacity-20 blur-[150px] rounded-full animate-pulse" style={{ animationDelay: '1s' }} />

        <div className="container mx-auto px-6 max-w-6xl relative">
          <div className="text-center max-w-4xl mx-auto mb-16 md:mb-20 space-y-6 animate-slide-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-border/40 backdrop-blur-md text-xs font-semibold text-primary">
              <Shield className="w-4 h-4" />
              Data Sovereignty Protocol
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
              Privacy <span className="text-primary">Protocol.</span>
            </h1>
            <p className="text-base md:text-lg text-muted-foreground font-medium max-w-2xl mx-auto mt-6">
              Last updated: <span className="text-foreground font-semibold">January 15, 2025</span>
            </p>
          </div>

          <Card className="p-8 md:p-14 rounded-[32px] bg-secondary/10 border-border/40 backdrop-blur-3xl shadow-lg relative overflow-hidden group animate-slide-up mb-16" style={{ animationDelay: '100ms' }}>
            <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none group-hover:rotate-12 transition-transform duration-700">
              <Lock className="w-64 h-64 text-primary" />
            </div>

            <div className="relative z-10 space-y-12 text-foreground">
              <section className="space-y-4">
                <h2 className="text-xl font-bold tracking-tight flex items-center gap-2">
                  <span className="text-primary text-2xl">01.</span> Information Acquisition
                </h2>
                <p className="text-sm font-medium text-muted-foreground leading-relaxed">
                  We process data necessary to maintain a high-integrity ecosystem. This includes:
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    "Cryptographically hashed account credentials",
                    "Verified professional profile metadata",
                    "Encrypted processing identifiers",
                    "Usage pattern intelligence"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-background/50 border border-border/20 shadow-sm group/item hover:border-primary/30 transition-all">
                      <div className="w-2 h-2 rounded-full bg-primary shadow-sm" />
                      <span className="text-sm font-semibold text-foreground/80">{item}</span>
                    </div>
                  ))}
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-bold tracking-tight flex items-center gap-2">
                  <span className="text-primary text-2xl">02.</span> Intelligence Utilization
                </h2>
                <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10 shadow-sm">
                  <p className="text-sm font-medium text-muted-foreground leading-relaxed">
                    Collected intelligence is exclusively utilized to architect, secure, and optimize your experience. We do not engage in information liquidation or unauthorized third-party transfers.
                  </p>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-bold tracking-tight flex items-center gap-2">
                  <span className="text-primary text-2xl">03.</span> Security Shield
                </h2>
                <p className="text-sm font-medium text-muted-foreground leading-relaxed">
                  Our architecture implements industry-leading technical measures, including end-to-end encryption for priority DMs and isolated database shards to prevent unauthorized information leakage.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-bold tracking-tight flex items-center gap-2">
                  <span className="text-primary text-2xl">04.</span> Data Sovereignty Rights
                </h2>
                <p className="text-sm font-medium text-muted-foreground leading-relaxed mb-4">
                  You maintain absolute control over your node's information, including:
                </p>
                <div className="flex flex-wrap gap-3">
                  {["Access Request", "Error Correction", "Node Deletion", "Portability Export"].map((tag, tIdx) => (
                    <span key={tIdx} className="px-4 py-2 rounded-lg bg-secondary/50 border border-border/40 text-xs font-semibold text-primary shadow-sm hover:scale-105 transition-all cursor-pointer">
                      {tag}
                    </span>
                  ))}
                </div>
              </section>

              <section className="pt-10 border-t border-border/30">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold tracking-tight">Privacy Issue?</h3>
                    <p className="text-sm font-medium text-muted-foreground">Contact our DPO at <a href="mailto:devfoliomarketplace@gmail.com" className="text-primary hover:underline">support@devfoliomarketplace.com</a></p>
                  </div>
                  <div className="flex items-center gap-4 p-4 rounded-xl bg-background/50 border border-border/20 shadow-sm">
                    <div className="p-3 rounded-xl bg-secondary/50 text-primary shadow-sm">
                      <Database className="w-5 h-5" />
                    </div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground max-w-[200px]">Your data is your legacy. We are its guardians.</p>
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

export default Privacy;

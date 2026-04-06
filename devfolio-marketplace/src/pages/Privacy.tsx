import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card } from "@/components/ui/card";
import { Shield, Eye, Lock, Database, Globe, Info } from "lucide-react";
import SEO from "@/components/layout/SEO";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background selection:bg-primary selection:text-primary-foreground">
      <SEO 
        title="Privacy Protocol" 
        description="Learn how Devfolio Marketplace protects your identity and data. Our privacy-first architecture keeps your information secure." 
      />
      <Header />
      
      <main className="pt-32 pb-24 overflow-hidden">
        {/* Background Accents */}
        <div className="fixed top-0 right-0 -z-10 w-1/3 h-1/3 bg-primary/5 blur-[120px] pointer-events-none rounded-full" />
        <div className="fixed bottom-0 left-0 -z-10 w-1/3 h-1/3 bg-primary/5 blur-[120px] pointer-events-none rounded-full" />

        <div className="container mx-auto px-4 max-w-5xl relative">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border/50 text-xs font-black uppercase tracking-[0.2em] text-primary">
              <Shield className="w-4 h-4" />
              Data Sovereignty
            </div>
            <h1 className="text-5xl md:text-6xl font-black tracking-tight text-foreground leading-tight">
              Privacy <span className="text-primary italic">Protocol.</span>
            </h1>
            <p className="text-lg text-muted-foreground font-medium">
              Last updated: <span className="text-foreground font-bold">January 15, 2025</span>
            </p>
          </div>

          <Card className="p-8 md:p-16 rounded-[40px] bg-secondary/30 border-border/50 shadow-2xl shadow-primary/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none group-hover:rotate-12 transition-transform duration-700">
              <Lock className="w-64 h-64 text-primary" />
            </div>

            <div className="relative z-10 space-y-12 text-foreground">
              <section className="space-y-6">
                <h2 className="text-2xl font-black tracking-tight flex items-center gap-3">
                  <span className="text-primary">01.</span> Information Acquisition
                </h2>
                <p className="text-muted-foreground font-medium leading-relaxed mb-6">
                  We process data necessary to maintain a high-integrity ecosystem. This includes:
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    "Cryptographically hashed account credentials",
                    "Verified professional profile metadata",
                    "Encrypted processing identifiers",
                    "Usage pattern intelligence"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-background/50 border border-border/50">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      <span className="text-sm font-bold text-foreground/80">{item}</span>
                    </div>
                  ))}
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-black tracking-tight flex items-center gap-3">
                  <span className="text-primary">02.</span> Intelligence Utilization
                </h2>
                <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10">
                  <p className="text-muted-foreground font-medium leading-relaxed">
                    Collected intelligence is exclusively utilized to architect, secure, and optimize your experience. We do not engage in information liquidation or unauthorized third-party transfers.
                  </p>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-black tracking-tight flex items-center gap-3">
                  <span className="text-primary">03.</span> Security Shield
                </h2>
                <p className="text-muted-foreground font-medium leading-relaxed">
                  Our architecture implements industry-leading technical measures, including end-to-end encryption for priority DMs and isolated database shards to prevent unauthorized information leakage.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-black tracking-tight flex items-center gap-3">
                  <span className="text-primary">04.</span> Data Sovereignty Rights
                </h2>
                <p className="text-muted-foreground font-medium leading-relaxed mb-4">
                  You maintain absolute control over your node's information, including:
                </p>
                <div className="flex flex-wrap gap-3">
                  {["Access Request", "Error Correction", "Node Deletion", "Portability Export"].map((tag, tIdx) => (
                    <span key={tIdx} className="px-4 py-2 rounded-lg bg-secondary/50 border border-border/50 text-xs font-black uppercase tracking-widest text-primary">
                      {tag}
                    </span>
                  ))}
                </div>
              </section>

              <section className="pt-12 border-t border-border/50">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="space-y-2">
                    <h3 className="text-lg font-black tracking-tight">Privacy Issue?</h3>
                    <p className="text-muted-foreground font-medium">Contact our DPO at <a href="mailto:privacy@devfolio.io" className="text-primary hover:underline">privacy@devfolio.io</a></p>
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

export default Privacy;

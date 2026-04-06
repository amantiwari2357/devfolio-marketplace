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
          <div className="text-center max-w-5xl mx-auto mb-20 md:mb-32 space-y-10 animate-slide-up">
            <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-secondary/10 border border-border/40 backdrop-blur-md text-[10px] font-black uppercase tracking-[0.4em] text-primary italic">
              <Shield className="w-4 h-4 animate-pulse" />
              Data Sovereignty Protocol
            </div>
            <h1 className="heading-responsive">
              Privacy <span className="text-primary NOT-italic">Protocol.</span>
            </h1>
            <p className="text-base md:text-xl text-muted-foreground font-bold italic tracking-tight leading-relaxed max-w-3xl mx-auto opacity-70 mt-8">
              Last updated: <span className="text-foreground font-black NOT-italic">January 15, 2025</span>
            </p>
          </div>

          <Card className="p-12 md:p-24 rounded-[56px] bg-secondary/10 border-border/40 backdrop-blur-3xl shadow-2xl relative overflow-hidden group animate-slide-up" style={{ animationDelay: '100ms' }}>
            <div className="absolute top-0 right-0 p-16 opacity-0 group-hover:opacity-5 transition-all duration-1000 translate-x-12 translate-y-[-12px] group-hover:translate-x-0 group-hover:translate-y-0 pointer-events-none">
              <Lock className="w-[400px] h-[400px] text-primary" />
            </div>

            <div className="relative z-10 space-y-16 text-foreground">
              <section className="space-y-8">
                <h2 className="text-2xl font-black tracking-tighter flex items-center gap-4 italic uppercase">
                  <span className="text-primary NOT-italic text-3xl">01.</span> Information Acquisition
                </h2>
                <p className="text-lg font-bold text-muted-foreground/70 leading-relaxed italic tracking-tight">
                  We process data necessary to maintain a high-integrity ecosystem. This includes:
                </p>
                <div className="grid sm:grid-cols-2 gap-6">
                  {[
                    "Cryptographically hashed account credentials",
                    "Verified professional profile metadata",
                    "Encrypted processing identifiers",
                    "Usage pattern intelligence"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-5 p-6 rounded-[22px] bg-background/50 border border-border/20 shadow-inner group/item hover:border-primary/30 transition-all">
                      <div className="w-3 h-3 rounded-full bg-primary shadow-[0_0_10px_rgba(var(--primary-rgb),0.3)]" />
                      <span className="text-sm font-black text-foreground/80 italic uppercase tracking-wide">{item}</span>
                    </div>
                  ))}
                </div>
              </section>

              <section className="space-y-6">
                <h2 className="text-2xl font-black tracking-tighter flex items-center gap-4 italic uppercase">
                  <span className="text-primary NOT-italic text-3xl">02.</span> Intelligence Utilization
                </h2>
                <div className="p-10 rounded-[32px] bg-primary/5 border border-primary/10 shadow-inner">
                  <p className="text-lg font-bold text-muted-foreground/70 leading-relaxed italic tracking-tight">
                    Collected intelligence is exclusively utilized to architect, secure, and optimize your experience. We do not engage in information liquidation or unauthorized third-party transfers.
                  </p>
                </div>
              </section>

              <section className="space-y-6">
                <h2 className="text-2xl font-black tracking-tighter flex items-center gap-4 italic uppercase">
                  <span className="text-primary NOT-italic text-3xl">03.</span> Security Shield
                </h2>
                <p className="text-lg font-bold text-muted-foreground/70 leading-relaxed italic tracking-tight">
                  Our architecture implements industry-leading technical measures, including end-to-end encryption for priority DMs and isolated database shards to prevent unauthorized information leakage.
                </p>
              </section>

              <section className="space-y-6">
                <h2 className="text-2xl font-black tracking-tighter flex items-center gap-4 italic uppercase">
                  <span className="text-primary NOT-italic text-3xl">04.</span> Data Sovereignty Rights
                </h2>
                <p className="text-lg font-bold text-muted-foreground/70 leading-relaxed italic tracking-tight mb-6">
                  You maintain absolute control over your node's information, including:
                </p>
                <div className="flex flex-wrap gap-4">
                  {["Access Request", "Error Correction", "Node Deletion", "Portability Export"].map((tag, tIdx) => (
                    <span key={tIdx} className="px-6 py-3.5 rounded-[18px] bg-secondary/50 border border-border/40 text-[10px] font-black uppercase tracking-[0.3em] text-primary italic shadow-inner hover:scale-105 transition-all cursor-pointer">
                      {tag}
                    </span>
                  ))}
                </div>
              </section>

              <section className="pt-16 border-t border-border/30">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                  <div className="space-y-3">
                    <h3 className="text-2xl font-black tracking-tighter italic uppercase">Privacy Issue?</h3>
                    <p className="text-lg font-bold text-muted-foreground/60 italic">Contact our DPO at <a href="mailto:devfoliomarketplace@gmail.com" className="text-primary hover:underline decoration-primary/20 underline-offset-8">support@devfoliomarketplace.com</a></p>
                  </div>
                  <div className="flex items-center gap-6 p-6 rounded-[28px] bg-background/50 border border-border/20 shadow-inner">
                    <div className="p-4 rounded-2xl bg-secondary/50 text-primary shadow-inner">
                      <Database className="w-6 h-6" />
                    </div>
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground max-w-[250px] italic opacity-60">Your data is your legacy. We are its guardians.</p>
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

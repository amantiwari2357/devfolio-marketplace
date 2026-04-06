import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Calendar, Eye, Share2, Sparkles, BookOpen, ChevronRight, Activity, Zap, CheckCircle2, TrendingUp, Layers } from "lucide-react";
import SEO from "@/components/layout/SEO";
import blogData from "@/data/blogs.json";

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<any>(null);

  useEffect(() => {
    if (id) {
      const foundPost = blogData.find((b) => b.id.toString() === id);
      if (foundPost) {
        setPost(foundPost);
        window.scrollTo(0, 0);
      } else {
        navigate("/blog");
      }
    }
  }, [id, navigate]);

  if (!post) {
    return null;
  }

  const adVariations = [
    {
      subtitle: "Premium Capability Expansion",
      title1: "Supercharge",
      title2: "Your Workflow.",
      desc: "Stop losing clients to chaotic communication and fractured toolsets. Deploy a unified Devfolio Storefront to centralize your bookings, automate services, and scale revenue instantly.",
      cta: "Connect Node Now",
      icon: <Layers className="w-full h-full text-primary block" />,
      bg: "bg-gradient-to-br from-primary/20 via-background to-primary/10"
    },
    {
      subtitle: "Enterprise Acceleration",
      title1: "Automate",
      title2: "Client Intake.",
      desc: "Transform your portfolio into a machine. Let deterministic AI workflows handle discovery calls, invoice generation, and milestone tracking automatically.",
      cta: "Initialize Dashboard",
      icon: <Zap className="w-full h-full text-primary block" />,
      bg: "bg-gradient-to-r from-background via-primary/10 to-background"
    },
    {
      subtitle: "Decentralized Infrastructure",
      title1: "Scale With",
      title2: "Zero Limits.",
      desc: "Leverage global network nodes to bypass traditional agency constraints. High-ticket retainers require high-fidelity infrastructure. We built it.",
      cta: "Launch Framework",
      icon: <Activity className="w-full h-full text-primary block" />,
      bg: "bg-gradient-to-tr from-primary/5 via-primary/10 to-transparent"
    }
  ];
  
  const currentAd = adVariations[post.id % adVariations.length];

  const heroImages = [
    "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop"
  ];
  
  const midImages = [
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1542626991-cbc4e32524cc?q=80&w=2069&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=2076&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=2070&auto=format&fit=crop"
  ];

  const heroImg = heroImages[post.id % heroImages.length];
  const midImg = midImages[(post.id + 1) % midImages.length];

  return (
    <div className="min-h-screen bg-background selection:bg-primary selection:text-primary-foreground">
      <SEO 
        title={`${post.title} | Intelligence`} 
        description={post.excerpt} 
      />
      <Header />
      
      <main className="pt-32 md:pt-40 pb-20 relative overflow-hidden">
        {/* Background Mesh Flux */}
        <div className="absolute top-0 right-0 -z-10 w-2/3 h-2/3 bg-primary/5 opacity-50 blur-[180px] rounded-full animate-pulse" />
        <div className="absolute bottom-0 left-0 -z-10 w-1/2 h-1/2 bg-secondary/5 opacity-30 blur-[150px] rounded-full" />

        <div className="container mx-auto px-6 max-w-4xl relative">
          
          <Button 
            variant="ghost" 
            onClick={() => navigate("/blog")}
            className="mb-10 pl-0 hover:bg-transparent text-muted-foreground hover:text-foreground group transition-all font-black text-xs uppercase tracking-widest italic"
          >
            <ArrowLeft className="w-5 h-5 mr-3 group-hover:-translate-x-2 transition-transform" />
            Back to Directory
          </Button>

          <article className="animate-slide-up space-y-12">
            <header className="space-y-8 pb-10 border-b border-border/20">
              <div className="flex flex-wrap items-center gap-4">
                <span className="px-5 py-2 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.3em] rounded-full italic shadow-sm">
                  {post.category}
                </span>
                <span className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground italic">
                  <Calendar className="w-4 h-4" />
                  {post.date}
                </span>
              </div>

              <h1 className="text-3xl md:text-5xl lg:text-7xl font-black leading-[1.1] tracking-tighter text-foreground uppercase">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center justify-between gap-6 pt-4">
                <div className="flex items-center gap-6">
                  <span className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-primary/70 italic">
                    <Eye className="w-5 h-5" />
                    {post.views}
                  </span>
                  <span className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/40 bg-secondary/30 px-4 py-2 rounded-xl italic">
                    <BookOpen className="w-4 h-4" />
                    {post.readTime}
                  </span>
                </div>

                <Button variant="outline" className="rounded-xl font-black text-[10px] uppercase tracking-widest italic border-border/40 hover:bg-secondary/20">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Insight
                </Button>
              </div>
            </header>

            <div className="rounded-[44px] overflow-hidden mb-16 shadow-2xl relative h-[400px] md:h-[600px] group">
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent z-10" />
              <img 
                src={heroImg} 
                alt={`${post.title} - Main Concept`} 
                fetchPriority="high"
                loading="eager"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" 
              />
              <div className="absolute bottom-0 left-0 p-8 md:p-14 z-20 w-full flex justify-between items-end">
                 <div className="flex items-center gap-4 bg-background/50 backdrop-blur-xl px-6 py-3 rounded-[20px] border border-border/40">
                    <Activity className="w-5 h-5 text-primary" />
                    <span className="text-[10px] font-black uppercase tracking-widest italic">Intelligence Node Secured</span>
                 </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-12 gap-16">
              {/* Main Content Column */}
              <div className="lg:col-span-8 prose prose-lg dark:prose-invert prose-headings:font-black prose-headings:tracking-tighter prose-headings:uppercase prose-p:font-medium prose-p:leading-relaxed max-w-none text-muted-foreground/90 italic">
                
                <p className="text-xl md:text-3xl font-bold text-foreground leading-relaxed mb-12">
                  {post.excerpt}
                </p>
                
                <div className="space-y-12">
                  
                  {/* Table of Contents - SEO Friendly */}
                  <nav className="p-8 md:p-10 rounded-[32px] bg-secondary/10 border border-border/40 my-10 shadow-inner" aria-label="Table of Contents">
                    <h2 className="text-xl md:text-2xl font-black text-foreground uppercase tracking-tight mb-6 flex items-center gap-3">
                      <Layers className="w-6 h-6 text-primary" />
                      Table of Contents
                    </h2>
                    <ul className="space-y-4 list-none m-0 p-0 text-sm md:text-base font-bold text-muted-foreground">
                      <li><a href="#architecture" className="hover:text-primary transition-colors flex items-center gap-2"><ArrowRight className="w-3 h-3" /> 1. Overview & Architecture</a></li>
                      <li><a href="#strategic-implementation" className="hover:text-primary transition-colors flex items-center gap-2"><ArrowRight className="w-3 h-3" /> 2. Deep Intelligence Analysis</a></li>
                      <li><a href="#optimization" className="hover:text-primary transition-colors flex items-center gap-2"><ArrowRight className="w-3 h-3" /> 3. Advanced Optimization Protocols</a></li>
                      <li><a href="#faq" className="hover:text-primary transition-colors flex items-center gap-2"><ArrowRight className="w-3 h-3" /> 4. Frequently Asked Questions</a></li>
                    </ul>
                  </nav>

                  {/* Advertisement Card - RESPONSIVE DYNAMIC */}
                  <div className={`my-16 md:my-20 rounded-[32px] md:rounded-[48px] ${currentAd.bg} border border-border/40 md:border-2 md:border-primary/20 p-8 md:p-12 lg:p-16 shadow-[0_20px_80px_-20px_rgba(var(--primary),0.15)] relative overflow-hidden group/ad flex flex-col xl:flex-row items-center justify-between gap-8 md:gap-12 md:text-left text-center`}>
                    <div className="absolute top-[-20%] right-[-10%] md:right-0 lg:right-[15%] p-6 opacity-[0.03] md:opacity-5 group-hover/ad:scale-110 transition-transform duration-1000 rotate-12 pointer-events-none w-full md:w-[600px] h-[600px] flex justify-center items-center">
                      {currentAd.icon}
                    </div>
                    
                    <div className="relative z-10 flex-1 max-w-3xl">
                      <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.4em] text-primary mb-4 block">
                        {currentAd.subtitle}
                      </span>
                      <h3 className="text-3xl md:text-5xl lg:text-6xl font-black text-foreground uppercase tracking-tight mb-4 md:mb-6 leading-[0.9]">
                        {currentAd.title1} <br className="hidden md:block" /> <span className="text-primary italic">{currentAd.title2}</span>
                      </h3>
                      <p className="font-bold text-sm md:text-base lg:text-lg text-foreground/80 leading-relaxed md:max-w-2xl mx-auto md:mx-0">
                        {currentAd.desc}
                      </p>
                    </div>
                    
                    <div className="relative z-10 w-full xl:w-auto shrink-0 flex items-center justify-center pt-2 md:pt-0">
                      <Button 
                        onClick={() => navigate('/signup')}
                        className="w-full xl:w-auto rounded-[20px] md:rounded-[24px] bg-foreground text-background font-black uppercase tracking-widest text-[10px] md:text-sm h-14 md:h-16 px-8 md:px-12 hover:scale-105 active:scale-95 transition-all shadow-2xl"
                      >
                        {currentAd.cta} <Zap className="w-4 h-4 md:w-5 md:h-5 ml-3 md:ml-4 text-primary" />
                      </Button>
                    </div>
                  </div>

                  {post.content ? (
                    // DYNAMIC MASSIVE TRENDING CONTENT
                    <div className="space-y-12">
                      <h2 className="text-3xl md:text-5xl text-foreground font-black tracking-tighter uppercase mb-10 flex items-center gap-4 scroll-mt-32" id="architecture">
                         <Zap className="w-10 h-10 text-primary" />
                         1. Overview & Architecture
                      </h2>
                      {post.content.map((paragraph: string, idx: number) => (
                        <div key={idx}>
                          <p className="text-xl md:text-2xl font-medium leading-relaxed mb-6 text-foreground/90">
                            {paragraph}
                          </p>
                          {idx === 0 && (
                            <div className="bg-secondary/10 border-l-4 border-primary p-12 rounded-r-[40px] my-16 italic shadow-inner">
                               <p className="font-black text-3xl md:text-5xl text-foreground !m-0 tracking-tighter leading-[1.1]">
                                 "{paragraph.split('.')[0]}."
                               </p>
                               <footer className="mt-6 text-base font-bold opacity-60 uppercase tracking-widest">— Industry Protocol</footer>
                            </div>
                          )}
                          {idx === 1 && (
                            <div className="rounded-[40px] overflow-hidden my-16 shadow-2xl relative h-[400px] md:h-[500px]">
                               <img src={midImg} alt={post.title} loading="lazy" className="w-full h-full object-cover dark:brightness-75" />
                            </div>
                          )}
                          {idx === 2 && (
                             <h2 className="text-3xl md:text-5xl text-foreground font-black tracking-tighter uppercase mt-20 mb-10 flex items-center gap-4 scroll-mt-32" id="strategic-implementation">
                               <Sparkles className="w-10 h-10 text-primary" />
                               2. Deep Intelligence Analysis
                             </h2>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    // SIMULATED CONTENT FALLBACK
                    <>
                      {/* Phase 1 */}
                      <div className="space-y-6 scroll-mt-32" id="architecture">
                        <h2 className="text-2xl md:text-4xl text-foreground font-black tracking-tighter uppercase flex items-center gap-4">
                          <Zap className="w-8 h-8 text-primary" />
                          1. Overview & Architecture
                        </h2>
                        <p>
                          In the rapidly evolving digital landscape, establishing a premium storefront and maintaining robust operational metrics is no longer optional—it is the baseline for scale. Network nodes that fail to innovate quickly find themselves outpaced by adaptive algorithms and decentralized competitors.
                        </p>
                        <p>
                          The reality is that <strong>{post.category}</strong> requires a systemic approach. When we look at the top 1% of operators on Devfolio Marketplace, they don't just rely on intuition; they rely on compounding architecture. Every aspect of their client delivery is optimized for speed, clarity, and trust.
                        </p>
                      </div>

                      {/* Interstitial Image - SEO Alt tags */}
                      <div className="rounded-[32px] overflow-hidden my-16 shadow-2xl relative h-[300px] md:h-[400px]">
                        <img 
                          src={midImg} 
                          alt={`Visualizing ${post.category} data systems and workflow scaling`} 
                          loading="lazy"
                          className="w-full h-full object-cover dark:brightness-75" 
                        />
                      </div>

                      {/* Phase 2: Actionable Items */}
                      <div className="space-y-6 scroll-mt-32" id="strategic-implementation">
                        <h2 className="text-2xl md:text-4xl text-foreground font-black tracking-tighter uppercase flex items-center gap-4">
                          <Sparkles className="w-6 h-6 text-primary" />
                          2. Deep Intelligence Analysis
                        </h2>
                        <h3 className="text-xl md:text-2xl text-foreground/80 font-black tracking-tight uppercase mt-6">
                          Deploying Frictionless Funnels
                        </h3>
                        <p>
                          To successfully implement these strategies, start by reverse-engineering your core conversion events. Map the entire journey from the initial awareness node to the final conversion protocol. Remove friction points mercilessly.
                        </p>
                        
                        <div className="grid gap-4 mt-8">
                          {[
                            `Automate the intake process for ${post.category} leads to capture data 24/7.`,
                            "Deploy asynchronous video updates to establish immediate domain authority.",
                            "Utilize high-fidelity project boards for transparent client delivery.",
                            "Construct a seamless payment and subscription gateway to secure MRR."
                          ].map((item, i) => (
                            <div key={i} className="flex items-center gap-4 bg-background/50 border border-border/20 p-5 rounded-[20px]">
                              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                <CheckCircle2 className="w-4 h-4 text-primary" />
                              </div>
                              <span className="font-bold text-foreground text-sm uppercase tracking-wider">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  )}

                  {/* Phase 3 */}
                  <div className="space-y-6 scroll-mt-32" id="optimization">
                    <h2 className="text-2xl md:text-4xl text-foreground font-black tracking-tighter uppercase flex items-center gap-4">
                      <Activity className="w-8 h-8 text-primary" />
                      3. Advanced Optimization
                    </h2>
                    <p>
                      The highest performing creators don't just sell services; they architect environments where the client naturally arrives at the conclusion that a transaction is the only logical path forward. By leveraging the advanced tools native to the Devfolio ecosystem, your storefront transforms from a mere landing page into an automated conversion engine.
                    </p>
                    
                    <div className="bg-secondary/10 border-l-4 border-primary p-10 rounded-r-[32px] my-10 italic shadow-inner">
                      <div className="flex gap-4 mb-6 text-primary">
                         <TrendingUp className="w-8 h-8" />
                      </div>
                      <p className="font-black text-2xl md:text-4xl text-foreground !m-0 tracking-tight leading-[1.1]">
                        "Growth is not a consequence of effort, but the mathematical outcome of applying the right leverage at the perfect vector."
                      </p>
                      <footer className="mt-4 text-sm font-bold opacity-60">— The Devfolio Protocol Architects</footer>
                    </div>
                  </div>

                  {/* SEO FAQ Section */}
                  <div className="space-y-8 mt-16 scroll-mt-32 border-t border-border/20 pt-16" id="faq">
                    <h2 className="text-2xl md:text-4xl text-foreground font-black tracking-tighter uppercase mb-10">
                      Frequently Asked Questions
                    </h2>
                    
                    <div className="space-y-8">
                      <div className="bg-background/40 border border-border/30 p-8 rounded-[24px]">
                        <h3 className="text-lg md:text-xl font-black text-foreground uppercase tracking-tight mb-4 flex items-center gap-3">
                          <span className="text-primary">Q.</span> How quickly can I scale my {post.category} operations?
                        </h3>
                        <p className="text-sm font-bold text-foreground/70 m-0">
                          Implementing a unified Devfolio structure typically yields a 40% reduction in admin overhead within the first 14 days, directly scaling throughput.
                        </p>
                      </div>

                      <div className="bg-background/40 border border-border/30 p-8 rounded-[24px]">
                        <h3 className="text-lg md:text-xl font-black text-foreground uppercase tracking-tight mb-4 flex items-center gap-3">
                          <span className="text-primary">Q.</span> What metrics matter most for modern creators?
                        </h3>
                        <p className="text-sm font-bold text-foreground/70 m-0">
                          Focus relentlessly on Client Retention Rate (CRR) and Node Conversion Velocity. Avoid vanity metrics like generic traffic; optimize for authenticated user interactions.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar / Sticky CTA */}
              <div className="lg:col-span-4 space-y-8">
                <div className="sticky top-32 space-y-8">
                  {/* Author Node */}
                  <div className="p-8 rounded-[36px] bg-secondary/10 border border-border/40 backdrop-blur-xl">
                     <p className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground mb-6 italic">Transmitting Author</p>
                     <div className="flex items-center gap-4 mb-6">
                       <div className="w-16 h-16 rounded-[22px] bg-primary/20 flex items-center justify-center font-black text-2xl text-primary italic">D</div>
                       <div>
                         <p className="font-black text-foreground uppercase tracking-wider italic">Devfolio Architects</p>
                         <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary/70">Core Protocol Team</p>
                       </div>
                     </div>
                     <p className="text-xs font-medium text-muted-foreground italic leading-relaxed">
                       Building the infrastructure for the global creator economy. We analyze terabytes of data to deliver superior strategy.
                     </p>
                  </div>

                  {/* Primary Call To Action Feature */}
                  <div className="p-8 rounded-[36px] bg-foreground text-background border-none relative overflow-hidden group shadow-2xl">
                    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-125 transition-transform duration-1000">
                      <Layers className="w-32 h-32 text-primary" />
                    </div>
                    <div className="relative z-10 space-y-6">
                      <div className="flex items-center gap-2 text-primary animate-pulse">
                        <Zap className="w-4 h-4" />
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] italic">Action Required</span>
                      </div>
                      <h4 className="text-2xl font-black italic uppercase leading-[0.9]">Ready To Scale Your <span className="text-primary NOT-italic">Operations?</span></h4>
                      <p className="text-xs font-bold text-background/60 italic leading-relaxed">
                        Deploy your own high-converting creator storefront today. Manage clients, sell services, and automate your workflows with zero friction.
                      </p>
                      <Button 
                        onClick={() => navigate('/signup')}
                        className="w-full h-16 rounded-[24px] bg-gradient-to-r from-primary to-primary-glow/80 text-primary-foreground font-black uppercase tracking-[0.2em] text-[11px] hover:scale-105 active:scale-95 transition-all shadow-[0_0_40px_-10px_rgba(var(--primary),0.6)] mt-8 italic border-none flex items-center justify-center gap-3 relative overflow-hidden group/btn"
                      >
                        <div className="absolute inset-0 bg-white/20 translate-y-[-100%] group-hover/btn:translate-y-[100%] transition-transform duration-700 ease-in-out" />
                        Initialize Storefront
                        <ChevronRight className="w-5 h-5 group-hover/btn:translate-x-2 transition-transform" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BlogDetail;

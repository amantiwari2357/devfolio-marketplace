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

  // Dynamic JSON-LD Schema Generation for Google Rich Snippets
  const schemaMarkup = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.excerpt,
    "image": [heroImg],
    "datePublished": "2026-04-06T08:00:00+00:00",
    "author": [{
      "@type": "Organization",
      "name": "Devfolio Protocol Team",
      "url": "https://devfolio-marketplace.com/"
    }],
    "publisher": {
      "@type": "Organization",
      "name": "Devfolio Marketplace",
      "logo": {
        "@type": "ImageObject",
        "url": "https://devfolio-marketplace.com/logo.png"
      }
    }
  });

  return (
    <div className="min-h-screen bg-background selection:bg-primary selection:text-primary-foreground">
      <SEO 
        title={`${post.title} | Intelligence`} 
        description={post.excerpt} 
        schema={schemaMarkup}
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
                  <div className={`my-12 md:my-16 rounded-[24px] md:rounded-[36px] ${currentAd.bg} border border-border/40 md:border-2 md:border-primary/20 p-6 md:p-8 lg:p-10 shadow-[0_20px_60px_-20px_rgba(var(--primary),0.15)] relative overflow-hidden group/ad`}>
                    <div className="absolute top-[-50%] right-[-10%] md:right-0 p-6 opacity-[0.03] md:opacity-5 group-hover/ad:scale-110 transition-transform duration-1000 rotate-12 pointer-events-none w-full md:w-[400px] h-full flex justify-center items-center">
                      {currentAd.icon}
                    </div>
                    
                    <div className="relative z-10 space-y-4 md:space-y-5 max-w-3xl">
                      <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] text-primary block">
                        {currentAd.subtitle}
                      </span>
                      <h3 className="text-2xl md:text-4xl lg:text-5xl font-black text-foreground uppercase tracking-tight leading-[0.9]">
                        {currentAd.title1} <span className="text-primary italic">{currentAd.title2}</span>
                      </h3>
                      <p className="font-bold text-xs md:text-sm lg:text-base text-foreground/80 leading-relaxed max-w-xl pb-2">
                        {currentAd.desc}
                      </p>
                      
                      <Button 
                        onClick={() => navigate('/signup')}
                        className="w-full sm:w-min rounded-[16px] md:rounded-[20px] bg-foreground text-background font-black uppercase tracking-widest text-[10px] md:text-[11px] h-12 md:h-14 px-6 md:px-10 hover:scale-105 active:scale-95 transition-all shadow-xl overflow-hidden"
                      >
                        <span className="whitespace-nowrap">{currentAd.cta}</span> <Zap className="w-3 h-3 md:w-4 md:h-4 ml-2 md:ml-3 text-primary shrink-0" />
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
                  <div className="p-8 md:p-10 rounded-[40px] bg-gradient-to-b from-foreground to-foreground/90 text-background border border-background/10 relative overflow-hidden group shadow-[0_30px_100px_-20px_rgba(0,0,0,0.4)] flex flex-col justify-center min-h-[360px] hover:shadow-[0_40px_120px_-20px_rgba(var(--primary),0.2)] transition-all duration-700">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/15 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                    <div className="absolute -top-10 -right-10 p-8 opacity-5 group-hover:opacity-10 group-hover:scale-110 transition-all duration-1000 rotate-12">
                      <Zap className="w-56 h-56 text-primary" />
                    </div>
                    
                    <div className="relative z-10 space-y-7">
                      <div className="flex items-center gap-3 text-primary">
                        <div className="relative flex h-3 w-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-[0.4em]">System Ready</span>
                      </div>
                      
                      <h4 className="text-3xl md:text-4xl font-black uppercase tracking-tighter leading-[1.1]">
                        Scale Your <br /> <span className="text-primary italic">Operations.</span>
                      </h4>
                      
                      <p className="text-sm font-medium text-background/60 leading-relaxed max-w-[90%]">
                        Deploy your high-converting storefront today. Manage clients, sell services, and automate workflows effortlessly.
                      </p>
                      
                      <Button 
                        onClick={() => navigate('/signup')}
                        className="w-full h-16 rounded-[24px] bg-primary text-primary-foreground font-black uppercase tracking-[0.2em] text-[11px] hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_0_30px_-5px_rgba(var(--primary),0.5)] mt-4 border-none flex items-center justify-between px-6 group/btn"
                      >
                        <span className="relative z-10">Initialize Now</span>
                        <div className="w-8 h-8 rounded-full bg-background/20 flex items-center justify-center group-hover/btn:bg-background/30 transition-colors">
                           <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                        </div>
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

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Eye, Share2, Sparkles, BookOpen, ChevronRight, Activity, Zap, CheckCircle2, TrendingUp, Layers } from "lucide-react";
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
                src={`https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop`} 
                alt={post.title} 
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
                  {/* Phase 1 */}
                  <div className="space-y-6">
                    <h2 className="text-2xl md:text-4xl text-foreground font-black tracking-tighter uppercase flex items-center gap-4">
                      <Zap className="w-8 h-8 text-primary" />
                      1. The Architecture of Scale
                    </h2>
                    <p>
                      In the rapidly evolving digital landscape, establishing a premium storefront and maintaining robust operational metrics is no longer optional—it is the baseline for scale. Network nodes that fail to innovate quickly find themselves outpaced by adaptive algorithms and decentralized competitors.
                    </p>
                    <p>
                      The reality is that <strong>{post.category}</strong> requires a systemic approach. When we look at the top 1% of operators on Devfolio Marketplace, they don't just rely on intuition; they rely on compounding architecture. Every aspect of their client delivery is optimized for speed, clarity, and trust.
                    </p>
                  </div>

                  {/* Highlights Box */}
                  <div className="bg-secondary/10 border-l-4 border-primary p-10 rounded-r-[32px] my-10 italic shadow-inner">
                    <div className="flex gap-4 mb-6 text-primary">
                       <TrendingUp className="w-8 h-8" />
                    </div>
                    <p className="font-black text-2xl md:text-4xl text-foreground !m-0 tracking-tight leading-[1.1]">
                      "Growth is not a consequence of effort, but the mathematical outcome of applying the right leverage at the perfect vector."
                    </p>
                  </div>

                  {/* Interstitial Image */}
                  <div className="rounded-[32px] overflow-hidden my-16 shadow-2xl relative h-[300px] md:h-[400px]">
                    <img 
                      src={`https://images.unsplash.com/photo-1542626991-cbc4e32524cc?q=80&w=2069&auto=format&fit=crop`} 
                      alt="Data Visualization" 
                      className="w-full h-full object-cover dark:brightness-75" 
                    />
                  </div>

                  {/* Phase 2: Actionable Items */}
                  <div className="space-y-6">
                    <h3 className="text-2xl md:text-3xl font-black text-foreground uppercase tracking-tight flex items-center gap-4">
                      <Sparkles className="w-6 h-6 text-primary" />
                      Strategic Implementation
                    </h3>
                    <p>
                      To successfully implement these strategies, start by reverse-engineering your core conversion events. Map the entire journey from the initial awareness node to the final conversion protocol. Remove friction points mercilessly.
                    </p>
                    
                    <div className="grid gap-4 mt-8">
                      {[
                        `Automate the intake process for ${post.category} leads.`,
                        "Deploy asynchronous video updates to establish authority.",
                        "Utilize high-fidelity project boards for transparent delivery.",
                        "Construct a seamless payment and subscription gateway."
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

                  <p className="pt-8">
                    The highest performing creators don't just sell services; they architect environments where the client naturally arrives at the conclusion that a transaction is the only logical path forward. By leveraging the advanced tools native to the Devfolio ecosystem, your storefront transforms from a mere landing page into an automated conversion engine.
                  </p>
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
                        className="w-full h-14 rounded-[20px] bg-primary text-primary-foreground font-black uppercase tracking-[0.2em] text-[10px] hover:scale-105 transition-all shadow-xl shadow-primary/30 mt-4 italic border-none"
                      >
                        Initialize Storefront
                        <ChevronRight className="w-4 h-4 ml-2" />
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

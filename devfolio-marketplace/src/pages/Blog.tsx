import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, ArrowRight, BookOpen, Sparkles, Mail, Activity, Rocket, Zap, Globe, Layers, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SEO from "@/components/layout/SEO";
import { useState } from "react";
import blogData from "@/data/blogs.json";

const Blog = () => {
  const navigate = useNavigate();
  const [visibleCount, setVisibleCount] = useState(15);
  const posts = blogData.slice(0, visibleCount);
  const hasMore = visibleCount < blogData.length;

  const loadMore = () => setVisibleCount((prev) => Math.min(prev + 15, blogData.length));

  const categories = ["All", "Business", "Mentoring", "Marketing", "Education", "Industry"];

  return (
    <div className="min-h-screen bg-background selection:bg-primary selection:text-primary-foreground">
      <SEO 
        title="Insights & Intelligence | Blog" 
        description="Explore the latest trends, tips, and success stories from the global creator economy on the Devfolio Marketplace blog." 
      />
      <Header />
      
      <main className="section-spacing pt-32 md:pt-40 relative overflow-hidden">
        {/* Background Mesh Flux */}
        <div className="absolute top-0 right-0 -z-10 w-2/3 h-2/3 bg-primary/2 opacity-30 blur-[180px] rounded-full animate-pulse" />
        <div className="absolute bottom-0 left-0 -z-10 w-1/2 h-1/2 bg-primary/2 opacity-20 blur-[150px] rounded-full animate-pulse" style={{ animationDelay: '1s' }} />

        <div className="container mx-auto px-6 relative">
          <div className="text-center max-w-5xl mx-auto mb-24 md:mb-32 space-y-10 animate-slide-up">
            <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-secondary/10 border border-border/40 backdrop-blur-md text-[10px] font-black uppercase tracking-[0.4em] text-primary italic">
              <BookOpen className="w-4 h-4 animate-pulse" />
              Intelligence Stream
            </div>
            <h1 className="heading-responsive">
              Insights & <span className="text-primary NOT-italic">Intelligence.</span>
            </h1>
            <p className="text-base md:text-xl text-muted-foreground font-bold italic tracking-tight leading-relaxed max-w-3xl mx-auto opacity-70 mt-8">
              Decoding the future of the creator economy, one breakthrough at a time.
            </p>
          </div>

          {/* Categories Protocol */}
          <div className="flex flex-wrap gap-4 justify-center mb-24 animate-slide-up" style={{ animationDelay: '100ms' }}>
            {categories.map((category) => (
              <Button
                key={category}
                className={`h-14 rounded-[18px] px-8 font-black text-[10px] uppercase tracking-[0.2em] transition-all italic ${
                  category === "All" 
                    ? "bg-foreground text-background shadow-2xl shadow-foreground/10 scale-105" 
                    : "bg-secondary/10 border border-border/40 hover:bg-secondary/20 text-muted-foreground hover:text-foreground"
                }`}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Editorial Grid Protocol */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10 mb-16 animate-slide-up" style={{ animationDelay: '200ms' }}>
            {posts.map((post: any, index: number) => (
              <Card 
                key={index} 
                onClick={() => navigate(`/blog/${post.id}`)}
                className="group rounded-[36px] md:rounded-[44px] bg-secondary/10 border-border/40 backdrop-blur-3xl hover:border-primary/40 transition-all duration-700 overflow-hidden cursor-pointer shadow-xl flex flex-col min-h-[400px] h-auto"
              >
                <div className="p-8 md:p-10 space-y-6 md:space-y-8 flex flex-col h-full relative z-10">
                  <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-10 transition-opacity duration-1000 -z-10">
                     <Layers className="w-32 h-32 text-primary rotate-12" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="px-5 py-2 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.3em] rounded-full italic shadow-sm">
                      {post.category}
                    </span>
                    <Sparkles className="w-5 h-5 text-primary/40 group-hover:text-primary transition-all group-hover:rotate-12" />
                  </div>
                  
                  <div className="space-y-6 flex-1 pt-4">
                    <h3 className="text-2xl font-black leading-[1.1] tracking-tighter text-foreground group-hover:text-primary transition-colors duration-500 uppercase line-clamp-3">
                      {post.title}
                    </h3>
                    <p className="text-sm font-bold text-muted-foreground/70 leading-relaxed italic line-clamp-3 opacity-80">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="space-y-6 pt-6 mt-auto">
                    <div className="pt-6 border-t border-border/20 flex items-center justify-between">
                      <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground italic">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-primary/70 italic">
                          <Eye className="w-3.5 h-3.5" />
                          {post.views}
                        </span>
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/40 bg-secondary/30 px-3 py-1.5 rounded-[12px] italic">
                          {post.readTime}
                        </span>
                      </div>
                    </div>

                    <div className="pt-2">
                       <Button variant="ghost" className="p-0 h-auto font-black text-xs uppercase tracking-[0.3em] text-primary hover:bg-transparent group-hover:gap-6 transition-all gap-4 italic group-hover:translate-x-2">
                         Initialize Read
                         <ArrowRight className="w-5 h-5 stroke-[3px]" />
                       </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {hasMore && (
            <div className="flex justify-center mb-32 animate-fade-in">
              <Button 
                onClick={loadMore}
                className="h-16 rounded-[22px] px-12 font-black text-sm md:text-base border border-border/40 bg-secondary/10 hover:bg-secondary/20 text-foreground transition-all shadow-xl group uppercase tracking-widest italic"
              >
                Load More Protocols
                <ArrowRight className="ml-4 w-5 h-5 opacity-40 group-hover:opacity-100 group-hover:translate-y-1 transition-all rotate-90" />
              </Button>
            </div>
          )}

          {/* Intelligence Newsletter Protocol */}
          <div className="max-w-6xl mx-auto animate-slide-up" style={{ animationDelay: '300ms' }}>
            <Card className="p-16 md:p-32 rounded-[64px] bg-foreground text-background border-none relative overflow-hidden group shadow-[0_50px_100px_-20px_rgba(0,0,0,.5)]">
              {/* Mesh background */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-transparent to-transparent opacity-40 group-hover:opacity-60 transition-opacity" />
              <div className="absolute top-0 right-0 p-24 opacity-5 pointer-events-none group-hover:scale-125 transition-transform duration-1000">
                <Mail className="w-[400px] h-[400px] text-primary" />
              </div>
              
              <div className="relative z-10 space-y-16 text-center">
                <div className="space-y-6">
                  <div className="flex items-center justify-center gap-3 text-primary animate-pulse">
                    <Rocket className="w-6 h-6" />
                    <span className="text-[10px] font-black uppercase tracking-[0.6em] italic">Intelligence Influx</span>
                  </div>
                  <h2 className="text-3xl md:text-5xl font-black tracking-tighter italic uppercase leading-[0.85]">
                    Subscribe to <span className="text-primary NOT-italic">Intelligence.</span>
                  </h2>
                  <p className="text-lg md:text-xl text-background/60 font-bold italic tracking-tight leading-relaxed max-w-3xl mx-auto opacity-80">
                    The latest breakthroughs, protocol updates, and exclusive success stories delivered directly to your node.
                  </p>
                </div>
                
                <div className="flex flex-col md:flex-row gap-6 max-w-2xl mx-auto pt-8">
                  <Input
                    type="email"
                    placeholder="ENTER_NODE_ADDRESS@DEVFOLIOMARKETPLACE.COM"
                    className="h-16 rounded-[22px] bg-background/10 border-background/20 text-background placeholder:text-background/30 focus:border-primary/50 transition-all font-black text-[10px] uppercase tracking-[0.3em] px-8 italic"
                  />
                  <Button className="h-16 rounded-[22px] px-10 font-black text-lg bg-primary text-primary-foreground hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-primary/30 uppercase tracking-[0.2em] border-none italic">
                    Subscribe
                  </Button>
                </div>
                <div className="flex items-center justify-center gap-4 text-[10px] font-black uppercase tracking-[0.4em] text-background/40 italic">
                   <Activity className="w-4 h-4" />
                   Zero Noise. Pure Signal Pulse.
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Blog;

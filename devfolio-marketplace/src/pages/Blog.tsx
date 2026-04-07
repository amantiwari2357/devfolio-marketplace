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
          <div className="text-center max-w-4xl mx-auto mb-12 md:mb-16 space-y-4 md:space-y-6 animate-slide-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-border/40 backdrop-blur-md text-xs font-semibold text-primary shadow-sm">
              <BookOpen className="w-4 h-4" />
              Creator Blog
            </div>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground leading-tight">
              Insights & <span className="text-primary">Resources.</span>
            </h1>
            <p className="text-base md:text-lg text-muted-foreground font-medium max-w-2xl mx-auto mt-4 leading-relaxed">
              Decoding the future of the creator economy, one breakthrough at a time.
            </p>
          </div>

          {/* Categories Protocol */}
          <div className="flex flex-wrap gap-3 justify-center mb-16 animate-slide-up" style={{ animationDelay: '100ms' }}>
            {categories.map((category) => (
              <Button
                key={category}
                className={`h-12 rounded-xl px-6 font-bold text-sm transition-all ${
                  category === "All" 
                    ? "bg-foreground text-background shadow-md scale-105" 
                    : "bg-secondary/10 border border-border/40 hover:bg-secondary/20 text-muted-foreground hover:text-foreground"
                }`}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Editorial Grid Protocol */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 animate-slide-up" style={{ animationDelay: '200ms' }}>
            {posts.map((post: any, index: number) => (
              <Card 
                key={index} 
                onClick={() => navigate(`/blog/${post.id}`)}
                className="group rounded-[32px] bg-secondary/10 border-border/40 backdrop-blur-3xl hover:border-primary/40 transition-all duration-700 overflow-hidden cursor-pointer shadow-lg flex flex-col min-h-[350px] h-auto"
              >
                <div className="p-8 space-y-6 flex flex-col h-full relative z-10">
                  <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-10 transition-opacity duration-1000 -z-10">
                     <Layers className="w-24 h-24 text-primary rotate-12" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="px-4 py-1.5 bg-primary/10 text-primary text-xs font-bold rounded-full shadow-sm">
                      {post.category}
                    </span>
                    <Sparkles className="w-5 h-5 text-primary/40 group-hover:text-primary transition-all group-hover:rotate-12" />
                  </div>
                  
                  <div className="space-y-4 flex-1 pt-2">
                    <h3 className="text-xl font-bold leading-tight text-foreground group-hover:text-primary transition-colors duration-500 line-clamp-3">
                      {post.title}
                    </h3>
                    <p className="text-sm font-medium text-muted-foreground leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="space-y-4 pt-4 mt-auto">
                    <div className="pt-4 border-t border-border/20 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1.5 text-xs font-semibold text-primary/70">
                          <Eye className="w-4 h-4" />
                          {post.views}
                        </span>
                        <span className="text-xs font-semibold text-muted-foreground/60 bg-secondary/30 px-2.5 py-1 rounded-lg">
                          {post.readTime}
                        </span>
                      </div>
                    </div>

                    <div className="pt-2">
                       <Button variant="ghost" className="p-0 h-auto font-bold text-sm text-primary hover:bg-transparent transition-all gap-2 group-hover:translate-x-1">
                         Read Article
                         <ArrowRight className="w-4 h-4" />
                       </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {hasMore && (
            <div className="flex justify-center mb-24 animate-fade-in">
              <Button 
                onClick={loadMore}
                className="h-14 rounded-xl px-10 font-bold text-base border border-border/40 bg-secondary/10 hover:bg-secondary/20 text-foreground transition-all shadow-md group"
              >
                Load More Articles
                <ArrowRight className="ml-2 w-4 h-4 opacity-70 group-hover:opacity-100 group-hover:translate-y-1 transition-all rotate-90" />
              </Button>
            </div>
          )}

          {/* Newsletter Section */}
          <div className="max-w-5xl mx-auto animate-slide-up mb-16 md:mb-24" style={{ animationDelay: '300ms' }}>
            <Card className="p-8 md:p-16 rounded-[32px] md:rounded-[40px] bg-foreground text-background border-none relative overflow-hidden group shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent opacity-40 group-hover:opacity-60 transition-opacity duration-700" />
              <div className="absolute top-0 right-0 p-8 md:p-12 opacity-5 pointer-events-none group-hover:scale-105 transition-transform duration-1000">
                <Mail className="w-48 h-48 md:w-64 md:h-64 text-primary" />
              </div>
              
              <div className="relative z-10 text-center space-y-8">
                <div className="space-y-4">
                  <div className="flex items-center justify-center gap-2 text-primary">
                    <Mail className="w-4 h-4 md:w-5 md:h-5" />
                    <span className="text-[10px] md:text-xs font-semibold uppercase tracking-widest">Newsletter</span>
                  </div>
                  <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">
                    Stay in the <span className="text-primary">loop.</span>
                  </h2>
                  <p className="text-base md:text-lg text-background/80 font-medium max-w-2xl mx-auto leading-relaxed">
                    The latest breakthroughs, platform updates, and exclusive success stories delivered directly to your inbox.
                  </p>
                </div>
                
                <div className="flex flex-col md:flex-row gap-4 max-w-xl mx-auto pt-4">
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    className="h-12 md:h-14 rounded-xl bg-background/10 border-background/20 text-background placeholder:text-background/50 focus:border-primary/50 transition-all text-sm md:text-base px-4"
                  />
                  <Button className="h-12 md:h-14 rounded-xl px-8 font-bold text-base bg-primary text-primary-foreground hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg min-w-[140px]">
                    Subscribe
                  </Button>
                </div>
                <div className="flex items-center justify-center gap-2 text-xs font-semibold text-background/60 pt-2">
                   <Activity className="w-4 h-4" />
                   Zero Spam. Unsubscribe Anytime.
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

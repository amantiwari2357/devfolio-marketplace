import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, ArrowRight, BookOpen, Sparkles, Mail } from "lucide-react";
import SEO from "@/components/layout/SEO";

const Blog = () => {
  const posts = [
    {
      title: "10 Tips for Successful 1:1 Mentoring Sessions",
      excerpt: "Learn how to make the most of your mentoring sessions and provide maximum value to your mentees.",
      category: "Mentoring",
      date: "Jan 10, 2025",
      readTime: "5 min read"
    },
    {
      title: "How to Price Your Services as a Creator",
      excerpt: "A comprehensive guide to pricing strategies for creators at every stage of their journey.",
      category: "Business",
      date: "Jan 8, 2025",
      readTime: "8 min read"
    },
    {
      title: "Building Your Personal Brand on Social Media",
      excerpt: "Strategies to grow your audience and establish yourself as an authority in your field.",
      category: "Marketing",
      date: "Jan 5, 2025",
      readTime: "6 min read"
    },
    {
      title: "The Future of the Creator Economy",
      excerpt: "Exploring trends and opportunities in the rapidly evolving creator economy landscape.",
      category: "Industry",
      date: "Jan 3, 2025",
      readTime: "10 min read"
    },
    {
      title: "Creating Engaging Online Course Content",
      excerpt: "Best practices for designing and delivering courses that keep students engaged and learning.",
      category: "Education",
      date: "Dec 28, 2024",
      readTime: "7 min read"
    },
    {
      title: "Monetization Strategies for Content Creators",
      excerpt: "Diversify your income streams and build a sustainable creator business.",
      category: "Business",
      date: "Dec 25, 2024",
      readTime: "9 min read"
    }
  ];

  const categories = ["All", "Business", "Mentoring", "Marketing", "Education", "Industry"];

  return (
    <div className="min-h-screen bg-background selection:bg-primary selection:text-primary-foreground">
      <SEO 
        title="Insights & Stories" 
        description="Explore the latest trends, tips, and success stories from the global creator economy on the Devfolio Marketplace blog." 
      />
      <Header />
      
      <main className="pt-32 pb-24 overflow-hidden">
        {/* Background Accents */}
        <div className="fixed top-0 right-0 -z-10 w-1/3 h-1/3 bg-primary/5 blur-[120px] pointer-events-none rounded-full" />
        <div className="fixed bottom-0 left-0 -z-10 w-1/3 h-1/3 bg-primary/5 blur-[120px] pointer-events-none rounded-full" />

        <div className="container mx-auto px-4 relative">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border/50 text-xs font-black uppercase tracking-[0.2em] text-primary">
              <BookOpen className="w-4 h-4" />
              Creator Intelligence
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight text-foreground leading-tight">
              Insights & <span className="text-primary italic">Stories.</span>
            </h1>
            <p className="text-xl text-muted-foreground font-medium leading-relaxed">
              Decording the future of the creator economy, one breakthrough at a time.
            </p>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-3 justify-center mb-16">
            {categories.map((category) => (
              <Button
                key={category}
                variant={category === "All" ? "default" : "outline"}
                className={`rounded-xl px-6 font-bold transition-all ${
                  category === "All" 
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" 
                    : "bg-secondary/30 border-border/50 hover:border-primary/30"
                }`}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Blog Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
            {posts.map((post, index) => (
              <Card key={index} className="group rounded-[32px] bg-card border-border/50 hover:border-primary/20 transition-all duration-500 overflow-hidden cursor-pointer hover:shadow-2xl hover:shadow-primary/5">
                <div className="p-8 space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="px-4 py-1.5 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest rounded-full">
                      {post.category}
                    </span>
                    <Sparkles className="w-4 h-4 text-primary/40 group-hover:text-primary transition-colors" />
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-2xl font-black leading-tight tracking-tight text-foreground group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground font-medium leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-border/50 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{post.date}</span>
                    </div>
                    <span className="text-xs font-bold text-muted-foreground bg-secondary/50 px-3 py-1 rounded-lg">
                      {post.readTime}
                    </span>
                  </div>

                  <div className="pt-4">
                    <Button variant="ghost" className="p-0 h-auto font-black text-primary hover:bg-transparent group-hover:gap-3 transition-all gap-2">
                      Read Full Article
                      <ArrowRight className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Newsletter Section */}
          <div className="max-w-5xl mx-auto">
            <Card className="p-12 md:p-20 rounded-[40px] bg-foreground text-background border-none relative overflow-hidden text-center">
              <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none group-hover:scale-110 transition-transform">
                <Mail className="w-64 h-64 text-primary" />
              </div>
              <div className="relative z-10 space-y-10">
                <div className="space-y-4">
                  <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
                    Subscribe to <span className="text-primary italic">Intelligence.</span>
                  </h2>
                  <p className="text-xl text-background/60 font-medium max-w-2xl mx-auto leading-relaxed">
                    The latest creator breakthroughs, platform updates, and exclusive success stories delivered directly to your node.
                  </p>
                </div>
                
                <div className="flex flex-col md:flex-row gap-4 max-w-xl mx-auto">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 rounded-2xl py-8 bg-background/10 border-background/20 text-background placeholder:text-background/40 focus:border-primary/50 transition-all font-bold text-lg px-8"
                  />
                  <Button className="rounded-2xl px-12 py-8 font-black text-lg bg-primary text-primary-foreground hover:scale-105 transition-all shadow-2xl shadow-primary/30">
                    Subscribe
                  </Button>
                </div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-background/40">Zero noise. Pure signal.</p>
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

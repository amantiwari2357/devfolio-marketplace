import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Eye, Share2, Sparkles, BookOpen } from "lucide-react";
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

            <div className="prose prose-lg dark:prose-invert prose-headings:font-black prose-headings:tracking-tighter prose-headings:uppercase prose-p:font-medium prose-p:leading-relaxed max-w-none text-muted-foreground/90 italic">
              <p className="text-xl md:text-2xl font-bold text-foreground leading-relaxed">
                {post.excerpt}
              </p>
              
              {/* Simulated Content Since JSON only has excerpts */}
              <div className="space-y-8 mt-12">
                <p>
                  In the rapidly evolving digital landscape, establishing a premium storefront and maintaining robust operational metrics is no longer optional—it is the baseline for scale. Network nodes that fail to innovate quickly find themselves outpaced by adaptive algorithms and decentralized competitors.
                </p>
                <div className="bg-secondary/10 border-l-4 border-primary p-8 rounded-r-[24px] my-10 italic">
                  <p className="font-black text-xl md:text-3xl text-foreground !m-0 tracking-tight">
                    "Growth is not a consequence of effort, but the mathematical outcome of applying the right leverage at the perfect vector."
                  </p>
                </div>
                <h3 className="text-2xl font-black text-foreground uppercase tracking-tight flex items-center gap-3">
                  <Sparkles className="w-6 h-6 text-primary" />
                  Strategic Implementation
                </h3>
                <p>
                  To successfully implement these strategies, start by reverse-engineering your core conversion events. Map the entire journey from the initial awareness node to the final conversion protocol. Remove friction points mercilessly.
                </p>
                <p>
                  The highest performing creators don't just sell services; they architect environments where the client naturally arrives at the conclusion that a transaction is the only logical path forward. Utilize tools like automated intake systems, asynchronous video updates, and high-fidelity project boards to establish authority immediately.
                </p>
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

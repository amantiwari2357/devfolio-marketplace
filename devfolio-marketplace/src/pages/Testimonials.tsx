import { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import TestimonialCard from "@/components/cards/TestimonialCard";
import SEO from "@/components/layout/SEO";
import api from "@/services/api";
import { MessageSquare, Star, Quote } from "lucide-react";

interface Testimonial {
  _id: string;
  quote: string;
  author: string;
  role: string;
}

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await api.get('/testimonials');
        setTestimonials(response.data.testimonials);
      } catch (err) {
        console.error('Error fetching testimonials:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Testimonials | Success Stories" 
        description="Hear from our community of professionals who have transformed their digital journey." 
      />
      <Header />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center mb-20 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest animate-fade-in">
              <Star className="w-4 h-4 fill-primary" />
              Success Stories
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-foreground leading-[1.1] animate-slide-up">
              Don't Just Take <span className="text-primary italic">Our Word.</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground font-medium leading-relaxed max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '100ms' }}>
              Discover how experts and brands around the world are scaling their impact using Devfolio Marketplace.
            </p>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <div className="w-12 h-12 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
              <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest animate-pulse">Loading testimonials...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-slide-up" style={{ animationDelay: '200ms' }}>
              {testimonials.map((testimonial) => (
                <div key={testimonial._id} className="relative group">
                   <div className="absolute -top-4 -left-4 text-primary/10 group-hover:text-primary/20 transition-colors pointer-events-none">
                      <Quote className="w-16 h-16 fill-current" />
                   </div>
                   <TestimonialCard {...testimonial} />
                </div>
              ))}
            </div>
          )}

          {!loading && testimonials.length === 0 && (
            <div className="text-center py-20 bg-secondary/20 rounded-[32px] border border-border/40">
              <MessageSquare className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-muted-foreground font-medium">No testimonials available at the moment.</p>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Testimonials;

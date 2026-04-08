import { useState, useEffect } from "react";
import TestimonialCard from "@/components/cards/TestimonialCard";
import api from "@/services/api";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Testimonial {
  _id: string;
  quote: string;
  author: string;
  role: string;
}

const TestimonialsSection = () => {
  const navigate = useNavigate();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await api.get('/testimonials');
        setTestimonials(response.data.testimonials);
      } catch (err) {
        console.error('Error fetching testimonials:', err);
        setError('Failed to load testimonials');
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  if (loading) {
    return (
      <section className="py-16 md:py-20 bg-background">
        <div className="container mx-auto px-6">
          <h2 className="text-2xl md:text-4xl font-bold text-center mb-10 text-foreground">
            Don't Just Take Our Word for It
          </h2>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error || testimonials.length === 0) {
    return (
      <section className="py-16 md:py-20 bg-background">
        <div className="container mx-auto px-6">
          <h2 className="text-2xl md:text-4xl font-bold text-center mb-10 text-foreground">
            Don't Just Take Our Word for It
          </h2>
          <div className="text-center text-muted-foreground text-sm">
            {error || 'No testimonials available at the moment.'}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-spacing bg-background relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-0 right-0 -z-10 w-1/3 h-1/3 bg-primary/5 blur-[120px] rounded-full animate-pulse" />
      
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24 animate-slide-up">
           <h2 className="heading-responsive">
            Don't Just Take <span className="text-primary">Our Word</span> for It.
          </h2>
          <p className="text-sm md:text-lg text-muted-foreground font-medium leading-relaxed mt-6">
            Join the community of professionals who have transformed their digital journey with our platform.
          </p>
        </div>

        <div className="relative group animate-slide-up" style={{ animationDelay: '100ms' }}>
          <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 overflow-x-auto md:overflow-x-visible pb-8 md:pb-0 snap-x snap-mandatory scrollbar-hide -mx-6 px-6 md:mx-0 md:px-0">
            {testimonials.slice(0, 6).map((testimonial) => (
              <div key={testimonial._id} className="min-w-[85vw] md:min-w-0 snap-center">
                <TestimonialCard {...testimonial} />
              </div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <Button 
              onClick={() => navigate('/testimonials')}
              variant="outline" 
              className="h-14 px-10 rounded-2xl font-bold border-primary/20 bg-primary/5 text-primary hover:bg-primary hover:text-primary-foreground shadow-lg shadow-primary/5 hover:shadow-primary/20 transition-all gap-2 group/btn"
            >
              View All Stories
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

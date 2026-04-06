import { useState, useEffect } from "react";
import TestimonialCard from "@/components/cards/TestimonialCard";
import api from "@/services/api";

interface Testimonial {
  _id: string;
  quote: string;
  author: string;
  role: string;
}

const TestimonialsSection = () => {
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
      <section className="py-20" style={{ backgroundColor: 'hsl(var(--background))' }}>
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-black">
            Don't Just Take Our Word for It
          </h2>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error || testimonials.length === 0) {
    return (
      <section className="py-20" style={{ backgroundColor: 'hsl(var(--background))' }}>
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-black">
            Don't Just Take Our Word for It
          </h2>
          <div className="text-center text-muted-foreground">
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
        <div className="text-center max-w-4xl mx-auto mb-20 md:mb-32 animate-slide-up">
           <h2 className="heading-responsive">
            Don't Just Take <span className="text-primary NOT-italic">Our Word</span> for It.
          </h2>
          <p className="text-base md:text-xl text-muted-foreground font-bold italic tracking-tight leading-relaxed opacity-70 mt-8">
            Join the community of professionals who have transformed their digital journey with our platform.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 animate-slide-up" style={{ animationDelay: '100ms' }}>
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial._id} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

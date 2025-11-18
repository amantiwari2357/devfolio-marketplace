import TestimonialCard from "@/components/cards/TestimonialCard";

const testimonials = [
  {
    quote: "Using this platform helped me get my portfolio online and start offering freelance services effortlessly!",
    author: "Rohit Sharma",
    role: "Freelance Web Developer",
  },
  {
    quote: "The website builder and client dashboard are super smooth. My business feels more professional now!",
    author: "Priya Mehta",
    role: "Digital Marketing Consultant",
  },
  {
    quote: "I use this platform to manage my online sessions and payments. Everything works perfectly together.",
    author: "Ankit Verma",
    role: "Career Coach & Mentor",
  },
  {
    quote: "All my services, bookings, and payments now happen in one place — it saves me hours every week!",
    author: "Sneha Nair",
    role: "Graphic Designer",
  },
  {
    quote: "The support team is fantastic. They really listen to feedback and keep improving the platform!",
    author: "Aditya Iyer",
    role: "Startup Founder",
  },
  {
    quote: "Finally, a platform that helps creators and freelancers manage their business from one dashboard. Love it!",
    author: "Neha Kapoor",
    role: "Content Creator & Influencer",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-20" style={{ backgroundColor: 'hsl(var(--background))' }}>
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-black">
          Don't Just Take Our Word for It
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, idx) => (
            <TestimonialCard key={idx} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ExpertsSection from "@/components/sections/ExpertsSection";
import ServicesSection from "@/components/sections/ServicesSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import CourseSection from "@/components/sections/CourseSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import FAQSection from "@/components/sections/FAQSection";
import CTASection from "@/components/sections/CTASection";
import SEO from "@/components/layout/SEO";
import { LiveProofToast } from "@/components/ui/LiveProofToast";

const Index = () => {
  return (
    <div className="min-h-screen bg-background selection:bg-primary selection:text-primary-foreground">
      <SEO 
        title="Devfolio | Professional Marketplace" 
        description="The premier marketplace for the global creator economy. Build, launch, and scale your digital future with elite mentors and world-class services." 
      />
      <Header />
      <main id="root-main-content" className="relative overflow-hidden">
        {/* Architectural Mesh */}
        <div className="absolute top-0 right-0 -z-10 w-full h-[1000px] bg-gradient-to-b from-primary/5 to-transparent blur-[120px] pointer-events-none" />
        
        <HeroSection />
        <section aria-label="Featured Projects Portfolio">
          <ProjectsSection />
        </section>
        <section aria-label="Connect with Experts">
          <ExpertsSection />
        </section>
        <section aria-label="Our Digital Services">
          <ServicesSection />
        </section>
        <section aria-label="Key Platform Features">
          <FeaturesSection />
        </section>
        <section aria-label="Educational Resources">
          <CourseSection />
        </section>
        <section aria-label="Client Testimonials">
          <TestimonialsSection />
        </section>
        <section aria-label="Frequently Asked Questions">
          <FAQSection />
        </section>
        <section aria-label="Get Started Now">
          <CTASection />
        </section>
      </main>
      <Footer />
      <LiveProofToast />
    </div>
  );
};

export default Index;

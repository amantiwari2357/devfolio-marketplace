import { lazy, Suspense } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import SEO from "@/components/layout/SEO";
import { LiveProofToast } from "@/components/ui/LiveProofToast";

// Lazy-loaded clusters for optimized TBT
const ProjectsSection = lazy(() => import("@/components/sections/ProjectsSection"));
const ExpertsSection = lazy(() => import("@/components/sections/ExpertsSection"));
const ServicesSection = lazy(() => import("@/components/sections/ServicesSection"));
const FeaturesSection = lazy(() => import("@/components/sections/FeaturesSection"));
const CourseSection = lazy(() => import("@/components/sections/CourseSection"));
const TestimonialsSection = lazy(() => import("@/components/sections/TestimonialsSection"));
const FAQSection = lazy(() => import("@/components/sections/FAQSection"));
const CTASection = lazy(() => import("@/components/sections/CTASection"));

const SectionSkeleton = () => (
  <div className="section-spacing container mx-auto px-6">
    <div className="w-48 h-10 bg-muted animate-pulse rounded-2xl mb-8" />
    <div className="grid md:grid-cols-3 gap-8">
      {[1, 2, 3].map((i) => (
        <div key={i} className="h-64 bg-muted/50 animate-pulse rounded-[44px]" />
      ))}
    </div>
  </div>
);

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

        <Suspense fallback={<SectionSkeleton />}>
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
        </Suspense>
      </main>
      <Footer />
      <LiveProofToast />
    </div>
  );
};

export default Index;

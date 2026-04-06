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
        title="DEVFOLIO | The Creator Protocol" 
        description="The premier marketplace for the global creator economy. Build, launch, and scale your digital future with elite mentors and world-class services." 
      />
      <Header />
      <main className="relative overflow-hidden">
        {/* Architectural Mesh */}
        <div className="absolute top-0 right-0 -z-10 w-full h-[1000px] bg-gradient-to-b from-primary/5 to-transparent blur-[120px] pointer-events-none" />
        
        <HeroSection />
        <ProjectsSection />
        <ExpertsSection />
        <ServicesSection />
        <FeaturesSection />
        <CourseSection />
        <TestimonialsSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
      <LiveProofToast />
    </div>
  );
};

export default Index;

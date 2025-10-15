import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const CourseSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            Grow Your Business with Our Digital Solutions
          </h2>
          
          <div className="grid lg:grid-cols-2 gap-8 items-center mt-16">
            <Card className="bg-purple-800/50 border-purple-700 p-8 backdrop-blur-sm">
              <h3 className="text-3xl font-bold mb-4 text-white">Our Professional Services</h3>
              <p className="text-purple-100 mb-4">
                We help you build modern, high-performing digital experiences.
              </p>
              <p className="text-purple-200 font-semibold mb-6">
                Web, App, and Branding — all in one place.
              </p>
              
              <div className="flex gap-4">
                <Button 
                  className="bg-white text-purple-900 hover:bg-purple-50"
                  onClick={() => window.location.href = "/create-course"}
                >
                  Explore Services
                </Button>
                <Button
                  className="bg-white text-purple-900 hover:bg-purple-50"
                  onClick={() => window.location.href = "/contact"}
                >
                  Contact Us
                </Button>
              </div>
            </Card>
            
            <div className="relative">
              <Card className="bg-white/10 backdrop-blur-lg border-white/20 p-6 rounded-2xl">
                <div className="aspect-video bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg mb-4 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white/30 flex items-center justify-center">
                    <div className="w-0 h-0 border-l-8 border-l-white border-t-6 border-t-transparent border-b-6 border-b-transparent ml-1" />
                  </div>
                </div>
                <div className="space-y-2 text-sm text-white/80">
                  <p>💻 Website & App Development</p>
                  <p>🎨 Branding & UI/UX Design</p>
                  <p>🚀 SEO & Digital Marketing</p>
                  <p>⚙️ Admin Panels & CRM Solutions</p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseSection;

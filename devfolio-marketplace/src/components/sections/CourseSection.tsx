import { ArrowRight, Code, Palette, TrendingUp, Cog } from "lucide-react";

const CourseSection = () => {
  const services = [
    {
      icon: Code,
      title: "Custom Software Development",
      description: "Build scalable, high-performance applications tailored to your business needs"
    },
    {
      icon: Palette,
      title: "UI/UX & Branding Design",
      description: "Create stunning visual identities that captivate and convert your audience"
    },
    {
      icon: TrendingUp,
      title: "Digital Marketing & SEO",
      description: "Drive traffic, boost rankings, and grow your online presence exponentially"
    },
    {
      icon: Cog,
      title: "Enterprise Solutions",
      description: "Admin panels, CRM systems, and automation tools for seamless operations"
    }
  ];

  return (
    <section className="py-24" style={{ backgroundColor: 'hsl(var(--background))' }} className="text-gray-900 relative overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-100/40 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-20">
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-700 bg-clip-text text-transparent">
              Transform Your Vision Into Reality
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-medium">
              We deliver cutting-edge software solutions and digital marketing strategies that drive real business growth
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-8 items-start mb-16">
            {/* Left Card - Services Overview */}
            <div className="lg:col-span-1">
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 p-10 hover:border-blue-400 hover:shadow-2xl hover:shadow-blue-200/50 transition-all duration-300 rounded-2xl">
                <h3 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-900">
                  Our Digital Solutions
                </h3>
                <p className="text-gray-700 mb-4 leading-relaxed font-medium text-base">
                  We specialize in building modern, scalable digital experiences that drive measurable results for your business.
                </p>
                <p className="text-blue-700 font-bold mb-8 text-lg">
                  From concept to deployment, we handle everything.
                </p>
                
                <div className="space-y-3">
                  <button 
                    className="w-full bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-700 text-white hover:from-blue-700 hover:via-cyan-700 hover:to-blue-800 font-bold py-4 text-base rounded-xl shadow-lg hover:shadow-2xl hover:shadow-blue-400/50 transition-all duration-300 flex items-center justify-center gap-2 group"
                    onClick={() => window.location.href = "/services"}
                  >
                    Explore Services
                    <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                  </button>
                  <button
                    className="w-full bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-bold py-4 text-base rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                    onClick={() => window.location.href = "/contact"}
                  >
                    Get in Touch
                  </button>
                </div>
              </div>
            </div>

            {/* Right Cards - Services Grid */}
            <div className="lg:col-span-2 grid sm:grid-cols-2 gap-6">
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <div 
                    key={index}
                    className="bg-gradient-to-br from-white to-gray-50 border-2 border-gray-200 p-8 hover:border-blue-400 hover:shadow-xl hover:shadow-blue-200/40 transition-all duration-300 group rounded-2xl"
                  >
                    <div className="mb-5 inline-block p-4 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl group-hover:shadow-lg group-hover:shadow-blue-400/50 transition-all">
                      <Icon className="text-white" size={28} />
                    </div>
                    <h4 className="text-xl font-bold mb-3 text-gray-900">
                      {service.title}
                    </h4>
                    <p className="text-gray-600 text-base leading-relaxed font-medium">
                      {service.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Section - Key Stats/Features */}
          <div className="bg-gradient-to-r from-blue-100/50 via-cyan-100/50 to-blue-100/50 border-2 border-blue-300 p-12 sm:p-16 rounded-2xl shadow-lg hover:shadow-xl transition-all">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center p-6 bg-white rounded-xl border border-blue-200 hover:border-blue-400 hover:shadow-lg transition-all">
                <div className="text-4xl sm:text-5xl font-bold text-blue-600 mb-3">50+</div>
                <p className="text-gray-700 font-semibold text-lg">Projects Delivered</p>
              </div>
              <div className="text-center p-6 bg-white rounded-xl border border-blue-200 hover:border-blue-400 hover:shadow-lg transition-all">
                <div className="text-4xl sm:text-5xl font-bold text-blue-600 mb-3">100%</div>
                <p className="text-gray-700 font-semibold text-lg">Client Satisfaction</p>
              </div>
              <div className="text-center p-6 bg-white rounded-xl border border-blue-200 hover:border-blue-400 hover:shadow-lg transition-all">
                <div className="text-4xl sm:text-5xl font-bold text-blue-600 mb-3">8+</div>
                <p className="text-gray-700 font-semibold text-lg">Years Experience</p>
              </div>
              <div className="text-center p-6 bg-white rounded-xl border border-blue-200 hover:border-blue-400 hover:shadow-lg transition-all">
                <div className="text-4xl sm:text-5xl font-bold text-blue-600 mb-3">24/7</div>
                <p className="text-gray-700 font-semibold text-lg">Support Available</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseSection;
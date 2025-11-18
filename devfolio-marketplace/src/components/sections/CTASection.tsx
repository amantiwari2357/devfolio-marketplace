import { Zap, CheckCircle, TrendingUp, Clock } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-cyan-100/40 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full">
              <Zap className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-semibold text-blue-600">Quick Launch</span>
            </div>

            <h2 className="text-5xl sm:text-6xl lg:text-6xl font-bold mb-8 leading-tight">
              Launch your{" "}
              <span className="bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-700 bg-clip-text text-transparent">
                website & services
              </span>{" "}
              in minutes
            </h2>

            <p className="text-xl text-gray-600 mb-12 leading-relaxed font-medium">
              Build a stunning website, showcase your skills, and start getting clients — all from one powerful dashboard.
            </p>

            <div className="space-y-4 mb-12">
              <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-gray-900">Professional Website</p>
                  <p className="text-gray-600 text-sm">No coding required</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-gray-900">Instant Client Access</p>
                  <p className="text-gray-600 text-sm">Start receiving projects today</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-gray-900">Built-in Analytics</p>
                  <p className="text-gray-600 text-sm">Track performance in real-time</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => window.location.href = "#launch"}
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-700 text-white font-bold rounded-xl hover:shadow-2xl hover:shadow-blue-400/50 transition-all duration-300 text-lg group"
            >
              Get Started Now
              <span className="group-hover:translate-x-1 transition-transform">🚀</span>
            </button>
          </div>

          {/* Right Card - Activity Feed */}
          <div className="relative">
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 p-10 rounded-3xl shadow-xl hover:shadow-2xl hover:shadow-blue-200/50 transition-all duration-300">
              {/* User Header */}
              <div className="bg-white p-6 rounded-2xl mb-8 border border-gray-200 hover:border-blue-300 transition-all">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                    <span className="text-white font-bold text-lg">AT</span>
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-lg">Aman Tiwari</p>
                    <p className="text-sm text-gray-500 font-medium">myportfolio.in/aman</p>
                  </div>
                </div>
              </div>

              {/* Highlighted Stats Box */}
              <div className="bg-gradient-to-br from-blue-600 via-cyan-600 to-blue-700 rounded-2xl p-8 flex items-center justify-center aspect-square mb-8 shadow-lg">
                <div className="text-center">
                  <Zap className="w-20 h-20 text-white mx-auto mb-3 drop-shadow-lg" />
                  <p className="text-white font-bold text-lg">Active Profile</p>
                  <p className="text-blue-100 text-sm mt-1">Getting Results</p>
                </div>
              </div>

              {/* Activity Feed */}
              <div className="space-y-4">
                <p className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-6">Recent Activity</p>
                
                {/* Activity Item 1 */}
                <div className="bg-white p-4 rounded-xl border border-gray-200 hover:border-green-400 hover:shadow-md transition-all group">
                  <div className="flex items-start gap-3">
                    <div className="w-3 h-3 rounded-full bg-green-500 flex-shrink-0 mt-2"></div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 text-sm">New project inquiry</p>
                      <p className="text-green-600 font-bold text-lg mt-1">₹5,000</p>
                    </div>
                    <TrendingUp className="w-5 h-5 text-green-500 flex-shrink-0" />
                  </div>
                </div>

                {/* Activity Item 2 */}
                <div className="bg-white p-4 rounded-xl border border-gray-200 hover:border-purple-400 hover:shadow-md transition-all group">
                  <div className="flex items-start gap-3">
                    <div className="w-3 h-3 rounded-full bg-purple-500 flex-shrink-0 mt-2"></div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 text-sm italic">⭐ Client review received</p>
                      <p className="text-purple-600 font-semibold text-sm mt-1">5.0 / 5.0</p>
                    </div>
                    <CheckCircle className="w-5 h-5 text-purple-500 flex-shrink-0" />
                  </div>
                </div>

                {/* Activity Item 3 */}
                <div className="bg-white p-4 rounded-xl border border-gray-200 hover:border-blue-400 hover:shadow-md transition-all group">
                  <div className="flex items-start gap-3">
                    <div className="w-3 h-3 rounded-full bg-blue-500 flex-shrink-0 mt-2"></div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 text-sm">New website order</p>
                      <p className="text-blue-600 font-bold text-lg mt-1">₹12,000</p>
                    </div>
                    <Clock className="w-5 h-5 text-blue-500 flex-shrink-0" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
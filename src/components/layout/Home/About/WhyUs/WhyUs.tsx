import React from "react"
import { Shield, Users, Award, Zap, Clock, Handshake } from "lucide-react"

export default function WhyUs() {
  const features = [
    {
      icon: Shield,
      title: "Verified Properties",
      desc: "Every listing undergoes thorough legal verification for clear titles and authentic ownership."
    },
    {
      icon: Users,
      title: "Expert Team",
      desc: "Our experienced professionals provide personalized guidance throughout your property journey."
    },
    {
      icon: Award,
      title: "Trusted Service",
      desc: "Bangladesh's premier real estate partner with a proven track record of excellence."
    },
    {
      icon: Zap,
      title: "Fast Processing",
      desc: "Streamlined procedures ensure quick and efficient property transactions."
    },
    {
      icon: Clock,
      title: "24/7 Support",
      desc: "Our dedicated team is always available to assist you with any queries."
    },
    {
      icon: Handshake,
      title: "Transparent Deals",
      desc: "No hidden fees or surprises. We believe in complete transparency in all our transactions."
    }
  ]

  return (
    <section className="px-[5%] py-16 sm:py-24 bg-white font-sans text-gray-900 relative overflow-hidden">
      {/* Background Decorative Blur */}
      <div className="absolute top-1/4 -right-20 w-80 h-80 bg-[#800020]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-screen-xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center space-y-4 max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
            Why Choose UrbanKeys
          </h2>
          <p className="text-gray-600 text-base sm:text-lg max-w-2xl">
            Experience the difference with our comprehensive real estate solutions
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((item, index) => {
            const IconComponent = item.icon
            return (
              <div
                key={index}
                className="p-6 rounded-2xl border border-gray-200/70 bg-white hover:border-[#800020]/30 hover:shadow-xl transition-all duration-300 group"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-gray-50 border border-gray-200/80 text-[#800020] group-hover:bg-[#800020] group-hover:text-white transition-all duration-300 shrink-0">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-base font-bold text-gray-900 group-hover:text-[#800020] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

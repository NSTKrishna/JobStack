import {
  Building2,
  Users,
  TrendingUp,
  Star,
  CodeXml,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { Marquee } from "./Marquee";
import { Link } from "react-router-dom";

function HeroSection() {
  const stats = [
    { icon: Building2, label: "Companies", value: "2,500+" },
    { icon: Users, label: "Job Seekers", value: "50,000+" },
    { icon: TrendingUp, label: "Jobs Posted", value: "15,000+" },
    { icon: Star, label: "Success Rate", value: "94%" },
  ];
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50 overflow-hidden">
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
      <div className="absolute top-40 right-10 w-72 h-72 bg-gray-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>

      <div className="Container relative px-6 md:px-16 lg:px-24 py-20 animate-slide-in-blur">
        <div className="flex justify-center mb-8 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-md border border-blue-100 hover:shadow-lg transition-shadow duration-300">
            <Sparkles className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium bg-gradient-to-r from-blue-600 to-gray-700 bg-clip-text text-transparent">
              Your #1 Destination for Development Industry Jobs
            </span>
          </div>
        </div>

        <div className="Content text-center max-w-5xl mx-auto">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 bg-clip-text text-transparent">
              Discover Endless
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-gray-600 bg-clip-text text-transparent">
              Career Opportunities
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Connect with top companies and find your dream job in the
            development industry. Start your journey today.
          </p>
        </div>

        <div className="ButtonContainer flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <a
            href="#jobs"
            className="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300 transform"
          >
            Browse All Jobs
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </a>
          <Link
            to="/Company_page"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-gray-900 font-semibold border-2 border-gray-200 hover:border-blue-600 hover:shadow-xl transition-all duration-300"
          >
            Browse Companies
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8 mb-16 max-w-6xl mx-auto">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg border border-blue-100 hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-blue-100 to-gray-100 rounded-xl mb-3">
                <stat.icon className="h-7 w-7 text-blue-600" />
              </div>
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-gray-600 bg-clip-text text-transparent mb-1">
                {stat.value}
              </div>
              <div className="text-sm font-medium text-gray-600">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        <div className="Slider text-center">
          <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-6">
            Trusted by Industry Leaders
          </p>
          <Marquee />
        </div>
      </div>
    </div>
  );
}
export default HeroSection;

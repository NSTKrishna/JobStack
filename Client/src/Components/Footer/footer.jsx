import { Link } from "react-router-dom";
import {
  Briefcase,
  Mail,
  Phone,
  MapPin,
  Twitter,
  Linkedin,
  Github,
  Instagram,
  ArrowRight,
} from "lucide-react";
import logo from "../../../public/logo.png";

function FooterApp() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-gray-300">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-gray-600 to-blue-600"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-br from-blue-600 to-gray-600 p-2 rounded-xl">
                <img src={logo} alt="JobStack Logo" className="h-6 w-6" />
              </div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-gray-400 bg-clip-text text-transparent">
                JobStack
              </h2>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Connecting talented developers with innovative companies. Your
              dream career is just a click away.
            </p>
            <div className="flex space-x-3">
              <a
                href="#"
                className="p-2 bg-white/10 hover:bg-blue-600 rounded-lg transition-all duration-300 hover:scale-110"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="p-2 bg-white/10 hover:bg-blue-600 rounded-lg transition-all duration-300 hover:scale-110"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="p-2 bg-white/10 hover:bg-blue-600 rounded-lg transition-all duration-300 hover:scale-110"
                aria-label="Github"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="p-2 bg-white/10 hover:bg-blue-600 rounded-lg transition-all duration-300 hover:scale-110"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              For Job Seekers
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/Job_page"
                  className="text-gray-400 hover:text-blue-400 transition-colors flex items-center gap-2 group"
                >
                  <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Browse Jobs
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-blue-400 transition-colors flex items-center gap-2 group"
                >
                  <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Career Advice
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-blue-400 transition-colors flex items-center gap-2 group"
                >
                  <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Resume Builder
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-blue-400 transition-colors flex items-center gap-2 group"
                >
                  <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Success Stories
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              For Employers
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/Company_page"
                  className="text-gray-400 hover:text-blue-400 transition-colors flex items-center gap-2 group"
                >
                  <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Post a Job
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-blue-400 transition-colors flex items-center gap-2 group"
                >
                  <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Browse Candidates
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-blue-400 transition-colors flex items-center gap-2 group"
                >
                  <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Pricing Plans
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-blue-400 transition-colors flex items-center gap-2 group"
                >
                  <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Success Stories
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-gray-400">
                <Mail className="h-5 w-5 mt-0.5 text-blue-400" />
                <a
                  href="mailto:jobstack@gmail.com"
                  className="hover:text-blue-400 transition-colors"
                >
                  jobstack@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3 text-gray-400">
                <Phone className="h-5 w-5 mt-0.5 text-blue-400" />
                <a
                  href="tel:+919876543210"
                  className="hover:text-blue-400 transition-colors"
                >
                  +91 9876543210
                </a>
              </li>
              <li className="flex items-start gap-3 text-gray-400">
                <MapPin className="h-5 w-5 mt-0.5 text-blue-400" />
                <span>
                  Kothrud, Pune
                  <br />
                  Maharashtra
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 mb-12 border border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-xl font-bold text-white mb-2">
                Stay Updated
              </h3>
              <p className="text-gray-400 text-sm">
                Get the latest job opportunities delivered to your inbox
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <input
                type="email"
                id="newsletter-email"
                name="newsletter-email"
                autoComplete="email"
                placeholder="Enter your email"
                className="px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-[280px]"
              />
              <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:shadow-xl hover:scale-105 transition-all duration-300 whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">
              © {currentYear} JobStack. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
              <a href="#" className="hover:text-blue-400 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-blue-400 transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-blue-400 transition-colors">
                Cookie Policy
              </a>
              <a href="#" className="hover:text-blue-400 transition-colors">
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50"></div>
    </footer>
  );
}

export default FooterApp;

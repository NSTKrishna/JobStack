import { useState, useEffect } from "react";
import { Search, Building2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCompanyStore } from "../Api/store";
import { useFetchCompanies } from "../Api/hooks";
import CompanyCard from "../components/CompanyCard";
import CompanyDetailModal from "../components/CompanyDetailModal";
import { data } from "react-router-dom";

function CompanyView() {
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const companies = useCompanyStore((state) => state.companies);
  const { fetchCompanies, loading, error } = useFetchCompanies();


  useEffect(() => {
    fetchCompanies();
  }, [fetchCompanies]);

  console.log(companies);

  const getColorForIndex = (index) => {
    const colors = [
      "bg-purple-100 text-purple-600",
      "bg-blue-100 text-blue-600",
      "bg-pink-100 text-pink-600",
      "bg-yellow-100 text-yellow-600",
      "bg-indigo-100 text-indigo-600",
      "bg-cyan-100 text-cyan-600",
      "bg-emerald-100 text-emerald-600",
      "bg-orange-100 text-orange-600",
      "bg-rose-100 text-rose-600",
    ];
    return colors[index % colors.length];
  };

  const getIconForIndustry = (industry) => {
    const industryIcons = {
      technology: "💻",
      "AI & Technology": "🤖",
      "Media & Entertainment": "🎵",
      "Sustainability": "🐻",
      "IoT & Smart Home": "🐛",
      "Social & Dating": "🎯",
      "Fashion & Lifestyle": "👗",
      "Beauty & Wellness": "✨",
      "Finance": "💰",
      "Healthcare": "🏥",
      "E-commerce": "🛍️",
      "Education": "🎓",
    };
    return industryIcons[industry] || "🏢";
  };

  const handleCompanyClick = (company) => {
    setSelectedCompany(company);
  };

  const filteredCompanies = companies.filter((company) => {
    const query = searchQuery.toLowerCase();
    return (
      company.name?.toLowerCase().includes(query) ||
      company.companyName?.toLowerCase().includes(query) ||
      company.Company_Name?.toLowerCase().includes(query) ||
      company.industry?.toLowerCase().includes(query) ||
      company.description?.toLowerCase().includes(query)
    );
  });

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 text-lg mb-4 bg-red-50 px-6 py-4 rounded-xl border border-red-100">
            {error}
          </p>
          <button
            onClick={fetchCompanies}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 font-semibold transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">

      <div className="bg-white border-b border-gray-100 pb-12 pt-16 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
          <div className="absolute -left-12 bottom-10 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
          <div className="absolute right-10 top-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 font-semibold text-sm mb-6 tracking-wide uppercase">
            Top Employers
          </span>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 bg-clip-text text-transparent">
            Discover Innovative <br /> Companies
          </h1>
          <p className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Explore top-tier companies, culture, and opportunities. Find the perfect place to grow your career.
          </p>

          <div className="max-w-2xl mx-auto relative bg-white rounded-2xl shadow-xl shadow-blue-100/50 p-2 flex border border-gray-100">
            <div className="flex-1 relative flex items-center">
              <Search className="absolute left-4 text-gray-400 w-6 h-6" />
              <input
                type="text"
                placeholder="Search by company, industry, or keywords..."
                className="w-full pl-12 pr-4 py-3 bg-transparent border-none focus:outline-none text-gray-700 text-lg placeholder-gray-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors">
              Search
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-bold text-gray-800">
            {loading ? (
              <span className="w-48 h-6 bg-gray-200 rounded animate-pulse inline-block"></span>
            ) : (
              `Featured Companies (${filteredCompanies.length})`
            )}
          </h2>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-2xl h-80 p-6 border border-gray-100 animate-pulse">
                <div className="w-16 h-16 bg-gray-200 rounded-2xl mb-6"></div>
                <div className="h-6 w-3/4 bg-gray-200 rounded mb-3"></div>
                <div className="h-4 w-1/4 bg-gray-200 rounded mb-8"></div>
                <div className="space-y-2">
                  <div className="h-4 w-full bg-gray-200 rounded"></div>
                  <div className="h-4 w-full bg-gray-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredCompanies.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
              <Building2 className="w-10 h-10" />
            </div>
            <p className="text-gray-500 text-lg font-medium">No companies found matching "{searchQuery}"</p>
            <button
              onClick={() => setSearchQuery("")}
              className="mt-4 text-blue-600 hover:text-blue-700 font-semibold"
            >
              Clear Search
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredCompanies.map((company, index) => (
                <CompanyCard
                  key={company.id || index}
                  company={company}
                  index={index}
                  onClick={handleCompanyClick}
                  getColorForIndex={getColorForIndex}
                  getIconForIndustry={getIconForIndustry}
                />
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedCompany && (
          <CompanyDetailModal
            company={selectedCompany}
            companyIndex={companies.findIndex(c => c.id === selectedCompany.id)}
            onClose={() => setSelectedCompany(null)}
            getColorForIndex={getColorForIndex}
            getIconForIndustry={getIconForIndustry}
          />
        )}
      </AnimatePresence>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}

export default CompanyView;

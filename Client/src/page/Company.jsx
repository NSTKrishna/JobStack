import { useState, useEffect } from "react";
import { X, MapPin, Users, Globe, Building2, Briefcase } from "lucide-react";
import { useCompanyStore } from "../Api/store";
import { useFetchCompanies } from "../Api/hooks";

function CompanyView() {
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const companies = useCompanyStore((state) => state.companies);
  const { fetchCompanies, loading, error } = useFetchCompanies();

  useEffect(() => {
    fetchCompanies();
  }, [fetchCompanies]);

  const getColorForIndex = (index) => {
    const colors = [
      "bg-purple-600",
      "bg-blue-600",
      "bg-pink-600",
      "bg-yellow-500",
      "bg-purple-700",
      "bg-gray-600",
      "bg-gray-700",
      "bg-red-600",
      "bg-indigo-600",
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
    };
    return industryIcons[industry] || "🏢";
  };

  const handleCompanyClick = (company) => {
    setSelectedCompany(company);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setTimeout(() => setSelectedCompany(null), 300);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading companies...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg mb-4">{error}</p>
          <button
            onClick={fetchCompanies}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-white text-black">
        <div className="absolute -left-12 bottom-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute right-10 top-0 w-80 h-80 bg-cyan-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute left-1/2 -bottom-20 w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>

        <div className="text-center pt-20 pb-10 px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 bg-clip-text text-transparent">
            Browse Top AI Companies
          </h1>
          <p className="text-gray-600 text-lg">
            Discover companies currently looking for talented AI professionals
          </p>
        </div>

        <div className="max-w-7xl mx-auto px-6 pb-20">
          {companies.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">No companies found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {companies.map((data, index) => (
                <div
                  key={data.id || index}
                  onClick={() => handleCompanyClick(data)}
                  className="bg-white hover:shadow-[10px_10px_30px_rgba(0,0,0,0.1)] rounded-xl p-8 transition-all duration-300 cursor-pointer group border hover:border-blue-400"
                >
                  <div
                    className={`w-16 h-16 ${getColorForIndex(
                      index
                    )} rounded-xl flex items-center justify-center text-3xl mb-5 group-hover:scale-110 transition-transform duration-300`}
                  >
                    {getIconForIndustry(data.industry)}
                  </div>

                  <h3 className="text-xl font-semibold mb-3 group-hover:text-blue-600 transition-colors">
                    {data.name || data.Company_Name}
                  </h3>

                  <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
                    {data.description || data.Description}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {showModal && selectedCompany && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-slideUp"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 rounded-t-2xl flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div
                  className={`w-16 h-16 ${getColorForIndex(
                    companies.findIndex((c) => c.id === selectedCompany.id)
                  )} rounded-xl flex items-center justify-center text-3xl shadow-lg`}
                >
                  {getIconForIndustry(selectedCompany.industry)}
                </div>
                <div>
                  <h2 className="text-3xl font-bold mb-1">
                    {selectedCompany.name || selectedCompany.Company_Name}
                  </h2>
                  {selectedCompany.industry && (
                    <p className="text-blue-100 text-sm">
                      {selectedCompany.industry}
                    </p>
                  )}
                </div>
              </div>
              <button
                onClick={closeModal}
                className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-8">
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-3 text-gray-800">
                  About Company
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {selectedCompany.description || selectedCompany.Description}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {selectedCompany.location && (
                  <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl">
                    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-semibold mb-1">
                        Location
                      </p>
                      <p className="text-gray-800 font-medium">
                        {selectedCompany.location}
                      </p>
                    </div>
                  </div>
                )}

                {selectedCompany.size && (
                  <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-xl">
                    <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Users className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-semibold mb-1">
                        Company Size
                      </p>
                      <p className="text-gray-800 font-medium">
                        {selectedCompany.size} employees
                      </p>
                    </div>
                  </div>
                )}

                {selectedCompany.industry && (
                  <div className="flex items-start gap-3 p-4 bg-indigo-50 rounded-xl">
                    <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Building2 className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-semibold mb-1">
                        Industry
                      </p>
                      <p className="text-gray-800 font-medium">
                        {selectedCompany.industry}
                      </p>
                    </div>
                  </div>
                )}

                {selectedCompany.website && (
                  <div className="flex items-start gap-3 p-4 bg-green-50 rounded-xl">
                    <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Globe className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-semibold mb-1">
                        Website
                      </p>
                      <a
                        href={selectedCompany.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 font-medium hover:underline break-all"
                      >
                        {selectedCompany.website}
                      </a>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex gap-4">
                <button
                  className="flex-1 bg-gradient-to-r from-blue-600 to-blue-800 text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
                  onClick={() => {
                    // Navigate to jobs page or show jobs for this company
                    console.log(
                      "View jobs for:",
                      selectedCompany.name || selectedCompany.Company_Name
                    );
                  }}
                >
                  <Briefcase className="w-5 h-5" />
                  View Open Positions
                </button>
                {selectedCompany.website && (
                  <a
                    href={selectedCompany.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-white border-2 border-blue-600 text-blue-600 py-3 px-6 rounded-xl font-semibold hover:bg-blue-50 transition-all flex items-center justify-center gap-2"
                  >
                    <Globe className="w-5 h-5" />
                    Visit Website
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CompanyView;

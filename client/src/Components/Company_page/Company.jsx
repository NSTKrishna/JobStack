import { useState, useEffect } from "react";
import { X, MapPin, Users, Globe, Building2, Briefcase } from "lucide-react";
import axios from "axios";

function CompanyView() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Fetch companies from backend
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/companies/companies"
        );
        console.log("API Response:", response.data);

        // Map backend data to frontend format
        const mappedCompanies = (response.data.show || []).map(
          (comp, index) => ({
            id: comp.id || index,
            Company_Name: comp.Company_Name || comp.companyName,
            Icon: getIconForIndustry(comp.Industry || comp.industry),
            bgColor: getColorForIndex(index),
            Description: comp.Description || comp.description,
            website: comp.website,
            Location: comp.Location || comp.location,
            Size: comp.Size || comp.size,
            Industry: comp.Industry || comp.industry,
          })
        );

        setCompanies(mappedCompanies);
      } catch (error) {
        console.error("Error fetching companies:", error);
        // Fallback to dummy data if API fails
        setCompanies([
          {
            id: 1,
            Company_Name: "Applio",
            Icon: "💜",
            bgColor: "bg-purple-600",
            Description:
              "Applio is a next-generation AI company building smarter tools for tomorrow's world for today's workforce.",
            website: "https://applio.com",
            Location: "San Francisco, CA",
            Size: "50-200",
            Industry: "AI & Technology",
          },
          {
            id: 2,
            Company_Name: "AudioKraft",
            Icon: "🎵",
            bgColor: "bg-blue-600",
            Description:
              "AudioKraft is a pioneering force in audio innovation, crafting the next generation of sonic experiences.",
            website: "https://audiokraft.com",
            Location: "Los Angeles, CA",
            Size: "201-500",
            Industry: "Media & Entertainment",
          },
          {
            id: 3,
            Company_Name: "Bantropic",
            Icon: "🐻",
            bgColor: "bg-pink-600",
            Description:
              "Bantropic is a global innovation company shaping the future with sustainable and intelligent solutions.",
            website: "https://bantropic.com",
            Location: "Seattle, WA",
            Size: "100-500",
            Industry: "Sustainability",
          },
          {
            id: 4,
            Company_Name: "Bugzapper",
            Icon: "🐛",
            bgColor: "bg-yellow-500",
            Description:
              "BugZapper is a tech-driven company on a mission to protect your home from pests with precision and efficiency.",
            website: "https://bugzapper.com",
            Location: "Austin, TX",
            Size: "20-50",
            Industry: "IoT & Smart Home",
          },
          {
            id: 5,
            Company_Name: "Codebrick",
            Icon: "🧱",
            bgColor: "bg-purple-700",
            Description:
              "CodeBrick is a cutting-edge software development company building the future, one line of code at a time.",
            website: "https://codebrick.com",
            Location: "New York, NY",
            Size: "500-1000",
            Industry: "Technology",
          },
          {
            id: 6,
            Company_Name: "Datekart",
            Icon: "🎯",
            bgColor: "bg-gray-600",
            Description:
              "DateKart is a dynamic dating platform designed to help you find meaningful connections, effortlessly.",
            website: "https://datekart.com",
            Location: "Remote",
            Size: "10-50",
            Industry: "Social & Dating",
          },
          {
            id: 7,
            Company_Name: "Dressia",
            Icon: "👗",
            bgColor: "bg-gray-700",
            Description:
              "Dressia is an auto brand that empowers you to express yourself through luxury lifestyle.",
            website: "https://dressia.com",
            Location: "Milan, Italy",
            Size: "201-500",
            Industry: "Fashion & Lifestyle",
          },
          {
            id: 8,
            Company_Name: "DubSync",
            Icon: "🎬",
            bgColor: "bg-red-600",
            Description:
              "DubSync is a cutting-edge technology company revolutionizing multimedia synchronization for creators worldwide.",
            website: "https://dubsync.com",
            Location: "London, UK",
            Size: "50-100",
            Industry: "Media & Entertainment",
          },
          {
            id: 9,
            Company_Name: "Flaude",
            Icon: "✨",
            bgColor: "bg-indigo-600",
            Description:
              "Flaude is a premium beauty brand offering sophisticated solutions for radiant and healthy skin.",
            website: "https://flaude.com",
            Location: "Paris, France",
            Size: "100-200",
            Industry: "Beauty & Wellness",
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  const getIconForIndustry = (industry) => {
    const industryIcons = {
      technology: "💻",
      "AI & Technology": "🤖",
      "Media & Entertainment": "🎵",
      Sustainability: "🐻",
      "IoT & Smart Home": "🐛",
      "Social & Dating": "🎯",
      "Fashion & Lifestyle": "👗",
      "Beauty & Wellness": "✨",
    };
    return industryIcons[industry] || "🏢";
  };

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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {companies.map((data, index) => (
              <div
                key={data.id || index}
                onClick={() => handleCompanyClick(data)}
                className="bg-white hover:shadow-[10px_10px_30px_rgba(0,0,0,0.1)] rounded-xl p-8 transition-all duration-300 cursor-pointer group border hover:border-blue-400"
              >
                <div
                  className={`w-16 h-16 ${data.bgColor} rounded-xl flex items-center justify-center text-3xl mb-5 group-hover:scale-110 transition-transform duration-300`}
                >
                  {data.Icon}
                </div>

                <h3 className="text-xl font-semibold mb-3 group-hover:text-blue-600 transition-colors">
                  {data.Company_Name}
                </h3>

                <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
                  {data.Description}
                </p>
              </div>
            ))}
          </div>
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
                  className={`w-16 h-16 ${selectedCompany.bgColor} rounded-xl flex items-center justify-center text-3xl shadow-lg`}
                >
                  {selectedCompany.Icon}
                </div>
                <div>
                  <h2 className="text-3xl font-bold mb-1">
                    {selectedCompany.Company_Name}
                  </h2>
                  {selectedCompany.Industry && (
                    <p className="text-blue-100 text-sm">
                      {selectedCompany.Industry}
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
                  {selectedCompany.Description}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

                {selectedCompany.Location && (
                  <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl">
                    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-semibold mb-1">
                        Location
                      </p>
                      <p className="text-gray-800 font-medium">
                        {selectedCompany.Location}
                      </p>
                    </div>
                  </div>
                )}

                {selectedCompany.Size && (
                  <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-xl">
                    <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Users className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-semibold mb-1">
                        Company Size
                      </p>
                      <p className="text-gray-800 font-medium">
                        {selectedCompany.Size} employees
                      </p>
                    </div>
                  </div>
                )}

                {selectedCompany.Industry && (
                  <div className="flex items-start gap-3 p-4 bg-indigo-50 rounded-xl">
                    <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Building2 className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-semibold mb-1">
                        Industry
                      </p>
                      <p className="text-gray-800 font-medium">
                        {selectedCompany.Industry}
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
                    console.log("View jobs for:", selectedCompany.Company_Name);
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

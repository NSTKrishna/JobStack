import React, { useState } from "react";
import {
  Search,
  MapPin,
  ChevronDown,
  DollarSign,
  Briefcase,
} from "lucide-react";

const Job = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [selectedType, _setSelectedType] = useState("All Types");
  const [selectedSalary, _setSelectedSalary] = useState("All Salaries");
  const [remoteOnly, setRemoteOnly] = useState(false);

  // Filter states
  const [selectedExperience, setSelectedExperience] = useState([]);
  const [selectedCompanySize, setSelectedCompanySize] = useState([]);

  const experienceLevels = [
    "Entry Level",
    "Mid Level",
    "Senior Level",
    "Executive",
  ];
  const companySizes = [
    "Startup (1-50)",
    "Small (51-200)",
    "Medium (201-1000)",
    "Large (1000+)",
  ];

  // Sample job data
  const jobs = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      company: "TechCorp Inc.",
      type: "Full-time",
      remote: "Remote",
      description:
        "We're looking for a senior frontend developer to join our growing team...",
      skills: ["React", "TypeScript", "Next.js"],
      location: "San Francisco, CA",
      salary: "$120k - $160k",
      postedDate: "2 days ago",
    },
    {
      id: 2,
      title: "Full Stack Engineer",
      company: "StartupXYZ",
      type: "Full-time",
      remote: "Remote",
      description:
        "Join our innovative team building the next generation of web applications...",
      skills: ["Node.js", "React", "MongoDB"],
      location: "Austin, TX",
      salary: "$100k - $140k",
      postedDate: "1 day ago",
    },
    {
      id: 3,
      title: "Backend Developer",
      company: "DataSystems Ltd.",
      type: "Full-time",
      remote: "Hybrid",
      description:
        "Looking for an experienced backend developer to work on scalable systems...",
      skills: ["Python", "Django", "PostgreSQL"],
      location: "New York, NY",
      salary: "$110k - $150k",
      postedDate: "3 days ago",
    },
    {
      id: 4,
      title: "DevOps Engineer",
      company: "CloudTech Solutions",
      type: "Full-time",
      remote: "Remote",
      description:
        "Seeking a DevOps engineer to manage our cloud infrastructure...",
      skills: ["AWS", "Docker", "Kubernetes"],
      location: "Seattle, WA",
      salary: "$130k - $170k",
      postedDate: "5 days ago",
    },
    {
      id: 5,
      title: "UI/UX Designer",
      company: "DesignHub",
      type: "Full-time",
      remote: "Remote",
      description:
        "Creative UI/UX designer needed to craft beautiful user experiences...",
      skills: ["Figma", "Sketch", "Adobe XD"],
      location: "Los Angeles, CA",
      salary: "$90k - $120k",
      postedDate: "1 week ago",
    },
    {
      id: 6,
      title: "Product Manager",
      company: "InnovateCo",
      type: "Full-time",
      remote: "Hybrid",
      description:
        "Experienced product manager to lead our flagship product development...",
      skills: ["Agile", "Product Strategy", "Analytics"],
      location: "Boston, MA",
      salary: "$140k - $180k",
      postedDate: "4 days ago",
    },
  ];

  const toggleExperience = (level) => {
    setSelectedExperience((prev) =>
      prev.includes(level) ? prev.filter((l) => l !== level) : [...prev, level]
    );
  };

  const toggleCompanySize = (size) => {
    setSelectedCompanySize((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Find Your Next Job
          </h1>
          <p className="text-gray-600">
            Discover {jobs.length} opportunities that match your skills and
            interests
          </p>

          <div className="mt-6 flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Job title, keywords, or company"
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="w-64 relative">
              <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Location"
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
          </div>

          <div className="mt-4 flex gap-4">
            <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg flex items-center gap-2 hover:bg-gray-50">
              {selectedType}
              <ChevronDown className="w-4 h-4" />
            </button>
            <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg flex items-center gap-2 hover:bg-gray-50">
              {selectedSalary}
              <ChevronDown className="w-4 h-4" />
            </button>
            <button
              className={`px-4 py-2 border rounded-lg ${
                remoteOnly
                  ? "bg-blue-50 border-blue-500 text-blue-700"
                  : "bg-white border-gray-300"
              }`}
              onClick={() => setRemoteOnly(!remoteOnly)}
            >
              Remote Only
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-6">

          <div className="w-64 flex-shrink-0">
            <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">
                Refine Results
              </h2>

              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">
                  Experience Level
                </h3>
                <div className="space-y-2">
                  {experienceLevels.map((level) => (
                    <label
                      key={level}
                      className="flex items-center cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        checked={selectedExperience.includes(level)}
                        onChange={() => toggleExperience(level)}
                      />
                      <span className="ml-2 text-sm text-gray-700">
                        {level}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-3">
                  Company Size
                </h3>
                <div className="space-y-2">
                  {companySizes.map((size) => (
                    <label
                      key={size}
                      className="flex items-center cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        checked={selectedCompanySize.includes(size)}
                        onChange={() => toggleCompanySize(size)}
                      />
                      <span className="ml-2 text-sm text-gray-700">{size}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1">
            <div className="space-y-4">
              {jobs.map((job) => (
                <div
                  key={job.id}
                  className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="px-3 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-full">
                          {job.type}
                        </span>
                        {job.remote && (
                          <span className="px-3 py-1 bg-purple-50 text-purple-700 text-xs font-medium rounded-full">
                            {job.remote}
                          </span>
                        )}
                        <span className="text-sm text-gray-500 ml-auto flex items-center gap-1">
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          {job.postedDate}
                        </span>
                      </div>

                      <h3 className="text-xl font-semibold text-gray-900 mb-1">
                        {job.title}
                      </h3>

                      <div className="flex items-center gap-2 mb-3">
                        <Briefcase className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">{job.company}</span>
                      </div>

                      <p className="text-gray-600 mb-4">{job.description}</p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {job.skills.map((skill, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-md"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            <span>{job.location}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <DollarSign className="w-4 h-4" />
                            <span>{job.salary}</span>
                          </div>
                        </div>
                        <button className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors">
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Job;

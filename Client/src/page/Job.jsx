import React, { useState, useEffect } from "react";
import {
  Search,
  MapPin,
  DollarSign,
  Briefcase,
  X,
  Building2,
  Clock,
  CheckCircle2,
  Send,
} from "lucide-react";
import { jobAPI } from "../Api/api";
import { useJobStore, useAuthStore } from "../Api/store";
import { useApplyToJob } from "../Api/hooks";

const Job = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [error, setError] = useState(null);
  const [coverLetter, setCoverLetter] = useState("");

  // Auth state
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  // Apply to job hook
  const { handleApply, loading: applyLoading } = useApplyToJob();

  // Get jobs from store
  const jobs = useJobStore((state) => state.jobs);
  const setJobs = useJobStore((state) => state.setJobs);

  // Fetch jobs from API
  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await jobAPI.getAllJobs();
        console.log("Fetched jobs:", data);
        setJobs(data.jobs || data);
      } catch (err) {
        console.error("Failed to fetch jobs:", err);
        setError(err.response?.data?.message || "Failed to load jobs");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [setJobs]);

  // Filter jobs based on search query and location
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      !searchQuery ||
      job.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company?.name?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesLocation =
      !location || job.location?.toLowerCase().includes(location.toLowerCase());

    return matchesSearch && matchesLocation;
  });

  // Helper function to format date
  const formatDate = (dateString) => {
    if (!dateString) return "Recently posted";
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "1 day ago";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  };

  // Helper function to parse skills
  const parseSkills = (skills) => {
    if (Array.isArray(skills)) return skills;
    if (typeof skills === "string") {
      try {
        return JSON.parse(skills);
      } catch {
        return skills.split(",").map((s) => s.trim());
      }
    }
    return [];
  };

  // Helper function to parse requirements
  const parseRequirements = (requirements) => {
    if (Array.isArray(requirements)) return requirements;
    if (typeof requirements === "string") {
      try {
        return JSON.parse(requirements);
      } catch {
        return requirements.split("\n").filter((r) => r.trim());
      }
    }
    return [];
  };

  const handleJobClick = (job) => {
    setSelectedJob(job);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setTimeout(() => setSelectedJob(null), 300);
  };

  const handleApplyClick = () => {
    if (!isAuthenticated) {
      alert("Please login to apply for jobs");
      window.location.href = "/login";
      return;
    }
    setShowModal(false);
    setShowApplyModal(true);
  };

  const handleSubmitApplication = async (e) => {
    e.preventDefault();

    try {
      await handleApply(selectedJob.id, {
        coverLetter: coverLetter,
      });

      alert("Application submitted successfully!");
      setShowApplyModal(false);
      setCoverLetter("");
      setSelectedJob(null);
    } catch (err) {
      console.error("Application error:", err);
      alert(
        err.response?.data?.message ||
          "Failed to submit application. Please try again."
      );
    }
  };

  const closeApplyModal = () => {
    setShowApplyModal(false);
    setCoverLetter("");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading jobs...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-xl mb-4">⚠️ {error}</div>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Find Your Next Job
            </h1>
            <p className="text-gray-600">
              Discover {filteredJobs.length} opportunities that match your
              skills and interests
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
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex gap-6">
            <div className="flex-1">
              {filteredJobs.length === 0 ? (
                <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
                  <p className="text-gray-500 text-lg">
                    No jobs found matching your criteria.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredJobs.map((job) => (
                    <div
                      key={job.id}
                      className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer hover:border-blue-400"
                      onClick={() => handleJobClick(job)}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="px-3 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-full">
                              {job.jobType || job.type || "Full-time"}
                            </span>
                            {job.workMode && (
                              <span className="px-3 py-1 bg-purple-50 text-purple-700 text-xs font-medium rounded-full">
                                {job.workMode}
                              </span>
                            )}
                            <span className="text-sm text-gray-500 ml-auto flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {formatDate(job.createdAt)}
                            </span>
                          </div>

                          <h3 className="text-xl font-semibold text-gray-900 mb-1 hover:text-blue-600 transition-colors">
                            {job.title}
                          </h3>

                          <div className="flex items-center gap-2 mb-3">
                            <Briefcase className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-600">
                              {job.company?.name ||
                                job.company?.company ||
                                "Company"}
                            </span>
                          </div>

                          <p className="text-gray-600 mb-4 line-clamp-2">
                            {job.description}
                          </p>

                          {job.skills && parseSkills(job.skills).length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-4">
                              {parseSkills(job.skills)
                                .slice(0, 5)
                                .map((skill, index) => (
                                  <span
                                    key={index}
                                    className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-md"
                                  >
                                    {skill}
                                  </span>
                                ))}
                            </div>
                          )}

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                              <div className="flex items-center gap-1">
                                <MapPin className="w-4 h-4" />
                                <span>{job.location || "Remote"}</span>
                              </div>
                              {job.salary && (
                                <div className="flex items-center gap-1">
                                  <DollarSign className="w-4 h-4" />
                                  <span>{job.salary}</span>
                                </div>
                              )}
                            </div>
                            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                              View Details
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {showModal && selectedJob && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-slideUp"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8 rounded-t-2xl">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold rounded-full">
                      {selectedJob.jobType || selectedJob.type || "Full-time"}
                    </span>
                    {selectedJob.workMode && (
                      <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold rounded-full">
                        {selectedJob.workMode}
                      </span>
                    )}
                  </div>
                  <h2 className="text-3xl font-bold mb-2">
                    {selectedJob.title}
                  </h2>
                  <div className="flex items-center gap-4 text-blue-100">
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-5 h-5" />
                      <span className="font-medium">
                        {selectedJob.company?.name ||
                          selectedJob.company?.company ||
                          "Company"}
                      </span>
                    </div>
                    {selectedJob.department && (
                      <div className="flex items-center gap-2">
                        <Building2 className="w-5 h-5" />
                        <span>{selectedJob.department}</span>
                      </div>
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

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <MapPin className="w-4 h-4" />
                    <p className="text-xs text-blue-100 uppercase font-semibold">
                      Location
                    </p>
                  </div>
                  <p className="text-white font-medium">
                    {selectedJob.location || "Remote"}
                  </p>
                </div>
                {selectedJob.salary && (
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <DollarSign className="w-4 h-4" />
                      <p className="text-xs text-blue-100 uppercase font-semibold">
                        Salary Range
                      </p>
                    </div>
                    <p className="text-white font-medium">
                      {selectedJob.salary}
                    </p>
                  </div>
                )}
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <Clock className="w-4 h-4" />
                    <p className="text-xs text-blue-100 uppercase font-semibold">
                      Job Type
                    </p>
                  </div>
                  <p className="text-white font-medium">
                    {selectedJob.jobType || selectedJob.type || "Full-time"}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-8">
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-4 text-gray-900 flex items-center gap-2">
                  <Briefcase className="w-6 h-6 text-blue-600" />
                  Job Description
                </h3>
                <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-line">
                  {selectedJob.fullDescription || selectedJob.description}
                </p>
              </div>

              {selectedJob.requirements &&
                parseRequirements(selectedJob.requirements).length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold mb-4 text-gray-900 flex items-center gap-2">
                      <CheckCircle2 className="w-6 h-6 text-blue-600" />
                      Requirements
                    </h3>
                    <ul className="space-y-3">
                      {parseRequirements(selectedJob.requirements).map(
                        (req, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-3 text-gray-700"
                          >
                            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                              <CheckCircle2 className="w-4 h-4 text-blue-600" />
                            </div>
                            <span className="text-base">{req}</span>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                )}

              {selectedJob.responsibilities &&
                parseRequirements(selectedJob.responsibilities).length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold mb-4 text-gray-900 flex items-center gap-2">
                      <Building2 className="w-6 h-6 text-blue-600" />
                      Responsibilities
                    </h3>
                    <ul className="space-y-3">
                      {parseRequirements(selectedJob.responsibilities).map(
                        (resp, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-3 text-gray-700"
                          >
                            <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                              <CheckCircle2 className="w-4 h-4 text-purple-600" />
                            </div>
                            <span className="text-base">{resp}</span>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                )}

              {selectedJob.skills &&
                parseSkills(selectedJob.skills).length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold mb-4 text-gray-900">
                      Required Skills
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {parseSkills(selectedJob.skills).map((skill, index) => (
                        <span
                          key={index}
                          className="px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 font-medium rounded-lg border border-blue-200"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

              <div className="flex gap-4 pt-6 border-t border-gray-200">
                <button
                  onClick={handleApplyClick}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-blue-800 text-white py-4 px-6 rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-blue-200 transition-all"
                >
                  Apply Now
                </button>
                <button className="px-6 py-4 bg-white border-2 border-blue-600 text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-all">
                  Save Job
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showApplyModal && selectedJob && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn"
          onClick={closeApplyModal}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl animate-slideUp"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-1">Apply for Job</h2>
                  <p className="text-blue-100">{selectedJob.title}</p>
                </div>
                <button
                  onClick={closeApplyModal}
                  className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmitApplication} className="p-6">
              <div className="mb-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                  <div className="flex items-start gap-3">
                    <Briefcase className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">
                        Applying as:
                      </p>
                      <p className="text-base font-semibold text-gray-900">
                        {user?.name || user?.email}
                      </p>
                      {user?.cvUrl && (
                        <p className="text-xs text-green-600 mt-1">
                          ✓ CV attached from profile
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <label
                  htmlFor="coverLetter"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Cover Letter{" "}
                  <span className="text-gray-400 font-normal">(Optional)</span>
                </label>
                <textarea
                  id="coverLetter"
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  rows={8}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  placeholder="Introduce yourself and explain why you're a great fit for this position..."
                />
                <p className="text-xs text-gray-500 mt-2">
                  {coverLetter.length} characters
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={applyLoading}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-blue-800 text-white py-3 px-6 rounded-xl font-bold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {applyLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Submit Application
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={closeApplyModal}
                  disabled={applyLoading}
                  className="px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all disabled:opacity-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default Job;

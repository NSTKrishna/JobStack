import React, { useState, useEffect } from "react";
import { Search, MapPin, Briefcase } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { jobAPI } from "../Api/api";
import { useJobStore, useAuthStore } from "../Api/store";
import { useApplyToJob } from "../Api/hooks";
import JobCard from "../components/JobCard";
import JobDetailModal from "../components/JobDetailModal";
import ApplyModal from "../components/ApplyModal";
import { Skeleton } from "../components/ui/Skeleton";
import { useLocation } from "react-router-dom";

const Job = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [error, setError] = useState(null);

  const { search } = useLocation();

  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const { handleApply, loading: applyLoading } = useApplyToJob();

  const jobs = useJobStore((state) => state.jobs);
  const setJobs = useJobStore((state) => state.setJobs);

  useEffect(() => {
    const params = new URLSearchParams(search);
    const query = params.get("search");
    if (query) {
      setSearchQuery(query);
    }
  }, [search]);

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

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      !searchQuery ||
      job.jobTitle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.jobDescription?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.department?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company?.company?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesLocation =
      !location || job.location?.toLowerCase().includes(location.toLowerCase());

    return matchesSearch && matchesLocation;
  });

  const handleJobClick = (job) => {
    setSelectedJob(job);
  };

  const handleApplyClick = () => {
    if (!isAuthenticated) {
      alert("Please login to apply for jobs");
      window.location.href = "/login";
      return;
    }

    setShowApplyModal(true);
  };

  const handleSubmitApplication = async (e, coverLetter) => {
    e.preventDefault();

    try {
      await handleApply(selectedJob.id, {
        coverLetter: coverLetter,
      });

      alert("Application submitted successfully!");
      setShowApplyModal(false);
      setSelectedJob(null);
    } catch (err) {
      console.error("Application error:", err);
      alert(
        err.response?.data?.message ||
        "Failed to submit application. Please try again."
      );
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4 bg-red-50 px-6 py-4 rounded-xl border border-red-100">
            {error}
          </div>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans">

      <div className="bg-white border-b border-gray-100 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-6 md:py-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2 tracking-tight">
            Find Your Next <span className="text-blue-600">Dream Job</span>
          </h1>
          <p className="text-gray-500 mb-8 max-w-2xl text-lg">
            Discover opportunities that match your skills and execute your potential.
          </p>

          <div className="flex flex-col md:flex-row gap-4 p-2 bg-white md:bg-gray-50 md:border md:border-gray-200 md:rounded-2xl">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Job title, keywords, or company"
                className="w-full pl-12 pr-4 py-3 md:py-4 bg-gray-50 md:bg-transparent border border-gray-200 md:border-none rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 md:focus:ring-0 text-gray-700 placeholder-gray-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="hidden md:block w-px bg-gray-300 my-2"></div>
            <div className="w-full md:w-72 relative">
              <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Location"
                className="w-full pl-12 pr-4 py-3 md:py-4 bg-gray-50 md:bg-transparent border border-gray-200 md:border-none rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 md:focus:ring-0 text-gray-700 placeholder-gray-400"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <button className="hidden md:flex items-center px-8 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200">
              Search
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800">
            {loading ? (
              <span className="w-32 h-6 bg-gray-200 rounded animate-pulse inline-block"></span>
            ) : (
              `Latest Opportunities (${filteredJobs.length})`
            )}
          </h2>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
                <Skeleton className="h-4 w-24 mb-4 rounded-full" />
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2 mb-6" />
                <div className="flex gap-4 mb-6 text-gray-300">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-16" />
                </div>
                <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-50">
                  <Skeleton className="h-8 w-20 rounded-md" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredJobs.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl border border-gray-100 p-16 text-center shadow-sm"
          >
            <div className="w-24 h-24 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No Jobs Found</h3>
            <p className="text-gray-500 max-w-md mx-auto">
              We couldn't find any jobs matching your criteria. Try adjusting your search filters.
            </p>
            <button
              onClick={() => { setSearchQuery(""); setLocation(""); }}
              className="mt-6 text-blue-600 font-semibold hover:text-blue-700"
            >
              Clear Filters
            </button>
          </motion.div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence>
              {filteredJobs.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  onClick={handleJobClick}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {selectedJob && !showApplyModal && (
          <JobDetailModal
            job={selectedJob}
            onClose={() => setSelectedJob(null)}
            onApply={handleApplyClick}
          />
        )}

        {showApplyModal && selectedJob && (
          <ApplyModal
            job={selectedJob}
            user={user}
            onClose={() => setShowApplyModal(false)}
            onSubmit={handleSubmitApplication}
            loading={applyLoading}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Job;

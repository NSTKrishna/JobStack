import React from "react";
import {
  X,
  MapPin,
  DollarSign,
  Clock,
  Briefcase,
  Building2,
  CheckCircle2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const JobDetailModal = ({ job, onClose, onApply }) => {
  if (!job) return null;
  
  const jobRequirements = job.requirements.split(',');
  
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
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ y: 50, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 20, opacity: 0, scale: 0.95 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-white shrink-0">
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors backdrop-blur-sm"
            >
              <X className="w-5 h-5 text-white" />
            </button>

            <div className="flex flex-col md:flex-row justify-between items-start gap-6">
              <div className="flex-1">
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-semibold border border-white/10">
                    {job.jobType || "Full-time"}
                  </span>
                  {job.department && (
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-semibold border border-white/10">
                      {job.department}
                    </span>
                  )}
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-2 tracking-tight">
                  {job.jobTitle || job.title || "Untitled Job"}
                </h2>
                <div className="flex items-center gap-2 text-blue-100 font-medium text-lg">
                  <Building2 className="w-5 h-5 opacity-80" />
                  <span>{job.company?.company || "Company"}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/10">
                <div className="flex items-center gap-2 text-blue-100 text-xs font-bold uppercase tracking-wider mb-1">
                  <MapPin className="w-3 h-3" /> Location
                </div>
                <div className="font-semibold text-sm">
                  {job.location || "Remote"}
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/10">
                <div className="flex items-center gap-2 text-blue-100 text-xs font-bold uppercase tracking-wider mb-1">
                  <DollarSign className="w-3 h-3" /> Salary
                </div>
                <div className="font-semibold text-sm">
                  {job.salaryRange || "Negotiable"}
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/10">
                <div className="flex items-center gap-2 text-blue-100 text-xs font-bold uppercase tracking-wider mb-1">
                  <Clock className="w-3 h-3" /> Posted
                </div>
                <div className="font-semibold text-sm">Recently</div>
              </div>
            </div>
          </div>

          <div className="overflow-y-auto p-8 bg-gray-50 flex-1">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2 space-y-8">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-blue-600" />
                    Job Description
                  </h3>
                  <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                    {job.jobDescription ||
                      job.description ||
                      job.fullDescription}
                  </p>
                </div>
              </div>

              <div className="md:col-span-1">
                <div className="bg-white p-6 rounded-xl border border-gray-200 sticky top-0">
                  <h4 className="font-bold text-gray-900 mb-4">
                    Required Skills
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {jobRequirements &&
                      parseSkills(jobRequirements).map((skill, i) => (
                        <span
                          key={i}
                          className="bg-blue-50 text-blue-700 text-xs px-3 py-1.5 rounded-lg font-medium border border-blue-100"
                        >
                          {skill}
                        </span>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 bg-white border-t border-gray-100 flex justify-end gap-3 shrink-0">
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onApply}
              className="px-8 py-2.5 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-200 transition-all transform hover:-translate-y-0.5"
            >
              Apply Now
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default JobDetailModal;

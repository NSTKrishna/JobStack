import React from "react";
import { MapPin, DollarSign, Clock } from "lucide-react";
import { motion } from "framer-motion";

const JobCard = ({ job, onClick }) => {
    const formatDate = (dateString) => {
        if (!dateString) return "Recently";
        const date = new Date(dateString);
        const now = new Date();
        const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return "Today";
        if (diffDays === 1) return "1 day ago";
        if (diffDays < 7) return `${diffDays} days ago`;
        if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
        return `${Math.floor(diffDays / 30)} months ago`;
    };

    const parseSkills = (skills) => {
        if (Array.isArray(skills)) return skills;
        if (!skills) return [];
        if (typeof skills === "string") {
            try {
                return JSON.parse(skills);
            } catch {
                return skills.split(",").map((s) => s.trim());
            }
        }
        return [];
    };

    const skills = parseSkills(job.skills).slice(0, 3);
    const jobType = job.jobType;
    const experience = job.experience;

    return (
        <motion.div
            layout
            whileHover={{ y: -4, boxShadow: "0 12px 24px rgba(0,0,0,0.08)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="group bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:border-blue-200 cursor-pointer flex flex-col justify-between h-full transition-all"
            onClick={() => onClick(job)}
        >

            <div className="mb-4">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-gray-900 leading-tight group-hover:text-blue-600 transition-colors line-clamp-2">
                        {job.jobTitle || job.title}
                    </h3>
                </div>

                <div className="text-gray-500 font-medium mb-4">
                    {job.company?.company || "Company"}
                </div>

                <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4 text-blue-500" />
                        <span>{job.location || "Remote"}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-blue-500" />
                        <span>{experience || formatDate(job.createdAt)}</span>
                    </div>

                    <span className="px-3 py-1 bg-green-50 text-green-700 text-xs font-bold rounded-lg border border-green-100">
                        {jobType}
                    </span>
                </div>

                <div className="text-gray-900 font-extrabold text-lg mb-4">
                    ₹ {job.salaryRange}
                </div>
            </div>

            <div className="mt-auto">
                <div className="flex flex-wrap gap-2">
                    {skills.length > 0 ? (
                        skills.map((skill, index) => (
                            <span key={index} className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-semibold rounded-full hover:bg-blue-100 transition-colors">
                                {skill}
                            </span>
                        ))
                    ) : (
                        <span className="px-3 py-1 bg-gray-50 text-gray-400 text-xs font-semibold rounded-full">
                            View details
                        </span>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default JobCard;

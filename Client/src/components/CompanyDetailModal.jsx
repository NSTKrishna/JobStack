import React from "react";
import { X, MapPin, Users, Globe, Building2, Briefcase, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const CompanyDetailModal = ({ company, onClose, getColorForIndex, getIconForIndustry, companyIndex }) => {
    const navigate = useNavigate();

    if (!company) return null;

    const name = company.companyName || company.name || company.Company_Name || "Unnamed Company";
    const description = company.description || company.Description || "No description available.";
    const industry = company.industry || "General";
    const location = company.location || "Remote";
    const size = company.size;
    const website = company.website;

    const handleViewJobs = () => {
        navigate(`/Job_page?search=${encodeURIComponent(name)}`);
        onClose();
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
                    className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="relative h-48 bg-gradient-to-r from-gray-900 to-blue-900 overflow-hidden rounded-t-2xl">
                        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full transition-colors backdrop-blur-sm z-10"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="px-8 pb-8 relative">
                        <div className="flex flex-col md:flex-row items-start gap-6 -mt-12 mb-6">
                            <div
                                className={`w-24 h-24 ${getColorForIndex(
                                    companyIndex
                                )} rounded-2xl flex items-center justify-center text-4xl shadow-xl border-4 border-white relative z-10`}
                            >
                                {getIconForIndustry(industry)}
                            </div>
                            <div className="pt-14 md:pt-12 flex-1">
                                <h2 className="text-3xl font-bold text-gray-900 mb-1">
                                    {name}
                                </h2>
                                <div className="flex items-center gap-2 text-blue-600 font-medium">
                                    <Building2 className="w-4 h-4" />
                                    <span>{industry}</span>
                                </div>
                            </div>
                            <div className="pt-15 hidden md:flex gap-3">
                                {website && (
                                    <a
                                        href={website}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors flex items-center gap-2"
                                    >
                                        <Globe className="w-4 h-4" />
                                        Website
                                    </a>
                                )}
                            </div>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="md:col-span-2 space-y-8">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">About Us</h3>
                                    <p className="text-gray-600 leading-relaxed text-lg">
                                        {description}
                                    </p>
                                </div>
                            </div>

                            <div className="md:col-span-1 space-y-4">
                                <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                                    <h4 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wider">Company Info</h4>
                                    <div className="space-y-4">
                                        <div className="flex items-start gap-3">
                                            <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                                            <div>
                                                <p className="text-xs text-gray-500 font-medium">Headquarters</p>
                                                <p className="text-sm font-semibold text-gray-900">{location}</p>
                                            </div>
                                        </div>
                                        {size && (
                                            <div className="flex items-start gap-3">
                                                <Users className="w-5 h-5 text-gray-400 mt-0.5" />
                                                <div>
                                                    <p className="text-xs text-gray-500 font-medium">Size</p>
                                                    <p className="text-sm font-semibold text-gray-900">{size} employees</p>
                                                </div>
                                            </div>
                                        )}
                                        {website && (
                                            <div className="flex items-start gap-3">
                                                <Globe className="w-5 h-5 text-gray-400 mt-0.5" />
                                                <div className="overflow-hidden">
                                                    <p className="text-xs text-gray-500 font-medium">Website</p>
                                                    <a
                                                        href={website}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="text-sm font-semibold text-blue-600 hover:underline truncate block"
                                                    >
                                                        {website.replace(/^https?:\/\//, '')}
                                                    </a>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col md:flex-row gap-4 items-center justify-between">
                            <p className="text-gray-500 text-sm">
                                Interested in working with us? Check out our open positions.
                            </p>
                            <button
                                className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-bold hover:shadow-lg transition-all flex items-center justify-center gap-2"
                                onClick={handleViewJobs}
                            >
                                <Briefcase className="w-5 h-5" />
                                View Open Positions
                            </button>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default CompanyDetailModal;

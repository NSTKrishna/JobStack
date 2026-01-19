import React, { useState } from "react";
import { X, Send, Briefcase, FileText, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ApplyModal = ({ job, user, onClose, onSubmit, loading }) => {
    const [coverLetter, setCoverLetter] = useState("");
    const [success, setSuccess] = useState(false);

    if (!job) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        await onSubmit(e, coverLetter);
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
                    initial={{ y: 20, opacity: 0, scale: 0.95 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    exit={{ y: 20, opacity: 0, scale: 0.95 }}
                    className="bg-white rounded-2xl max-w-xl w-full shadow-2xl overflow-hidden"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 flex justify-between items-center text-white">
                        <div>
                            <h2 className="text-2xl font-bold">Apply Now</h2>
                            <p className="text-blue-100 text-sm mt-1">{job.title}</p>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 rounded-full hover:bg-white/20 transition-colors"
                        >
                            <X className="w-5 h-5 text-white" />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="p-6 bg-gray-50">

                        <div className="bg-white p-4 rounded-xl border border-gray-200 mb-6 shadow-sm">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xl">
                                    {user?.name?.[0] || user?.email?.[0] || "U"}
                                </div>
                                <div>
                                    <p className="font-bold text-gray-900">{user?.name || "Applicant"}</p>
                                    <p className="text-sm text-gray-500">{user?.email}</p>
                                </div>
                            </div>
                            {user?.cvUrl && (
                                <div className="mt-3 flex items-center gap-2 text-green-600 text-sm font-medium bg-green-50 px-3 py-2 rounded-lg border border-green-100">
                                    <CheckCircle2 className="w-4 h-4" />
                                    CV Attached from Profile
                                </div>
                            )}
                        </div>

                        <div className="mb-6">
                            <label
                                htmlFor="coverLetter"
                                className="block text-sm font-bold text-gray-700 mb-2 flex justify-between"
                            >
                                <span>Cover Letter</span>
                                <span className="font-normal text-gray-400">Optional</span>
                            </label>
                            <div className="relative">
                                <textarea
                                    id="coverLetter"
                                    value={coverLetter}
                                    onChange={(e) => setCoverLetter(e.target.value)}
                                    rows={6}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none bg-white transition-all shadow-sm"
                                    placeholder="Tell us why you are the perfect fit for this role..."
                                />
                                <div className="absolute bottom-3 right-3 text-xs text-gray-400">
                                    {coverLetter.length} chars
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-3 pt-2">
                            <button
                                type="button"
                                onClick={onClose}
                                disabled={loading}
                                className="flex-1 px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition-colors disabled:opacity-50"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex-[2] bg-blue-600 text-white py-3 px-6 rounded-xl font-bold hover:bg-blue-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-200 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        <Send className="w-5 h-5" />
                                        Submit Application
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default ApplyModal;

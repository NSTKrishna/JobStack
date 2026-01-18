import { useState, useEffect } from "react";
import {
  FolderClosed,
  User,
  Mail,
  Phone,
  FileText,
  Clock,
  Briefcase,
  CheckCircle,
  XCircle,
  Download,
  ExternalLink,
} from "lucide-react";
import { applicationAPI } from "../Api/api";

function CompanyApplication() {
  const [loading, setLoading] = useState(true);
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState(null);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    const loadApplications = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await applicationAPI.getAllCompanyApplications();
        console.log("Fetched applications:", data);
        setApplications(data.applications || data);
      } catch (err) {
        console.error("Failed to fetch applications:", err);
        setError(err.response?.data?.message || "Failed to load applications");
      } finally {
        setLoading(false);
      }
    };

    loadApplications();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "Recently";
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString();
  };

  const getStatusColor = (status) => {
    switch (status?.toUpperCase()) {
      case "HIRED":
      case "SHORTLISTED":
        return "bg-green-100 text-green-700 border-green-200";
      case "REJECTED":
        return "bg-red-100 text-red-700 border-red-200";
      case "PENDING":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      default:
        return "bg-blue-100 text-blue-700 border-blue-200";
    }
  };

  const handleStatusUpdate = async (applicationId, newStatus) => {
    try {
      await applicationAPI.updateApplicationStatus(applicationId, newStatus);
      setApplications(
        applications.map((app) =>
          app.id === applicationId ? { ...app, status: newStatus } : app,
        ),
      );
      alert(`Application ${newStatus.toLowerCase()} successfully!`);
    } catch (err) {
      console.error("Failed to update status:", err);
      alert(
        err.response?.data?.message || "Failed to update application status",
      );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading applications...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Applications
          </h1>
          <p className="text-gray-500 text-lg">
            Review and manage candidate applications ({applications.length}{" "}
            total)
          </p>
        </div>

        {applications.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-20">
            <div className="flex flex-col items-center justify-center text-center">
              <FolderClosed className="w-24 h-24 text-gray-400" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                No Applications Received
              </h2>
              <p className="text-gray-500 text-base">
                Applications from candidates will appear here once they start
                applying to your job postings.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {applications.map((application) => (
              <div
                key={application.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span
                          className={`px-3 py-1 text-xs font-semibold rounded-full border ${getStatusColor(
                            application.status,
                          )}`}
                        >
                          {application.status || "Pending"}
                        </span>
                        <span className="text-sm text-gray-500 flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          Applied{" "}
                          {formatDate(
                            application.appliedAt || application.createdAt,
                          )}
                        </span>
                      </div>

                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                          <User className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">
                            {application.user?.name || "Candidate"}
                          </h3>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <Mail className="w-4 h-4" />
                              <span>{application.user?.email}</span>
                            </div>
                            {application.user?.phone && (
                              <div className="flex items-center gap-1">
                                <Phone className="w-4 h-4" />
                                <span>{application.user.phone}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                        <Briefcase className="w-4 h-4" />
                        <span className="font-medium">Applied for:</span>
                        <span className="font-semibold text-gray-900">
                          {application.job?.jobTitle ||
                            application.job?.title ||
                            "Job Position"}
                        </span>
                      </div>

                      {application.coverLetter && (
                        <div className="mt-3">
                          <button
                            onClick={() =>
                              setExpandedId(
                                expandedId === application.id
                                  ? null
                                  : application.id,
                              )
                            }
                            className="text-blue-600 text-sm font-medium hover:text-blue-700 flex items-center gap-1"
                          >
                            <FileText className="w-4 h-4" />
                            {expandedId === application.id
                              ? "Hide"
                              : "View"}{" "}
                            Cover Letter
                          </button>
                          {expandedId === application.id && (
                            <div className="mt-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                              <p className="text-sm text-gray-700 whitespace-pre-line">
                                {application.coverLetter}
                              </p>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Resume Section */}
                      {application.user?.document &&
                        application.user.document.length > 0 && (
                          <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <FileText className="w-5 h-5 text-blue-600" />
                                <div>
                                  <p className="text-sm font-semibold text-gray-900">
                                    {application.user.document[0].fileName ||
                                      "Resume"}
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    Uploaded{" "}
                                    {new Date(
                                      application.user.document[0].uploadedAt,
                                    ).toLocaleDateString()}
                                  </p>
                                </div>
                              </div>
                              <a
                                href={application.user.document[0].fileUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-3 py-1.5 bg-blue-600 text-white rounded-md text-xs font-semibold hover:bg-blue-700 transition-colors flex items-center gap-1"
                              >
                                View Resume
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            </div>
                          </div>
                        )}
                    </div>

                    <div className="flex flex-col gap-2 ml-4">
                      {application.user?.cvUrl && (
                        <a
                          href={application.user.cvUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors text-center"
                        >
                          View CV
                        </a>
                      )}

                      {/* Action Buttons */}
                      {application.status?.toUpperCase() === "PENDING" && (
                        <>
                          <button
                            onClick={() =>
                              handleStatusUpdate(application.id, "SHORTLISTED")
                            }
                            className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-semibold hover:bg-green-700 transition-colors flex items-center gap-2 justify-center"
                          >
                            <CheckCircle className="w-4 h-4" />
                            Shortlist
                          </button>
                          <button
                            onClick={() =>
                              handleStatusUpdate(application.id, "REJECTED")
                            }
                            className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-semibold hover:bg-red-700 transition-colors flex items-center gap-2 justify-center"
                          >
                            <XCircle className="w-4 h-4" />
                            Reject
                          </button>
                        </>
                      )}

                      {/* Additional actions for Shortlisted candidates */}
                      {application.status?.toUpperCase() === "SHORTLISTED" && (
                        <button
                          onClick={() =>
                            handleStatusUpdate(application.id, "HIRED")
                          }
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2 justify-center"
                        >
                          <CheckCircle className="w-4 h-4" />
                          Hire
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
export default CompanyApplication;

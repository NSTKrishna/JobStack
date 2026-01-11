import { useState, useEffect } from "react";
import {
  FolderClosed,
  Briefcase,
  MapPin,
  Clock,
  Building2,
  FileText,
} from "lucide-react";
import { useFetchApplications } from "../../../Api/hooks";
import { useApplicationStore } from "../../../Api/store";

function MyApplications() {
  const [loading, setLoading] = useState(true);
  const { fetchApplications } = useFetchApplications();
  const applications = useApplicationStore((state) => state.applications);

  useEffect(() => {
    const loadApplications = async () => {
      setLoading(true);
      try {
        await fetchApplications();
      } catch (err) {
        console.error("Failed to fetch applications:", err);
      } finally {
        setLoading(false);
      }
    };

    loadApplications();
  }, [fetchApplications]);

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
    switch (status?.toLowerCase()) {
      case "accepted":
        return "bg-green-100 text-green-700 border-green-200";
      case "rejected":
        return "bg-red-100 text-red-700 border-red-200";
      case "pending":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      default:
        return "bg-blue-100 text-blue-700 border-blue-200";
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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            My Applications
          </h1>
          <p className="text-gray-500 text-lg">
            Track all your job applications in one place ({applications.length}{" "}
            total)
          </p>
        </div>

        {applications.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-20">
            <div className="flex flex-col items-center justify-center text-center">
              <div className="mb-6">
                <FolderClosed className="w-24 h-24 text-gray-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                No Applications Yet
              </h2>
              <p className="text-gray-500 text-base mb-6">
                Start applying to jobs and track your applications here.
              </p>
              <a
                href="/jobs"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Browse Jobs
              </a>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {applications.map((application) => (
              <div
                key={application.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span
                        className={`px-3 py-1 text-xs font-semibold rounded-full border ${getStatusColor(
                          application.status
                        )}`}
                      >
                        {application.status || "Pending"}
                      </span>
                      <span className="text-sm text-gray-500 flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        Applied {formatDate(application.createdAt)}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {application.job?.title || "Job Position"}
                    </h3>

                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                      <div className="flex items-center gap-1">
                        <Building2 className="w-4 h-4" />
                        <span>
                          {application.job?.company?.name ||
                            application.job?.company?.company ||
                            "Company"}
                        </span>
                      </div>
                      {application.job?.location && (
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{application.job.location}</span>
                        </div>
                      )}
                      {application.job?.jobType && (
                        <div className="flex items-center gap-1">
                          <Briefcase className="w-4 h-4" />
                          <span>{application.job.jobType}</span>
                        </div>
                      )}
                    </div>

                    {application.coverLetter && (
                      <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-start gap-2">
                          <FileText className="w-4 h-4 text-gray-400 mt-0.5" />
                          <div className="flex-1">
                            <p className="text-xs font-semibold text-gray-700 mb-1">
                              Cover Letter
                            </p>
                            <p className="text-sm text-gray-600 line-clamp-2">
                              {application.coverLetter}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
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

export default MyApplications;

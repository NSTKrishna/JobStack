import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useFetchCompanyOverview } from "../Api/hooks";
import { Briefcase, Users, Calendar, TrendingUp } from "lucide-react";

function CompanyDash() {
  const { fetchOverview, overview, loading } = useFetchCompanyOverview();

  useEffect(() => {
    fetchOverview();
  }, [fetchOverview]);

  const stats = {
    activeJobs: overview?.Active_jobs || 0,
    totalApplications: overview?.Active_applications_count || 0,
    thisMonth: overview?.monthly_applications || 0,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Dashboard Overview
          </h1>
          <p className="text-gray-600">
            Welcome back! Here's what's happening with your job postings.
          </p>
        </div>

        {/* Stats Cards */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 animate-pulse"
              >
                <div className="h-4 bg-gray-200 rounded w-24 mb-4"></div>
                <div className="h-10 bg-gray-200 rounded w-16 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-32"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Active Jobs Card */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-600">
                  Active Jobs
                </h3>
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Briefcase className="w-5 h-5 text-blue-600" />
                </div>
              </div>
              <p className="text-4xl font-bold text-gray-900 mb-1">
                {stats.activeJobs}
              </p>
              <p className="text-sm text-gray-500">Currently posted</p>
              <Link
                to="/CompanyDashboard/job-postings"
                className="text-sm text-blue-600 hover:text-blue-700 font-medium mt-3 inline-block"
              >
                View all jobs →
              </Link>
            </div>

            {/* Total Applications Card */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-600">
                  Total Applications
                </h3>
                <div className="p-2 bg-green-50 rounded-lg">
                  <Users className="w-5 h-5 text-green-600" />
                </div>
              </div>
              <p className="text-4xl font-bold text-gray-900 mb-1">
                {stats.totalApplications}
              </p>
              <p className="text-sm text-gray-500">Across all positions</p>
              <Link
                to="/CompanyDashboard/applications"
                className="text-sm text-green-600 hover:text-green-700 font-medium mt-3 inline-block"
              >
                View applications →
              </Link>
            </div>

            {/* This Month Card */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-600">
                  This Month
                </h3>
                <div className="p-2 bg-purple-50 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-purple-600" />
                </div>
              </div>
              <p className="text-4xl font-bold text-gray-900 mb-1">
                {stats.thisMonth}
              </p>
              <p className="text-sm text-gray-500">New applications</p>
              <div className="flex items-center gap-1 mt-3">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-500">
                  {new Date().toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Link
            to="/CompanyDashboard/job-postings"
            className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg shadow-sm p-6 hover:shadow-md transition-all group"
          >
            <div className="flex items-center justify-between text-white">
              <div>
                <h3 className="text-lg font-semibold mb-1">Post a New Job</h3>
                <p className="text-blue-100 text-sm">
                  Create and publish job openings
                </p>
              </div>
              <Briefcase className="w-8 h-8 text-blue-200 group-hover:scale-110 transition-transform" />
            </div>
          </Link>

          <Link
            to="/CompanyDashboard/company-profile"
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all group"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  Update Profile
                </h3>
                <p className="text-gray-600 text-sm">
                  Manage company information
                </p>
              </div>
              <Users className="w-8 h-8 text-gray-400 group-hover:text-gray-600 group-hover:scale-110 transition-all" />
            </div>
          </Link>
        </div>

        {/* Recent Activity Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-1">
              Recent Activity
            </h2>
            <p className="text-sm text-gray-500">
              Latest applications and job posting activity
            </p>
          </div>

          {/* Empty State */}
          {stats.totalApplications === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="mb-4">
                <svg
                  className="w-16 h-16 text-gray-300 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <p className="text-gray-600 text-base mb-4">
                No recent activity. Applications will appear here once
                candidates start applying.
              </p>
              <Link
                to="/CompanyDashboard/job-postings"
                className="bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium"
              >
                Post Your First Job
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-gray-600">
                You have{" "}
                <span className="font-semibold text-gray-900">
                  {stats.totalApplications}
                </span>{" "}
                total applications.
              </p>
              <Link
                to="/CompanyDashboard/applications"
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
              >
                View all applications
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
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CompanyDash;

import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useFetchCompanyOverview } from "../Api/hooks";
import { Briefcase, Users, Calendar, TrendingUp } from "lucide-react";
import { StatCard } from "../components/dashboard/StatCard";

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
    <div className="space-y-6">

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Overview</h1>
        <p className="text-gray-600">
          Welcome back! Here's what's happening with your job postings.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard
          title="Active Jobs"
          value={loading ? "..." : stats.activeJobs}
          icon={<Briefcase className="w-6 h-6" />}
          color="blue"
          subtext="Currently posted"
        />
        <StatCard
          title="Total Applications"
          value={loading ? "..." : stats.totalApplications}
          icon={<Users className="w-6 h-6" />}
          color="green"
          subtext="Across all positions"
        />
        <StatCard
          title="This Month"
          value={loading ? "..." : stats.thisMonth}
          icon={<TrendingUp className="w-6 h-6" />}
          color="purple"
          subtext="New applications"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Link
          to="/CompanyDashboard/job-postings"
          className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white shadow-lg hover:shadow-xl transition-all group"
        >
          <div className="relative z-10">
            <h3 className="text-xl font-bold mb-2">Post a New Job</h3>
            <p className="text-blue-100 mb-6 max-w-xs">
              Create a new job listing to attract top talent for your company.
            </p>
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg text-sm font-medium group-hover:bg-white/20 transition-colors">
              Get Started <Briefcase size={16} />
            </div>
          </div>
          <Briefcase className="absolute right-[-20px] bottom-[-20px] w-40 h-40 text-white/10 group-hover:scale-110 transition-transform duration-500" />
        </Link>

        <Link
          to="/CompanyDashboard/company-profile"
          className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-all group flex flex-col justify-center"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-gray-50 rounded-xl group-hover:bg-gray-100 transition-colors">
              <Users className="w-8 h-8 text-gray-600" />
            </div>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Update Profile</h3>
          <p className="text-gray-500">Manage your company information, logo, and details.</p>
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-1">Recent Activity</h2>
            <p className="text-sm text-gray-500">Latest applications and job posting activity</p>
          </div>
        </div>

        {stats.totalApplications === 0 && !loading ? (
          <div className="flex flex-col items-center justify-center py-12 text-center bg-gray-50 rounded-xl border border-dashed border-gray-200">
            <div className="p-4 bg-white rounded-full shadow-sm mb-4">
              <Briefcase className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-gray-900 font-medium mb-1">No activity yet</h3>
            <p className="text-gray-500 text-sm mb-4">
              Applications will appear here once candidates start applying.
            </p>
            <Link
              to="/CompanyDashboard/job-postings"
              className="text-blue-600 font-medium hover:underline text-sm"
            >
              Post Your First Job
            </Link>
          </div>
        ) : (
          <div className="space-y-4">

            <div className="p-4 bg-blue-50 text-blue-800 rounded-lg flex items-center justify-between">
              <div>
                <p className="font-semibold">Application Summary</p>
                <p className="text-sm opacity-80">You have {stats.totalApplications} total applications.</p>
              </div>
              <Link to="/CompanyDashboard/applications" className="text-sm font-medium bg-white px-4 py-2 rounded-md shadow-sm border border-blue-100 hover:shadow-md transition-all">
                View All
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CompanyDash;

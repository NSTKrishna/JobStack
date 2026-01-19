import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FolderClosed, Heart, Eye, Video, Briefcase, FileText } from 'lucide-react';
import { useFetchApplications } from '../Api/hooks';
import { useApplicationStore } from '../Api/store';
import { StatCard } from '../components/dashboard/StatCard';

function StudentDash() {
  const { fetchApplications, loading } = useFetchApplications();
  const applications = useApplicationStore((state) => state.applications);

  useEffect(() => {
    fetchApplications();
  }, []);

  const totalApplications = applications.length;
  const interviews = applications.filter(app => app.status === 'SHORTLISTED').length;
  const rejected = applications.filter(app => app.status === 'REJECTED').length;
  const profileViews = 0;

  const recentApplications = [...applications]
    .sort((a, b) => new Date(b.appliedAt) - new Date(a.appliedAt))
    .slice(0, 3);

  const getStatusColor = (status) => {
    switch (status) {
      case 'PENDING': return 'bg-yellow-100 text-yellow-800';
      case 'SHORTLISTED': return 'bg-blue-100 text-blue-800';
      case 'HIRED': return 'bg-green-100 text-green-800';
      case 'REJECTED': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Student Dashboard</h1>
        <p className="text-gray-600">Track your job applications and upcoming interviews.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Applications"
          value={totalApplications}
          icon={<FolderClosed className="w-6 h-6" />}
          color="blue"
        />
        <StatCard
          title="Interviews"
          value={interviews}
          icon={<Video className="w-6 h-6" />}
          color="purple"
        />
        <StatCard
          title="Rejected"
          value={rejected}
          icon={<Heart className="w-6 h-6 text-red-600" />}
          color="red"
        />
        <StatCard
          title="Profile Views"
          value={profileViews}
          icon={<Eye className="w-6 h-6" />}
          color="green"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Recent Applications</h2>
              <Link to="/StudentDashboard/applications" className="text-sm font-medium text-blue-600 hover:text-blue-700">
                View All
              </Link>
            </div>

            {loading ? (
              <div className="text-center py-12 text-gray-400">Loading applications...</div>
            ) : recentApplications.length === 0 ? (
              <div className="text-center py-12">
                <div className="p-3 bg-gray-50 rounded-full inline-block mb-3">
                  <FolderClosed className="w-8 h-8 text-gray-300" />
                </div>
                <p className="text-gray-500">No applications yet. Start applying!</p>
                <Link to="/Job_page" className="text-blue-600 font-medium mt-2 inline-block">Find Jobs</Link>
              </div>
            ) : (
              <div className="space-y-4">
                {recentApplications.map((application) => (
                  <div
                    key={application.id}
                    className="group flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-blue-100 hover:bg-blue-50/50 transition-all"
                  >
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 rounded-lg bg-gray-100 flex items-center justify-center text-xl font-bold text-gray-400 group-hover:bg-white group-hover:text-blue-600 transition-colors">
                        {application.company?.name?.[0] || "C"}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">
                          {application.job.jobTitle || "Unknown Position"}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {application.job.company?.company || "Unknown Company"} • {new Date(application.appliedAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="mt-3 sm:mt-0">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(application.status)}`}>
                        {application.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 text-white shadow-lg">
            <h3 className="font-bold text-lg mb-2">Complete Profile</h3>
            <p className="text-gray-300 text-sm mb-6">
              Complete your profile to increase your chances of getting hired.
            </p>
            <div className="w-full bg-gray-700 h-2 rounded-full mb-4">
              <div className="bg-blue-500 h-2 rounded-full w-3/4"></div>
            </div>
            <Link to="/StudentDashboard/profile" className="block w-full text-center bg-white text-gray-900 font-bold py-3 rounded-xl hover:bg-gray-100 transition-colors">
              Update Profile
            </Link>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="font-bold text-gray-900 mb-4">Quick Links</h3>
            <nav className="space-y-2">
              <Link to="/Job_page" className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 text-gray-600 hover:text-blue-600 transition-colors">
                <span className="flex items-center gap-3"><Briefcase size={18} /> Find Jobs</span>
                <span className="text-gray-300">→</span>
              </Link>
              <Link to="/StudentDashboard/cv" className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 text-gray-600 hover:text-blue-600 transition-colors">
                <span className="flex items-center gap-3"><FileText size={18} /> Upload CV</span>
                <span className="text-gray-300">→</span>
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentDash;
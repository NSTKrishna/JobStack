import { Link } from 'react-router-dom';
import { FolderClosed } from 'lucide-react';
import { Heart } from 'lucide-react';
import { Eye } from 'lucide-react';
import { Video } from 'lucide-react';


function StudentDash() {
  // Sample data - will be replaced with API data
  const stats = [
    { label: 'Applications', value: 12, change: '+2 from last week', icon: <FolderClosed /> },
    { label: 'Interviews', value: 8, change: '+1 from last week', icon: <Video /> },
    { label: 'Saved Jobs', value: 24, change: '+8 from last week', icon: <Heart /> },
    { label: 'Profile Views', value: 3, change: '+1 from last week', icon: <Eye /> },
  ];

  const recentApplications = [
    {
      id: 1,
      position: 'Senior Frontend Developer',
      company: 'TechCorp Inc.',
      location: 'San Francisco, CA',
      appliedDate: '2 days ago',
      status: 'Under Review',
      statusColor: 'bg-yellow-100 text-yellow-800',
    },
    {
      id: 2,
      position: 'Product Manager',
      company: 'StartupXYZ',
      location: 'Remote',
      appliedDate: '1 week ago',
      status: 'Interview Scheduled',
      statusColor: 'bg-blue-100 text-blue-800',
    },
    {
      id: 3,
      position: 'UX Designer',
      company: 'Design Studio',
      location: 'New York, NY',
      appliedDate: '2 weeks ago',
      status: 'Rejected',
      statusColor: 'bg-red-100 text-red-800',
    },
  ];

  const savedJobs = [
    {
      id: 1,
      position: 'Backend Engineer',
      company: 'DataFlow Systems',
      salary: '$110k - $150k',
      postedDate: '3 days ago',
    },
    {
      id: 2,
      position: 'DevOps Engineer',
      company: 'CloudTech',
      salary: '$130k - $170k',
      postedDate: '1 week ago',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-8">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-600">{stat.label}</h3>
                <span className="text-2xl">{stat.icon}</span>
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
              <p className="text-xs text-gray-500">{stat.change}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-1">Recent Applications</h2>
                <p className="text-sm text-gray-500">Track the status of your job applications</p>
              </div>

              <div className="space-y-4">
                {recentApplications.map((application) => (
                  <div
                    key={application.id}
                    className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-2">
                          {application.position}
                        </h3>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                            {application.company}
                          </div>
                          <div className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            {application.location}
                          </div>
                          <div className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {application.appliedDate}
                          </div>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${application.statusColor}`}>
                        {application.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 text-center">
                <Link
                  to="/StudentDashboard/applications"
                  className="text-gray-900 font-medium hover:underline"
                >
                  View All Applications
                </Link>
              </div>
            </div>
          </div>


          <div className="space-y-6">

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <Link
                  to="/Job_page"
                  className="flex items-center justify-center gap-2 w-full bg-gray-900 text-white py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  Find Jobs
                </Link>
                <Link
                  to="/StudentDashboard/profile"
                  className="flex items-center justify-center gap-2 w-full border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Update Profile
                </Link>
                <Link
                  to="/StudentDashboard/cv"
                  className="flex items-center justify-center gap-2 w-full border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Upload Resume
                </Link>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="mb-4">
                <h2 className="text-xl font-bold text-gray-900 mb-1">Saved Jobs</h2>
                <p className="text-sm text-gray-500">Jobs you've bookmarked for later</p>
              </div>

              <div className="space-y-3">
                {savedJobs.map((job) => (
                  <div key={job.id} className="border-b border-gray-200 pb-3 last:border-b-0 last:pb-0">
                    <h3 className="font-semibold text-gray-900 text-sm mb-1">{job.position}</h3>
                    <p className="text-xs text-gray-600 mb-1">{job.company}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-gray-900">{job.salary}</span>
                      <span className="text-xs text-gray-500">{job.postedDate}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 text-center">
                <Link
                  to="/StudentDashboard/saved"
                  className="text-gray-900 font-medium hover:underline text-sm"
                >
                  View All Saved
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentDash;
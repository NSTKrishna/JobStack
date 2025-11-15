import { FolderClosed } from 'lucide-react';

function MyApplications() {

  return (
    <div className="min-h-screen bg-gray-50">

      <div className="max-w-7xl mx-auto px-6 py-12">

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">My Applications</h1>
          <p className="text-gray-500 text-lg">Track all your job applications in one place</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-20">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="mb-6">
              <FolderClosed className="w-24 h-24 text-gray-400" />
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              No Applications Yet
            </h2>
            <p className="text-gray-500 text-base">
              Start applying to jobs and track your applications here.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyApplications;
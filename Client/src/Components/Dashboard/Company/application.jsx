import { FolderClosed } from 'lucide-react';

function CompanyApplication() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Applications
          </h1>
          <p className="text-gray-500 text-lg">
            Review and manage candidate applications
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-20">
          <div className="flex flex-col items-center justify-center text-center">
            <FolderClosed className="w-24 h-24 text-gray-400" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              No Applications Received
            </h2>
            <p className="text-gray-500 text-base">
              Applications from candidates will appear here once they start applying to your job postings.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default CompanyApplication;

function SavedJobs() {

  return (
    <div className="min-h-screen bg-gray-50">

      <div className="max-w-7xl mx-auto px-6 py-12">

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Saved Jobs</h1>
          <p className="text-gray-500 text-lg">Jobs you've bookmarked for later</p>
        </div>


        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-20">
          <div className="flex flex-col items-center justify-center text-center">

            <div className="mb-6">
              <svg
                className="w-24 h-24 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              No Saved Jobs
            </h2>
            <p className="text-gray-500 text-base">
              Save jobs you're interested in to easily find them later.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SavedJobs;

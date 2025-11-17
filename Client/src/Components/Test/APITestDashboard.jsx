import { useState } from "react";
import {
  authAPI,
  jobAPI,
  applicationAPI,
  profileAPI,
  companyAPI,
} from "../../Api/api";

function APITestDashboard() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [testType, setTestType] = useState("all"); // 'all', 'public', 'user', 'company'

  const addResult = (name, status, data) => {
    setResults((prev) => [
      ...prev,
      { name, status, data, timestamp: new Date().toISOString() },
    ]);
  };

  const runTest = async (name, apiCall) => {
    try {
      const result = await apiCall();
      addResult(name, "success", result);
      return true;
    } catch (error) {
      addResult(name, "error", error.response?.data || error.message);
      return false;
    }
  };

  const runAllTests = async () => {
    setLoading(true);
    setResults([]);

    if (testType === "all" || testType === "public") {
      console.log("🌐 Testing PUBLIC Routes...");

      // Jobs
      await runTest("GET /api/jobs - Get All Jobs", () => jobAPI.getAllJobs());
      await runTest("GET /api/jobs/1 - Get Job by ID", () =>
        jobAPI.getJobById(1)
      );

      // Companies
      await runTest("GET /api/companies - Get All Companies", () =>
        companyAPI.getAllCompanies()
      );
      await runTest("GET /api/companies/1 - Get Company by ID", () =>
        companyAPI.getCompanyById(1)
      );
    }

    if (testType === "all" || testType === "user") {
      console.log("👤 Testing USER Routes...");

      // Auth
      await runTest("POST /api/auth/signup/user - User Signup", () =>
        authAPI.signup({
          fullName: "Test User " + Date.now(),
          email: `testuser${Date.now()}@college.edu`,
          enrollmentId: "TEST" + Date.now(),
          password: "password123",
          role: "user",
        })
      );

      await runTest("POST /api/auth/login/user - User Login", () =>
        authAPI.login("testuser@college.edu", "password123", "user")
      );

      // Applications
      await runTest(
        "GET /api/User_dashboard/applications - Get My Applications",
        () => applicationAPI.getMyApplications()
      );

      await runTest("POST /api/User_dashboard/apply/1 - Apply to Job", () =>
        applicationAPI.applyToJob(1, { coverLetter: "Test application" })
      );

      // Saved Jobs
      await runTest("GET /api/User_dashboard/saved-jobs - Get Saved Jobs", () =>
        jobAPI.getSavedJobs()
      );

      await runTest("POST /api/User_dashboard/save - Save Job", () =>
        jobAPI.saveJob(1)
      );

      await runTest("DELETE /api/User_dashboard/save/1 - Unsave Job", () =>
        jobAPI.unsaveJob(1)
      );

      // Profile
      await runTest("GET /api/User_dashboard/profile - Get User Profile", () =>
        profileAPI.getUserProfile()
      );

      await runTest(
        "PUT /api/User_dashboard/profile - Update User Profile",
        () =>
          profileAPI.updateUserProfile({
            firstName: "Test",
            lastName: "User",
            phone: "1234567890",
            city: "Test City",
          })
      );
    }

    if (testType === "all" || testType === "company") {
      console.log("🏢 Testing COMPANY Routes...");

      // Auth
      await runTest("POST /api/auth/signup/company - Company Signup", () =>
        authAPI.signup({
          fullName: "Test Admin " + Date.now(),
          organizationName: "Test Corp " + Date.now(),
          idNumber: "CIN" + Date.now(),
          email: `admin${Date.now()}@testcorp.com`,
          password: "password123",
          role: "company",
        })
      );

      await runTest("POST /api/auth/login/company - Company Login", () =>
        authAPI.login("admin@testcorp.com", "password123", "company")
      );

      // Jobs
      await runTest("GET /api/Company_dashboard/jobs - Get Company Jobs", () =>
        jobAPI.getCompanyJobs()
      );

      await runTest("POST /api/Company_dashboard/post_job - Create Job", () =>
        jobAPI.createJob({
          jobTitle: "Senior Developer " + Date.now(),
          department: "Engineering",
          location: "Remote",
          jobType: "Full Time",
          salaryRange: "$80,000 - $120,000",
          jobDescription: "We are looking for a senior developer...",
          requirements: "React, Node.js, 5+ years experience",
        })
      );

      await runTest("PUT /api/Company_dashboard/jobs/1 - Update Job", () =>
        jobAPI.updateJob(1, {
          jobTitle: "Lead Developer",
          salaryRange: "$100,000 - $150,000",
        })
      );

      await runTest("DELETE /api/Company_dashboard/jobs/1 - Delete Job", () =>
        jobAPI.deleteJob(1)
      );

      // Applications
      await runTest(
        "GET /api/Company_dashboard/applications - Get All Applications",
        () => applicationAPI.getAllCompanyApplications()
      );

      await runTest(
        "GET /api/Company_dashboard/jobs/1/applications - Get Job Applications",
        () => applicationAPI.getJobApplications(1)
      );

      await runTest(
        "PUT /api/Company_dashboard/applications/1/status - Update Application Status",
        () => applicationAPI.updateApplicationStatus(1, "accepted")
      );

      // Profile
      await runTest(
        "GET /api/Company_dashboard/profile - Get Company Profile",
        () => profileAPI.getCompanyProfile()
      );

      await runTest(
        "POST /api/Company_dashboard/profile - Update Company Profile",
        () =>
          profileAPI.updateCompanyProfile({
            companyName: "Test Corporation",
            website: "https://testcorp.com",
            location: "San Francisco, CA",
            description: "We build amazing products",
            size: "50-100",
            industry: "Technology",
          })
      );
    }

    setLoading(false);
  };

  const clearResults = () => setResults([]);

  const getStats = () => {
    const success = results.filter((r) => r.status === "success").length;
    const failed = results.filter((r) => r.status === "error").length;
    return { success, failed, total: results.length };
  };

  const stats = getStats();

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            🧪 API Connection Test Dashboard
          </h1>
          <p className="text-gray-600 mb-6">
            Test all frontend-backend API connections
          </p>

          {/* Test Type Selector */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Test Type:
            </label>
            <div className="flex gap-2">
              <button
                onClick={() => setTestType("all")}
                className={`px-4 py-2 rounded-lg font-medium ${
                  testType === "all"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                All Tests
              </button>
              <button
                onClick={() => setTestType("public")}
                className={`px-4 py-2 rounded-lg font-medium ${
                  testType === "public"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                🌐 Public
              </button>
              <button
                onClick={() => setTestType("user")}
                className={`px-4 py-2 rounded-lg font-medium ${
                  testType === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                👤 User
              </button>
              <button
                onClick={() => setTestType("company")}
                className={`px-4 py-2 rounded-lg font-medium ${
                  testType === "company"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                🏢 Company
              </button>
            </div>
          </div>

          {/* Stats Display */}
          {results.length > 0 && (
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <div className="text-2xl font-bold text-blue-600">
                  {stats.total}
                </div>
                <div className="text-sm text-blue-700">Total Tests</div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <div className="text-2xl font-bold text-green-600">
                  {stats.success}
                </div>
                <div className="text-sm text-green-700">Passed</div>
              </div>
              <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                <div className="text-2xl font-bold text-red-600">
                  {stats.failed}
                </div>
                <div className="text-sm text-red-700">Failed</div>
              </div>
            </div>
          )}

          <div className="flex gap-4">
            <button
              onClick={runAllTests}
              disabled={loading}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 font-medium"
            >
              {loading
                ? "Running Tests..."
                : `Run ${
                    testType === "all"
                      ? "All"
                      : testType.charAt(0).toUpperCase() + testType.slice(1)
                  } Tests`}
            </button>

            <button
              onClick={clearResults}
              className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 font-medium"
            >
              Clear Results
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {results.map((result, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border-l-4 ${
                result.status === "success"
                  ? "bg-green-50 border-green-500"
                  : "bg-red-50 border-red-500"
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">
                      {result.status === "success" ? "✅" : "❌"}
                    </span>
                    <h3 className="font-bold text-gray-900">{result.name}</h3>
                  </div>

                  <div className="ml-8">
                    <p
                      className={`text-sm font-medium ${
                        result.status === "success"
                          ? "text-green-700"
                          : "text-red-700"
                      }`}
                    >
                      {result.status === "success" ? "SUCCESS" : "FAILED"}
                    </p>

                    <details className="mt-2">
                      <summary className="cursor-pointer text-sm text-gray-600 hover:text-gray-900">
                        View Response
                      </summary>
                      <pre className="mt-2 p-3 bg-gray-900 text-green-400 rounded text-xs overflow-auto max-h-64">
                        {JSON.stringify(result.data, null, 2)}
                      </pre>
                    </details>
                  </div>
                </div>

                <span className="text-xs text-gray-500">
                  {new Date(result.timestamp).toLocaleTimeString()}
                </span>
              </div>
            </div>
          ))}
        </div>

        {results.length === 0 && !loading && (
          <div className="text-center py-12 text-gray-500">
            Click "Run Tests" to test API connections
          </div>
        )}
      </div>
    </div>
  );
}

export default APITestDashboard;

import {
  authAPI,
  jobAPI,
  applicationAPI,
  profileAPI,
  companyAPI,
} from "../src/Api/api";

// Test Suite for API Connections
const testAPIConnections = async () => {
  console.log("🧪 Starting API Connection Tests...\n");

  const results = {
    passed: [],
    failed: [],
  };

  // Helper function to test API calls
  const testAPI = async (name, apiCall) => {
    try {
      console.log(`Testing: ${name}...`);
      const result = await apiCall();
      console.log(`✅ PASSED: ${name}`);
      console.log("Response:", result);
      results.passed.push(name);
      return true;
    } catch (error) {
      console.error(`❌ FAILED: ${name}`);
      console.error("Error:", error.response?.data || error.message);
      results.failed.push({
        name,
        error: error.response?.data || error.message,
      });
      return false;
    }
  };

  // ============================================
  // 1. PUBLIC ROUTES TESTS (No Auth Required)
  // ============================================
  console.log("\n📋 Testing PUBLIC Routes:\n");

  await testAPI("GET /api/jobs - Get All Jobs", () => jobAPI.getAllJobs());

  await testAPI("GET /api/companies - Get All Companies", () =>
    companyAPI.getAllCompanies()
  );

  // ============================================
  // 2. AUTH ROUTES TESTS
  // ============================================
  console.log("\n🔐 Testing AUTH Routes:\n");

  // Test user signup (will fail if user exists)
  await testAPI("POST /api/auth/signup/user - User Signup", () =>
    authAPI.signup({
      fullName: "Test User",
      email: "testuser@college.edu",
      enrollmentId: "TEST123",
      password: "password123",
      role: "user",
    })
  );

  // Test company signup (will fail if company exists)
  await testAPI("POST /api/auth/signup/company - Company Signup", () =>
    authAPI.signup({
      fullName: "Test Company Admin",
      organizationName: "Test Corp",
      idNumber: "CIN123456789",
      email: "admin@testcorp.com",
      password: "password123",
      role: "company",
    })
  );

  // ============================================
  // 3. COMPANY DASHBOARD ROUTES (Requires Auth)
  // ============================================
  console.log("\n🏢 Testing COMPANY DASHBOARD Routes:\n");

  await testAPI("POST /api/Company_dashboard/post_job - Create Job", () =>
    jobAPI.createJob({
      jobTitle: "Test Developer",
      department: "Engineering",
      location: "Remote",
      jobType: "Full Time",
      salaryRange: "$80,000 - $100,000",
      jobDescription: "Test job description",
      requirements: "React, Node.js",
    })
  );

  await testAPI("GET /api/Company_dashboard/jobs - Get Company Jobs", () =>
    jobAPI.getCompanyJobs()
  );

  await testAPI(
    "GET /api/Company_dashboard/profile - Get Company Profile",
    () => profileAPI.getCompanyProfile()
  );

  // ============================================
  // 4. USER DASHBOARD ROUTES (Requires Auth)
  // ============================================
  console.log("\n👤 Testing USER DASHBOARD Routes:\n");

  await testAPI(
    "GET /api/User_dashboard/applications - Get User Applications",
    () => applicationAPI.getMyApplications()
  );

  await testAPI("GET /api/User_dashboard/saved-jobs - Get Saved Jobs", () =>
    jobAPI.getSavedJobs()
  );

  await testAPI("GET /api/User_dashboard/profile - Get User Profile", () =>
    profileAPI.getUserProfile()
  );

  // ============================================
  // SUMMARY
  // ============================================
  console.log("\n" + "=".repeat(50));
  console.log("📊 TEST RESULTS SUMMARY");
  console.log("=".repeat(50));
  console.log(`✅ Passed: ${results.passed.length}`);
  console.log(`❌ Failed: ${results.failed.length}`);
  console.log("\nPassed Tests:");
  results.passed.forEach((test) => console.log(`  ✓ ${test}`));
  console.log("\nFailed Tests:");
  results.failed.forEach(({ name, error }) => {
    console.log(`  ✗ ${name}`);
    console.log(`    Error: ${JSON.stringify(error)}`);
  });
  console.log("=".repeat(50) + "\n");

  return results;
};

// Run tests
if (typeof window !== "undefined") {
  window.testAPIConnections = testAPIConnections;
  console.log("💡 Run tests by calling: window.testAPIConnections()");
}

export default testAPIConnections;

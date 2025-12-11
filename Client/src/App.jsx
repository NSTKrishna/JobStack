import Navbar from "./Components/Navbar/nav.jsx";
import Landings from "./Components/Landing_page/Landing.jsx";
import FooterApp from "./Components/Footer/footer.jsx";
import CompanyView from "./Components/Company_page/Company.jsx";
import Job from "./Components/Job_page/Job.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUpPage from "./Components/Auth_Page/Signup.jsx";
import StudentDash from "./Components/Dashboard/StudentDash";
import MyApplications from "./Components/Dashboard/Student/application.jsx";
import MyCV from "./Components/Dashboard/Student/cv.jsx";
import Profile from "./Components/Dashboard/Student/Userprofile.jsx";
import CompanyDash from "./Components/Dashboard/CompanyDash.jsx";
import CompanyPost from "./Components/Dashboard/Company/post.jsx";
import CompanyProfile from "./Components/Dashboard/Company/profile.jsx";
import StudentDashboardHeader from "./Components/Dashboard/Nav_Student/StudentDashboard.jsx";
import CompanyDashboardHeader from "./Components/Dashboard/Nav_Company/CompanyDashboard.jsx";
import CompanyApplication from "./Components/Dashboard/Company/apply.jsx";
import LoginStudent from "./Components/Auth_Page/Login.jsx";
import { ScrollToTop } from "./Components/Effects/Marquee.jsx";
import { Outlet } from "react-router-dom";
import APITestDashboard from "./Components/Test/APITestDashboard.jsx";

function MainLayout({ children }) {
  return (
    <div>
      <ScrollToTop />
      <Navbar />
      {children}
      <FooterApp />
    </div>
  );
}

function StudentDashboardLayout() {
  return (
    <div>
      <ScrollToTop />
      <StudentDashboardHeader />
      <Outlet />
    </div>
  );
}

function CompanyDashboardLayout() {
  return (
    <div>
      <ScrollToTop />
      <CompanyDashboardHeader />
      <Outlet />
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <MainLayout>
                <Landings />
              </MainLayout>
            }
          />
          <Route
            path="/Job_page"
            element={
              <MainLayout>
                <Job />
              </MainLayout>
            }
          />
          <Route
            path="/Company_page"
            element={
              <MainLayout>
                <CompanyView />
              </MainLayout>
            }
          />
          <Route
            path="/SignUp"
            element={
              <MainLayout>
                <SignUpPage />
              </MainLayout>
            }
          />
          <Route
            path="/Login"
            element={
              <MainLayout>
                <LoginStudent />
              </MainLayout>
            }
          />

          <Route path="/StudentDashboard" element={<StudentDashboardLayout />}>
            <Route index element={<StudentDash />} />
            <Route path="applications" element={<MyApplications />} />
            <Route path="cv" element={<MyCV />} />
            <Route path="profile" element={<Profile />} />
          </Route>

          <Route path="/CompanyDashboard" element={<CompanyDashboardLayout />}>
            <Route index element={<CompanyDash />} />
            <Route path="job-postings" element={<CompanyPost />} />
            <Route path="applications" element={<CompanyApplication />} />
            <Route path="company-profile" element={<CompanyProfile />} />
          </Route>

          <Route path="/test-api" element={<APITestDashboard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

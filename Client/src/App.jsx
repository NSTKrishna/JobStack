import Navbar from "./page/nav.jsx";
import Landings from "./page/Landing.jsx";
import FooterApp from "./page/footer.jsx";
import CompanyView from "./page/Company.jsx";
import Job from "./page/Job.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUpPage from "./page/Signup.jsx";
import StudentDash from "./page/StudentDash";
import MyApplications from "./page/application.jsx";
import MyCV from "./page/cv.jsx";
import Profile from "./page/Userprofile.jsx";
import CompanyDash from "./page/CompanyDash.jsx";
import CompanyPost from "./page/post.jsx";
import CompanyProfile from "./page/profile.jsx";
import StudentDashboardHeader from "./page/StudentDashboard.jsx";
import CompanyDashboardHeader from "./page/CompanyDashboard.jsx";
import CompanyApplication from "./page/apply.jsx";
import LoginStudent from "./page/Login.jsx";
import { ScrollToTop } from "./page/Marquee.jsx";
import { Outlet } from "react-router-dom";
import ProtectedRoute from "./page/ProtectedRoute.jsx";

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

          {/* Protected Student Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/StudentDashboard" element={<StudentDashboardLayout />}>
              <Route index element={<StudentDash />} />
              <Route path="applications" element={<MyApplications />} />
              <Route path="cv" element={<MyCV />} />
              <Route path="profile" element={<Profile />} />
            </Route>
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/CompanyDashboard" element={<CompanyDashboardLayout />}>
              <Route index element={<CompanyDash />} />
              <Route path="job-postings" element={<CompanyPost />} />
              <Route path="applications" element={<CompanyApplication />} />
              <Route path="company-profile" element={<CompanyProfile />} />
            </Route>
          </Route>

        </Routes>
      </Router>
    </div>
  );
}

export default App;

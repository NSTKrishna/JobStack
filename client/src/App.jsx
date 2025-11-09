import Navbar from "./Components/Navbar/nav";
import Landings from "./Components/Landing_page/landing";
import FooterApp from "./Components/Footer/footer";
import CompanyView from "./Components/Company_page/Company";
import Job from "./Components/Job_page/Job";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUpPage from "./Components/Auth_Page/SignUp";
import LoginStudent from "./Components/Auth_Page/Login/Login_Student";
import LoginCompany from "./Components/Auth_Page/Login/Login_Company";
import StudentDash from "./Components/Dashboard/StudentDash";
import SavedJobs from "./Components/Dashboard/Student/savejob";
import MyApplications from "./Components/Dashboard/Student/application";
import MyCV from "./Components/Dashboard/Student/cv";
import Profile from "./Components/Dashboard/Student/profile";
import CompanyDash from "./Components/Dashboard/CompanyDash";
import CompanyPost from "./Components/Dashboard/Company/post";
import CompanyProfile from "./Components/Dashboard/Company/profile";
import StudentDashboardHeader from "./Components/Dashboard/Nav_Student/StudentDashboard";
import CompanyDashboardHeader from "./Components/Dashboard/Nav_Company/CompanyDashboard";
import CompanyApplication from "./Components/Dashboard/Company/application";
import { Outlet } from "react-router-dom";

function MainLayout({ children }) {
  return (
    <div>
      <Navbar />
      {children}
      <FooterApp />
    </div>
  );
}

function StudentDashboardLayout() {
  return (
    <div>
      <StudentDashboardHeader />
      <Outlet />
    </div>
  );
}

function CompanyDashboardLayout() {
  return (
    <div>
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
            path="/Login_Student"
            element={
              <MainLayout>
                <LoginStudent />
              </MainLayout>
            }
          />
          <Route
            path="/Login_Company"
            element={
              <MainLayout>
                <LoginCompany />
              </MainLayout>
            }
          />

          <Route path="/StudentDashboard" element={<StudentDashboardLayout />}>
            <Route index element={<StudentDash />} />
            <Route path="saved" element={<SavedJobs />} />
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
        </Routes>
      </Router>
    </div>
  );
}

export default App;

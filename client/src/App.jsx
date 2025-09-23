import Navbar from "./Components/Navbar/nav";
import Landings from "./Components/Landing_page/landing";
import FooterApp from "./Components/Footer/footer"
import CompanyView from "./Components/Company_page/Company";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUpPage from "./Auth_Page/SignUp";
import LoginStudent from "./Auth_Page/Login/Login_Student";
import LoginCompany from "./Auth_Page/Login/Login_Company";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Landings />} />
          <Route path="/Company_page" element={<CompanyView />} />
          <Route path="/SignUp" element={<SignUpPage />} />
          <Route path="/Login_Student" element={<LoginStudent />} />
          <Route path="/Login_Company" element={<LoginCompany />} />
        </Routes>
      </Router>
      <FooterApp />
    </div>
  );
}

export default App;
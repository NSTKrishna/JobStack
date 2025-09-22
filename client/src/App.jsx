import Navbar from "./Components/Navbar/nav";
import Landings from "./Components/Landing_page/landing";
import FooterApp from "./Components/Footer/footer"
import CompanyView from "./Components/Company_page/Company";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUpPage from "./Auth_Page/SignUp";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Landings />} />
          <Route path="/Company_page" element={<CompanyView />} />
          <Route path="/Sign Up" element={<SignUpPage />} />
        </Routes>
      </Router>
      <FooterApp />
    </div>
  );
}

export default App;
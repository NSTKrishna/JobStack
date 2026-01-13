import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Mail,
  Lock,
  Briefcase,
  User,
  Building2,
  GraduationCap,
  Hash,
  Eye,
  EyeOff,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { useSignup } from "../Api/hooks";

function SignUpPage() {
  const { handleSignup } = useSignup();

  const [formData, setFormData] = useState({
    role: "job_seeker",
    fullName: "",
    organizationName: "",
    idNumber: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [cinVerified, setCinVerified] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side validation
    if (!formData.fullName || formData.fullName.trim() === "") {
      alert("Please enter your full name");
      return;
    }
    if (!formData.organizationName || formData.organizationName.trim() === "") {
      alert(
        `Please enter ${formData.role === "job_seeker" ? "college" : "company"
        } name`
      );
      return;
    }
    if (!formData.idNumber || formData.idNumber.trim() === "") {
      alert(
        `Please enter ${formData.role === "job_seeker" ? "enrollment ID" : "CIN ID"
        }`
      );
      return;
    }
    if (!formData.email || formData.email.trim() === "") {
      alert("Please enter your email");
      return;
    }
    if (formData.password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    console.log("Form submitted:", formData);
    try {
      await handleSignup(formData);
    } catch (err) {
      console.error("Signup error:", err);
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Signup failed. Please try again.";
      alert(errorMessage);
    }
  };

  const handleVerifyCIN = () => {
    // Simulate CIN verification
    setCinVerified(true);
    setTimeout(() => {
      alert("CIN ID verified successfully!");
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50 flex items-center justify-center p-4 py-12">
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-gray-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>

      <div className="w-full max-w-lg relative">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="bg-gradient-to-br from-blue-600 to-gray-600 p-3 rounded-xl">
              <Briefcase className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-gray-700 bg-clip-text text-transparent mb-2">
            Create Your Account
          </h1>
          <p className="text-gray-600">
            Join thousands of professionals on JobStack
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                I am a:
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() =>
                    setFormData({ ...formData, role: "job_seeker" })
                  }
                  className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium transition-all duration-300 ${formData.role === "job_seeker"
                      ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                >
                  <User className="h-4 w-4" />
                  Job Seeker
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, role: "company" })}
                  className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium transition-all duration-300 ${formData.role === "company"
                      ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                >
                  <Briefcase className="h-4 w-4" />
                  Company
                </button>
              </div>
            </div>

            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                {formData.role === "job_seeker" ? "Full Name" : "HR Name"}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  autoComplete="name"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  placeholder={
                    formData.role === "job_seeker"
                      ? "Enter your full name"
                      : "Enter HR name"
                  }
                  required
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="organizationName"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                {formData.role === "job_seeker"
                  ? "College Name"
                  : "Company Name"}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  {formData.role === "job_seeker" ? (
                    <GraduationCap className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Building2 className="h-5 w-5 text-gray-400" />
                  )}
                </div>
                <input
                  type="text"
                  id="organizationName"
                  name="organizationName"
                  autoComplete="organization"
                  value={formData.organizationName}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  placeholder={
                    formData.role === "job_seeker"
                      ? "Enter your college name"
                      : "Enter company name"
                  }
                  required
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="idNumber"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                {formData.role === "job_seeker" ? "Enrollment ID" : "CIN ID"}
              </label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Hash className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="idNumber"
                    name="idNumber"
                    autoComplete="off"
                    value={formData.idNumber}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    placeholder={
                      formData.role === "job_seeker"
                        ? "Enter enrollment ID"
                        : "Enter CIN ID"
                    }
                    required
                  />
                </div>
                {formData.role === "company" && (
                  <button
                    type="button"
                    onClick={handleVerifyCIN}
                    className={`px-4 py-3 rounded-lg font-medium transition-all duration-300 whitespace-nowrap ${cinVerified
                        ? "bg-green-100 text-green-700 border border-green-300"
                        : "bg-blue-600 text-white hover:bg-blue-700"
                      }`}
                  >
                    {cinVerified ? (
                      <span className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4" />
                        Verified
                      </span>
                    ) : (
                      "Verify"
                    )}
                  </button>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                {formData.role === "job_seeker"
                  ? "College Email"
                  : "Company Email"}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  placeholder={
                    formData.role === "job_seeker"
                      ? "Enter your college email"
                      : "Enter company email"
                  }
                  required
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  autoComplete="new-password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  placeholder="Create a password (min. 6 characters)"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Use 8+ characters with a mix of letters, numbers & symbols
              </p>
            </div>

            <div className="flex items-start">
              <input
                type="checkbox"
                id="terms"
                name="terms"
                className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                required
              />
              <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                I agree to the{" "}
                <Link
                  to="#"
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  to="#"
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Privacy Policy
                </Link>
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
            >
              Create Account
              <ArrowRight className="h-5 w-5" />
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Or sign up with
              </span>
            </div>
          </div>

          <p className="text-center text-sm text-gray-600 mt-6">
            Already have an account?{" "}
            <Link
              to="/Login"
              className="text-blue-600 hover:text-blue-700 font-semibold"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
export default SignUpPage;

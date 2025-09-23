import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function SignUpPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    role: "job_seeker",
    fullName: "",
    organizationName: "",
    idNumber: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(-1);
    console.log("Form submitted:", formData);
    // Send formData to backend API here
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-50">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-2">JobConnect</h1>
        <p className="text-gray-500 text-center mb-6">
          Trusted by thousands of companies and job seekers worldwide.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Role Selection */}
          <div>
            <label className="block mb-2 font-medium">I am a:</label>
            <div className="flex space-x-4">
              {["job_seeker", "company"].map((roleOption) => (
                <label
                  key={roleOption}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="role"
                    value={roleOption}
                    checked={formData.role === roleOption}
                    onChange={handleChange}
                    className="accent-blue-600"
                  />
                  <span>
                    {roleOption === "job_seeker" ? "Job Seeker" : "Company"}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Full Name and HR Name*/}
          <div>
            <label className="block mb-1 font-medium">
              {formData.role === "job_seeker" ? "Full Name" : "HR Name"}
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
              placeholder={
                formData.role === "job_seeker"
                  ? "Enter your Full Name"
                  : "Enter your Full Name"
              }
              required
            />
          </div>
          {/* College Name and Company name*/}
          <div>
            <label className="block mb-1 font-medium">
              {formData.role === "job_seeker" ? "College Name" : "Company Name"}
            </label>
            <input
              type="text"
              name="College_name"
              value={formData.College_name}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
              placeholder={
                formData.role === "job_seeker"
                  ? "Enter your College Name"
                  : "Enter your Company Name"
              }
              required
            />
          </div>
          {/* Enrollment no  and CIN ID */}
          <div>
            <label className="block mb-1 font-medium">
              {formData.role === "job_seeker" ? "Enrollment ID" : "CIN ID"}
            </label>
            <div className="flex justify-between items-center">
              <input
                type="text"
                name="enrollmentNo"
                value={formData.enrollmentNo}
                onChange={handleChange}
                className={
                  formData.role === "company"
                    ? "border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    : "w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                }
                placeholder={
                  formData.role === "job_seeker"
                    ? "Enter your Enrollment ID"
                    : "Enter your CIN ID"
                }
                required
              />
              {formData.role === "company" && (
                <button className="bg-green-500 text-white rounded-lg px-4 py-2">
                  Verify CIN ID
                </button>
              )}
            </div>
          </div>
          {/* Email */}
          <div>
            <label className="block mb-1 font-medium">
              {formData.role === "job_seeker"
                ? "College Email"
                : "Company Email"}
            </label>
            <input
              type="email"
              name="College_email"
              value={formData.College_email}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
              placeholder={
                formData.role === "job_seeker"
                  ? "Enter your College Email"
                  : "Enter your Company Email"
              }
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
              placeholder="Create a password (min. 6 characters)"
              required
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-black text-white rounded-lg py-2 hover:bg-gray-900"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUpPage;

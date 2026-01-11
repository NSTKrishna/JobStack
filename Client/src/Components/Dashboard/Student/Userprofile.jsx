import { useState, useEffect } from "react";
import { useFetchUserProfile, useUpdateProfileUser } from "../../../Api/hooks";
import { useAuthStore } from "../../../Api/store";

function Profile() {
  const { fetchProfile } = useFetchUserProfile();
  const { handleUpdateProfile, loading } = useUpdateProfileUser();
  const { user } = useAuthStore();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    summary: "",
    experience: ""
  });

  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const data = await fetchProfile();
      if (data && data.user) {
        setFormData({
          firstName: data.user.firstName || "",
          lastName: data.user.lastName || "",
          email: data.user.email || user?.email || "",
          phone: data.user.phone || "",
          city: data.user.city || "",
          summary: data.user.summary || "",
          experience: data.user.experience || ""
        });
      } else {
        // Auto-fill email if no profile exists
        setFormData(prev => ({ ...prev, email: user?.email || "" }));
      }
    } catch (error) {
      console.error("Failed to load profile", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      setMessage({ type: "", text: "" });
      await handleUpdateProfile(formData);
      setMessage({ type: "success", text: "Profile updated successfully!" });
    } catch (error) {
      console.error("Update error:", error);
      setMessage({ type: "error", text: "Failed to update profile." });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">

      <div className="max-w-7xl mx-auto px-6 py-12">

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Profile</h1>
          <p className="text-gray-500 text-lg">Manage your account information</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <div className="max-w-3xl mx-auto">

            {message.text && (
              <div className={`mb-6 p-4 rounded-lg ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                {message.text}
              </div>
            )}

            <div className="space-y-6">

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="First Name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Last Name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  disabled
                  className="w-full px-4 py-3 border border-gray-300 bg-gray-100 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="City, Country"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Experience
                </label>
                <input
                  type="text"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  placeholder="Years of experience / Current Role"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bio
                </label>
                <textarea
                  rows="4"
                  name="summary"
                  value={formData.summary}
                  onChange={handleChange}
                  placeholder="Tell us about yourself"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none resize-none"
                ></textarea>
              </div>

              <div className="flex justify-end pt-4">
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="bg-gray-900 text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium disabled:opacity-50"
                >
                  {loading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
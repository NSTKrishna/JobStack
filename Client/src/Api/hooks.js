import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore,useJobStore,useApplicationStore } from "./store";
import { authAPI,jobAPI,applicationAPI,profileAPI } from "./api";

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleLogin = async (email, password, role = "job_seeker") => {
    setLoading(true);
    setError(null);
    try {
      const data = await authAPI.login(email, password, role);
      login(data.user, data.token);
      navigate(role === "company" ? "/CompanyDashboard" : "/StudentDashboard");
      return data;
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { handleLogin, loading, error };
};

export const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleSignup = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const data = await authAPI.signup(userData);
      login(data.user, data.token);
      navigate(
        userData.role === "company" ? "/login" : "/login"
      );
      return data;
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { handleSignup, loading, error };
};

export const useLogout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await authAPI.logout();
    navigate("/login");
  };

  return { handleLogout };
};

export const useFetchJobs = () => {
  const setJobs = useJobStore((state) => state.setJobs);
  const setLoading = useJobStore((state) => state.setLoading);
  const setError = useJobStore((state) => state.setError);

  const fetchJobs = async (filters = {}) => {
    setLoading(true);
    setError(null);
    try {
      const data = await jobAPI.getAllJobs(filters);
      setJobs(data.jobs || data);
      return data;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch jobs");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { fetchJobs };
};

export const useAutoFetchJobs = (filters = {}, enabled = true) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const setJobs = useJobStore((state) => state.setJobs);

  useState(() => {
    if (enabled) {
      const fetchJobs = async () => {
        setLoading(true);
        setError(null);
        try {
          const data = await jobAPI.getAllJobs(filters);
          setJobs(data.jobs || data);
        } catch (err) {
          setError(err.response?.data?.message || "Failed to fetch jobs");
        } finally {
          setLoading(false);
        }
      };
      fetchJobs();
    }
  }, []);

  return { loading, error };
};

export const useSaveJob = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const saveJob = useJobStore((state) => state.saveJob);

  const handleSaveJob = async (jobId) => {
    setLoading(true);
    setError(null);
    try {
      await jobAPI.saveJob(jobId);
      saveJob(jobId);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save job");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { handleSaveJob, loading, error };
};

export const useUnsaveJob = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const unsaveJob = useJobStore((state) => state.unsaveJob);

  const handleUnsaveJob = async (jobId) => {
    setLoading(true);
    setError(null);
    try {
      await jobAPI.unsaveJob(jobId);
      unsaveJob(jobId);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to unsave job");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { handleUnsaveJob, loading, error };
};

export const useApplyToJob = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const addApplication = useApplicationStore((state) => state.addApplication);

  const handleApply = async (jobId, applicationData) => {
    setLoading(true);
    setError(null);
    try {
      const data = await applicationAPI.applyToJob(jobId, applicationData);
      addApplication(data.application || data);
      return data;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to apply to job");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { handleApply, loading, error };
};

export const useFetchApplications = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const setApplications = useApplicationStore((state) => state.setApplications);

  const fetchApplications = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await applicationAPI.getMyApplications();
      setApplications(data.applications || data);
      return data;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch applications");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { fetchApplications, loading, error };
};

export const useUpdateProfileUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const updateUser = useAuthStore((state) => state.updateUser);

  const handleUpdateProfile = async (profileData) => {
    setLoading(true);
    setError(null);
    try {
      const data = await profileAPI.updateUserProfile(profileData);
      updateUser(data.user || data);
      return data;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update profile");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { handleUpdateProfile, loading, error };
};

export const useUpdateProfileCompany = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleUpdateProfile = async (profileData) => {
    setLoading(true);
    setError(null);
    try {
      const data = await profileAPI.updateCompanyProfile(profileData);
      return data;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update profile");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { handleUpdateProfile, loading, error };
}

export const useUploadCV = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const updateUser = useAuthStore((state) => state.updateUser);

  const handleUploadCV = async (file) => {
    setLoading(true);
    setError(null);
    try {
      const data = await profileAPI.uploadCV(file);
      updateUser({ cvUrl: data.cvUrl });
      return data;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to upload CV");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { handleUploadCV, loading, error };
};

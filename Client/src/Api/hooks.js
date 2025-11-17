import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore, useJobStore, useApplicationStore } from "./store";
import { authAPI, jobAPI, applicationAPI, profileAPI, companyAPI } from "./api";

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
      navigate(userData.role === "company" ? "/login" : "/login");
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
      const data = await jobAPI.getJobById(filters);
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
};

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

export const useCreateJob = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const addJob = useJobStore((state) => state.addJob);

  const handleCreateJob = async (jobData) => {
    setLoading(true);
    setError(null);
    try {
      const data = await jobAPI.createJob(jobData);
      addJob(data.job || data);
      return data;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create job");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { handleCreateJob, loading, error };
};

export const useFetchCompanyJobs = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const setCompanyJobs = useJobStore((state) => state.setCompanyJobs);

  const fetchCompanyJobs = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await jobAPI.getCompanyJobs();
      setCompanyJobs(data.jobs || data);
      return data;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch jobs");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { fetchCompanyJobs, loading, error };
};

export const useDeleteJob = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const deleteJob = useJobStore((state) => state.deleteJob);

  const handleDeleteJob = async (jobId) => {
    setLoading(true);
    setError(null);
    try {
      await jobAPI.deleteJob(jobId);
      deleteJob(jobId);
      return true;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete job");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { handleDeleteJob, loading, error };
};

export const useUpdateJob = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const updateJob = useJobStore((state) => state.updateJob);

  const handleUpdateJob = async (jobId, jobData) => {
    setLoading(true);
    setError(null);
    try {
      const data = await jobAPI.updateJob(jobId, jobData);
      updateJob(jobId, data.job || data);
      return data;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update job");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { handleUpdateJob, loading, error };
};

export const useFetchCompanyOverview = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [overview, setOverview] = useState(null);

  const fetchOverview = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await companyAPI.getCompanyOverview();
      setOverview(data);
      return data;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch overview");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { fetchOverview, overview, loading, error };
};

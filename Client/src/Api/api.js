import axios from "axios";
import { useAuthStore } from "./store";

// Create axios instance with default config
const VITE_API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export const api = axios.create({
  baseURL: VITE_API_URL,
  timeout: 10000,
  withCredentials: true, // Important: This allows cookies to be sent with requests
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor - add auth token
api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Only redirect if user is already authenticated (token expired)
      // Don't redirect on login failures
      const isAuthenticated = useAuthStore.getState().isAuthenticated;
      if (isAuthenticated) {
        // Token expired or invalid
        useAuthStore.getState().logout();
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  // User login
  login: async (email, password, role = "job_seeker") => {
    const endpoint =
      role === "company" ? "auth/login/company" : "auth/login/user";
    const response = await api.post(endpoint, { email, password });
    return response.data;
  },

  // User signup
  signup: async (userData) => {
    const endpoint =
      userData.role === "company" ? "auth/signup/company" : "auth/signup/user";
    const response = await api.post(endpoint, userData);
    return response.data;
  },

  // Logout
  logout: async () => {
    // Clear local storage
    useAuthStore.getState().logout();
  },

  // Verify CIN (for company signup)
  verifyCIN: async (cin) => {
    const response = await api.post("/company/verify-cin", { cin });
    return response.data;
  },
};

// Job API
export const jobAPI = {
  // Get all jobs
  getAllJobs: async (filters = {}) => {
    const response = await api.get("/jobs", { params: filters });
    return response.data;
  },

  // Get job by ID
  getJobById: async (id) => {
    const response = await api.get(`/jobs/${id}`);
    return response.data;
  },

  // Create job (company only)
  createJob: async (jobData) => {
    const response = await api.post("/company/jobs", jobData);
    return response.data;
  },

  // Update job (company only)
  updateJob: async (id, jobData) => {
    const response = await api.put(`/company/jobs/${id}`, jobData);
    return response.data;
  },

  // Delete job (company only)
  deleteJob: async (id) => {
    const response = await api.delete(`/company/jobs/${id}`);
    return response.data;
  },

  // Save/bookmark job
  saveJob: async (jobId) => {
    const response = await api.post("/user/save", { jobId });
    return response.data;
  },

  // Unsave job
  unsaveJob: async (jobId) => {
    const response = await api.delete(`/user/save/${jobId}`);
    return response.data;
  },

  // Get saved jobs
  getSavedJobs: async () => {
    const response = await api.get("/user/saved-jobs");
    return response.data;
  },
};

// Application API
export const applicationAPI = {
  // Apply to job
  applyToJob: async (jobId, applicationData) => {
    const response = await api.post(`/user/apply/${jobId}`, applicationData);
    return response.data;
  },

  // Get user's applications
  getMyApplications: async () => {
    const response = await api.get("/user/applications");
    return response.data;
  },

  // Get applications for a job (company only)
  getJobApplications: async (jobId) => {
    const response = await api.get(`/company/jobs/${jobId}/applications`);
    return response.data;
  },

  // Update application status (company only)
  updateApplicationStatus: async (applicationId, status) => {
    const response = await api.put(
      `/company/applications/${applicationId}/status`,
      { status }
    );
    return response.data;
  },

  // Get all company applications (company only)
  getAllCompanyApplications: async () => {
    const response = await api.get("/company/application");
    return response.data;
  },
};

// Profile API
export const profileAPI = {
  // Get user profile
  getUserProfile: async () => {
    const response = await api.get("/user/profile");
    return response.data;
  },

  // Update user profile
  updateUserProfile: async (profileData) => {
    const response = await api.put("/user/profile", profileData);
    return response.data;
  },

  // Get company profile
  getCompanyProfile: async () => {
    const response = await api.get("/company/profile");
    return response.data;
  },

  // Update company profile
  updateCompanyProfile: async (profileData) => {
    const response = await api.post("/Company_dashboard/profile", profileData);
    return response.data;
  },

  // Upload CV
  uploadCV: async (file) => {
    const formData = new FormData();
    formData.append("cv", file);
    const response = await api.post("/user/cv", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },
};

// Company API
export const companyAPI = {
  // Get all companies
  getAllCompanies: async () => {
    const response = await api.get("/companies");
    return response.data;
  },

  // Get company by ID
  getCompanyById: async (id) => {
    const response = await api.get(`/companies/${id}`);
    return response.data;
  },
};
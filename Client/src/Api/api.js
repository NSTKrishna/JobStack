import axios from "axios";
import { useAuthStore } from "./store";

const VITE_API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export const api = axios.create({
  baseURL: VITE_API_URL,
  timeout: 10000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {

    if (!error.response) {
      console.error(
        "NETWORK ERROR: Cannot connect to server. Is it running?"
      );
    }

    if (error.response?.status === 401) {
      const isAuthenticated = useAuthStore.getState().isAuthenticated;
      if (isAuthenticated) {
        useAuthStore.getState().logout();
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: async (email, password, role = "job_seeker") => {
    const endpoint =
      role === "company" ? "auth/login/company" : "auth/login/user";
    const response = await api.post(endpoint, { email, password });
    return response.data;
  },

  signup: async (userData) => {
    const endpoint =
      userData.role === "company" ? "auth/signup/company" : "auth/signup/user";
    const response = await api.post(endpoint, userData);
    return response.data;
  },

  logout: async () => {
    useAuthStore.getState().logout();
  },

  verifyCIN: async (cin) => {
    const response = await api.post("/company/verify-cin", { cin });
    return response.data;
  },
};


export const jobAPI = {

  getAllJobs: async (filters = {}) => {
    const response = await api.get("/jobs", { params: filters });
    return response.data;
  },

  getJobById: async (id) => {
    const response = await api.get(`/jobs/${id}`);
    return response.data;
  },


  getCompanyJobs: async () => {
    const response = await api.get("/Company_dashboard/jobs");
    return response.data;
  },


  createJob: async (jobData) => {
    const response = await api.post("/Company_dashboard/post_job", jobData);
    return response.data;
  },


  deleteJob: async (id) => {
    const response = await api.delete(`/Company_dashboard/jobs/${id}`);
    return response.data;
  },
};


export const applicationAPI = {

  applyToJob: async (jobId, applicationData) => {
    const response = await api.post(
      `/User_dashboard/apply/${jobId}`,
      applicationData
    );
    return response.data;
  },


  getMyApplications: async () => {
    const response = await api.get("/User_dashboard/applications");
    return response.data;
  },


  getJobApplications: async (jobId) => {
    const response = await api.get(
      `/Company_dashboard/jobs/${jobId}/applications`
    );
    return response.data;
  },

  updateApplicationStatus: async (applicationId, status) => {
    const response = await api.put(
      `/Company_dashboard/applications/${applicationId}/status`,
      { status }
    );
    return response.data;
  },

  getAllCompanyApplications: async () => {
    const response = await api.get("/Company_dashboard/applications");
    return response.data;
  },
};

export const profileAPI = {
  getCompanyProfile: async () => {
    const response = await api.get("/Company_dashboard/profile");
    return response.data;
  },

  updateCompanyProfile: async (profileData) => {
    const response = await api.post("/Company_dashboard/profile", profileData);
    return response.data;
  },

  uploadCV: async (file) => {
    const formData = new FormData();
    formData.append("cv", file);
    const response = await api.post("/User_dashboard/cv", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },
};


export const userAPI = {
  getProfile: async () => {
    const response = await api.get("/User_dashboard/profile");
    return response.data;
  },

  updateProfile: async (profileData) => {
    const response = await api.post("/User_dashboard/profile", profileData);
    return response.data;
  },
};

export const companyAPI = {
  getAllCompanies: async () => {
    const response = await api.get("/companies/show");
    return response.data;
  },

  getCompanyById: async (id) => {
    const response = await api.get(`/companies/${id}`);
    return response.data;
  },

  getCompanyOverview: async () => {
    const response = await api.get("/Company_dashboard/overview");
    return response.data;
  },
};

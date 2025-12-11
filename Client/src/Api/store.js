import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { persist } from "zustand/middleware";

// Auth Store
export const useAuthStore = create(
  devtools(
    persist(
      (set) => ({
        user: null,
        token: null,
        isAuthenticated: false,
        login: (user, token) =>
          set({ user, token, isAuthenticated: true }, false, "auth/login"),
        logout: () =>
          set(
            { user: null, token: null, isAuthenticated: false },
            false,
            "auth/logout"
          ),
        updateUser: (userData) =>
          set(
            (state) => ({ user: { ...state.user, ...userData } }),
            false,
            "auth/updateUser"
          ),
      }),
      {
        name: "auth-storage", // unique name for localStorage key
      }
    )
  )
);

// Job Store
export const useJobStore = create(
  devtools(
    (set) => ({
      jobs: [],
      companyJobs: [],
      loading: false,
      error: null,
      setJobs: (jobs) => set({ jobs }, false, "jobs/setJobs"),
      setCompanyJobs: (companyJobs) =>
        set({ companyJobs }, false, "jobs/setCompanyJobs"),
      addJob: (job) =>
        set(
          (state) => ({
            jobs: [...state.jobs, job],
            companyJobs: [...state.companyJobs, job],
          }),
          false,
          "jobs/addJob"
        ),
      deleteJob: (id) =>
        set(
          (state) => ({
            jobs: state.jobs.filter((job) => job.id !== id),
            companyJobs: state.companyJobs.filter((job) => job.id !== id),
          }),
          false,
          "jobs/deleteJob"
        ),
      setLoading: (loading) => set({ loading }, false, "jobs/setLoading"),
      setError: (error) => set({ error }, false, "jobs/setError"),
      clearError: () => set({ error: null }, false, "jobs/clearError"),
    }),
    {
      name: "job-storage",
    }
  )
);

// Application Store
export const useApplicationStore = create(
  devtools((set) => ({
    applications: [],
    loading: false,
    error: null,
    setApplications: (applications) =>
      set({ applications }, false, "applications/setApplications"),
    addApplication: (application) =>
      set(
        (state) => ({
          applications: [...state.applications, application],
        }),
        false,
        "applications/addApplication"
      ),
    updateApplicationStatus: (id, status) =>
      set(
        (state) => ({
          applications: state.applications.map((app) =>
            app.id === id ? { ...app, status } : app
          ),
        }),
        false,
        "applications/updateStatus"
      ),
    setLoading: (loading) => set({ loading }, false, "applications/setLoading"),
    setError: (error) => set({ error }, false, "applications/setError"),
  }))
);

export const useCompanyStore = create(
  devtools((set) => ({
    companies: [],
    setCompanies: (companies) => {
      set({ companies }, false, "companies/setCompanies");
    }
  }))
);

// Selectors (optional but recommended for better performance)
export const selectUser = (state) => state.user;
export const selectIsAuthenticated = (state) => state.isAuthenticated;

export const selectSavedJobs = (state) => state.savedJobs;
export const selectJobById = (id) => (state) =>
  state.jobs.find((job) => job.id === id);

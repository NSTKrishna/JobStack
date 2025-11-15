import { create } from "zustand";
import { devtools } from "zustand/middleware";

// Auth Store
export const useAuthStore = create(
  devtools((set) => ({
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
      )
  }))
);

// Job Store
export const useJobStore = create(
  devtools(
    (set) => ({
      jobs: [],
      savedJobs: [],
      loading: false,
      error: null,
      setJobs: (jobs) => set({ jobs }, false, "jobs/setJobs"),
      addJob: (job) =>
        set((state) => ({ jobs: [...state.jobs, job] }), false, "jobs/addJob"),
      updateJob: (id, jobData) =>
        set(
          (state) => ({
            jobs: state.jobs.map((job) =>
              job.id === id ? { ...job, ...jobData } : job
            ),
          }),
          false,
          "jobs/updateJob"
        ),
      deleteJob: (id) =>
        set(
          (state) => ({
            jobs: state.jobs.filter((job) => job.id !== id),
          }),
          false,
          "jobs/deleteJob"
        ),
      saveJob: (jobId) =>
        set(
          (state) => ({
            savedJobs: state.savedJobs.includes(jobId)
              ? state.savedJobs
              : [...state.savedJobs, jobId],
          }),
          false,
          "jobs/saveJob"
        ),
      unsaveJob: (jobId) =>
        set(
          (state) => ({
            savedJobs: state.savedJobs.filter((id) => id !== jobId),
          }),
          false,
          "jobs/unsaveJob"
        ),
      setLoading: (loading) => set({ loading }, false, "jobs/setLoading"),
      setError: (error) => set({ error }, false, "jobs/setError"),
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

// Selectors (optional but recommended for better performance)
export const selectUser = (state) => state.user;
export const selectIsAuthenticated = (state) => state.isAuthenticated;

export const selectSavedJobs = (state) => state.savedJobs;
export const selectJobById = (id) => (state) =>
  state.jobs.find((job) => job.id === id);
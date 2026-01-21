import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { persist } from "zustand/middleware";

export const useAuthStore = create(
  devtools(
    persist(
      (set) => ({
        user: null,
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
        name: "auth-storage",
      }
    )
  )
);

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

export const useApplicationStore = create(
  devtools((set) => ({
    applications: [],
    companyApplications: [],
    loading: false,
    error: null,
    setApplications: (applications) =>
      set({ applications }, false, "applications/setApplications"),
    setCompanyApplications: (companyApplications) =>
      set({ companyApplications }, false, "applications/setCompanyApplications"),
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
          companyApplications: state.companyApplications.map((app) =>
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

export const useNotificationStore = create(
  devtools(
    persist(
      (set) => ({
        notifications: [],
        unreadCount: 0,
        
        addNotification: (notification) =>
          set(
            (state) => ({
              notifications: [
                { ...notification, id: Date.now(), read: false },
                ...state.notifications,
              ].slice(0, 50), // Keep only last 50 notifications
              unreadCount: state.unreadCount + 1,
            }),
            false,
            "notifications/add"
          ),
        
        markAsRead: (notificationId) =>
          set(
            (state) => ({
              notifications: state.notifications.map((n) =>
                n.id === notificationId ? { ...n, read: true } : n
              ),
              unreadCount: Math.max(0, state.unreadCount - 1),
            }),
            false,
            "notifications/markAsRead"
          ),
        
        markAllAsRead: () =>
          set(
            (state) => ({
              notifications: state.notifications.map((n) => ({ ...n, read: true })),
              unreadCount: 0,
            }),
            false,
            "notifications/markAllAsRead"
          ),
        
        clearAll: () =>
          set(
            { notifications: [], unreadCount: 0 },
            false,
            "notifications/clearAll"
          ),
      }),
      {
        name: "notification-storage",
      }
    )
  )
);

export const selectUser = (state) => state.user;
export const selectIsAuthenticated = (state) => state.isAuthenticated;

export const selectSavedJobs = (state) => state.savedJobs;
export const selectJobById = (id) => (state) =>
  state.jobs.find((job) => job.id === id);

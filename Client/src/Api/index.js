// Central exports for all API, stores, and hooks

// Stores
export { useAuthStore, selectUser, selectIsAuthenticated } from "./store";

// Note: Job and Application stores are commented out in store.js
// Uncomment them there first before exporting here:
// useJobStore, useApplicationStore, selectSavedJobs, selectJobById

// API functions
export {
  api,
  authAPI,
  jobAPI,
  applicationAPI,
  profileAPI,
  companyAPI,
} from "./api";

// Hooks
export {
  useLogin,
  useSignup,
  useLogout,
  useFetchJobs,
  useAutoFetchJobs,
  useSaveJob,
  useUnsaveJob,
  useApplyToJob,
  useFetchApplications,
  useUpdateProfile,
  useUploadCV,
} from "./hooks";

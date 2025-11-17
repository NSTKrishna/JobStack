const express = require("express");
const router = express.Router();

const { UploadCV } = require("../../controllers/User_Dashboard/cv.controllers");
const { UploadMiddleware } = require("../../middlewares/upload.Middleware");
const {
  restrictToLoggedIn,
  RoleBasedAccess,
} = require("../../middlewares/auth.Middleware.js");
const {
  Profile,
} = require("../../controllers/User_Dashboard/profile.controllers");

// Profile
router.post(
  "/profile",
  restrictToLoggedIn,
  RoleBasedAccess("Student"),
  Profile
);

// CV Upload
router.post("/upload-cv", UploadMiddleware, UploadCV);

// TODO: Add these controllers
// const { getMyApplications, applyToJob } = require('../../controllers/User_Dashboard/application.controllers');
// const { getSavedJobs, saveJob, unsaveJob } = require('../../controllers/User_Dashboard/savedJob.controllers');
// const { getUserProfile, updateUserProfile } = require('../../controllers/User_Dashboard/profile.controllers');
// const { uploadCV } = require('../../controllers/User_Dashboard/cv.controllers');

// Applications
// router.get('/applications', getMyApplications);
// router.post('/apply/:jobId', applyToJob);

// Saved Jobs
// router.get('/saved-jobs', getSavedJobs);
// router.post('/save', saveJob);
// router.delete('/save/:jobId', unsaveJob);

// Profile
// router.get('/profile', getUserProfile);
// router.put('/profile', updateUserProfile);

// CV Upload
// router.post('/cv', uploadCV);

module.exports = router;

const express = require("express");
const router = express.Router();

const { UploadCV } = require("../../controllers/User_Dashboard/cv.controllers");
const { UploadMiddleware } = require("../../middlewares/upload.Middleware");
const {
  restrictToLoggedIn,
  RoleBasedAccess,
} = require("../../middlewares/auth.Middleware.js");
const {
  updateProfile,
  getProfile,
} = require("../../controllers/User_Dashboard/profile.controllers");
const {
  applyToJob,
  getMyApplications,
  getApplicationById,
  withdrawApplication,
} = require("../../controllers/User_Dashboard/application.controllers");

router.get("/profile", restrictToLoggedIn, RoleBasedAccess("user"), getProfile);

router.post(
  "/profile",
  restrictToLoggedIn,
  RoleBasedAccess("user"),
  updateProfile,
);

router.post(
  "/cv",
  restrictToLoggedIn,
  RoleBasedAccess("user"),
  UploadMiddleware,
  UploadCV,
);

// Application Routes
router.post(
  "/apply/:jobId",
  restrictToLoggedIn,
  RoleBasedAccess("user"),
  applyToJob,
);

router.get(
  "/applications",
  restrictToLoggedIn,
  RoleBasedAccess("user"),
  getMyApplications,
);

router.get(
  "/applications/:id",
  restrictToLoggedIn,
  RoleBasedAccess("user"),
  getApplicationById,
);

router.delete(
  "/applications/:id",
  restrictToLoggedIn,
  RoleBasedAccess("user"),
  withdrawApplication,
);

module.exports = router;

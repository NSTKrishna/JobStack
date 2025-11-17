const express = require("express");
const router = express.Router();

const {
  restrictToLoggedIn,
  RoleBasedAccess,
} = require("../../middlewares/auth.Middleware.js");

const {
  PostJob,
} = require("../../controllers/Company_Dashboard/job.controllers");
const {
  Profile,
} = require("../../controllers/Company_Dashboard/profile.controllers");
const {
  Application,
} = require("../../controllers/Company_Dashboard/application.controllers");
const {
  Overview,
} = require("../../controllers/Company_Dashboard/overview.controllers");

const {
  ShowCompanyJobs,
  DeleteJob,
} = require("../../controllers/Jobs/showJob.controllers.js");

router.get(
  "/overview",
  restrictToLoggedIn,
  RoleBasedAccess("Company"),
  Overview
);
router.post(
  "/post_job",
  restrictToLoggedIn,
  RoleBasedAccess("Company"),
  PostJob
);

router.get(
  "/jobs",
  restrictToLoggedIn,
  RoleBasedAccess("Company"),
  ShowCompanyJobs
);

router.post(
  "/profile",
  restrictToLoggedIn,
  RoleBasedAccess("Company"),
  Profile
);
router.get(
  "/application",
  restrictToLoggedIn,
  RoleBasedAccess("Company"),
  Application
);

// Delete job
router.delete(
  "/jobs/:id",
  restrictToLoggedIn,
  RoleBasedAccess("Company"),
  DeleteJob
);

module.exports = router;

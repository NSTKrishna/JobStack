const express = require("express");
const router = express.Router();

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

router.get("/overview", Overview);
router.post("/post_job", PostJob);
router.get("/jobs", ShowCompanyJobs);
router.post("/profile", Profile);
router.get("/application", Application);
router.get("/applications", Application); // Get all applications
router.delete("/jobs/:id", DeleteJob);

module.exports = router;

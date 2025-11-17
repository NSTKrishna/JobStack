const express = require("express");
const router = express.Router();
const {
  ShowAllJobs,
  ShowJobsId,
} = require("../../controllers/Jobs/showJob.controllers");

// Get all jobs
router.get("/", ShowAllJobs);

// Get job by ID
router.get("/:id", ShowJobsId);

module.exports = router;

const express = require("express");
const router = express.Router();
const {
  ShowAllJobs,
  ShowJobsId,
} = require("../../controllers/Jobs/showJob.controllers");

router.get("/", ShowAllJobs);

router.get("/:id", ShowJobsId);

module.exports = router;

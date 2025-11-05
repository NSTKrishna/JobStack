const express = require('express');
const router = express.Router();

const {ShowJobs} = require('../../controllers/Jobs/showJob.controllers');

router.get('/jobs',ShowJobs);

module.exports = router;
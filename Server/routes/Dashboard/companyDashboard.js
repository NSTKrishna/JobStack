const express = require('express');
const router = express.Router();

const {PostJob} = require('../../controllers/Company_Dashboard/job.controllers');

router.post('/post/job',PostJob);

module.exports = router;
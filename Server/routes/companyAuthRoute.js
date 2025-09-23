const express = require('express');
const router = express.Router();

const {CompanySignup} = require('../controllers/companyAuth');

router.post('/signup/company',CompanySignup);

module.exports = router;
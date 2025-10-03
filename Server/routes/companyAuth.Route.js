const express = require('express');
const router = express.Router();

const {CompanySignup} = require('../controllers/companyAuth.controllers');

router.post('/signup/company',CompanySignup);

module.exports = router;
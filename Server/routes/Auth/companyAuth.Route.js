const express = require('express');
const router = express.Router();

const {CompanySignup} = require('../../controllers/companyAuth.controllers.js');
const {CompanyLogin} = require("../../controllers/companyLogin.controllers.js");

router.post("/signup/company", CompanySignup);
router.post("/login/company", CompanyLogin);

module.exports = router;
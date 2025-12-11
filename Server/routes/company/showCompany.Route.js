const express = require('express');
const router = express.Router();

const { ShowCompany } = require('../../controllers/Companys/showcompany.controllers');

router.get('/show', ShowCompany);

module.exports = router;

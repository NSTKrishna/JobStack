const express = require('express');
const router = express.Router();

const {UserLogin} = require('../controllers/userLogin.controllers');

router.post('/login', UserLogin);

module.exports = router;
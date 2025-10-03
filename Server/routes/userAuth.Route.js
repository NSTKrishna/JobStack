const express = require('express');
const router = express.Router();

const {UserSignup} = require('../controllers/userAuth.controllers');

router.post('/signup/user', UserSignup);

module.exports = router;


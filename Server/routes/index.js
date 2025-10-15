const express = require('express');
const router = express.Router();

const userAuth = require('./Auth/userAuth.Route.js');
const companyAuth = require('./Auth/companyAuth.Route.js');
const Post = require('./Dashboard/companyDashboard.js');
const protectedRoute = require('./Auth/protected.Route.js');

router.use('/profile', protectedRoute);
router.use('/dashboard', Post);
router.use('/auth', userAuth);
router.use('/auth', companyAuth);

module.exports = router;
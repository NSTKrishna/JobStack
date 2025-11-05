const express = require('express');
const router = express.Router();

const {UploadCV} = require('../../controllers/User_Dashboard/cv.controllers');
const {UploadMiddleware} = require('../../middlewares/upload.Middleware');
const {restrictToLoggedIn,RoleBasedAccess} = require('../../middlewares/auth.Middleware.js');
const {Profile} = require('../../controllers/User_Dashboard/profile.controllers');

router.get('/profile',restrictToLoggedIn,RoleBasedAccess('Student'),Profile);
router.post('/upload-cv',UploadMiddleware,UploadCV);

module.exports = router;

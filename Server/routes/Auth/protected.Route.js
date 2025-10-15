const express = require('express');
const router = express.Router();

const {restrictToLoggedIn,RoleBasedAccess} = require('../../middlewares/auth.Middleware.js');

router.get('/student',restrictToLoggedIn,RoleBasedAccess('student'), (req,res)=>{
    res.status(200).json({message : "Welcome Student"})
});
router.get('/company',restrictToLoggedIn,RoleBasedAccess('company'), (req,res)=>{
    res.status(200).json({message : "Welcome Company"})
});

module.exports = router;
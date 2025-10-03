const express = require("express");
const router = express.Router();

const  {UserSignup}  = require("../../controllers/User_Auth/userAuth.controllers");
const  {UserLogin} = require("../../controllers/User_Auth/userLogin.controllers")

router.post("/signup/user", UserSignup);
router.post("/login/user", UserLogin);

module.exports = router;

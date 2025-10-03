const express = require("express");
const router = express.Router();

const  {UserSignup}  = require("../../controllers/userAuth.controllers");
const  {UserLogin} = require("../../controllers/userLogin.controllers")

router.post("/signup/user", UserSignup);
router.post("/login/user", UserLogin);

module.exports = router;

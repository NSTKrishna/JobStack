const express = require("express");
const router = express.Router();

const {
  restrictToLoggedIn,
  RoleBasedAccess,
} = require("../middlewares/auth.Middleware.js");

const userAuth = require("./Auth/userAuth.Route.js");
const companyAuth = require("./Auth/companyAuth.Route.js");
const companyDashboard = require("./Dashboard/companyDashboard.Route.js");
const protectedRoute = require("./Auth/protected.Route.js");
const userDashboard = require("./Dashboard/studentDashboard.routes.js");
const showJobsRoute = require("./Job/showJob.Route.js");
const showCompanyRoute = require("./company/showCompany.Route.js");

router.use("/jobs", showJobsRoute);
router.use("/companies", showCompanyRoute);

router.use("/auth", userAuth);
router.use("/auth", companyAuth);

router.use("/profile", protectedRoute);

router.use(
  "/Company_dashboard",
  restrictToLoggedIn,
  RoleBasedAccess("Company"),
  companyDashboard
);

router.use(
  "/User_dashboard",
  restrictToLoggedIn,
  RoleBasedAccess("user"),
  userDashboard
);

module.exports = router;

const { getUser } = require("../utils/auth.js");

async function restrictToLoggedIn(req, res, next) {
  try {
    let userJWT = req.cookies.jwt;

    // Fallback to Bearer token if cookie is missing
    if (!userJWT && req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      userJWT = req.headers.authorization.split(' ')[1];
    }

    if (!userJWT) {
      return res.status(401).json({ message: "Unauthorized: No token" });
    }

    const user = getUser(userJWT);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
    req.user = user;
    next();
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Unauthorized: Token invalid or expired" });
  }
}

function RoleBasedAccess(role) {
  return (req, res, next) => {

    const userRole = req.user.role?.toLowerCase();
    const requiredRole = role?.toLowerCase();

    if (userRole !== requiredRole) {
      return res.status(403).json({
        message: "Forbidden: Access is denied",
        debug: { userRole: req.user.role, requiredRole: role },
      });
    }
    next();
  };
}

module.exports = {
  restrictToLoggedIn,
  RoleBasedAccess,
};

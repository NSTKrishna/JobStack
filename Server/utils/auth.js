const jwt = require("jsonwebtoken");

const secret = "your_jwt_secret_key";

function setUser(user,role) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: role
    },
    secret, {
      expiresIn: '1min' // 1 minute // later
    }
  );
}

function getUser(token) {
  if (!token) {
    return null;
  }
  return jwt.verify(token, secret);
}

module.exports = {
  setUser,
  getUser,
};

const prisma = require("../db/config.js");
const { setUser } = require("../utils/auth.js");
const bcrypt = require("bcryptjs");

const CompanyLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }
    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    } 

    const token = setUser(user, "Company");
    res.status(200).cookie('jwt', token, {
        maxAge: 60 * 1000 // 1 minute // later
    });

    return res.status(200).json({
      message: "Login successful",
      user,
    });
  } catch (err) {
    return res.status(500).json({
      error: "Internal Server Error",
      details: err.message,
    });
  }
};

module.exports = {
  CompanyLogin,
};

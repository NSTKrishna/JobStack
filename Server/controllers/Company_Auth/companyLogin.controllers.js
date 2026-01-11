const prisma = require("../../db/config.js");
const { setUser } = require("../../utils/auth.js");
const bcrypt = require("bcryptjs");

const CompanyLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.company.findUnique({
      where: {
        email: email,
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

    const token = setUser(user, "company");
    const isProduction = process.env.NODE_ENV === "production";

    res.cookie("jwt", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
    });

    return res.status(200).json({
      message: "Login successful",
      user,
      token,
      role: "company",
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

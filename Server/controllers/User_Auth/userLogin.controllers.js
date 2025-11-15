const prisma = require("../../db/config.js");
const { setUser } = require("../../utils/auth.js");
const bcrypt = require("bcryptjs");

const UserLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        Email: email,
      },
    });

    if (!user) {
      console.log("Login failed: User not found");
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }
    const comparePassword = await bcrypt.compare(password, user.Password);


    if (!comparePassword) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const token = setUser(user, "student");
    res.cookie("jwt", token, {
      maxAge: 60 * 1000, // 1 minute
    });

    return res.status(200).json({
      message: "Login successful",
      user,
      token,
      role: "job_seeker",
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({
      error: "Internal Server Error",
      details: err.message,
    });
  }
};

module.exports = {
  UserLogin,
};

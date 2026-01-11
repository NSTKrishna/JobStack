const prisma = require("../../db/config.js");
const { setUser } = require("../../utils/auth.js");
const bcrypt = require("bcryptjs");

const UserLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      console.log("Login failed: User not found");
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

    const token = setUser(user, "user");
    const isProduction = process.env.NODE_ENV === "production";

    res.cookie("jwt", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
    });

    return res.status(200).json({
      message: "Login successful",
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        cvUrl: user.cvUrl,
        cvFileName: user.cvFileName,
      },
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

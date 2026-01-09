const prisma = require("../../db/config.js");
const bcrypt = require("bcryptjs");
const { Validate } = require("../../utils/validator.js");

const UserSignup = async (req, res) => {
  try {
    console.log("Signup request received:", req.body);

    const { fullName, organizationName, idNumber, email, password } = req.body;

    if (!fullName || fullName.trim() === "") {
      return res.status(400).json({ message: "Full name is required" });
    }
    if (!organizationName || organizationName.trim() === "") {
      return res.status(400).json({ message: "College name is required" });
    }
    if (!idNumber || idNumber.trim() === "") {
      return res.status(400).json({ message: "Enrollment ID is required" });
    }
    if (!email || email.trim() === "") {
      return res.status(400).json({ message: "Email is required" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }
    if (!password || password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    // Additional validation using existing validator
    const valid = Validate({
      fullName,
      organizationName,
      idNumber,
      email,
      password,
    });

    if (!valid) {
      return res.status(400).json({ message: "Invalid data format" });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: email },
    });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }

    const existingEnrollment = await prisma.user.findFirst({
      where: { enrollment: idNumber },
    });
    if (existingEnrollment) {
      return res
        .status(400)
        .json({ message: "This enrollment ID is already registered" });
    }

    let College = await prisma.college.findUnique({
      where: { name: organizationName },
    });
    if (!College) {
      College = await prisma.college.create({
        data: {
          name: organizationName,
        },
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name: fullName,
        email: email,
        password: hashedPassword,
        enrollment: idNumber,
        collegeId: College.id,
      },
    });

    const { password: _, ...userWithoutPassword } = user;

    res.status(201).json({
      message: "User registered successfully",
      user: userWithoutPassword,
    });
  } catch (err) {
    console.error("Signup error:", err);

    if (err.code === "P2002") {
      const field = err.meta?.target?.[0] || "field";
      return res.status(400).json({
        message: `This ${field} is already registered`,
      });
    }

    res.status(500).json({
      error: "Internal Server error",
      message: err.message,
    });
  }
};

module.exports = { UserSignup };

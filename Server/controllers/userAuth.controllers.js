const prisma = require("../db/config.js")
const bcrypt = require("bcryptjs");

const UserSignup = async (req, res) => {
  try {
    const { fullName, organizationName, idNumber, email, password } = req.body;

    if (!fullName || !organizationName || !email || !password) {
      return res
        .status(400)
        .json({ message: "All required fields must be provided" });
    }

    /// alert for idNumber length
    if (idNumber.length < 10) {
      return res
        .status(400)
        .json({ message: "ID number must be at least 10 characters long" });
    }
    /// alert for password length
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });
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
        email,
        password: hashedPassword,
        enrollment: idNumber,
        collegeId: College.id, 
      },
    });

    res.status(201).json({ message: "User registered successfully", user });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
    console.error(err);
  }
};
 
module.exports = { UserSignup };

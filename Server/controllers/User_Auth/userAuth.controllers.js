const prisma = require("../../db/config.js");
const bcrypt = require("bcryptjs");
const { Validate } = require("../../utils/validator.js");

const UserSignup = async (req, res) => {
  try {
    const { fullName, organizationName, idNumber, email, password } = req.body;
    const valid = Validate({
      fullName,
      organizationName,
      idNumber,
      email,
      password,
    });

    if (!valid) {
      return res.status(400).json({ message: "Invalid data" });
    }

    let College = await prisma.college.findUnique({
      where: { Name: organizationName },
    });
    if (!College) {
      College = await prisma.college.create({
        data: {
          Name: organizationName,
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

    res.status(201).json({ message: "User registered successfully", user });
  } catch (err) {
    res.status(500).json({ error: "Internal Server error" });
  }
};

module.exports = { UserSignup };

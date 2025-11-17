const prisma = require("../../db/config.js");
const bcrypt = require("bcryptjs");
const { Validate } = require("../../utils/validator.js");

const CompanySignup = async (req, res) => {
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

    // understand this logic properly
    const existingCompany = await prisma.company.findFirst({
      where: {
        OR: [
          { email: email },
          { cin: idNumber },
          { company: organizationName },
        ],
      },
    });

    if (existingCompany) {
      return res.status(400).json({
        error:
          "Company already registered with same email, CIN, or organization name",
      });
    }

    const company = await prisma.company.create({
      data: {
        name: fullName,
        company: organizationName,
        cin: idNumber,
        email: email,
        password: await bcrypt.hash(password, 10),
      },
    });

    res
      .status(201)
      .json({ message: "Company registered successfully", company });
  } catch (err) {
    res.status(500).json({
      message: {
        error: "Internal server error by company",
        details: err.message,
      },
    });
  }
};

module.exports = { CompanySignup };

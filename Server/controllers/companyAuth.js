const { PrismaClient } = require("../generated/prisma");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

const CompanySignup = async (req, res) => {
  try {
    const { fullName, organizationName, idNumber, email, password } = req.body;

    if (!fullName || !organizationName || !email || !password) {
      return res.status(400).json({
        message: {
          error: "All fields are required",
        },
      });
    }
    if (idNumber.length < 10) {
      return res.status(400).json({
        message: {
          error: "ID number must be at least 10 characters long",
        },
      });
    }
    if (password.length < 6) {
      return res.status(400).json({
        message: {
          error: "Password must be at least 6 characters long",
        },
      });
    }

    // understand this logic properly
    const existingCompany = await prisma.company.findFirst({
      where: {
        OR: [
          { email },                
          { CIN: idNumber },   
          { company: organizationName } 
        ]
      }
    });

    if (existingCompany) {
      return res.status(400).json({ error: "Company already registered with same email, CIN, or organization name" });
    }

    Company = await prisma.company.create({
            data : {
                name: fullName,
                company : organizationName,
                CIN: idNumber,
                email,
                password: await bcrypt.hash(password, 10),
            }
        })

    res.status(201).json({ message: "Company registered successfully", Company });

  } catch (err) {
    res.status(500).json({
      message: {
        error: "Internal server error by company",
        details: err.message
      },
    });
  }
};

module.exports = { CompanySignup };
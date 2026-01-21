const prisma = require("../../db/config.js");
const bcrypt = require("bcryptjs");
const { Validate } = require("../../utils/validator.js");
// const { sendEmail } = require("../../utils/sendEmail.js");

const CompanySignup = async (req, res) => {
  try {
    console.log("Company signup request received:", req.body);

    const { fullName, organizationName, idNumber, email, password } = req.body;

    if (!fullName || fullName.trim() === "") {
      return res.status(400).json({ message: "HR name is required" });
    }
    if (!organizationName || organizationName.trim() === "") {
      return res.status(400).json({ message: "Company name is required" });
    }
    if (!idNumber || idNumber.trim() === "") {
      return res.status(400).json({ message: "CIN ID is required" });
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
      let errorMessage = "Company already registered";
      if (existingCompany.email === email) {
        errorMessage = "Company with this email already exists";
      } else if (existingCompany.cin === idNumber) {
        errorMessage = "This CIN ID is already registered";
      } else if (existingCompany.company === organizationName) {
        errorMessage = "Company with this name already exists";
      }
      return res.status(400).json({ message: errorMessage });
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

    // Send welcome email (non-blocking, won't fail signup if email fails)
    // try {
    //   await sendEmail(
    //     email,
    //     "Welcome to JobStack 🎉",
    //     null,
    //     `
    //       <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
    //         <h2 style="color: #2563eb;">Welcome, ${fullName}!</h2>
    //         <p>Your JobStack company account has been created successfully.</p>
    //         <p><strong>Company:</strong> ${organizationName}</p>
    //         <p>You can now start posting jobs and hiring talent! 🚀</p>
    //         <p>Best regards,<br/>The JobStack Team</p>
    //       </div>
    //     `,
    //   );
    // } catch (emailError) {
    //   console.error("Failed to send welcome email:", emailError.message);
    //   // Don't fail the signup if email fails
    // }

    const { password: _, ...companyWithoutPassword } = company;

    res.status(201).json({
      message: "Company registered successfully",
      company: companyWithoutPassword,
    });
  } catch (err) {
    console.error("Company signup error:", err);

    if (err.code === "P2002") {
      const field = err.meta?.target?.[0] || "field";
      return res.status(400).json({
        message: `This ${field} is already registered`,
      });
    }

    res.status(500).json({
      error: "Internal server error",
      message: err.message,
    });
  }
};

module.exports = { CompanySignup };

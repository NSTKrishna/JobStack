const prisma = require("../../db/config");

const ShowCompany = async (req, res) => {
  try {
    const companies = await prisma.profile_companies.findMany();
    console.log(companies);
    res.status(200).json({
      message: "Companies Retrieved Successfully",
      companies
    })
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

module.exports = { ShowCompany };
const prisma = require("../../db/config");

const ShowCompany = async (req, res) => {
  try 
  {
    const companies = await prisma.company.findMany();
    const show = await prisma.show_Company.create({
      data : {
        id: show.id,
        companyName: companies.companyName,
        location: companies.location,
        industry: companies.industry,
        size: companies.size,
        website: companies.website,
        description: companies.description
      }
    })
    res.status(200).json({
      message: "Companies Retrieved Successfully",
      show
    })
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

module.exports = { ShowCompany };
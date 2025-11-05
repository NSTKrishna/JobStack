const prisma = require("../../db/config");

const Profile = async (req, res) => {
  try {
    const { Company_Name, website, Location, Description, Size, Email } =
      req.body;
    const user = await prisma.profile_companies.create({
      data: {
        Company_Name,
        website,
        Location,
        Description,
        Size,
        Email,
      },
    });
    return res.status(200).json({
      message: "Profile Created Successfully",
      user,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: err.message,
    });
  }
};
module.exports = { Profile };

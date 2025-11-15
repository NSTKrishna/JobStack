const prisma = require("../../db/config");

const Profile = async (req, res) => {
  try {
    const { Company_Name, website, Location, Description, Size ,Industry } =
      req.body;
    const user = await prisma.profile_companies.create({
      data: {
        Company_Name,
        website,
        Location,
        Description,
        Size,
        Industry,
        company: { connect: { id: req.user.id } },
      },
    });
    console.log("Updated Company Profile:", user);
    return res.status(200).json({
      message: "Profile Updated Successfully",
      user,
    });
  } catch (err) {
    console.error("Error updating company profile:", err);
    return res.status(500).json({
      message: "Internal Server Error",
      error: err.message,
    });
  }
};
module.exports = { Profile };

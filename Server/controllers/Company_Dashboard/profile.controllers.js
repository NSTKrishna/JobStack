const prisma = require("../../db/config");

const Profile = async (req, res) => {
  try {
    const { companyName, website, location, description, size, industry } = req.body;
    const profile = await prisma.profile_companies.upsert({
      where: { companyId: req.user.id },
      update: {
        companyName,
        website,
        location,
        description,
        size,
        industry,
      },
      create: {
        companyName,
        website,
        location,
        description,
        size,
        industry,
        company: { connect: { id: req.user.id } },
      },
    });
    console.log("Updated Company Profile:", profile);
    return res.status(200).json({
      message: "Profile Updated Successfully",
      profile,
    });
  } catch (err) {
    console.error("Error updating company profile:", err);
    return res.status(500).json({
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

module.exports = { Profile};

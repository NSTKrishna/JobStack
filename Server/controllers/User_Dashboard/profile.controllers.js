const prisma = require("../../db/config");

const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    console.log("Request body:", req.body);
    console.log("User ID:", userId);

    // Check if req.body exists
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        error: "Bad request",
        message: "Request body is empty or undefined",
      });
    }

    const { firstName, lastName, email, phone, city, experience, summary } =
      req.body;

    const user = await prisma.profile_user.upsert({
      where: { userId: userId },
      update: {
        firstName: firstName || "",
        lastName: lastName || "",
        email: email || "",
        phone: phone || "",
        city: city || "",
        experience: experience || "",
        summary: summary || "",
      },
      create: {
        userId,
        firstName: firstName || "",
        lastName: lastName || "",
        email: email || "",
        phone: phone || "",
        city: city || "",
        experience: experience || "",
        summary: summary || "",
      },
    });

    return res.status(200).json({
      message: "Profile Updated Successfully",
      user,
    });
  } catch (err) {
    console.error("Profile Update Error:", err);
    res.status(500).json({ error: "Internal server error", err: err.message });
  }
};

const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    console.log("=== Get Profile ===");
    console.log("User ID:", userId);

    const profile = await prisma.profile_user.findUnique({
      where: { userId: userId },
    });

    if (!profile) {
      console.log("No profile found for user:", userId);
      return res.status(200).json({ message: "No profile found", user: null });
    }

    console.log("Profile found:", profile);
    return res.status(200).json({ user: profile });
  } catch (err) {
    console.error("Get Profile Error:", err);
    res.status(500).json({ error: "Internal server error", err: err.message });
  }
};

module.exports = { updateProfile, getProfile };

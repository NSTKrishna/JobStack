const prisma = require("../../db/config");

const PostJob = async (req, res) => {
  try {
    console.log("Request body:", req.body);
    console.log("Authenticated user:", req.user);

    const {
      jobTitle,
      jobType,
      department,
      location,
      salaryRange,
      jobDescription,
      requirements,
    } = req.body;

    // Get company ID from authenticated user (req.user should be set by auth middleware)
    const companyId = req.user?.id;

    if (!companyId) {
      console.log("ERROR: No companyId found. req.user:", req.user);
      return res.status(401).json({
        message: "Unauthorized - Company not authenticated",
      });
    }

    // Validate required fields
    if (!jobTitle || !jobType || !department || !location) {
      return res.status(400).json({
        message: "Missing required fields",
      });
    }

    const job = await prisma.job.create({
      data: {
        jobTitle,
        jobType,
        department,
        location,
        salaryRange: salaryRange || "Not specified",
        jobDescription: jobDescription || "",
        requirements: requirements || "",
        companyId,
      },
    });

    return res.status(201).json({
      message: "Job Posted Successfully",
      job,
    });
  } catch (err) {
    console.error("PostJob Error:", err);
    return res.status(500).json({
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

module.exports = { PostJob };

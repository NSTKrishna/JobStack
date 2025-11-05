const prisma = require("../../db/config");

const PostJob = async (req, res) => {
  try {
    const {
      JobTitle,
      JobType,
      Department,
      Location,
      Salary,
      Description,
      Requirement,
    } = req.body;

    const job = await prisma.job.create({
      data: {
        JobTitle,
        JobType,
        Department,
        Location,
        Salary,
        Description,
        Requirement,
      },
    });
    return res.status(200).json({
      message: "Job Posted Successfully",
      job,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

module.exports = { PostJob };

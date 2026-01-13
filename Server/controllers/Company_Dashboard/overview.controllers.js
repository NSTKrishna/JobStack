const prisma = require("../../db/config");

const Overview = async (req, res) => {
  const { id } = req.user;
  try {
    const Active_jobs = await prisma.job.count({
      where: {
        companyId: Number(id),
      },
    });

    const Active_applications_count = await prisma.applications.count({
      where: {
        companyId: Number(id),
      },
    });

    const now = new Date();
    const curr_mon = new Date(now.getFullYear(), now.getMonth(), 1);
    const last_mon = new Date(now.getFullYear(), now.getMonth() + 1, 1);

    const monthly_applications = await prisma.applications.count({
      where: {
        companyId: Number(id), 
        appliedAt: {
          gte: curr_mon,
          lt: last_mon,
        },
      },
    });

    res.status(200).json({
      message: "Overview Data Fetched Successfully",
      Active_jobs,
      Active_applications_count,
      monthly_applications,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error",
      err: err.message,
    });
  }
};

module.exports = { Overview };

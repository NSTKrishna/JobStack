const prisma = require("../../db/config");

const ShowAllJobs = async (req, res) => {
  try {
    console.log("ShowAllJobs - Request received");
    const jobs = await prisma.job.findMany({
      include: {
        company: true,
      },
    });
    console.log("ShowAllJobs - Found jobs:", jobs.length);
    return res.status(200).json({
      message: "Jobs Retrieved Successfully",
      jobs,
    });
  } catch (err) {
    console.error("ShowAllJobs - Error:", err);
    return res.status(500).json({
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

const ShowJobsId = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        message: "Job ID is required",
      });
    }

    const job = await prisma.job.findUnique({
      where: { id: parseInt(id) },
      include: {
        company: true,
      },
    });

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json({
      message: "Job Retrieved Successfully",
      job,
    });
  } catch (err) {
    console.error("ShowJobsId Error:", err);
    return res.status(500).json({
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

const ShowCompanyJobs = async (req, res) => {
  try {
    const companyId = req.user?.id;

    if (!companyId) {
      return res.status(401).json({
        message: "Unauthorized - Company not authenticated",
      });
    }

    const jobs = await prisma.job.findMany({
      where: { companyId: companyId },
      include: {
        company: true,
        applications: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(200).json({
      message: "Company Jobs Retrieved Successfully",
      jobs,
    });
  } catch (err) {
    console.error("ShowCompanyJobs Error:", err);
    return res.status(500).json({
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

const DeleteJob = async (req, res) => {
  try {
    const { id } = req.params;
    const companyId = req.user?.id;

    console.log("DeleteJob - Job ID:", id, "Company ID:", companyId);

    if (!id) {
      return res.status(400).json({
        message: "Job ID is required",
      });
    }

    // Check if job exists and belongs to company
    const job = await prisma.job.findUnique({
      where: { id: parseInt(id) },
      include: {
        applications: true,
      },
    });

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    // Optional: Verify job belongs to the company (if auth is implemented)
    // if (companyId && job.companyId !== companyId) {
    //   return res.status(403).json({
    //     message: "You don't have permission to delete this job",
    //   });
    // }

    if (job.applications && job.applications.length > 0) {
      await prisma.applications.deleteMany({
        where: { jobId: parseInt(id) },
      });
      console.log(
        `DeleteJob - Deleted ${job.applications.length} applications`
      );
    }

    // Now delete the job
    await prisma.job.delete({
      where: { id: parseInt(id) },
    });

    console.log("DeleteJob - Successfully deleted job:", id);

    return res.status(200).json({
      message: "Job deleted successfully",
    });
  } catch (err) {
    console.error("DeleteJob Error:", err);
    return res.status(500).json({
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

module.exports = { ShowAllJobs, ShowJobsId, ShowCompanyJobs, DeleteJob };

const prisma = require("../../db/config.js");

const applyToJob = async (req, res) => {
  try {
    const jobId = parseInt(req.params.jobId);
    const userId = req.user.id;
    const { coverLetter } = req.body;

    console.log("Apply to job request:", { userId, jobId, coverLetter });

    if (!jobId || isNaN(jobId)) {
      return res.status(400).json({ message: "Invalid job ID" });
    }

    const job = await prisma.job.findUnique({
      where: { id: jobId },
      include: { company: true },
    });

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    const existingApplication = await prisma.applications.findUnique({
      where: {
        userId_jobId: {
          userId: userId,
          jobId: jobId,
        },
      },
    });

    if (existingApplication) {
      return res.status(400).json({
        message: "You have already applied to this job",
      });
    }

    const application = await prisma.applications.create({
      data: {
        userId: userId,
        jobId: jobId,
        companyId: job.companyId,
        status: "PENDING",
        coverLetter: coverLetter || null,
      },
      include: {
        job: {
          include: {
            company: true,
          },
        },
        user: true,
      },
    });

    console.log("Application created successfully:", application.id);

    res.status(201).json({
      message: "Application submitted successfully",
      application: application,
    });
  } catch (err) {
    console.error("Apply to job error:", err);
    res.status(500).json({
      error: "Internal server error",
      message: err.message,
    });
  }
};

const getMyApplications = async (req, res) => {
  try {
    const userId = req.user.id;

    console.log("Fetching applications for user ID:", userId);

    const applications = await prisma.applications.findMany({
      where: {
        userId: userId,
      },
      include: {
        job: {
          include: {
            company: {
              select: {
                id: true,
                name: true,
                company: true,
                email: true,
              },
            },
          },
        },
      },
      orderBy: {
        appliedAt: "desc",
      },
    });

    console.log(`Found ${applications.length} applications for user ${userId}`);

    res.status(200).json({
      applications: applications,
      total: applications.length,
    });
  } catch (err) {
    console.error("Get applications error:", err);
    res.status(500).json({
      error: "Internal server error",
      message: err.message,
    });
  }
};

const getApplicationById = async (req, res) => {
  try {
    const applicationId = parseInt(req.params.id);
    const userId = req.user.id;

    const application = await prisma.applications.findFirst({
      where: {
        id: applicationId,
        userId: userId,
      },
      include: {
        job: {
          include: {
            company: true,
          },
        },
        user: true,
      },
    });

    if (!application) {
      return res.status(404).json({
        message: "Application not found",
      });
    }

    res.status(200).json({
      application: application,
    });
  } catch (err) {
    console.error("Get application error:", err);
    res.status(500).json({
      error: "Internal server error",
      message: err.message,
    });
  }
};

const withdrawApplication = async (req, res) => {
  try {
    const applicationId = parseInt(req.params.id);
    const userId = req.user.id;
    const application = await prisma.applications.findFirst({
      where: {
        id: applicationId,
        userId: userId,
      },
    });

    if (!application) {
      return res.status(404).json({
        message: "Application not found",
      });
    }

    if (application.status !== "PENDING") {
      return res.status(400).json({
        message: "Cannot withdraw application that has been processed",
      });
    }

    await prisma.applications.delete({
      where: {
        id: applicationId,
      },
    });

    res.status(200).json({
      message: "Application withdrawn successfully",
    });
  } catch (err) {
    console.error("Withdraw application error:", err);
    res.status(500).json({
      error: "Internal server error",
      message: err.message,
    });
  }
};

module.exports = {
  applyToJob,
  getMyApplications,
  getApplicationById,
  withdrawApplication,
};
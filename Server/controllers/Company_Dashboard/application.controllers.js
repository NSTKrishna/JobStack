const prisma = require("../../db/config");

const Application = async (req, res) => {
  try {
    const companyId = req.user.id;

    const applications = await prisma.applications.findMany({
      where: { companyId: parseInt(companyId) },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            enrollment: true,
            document: {
              select: {
                id: true,
                fileName: true,
                fileUrl: true,
                uploadedAt: true,
              },
              orderBy: {
                uploadedAt: "desc",
              },
              take: 1,
            },
          },
        },
        job: {
          select: {
            id: true,
            jobTitle: true,
          },
        },
      },
      orderBy: {
        appliedAt: "desc",
      },
    });

    return res.status(200).json({
      total: applications.length,
      applications,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
      error: err.message,
    });
  }
};

const ViewResume = async (req, res) => {
  try {
    const companyId = req.user.id;

    const application = await prisma.applications.findFirst({
      where: {
        companyId: parseInt(companyId),
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            enrollment: true,
            document: {
              select: {
                id: true,
                fileName: true,
                fileUrl: true,
                uploadedAt: true,
              },
              orderBy: {
                uploadedAt: "desc",
              },
              take: 1,
            },
          },
        },
        job: {
          select: {
            id: true,
            jobTitle: true,
          },
        },
      },
    });

    if (!application) {
      return res
        .status(404)
        .json({ message: "Application not found or unauthorized" });
    }

    return res.status(200).json({
      message: "Resume fetched successfully",
      application,
      resume: application.user.document[0] || null,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
      error: err.message,
    });
  }
};

const updateApplicationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const companyId = req.user.id;

    const application = await prisma.applications.findFirst({
      where: {
        id: parseInt(id),
        companyId: parseInt(companyId),
      },
    });

    if (!application) {
      return res
        .status(404)
        .json({ message: "Application not found or unauthorized" });
    }

    const updatedApplication = await prisma.applications.update({
      where: { id: parseInt(id) },
      data: { status },
    });

    return res.status(200).json({
      message: "Status updated successfully",
      application: updatedApplication,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
      error: err.message,
    });
  }
};

module.exports = { Application, updateApplicationStatus };

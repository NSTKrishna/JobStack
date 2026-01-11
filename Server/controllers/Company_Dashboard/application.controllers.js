const prisma = require("../../db/config");

const Application = async (req, res) => {
  try {
    const companyId = req.user.id;
    console.log(`[Backend] Fetching applications for Company ID: ${companyId}`);

    const applications = await prisma.applications.findMany({
      where: { companyId: parseInt(companyId) },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            enrollment: true
          }
        },
        job: {
          select: {
            id: true,
            jobTitle: true
          }
        }
      },
      orderBy: {
        appliedAt: "desc"
      }
    });

    return res.status(200).json({
      total: applications.length,
      applications
    });
  } catch (err) {
    console.error("[Backend] Error fetching applications:", err);
    return res.status(500).json({
      message: "Internal server error",
      error: err.message
    });
  }
};

module.exports = { Application };

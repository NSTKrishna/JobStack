const prisma = require("../../db/config");

const UploadCV = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const userId = req.user.id;

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        cvUrl: req.file.path,
        cvFileName: req.file.filename,
      },
    });

    res.status(200).json({
      message: "CV uploaded successfully",
      cvUrl: req.file.path,
      fileName: req.file.filename,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { UploadCV };

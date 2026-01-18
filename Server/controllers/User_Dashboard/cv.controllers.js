const prisma = require("../../db/config");
const cloudinary = require("../../config/cloudinary");

const UploadCV = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const userId = req.user.id;

    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          folder: "cvs",
          resource_type: "raw",
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(req.file.buffer);
    });

    const document = await prisma.document.create({
      data: {
        fileName: req.file.originalname,
        fileUrl: uploadResult.secure_url,
        fileId: uploadResult.public_id,
        size: uploadResult.bytes,
        user: {
          connect: { id: userId },
        },
      },
    });

    return res.status(201).json({
      message: "CV uploaded successfully",
      document,
    });

  } catch (err) {
    console.error("CV Upload Error:", err);
    return res.status(500).json({ error: err.message });
  }
};

module.exports = { UploadCV };

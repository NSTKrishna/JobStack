const multer = require("multer");

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowed = /pdf|doc|docx/;
  const ext = file.originalname.split(".").pop().toLowerCase();

  if (allowed.test(ext)) {
    cb(null, true);
  } else {
    cb(new Error("Only pdf, doc, docx files are allowed"));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, 
});

const UploadMiddleware = upload.single("cv");

module.exports = { UploadMiddleware };

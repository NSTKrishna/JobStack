const multer = require("multer");
const path = require("path");
const uploadPath = path.join(__dirname, "../uploads");
const storage = multer.diskStorage({
  destination: 
    function(req, res, cb) {
      cb(null, uploadPath);
    },
    
  filename: 
    function(req, file, cb) {
      const uniqueName = Date.now() + "-" + file.originalname;
      cb(null, uniqueName);
    },
});

const fileFilter = (req, file, cb) => {
  const allowed = /pdf|doc|docx/;
  const exist = path.extname(file.originalname).toLocaleLowerCase();
  if (allowed.test(exist)) {
    cb(null, true);
  } else {
    cb(new Error("Only pdf, doc, docx files are allowed"));
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
});

const UploadMiddleware = upload.single("cv");
module.exports = { UploadMiddleware };

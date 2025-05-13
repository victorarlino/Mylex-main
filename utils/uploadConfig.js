const multer = require('multer');
const path = require('path');
const fs = require('fs');

const uploadDir = path.resolve('uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, uploadDir);
  },
  filename: (req, file, callback) => {
    const time = Date.now();
    callback(null, `${time}_${file.originalname}`);
  }
});

const upload = multer({ storage: storage });

module.exports = upload;
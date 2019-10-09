const FILE_SIZE = 1 * 1000 * 1000;

const multer = require("multer");
const path = require("path");
let storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, path.join(__baseDir, "uploads"));
  },
  filename: function(req, file, cb) {

    cb(
      null,
      Date.now() + '_'+file.originalname
    );
  }
});

let multerConfig = {
  storage: storage,
  limits: { fileSize: FILE_SIZE },
  fileFilter: function(req, file, cb) {
    if (req.files) {
      req.noFileFoundError = "File not present!";
      return cb(null, false, new Error("I don't have a clue!"));
    }
    // if (file.mimetype !== 'image/png') {
    //   req.fileValidationError = 'Invalid File Type';
    //   return cb(null, false, new Error('I don\'t have a clue!'));
    // }
    cb(null, true);
  }
};

module.exports = multer(multerConfig).single('doc');

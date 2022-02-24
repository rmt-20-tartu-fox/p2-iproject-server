const multer = require("multer");

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("masuk destination <<<<<<");
    cb(null, "public/memes");
  },
  filename: (req, file, cb) => {
    console.log(file, "<<<<< file");
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const filter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    console.log("masuk sini");
    cb(null, true);
  } else {
    console.log("masuk sana");
    cb(null, false);
  }
};

const upload = multer({ storage: fileStorage, fileFilter: filter }).single(
  "image"
);

module.exports = {
  upload,
};

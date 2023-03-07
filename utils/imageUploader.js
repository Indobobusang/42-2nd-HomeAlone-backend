const AWS = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const uuid = require("uuid4");

AWS.config.update({
  region: "ap-northeast-2",
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
});

const s3 = new AWS.S3();

const storage = multerS3({
  s3,
  acl: "public-read",
  bucket: "homealonebucket",
  contentType: multerS3.AUTO_CONTENT_TYPE,
  key: (req, file, cb) => {
    cb(null, Date.now().toString() + uuid() + file.originalname);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
});

const deleteImage = (fileKey) => {
  s3.deleteObject(
    {
      Bucket: "homealonebucket",
      Key: fileKey,
    },
    (err, data) => {
      if (err) {
        throw err;
      } else {
        console.log("unposted image deleted");
      }
    }
  );
};

module.exports = { upload, deleteImage };

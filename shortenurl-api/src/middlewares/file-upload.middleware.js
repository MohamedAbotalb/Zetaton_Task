import multer, { memoryStorage } from "multer";

const storage = memoryStorage();

function fileFilter(req, file, cb) {
  const allowedMimeTypes = ["image/jpeg", "image/jpg", "image/png"];

  const isValidFileType = allowedMimeTypes.includes(file.mimetype);
  cb(null, isValidFileType ? true : false);
}

export default multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 2 * 1024 * 1024, // max file size is 2 MB
  },
});

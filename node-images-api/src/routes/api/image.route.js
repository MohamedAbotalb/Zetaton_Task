import { Router } from "express";
import upload from "../../middlewares/file-upload.middleware.js";
import {
  addImage,
  getAllImages,
  getImageById,
  deleteImageById,
  shortenImageURL,
} from "../../controllers/image.controller.js";

const router = Router();

router.route("/").post(upload.single("image"), addImage).get(getAllImages);

router.route("/:id").get(getImageById).delete(deleteImageById);

router.route("/:id/shorten").put(shortenImageURL);

export default router;

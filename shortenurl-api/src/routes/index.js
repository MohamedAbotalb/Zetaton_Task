import { Router } from "express";
import imageRoutes from "./api/image.route.js";

const router = Router();

router.use("/images", imageRoutes);

export default router;

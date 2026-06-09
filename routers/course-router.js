import express from "express";
import {
  createCourse,
  getCourses,
  getSingleCourse,
  updateCourse,
  deleteCourse,
  enrollStudent,
} from "../controllers/course-controllers.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/", protect, authorize("admin"), createCourse);
router.get("/", protect, getCourses);
router.post("/enroll/:id", protect, authorize("admin", "teacher"), enrollStudent);

export default router;
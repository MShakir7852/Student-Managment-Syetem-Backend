import express from "express";
import {
  createTeacher,
  getTeacher,
  getAllTeachers,
  updateTeacher,
  deleteTeacher,
} from "../controllers/teacher-controller.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/", protect, authorize("admin"), createTeacher);
router.get("/me", protect, authorize("teacher"), getTeacher);
router.get("/", protect, authorize("admin"), getAllTeachers);

export default router;
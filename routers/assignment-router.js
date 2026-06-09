import express from "express";
import {
  createAssignment,
  submitAssignment,
  getAssignments,
} from "../controllers/assignment-controllers.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/", protect, authorize("teacher"), createAssignment);
router.post("/submit/:id", protect, authorize("student"), submitAssignment);
router.get("/", protect, getAssignments);

export default router;
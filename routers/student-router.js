import express from "express";
import {
  createStudent,
  getStudent,
  updateStudent,
  getAllStudents,
} from "../controllers/student-controler.js";

import { protect } from "../midleware/auth-midleware.js";
import { authorize } from "../midleware/roll-midleware.js";

const router = express.Router();

router.post("/", protect, authorize("admin"), createStudent);
router.get("/me", protect, authorize("student"), getStudent);
router.put("/me", protect, authorize("student"), updateStudent);
router.get("/", protect, authorize("admin"), getAllStudents);

export default router;
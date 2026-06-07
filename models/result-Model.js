import mongoose from "mongoose";

const resultSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },

    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },

    exam: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Exam",
    },

    totalMarks: Number,
    obtainedMarks: Number,
    grade: String,
  },
  { timestamps: true }
);

export default mongoose.model("Result", resultSchema);
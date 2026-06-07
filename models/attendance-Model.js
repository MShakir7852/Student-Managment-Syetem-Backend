import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
  {
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },

    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },

    date: Date,

    status: {
      type: String,
      enum: ["Present", "Absent", "Late"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Attendance", attendanceSchema);
import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    code: { type: String, unique: true },

    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
    },

    students: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
      },
    ],

    creditHours: Number,
    semester: Number,
  },
  { timestamps: true }
);

export default mongoose.model("Course", courseSchema);
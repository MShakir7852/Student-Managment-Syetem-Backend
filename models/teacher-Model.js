import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    employeeId: { type: String, unique: true },

    department: String,
    qualification: String,
    experience: Number,

    subjects: [{ type: String }],
  },
  { timestamps: true }
);

export default mongoose.model("Teacher", teacherSchema);
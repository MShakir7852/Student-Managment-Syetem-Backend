import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    rollNumber: { type: String, unique: true },
    program: { type: String }, // BSCS, BBA etc
    semester: { type: Number },
    section: { type: String },

    phone: String,
    address: String,
    dateOfBirth: Date,
    gender: { type: String, enum: ["Male", "Female", "Other"] },
  },
  { timestamps: true }
);

export default mongoose.model("Student", studentSchema);
import mongoose from "mongoose";

const examSchema = new mongoose.Schema(
  {
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },

    title: String,

    questions: [
      {
        question: String,
        options: [String],
        correctAnswer: String,
      },
    ],

    startTime: Date,
    endTime: Date,
  },
  { timestamps: true }
);

export default mongoose.model("Exam", examSchema);
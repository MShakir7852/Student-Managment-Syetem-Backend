import Assignment from "../models/Assignment.js";


export const createAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.create(req.body);

    res.status(201).json({
      message: "Assignment created successfully",
      assignment,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create assignment",
      error: error.message,
    });
  }
};


export const getAssignments = async (req, res) => {
  try {
    const data = await Assignment.find()
      .populate("course")
      .populate("teacher");

    res.status(200).json({
      message: "Assignments fetched successfully",
      count: data.length,
      assignments: data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching assignments",
      error: error.message,
    });
  }
};

export const getAssignmentById = async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id)
      .populate("course")
      .populate("teacher")
      .populate("submissions.student");

    if (!assignment) {
      return res.status(404).json({
        message: "Assignment not found",
      });
    }

    res.status(200).json({
      message: "Assignment fetched successfully",
      assignment,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching assignment",
      error: error.message,
    });
  }
};


export const updateAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
      .populate("course")
      .populate("teacher");

    if (!assignment) {
      return res.status(404).json({
        message: "Assignment not found",
      });
    }

    res.status(200).json({
      message: "Assignment updated successfully",
      assignment,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating assignment",
      error: error.message,
    });
  }
};


export const deleteAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.findByIdAndDelete(req.params.id);

    if (!assignment) {
      return res.status(404).json({
        message: "Assignment not found",
      });
    }

    res.status(200).json({
      message: "Assignment deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting assignment",
      error: error.message,
    });
  }
};


export const submitAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id);

    if (!assignment) {
      return res.status(404).json({
        message: "Assignment not found",
      });
    }

    const alreadySubmitted = assignment.submissions.find(
      (sub) => sub.student.toString() === req.user.id
    );

    if (alreadySubmitted) {
      return res.status(400).json({
        message: "You have already submitted this assignment",
      });
    }

    assignment.submissions.push({
      student: req.user.id,
      fileUrl: req.body.fileUrl,
      submittedAt: new Date(),
    });

    await assignment.save();

    const updated = await Assignment.findById(req.params.id)
      .populate("course")
      .populate("submissions.student");

    res.status(200).json({
      message: "Assignment submitted successfully",
      assignment: updated,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error submitting assignment",
      error: error.message,
    });
  }
};
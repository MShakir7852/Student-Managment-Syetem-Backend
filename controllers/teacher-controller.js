import Teacher from "../models/teacher-Model.js";

export const createTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.create(req.body);

    res.status(201).json({
      message: "Teacher created successfully",
      teacher,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create teacher",
      error: error.message,
    });
  }
};


export const getAllTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find().populate("user");

    res.status(200).json({
      message: "All teachers fetched successfully",
      count: teachers.length,
      teachers,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching teachers",
      error: error.message,
    });
  }
};


export const getTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id).populate("user");

    if (!teacher) {
      return res.status(404).json({
        message: "Teacher not found",
      });
    }

    res.status(200).json({
      message: "Teacher fetched successfully",
      teacher,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching teacher",
      error: error.message,
    });
  }
};


export const updateTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,       
        runValidators: true,
      }
    ).populate("user");

    if (!teacher) {
      return res.status(404).json({
        message: "Teacher not found",
      });
    }

    res.status(200).json({
      message: "Teacher updated successfully",
      teacher,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating teacher",
      error: error.message,
    });
  }
};


export const deleteTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findByIdAndDelete(req.params.id);

    if (!teacher) {
      return res.status(404).json({
        message: "Teacher not found",
      });
    }

    res.status(200).json({
      message: "Teacher deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting teacher",
      error: error.message,
    });
  }
};
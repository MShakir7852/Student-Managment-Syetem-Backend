import Course from "../models/course-Model.js";


export const createCourse = async (req, res) => {
  try {
    const course = await Course.create(req.body);

    res.status(201).json({
      message: "Course created successfully",
      course,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create course",
      error: error.message,
    });
  }
};


export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find()
      .populate("teacher")
      .populate("students");

    res.status(200).json({
      message: "Courses fetched successfully",
      count: courses.length,
      courses,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching courses",
      error: error.message,
    });
  }
};

export const getSingleCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate("teacher")
      .populate("students");

    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    res.status(200).json({
      message: "Course fetched successfully",
      course,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching course",
      error: error.message,
    });
  }
};


export const updateCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    )
      .populate("teacher")
      .populate("students");

    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    res.status(200).json({
      message: "Course updated successfully",
      course,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating course",
      error: error.message,
    });
  }
};


export const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);

    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    res.status(200).json({
      message: "Course deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting course",
      error: error.message,
    });
  }
};


export const enrollStudent = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    const studentId = req.body.studentId;

    // avoid duplicate enrollment
    if (course.students.includes(studentId)) {
      return res.status(400).json({
        message: "Student already enrolled",
      });
    }

    course.students.push(studentId);
    await course.save();

    const updatedCourse = await Course.findById(req.params.id)
      .populate("teacher")
      .populate("students");

    res.status(200).json({
      message: "Student enrolled successfully",
      course: updatedCourse,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error enrolling student",
      error: error.message,
    });
  }
};
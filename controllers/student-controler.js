import Student from "../models/student-Model.js";

export const createStudent = async (req, res) => {
  const student = await Student.create(req.body);
  res.json(student);
};

export const getStudent = async (req, res) => {
  const student = await Student.findOne({ user: req.user.id }).populate("user");
  res.json(student);
};

export const updateStudent = async (req, res) => {
  const student = await Student.findOneAndUpdate(
    { user: req.user.id },
    req.body,
    { new: true }
  );

  res.json(student);
};

export const getAllStudents = async (req, res) => {
  const students = await Student.find().populate("user");
  res.json(students);
};

export const deleteStudent=async(req,res)=>{
   try {
     const id=req.params.id;
    const student=await Student.findByIdAndDelete({id}).populate('user');
    res.status(200).json({message:'Student Deleted Successfully',student})
   } catch (error) {
    res.status(500).json({message:error.message})
   }
}
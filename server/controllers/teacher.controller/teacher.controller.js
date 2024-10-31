import Teacher from "../../models/teacher.modal/teacher.modal.js";

export const createTeacher = async(req, res) => {
    try {
        const newTeacher = new Teacher(req.body);
        const savedTeacher = await newTeacher.save();

        res.status(200).json(savedTeacher);
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: 'Server error' })
    }
}


// get all teacahers:

export const getAllTeachers = async(req, res) => {
    try {
       const teachers = await Teacher.find();

        res.status(200).json(teachers);
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: 'Server error' })
    }
}
import express from 'express'
import { createTeacher, getAllTeachers } from '../../controllers/teacher.controller/teacher.controller.js';

const router = express.Router()

//create teacher:
router.post('/create-teacher', createTeacher);
// get all:
router.get('/get-all-teachers', getAllTeachers);



export default router;
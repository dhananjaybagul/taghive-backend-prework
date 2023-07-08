import express from "express";
import { validateToken } from "../../resource/utils.js";
import { createCourse, deleteCourse, getAllCourses, getCourse, updateCourse } from "./CourseController.js";

const router = express.Router();

router.get('/getOne/:id', validateToken, getCourse);
router.get('/getAll', validateToken, getAllCourses);
router.post('/create', validateToken, createCourse);
router.post('/update/:id', validateToken, updateCourse);
router.delete('/delete/:id', validateToken, deleteCourse);

export default router;
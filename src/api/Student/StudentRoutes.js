import express from "express";
import { validateToken } from "../../resource/utils.js";
import { getAllCourses, getCourse } from "../Course/CourseController.js";
import { enrollInCourse, updateProgress } from "./StudentController.js";

const router = express.Router();

router.get('/getOneCourse/:id', validateToken, getCourse);
router.get('/getAllCourses', validateToken, getAllCourses);
router.post('/enroll', validateToken, enrollInCourse);
router.post('/updateProgress', validateToken, updateProgress);

export default router;
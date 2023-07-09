import express from "express";
import { validateToken } from "../../resource/utils.js";
import { getAllStudents, getOneStudent } from "./TeacherController.js";

const router = express.Router();

router.get('/getOneStudent/:studentId', validateToken, getOneStudent);
router.get('/getAllStudents', validateToken, getAllStudents);

export default router;
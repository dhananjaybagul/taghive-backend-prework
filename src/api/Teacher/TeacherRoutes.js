import express from "express";
import { validateToken } from "../../resource/utils.js";
import { getOneStudent } from "./TeacherController.js";

const router = express.Router();

router.get('/getOneStudent/:studentId', validateToken, getOneStudent);

export default router;
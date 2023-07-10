import express from "express";
import { banner } from "./src/logger/banner.js";
import logger from "./src/logger/logger.js";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from './src/api/Auth/AuthRoutes.js';
import courseRoutes from './src/api/Course/CourseRoutes.js';
import studentRoutes from './src/api/Student/StudentRoutes.js';
import teacherRoutes from './src/api/Teacher/TeacherRoutes.js';

import("./src/database/dbconfig.js");
dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());
app.options("*", cors());

app.use("/api/auth", authRoutes);
app.use("/api/course", courseRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/teacher", teacherRoutes);

app.use("*", function (req, res) {
  res.status(404).send("404");
});

let port = process.env.PORT || 3000;

app.listen(port, () => {
  banner(logger);
});

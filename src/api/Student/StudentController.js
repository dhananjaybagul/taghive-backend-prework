import logger from "../../logger/logger.js";
import {
  sendCourseEnrollEmail,
  sendCourseStatusUpdateEmail,
} from "../Email/EmailService.js";
import { progressStatus } from "../Progress/ProgressModel.js";
import { updateProgressData } from "../Progress/ProgressService.js";
import { enrollCourseData } from "./StudentService.js";

export const enrollInCourse = async (req, res) => {
  try {
    const studentId = req.decoded.id;
    const role = req.decoded.role;
    const courseId = req.body.courseId;

    if (!courseId) {
      logger.error({
        Status: "FAILED",
        Response: "Please provide a valid course ID",
      });
      res
        .status(400)
        .send({
          Status: "FAILED",
          Response: "Please provide a valid course ID",
        });
      return;
    }
    if (role !== "Student") {
      logger.error({
        Status: "FAILED",
        Response: "Only Students are allowed to enroll into courses",
      });
      res.status(400).send({
        Status: "FAILED",
        Response: "Only Students are allowed to enroll into courses",
      });
      return;
    }

    await enrollCourseData(studentId, courseId)
      .then(async (response) => {
        const email = response.student.email;
        const userName = response.student.userName;
        const course = response.course.name;

        await sendCourseEnrollEmail(email, userName, course);

        res.status(201).send({
          Status: "SUCCESS",
          Message: "Successfully enrolled into course!",
        });
      })
      .catch((err) => {
        logger.error("enrollInCourse catch function :", err);
        res.status(400).send({ Status: "FAILED", Response: err.message });
      });
  } catch (e) {
    logger.error("Error in enrollInCourse controller : ", e);
    throw new Error(e);
  }
};

export const updateProgress = async (req, res) => {
  try {
    const studentId = req.decoded.id;
    const role = req.decoded.role;
    const { courseId, progress } = req.body;

    if (!courseId || !progress) {
      logger.error({
        Status: "FAILED",
        Response: "Please provide a valid course ID and progress status",
      });
      res
        .status(400)
        .send({
          Status: "FAILED",
          Response: "Please provide a valid course ID and progress status",
        });
      return;
    }
    if (!progressStatus.includes(progress)) {
      logger.error({
        Status: "FAILED",
        Response:
          "Please provide a valid progress status. Progress status should be Enrolled, Started, On-going or Completed",
      });
      res
        .status(400)
        .send({
          Status: "FAILED",
          Response:
            "Please provide a valid progress status. Progress status should be Enrolled, Started, On-going or Completed",
        });
      return;
    }
    if (role !== "Student") {
      logger.error({
        Status: "FAILED",
        Response: "Only Students are allowed to change progress status",
      });
      res.status(400).send({
        Status: "FAILED",
        Response: "Only Students are allowed to change progress status",
      });
      return;
    }

    await updateProgressData(studentId, courseId, progress)
      .then(async (response) => {
        const email = response.student.email;
        const userName = response.student.userName;
        const course = response.course.name;

        await sendCourseStatusUpdateEmail(email, userName, course, progress);

        res.status(201).send({
          Status: "SUCCESS",
          Message: "Course status updated successfully!",
        });
      })
      .catch((err) => {
        logger.error("updateProgress catch function :", err);
        res.status(400).send({ Status: "FAILED", Response: err.message });
      });
  } catch (e) {
    logger.error("Error in updateProgress controller : ", e);
    throw new Error(e);
  }
};

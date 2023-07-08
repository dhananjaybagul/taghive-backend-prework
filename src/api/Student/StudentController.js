import logger from "../../logger/logger.js";
import { enrollCourseData } from "./StudentService.js";


export const enrollInCourse = async (req, res) => {
    try {
      const studentId = req.decoded.id;
      const role = req.decoded.role;
      const courseId = req.body.courseId;

      if (!courseId) {
        logger.error({ Status: "FAILED", Response: "Please provide a valid course ID" });
        res
          .status(400)
          .send({ Status: "FAILED", Response: "Please provide a valid course ID" });
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
        .then((response) => {
          res.status(201).send({
            Status: "SUCCESS",
            Message: "Successfully enrolled into course!",
            Response: response,
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

import logger from "../../logger/logger.js";
import { getOneStudentData } from "./TeacherService.js";

export const getOneStudent = async (req, res) => {
    try {
      const role = req.decoded.role;
      const studentId = req.params.studentId;
  
      if (role !== "Teacher") {
        logger.error({
          Status: "FAILED",
          Response: "Only Teacher are allowed to fetch student information",
        });
        res.status(400).send({
          Status: "FAILED",
          Response: "Only Teacher are allowed to fetch student information",
        });
        return;
      }
  
      await getOneStudentData(studentId)
        .then(async (response) => {
          res.status(201).send({
            Status: "SUCCESS",
            Message: "Student data fetch successfully!",
            Response: response
          });
        })
        .catch((err) => {
          logger.error("getOneStudent catch function :", err);
          res.status(400).send({ Status: "FAILED", Response: err.message });
        });
    } catch (e) {
      logger.error("Error in getOneStudent controller : ", e);
      throw new Error(e);
    }
  };
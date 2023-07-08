import logger from "../../logger/logger.js";
import {
  createCourseData,
  deleteCourseData,
  getAllCoursesData,
  getCourseData,
  updateCourseData,
} from "./CourseService.js";

export const createCourse = async (req, res) => {
  try {
    const { name } = req.body;
    const teacherId = req.decoded.id;
    const role = req.decoded.role;

    if (!name) {
      logger.error({ Status: "FAILED", Response: "Please enter a valid name" });
      res
        .status(400)
        .send({ Status: "FAILED", Response: "Please enter a valid name" });
      return;
    }
    if (role !== "Teacher") {
      logger.error({
        Status: "FAILED",
        Response: "Only Teachers are allowed to create courses",
      });
      res.status(400).send({
        Status: "FAILED",
        Response: "Only Teachers are allowed to create courses",
      });
      return;
    }

    await createCourseData(name, teacherId)
      .then((response) => {
        res.status(201).send({
          Status: "SUCCESS",
          Message: "Course created successfully!",
          Response: response,
        });
      })
      .catch((err) => {
        logger.error("createCourse catch function :", err);
        res.status(400).send({ Status: "FAILED", Response: err });
      });
  } catch (e) {
    logger.error("Error in createCourse controller : ", e);
    throw new Error(e);
  }
};

export const updateCourse = async (req, res) => {
  try {
    const { name } = req.body;
    const courseId = req.params.id;

    const role = req.decoded.role;

    if (!name) {
      logger.error({ Status: "FAILED", Response: "Please enter a valid name" });
      res
        .status(400)
        .send({ Status: "FAILED", Response: "Please enter a valid name" });
      return;
    }
    if (role !== "Teacher") {
      logger.error({
        Status: "FAILED",
        Response: "Only Teachers are allowed to create courses",
      });
      res.status(400).send({
        Status: "FAILED",
        Response: "Only Teachers are allowed to update courses",
      });
      return;
    }

    await updateCourseData(name, courseId)
      .then((response) => {
        res.status(201).send({
          Status: "SUCCESS",
          Message: "Course updated successfully!",
          Response: response,
        });
      })
      .catch((err) => {
        logger.error("updateCourse catch function :", err);
        res.status(400).send({ Status: "FAILED", Response: err.message });
      });
  } catch (e) {
    logger.error("Error in updateCourse controller : ", e);
    throw new Error(e);
  }
};

export const deleteCourse = async (req, res) => {
  try {
    const courseId = req.params.id;
    const role = req.decoded.role;

    if (role !== "Teacher") {
      logger.error({
        Status: "FAILED",
        Response: "Only Teachers are allowed to delete courses",
      });
      res.status(400).send({
        Status: "FAILED",
        Response: "Only Teachers are allowed to delete courses",
      });
      return;
    }

    await deleteCourseData(courseId)
      .then((response) => {
        res.status(201).send({
          Status: "SUCCESS",
          Message: "Course deleted successfully!",
          Response: response,
        });
      })
      .catch((err) => {
        logger.error("deleteCourse catch function :", err);
        res.status(400).send({ Status: "FAILED", Response: err.message });
      });
  } catch (e) {
    logger.error("Error in deleteCourse controller : ", e);
    throw new Error(e);
  }
};

export const getCourse = async (req, res) => {
  try {
    const courseId = req.params.id;

    await getCourseData(courseId)
      .then((response) => {
        res.status(201).send({
          Status: "SUCCESS",
          Message: "Course fetched successfully!",
          Response: response,
        });
      })
      .catch((err) => {
        logger.error("getCourse catch function :", err);
        res.status(400).send({ Status: "FAILED", Response: err.message });
      });
  } catch (e) {
    logger.error("Error in getCourse controller : ", e);
    throw new Error(e);
  }
};

export const getAllCourses = async (req, res) => {
  try {
    const courseId = req.params.id;

    await getAllCoursesData(courseId)
      .then((response) => {
        res.status(201).send({
          Status: "SUCCESS",
          Message: "Courses fetched successfully!",
          Response: response,
        });
      })
      .catch((err) => {
        logger.error("getAllCourses catch function :", err);
        res.status(400).send({ Status: "FAILED", Response: err.message });
      });
  } catch (e) {
    logger.error("Error in getAllCourses controller : ", e);
    throw new Error(e);
  }
};

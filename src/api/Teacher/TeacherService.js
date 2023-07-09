import Progress from "../Progress/ProgressModel.js";
import { getStudentData, getUserData } from "../User/UserService.js";
import { formatAllStudentData, formatStudentData } from "./Teacher.utils.js";

export const getOneStudentData = async (studentId) => {
  try {
    const userData = await getUserData(studentId);

    if (userData.role !== "Student") {
      throw new Error("Please enter a valid student ID");
    }

    const progressData = await Progress.find({ studentId })
      .populate({ path: "studentId", select: "userName email" })
      .populate({ path: "courseId", select: "name" });

    let studentData;
    if (progressData) {
      studentData = formatStudentData(progressData);
    }

    if (userData && !progressData.length) {
      return userData;
    } else if (userData && progressData.length) {
      return studentData;
    } else {
      throw new Error("Something went wrong. Please try again!");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getAllStudentsData = async () => {
  try {
    const userData = await getStudentData();

    const progressData = await Progress.find()
      .populate({ path: "studentId", select: "userName email" })
      .populate({ path: "courseId", select: "name" });

    let studentData;
    if (progressData) {
      studentData = formatAllStudentData(userData,progressData);
    }

    if (userData && !progressData.length) {
      return userData;
    } else if (userData && progressData.length) {
      return studentData;
    } else {
      throw new Error("Something went wrong. Please try again!");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

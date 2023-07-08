import { getCourseData } from "../Course/CourseService.js";
import { getUserData } from "../User/UserService.js";
import Progress from "./ProgressModel.js";

export const updateProgressData = async (studentId, courseId, progress) => {
  try {
    //to check course and student exists or not
    const course = await getCourseData(courseId);
    const student = await getUserData(studentId);

    //to check if student is already entolled into course
    const progressCheck = await Progress.find({ studentId, courseId });

    if (!progressCheck.length) {
      throw new Error("Student is not enrolled in this course");
    }

    const progressData = await Progress.findOneAndUpdate(
      {
        courseId,
        studentId,
      },
      {
        progress,
      }
    );
    await progressData.save();
    return { course, student };
  } catch (error) {
    throw new Error(error.message);
  }
};

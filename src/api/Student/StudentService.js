import { getCourseData } from "../Course/CourseService.js";
import Progress from "../Progress/ProgressModel.js";
import { getUserData } from "../User/UserService.js";

export const enrollCourseData = async (
  studentId,
  courseId,
  progress = "Enrolled"
) => {
  try {
    //to check course and student exists or not
    const course = await getCourseData(courseId);
    const student = await getUserData(studentId);

    //to check if student is already entolled into course
    const progressCheck = await Progress.find({studentId, courseId});

    if(progressCheck.length){
        throw new Error("Student is already enrolled into course");
    }

    const progressData = await Progress.create({
      studentId,
      courseId,
      progress,
    });
    const progressRecord = await progressData.save();
    return { course, progressRecord, student };
  } catch (error) {
    throw new Error(error.message);
  }
};

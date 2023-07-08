import { getCourseData } from "../Course/CourseService.js";
import Progress from "../Progress/ProgressModel.js";

export const enrollCourseData = async (studentId, courseId, progress = "Enrolled") => {
  try {

    //to check course exists or not
    await getCourseData(courseId);

    const progressData = await Progress.create({ 
        studentId, 
        courseId, 
        progress,
    });
    return await progressData.save();
  } catch (error) {
    throw new Error(error.message);
  }
};

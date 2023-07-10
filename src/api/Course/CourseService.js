import Course from "./CourseModel.js";

export const createCourseData = async (name, teacherId) => {
  try {

    const course = await Course.findOne({ name });
    if(course){
      throw new Error("Course already exist");
    }
    const saveCourse = await Course.create({ name, teacherId });
    return await saveCourse.save().then((data) => {
      const courseData = data.toObject();
      return courseData;
    });
  } catch (error) {
    throw new Error(error);
  }
};

export const updateCourseData = async (name, courseId) => {
  try {
    const course = await Course.findById({ _id: courseId }).catch(() => {
      throw new Error("Course with given id does not exist");
    });

    if (!course) {
      throw new Error("No course found");
    }

    const data = Object.assign(course, { name });

    return await course.save(data);
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteCourseData = async (courseId) => {
  try {
    const course = await Course.findById({ _id: courseId }).catch(() => {
      throw new Error("Course with given id does not exist");
    });

    if (!course) {
      throw new Error("No course found");
    }

    return await course.deleteOne();
  } catch (error) {
    throw new Error(error);
  }
};

export const getCourseData = async (courseId) => {
  try {
    const course = await Course.findById({ _id: courseId }).catch(() => {
      throw new Error("Course with given id does not exist");
    });

    if (!course) {
      throw new Error("No course found");
    }

    return course;
  } catch (error) {
    throw new Error(error);
  }
};

export const getAllCoursesData = async () => {
    try {
      const course = await Course.find();
  
      if (!course) {
        throw new Error("No course found");
      }
  
      return course;
    } catch (error) {
      throw new Error(error);
    }
  };

export const formatStudentData = (data) => {
    let courses = [];
    data?.map((student) => {
        courses.push({
            name: student?.courseId?.name,
            status: student?.progress,
        })
    });

    return {
        name: data[0]?.studentId?.userName,
        email: data[0]?.studentId?.email,
        courses: courses,
    }
}
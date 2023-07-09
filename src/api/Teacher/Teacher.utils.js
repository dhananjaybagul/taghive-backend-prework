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

export const formatAllStudentData = (students, progress) =>{
    const result = [];

    students.map((student) => {
        const studentData = {
            name: student.userName,
            email: student.email,
            courses: []
        };
        progress.map((pro) => {
            if(student?._id?.toString() == pro?.studentId?._id){
                studentData.courses.push({
                    name: pro?.courseId?.name,
                    progress: pro?.progress
                })
            }
        });
        result.push(studentData);
    });

    return result;
}

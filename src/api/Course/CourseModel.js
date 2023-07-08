import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    teacherId: {
        type: String,
        require: true
    }
},
    {
        timestamps: true
    })

const Course = mongoose.model('Course', courseSchema)
export default Course;
import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    teacherId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    }
},
    {
        timestamps: true
    })

const Course = mongoose.model('Course', courseSchema)
export default Course;
import mongoose from "mongoose";

export const progressStatus = ["Enrolled", "Started", "On-going", "Completed"]

const progressSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        require: true
    },
    progress: {
        type: String,
        enum: progressStatus,
    }
},
    {
        timestamps: true
    })

const Progress = mongoose.model('Progress', progressSchema)
export default Progress;
import mongoose from "mongoose";

const progressStatus = ["Enrolled", "Started", "On-going", "Completed"]

const progressSchema = new mongoose.Schema({
    studentId: {
        type: String,
        require: true
    },
    courseId: {
        type: String,
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
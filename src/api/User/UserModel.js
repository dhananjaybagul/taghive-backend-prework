import mongoose from "mongoose";

export const roles = ["Teacher", "Student", "ADMIN"]

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        require: true
    },
    role: {
        type: String,
        enum: roles,
        default: "Student",
        required: true,
      },
    token: {
        type: String,
    }
},
    {
        timestamp: true
    })

const User = mongoose.model('User', userSchema)
export default User;
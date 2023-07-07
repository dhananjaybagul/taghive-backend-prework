import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
        trim: true
    },
    password: {
        type: String,
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
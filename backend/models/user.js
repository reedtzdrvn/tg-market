import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    userName: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    telegramId: {
        type: String,
        required: true,
        unique: true
    },
    photos: [{
        type: String
    }],
    videos: [{
        type: String
    }]
})

export default mongoose.model("User", UserSchema);
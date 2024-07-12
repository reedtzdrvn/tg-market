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
        require: true,
    },
    phoneNumber: {
        type: String,
        require: true
    },
    telegramId: {
        type: String,
        require: true
    },
    photos: [{
        type: String
    }],
    videos: [{
        type: String
    }]
})

export default mongoose.model("User", UserSchema);
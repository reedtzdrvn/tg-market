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
    email: {
        type: String,
    },
    orders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order"
    }],
    telegramId: {
        type: String,
        require: true
    },
})

export default mongoose.model("User", UserSchema);
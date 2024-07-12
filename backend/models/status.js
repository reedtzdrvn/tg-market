import mongoose from "mongoose"

const StatusSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    }
})

export default mongoose.model("Status", StatusSchema);
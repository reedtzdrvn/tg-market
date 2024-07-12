import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({
  text: {
    type: Text,
    require: true,
  },
  date: {
    type: Date,
    require: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    require: true,
  },
  reviewver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    require: true,
  },
  status: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "status",
    require: true,
  },
});

export default mongoose.model("Review", ReviewSchema);

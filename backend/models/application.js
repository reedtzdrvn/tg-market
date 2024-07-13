import mongoose from "mongoose";

const ApplicationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    require: true,
  },
  city: {
    type: String,
    require: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "category",
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
  date: {
    type: Date,
    require: true,
  },
  time: {
    type: String,
    require: true,
  },
  countGuests: {
    type: String,
    require: true,
  },
  comment: {
    type: Text,
  },
  status: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "status",
    require: true,
  }
});

export default mongoose.model("Application", ApplicationSchema);

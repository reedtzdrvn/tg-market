import mongoose from "mongoose";

const StatusSchema = new mongoose.Schema({
  name: { type: String, required: true },
  comment: { type: String, required: false },
});

export const Status = mongoose.model("Status", StatusSchema);

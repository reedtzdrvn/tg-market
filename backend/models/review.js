import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  artistId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  reviewText: {
    type: String,
  },
  grade: {
    type: Number,
    required: true
  },
  approved: { type: Boolean, required: true },
});

export const Review = mongoose.model("Review", ReviewSchema);

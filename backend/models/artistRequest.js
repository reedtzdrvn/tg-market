import mongoose from "mongoose";

const ArtistRequestSchema = new mongoose.Schema({
  city: { type: String, required: true },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  description: { type: String, required: true },
  artistId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  approved: { type: Boolean, required: true, default: false },
});

export default mongoose.model(
  "ArtistRequest",
  ArtistRequestSchema
);

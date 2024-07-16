import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CustomerRequest",
    required: true,
  },
  artistId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ArtistRequest",
    required: true,
  },
  status: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Status",
    required: true,
  },
});

export const Order = mongoose.model("Order", OrderSchema);

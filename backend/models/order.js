import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  customerRequestId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CustomerRequest",
    required: true,
  },
  artistRequestId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ArtistRequest",
    required: true,
  },
  statusArtist: {
    statusId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Status",
      required: true,
    },
    comment: {
      type: String,
      required: false
    }
  },
  statusCustomer: {
    statusId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Status",
      required: true,
    },
    comment: {
      type: String,
      required: false
    }
  },
});

export default mongoose.model("Order", OrderSchema);

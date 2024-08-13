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
    statusIdArtist: {
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
    statusIdCustomer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Status",
      required: false,
    },
    comment: {
      type: String,
      required: false
    }
  },
});

export default mongoose.model("Order", OrderSchema);

import mongoose from "mongoose";

const CustomerRequestSchema = new mongoose.Schema({
  city: { type: String, required: true },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  fee: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  time: { type: String, required: true },
  guestCount: { type: Number, required: true },
  description: { type: String, required: true },
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  approved: { type: Boolean, required: true },
});

export const CustomerRequest = mongoose.model(
  "CustomerRequest",
  CustomerRequestSchema
);

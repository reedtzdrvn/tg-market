import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  active: { type: Boolean, required: true },
});

export default mongoose.model("Category", CategorySchema);

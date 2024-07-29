import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  lastName: { type: String, required: false },
  firstName: { type: String, required: false },
  userName: { type: String, required: true },
  telegramId: { type: String, required: true },
  phoneNumber: { type: String, required: false },
  role: { type: String, required: false },
  photo: { type: [String], required: false },
  video: { type: [String], required: false },
  vk: { type: String, required: false },
  instagram: { type: String, required: false },
  youtube: { type: String, required: false },
  mainPhoto: {type: String, required: false}
});

export default mongoose.model("User", UserSchema);

import UserSchema from "../models/user.js";

export default class userController {
  static getUser = async (req, res) => {
    try {
      const telegramId = req.query.telegramId;

      if (!telegramId) {
        return res.status(404).json({ message: "TelegramId is not definded" });
      }

      const userData = await UserSchema.find({ telegramId: telegramId });

      if (userData.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(userData);
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: e, message: e.message });
    }
  };

  static updateUser = async (req, res) => {
    try {
      const {
        firstName,
        lastName,
        phoneNumber,
        telegramId,
        role,
        photo,
        mainPhoto,
        video,
        vk,
        instagram,
        youtube,
      } = req.body;

      const user = await UserSchema.findOne({ telegramId });
      console.log(user);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      if (firstName) user.firstName = firstName;
      if (lastName) user.lastName = lastName;
      if (phoneNumber) user.phoneNumber = phoneNumber;
      if (role) user.role = role;
      if (photo) user.photo = photo;
      if (mainPhoto) user.mainPhoto = mainPhoto;
      if (video) user.video = video;
      if (vk) user.vk = vk;
      if (instagram) user.instagram = instagram;
      if (youtube) user.youtube = youtube;

      await user.save();

      return res.status(200).json({ user });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Возникла ошибка" });
    }
  };
}

import UserSchema from "../models/user.js";

export default class userController {

  static getUser = async (req, res) => {
    try {
      const telegram = req.query.telegramId;

      if (!telegram) {
        return res.status(404).json({ message: "Ошибка получения информации" });
      }

      const userData = await UserSchema.find({ telegramId: telegram });

      if (userData.length === 0) {
        return res.status(404).json({ message: "Ошибка получения информации" });
      }
      res.json(userData);
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: e, message: e.message });
    }
  };

  static updateUser = async (req, res) => {
    try {
      const { firstName, lastName, phoneNumber, telegramId } = req.body;

      const user = await UserSchema.findOne({ telegramId });

      if (!user) {
        return res.status(404).json({ error: "Пользователь не найден" });
      }

      if (firstName) user.firstName = firstName;
      if (lastName) user.lastName = lastName;
      if (phoneNumber) user.phoneNumber = phoneNumber;

      await user.save();

      return res.status(200).json({ user });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Возникла ошибка" });
    }
  };

  static register = async (req, res) => {

    const {userName, telegramId, phoneNumber} = req.body

    

  }
}

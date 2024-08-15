import ArtistRequestSchema from "../models/artistRequest.js";
import UserSchema from "../models/user.js";
import ModeratorSchema from "../models/moderator.js";
import axios from "axios";

export default class artistRequestController {
  static addArtistRequest = async (req, res) => {
    try {
      const {
        city,
        artistId,
        categoryId,
        description,
        price,
        approved,
        mainPhoto,
        backGroundPhoto,
        photo,
        link_video,
        vk,
        instagram,
        youtube,
        tiktok,
      } = req.body;

      if (!city || !artistId || !categoryId) {
        return res.status(400).json({
          message: "Error, check city, artistId, categoryId, description",
        });
      }

      const request = new ArtistRequestSchema({
        city,
        artistId,
        categoryId,
        description,
        price,
        approved,
        mainPhoto,
        backGroundPhoto,
        photo,
        link_video,
        vk,
        instagram,
        youtube,
        tiktok,
      });

      // const artist = await UserSchema.findById(artistId);
      const moderators = await ModeratorSchema.find({}).select('telegramId')

      await this.sendTelegramNotification(moderators);

      await request.save();

      return res.status(201).json(request);
    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: e.message });
    }
  };

  static sendTelegramNotification = async (moderators, isEditing=false) => {
    try {
      const { unapproved_count } = await this.getUnapprovedArtistRequests();

      for (const moderator of moderators) {
        await axios.post(
          `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`,
          {
            chat_id: moderator.telegramId,
            text: `Пришла новая заявка от <b>Исполнителя.</b>\n\nВсего сейчас непроверенных заявок исполнителей: <b>${isEditing ? unapproved_count : unapproved_count + 1}</b>`,
            parse_mode: "HTML",
          }
        );
      }
    } catch (e) {
      console.error(e);
      return { error: e.message };
    }
  };

  static deleteArtistRequest = async (req, res) => {
    try {
      const { requestId } = req.query;

      if (!requestId) {
        return res.status(400).json({ message: "requestId is not defined" });
      }

      const request = await ArtistRequestSchema.findOneAndDelete({
        _id: requestId,
      });

      if (!request) {
        return res.status(404).json({ message: "request not found" });
      }

      res.json({ message: "request deleted successfully" });
    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: e.message });
    }
  };

  static updateArtistRequest = async (req, res) => {
    try {
      const {
        requestId,
        city,
        categoryId,
        description,
        price,
        approved,
        mainPhoto,
        backGroundPhoto,
        photo,
        link_video,
        vk,
        instagram,
        youtube,
        tiktok,
      } = req.body;

      const request = await ArtistRequestSchema.findOne({ _id: requestId });

      if (!request) {
        return res.status(404).json({ error: "request not found" });
      }

      request.approved = false;
      request.isRejected = false;
      if (categoryId) request.categoryId = categoryId;
      if (description) request.description = description;
      if (price) request.price = price;
      if (mainPhoto) request.mainPhoto = mainPhoto;
      if (backGroundPhoto) request.backGroundPhoto = backGroundPhoto;
      if (photo) request.photo = photo;
      if (link_video) request.link_video = link_video;
      if (vk) request.vk = vk;
      if (instagram) request.instagram = instagram;
      if (youtube) request.youtube = youtube;
      if (tiktok) request.tiktok = tiktok;
      if (city) request.city = city;

      const moderators = await ModeratorSchema.find({}).select('telegramId')

      await this.sendTelegramNotification(moderators, true);

      await request.save();

      return res.status(200).json({ request });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Возникла ошибка" });
    }
  };

  static getArtistRequest = async (req, res) => {
    try {
      const { requestId, artistId, categoryId } = req.query;

      if (categoryId) {
        const request = await ArtistRequestSchema.find({
          categoryId: categoryId,
        })
          .populate("categoryId")
          .populate("artistId");
        return res.json(request);
      }

      if (requestId) {
        const request = await ArtistRequestSchema.findOne({ _id: requestId })
          .populate("categoryId")
          .populate("artistId");
        return res.json(request);
      }

      if (artistId) {
        const request = await ArtistRequestSchema.find({ artistId: artistId })
          .populate("categoryId")
          .populate("artistId");
        return res.json(request);
      }
    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: e.message });
    }
  };

  static getUnapprovedArtistRequests = async () => {
    try {
      const data = await ArtistRequestSchema.countDocuments({
        approved: false,
      });

      return { unapproved_count: data };
    } catch (e) {
      console.error(e);
      return { error: e.message };
    }
  };
}

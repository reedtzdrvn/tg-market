import OrderSchema from "../models/order.js";
import StatusShema from "../models/status.js";
import ArtistRequestSchema from "../models/artistRequest.js";
import CustomerRequestSchema from "../models/customerRequest.js";
import { mongoose } from "mongoose";
import axios from "axios";

export default class orderController {
  static addOrder = async (req, res) => {
    try {
      const { artistId, customerRequestId } = req.body;

      if (!artistId || !customerRequestId) {
        return res
          .status(400)
          .json({ message: "Error, check  customerId, artistId " });
      }

      const artistRequest = await ArtistRequestSchema.findOne({
        artistId: artistId,
      });

      const statusArtist = await StatusShema.findOne({ name: "Создан" });

      const order = new OrderSchema({
        artistRequestId: artistRequest._id,
        customerRequestId: customerRequestId,
        status: {
          statusId: statusArtist._id,
        },
      });

      await order.save();

      return res.status(201).json(order);
    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: e.message });
    }
  };

  static getOrder = async (req, res) => {
    try {
      const { customerRequestId, artistId, orderId, customerId } = req.query;

      const artistRequest = await ArtistRequestSchema.findOne({
        artistId: artistId,
      });

      const artistRequestId = artistRequest?._id;

      let order;

      if (orderId) {
        order = await OrderSchema.findOne({ _id: orderId })
          .populate({
            path: "customerRequestId",
            populate: [
              {
                path: "categoryId",
                model: "Category", // Populate the categoryId in CustomerRequest
              },
              {
                path: "customerId",
                model: "User", // Populate the customerId in CustomerRequest
              },
            ],
          })
          .populate({
            path: "artistRequestId",
            populate: [
              {
                path: "categoryId",
                model: "Category", // Populate the categoryId in ArtistRequest
              },
              {
                path: "artistId",
                model: "User", // Populate the artistId in ArtistRequest
              },
            ],
          })
          .populate("status.statusId");
        return res.json(order);
      }

      // If an artistId is provided, find the order by artistRequestId and populate all fields including categories and user
      if (artistId) {
        order = await OrderSchema.find({ artistRequestId: artistRequestId })
          .populate({
            path: "customerRequestId",
            populate: [
              {
                path: "categoryId",
                model: "Category", // Populate the categoryId in CustomerRequest
              },
              {
                path: "customerId",
                model: "User", // Populate the customerId in CustomerRequest
              },
            ],
          })
          .populate({
            path: "artistRequestId",
            populate: [
              {
                path: "categoryId",
                model: "Category", // Populate the categoryId in ArtistRequest
              },
              {
                path: "artistId",
                model: "User", // Populate the artistId in ArtistRequest
              },
            ],
          })
          .populate("status.statusId");
        return res.json(order.filter((el) => el.customerRequestId !== null));
      }

      // If a customerRequestId is provided, find the order by customerRequestId and populate all fields including categories and user
      if (customerRequestId) {
        order = await OrderSchema.findOne({
          customerRequestId: customerRequestId,
        })
          .populate({
            path: "customerRequestId",
            populate: [
              {
                path: "categoryId",
                model: "Category", // Populate the categoryId in CustomerRequest
              },
              {
                path: "customerId",
                model: "User", // Populate the customerId in CustomerRequest
              },
            ],
          })
          .populate({
            path: "artistRequestId",
            populate: [
              {
                path: "categoryId",
                model: "Category", // Populate the categoryId in ArtistRequest
              },
              {
                path: "artistId",
                model: "User", // Populate the artistId in ArtistRequest
              },
            ],
          })
          .populate("status.statusId");
        return res.json(order.filter((el) => el.customerRequestId !== null));
      }

      const customerObjectId = new mongoose.Types.ObjectId(customerId);

      if (customerId) {
        const orders = await OrderSchema.find({ isCustomerView: true })
          .populate({
            path: "customerRequestId",
            match: { customerId: customerObjectId },
            populate: [
              {
                path: "categoryId",
                model: "Category", // Populate the categoryId in CustomerRequest
              },
              {
                path: "customerId",
                model: "User", // Populate the customerId in CustomerRequest
              },
            ],
          })
          .populate({
            path: "artistRequestId",
            populate: [
              {
                path: "categoryId",
                model: "Category", // Populate the categoryId in ArtistRequest
              },
              {
                path: "artistId",
                model: "User", // Populate the artistId in ArtistRequest
              },
            ],
          })
          .populate("status.statusId");

        return res.json(orders.filter((el) => el.customerRequestId !== null));
      }

      return res.status(400).json({ error: "Invalid query parameters" });
    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: e.message });
    }
  };

  static deleteOrder = async (req, res) => {
    try {
      const { orderId } = req.query;

      if (!orderId) {
        return res.status(400).json({ message: "orderId is not defined" });
      }

      const order = await OrderSchema.findOneAndDelete({ _id: orderId });

      if (!order) {
        return res.status(404).json({ message: "order not found" });
      }

      res.json({ message: "order deleted successfully" });
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: e.message });
    }
  };

  static updateOrder = async (req, res) => {
    try {
      const { status, orderId, customerRequestId } = req.body;

      const order = await OrderSchema.findOne({ _id: orderId });

      if (!order) {
        return res.status(404).json({ error: "order not found" });
      }

      order.status.statusId = status._id;

      if (status.name !== "Отменён") {
        const { artistRequestId } = order;

          const customerId = await CustomerRequestSchema.findOne({
            _id: customerRequestId,
          })
            .select("customerId eventName")
            .populate("customerId");
  
          const artistId = await ArtistRequestSchema.findOne({
            _id: artistRequestId,
          })
            .select("artistId")
            .populate("artistId");

        if (status.name === 'Завершён') {
            try {
              await axios.post(
                `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`,
                {
                  chat_id: customerId.customerId.telegramId,
                  text: `<a href="https://t.me/${
                    artistId.artistId.userName
                  }">${artistId.artistId.firstName} ${
                    customerId.customerId.lastName
                  }</a> сообщил, что заказ отменен.\nПредлагаем оставить отзыв.`,
                  parse_mode: "HTML",
                }
              );
            } catch (e) {
              console.error(e);
              return { error: e.message };
            }
        }

        if (status.name === 'Договор') {
          try {
            await axios.post(
              `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`,
              {
                chat_id: customerId.customerId.telegramId,
                text: `Артист <a href="https://t.me/${
                  artistId.artistId.userName
                }">${artistId.artistId.firstName} ${
                  artistId.artistId.lastName
                }</a> по заявке ${customerId.eventName} перевел статус сделки в договор.\n Это означает, что вы договорились об исполнении заказа. Если это не так свяжитесь с артистом, чтобы  уточнить условия или обратитесь в поддержку.\nПредлагаем оставить отзыв.`,
                parse_mode: "HTML",
              }
            );
          } catch (e) {
            console.error(e);
            return { error: e.message };
          }
      }

        order.isCustomerView = true;
        const requestCustomer = await CustomerRequestSchema.findOne({
          _id: customerRequestId,
        });
        requestCustomer.order = true;
        await requestCustomer.save();
      }

      await order.save();

      return res.status(200).json({ order });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Возникла ошибка" });
    }
  };
}

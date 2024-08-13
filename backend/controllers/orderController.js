import OrderShema from "../models/order.js"
import StatusShema from "../models/status.js"

export default class orderController {
    static addOrder = async (req, res) => {
        try {
          const { artistRequestId, customerRequestId } = req.body;
    
          if (!artistRequestId || !customerRequestId || !status) {
            return res.status(400).json({ message: "Error, check  customerId, artistId, status " });
          }

          const statusArtist = await StatusShema.findOne({name: "Создан"})._id
    
          const order = new OrderShema({ artistRequestId: artistRequestId, customerRequestId: customerRequestId, statusIdArtist: statusArtist});
    
          await order.save();
    
          return res.status(201).json(order);
        } catch (e) {
          console.error(e);
          return res.status(500).json({ error: e.message });
        }
      };
    
      static getOrder = async (req, res) => {
        try {
          const { customerId, artistId, orderId } = req.query;
    
          if (orderId) {
            const order = await OrderShema.findOne({_id: orderId}).populate('customerId').populate('artistId').populate('statusId');
            res.json(order);
          }

          if (artistId){
            const order = await OrderShema.findOne({artistId: artistId}).populate('customerId').populate('artistId').populate('statusId');
            res.json(order);
          }
    
          if (customerId){
            const order = await OrderShema.findOne({customerId: customerId}).populate('customerId').populate('artistId').populate('statusId');
            res.json(order);
          }

        } catch (e) {
          console.error(e);
          res.status(500).json({ error: e.message });
        }
      };
    
      static deleteOrder = async (req, res) => {
        try {
          const { orderId } = req.query;
    
          if (!orderId) {
            return res.status(400).json({ message: "orderId is not defined" });
          }
    
          const order = await OrderShema.findOneAndDelete({ _id: orderId });
    
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
          const { status, orderId } = req.body;
    
          const order = await OrderShema.findOne({ _id: orderId });
    
          if (!order) {
            return res.status(404).json({ error: "order not found" });
          }
    
          order.status = status
    
          await order.save();
    
          return res.status(200).json({ order });
        } catch (err) {
          console.error(err);
          return res.status(500).json({ error: "Возникла ошибка" });
        }
      };
}

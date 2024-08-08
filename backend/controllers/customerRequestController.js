import CustomerRequestSchema from "../models/customerRequest.js"

export default class customerRequestController {
    static addCustomerRequest = async (req, res) => {
        try {
          const { city, customerId, categoryId, description, fee, date, time, guestCount, eventName } = req.body;
          console.log(city, customerId, categoryId, description, fee, date, time, guestCount, eventName)
    
          if (!city || !customerId || !categoryId) {
            return res.status(400).json({ message: "Error, check city, artistId, categoryId, description, fee, startDate, endDate" });
          }
    
          const request = new CustomerRequestSchema({eventName,  city, customerId, categoryId, description, fee, date, time, guestCount});
    
          await request.save();
    
          res.status(201).json(request);
        } catch (e) {
          console.error(e);
          res.status(500).json({ error: e.message });
        }
      };
    
      static getCustomerRequest = async (req, res) => {
        try {
          const { requestId, customerId, categoryId } = req.query;

          console.log(requestId)

          if (categoryId){
            const request = await CustomerRequestSchema.find({categoryId: categoryId, approved: true}).populate('categoryId').populate('customerId');
            res.json(request);
          }
    
          if (requestId) {
            const request = await CustomerRequestSchema.findOne({_id: requestId}).populate('categoryId').populate('customerId');
            res.json(request);
          }

          if (customerId){
            const request = await CustomerRequestSchema.find({customerId: customerId}).populate('categoryId').populate('customerId');
            res.json(request);
          }
    
        } catch (e) {
          console.error(e);
          res.status(500).json({ error: e.message });
        }
      };
    
      static deleteCustomerRequest = async (req, res) => {
        try {
          const { requestId } = req.query;
    
          if (!requestId) {
            return res.status(400).json({ message: "requestId is not defined" });
          }
    
          const request = await CustomerRequestSchema.findOneAndDelete({ _id: requestId });
    
          if (!request) {
            return res.status(404).json({ message: "request not found" });
          }
    
          res.json({ message: "request deleted successfully" });
        } catch (e) {
          console.error(e);
          res.status(500).json({ error: e.message });
        }
      };
    
      static updateCustomerRequest = async (req, res) => {
        try {
          const {eventName, requestId, city, categoryId, description, fee, date, time, guestCount, approved } = req.body;
    
          const request = await CustomerRequestSchema.findOne({ _id:requestId });
    
          if (!request) {
            return res.status(404).json({ error: "request not found" });
          }

          if (approved) request.approved = true
          if (categoryId) request.categoryId = categoryId
          if (description) request.description = description
          if (city) request.city = city
          if (fee) request.fee = fee
          if (date) request.date = date
          if (time) request.time = time
          if (guestCount) request.guestCount = guestCount
          if (eventName) request.eventName = eventName
    
          await request.save();
    
          return res.status(200).json({ request });
        } catch (err) {
          console.error(err);
          return res.status(500).json({ error: "Возникла ошибка" });
        }
      };
}

import ArtistRequestSchema from "../models/artistRequest.js";

export default class artistRequestController {
    static addArtistRequest = async (req, res) => {
        try {
          const { city, artistId, categoryId, description, price, approved, mainPhoto, backGroundPhoto, photo, link_video, vk, instagram, youtube, tiktok  } = req.body;
    
          if (!city || !artistId || !categoryId ) {
            return res.status(400).json({ message: "Error, check city, artistId, categoryId, description" });
          }
    
          const request = new ArtistRequestSchema({ city, artistId, categoryId, description, price, approved, mainPhoto, backGroundPhoto, photo, link_video, vk, instagram, youtube, tiktok});
    
          await request.save();
    
          res.status(201).json(request);
        } catch (e) {
          console.error(e);
          res.status(500).json({ error: e.message });
        }
      };
    
      static getArtistRequest = async (req, res) => {
        try {
          const { requestId, artistId, categoryId } = req.query;

          if (categoryId) {
            const request = await ArtistRequestSchema.findOne({categoryId: categoryId}).populate('categoryId').populate('artistId');
            res.json(request);
          }
    
          if (requestId) {
            const request = await ArtistRequestSchema.findOne({_id: requestId}).populate('categoryId').populate('artistId');
            res.json(request);
          }

          if (artistId){
            const request = await ArtistRequestSchema.find({artistId: artistId}).populate('categoryId').populate('artistId');
            res.json(request);
          }
    
        } catch (e) {
          console.error(e);
          res.status(500).json({ error: e.message });
        }
      };
    
      static deleteArtistRequest = async (req, res) => {
        try {
          const { requestId } = req.query;
    
          if (!requestId) {
            return res.status(400).json({ message: "requestId is not defined" });
          }
    
          const request = await ArtistRequestSchema.findOneAndDelete({ _id: requestId });
    
          if (!request) {
            return res.status(404).json({ message: "request not found" });
          }
    
          res.json({ message: "request deleted successfully" });
        } catch (e) {
          console.error(e);
          res.status(500).json({ error: e.message });
        }
      };
    
      static updateArtistRequest = async (req, res) => {
        try {
          const { requestId, categoryId, approved, description, city } = req.body;
    
          const request = await ArtistRequestSchema.findOne({ _id:requestId });
    
          if (!request) {
            return res.status(404).json({ error: "request not found" });
          }

          if (approved) request.approved = true
          if (categoryId) request.categoryId = categoryId
          if (description) request.description = description
          if (city) request.city = city
    
          await request.save();
    
          return res.status(200).json({ request });
        } catch (err) {
          console.error(err);
          return res.status(500).json({ error: "Возникла ошибка" });
        }
      };
}

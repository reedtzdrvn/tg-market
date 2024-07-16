import CategoryShema from "../models/category.js"

export default class categoryController {
    static addCategory = async (req, res) => {
        try {
          const { name } = req.body;
    
          if (!name) {
            return res.status(400).json({ message: "Error, check name" });
          }
    
          const category = new CategoryShema({name: name});
    
          await category.save();
    
          res.status(201).json(category);
        } catch (e) {
          console.error(e);
          res.status(500).json({ error: e.message });
        }
      };
    
      static getCategory = async (req, res) => {
        try {
          const { categoryId } = req.query;
    
          if (!categoryId) {
            const categories = await CategoryShema.find();
            res.json(categories);
          }

          const category = await CategoryShema.findOne({ _id: categoryId });

          if (!category) {
            return res.status(404).json({ message: "category not found" });
          }
    
          res.json(category);
        } catch (e) {
          console.error(e);
          res.status(500).json({ error: e.message });
        }
      };
    
      static deleteCategory = async (req, res) => {
        try {
          const { categoryId, active } = req.query;
    
          if (!categoryId) {
            return res.status(400).json({ message: "categoryId is not defined" });
          }
    
          const category = await CategoryShema.findOne({ _id: categoryId });
    
          if (!category) {
            return res.status(404).json({ message: "category not found" });
          }

          category.active = active

          await category.save()
    
          res.json({ message: "category deleted successfully" });
        } catch (e) {
          console.error(e);
          res.status(500).json({ error: e.message });
        }
      };
}

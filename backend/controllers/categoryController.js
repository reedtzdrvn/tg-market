import CategorySсhema from "../models/category.js"

export default class categoryController {
    static addCategory = async (req, res) => {
        try {
          const { name, svgName, color } = req.body;
    
          if (!name) {
            return res.status(400).json({ message: "Error, check name" });
          }
    
          const category = new CategorySсhema({name: name, svgName: svgName, color: color});
    
          await category.save();
    
          return res.status(201).json(category);
        } catch (e) {
          console.error(e);
          return res.status(500).json({ error: e.message });
        }
      };
    

static getCategory = async (req, res) => {
  try {
    const { categoryId } = req.query;

    if (!categoryId) {
      const categories = await CategorySсhema.aggregate([
        {
          $lookup: {
            from: 'artistrequests',
            localField: '_id',
            foreignField: 'categoryId',
            as: 'artistRequests'
          }
        },
        {
          $lookup: {
            from: 'customerrequests',
            localField: '_id',
            foreignField: 'categoryId',
            as: 'customerRequests'
          }
        },
        {
          $addFields: {
            countArtist: { $size: '$artistRequests' },
            countCustomer: { $size: '$customerRequests' }
          }
        },
        {
          $project: {
            artistRequests: 0, // Exclude the artistRequests array from the result
            customerRequests: 0 // Exclude the customerRequests array from the result
          }
        }
      ]);
      return res.json(categories);
    }

    const category = await CategorySсhema.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(categoryId) } },
      {
        $lookup: {
          from: 'artistrequests',
          localField: '_id',
          foreignField: 'categoryId',
          as: 'artistRequests'
        }
      },
      {
        $lookup: {
          from: 'customerrequests',
          localField: '_id',
          foreignField: 'categoryId',
          as: 'customerRequests'
        }
      },
      {
        $addFields: {
          countArtist: { $size: '$artistRequests' },
          countCustomer: { $size: '$customerRequests' }
        }
      },
      {
        $project: {
          artistRequests: 0, // Exclude the artistRequests array from the result
          customerRequests: 0 // Exclude the customerRequests array from the result
        }
      }
    ]);

    if (!category.length) {
      return res.status(404).json({ message: "Category not found" });
    }

    return res.json(category[0]); // category will be an array, return the first element
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: e.message });
  }
};

      
    
      static deleteCategory = async (req, res) => {
        try {
          const { categoryId, active } = req.query;
    
          if (!categoryId) {
            return res.status(400).json({ message: "categoryId is not defined" });
          }
    
          const category = await CategorySсhema.findOne({ _id: categoryId });
    
          if (!category) {
            return res.status(404).json({ message: "category not found" });
          }

          category.active = active

          await category.save()
    
          return res.json({ message: "category deleted successfully" });
        } catch (e) {
          console.error(e);
          res.status(500).json({ error: e.message });
        }
      };
}

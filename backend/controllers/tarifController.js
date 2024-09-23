import TarifSchema from "../models/tarif.js";

export default class tarifController {
  static addTarif = async (req, res) => {
    try {
      const { name, term, price } = req.body;

      const tarif = new TarifSchema({
        name: name,
        term: term,
        price: price
      });

      await tarif.save();

      return res.status(200).json(tarif)
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: e, message: e.message });
    }
  };

  static getTarif = async (req, res) => {
    try {
        const id = req.query.id

        if (!id){
            const tarifs = await TarifSchema.find()
            return res.status(200).json(tarifs)
        }
        const tarifs = await TarifSchema.findOne({_id: id})
      return res.status(200).json(tarifs)
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: e, message: e.message });
    }
  };
}

import ReviewShema from "../models/review.js";

export default class reviewController {
  static addReview = async (req, res) => {
    try {
      const { customerId, artistId, reviewText, grade, reviewTitle } = req.body;

      if (!customerId || !artistId || !grade || !reviewTitle) {
        return res
          .status(400)
          .json({
            message: "Error, check  customerId, artistId, reviewText, grade",
          });
      }

      const review = new ReviewShema({
        customerId: customerId,
        artistId: artistId,
        reviewText: reviewText,
        grade: grade,
        reviewTitle: reviewTitle
      });

      await review.save();

      return res.status(201).json(review);
    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: e.message });
    }
  };

  static getReview = async (req, res) => {
    try {
      const { reviewId, artistId } = req.query;

      if (!reviewId && !artistId) {
        const reviews = await ReviewShema.find()
          .populate("customerId")
          .populate("artistId");
        return res.json(reviews);
      }

      if (artistId) {
        const reviews = await ReviewShema.find({ artistId: artistId })
          .populate("customerId")
          .populate("artistId");
        return res.json(reviews);
      }

      const review = await ReviewShema.findOne({ _id: reviewId })
        .populate("customerId")
        .populate("artistId");

      if (!review) {
        return res.status(404).json({ message: "Review not found" });
      }

      return res.json(review);
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: e.message });
    }
  };

  static deleteReview = async (req, res) => {
    try {
      const { reviewId } = req.query;

      if (!reviewId) {
        return res.status(400).json({ message: "reviewId is not defined" });
      }

      const review = await ReviewShema.findOneAndDelete({ _id: reviewId });

      if (!review) {
        return res.status(404).json({ message: "review not found" });
      }

      return res.json({ message: "review deleted successfully" });
    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: e.message });
    }
  };

  static updateReview = async (req, res) => {
    try {
      const { reviewId } = req.body;

      const review = await ReviewShema.findOne({ _id: reviewId });

      if (!review) {
        return res.status(404).json({ error: "review not found" });
      }

      review.approved = true;

      await review.save();

      return res.status(200).json({ review });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Возникла ошибка" });
    }
  };
}

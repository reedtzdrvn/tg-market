import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { config as dotenvConfig } from "dotenv";
import userController from "./controllers/userController.js";
import statusController from "./controllers/statusController.js";
import multer from "multer";
import path from "path";
import moderatorController from "./controllers/moderatorController.js";
import reviewController from "./controllers/reviewController.js";
import orderController from "./controllers/orderController.js";
import categoryController from "./controllers/categoryController.js";
import artistRequestController from "./controllers/artistRequestController.js";
import customerRequestController from "./controllers/customerRequestController.js";
import subscriptionController from "./controllers/subscriptionController.js";
import tarifController from "./controllers/tarifController.js";
import promoController from "./controllers/promoController.js";

dotenvConfig();

const app = express();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "media/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 50 * 1024 * 1024 },
});

app.use("/media", express.static("media"));
app.use(express.json());
app.use(cors());
// app.use(express.json({ limit: "5mb" }));
// app.use(express.urlencoded({ limit: "5mb", extended: true }));

mongoose
  .connect(process.env.NODE_DB_URL)
  .then(() => console.log("DB OK"))
  .catch((err) => console.log("DB error", err));

const PORT = process.env.PORT || 4444;

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log("Server is running");
});

//GET

app.get("/", async (req, res) => {
  res.json({ message: "nice" });
});

app.get("/user", userController.getUser);

app.get("/status", statusController.getStatus);

app.get("/moderator", moderatorController.getModerator);

app.get("/review", reviewController.getReview); // если передаем artistId то получим все отзывы артиста, если reviewId - конкретный отзыв

app.get("/order", orderController.getOrder); // если передаем в query orderId - то получим заказ, если artistId - все заказы артиста, если customerId - все заказы заказчика

app.get("/category", categoryController.getCategory);

app.get("/artist-request", artistRequestController.getArtistRequest); // если передаем requestId то получим конкретный request, если artistId - то его requests, если categoryId - то все заявки с такой категорией

app.get("/customer-requests", customerRequestController.getCustomerRequest); // если передаем requestId то получим конкретный request, если customer - то его requests, если categoryId - то все заявки с такой категорией

app.get("/subscription", subscriptionController.getSubscription)

app.get("/tarif", tarifController.getTarif);

app.get('/promo', promoController.getPromo)

//POST

app.post("/upload", upload.array("files"), async (req, res) => {
  try {
    const fileUrls = req.files.map((file) => "/media/" + file.filename);
    res.status(201).json({ filenames: fileUrls });
  } catch (err) {
    console.error("Failed to upload photo", err);
    res.status(500).json({ error: "Failed to upload photo" });
  }
});

app.post('/promo', promoController.addPromo)

app.post("/status", statusController.addStatus);

app.post("/moderator", moderatorController.addModerator);

app.post("/tarif", tarifController.addTarif);

app.post("/review", reviewController.addReview);

app.post("/order", orderController.addOrder);

app.post("/category", categoryController.addCategory);

app.post("/artist-request", artistRequestController.addArtistRequest);

app.post("/customer-request", customerRequestController.addCustomerRequest);

app.post("/subscription", subscriptionController.addSubscription)

//PATCH

app.patch("/user", userController.updateUser);

app.patch('/promo', promoController.updatePromo)

app.patch("/review", reviewController.updateReview);

app.patch("/order", orderController.updateOrder);

app.patch("/artist-request", artistRequestController.updateArtistRequest);

app.patch("/customer-request", customerRequestController.updateCustomerRequest);

app.patch("/selectcity", userController.updateSelectCity);

//DELETE

app.delete("/status", statusController.deleteStatus);

app.delete("/moderator", moderatorController.deleteModerator);

app.delete("/review", reviewController.deleteReview);

app.delete("/order", orderController.deleteOrder);

app.delete("/category", categoryController.deleteCategory);

app.delete("/artist-request", artistRequestController.deleteArtistRequest);

app.delete(
  "/customer-request",
  customerRequestController.deleteCustomerRequest
);

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { config as dotenvConfig } from "dotenv";
import userController from "./controllers/userController.js";
import multer from "multer";
import path from "path";

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

const upload = multer({ storage: storage });

app.use(express.static("media"));
app.use(express.json());
app.use(cors());
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



//POST

app.post('/upload', upload.single('photo'), async (req, res) => {
    try {
        res.status(201).json({ filename: req.file.filename });
    } catch (err) {
        res.status(500).json({ error: 'Failed to upload photo' });
    }
});
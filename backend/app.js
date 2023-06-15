import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { limiter } from "./utils/rateLimiter.js";
import { PORT, DATA_BASE, MONGODB_URL } from "./config.js";
import { router } from "./routers/index.js";
import { corsOptions } from "./middlewares/corsOptions.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();

mongoose.connect(MONGODB_URL);

app.use(express.json());
app.use(cors(corsOptions));
app.use(limiter);
app.use(router);

app.listen(PORT, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log("server ok");
});

import express from "express";
import mongoose from "mongoose";
import { router } from "./routers/index.js";
import dotenv from "dotenv";
dotenv.config();

const { PORT = 3001 } = process.env;

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("db OK"))
  .catch((err) => console.log(err));

const app = express();

app.use(express.json());
app.use(router);

app.listen(PORT, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log("server ok");
});

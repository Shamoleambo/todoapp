import express, { json } from "express";
import mongoose from "mongoose";
import "dotenv/config";
import router from "./routes";

const app = express();

app.use(json());

app.use(router);

app.listen(process.env.PORT, () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("connected to the db"))
    .catch((err) => console.log(err));
  console.log(`Server running on port ${process.env.PORT}`);
});

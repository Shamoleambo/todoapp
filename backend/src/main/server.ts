import express from "express";
import mongoose from "mongoose";
import "dotenv/config";

const app = express();

app.listen(3000, () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("connected to the db"))
    .catch((err) => console.log(err));
  console.log(`Server running on port 3000`);
});

import express, { json } from "express";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";
import router from "./routes";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);
app.use(json());

app.use(router);
app.options("*", cors());

app.listen(Number(process.env.PORT), "0.0.0.0", () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("connected to the db, my BROTHA!"))
    .catch((err) => console.log(err));
});

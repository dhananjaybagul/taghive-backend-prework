import express from "express";
import { banner } from "./src/logger/banner.js";
import logger from "./src/logger/logger.js";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from './src/api/Auth/AuthRoutes.js';

import("./src/database/dbconfig.js");
dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());
app.options("*", cors());

app.use("/api/auth", authRoutes);

app.use("*", function (req, res) {
  res.status(404).send("404");
});

let port = process.env.port || 3000;

app.listen(port, () => {
  banner(logger);
});

import express from "express";
import pkg from "body-parser";
import MainRoutes from "./Routes/Routes.js";
import cors from "cors";

const { json } = pkg;

const PORT = process.env.PORTSERVER;
const HOST = process.env.HOSTSERVER;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())

MainRoutes(app);

const start = async () => {
  try {
    app.listen(PORT, HOST);
    console.log(`Running on http://${HOST}:${PORT}`);
  } catch (error) {
    console.log(error);
  }
};

start();

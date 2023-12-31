import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import PaymentRoutes from "./routes/PaymentRoutes.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use("/api/payment", PaymentRoutes);

export default app;

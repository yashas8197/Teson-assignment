import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import productRouter from "./routes/products.routes.js";
import { initializeDatabase } from "./connection/db.connect.js";
import cartRouter from "./routes/cart.routes.js";

const app = express();

const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "DELETE"],
  credentials: false,
};

app.use(express.json());
app.use(cors(corsOptions));

initializeDatabase();

app.use("/api", productRouter);
app.use("/api", cartRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running in http://localhost:${PORT}`);
});

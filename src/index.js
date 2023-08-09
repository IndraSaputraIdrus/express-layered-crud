import express from "express";
import cors from "cors";
import "dotenv/config";
import productController from "./product/product.controller.js";

const app = express();
const port = process.env.SERVER_PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (_, res) => {
  res.send("hello world");
});

app.use("/products", productController);

app.listen(port, (err) => {
  if (err) throw err;

  console.log(`server running on port: ${port}`);
});

export default app;

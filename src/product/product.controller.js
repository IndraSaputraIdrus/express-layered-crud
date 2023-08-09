// layer untuk handle request dan response
// bisasa juga untuk validasi body

import express from "express";

import {
  createProduct,
  deleteProductById,
  getAllProducts,
  getProductById,
  editProductById,
} from "./product.service.js";

const router = express.Router();

router.get("/", async (_, res) => {
  try {
    const products = await getAllProducts();
    res.send(products);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const product = await getProductById(productId);
    res.send(product);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const newProductData = req.body;
    if (
      !(
        newProductData.name &&
        newProductData.price &&
        newProductData.image &&
        newProductData.description
      )
    ) {
      throw Error("Some field are missing");
    }
    const product = await createProduct(newProductData);
    res.status(201).send({ message: "crated", data: product });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    await deleteProductById(productId);
    res.send({ message: "Product deleted" });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const productData = req.body;
    console.log(productData);

    if (
      !(
        productData.name &&
        productData.price &&
        productData.image &&
        productData.description
      )
    ) {
      throw Error("Some field are missing");
    }

    const product = await editProductById(productId, productData);

    res.send({
      message: "Update product success",
      data: product,
    });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const productData = req.body;
    const product = await editProductById(productId, productData);
    res.send({
      message: "Update product success",
      data: product,
    });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

export default router;

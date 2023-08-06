// service layer bertutjuan untuk handle business logic
// kenapa dipisah? supaya tanggung jawabnya ter-isolate dan function-nya reusable

import prisma from "../db/index.js";
import {
  findProductById,
  findProductByName,
  findProducts,
  insertProduct,
  deleteProduct,
  editProduct,
} from "./product.repository.js";

export const getAllProducts = async () => {
  const products = await findProducts();
  return products;
};

export const getProductById = async (id) => {
  const product = await findProductById(id);

  if (!product) {
    throw Error("Product not found");
  }

  return product;
};

export const createProduct = async (newProductData) => {
  const findProduct = await findProductByName(newProductData.name);
  if (findProduct) {
    throw Error("Name has to be unique");
  }
  const product = await insertProduct(newProductData);
  return product;
};

export const deleteProductById = async (id) => {
  await getProductById(id);
  await deleteProduct(id);
};

export const editProductById = async (id, productData) => {
  await findProductById(id);

  const product = await editProduct(id, productData);

  return product;
};

export const putProductById = async () => {};

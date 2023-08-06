// repository tugas nya adalah berkomunikasi dengan database
// boleh pake orm atau raw query
// supaya apa? supaya kalau mau ganti-ganti orm tinggal edit di file ini aja

import prisma from "../db/index.js";

export const findProducts = async () => {
  const products = await prisma.product.findMany();
  return products;
};

export const findProductById = async (id) => {
  const product = await prisma.product.findUnique({
    where: {
      id,
    },
  });
  return product;
};

export const findProductByName = async (name) => {
  const product = await prisma.product.findFirst({
    where: {
      name,
    },
  });
  return product;
};

export const insertProduct = async (newProductData) => {
  const product = await prisma.product.create({
    data: {
      name: newProductData.name,
      description: newProductData.description,
      price: newProductData.price,
      image: newProductData.image,
    },
  });
  return product;
};

export const deleteProduct = async (id) => {
  await prisma.product.delete({
    where: {
      id,
    },
  });
};

export const editProduct = async (id, productData) => {
  const product = await prisma.product.update({
    where: {
      id,
    },
    data: {
      name: productData.name,
      description: productData.description,
      price: productData.price,
      image: productData.image,
    },
  });
  return product;
};

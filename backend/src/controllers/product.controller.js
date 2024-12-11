import Products from "../models/product.model.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = await Products.find();

    if (products.length === 0) {
      return res.status(404).json({ message: "No Products Found" });
    }

    return res.status(200).json(products);
  } catch (error) {
    res.status(404).json({ error: "Internal Server Error" });
  }
};

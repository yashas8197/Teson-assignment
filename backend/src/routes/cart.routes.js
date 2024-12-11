import express from "express";
import {
  addToCart,
  deleteCartItem,
  getCartProducts,
  updateQuantity,
} from "../controllers/cart.controller.js";

const cartRouter = express.Router();

cartRouter.get("/cart", getCartProducts);
cartRouter.post("/cart", addToCart);
cartRouter.post("/cart-update", updateQuantity);
cartRouter.delete("/cart/:productId", deleteCartItem);

export default cartRouter;

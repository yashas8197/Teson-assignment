import Cart from "../models/cart.model.js";
import Products from "../models/product.model.js";

export const getCartProducts = async (req, res) => {
  try {
    const cartItems = await Cart.find().populate("product");

    if (cartItems.length <= 0) {
      return res.status(404).json({ message: "No Cart Found" });
    }
    return res.status(200).json(cartItems);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error fetching cart" });
  }
};

export const addToCart = async (req, res) => {
  const { productId } = req.body;

  try {
    const product = await Products.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const existingCartItem = await Cart.findOne({ product: productId });

    if (existingCartItem) {
      if (existingCartItem.quantity < 10) {
        existingCartItem.quantity += 1;
        await existingCartItem.save();
        return res.status(200).json(await existingCartItem.populate("product"));
      } else {
        return res
          .status(400)
          .json({ message: "Maximum quantity reached for this product" });
      }
    } else {
      const newCartItem = new Cart({ product: productId, quantity: 1 });
      await newCartItem.save();
      return res.status(201).json(await newCartItem.populate("product"));
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding product to cart" });
  }
};

export const updateQuantity = async (req, res) => {
  const { productId, quantity } = req.body;

  if (quantity < 1 || quantity > 10) {
    return res
      .status(400)
      .json({ message: "Quantity must be between 1 and 10" });
  }

  try {
    const cartItem = await Cart.findOne({ product: productId });
    if (!cartItem) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    cartItem.quantity = quantity;
    await cartItem.save();
    return res.status(200).json(cartItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating cart" });
  }
};

export const deleteCartItem = async (req, res) => {
  const productId = req.params.productId;

  try {
    const cartItem = await Cart.findOneAndDelete({ product: productId });
    if (!cartItem) {
      return res.status(404).json({ message: "Product not found in cart" });
    }
    return res
      .status(200)
      .json({ message: "Product removed from cart", cartItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error removing product from cart" });
  }
};
